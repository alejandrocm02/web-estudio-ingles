(function(){
  'use strict';
  const config={url:'https://vjghrnmunzbjvkhrauao.supabase.co',key:'sb_publishable_psC5fvCQOv4UU7rin_pGqQ_HuXTB416',emailReady:false};
  const localKey=window.StudyAuth.getProgressKey;
  const read=(key,fallback={})=>{try{return JSON.parse(localStorage.getItem(key))||fallback;}catch(_){return fallback;}};
  const write=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
  const clean=p=>window.StudyProgressBackup.cleanProgress(p||{});
  let user=null,initialized=false,busy=null,timer,status='Preparando cuenta…';
  const key=uid=>'studyProgressV1:cloud:'+uid;
  const ack=uid=>'studyCloudBaseV1:'+uid;
  const sessionKey='studyEnglishCloudSessionV1';
  const cachedUser=read(sessionKey,null)?.user;
  const client=window.supabase?.createClient(config.url,config.key,{
    auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit',storageKey:sessionKey},
    global:{fetch:(url,options={})=>fetch(url,{...options,signal:options.signal||AbortSignal.timeout(12000)})}
  });
  function message(text){
    status=text;
    for(const el of document.querySelectorAll('[data-cloud-status]')) el.textContent=text;
  }
  window.StudyAuth.getProgressKey=(...args)=>user?key(user.id):localKey(...args);
  function sameUser(uid){return user?.id===uid;}
  async function reconcile(uid){
    if(!sameUser(uid)) return false;
    message('Sincronizando…');
    try{
      for(let attempt=0;attempt<5;attempt++){
        if(!sameUser(uid)) return false;
        const base=clean(read(ack(uid))),snapshot=clean(read(key(uid)));
        const {data:remote,error}=await client.from('study_progress').select('payload,revision').eq('user_id',uid).maybeSingle();
        if(error) throw error;
        if(!sameUser(uid)) return false;
        const remotePayload=clean(remote?.payload);
        const merged=clean(StudyCloudMerge.merge(base,snapshot,remotePayload));
        let saved=merged;
        if(!StudyCloudMerge.same(merged,remotePayload)){
          const result=await client.rpc('save_study_progress',{expected_revision:remote?.revision||0,new_payload:merged});
          if(result.error) throw result.error;
          if(!sameUser(uid)) return false;
          if(!result.data?.length) continue;
          saved=clean(result.data[0].payload);
        }
        const current=clean(read(key(uid)));
        const remaining=clean(StudyCloudMerge.merge(snapshot,current,saved));
        write(ack(uid),saved); write(key(uid),remaining);
        if(!StudyCloudMerge.same(saved,remaining)) continue;
        message('Progreso sincronizado.');
        window.dispatchEvent(new Event('studyprogresschange'));
        return true;
      }
      throw new Error('Concurrent changes');
    }catch(_){
      if(sameUser(uid)) message('Guardado en este dispositivo. Pendiente de sincronizar; comprueba la conexión o vuelve a iniciar sesión.');
      return false;
    }
  }
  function sync(){
    if(!user||!client) return Promise.resolve(false);
    if(busy) return busy;
    const uid=user.id;
    const job=()=>reconcile(uid);
    busy=(navigator.locks?navigator.locks.request('study-sync-'+uid,job):job()).finally(()=>{busy=null;});
    return busy;
  }
  function changed(){
    if(!user)return;
    message('Guardado en este dispositivo. Sincronización pendiente…');
    clearTimeout(timer);timer=setTimeout(sync,500);
  }
  function mount(){
    const header=document.querySelector('header');
    if(header&&!document.getElementById('cloud-link')){
      const link=document.createElement('a');link.id='cloud-link';link.className='account-toggle';link.href='account.html';
      link.textContent=user?'Mi cuenta':'Cuenta y sincronización';header.append(link);
    }
    if(user){
      const local=document.getElementById('account-toggle');if(local)local.hidden=true;
      const bar=document.createElement('p');bar.className='cloud-status';bar.dataset.cloudStatus='';bar.role='status';
      bar.textContent=status;header?.after(bar);
    }
  }
  async function initialize(){
    if(!client){message('No se pudo cargar la cuenta. Recarga la página.');return;}
    client.auth.onAuthStateChange((event,session)=>{
      const previous=user?.id;user=session?.user||null;
      if(event==='PASSWORD_RECOVERY'&&user)sessionStorage.setItem('studyRecoveryUser',user.id);
      if(initialized&&previous!==user?.id){
        // Prevent a question opened by user A from being saved in user B's account.
        document.body.inert=true;clearTimeout(timer);
        setTimeout(()=>location.reload(),0);
      }
    });
    try{
      const result=await client.auth.getSession();
      if(result.error) throw result.error;
      user=result.data.session?.user||null;
      if(user)await sync(); else message('Modo local: progreso guardado solo en este navegador.');
    }catch(_){
      // A cached UID scopes offline data only; database authorization still uses
      // the server-validated token and RLS. Never mix this cache with the guest.
      if(/^[a-f0-9-]{36}$/i.test(cachedUser?.id||''))user=cachedUser;
      message(user?'Modo sin conexión: usando tu progreso de este dispositivo. Pendiente de comprobar la sesión y sincronizar.':'No se pudo comprobar la sesión. Recarga la página para volver a intentarlo.');
    }
    initialized=true;
  }
  const ready=initialize();
  ready.then(()=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',mount):mount());
  window.addEventListener('online',sync);
  window.addEventListener('focus',()=>{if(initialized)sync();});
  window.addEventListener('studyprogresssaved',changed);
  window.addEventListener('storage',event=>{if(user&&event.key===key(user.id))changed();});
  setInterval(()=>{if(!document.hidden&&initialized)sync();},30000);
  window.StudyCloud={ready,sync,changed,client,config,getUser:()=>user,getStatus:()=>status,
    localSource:()=>({key:localKey(),name:window.StudyAuth.getCurrentUser()?.username||'Invitado'}),
    async importLocal(){
      if(!user)throw new Error('Inicia sesión primero.');
      const uid=user.id,source=this.localSource(),local=clean(read(source.key));
      write('studyMigrationBackupV1:'+uid+':'+Date.now(),{source:source.name,progress:local});
      write(key(uid),window.StudyProgressBackup.mergeProgress(read(key(uid)),local));
      changed();return sync();
    }
  };
})();
