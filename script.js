// ============================================================
//  SCRIPT.JS — Logica completa del sitio
//  El vocabulario se carga desde vocabulary.json (1000+ palabras)
//  El resto del contenido viene de data.js
// ============================================================


// ─── 0. PROGRESO (localStorage) ────────────────────────────────────────────
//  Guarda ejercicios de gramatica correctos, mejores puntuaciones de tests,
//  palabras de vocabulario marcadas como aprendidas, audios escuchados
//  y racha de dias de estudio.

const PROGRESS_KEY = 'studyProgressV1';

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    const p = raw ? JSON.parse(raw) : {};
    p.grammar    = p.grammar    || {};
    p.tests      = p.tests      || {};
    p.vocabKnown = p.vocabKnown || {};
    p.listening  = p.listening  || {};
    p.streak     = p.streak     || { count: 0, lastDate: '' };
    return p;
  } catch (e) {
    return { grammar: {}, tests: {}, vocabKnown: {}, listening: {}, streak: { count: 0, lastDate: '' } };
  }
}

function saveProgress(p) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

function getTotals() {
  const grammar = data.grammar.levels.reduce((a, l) => a + l.exercises.length, 0);
  const tests = data.tests.levels.reduce((a, l) => a + l.questions.length, 0);
  const listening = data.listening.levels.reduce((a, l) => a + l.tracks.length, 0);
  let vocabulary = data.vocabulary.levels.reduce((a, l) => a + l.words.length, 0);
  if (vocabularyData) {
    vocabulary = Object.values(vocabularyData).reduce((a, arr) => a + arr.length, 0);
  }
  return { grammar, tests, listening, vocabulary };
}

function getDone(progress) {
  const grammar = Object.values(progress.grammar).reduce((a, arr) => a + arr.filter(Boolean).length, 0);
  const tests = Object.values(progress.tests).reduce((a, o) => a + (o.best || 0), 0);
  const listening = Object.values(progress.listening).reduce((a, arr) => a + arr.filter(Boolean).length, 0);
  const vocabulary = Object.keys(progress.vocabKnown).length;
  return { grammar, tests, listening, vocabulary };
}

function updateCardProgress(key) {
  const progress = loadProgress();
  const totals = getTotals();
  const done = getDone(progress);
  const total = totals[key] || 0;
  const doneCount = Math.min(done[key] || 0, total);
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const fill = document.getElementById(`progress-fill-${key}`);
  if (fill) fill.style.width = pct + '%';
  const label = document.getElementById(`progress-pct-${key}`);
  if (label) label.textContent = pct + '%';
}

function updateAllCardProgress() {
  ['grammar', 'vocabulary', 'tests', 'listening'].forEach(updateCardProgress);
}

function updateStreakDisplay() {
  const progress = loadProgress();
  const today = new Date().toISOString().slice(0, 10);

  if (progress.streak.lastDate !== today) {
    const last = progress.streak.lastDate ? new Date(progress.streak.lastDate) : null;
    const diffDays = last ? Math.round((new Date(today) - last) / 86400000) : null;
    progress.streak.count = diffDays === 1 ? progress.streak.count + 1 : 1;
    progress.streak.lastDate = today;
    saveProgress(progress);
  }

  const badge = document.getElementById('streak-badge');
  if (badge) {
    const n = progress.streak.count;
    badge.textContent = `🔥 Racha de estudio: ${n} día${n === 1 ? '' : 's'}`;
  }
}


// ─── 1. TEMA CLARO / OSCURO ─────────────────────────────────────────────────

function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const updateIcon = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  };
  updateIcon();

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon();
  });
}


// ─── 1.5 CATEGORIAS TEMATICAS DE VOCABULARIO ───────────────────────────────
//  Clasifica cada palabra automaticamente por tema (comida, familia, casa...)
//  comparando la palabra y su traduccion contra listas de referencia.
//  Asi las 1000+ palabras del JSON quedan organizadas sin tener que
//  etiquetarlas una a una a mano.

