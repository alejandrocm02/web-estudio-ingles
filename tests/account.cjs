const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {JSDOM}=require('jsdom');

async function accountPage({user=null,search='',recoverySession=false,recoveryReady=true,error=null}={}){
  const dom=new JSDOM('<main id="cloud-account"></main>',{
    url:'https://alejandrocm02.github.io/web-estudio-ingles/account.html'+search,
    runScripts:'outside-only'
  });
  const w=dom.window,calls=[];
  if(recoverySession)w.sessionStorage.setItem('studyRecoveryUser',user.id);
  w.StudyCloud={ready:Promise.resolve(),config:{emailReady:false,recoveryReady},
    getUser:()=>user,getStatus:()=> 'Sincronizado',localSource:()=>({name:'Invitado'}),
    client:{auth:{resetPasswordForEmail:async(...args)=>{calls.push(args);return {error};}}}
  };
  await vm.runInContext(fs.readFileSync(path.join(__dirname,'../account.js'),'utf8'),dom.getInternalVMContext());
  return {dom,w,calls,close:()=>dom.window.close()};
}

test('a signed-in learner can open recovery without logging out',async()=>{
  const user={id:'learner-one',email:'learner@example.com'};
  const profile=await accountPage({user});
  try{
    assert.equal(profile.w.document.getElementById('recover-password-link').getAttribute('href'),'account.html?mode=recovery');
  }finally{profile.close();}
  const recovery=await accountPage({user,search:'?mode=recovery'});
  try{
    const d=recovery.w.document,submit=d.querySelector('[type="submit"]');
    assert.equal(d.getElementById('cloud-email').value,user.email);
    assert.equal(submit.disabled,false);
    assert.equal(d.getElementById('cloud-password'),null);
    await d.getElementById('cloud-form').onsubmit({preventDefault(){},submitter:submit});
    assert.equal(recovery.calls.length,1);
    assert.equal(recovery.calls[0][0],user.email);
    assert.equal(recovery.calls[0][1].redirectTo,'https://alejandrocm02.github.io/web-estudio-ingles/account.html');
    assert.match(d.getElementById('account-status').textContent,/Si existe una cuenta/);
  }finally{recovery.close();}
});

test('a recovery link session opens the new-password form before the recovery query',async()=>{
  const page=await accountPage({user:{id:'learner-one',email:'learner@example.com'},search:'?mode=recovery',recoverySession:true});
  try{
    assert.ok(page.w.document.getElementById('recovery-form'));
    assert.equal(page.w.document.getElementById('cloud-form'),null);
    assert.equal(page.calls.length,0);
  }finally{page.close();}
});

test('recovery rate limits are explained and allow a later retry',async()=>{
  const page=await accountPage({search:'?mode=recovery',error:{status:429}});
  try{
    const d=page.w.document,submit=d.querySelector('[type="submit"]');
    d.getElementById('cloud-email').value='learner@example.com';
    await d.getElementById('cloud-form').onsubmit({preventDefault(){},submitter:submit});
    assert.match(d.getElementById('account-status').textContent,/Demasiados intentos/);
    assert.equal(submit.disabled,false);
  }finally{page.close();}
});

test('the recovery switch blocks sends independently of the signup switch',async()=>{
  const page=await accountPage({search:'?mode=recovery',recoveryReady:false});
  try{
    const d=page.w.document,submit=d.querySelector('[type="submit"]');
    assert.equal(submit.disabled,true);
    await d.getElementById('cloud-form').onsubmit({preventDefault(){},submitter:submit});
    assert.equal(page.calls.length,0);
  }finally{page.close();}
});
