const {test}=require('node:test');
const assert=require('node:assert/strict');
const {merge}=require('../cloud-merge');
test('two devices preserve independent edits and stable curriculum array positions',()=>{
  const base={grammar:{A1:[false,false]},vocabKnown:{},learning:{attempts:{}}};
  const phone=structuredClone(base),desktop=structuredClone(base);
  phone.grammar.A1[0]=true;phone.learning.attempts.phone={correct:false};
  desktop.grammar.A1[1]=true;desktop.learning.attempts.desktop={correct:true};
  const result=merge(base,desktop,phone);
  assert.deepEqual(result.grammar.A1,[true,true]);
  assert.equal(Object.keys(result.learning.attempts).length,2);
});
test('unmarking and clearing a reading draft survive cloud merging',()=>{
  const base={vocabKnown:{apple:true,book:true},readingAnswers:{A1:{0:{text:'draft'}}}};
  const local={vocabKnown:{book:true},readingAnswers:{A1:{0:{text:''}}}};
  const remote=structuredClone(base);remote.vocabKnown.dog=true;
  assert.deepEqual(merge(base,local,remote),{vocabKnown:{book:true,dog:true},readingAnswers:{A1:{0:{text:''}}}});
});
test('offline changes rebase over another device without lowering best score',()=>{
  const base={tests:{A1:{best:5,total:20}},learning:{preferredLevel:'A1'}};
  const local={tests:{A1:{best:10,total:20}},learning:{preferredLevel:'B1'}};
  const remote={tests:{A1:{best:15,total:20}},learning:{preferredLevel:'A1'}};
  assert.equal(merge(base,local,remote).tests.A1.best,15);
  assert.equal(merge(base,local,remote).learning.preferredLevel,'B1');
});
test('an edit made while a write is in flight remains pending after acknowledgement',()=>{
  const snapshot={grammar:{A1:[true,false]},reading:{}};
  const current={grammar:{A1:[true,true]},reading:{}};
  const saved={grammar:{A1:[true,false]},reading:{A1:[true]}};
  assert.deepEqual(merge(snapshot,current,saved),{grammar:{A1:[true,true]},reading:{A1:[true]}});
});

async function device(server,uid='learner-one',cachedSession=false){
  const fs=require('node:fs'),vm=require('node:vm');
  const {JSDOM}=require('jsdom');
  const dom=new JSDOM('<header></header><main></main>',{url:'https://study.example/',runScripts:'outside-only'});
  const w=dom.window;
  if(cachedSession){
    w.localStorage.setItem('studyEnglishCloudSessionV1',JSON.stringify({user:{id:uid}}));
    w.localStorage.setItem('guest',JSON.stringify({vocabKnown:{guest:true}}));
    w.localStorage.setItem('studyProgressV1:cloud:'+uid,JSON.stringify({vocabKnown:{private:true}}));
  }
  let authCallback;
  w.setTimeout=()=>0;w.setInterval=()=>0;
  w.StudyAuth={getProgressKey:()=> 'guest',getCurrentUser:()=>null};
  w.StudyProgressBackup={cleanProgress:p=>JSON.parse(JSON.stringify(p)),mergeProgress:(a,b)=>({...a,...b})};
  w.supabase={createClient:()=>({
    auth:{onAuthStateChange(callback){authCallback=callback;},getSession:async()=>server.sessionError?{error:new Error('offline session')}:{data:{session:{user:{id:uid}}}}},
    from:()=>({select:()=>({eq:(_,id)=>({maybeSingle:async()=>{
      if(server.offline)throw new Error('offline');return {data:structuredClone(server.rows[id]||null)};
    }})})}),
    rpc:async(_,args)=>{
      if(server.offline)throw new Error('offline');
      if(server.beforeWrite){const fn=server.beforeWrite;server.beforeWrite=null;await fn();}
      const row=server.rows[uid];if((row?.revision||0)!==args.expected_revision)return {data:[]};
      server.rows[uid]={revision:(row?.revision||0)+1,payload:structuredClone(args.new_payload)};
      return {data:[structuredClone(server.rows[uid])]};
    }
  })};
  for(const file of ['cloud-merge.js','cloud.js'])vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'..',file),'utf8'),dom.getInternalVMContext());
  await w.StudyCloud.ready;
  return {w,logout:()=>authCallback('SIGNED_OUT',null),close:()=>dom.window.close(),save:p=>w.localStorage.setItem(w.StudyAuth.getProgressKey(),JSON.stringify(p)),read:()=>JSON.parse(w.localStorage.getItem(w.StudyAuth.getProgressKey())||'{}')};
}
test('sync retries concurrent writes, downloads remote progress and isolates accounts',async()=>{
  const server={rows:{}};const a=await device(server),b=await device(server),other=await device(server,'learner-two');
  try{
    a.save({grammar:{A1:[true,false]}});await a.w.StudyCloud.sync();
    b.save({grammar:{A1:[false,true]}});
    server.beforeWrite=()=>{server.rows['learner-one'].revision++;server.rows['learner-one'].payload.reading={A1:[true]};};
    assert.equal(await b.w.StudyCloud.sync(),true);
    await a.w.StudyCloud.sync();
    assert.deepEqual(a.read(),{grammar:{A1:[true,true]},reading:{A1:[true]}});
    assert.deepEqual(other.read(),{});
    assert.notEqual(a.w.StudyAuth.getProgressKey(),other.w.StudyAuth.getProgressKey());
  }finally{a.close();b.close();other.close();}
});
test('offline progress remains local and is uploaded on retry',async()=>{
  const server={rows:{}};const d=await device(server);
  try{
    server.offline=true;d.save({vocabKnown:{'A1::apple':true}});
    assert.equal(await d.w.StudyCloud.sync(),false);
    assert.match(d.w.StudyCloud.getStatus(),/Pendiente/);
    assert.equal(d.read().vocabKnown['A1::apple'],true);
    server.offline=false;assert.equal(await d.w.StudyCloud.sync(),true);
    assert.equal(server.rows['learner-one'].payload.vocabKnown['A1::apple'],true);
  }finally{d.close();}
});
test('a response arriving after logout cannot overwrite the guest cache',async()=>{
  const server={rows:{}};const d=await device(server);
  try{
    let release,started;
    const inFlight=new Promise(resolve=>{started=resolve;});
    server.beforeWrite=()=>{started();return new Promise(resolve=>{release=resolve;});};
    d.save({grammar:{A1:[true]}});
    const pending=d.w.StudyCloud.sync();await inFlight;
    d.logout();d.save({vocabKnown:{'A1::book':true}});release();
    assert.equal(await pending,false);
    assert.deepEqual(d.read(),{vocabKnown:{'A1::book':true}});
    assert.equal(d.w.document.body.inert,true);
  }finally{d.close();}
});

test('an offline session check keeps the account cache separate from the guest',async()=>{
  const uid='9e98f57a-fd28-4d77-bcad-e4a420c3f0f1';
  const d=await device({rows:{},offline:true,sessionError:true},uid,true);
  try{
    assert.equal(d.w.StudyAuth.getProgressKey(),'studyProgressV1:cloud:'+uid);
    assert.deepEqual(d.read(),{vocabKnown:{private:true}});
    assert.deepEqual(JSON.parse(d.w.localStorage.getItem('guest')),{vocabKnown:{guest:true}});
    assert.match(d.w.StudyCloud.getStatus(),/sin conexión/);
    assert.equal(await d.w.StudyCloud.sync(),false);
  }finally{d.close();}
});
