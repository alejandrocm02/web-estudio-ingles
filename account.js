(async function(){
  'use strict';
  const root=document.getElementById('cloud-account');
  const cloud=window.StudyCloud;
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  await cloud.ready;
  const user=cloud.getUser();
  const errorText=error=>{
    if(error?.code==='invalid_credentials')return 'El correo o la contraseña no son correctos.';
    if(error?.code==='email_not_confirmed')return 'Confirma tu correo antes de entrar.';
    if(error?.code==='user_already_exists')return 'Ya existe una cuenta con ese correo. Inicia sesión.';
    if(error?.status===429)return 'Demasiados intentos. Espera unos minutos antes de volver a probar.';
    return 'No se pudo completar la operación. Revisa la conexión e inténtalo de nuevo.';
  };
  function status(text){document.getElementById('account-status').textContent=text;}
  if(user&&sessionStorage.getItem('studyRecoveryUser')===user.id){
    root.innerHTML='<h1>Elige una nueva contraseña</h1><form id="recovery-form" class="account-form"><label for="recovery-password">Nueva contraseña</label><input id="recovery-password" type="password" autocomplete="new-password" minlength="10" required><label for="recovery-confirm">Repite la contraseña</label><input id="recovery-confirm" type="password" autocomplete="new-password" minlength="10" required><button class="account-primary">Guardar nueva contraseña</button></form><p id="account-status" role="status"></p>';
    document.getElementById('recovery-form').onsubmit=async e=>{
      e.preventDefault();const password=document.getElementById('recovery-password').value;
      if(password!==document.getElementById('recovery-confirm').value){status('Las contraseñas no coinciden.');return;}
      e.submitter.disabled=true;
      try{
        const result=await cloud.client.auth.updateUser({password});if(result.error)throw result.error;
        sessionStorage.removeItem('studyRecoveryUser');e.target.reset();status('Contraseña actualizada. Ya puedes continuar.');
        const link=document.createElement('a');link.href='account.html';link.textContent='Ir a mi cuenta';root.append(link);
      }catch(error){status(errorText(error));e.submitter.disabled=false;}
    };return;
  }
  function form(mode='login'){
    const signup=mode==='signup',reset=mode==='reset';
    root.innerHTML=`<h1>Tu cuenta de StudyEnglish</h1><p>Continúa con el mismo progreso en móvil y ordenador. También puedes seguir usando los perfiles locales.</p>
      <div class="account-tabs"><button id="show-login" class="account-secondary">Iniciar sesión</button><button id="show-signup" class="account-secondary">Crear cuenta</button></div>
      <form id="cloud-form" class="account-form"><h2>${reset?'Recuperar contraseña':signup?'Crear cuenta':'Iniciar sesión'}</h2>
      <label for="cloud-email">Correo electrónico</label><input id="cloud-email" type="email" autocomplete="email" required maxlength="254">
      ${reset?'':`<label for="cloud-password">Contraseña</label><input id="cloud-password" type="password" autocomplete="${signup?'new-password':'current-password'}" ${signup?'minlength="10"':''} required>`}
      ${signup?'<label for="cloud-confirm">Repite la contraseña</label><input id="cloud-confirm" type="password" autocomplete="new-password" minlength="10" required><p>Usa al menos 10 caracteres. Tendrás que confirmar tu correo para entrar.</p>':''}
      <p id="account-status" role="status"></p><button class="account-primary" type="submit" ${((signup||reset)&&!cloud.config.emailReady)?'disabled':''}>${reset?'Enviar enlace':signup?'Registrarme':'Entrar'}</button></form>
      <button id="show-reset" class="account-secondary">He olvidado mi contraseña</button>
      ${!cloud.config.emailReady?'<p class="info-notice">Estamos configurando los correos de confirmación y recuperación. Las altas públicas todavía no están disponibles. Puedes seguir estudiando con tu perfil local.</p>':''}
      <p>Consulta cómo protegemos tus datos en la <a href="privacy.html">política de privacidad</a>.</p>`;
    document.getElementById('show-login').onclick=()=>form('login');
    document.getElementById('show-signup').onclick=()=>form('signup');
    document.getElementById('show-reset').onclick=()=>form('reset');
    document.getElementById('cloud-form').onsubmit=async event=>{
      event.preventDefault();
      if((signup||reset)&&!cloud.config.emailReady)return;
      const email=document.getElementById('cloud-email').value.trim(),password=document.getElementById('cloud-password')?.value;
      if(signup&&password!==document.getElementById('cloud-confirm').value){status('Las contraseñas no coinciden.');return;}
      const submit=event.submitter;submit.disabled=true;status('Procesando…');
      try{
        const redirectTo='https://alejandrocm02.github.io/web-estudio-ingles/account.html';
        const result=reset?await cloud.client.auth.resetPasswordForEmail(email,{redirectTo}):signup?
          await cloud.client.auth.signUp({email,password,options:{emailRedirectTo:redirectTo}}):await cloud.client.auth.signInWithPassword({email,password});
        if(result.error)throw result.error;
        if(reset)status('Si existe una cuenta con ese correo, recibirás un enlace para cambiar la contraseña.');
        else if(signup)status('Revisa tu correo y confirma la cuenta. Después podrás iniciar sesión aquí.');
        else status('Sesión iniciada. Cargando tu progreso…');
        document.getElementById('cloud-password')?.setAttribute('value','');
        if(document.getElementById('cloud-password'))document.getElementById('cloud-password').value='';
      }catch(error){status(errorText(error));}finally{submit.disabled=false;}
    };
  }
  if(!user){form();return;}
  const source=cloud.localSource();
  root.innerHTML=`<h1>Mi cuenta</h1><p>Sesión iniciada como <strong>${escape(user.email)}</strong>.</p><p data-cloud-status role="status">${escape(cloud.getStatus())}</p>
    <div class="account-tabs"><button id="sync-now" class="account-primary">Sincronizar ahora</button><button id="cloud-logout" class="account-secondary">Cerrar sesión</button></div>
    <section class="exercise-block"><h2>Traer mi progreso local</h2><p>Origen: perfil local <strong>${escape(source.name)}</strong> de este navegador. Destino: <strong>${escape(user.email)}</strong>.</p><p>Se combinarán los avances y se guardará una copia local previa. No se copiarán contraseñas ni otros perfiles.</p><label><input id="confirm-migration" type="checkbox"> Quiero copiar ese progreso a mi cuenta.</label><button id="migrate-local" class="account-primary" disabled>Importar progreso local</button></section>
    <section class="exercise-block"><h2>Cambiar mi contraseña</h2><form id="password-form" class="account-form"><label for="current-password">Contraseña actual</label><input id="current-password" type="password" autocomplete="current-password" required><label for="new-password">Nueva contraseña</label><input id="new-password" type="password" autocomplete="new-password" minlength="10" required><label for="confirm-new-password">Repite la nueva contraseña</label><input id="confirm-new-password" type="password" autocomplete="new-password" minlength="10" required><button class="account-primary">Guardar contraseña</button></form></section>
    <p id="account-status" role="status"></p><p><a href="learn.html">Continuar mi ruta de estudio</a></p>`;
  document.getElementById('sync-now').onclick=()=>cloud.sync();
  document.getElementById('confirm-migration').onchange=e=>{document.getElementById('migrate-local').disabled=!e.target.checked;};
  document.getElementById('migrate-local').onclick=async e=>{
    e.target.disabled=true;
    try{const ok=await cloud.importLocal();status(ok?'Progreso importado y sincronizado.':'Progreso importado en este dispositivo; la sincronización está pendiente.');}
    catch(_){status('No se pudo importar. Comprueba el almacenamiento del navegador.');e.target.disabled=false;}
  };
  document.getElementById('cloud-logout').onclick=async e=>{
    e.target.disabled=true;await cloud.sync();
    const result=await cloud.client.auth.signOut({scope:'local'});
    if(result.error){status('No se pudo cerrar la sesión. Vuelve a intentarlo.');e.target.disabled=false;}
  };
  document.getElementById('password-form').onsubmit=async e=>{
    e.preventDefault();const password=document.getElementById('new-password').value;
    if(password!==document.getElementById('confirm-new-password').value){status('Las contraseñas no coinciden.');return;}
    e.submitter.disabled=true;
    try{
      const result=await cloud.client.auth.updateUser({password,currentPassword:document.getElementById('current-password').value});
      if(result.error)throw result.error;
      status('Contraseña actualizada.');e.target.reset();
    }catch(error){status(errorText(error));}finally{e.submitter.disabled=false;}
  };
})();