const VOCAB_CATEGORIES = [
  { key: 'food', label: 'Comida y Bebida', icon: '🍎', words: [
    'apple','manzana','banana','platano','plátano','orange','naranja','bread','pan','milk','leche','coffee','cafe','café',
    'tea','te','té','water','agua','juice','zumo','jugo','egg','eggs','huevo','huevos','cheese','queso','meat','carne',
    'chicken','pollo','beef','ternera','pork','cerdo','fish','pescado','pez','rice','arroz','pasta','soup','sopa',
    'salad','ensalada','sugar','azucar','azúcar','salt','sal','pepper','pimienta','butter','mantequilla','cake','pastel',
    'tarta','cookie','galleta','chocolate','fruit','fruta','vegetable','verdura','vegetables','verduras','potato','patata',
    'tomato','tomate','onion','cebolla','garlic','ajo','lemon','limon','limón','grape','uva','strawberry','fresa',
    'breakfast','desayuno','lunch','almuerzo','dinner','cena','meal','comida','snack','merienda','restaurant','restaurante',
    'menu','menú','recipe','receta','cook','cocinar','bake','hornear','fry','freir','freír','boil','hervir','drink',
    'bebida','beber','hungry','hambriento','thirsty','sediento','delicious','delicioso','tasty','sabroso','spicy','picante',
    'sweet','dulce','sour','agrio','bitter','amargo','wine','vino','beer','cerveza','sandwich','bocadillo','honey','miel'
  ]},
  { key: 'family', label: 'Familia y Personas', icon: '👪', words: [
    'father','padre','mother','madre','brother','hermano','sister','hermana','son','hijo','daughter','hija','parent',
    'parents','padres','child','niño','niña','children','hijos','baby','bebe','bebé','husband','esposo','marido',
    'wife','esposa','mujer','grandmother','abuela','grandfather','abuelo','grandparent','uncle','tio','tío','aunt','tia','tía',
    'cousin','primo','prima','nephew','sobrino','niece','sobrina','friend','amigo','amiga','neighbour','neighbor','vecino',
    'vecina','man','hombre','woman','boy','chico','girl','chica','person','persona','people','gente','couple','pareja',
    'family','familia','relative','pariente','teenager','adolescente','adult','adulto','twin','gemelo'
  ]},
  { key: 'home', label: 'Casa y Objetos', icon: '🏠', words: [
    'house','casa','home','hogar','room','habitacion','habitación','cuarto','bedroom','dormitorio','kitchen','cocina',
    'bathroom','baño','garden','jardin','jardín','door','puerta','window','ventana','table','mesa','chair','silla',
    'bed','cama','sofa','sofá','couch','desk','escritorio','shelf','estante','lamp','lampara','lámpara','clock','reloj',
    'mirror','espejo','carpet','alfombra','curtain','cortina','wall','pared','floor','suelo','piso','roof','tejado',
    'key','llave','lock','cerradura','furniture','muebles','wardrobe','armario','drawer','cajon','cajón','blanket','manta',
    'pillow','almohada','towel','toalla','plate','plato','cup','taza','glass','vaso','bowl','cuenco','fork','tenedor',
    'spoon','cuchara','knife','cuchillo','pan','sarten','sartén','oven','horno','fridge','refrigerator','nevera'
  ]},
  { key: 'places', label: 'Ciudad, Lugares y Transporte', icon: '🏙️', words: [
    'city','ciudad','town','pueblo','village','aldea','country','pais','país','street','calle','road','carretera',
    'avenue','avenida','bridge','puente','park','parque','market','mercado','shop','tienda','store','mall','museum',
    'museo','church','iglesia','hospital','airport','aeropuerto','station','estacion','estación','hotel','beach','playa',
    'mountain','montaña','river','rio','río','lake','lago','sea','mar','ocean','oceano','océano','forest','bosque',
    'island','isla','map','mapa','address','direccion','dirección','bus','autobus','autobús','train','tren','car','coche',
    'carro','taxi','plane','airplane','avion','avión','bicycle','bike','bicicleta','boat','barco','ship','buque','subway',
    'metro','traffic','trafico','tráfico','journey','trip','viaje','travel','viajar','tourist','turista','ticket',
    'billete','luggage','equipaje','suitcase','maleta','passport','pasaporte','direction','esquina','square','plaza'
  ]},
  { key: 'work', label: 'Trabajo y Estudios', icon: '💼', words: [
    'job','trabajo','work','career','carrera','office','oficina','business','negocio','company','empresa','boss','jefe',
    'employee','empleado','employer','manager','gerente','colleague','compañero','meeting','reunion','reunión','salary',
    'salario','wage','sueldo','interview','entrevista','resume','cv','teacher','profesor','profesora','student',
    'estudiante','alumno','school','colegio','escuela','university','universidad','college','class','clase','classroom',
    'aula','lesson','leccion','lección','homework','deberes','exam','examen','test','degree','titulo','título','subject',
    'asignatura','teach','enseñar','learn','aprender','study','estudiar','education','educacion','educación','professor',
    'course','curso','project','proyecto','deadline','plazo','report','informe','contract','contrato','client','cliente',
    'customer','factory','fabrica','fábrica','industry','industria'
  ]},
  { key: 'health', label: 'Cuerpo y Salud', icon: '🩺', words: [
    'body','cuerpo','head','cabeza','face','cara','eye','ojo','eyes','ojos','ear','oreja','nose','nariz','mouth','boca',
    'teeth','tooth','diente','dientes','hair','pelo','cabello','hand','mano','hands','manos','arm','brazo','leg','pierna',
    'foot','feet','pie','pies','finger','dedo','back','espalda','chest','pecho','stomach','estomago','estómago','heart',
    'corazon','corazón','skin','piel','health','salud','sick','enfermo','illness','enfermedad','disease','doctor',
    'medico','médico','nurse','enfermera','medicine','medicina','pill','pastilla','pain','dolor','headache','dolor de cabeza',
    'fever','fiebre','cough','tos','cold','resfriado','injury','lesion','lesión','wound','herida','exercise','ejercicio',
    'diet','dieta','dentist','dentista','ambulance','ambulancia','symptom','sintoma','síntoma','treatment','tratamiento'
  ]},
  { key: 'nature', label: 'Naturaleza, Animales y Clima', icon: '🌿', words: [
    'tree','arbol','árbol','flower','flor','plant','planta','grass','hierba','leaf','hoja','forest','bosque','sky','cielo',
    'sun','sol','moon','luna','star','estrella','cloud','nube','rain','lluvia','snow','nieve','wind','viento','storm',
    'tormenta','weather','tiempo','clima','season','estacion','estación','spring','primavera','summer','verano','autumn',
    'otoño','winter','invierno','animal','dog','perro','cat','gato','bird','pajaro','pájaro','fish','pez','horse','caballo',
    'cow','vaca','pig','cerdo','sheep','oveja','lion','leon','león','tiger','tigre','elephant','elefante','bear','oso',
    'wolf','lobo','fox','zorro','rabbit','conejo','mouse','raton','ratón','insect','insecto','bee','abeja','spider','araña',
    'butterfly','mariposa','environment','medio ambiente','nature','naturaleza','earth','tierra','planet','planeta',
    'ice','hielo'
  ]},
  { key: 'emotions', label: 'Emociones y Personalidad', icon: '😊', words: [
    'happy','feliz','sad','triste','angry','enfadado','enojado','afraid','asustado','scared','nervous','nervioso',
    'excited','emocionado','bored','aburrido','tired','cansado','worried','preocupado','surprised','sorprendido','proud',
    'orgulloso','ashamed','avergonzado','jealous','celoso','confident','seguro','shy','timido','tímido','brave','valiente',
    'kind','amable','friendly','simpatico','simpático','honest','honesto','generous','generoso','patient','paciente',
    'polite','educado','rude','maleducado','lazy','perezoso','hardworking','trabajador','ambitious','ambicioso','funny',
    'gracioso','serious','serio','calm','tranquilo','relaxed','relajado','stressed','estresado','lonely','solo','love',
    'amor','amar','hate','odiar','like','gustar','dislike','feeling','sentimiento','emotion','emocion','emoción','mood',
    'grateful','agradecido','curious','curioso','eager','entusiasta','cheerful','alegre','anxious','ansioso'
  ]},
  { key: 'time', label: 'Tiempo, Números y Colores', icon: '⏰', words: [
    'time','tiempo','hour','hora','minute','minuto','second','segundo','day','dia','día','week','semana','month','mes',
    'year','año','today','hoy','tomorrow','mañana','yesterday','ayer','morning','afternoon','tarde','evening','night',
    'noche','date','fecha','calendar','calendario','clock','reloj','early','temprano','late','tarde','soon','pronto',
    'now','ahora','before','antes','after','despues','después','always','siempre','never','nunca','sometimes','a veces',
    'often','a menudo','usually','normalmente','number','numero','número','one','uno','two','dos','three','tres','four',
    'cuatro','five','cinco','six','seis','seven','siete','eight','ocho','nine','nueve','ten','diez','hundred','cien',
    'thousand','mil','color','colour','red','rojo','blue','azul','green','verde','yellow','amarillo','black','negro',
    'white','blanco','purple','morado','pink','rosa','brown','marron','marrón','grey','gray','gris'
  ]},
  { key: 'tech', label: 'Tecnología y Comunicación', icon: '💻', words: [
    'computer','ordenador','computadora','laptop','portatil','portátil','phone','telefono','teléfono','mobile','movil',
    'móvil','smartphone','internet','email','correo','website','pagina web','página web','app','aplicacion','aplicación',
    'software','hardware','keyboard','teclado','mouse','raton','ratón','screen','pantalla','password','contraseña',
    'message','mensaje','text','texto','call','llamada','video','camera','camara','cámara','photo','foto','picture',
    'imagen','online','download','descargar','upload','subir','file','archivo','data','datos','network','red','wifi',
    'battery','bateria','batería','charger','cargador','device','dispositivo','technology','tecnologia','tecnología',
    'digital','robot','code','codigo','código','program','programa'
  ]},
  { key: 'leisure', label: 'Deportes y Ocio', icon: '⚽', words: [
    'sport','deporte','football','futbol','fútbol','soccer','basketball','baloncesto','tennis','tenis','swim','nadar',
    'swimming','natacion','natación','gym','gimnasio','game','juego','play','jugar','team','equipo','match','partido',
    'ball','pelota','balon','balón','race','carrera','hobby','pasatiempo','music','musica','música','song','cancion',
    'canción','movie','pelicula','película','film','concert','concierto','book','libro','read','leer','dance','bailar',
    'danza','art','arte','paint','pintar','draw','dibujar','holiday','vacaciones','vacation','party','fiesta','festival'
  ]},
  { key: 'shopping', label: 'Ropa, Compras y Dinero', icon: '👕', words: [
    'shirt','camisa','trousers','pantalones','pants','dress','vestido','skirt','falda','jacket','chaqueta','coat',
    'abrigo','shoes','zapatos','socks','calcetines','hat','sombrero','glasses','gafas','jeans','vaqueros','sweater',
    'jersey','clothes','ropa','clothing','wear','llevar','vestir','size','talla','fashion','moda','shop','tienda',
    'store','buy','comprar','sell','vender','price','precio','cost','costar','cheap','barato','expensive','caro',
    'money','dinero','cash','efectivo','card','tarjeta','credit','credito','crédito','pay','pagar','bill','factura',
    'receipt','recibo','discount','descuento','sale','rebaja','wallet','cartera','purse','bolso','bag','bolsa'
  ]},
  { key: 'actions', label: 'Verbos y Acciones', icon: '🏃', words: [
    'go','ir','come','venir','walk','caminar','run','correr','jump','saltar','sit','sentarse','stand','levantarse',
    'sleep','dormir','wake','despertar','eat','comer','drink','beber','speak','hablar','talk','listen','escuchar',
    'hear','oir','oír','see','ver','look','mirar','watch','write','escribir','read','leer','open','abrir','close',
    'cerrar','start','empezar','begin','comenzar','finish','terminar','stop','parar','give','dar','take','tomar',
    'make','hacer','get','obtener','put','poner','bring','traer','carry','llevar','hold','sujetar','push','empujar',
    'pull','tirar','buy','comprar','sell','vender','help','ayudar','ask','preguntar','answer','responder','understand',
    'entender','remember','recordar','forget','olvidar','find','encontrar','lose','perder','win','ganar','try','intentar'
  ]},
  { key: 'descriptive', label: 'Adjetivos y Descripciones', icon: '📏', words: [
    'big','grande','small','pequeño','tall','alto','short','bajo','corto','long','largo','wide','ancho','narrow',
    'estrecho','heavy','pesado','light','ligero','fast','rapido','rápido','slow','lento','hot','caliente','warm',
    'templado','cool','fresco','new','nuevo','old','viejo','young','joven','easy','facil','fácil','difficult','dificil',
    'difícil','hard','duro','simple','sencillo','clean','limpio','dirty','sucio','quiet','tranquilo','loud','ruidoso',
    'noisy','empty','vacio','vacío','full','lleno','strong','fuerte','weak','debil','débil','high','alto','low','bajo',
    'near','cerca','far','lejos','good','bueno','bad','malo','beautiful','hermoso','bonito','ugly','feo','nice',
    'agradable','dangerous','peligroso','safe','seguro','important','importante','interesting','interesante','boring',
    'aburrido','different','diferente','similar','same','igual'
  ]},
];

// Mapa palabra -> categoria, construido una vez a partir de las listas de arriba
const WORD_TO_CATEGORY = {};
VOCAB_CATEGORIES.forEach(cat => {
  cat.words.forEach(w => {
    if (!WORD_TO_CATEGORY[w]) WORD_TO_CATEGORY[w] = cat.key;
  });
});

function tokenize(str) {
  return String(str)
    .toLowerCase()
    .split(/[^a-zàáâäèéêëìíîïòóôöùúûüñ0-9]+/i)
    .filter(Boolean);
}

function categorizeWord(word, translation) {
  const tokens = tokenize(word + ' ' + (translation || ''));
  for (const t of tokens) {
    if (WORD_TO_CATEGORY[t]) return WORD_TO_CATEGORY[t];
  }
  return 'general';
}

function getCategoryInfo(key) {
  return VOCAB_CATEGORIES.find(c => c.key === key) || { key: 'general', label: 'General', icon: '🔤' };
}


// ─── 2. CARGAR VOCABULARIO DESDE JSON ──────────────────────────────────────
//  Se carga al inicio. El resto de la web funciona igual mientras carga.

let vocabularyData = null;
let vocabularyIndexed = null; // { A1: [{word,translation,example,category}], ... }

function indexVocabulary() {
  vocabularyIndexed = {};
  Object.keys(vocabularyData).forEach(level => {
    vocabularyIndexed[level] = vocabularyData[level].map(w => ({
      ...w,
      category: categorizeWord(w.word, w.translation)
    }));
  });
}

async function loadVocabulary() {
  try {
    const response = await fetch('vocabulary.json');
    vocabularyData = await response.json();
    console.log('Vocabulario cargado:',
      Object.values(vocabularyData).reduce((acc, arr) => acc + arr.length, 0), 'palabras');
  } catch (error) {
    console.error('Error cargando vocabulary.json:', error);
    // Si falla, usa el vocabulario de data.js como respaldo
    vocabularyData = {
      A1: data.vocabulary.levels[0].words,
      B1: data.vocabulary.levels[1].words,
      C1: data.vocabulary.levels[2].words,
    };
  }
  indexVocabulary();
  updateCardProgress('vocabulary');
}


// ─── 3. GENERAR LAS CARDS DEL INICIO ───────────────────────────────────────
//  Cada card es un enlace real a su propia pagina (grammar.html, etc.)

const grid = document.getElementById('cards-grid');
const sections = ['grammar', 'vocabulary', 'tests', 'listening', 'theory'];

function renderCards() {
  grid.innerHTML = '';
  sections.forEach(key => {
    const s = data[key];

    const card = document.createElement('a');
    card.className = 'card';
    card.href = `${key}.html`;
    card.dataset.section = key;

    const progressHTML = key === 'theory' ? '' : `
      <div class="card-progress">
        <div class="card-progress-fill" id="progress-fill-${key}" style="width:0%"></div>
      </div>`;

    card.innerHTML = `
      <div class="card-icon">${s.icon}</div>
      <h2>${s.title}</h2>
      <p>${s.description}</p>
      ${progressHTML}
      <div class="card-footer">
        <span class="count">${key === 'vocabulary' ? '1000+ palabras' : s.count}</span>
        <button class="card-btn" aria-label="Abrir ${s.title}" tabindex="-1">
          Entrar
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  updateAllCardProgress();
}


// ─── 4. CONTENEDOR DE CONTENIDO ────────────────────────────────────────────
//  En index.html no existe; en las paginas de seccion es el panel principal
//  donde se renderiza gramatica, vocabulario, tests, listening o teoria.

const content = document.getElementById('page-content');


// ─── 5. SELECTOR DE NIVEL ──────────────────────────────────────────────────

const levelColors = {
  A1: { bg: '#E1F5EE', text: '#085041' },
  B1: { bg: '#E6F1FB', text: '#0C447C' },
  C1: { bg: '#FAEEDA', text: '#633806' },
};

function renderLevelSelector(levelKeys, activeIndex, sectionKey) {
  let html = `<div style="display:flex; gap:8px; margin-bottom:24px; flex-wrap:wrap">`;

  levelKeys.forEach((lvlKey, i) => {
    const active = i === activeIndex;
    const c = levelColors[lvlKey] || { bg: 'var(--border)', text: 'var(--text-muted)' };
    html += `
      <button
        onclick="switchLevel('${sectionKey}', ${i})"
        style="padding:7px 18px; border-radius:99px;
               border:${active ? '1.5px solid ' + c.text : '0.5px solid var(--border-strong)'};
               background:${active ? c.bg : 'var(--surface)'};
               color:${active ? c.text : 'var(--text-muted)'};
               font-family:'DM Sans',sans-serif;
               font-size:13px; font-weight:${active ? '600' : '400'};
               cursor:pointer; transition:all 0.15s;">
        ${lvlKey}
      </button>`;
  });

  html += `</div>`;
  return html;
}

function switchLevel(sectionKey, levelIndex) {
  content.innerHTML = renderSection(sectionKey, levelIndex);
}


// ─── 6. GRAMATICA ──────────────────────────────────────────────────────────

function renderGrammar(levelIndex = 0) {
  const s = data.grammar;
  const lvl = s.levels[levelIndex];
  const c = levelColors[lvl.level];
  const levelKeys = s.levels.map(l => l.level);
  const progress = loadProgress();
  const doneArr = progress.grammar[lvl.level] || [];
  const doneCount = doneArr.filter(Boolean).length;

  // Agrupar ejercicios por tema, conservando el orden de aparicion
  const topicOrder = [];
  const byTopic = {};
  lvl.exercises.forEach((ex, i) => {
    const topic = ex.topic || 'General';
    if (!byTopic[topic]) { byTopic[topic] = []; topicOrder.push(topic); }
    byTopic[topic].push(i);
  });

  let html = `
    <h2>📐 ${s.title}</h2>
    <p class="subtitle">Escribe la respuesta correcta en cada campo · agrupado por tema</p>
    ${renderLevelSelector(levelKeys, levelIndex, 'grammar')}
    <div style="display:inline-block; background:${c.bg}; color:${c.text};
                padding:4px 12px; border-radius:99px; font-size:12px; font-weight:600;
                margin-bottom:16px">Nivel ${lvl.level} · ${doneCount}/${lvl.exercises.length} completados</div>
  `;

  topicOrder.forEach(topic => {
    html += `<div style="display:flex; align-items:center; gap:8px; margin:18px 0 10px">
      <h3 style="font-family:'DM Serif Display',serif; font-size:16px; font-weight:400; color:${c.text}">${topic}</h3>
      <div style="flex:1; height:1px; background:var(--border)"></div>
    </div>`;

    byTopic[topic].forEach(i => {
      const ex = lvl.exercises[i];
      const isDone = !!doneArr[i];
      html += `
        <div class="exercise-block">
          <p class="question">${i + 1}. ${ex.question} ${isDone ? '<span style="color:var(--teal-500)">✓</span>' : ''}</p>
          <div style="display:flex; gap:8px; align-items:center">
            <input type="text" id="inp-${i}" placeholder="Tu respuesta..."
              style="flex:1; padding:9px 12px; border:0.5px solid var(--border-strong); background:var(--surface); color:var(--text);
                     border-radius:6px; font-family:'DM Sans',sans-serif; font-size:14px; outline:none;"
              onkeydown="if(event.key==='Enter') checkGrammar(${i}, ${levelIndex})">
            <button class="card-btn" onclick="checkGrammar(${i}, ${levelIndex})">Comprobar</button>
          </div>
          <p style="font-size:12px; color:var(--text-muted); margin-top:6px">💡 ${ex.hint}</p>
          <p id="fb-${i}" class="feedback-msg"></p>
        </div>`;
    });
  });

  return html;
}

function checkGrammar(i, levelIndex) {
  const lvl = data.grammar.levels[levelIndex];
  const input = document.getElementById(`inp-${i}`);
  const fb    = document.getElementById(`fb-${i}`);
  const valor = input.value.trim().toLowerCase();
  const correcta = lvl.exercises[i].answer.toLowerCase();
  const isCorrect = valor === correcta;

  fb.className = 'feedback-msg show';
  if (isCorrect) {
    fb.classList.add('ok');
    fb.textContent = 'Correcto!';
    input.style.borderColor = '#639922';
  } else {
    fb.classList.add('ko');
    fb.textContent = 'Respuesta correcta: "' + lvl.exercises[i].answer + '"';
    input.style.borderColor = '#E24B4A';
  }

  const progress = loadProgress();
  if (!progress.grammar[lvl.level]) progress.grammar[lvl.level] = [];
  if (isCorrect) progress.grammar[lvl.level][i] = true;
  saveProgress(progress);
  updateCardProgress('grammar');
}


// ─── 7. VOCABULARY (carga desde vocabulary.json) ───────────────────────────

// Estado de busqueda, categoria y paginacion
let vocabSearch = '';
let vocabCategory = 'all';
let vocabPage = 0;
const WORDS_PER_PAGE = 24;
let currentVocabLevel = 'A1';

function renderVocabulary(levelIndex = 0) {
  const levelKeys = ['A1', 'B1', 'C1'];
  currentVocabLevel = levelKeys[levelIndex];
  vocabPage = 0;
  vocabSearch = '';
  vocabCategory = 'all';

  // Si el JSON aun no cargo, muestra un spinner
  if (!vocabularyIndexed) {
    setTimeout(() => { content.innerHTML = renderVocabulary(levelIndex); }, 300);
    return `
      <h2>📚 Vocabulary</h2>
      <div style="text-align:center; padding:40px; color:var(--text-muted)">
        <div style="font-size:32px; margin-bottom:12px">⏳</div>
        Cargando palabras...
      </div>`;
  }

  return buildVocabHTML(levelIndex);
}

function escAttr(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function buildVocabHTML(levelIndex = 0) {
  const levelKeys = ['A1', 'B1', 'C1'];
  currentVocabLevel = levelKeys[levelIndex];
  const c = levelColors[currentVocabLevel];
  const allWords = vocabularyIndexed[currentVocabLevel] || [];
  const progress = loadProgress();
  const knownInLevel = allWords.filter(w => progress.vocabKnown[w.word.toLowerCase()]).length;

  // Categorias presentes en este nivel, con recuento
  const countsByCategory = {};
  allWords.forEach(w => { countsByCategory[w.category] = (countsByCategory[w.category] || 0) + 1; });
  const categoryOptions = VOCAB_CATEGORIES
    .filter(cat => countsByCategory[cat.key])
    .map(cat => ({ ...cat, count: countsByCategory[cat.key] }));
  if (countsByCategory.general) categoryOptions.push({ key: 'general', label: 'General', icon: '🔤', count: countsByCategory.general });

  // Filtrar por categoria
  const byCategory = vocabCategory === 'all' ? allWords : allWords.filter(w => w.category === vocabCategory);

  // Filtrar por busqueda
  const filtered = vocabSearch
    ? byCategory.filter(w =>
        w.word.toLowerCase().includes(vocabSearch.toLowerCase()) ||
        w.translation.toLowerCase().includes(vocabSearch.toLowerCase()))
    : byCategory;

  // Paginar
  const totalPages = Math.ceil(filtered.length / WORDS_PER_PAGE);
  const pageWords  = filtered.slice(vocabPage * WORDS_PER_PAGE, (vocabPage + 1) * WORDS_PER_PAGE);

  let html = `
    <h2>📚 Vocabulary</h2>
    <p class="subtitle">${allWords.length} palabras · ${knownInLevel} aprendidas · Haz clic para ver la traduccion</p>
    ${renderLevelSelector(levelKeys, levelIndex, 'vocabulary')}

    <!-- Filtro por categoria tematica -->
    <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px">
      <button onclick="filterVocabCategory('all', ${levelIndex})"
        style="padding:5px 12px; border-radius:99px; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:12px;
               border:${vocabCategory === 'all' ? '1.5px solid ' + c.text : '0.5px solid var(--border-strong)'};
               background:${vocabCategory === 'all' ? c.bg : 'var(--surface)'};
               color:${vocabCategory === 'all' ? c.text : 'var(--text-muted)'};
               font-weight:${vocabCategory === 'all' ? '600' : '400'}">
        Todas (${allWords.length})
      </button>
      ${categoryOptions.map(cat => `
        <button onclick="filterVocabCategory('${cat.key}', ${levelIndex})"
          style="padding:5px 12px; border-radius:99px; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:12px;
                 border:${vocabCategory === cat.key ? '1.5px solid ' + c.text : '0.5px solid var(--border-strong)'};
                 background:${vocabCategory === cat.key ? c.bg : 'var(--surface)'};
                 color:${vocabCategory === cat.key ? c.text : 'var(--text-muted)'};
                 font-weight:${vocabCategory === cat.key ? '600' : '400'}">
          ${cat.icon} ${cat.label} (${cat.count})
        </button>`).join('')}
    </div>

    <!-- Barra de busqueda -->
    <div style="margin-bottom:16px; position:relative">
      <input type="text" id="vocab-search" value="${vocabSearch}"
        placeholder="Buscar palabra o traduccion..."
        oninput="searchVocab(this.value, ${levelIndex})"
        style="width:100%; padding:10px 14px 10px 36px; border:0.5px solid var(--border-strong); background:var(--surface); color:var(--text);
               border-radius:8px; font-family:'DM Sans',sans-serif; font-size:14px; outline:none;">
      <span style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--text-muted)">🔍</span>
    </div>

    <!-- Contador -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
      <div style="display:inline-block; background:${c.bg}; color:${c.text};
                  padding:4px 12px; border-radius:99px; font-size:12px; font-weight:600">
        Nivel ${currentVocabLevel}
      </div>
      <span style="font-size:12px; color:var(--text-muted)">
        ${vocabSearch || vocabCategory !== 'all' ? filtered.length + ' resultados' : 'Pagina ' + (vocabPage + 1) + ' de ' + totalPages}
      </span>
    </div>

    <!-- Grid de palabras -->
    <div class="vocab-grid">`;

  if (pageWords.length === 0) {
    html += `<div style="grid-column:1/-1; text-align:center; padding:30px; color:var(--text-muted)">
      No se encontraron palabras con ese termino.</div>`;
  } else {
    pageWords.forEach((w, i) => {
      const isKnown = !!progress.vocabKnown[w.word.toLowerCase()];
      const catInfo = getCategoryInfo(w.category);
      html += `
        <div class="vocab-card" id="vc-${i}"
             style="background:${c.bg}; border-color:rgba(0,0,0,0.08)"
             onclick="revealWord(${i})">
          <button class="know-btn ${isKnown ? 'known' : ''}" id="kb-${i}"
            onclick="toggleKnown('${escAttr(w.word)}', this, event)"
            aria-label="Marcar como aprendida">${isKnown ? '✓' : '☆'}</button>
          <div class="word" style="color:${c.text}">${w.word}</div>
          <div class="translation" style="color:${c.text}; opacity:0.8">${w.translation}</div>
          <div class="translation" style="font-style:italic; font-size:12px; color:${c.text}; opacity:0.6">"${w.example}"</div>
          <div class="hint" style="color:${c.text}; opacity:0.5">${catInfo.icon} ${catInfo.label} · Toca para revelar</div>
        </div>`;
    });
  }

  html += `</div>`;

  // Paginacion
  if (totalPages > 1 && !vocabSearch) {
    html += `
      <div style="display:flex; justify-content:center; gap:8px; margin-top:20px; flex-wrap:wrap">
        <button onclick="changeVocabPage(${levelIndex}, ${vocabPage - 1})"
          ${vocabPage === 0 ? 'disabled' : ''}
          style="padding:6px 14px; border-radius:6px; border:0.5px solid var(--border-strong);
                 background:var(--surface); color:var(--text); cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif;
                 opacity:${vocabPage === 0 ? '0.4' : '1'}">
          ← Anterior
        </button>
        <span style="padding:6px 14px; font-size:13px; color:var(--text-muted); align-self:center">
          ${vocabPage + 1} / ${totalPages}
        </span>
        <button onclick="changeVocabPage(${levelIndex}, ${vocabPage + 1})"
          ${vocabPage >= totalPages - 1 ? 'disabled' : ''}
          style="padding:6px 14px; border-radius:6px; border:0.5px solid var(--border-strong);
                 background:var(--surface); color:var(--text); cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif;
                 opacity:${vocabPage >= totalPages - 1 ? '0.4' : '1'}">
          Siguiente →
        </button>
      </div>`;
  }

  return html;
}

function filterVocabCategory(catKey, levelIndex) {
  vocabCategory = catKey;
  vocabPage = 0;
  content.innerHTML = buildVocabHTML(levelIndex);
  content.scrollTop = 0;
}

function searchVocab(value, levelIndex) {
  vocabSearch = value;
  vocabPage = 0;
  const vocabContent = buildVocabHTML(levelIndex);
  // Reemplaza solo el contenido del modal sin perder el foco del input
  content.innerHTML = vocabContent;
  const input = document.getElementById('vocab-search');
  if (input) { input.focus(); input.setSelectionRange(value.length, value.length); }
}

function changeVocabPage(levelIndex, newPage) {
  vocabPage = newPage;
  content.innerHTML = buildVocabHTML(levelIndex);
  content.scrollTop = 0;
}

function revealWord(i) {
  const card = document.getElementById(`vc-${i}`);
  card.classList.toggle('revealed');
  const hint = card.querySelector('.hint');
  hint.textContent = card.classList.contains('revealed') ? 'Toca para ocultar' : 'Toca para revelar';
}

function toggleKnown(word, btnEl, event) {
  event.stopPropagation();
  const progress = loadProgress();
  const key = word.toLowerCase();
  if (progress.vocabKnown[key]) {
    delete progress.vocabKnown[key];
    btnEl.classList.remove('known');
    btnEl.textContent = '☆';
  } else {
    progress.vocabKnown[key] = true;
    btnEl.classList.add('known');
    btnEl.textContent = '✓';
  }
  saveProgress(progress);
  updateCardProgress('vocabulary');
}


// ─── 8. TESTS ──────────────────────────────────────────────────────────────

let currentQ = 0;
let score = 0;
let currentTestLevel = 0;
let testResultsByQ = []; // true/false por pregunta respondida en esta ronda

function renderTests(levelIndex = 0) {
  currentTestLevel = levelIndex;
  currentQ = 0;
  score = 0;
  testResultsByQ = [];
  return renderQuestion(levelIndex);
}

function renderQuestion(levelIndex) {
  levelIndex = levelIndex !== undefined ? levelIndex : currentTestLevel;
  const s = data.tests;
  const lvl = s.levels[levelIndex];
  const c = levelColors[lvl.level];
  const levelKeys = s.levels.map(l => l.level);

  if (currentQ >= lvl.questions.length) {
    const total = lvl.questions.length;
    const emoji = score === total ? '🏆' : score >= Math.ceil(total / 2) ? '🎉' : '💪';
    const msg = score >= total - 1 ? 'Excelente nivel'
      : score >= Math.ceil(total / 2) ? 'Buen trabajo, sigue practicando'
      : 'Repasa los temas e intentalo de nuevo';

    const progress = loadProgress();
    const prevBest = (progress.tests[lvl.level] && progress.tests[lvl.level].best) || 0;
    progress.tests[lvl.level] = { best: Math.max(prevBest, score), total };
    saveProgress(progress);
    updateCardProgress('tests');
    const isNewBest = score > prevBest;

    // Desglose de aciertos por tema
    const byTopic = {};
    lvl.questions.forEach((q, i) => {
      const topic = q.topic || 'General';
      if (!byTopic[topic]) byTopic[topic] = { correct: 0, total: 0 };
      byTopic[topic].total++;
      if (testResultsByQ[i]) byTopic[topic].correct++;
    });

    const breakdownHTML = Object.keys(byTopic).map(topic => {
      const t = byTopic[topic];
      const pct = Math.round((t.correct / t.total) * 100);
      return `
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px">
          <span style="flex:0 0 150px; font-size:12px; color:var(--text); text-align:left">${topic}</span>
          <div style="flex:1; height:6px; background:var(--border); border-radius:99px; overflow:hidden">
            <div style="width:${pct}%; height:100%; background:${pct === 100 ? 'var(--teal-500)' : 'var(--amber-500)'}"></div>
          </div>
          <span style="flex:0 0 36px; font-size:12px; color:var(--text-muted); text-align:right">${t.correct}/${t.total}</span>
        </div>`;
    }).join('');

    return `
      <h2>✏️ Tests</h2>
      ${renderLevelSelector(levelKeys, levelIndex, 'tests')}
      <div style="text-align:center; padding:32px 20px 12px">
        <div style="font-size:48px; margin-bottom:16px">${emoji}</div>
        <h3 style="font-family:'DM Serif Display',serif; font-size:26px; font-weight:400; margin-bottom:8px">
          ${score} / ${total} correctas
        </h3>
        <p style="color:var(--text-muted); margin-bottom:8px">${msg}</p>
        ${isNewBest ? `<p style="color:var(--teal-500); font-size:13px; margin-bottom:20px">Nuevo mejor resultado 🎉</p>` : `<p style="color:var(--text-muted); font-size:13px; margin-bottom:20px">Mejor resultado: ${Math.max(prevBest, score)} / ${total}</p>`}
      </div>
      <div class="exercise-block" style="text-align:left">
        <p class="question">Desglose por tema</p>
        ${breakdownHTML}
      </div>
      <button class="card-btn" style="margin:16px auto 0" onclick="restartTest(${levelIndex})">Repetir test</button>`;
  }

  const q = lvl.questions[currentQ];
  return `
    <h2>✏️ Tests</h2>
    ${renderLevelSelector(levelKeys, levelIndex, 'tests')}
    <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:16px">
      <div style="display:inline-block; background:${c.bg}; color:${c.text};
                  padding:4px 12px; border-radius:99px; font-size:12px; font-weight:600;">
        Nivel ${lvl.level} · Pregunta ${currentQ + 1} de ${lvl.questions.length} · Puntos: ${score}
      </div>
      ${q.topic ? `<div style="display:inline-block; background:var(--border); color:var(--text-muted);
                  padding:4px 12px; border-radius:99px; font-size:12px;">🏷️ ${q.topic}</div>` : ''}
    </div>
    <div class="exercise-block">
      <p class="question">${q.q}</p>
      ${q.options.map((opt, i) => `
        <button class="option-btn" id="opt-${i}" onclick="checkAnswer(${i}, ${levelIndex})">
          ${String.fromCharCode(65 + i)}. ${opt}
        </button>`).join('')}
      <div id="test-fb" class="feedback-msg"></div>
      <button class="next-btn" id="next-btn" onclick="nextQuestion(${levelIndex})">Siguiente →</button>
    </div>`;
}

function checkAnswer(chosen, levelIndex) {
  const q  = data.tests.levels[levelIndex].questions[currentQ];
  const fb = document.getElementById('test-fb');
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
  document.getElementById(`opt-${q.correct}`).classList.add('correct');
  const isCorrect = chosen === q.correct;
  testResultsByQ[currentQ] = isCorrect;
  if (isCorrect) {
    score++;
    fb.className = 'feedback-msg show ok';
    fb.textContent = 'Correcto! ' + q.explanation;
  } else {
    document.getElementById(`opt-${chosen}`).classList.add('wrong');
    fb.className = 'feedback-msg show ko';
    fb.textContent = q.explanation;
  }
  document.getElementById('next-btn').classList.add('visible');
}

function nextQuestion(levelIndex) {
  currentQ++;
  content.innerHTML = renderQuestion(levelIndex);
}

function restartTest(levelIndex) {
  currentQ = 0; score = 0; testResultsByQ = [];
  content.innerHTML = renderQuestion(levelIndex);
}


// ─── 9. LISTENING (voz generada por el navegador) ──────────────────────────

let currentSpeechId = null;

function renderListening(levelIndex = 0) {
  const s = data.listening;
  const lvl = s.levels[levelIndex];
  const c = levelColors[lvl.level];
  const levelKeys = s.levels.map(l => l.level);
  const progress = loadProgress();
  const doneArr = progress.listening[lvl.level] || [];
  const supported = 'speechSynthesis' in window;

  let html = `
    <h2>🎧 ${s.title}</h2>
    <p class="subtitle">Pulsa reproducir para escuchar el audio (voz generada por el navegador)</p>
    ${renderLevelSelector(levelKeys, levelIndex, 'listening')}
    <div style="display:inline-block; background:${c.bg}; color:${c.text};
                padding:4px 12px; border-radius:99px; font-size:12px; font-weight:600; margin-bottom:16px">
      Nivel ${lvl.level}
    </div>`;

  if (!supported) {
    html += `<p style="font-size:13px; color:var(--coral-500); margin-bottom:12px">
      Tu navegador no soporta sintesis de voz. Aqui tienes las transcripciones para leer.</p>`;
  }

  lvl.tracks.forEach((t, i) => {
    const isDone = !!doneArr[i];
    html += `
      <div class="audio-block" style="background:${c.bg}; border-color:rgba(0,0,0,0.08)">
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:2px">
          <div class="audio-title" style="color:${c.text}; margin-bottom:0">${t.title} ${isDone ? '✓' : ''}</div>
          ${t.context ? `<span style="font-size:11px; font-weight:600; color:${c.text}; background:rgba(255,255,255,0.5);
              padding:2px 9px; border-radius:99px">${t.context}</span>` : ''}
        </div>
        <div class="audio-desc" style="color:${c.text}; opacity:0.7">${t.desc}</div>
        ${supported ? `
        <button class="play-btn" id="play-${i}" style="background:${c.text}" onclick="toggleListen(${i}, ${levelIndex})">
          ▶ Reproducir
        </button>
        <button class="transcript-toggle" style="color:${c.text}" onclick="toggleTranscript(${i}, this)">Ver texto</button>
        <div class="progress-bar">
          <div class="progress-bar-fill" id="prog-${i}" style="width:${isDone ? 100 : 0}%"></div>
        </div>` : ''}
        <div class="transcript-box ${!supported ? 'show' : ''}" id="transcript-${i}">${t.script || t.desc}</div>
      </div>`;
  });

  return html;
}

function toggleTranscript(i, btn) {
  const box = document.getElementById(`transcript-${i}`);
  box.classList.toggle('show');
  if (btn) btn.textContent = box.classList.contains('show') ? 'Ocultar texto' : 'Ver texto';
}

function toggleListen(i, levelIndex) {
  if (!('speechSynthesis' in window)) return;

  const lvl = data.listening.levels[levelIndex];
  const track = lvl.tracks[i];
  const btn = document.getElementById(`play-${i}`);
  const prog = document.getElementById(`prog-${i}`);
  const thisId = `${lvl.level}-${i}`;

  if (currentSpeechId === thisId) {
    window.speechSynthesis.cancel();
    currentSpeechId = null;
    btn.textContent = '▶ Reproducir';
    return;
  }

  window.speechSynthesis.cancel();
  currentSpeechId = thisId;
  btn.textContent = '⏸ Detener';
  prog.style.width = '0%';

  const text = track.script || track.desc;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = 0.95;

  utter.onboundary = (e) => {
    if (!text.length) return;
    const pct = Math.min(100, Math.round((e.charIndex / text.length) * 100));
    prog.style.width = pct + '%';
  };

  utter.onend = () => {
    prog.style.width = '100%';
    btn.textContent = '▶ Reproducir';
    currentSpeechId = null;

    const progress = loadProgress();
    if (!progress.listening[lvl.level]) progress.listening[lvl.level] = [];
    progress.listening[lvl.level][i] = true;
    saveProgress(progress);
    updateCardProgress('listening');
  };

  utter.onerror = () => {
    btn.textContent = '▶ Reproducir';
    currentSpeechId = null;
  };

  window.speechSynthesis.speak(utter);
}


// ─── 10. TEORIA ─────────────────────────────────────────────────────────────

function renderTheory() {
  const s = data.theory;

  // Agrupar temas por bloque, conservando el orden de aparicion
  const groupOrder = [];
  const byGroup = {};
  s.topics.forEach((topic, i) => {
    const g = topic.group || 'General';
    if (!byGroup[g]) { byGroup[g] = []; groupOrder.push(g); }
    byGroup[g].push(i);
  });

  let html = `
    <h2>📖 ${s.title}</h2>
    <p class="subtitle">Consulta los resumenes de gramatica cuando quieras</p>

    <div class="exercise-block">
      <p class="question" style="margin-bottom:12px">Índice</p>
      ${groupOrder.map(g => `
        <p style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.04em;
                  color:var(--text-muted); margin:12px 0 6px">${g}</p>
        <div style="display:flex; flex-wrap:wrap; gap:6px">
          ${byGroup[g].map(i => `
            <button onclick="scrollToTheoryTopic(${i})"
              style="padding:5px 12px; border-radius:99px; border:0.5px solid var(--border-strong);
                     background:var(--surface); color:var(--text); font-family:'DM Sans',sans-serif;
                     font-size:12px; cursor:pointer;">
              ${s.topics[i].title}
            </button>`).join('')}
        </div>`).join('')}
    </div>
  `;

  groupOrder.forEach(g => {
    html += `<div style="display:flex; align-items:center; gap:8px; margin:22px 0 10px">
      <h3 style="font-family:'DM Serif Display',serif; font-size:16px; font-weight:400; color:var(--text)">${g}</h3>
      <div style="flex:1; height:1px; background:var(--border)"></div>
    </div>`;

    byGroup[g].forEach(i => {
      const topic = s.topics[i];
      html += `
        <div class="exercise-block" id="theory-topic-${i}">
          <p class="question">${topic.title}</p>
          <p style="font-size:14px; color:var(--text-muted); margin-bottom:14px; line-height:1.6">${topic.intro}</p>
          <div style="overflow-x:auto">
            <table style="width:100%; border-collapse:collapse; font-size:13px">
              <thead>
                <tr>${topic.table.headers.map(h => `
                  <th style="text-align:left; padding:8px 10px; background:var(--table-head-bg);
                             border-bottom:1px solid var(--border); font-weight:600; color:var(--text-muted)">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${topic.table.rows.map((row, i2) => `
                  <tr style="background:${i2 % 2 === 0 ? 'var(--surface)' : 'var(--bg)'}">
                    ${row.map(cell => `
                      <td style="padding:8px 10px; border-bottom:0.5px solid var(--border);
                                 color:var(--text); vertical-align:top; line-height:1.5">${cell}</td>`).join('')}
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>`;
    });
  });

  return html;
}

function scrollToTheoryTopic(i) {
  const el = document.getElementById(`theory-topic-${i}`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


// ─── 11. DESPACHAR SECCION ─────────────────────────────────────────────────

function renderSection(key, levelIndex) {
  if (key === 'grammar')    return renderGrammar(levelIndex);
  if (key === 'vocabulary') return renderVocabulary(levelIndex);
  if (key === 'tests')      return renderTests(levelIndex);
  if (key === 'listening')  return renderListening(levelIndex);
  if (key === 'theory')     return renderTheory();
}


// ─── 12. ARRANQUE ───────────────────────────────────────────────────────────

initTheme();
updateStreakDisplay();
loadVocabulary();

if (grid) {
  // Estamos en index.html
  renderCards();
}

const currentSection = document.body.dataset.section;
if (currentSection && content) {
  // Estamos en una pagina de seccion (grammar.html, vocabulary.html...)
  content.innerHTML = renderSection(currentSection, 0);
}
