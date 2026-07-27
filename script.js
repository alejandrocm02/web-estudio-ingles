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
    p.reading    = p.reading    || {};
    p.streak     = p.streak     || { count: 0, lastDate: '' };
    return p;
  } catch (e) {
    return { grammar: {}, tests: {}, vocabKnown: {}, listening: {}, reading: {}, streak: { count: 0, lastDate: '' } };
  }
}

function saveProgress(p) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function recordStudyActivity() {
  const progress = loadProgress();
  const today = getLocalDateKey();
  if (progress.streak.lastDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  progress.streak.count = progress.streak.lastDate === getLocalDateKey(yesterday)
    ? progress.streak.count + 1
    : 1;
  progress.streak.lastDate = today;
  saveProgress(progress);
  updateStreakDisplay();
}

function getTotals() {
  const grammar = data.grammar.levels.reduce((a, l) => a + l.exercises.length, 0);
  const tests = data.tests.levels.reduce((a, l) => a + l.questions.length, 0);
  const listening = data.listening.levels.reduce((a, l) => a + l.tracks.length, 0);
  const reading = data.reading.levels.reduce((a, l) => a + l.texts.length, 0);
  let vocabulary = data.vocabulary.levels.reduce((a, l) => a + l.words.length, 0);
  if (vocabularyData) {
    vocabulary = Object.values(vocabularyData).reduce((a, arr) => a + arr.length, 0);
  }
  return { grammar, tests, listening, reading, vocabulary };
}

function getDone(progress) {
  const grammar = Object.values(progress.grammar).reduce((a, arr) => a + arr.filter(Boolean).length, 0);
  const tests = Object.values(progress.tests).reduce((a, o) => a + (o.best || 0), 0);
  const listening = Object.values(progress.listening).reduce((a, arr) => a + arr.filter(Boolean).length, 0);
  const reading = Object.values(progress.reading).reduce((a, arr) => a + arr.filter(Boolean).length, 0);
  const vocabulary = Object.keys(progress.vocabKnown).length;
  return { grammar, tests, listening, reading, vocabulary };
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
  ['grammar', 'vocabulary', 'tests', 'listening', 'reading'].forEach(updateCardProgress);
  updateProgressOverview();
}

function updateProgressOverview() {
  const value = document.getElementById('overall-progress-value');
  const fill = document.getElementById('overall-progress-fill');
  const summary = document.getElementById('progress-summary');
  if (!value || !fill || !summary) return;

  const totals = getTotals();
  const done = getDone(loadProgress());
  const doneCount = Object.values(done).reduce((sum, n) => sum + n, 0);
  // Cada habilidad pesa lo mismo para que las 1.100+ palabras no oculten el
  // progreso conseguido en gramática, tests, listening o reading.
  const sectionPercentages = Object.keys(totals).map(key =>
    totals[key] ? Math.min(1, (done[key] || 0) / totals[key]) : 0
  );
  const pct = Math.round(
    sectionPercentages.reduce((sum, value) => sum + value, 0) / sectionPercentages.length * 100
  );

  value.textContent = `${pct}%`;
  fill.style.width = `${pct}%`;
  summary.textContent = doneCount
    ? `${doneCount} actividades completadas · progreso equilibrado entre 5 habilidades.`
    : 'Empieza una actividad para ver aquí tu avance.';
}

function updateStreakDisplay() {
  const progress = loadProgress();

  const badge = document.getElementById('streak-badge');
  if (badge) {
    const n = progress.streak.count;
    badge.textContent = n
      ? `🔥 Racha de estudio: ${n} día${n === 1 ? '' : 's'}`
      : '✨ Tu primera actividad empieza hoy';
  }
}


// ─── 1. TEMA CLARO / OSCURO ─────────────────────────────────────────────────

function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const updateIcon = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro');
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

// Expresiones de alta frecuencia que complementan el diccionario con lenguaje
// listo para usar. Se mantienen separadas para que el JSON siga siendo fácil
// de actualizar.
const EXTRA_VOCABULARY = {
  A1: [
    ["How are you?", "¿Cómo estás?", "Hi, Mia. How are you?"],
    ["See you later", "Hasta luego", "I have to go. See you later!"],
    ["Excuse me", "Perdona / disculpe", "Excuse me, is this seat free?"],
    ["You're welcome", "De nada", "You're welcome. I'm happy to help."],
    ["I don't understand", "No entiendo", "Sorry, I don't understand."],
    ["Could you repeat that?", "¿Podrías repetirlo?", "Could you repeat that, please?"],
    ["How much is it?", "¿Cuánto cuesta?", "I like this shirt. How much is it?"],
    ["I'm looking for...", "Estoy buscando...", "I'm looking for the train station."],
    ["What time is it?", "¿Qué hora es?", "Excuse me, what time is it?"],
    ["Have a good day", "Que tengas un buen día", "Thank you. Have a good day!"],
    ["It doesn't matter", "No importa", "It doesn't matter. We can try again."],
    ["I'm not sure", "No estoy seguro/a", "I'm not sure about the answer."],
    ["A little bit", "Un poco", "I speak a little bit of English."],
    ["Right now", "Ahora mismo", "I am studying right now."],
    ["On the left", "A la izquierda", "The bank is on the left."]
  ],
  B1: [
    ["It depends on", "Depende de", "It depends on the weather."],
    ["As far as I know", "Por lo que sé", "As far as I know, the meeting is online."],
    ["I'm used to", "Estoy acostumbrado/a a", "I'm used to working from home."],
    ["To be honest", "Sinceramente", "To be honest, I expected more."],
    ["That makes sense", "Eso tiene sentido", "Your explanation makes sense."],
    ["Keep in touch", "Mantener el contacto", "Let's keep in touch after the course."],
    ["Take your time", "Tómate tu tiempo", "Take your time; there is no rush."],
    ["Run out of", "Quedarse sin", "We've run out of coffee."],
    ["Look forward to", "Tener ganas de", "I look forward to hearing from you."],
    ["Make up your mind", "Decidirse", "You need to make up your mind."],
    ["Get along with", "Llevarse bien con", "I get along with my colleagues."],
    ["It's worth it", "Merece la pena", "The walk is long, but it's worth it."],
    ["From my point of view", "Desde mi punto de vista", "From my point of view, flexibility matters."],
    ["In the long run", "A largo plazo", "This habit will help in the long run."],
    ["By the way", "Por cierto", "By the way, have you called Sam?"]
  ],
  C1: [
    ["Bear in mind", "Ten en cuenta", "Bear in mind that the figures are provisional."],
    ["By and large", "En general", "By and large, the policy has been effective."],
    ["A far cry from", "Muy distinto de", "The result is a far cry from what was promised."],
    ["In light of", "A la vista de", "In light of the evidence, we changed course."],
    ["To a certain extent", "Hasta cierto punto", "I agree with you to a certain extent."],
    ["It stands to reason", "Es lógico", "It stands to reason that demand will rise."],
    ["On the grounds that", "Con el argumento de que", "They rejected it on the grounds that it was unsafe."],
    ["All things considered", "Considerándolo todo", "All things considered, it was the right decision."],
    ["Be that as it may", "Sea como fuere", "Be that as it may, we still need a solution."],
    ["At odds with", "En desacuerdo con", "The findings are at odds with earlier research."],
    ["Call into question", "Poner en duda", "The error calls the entire analysis into question."],
    ["Pave the way for", "Allanar el camino para", "The agreement paved the way for reform."],
    ["Rule out", "Descartar", "We cannot rule out further delays."],
    ["Strike a balance", "Encontrar un equilibrio", "We must strike a balance between speed and care."],
    ["With hindsight", "Visto en retrospectiva", "With hindsight, the warning signs were obvious."]
  ]
};

function indexVocabulary() {
  vocabularyIndexed = {};
  Object.keys(vocabularyData).forEach(level => {
    const expressions = (EXTRA_VOCABULARY[level] || []).map(([word, translation, example]) => ({
      word, translation, example
    }));
    vocabularyIndexed[level] = [...vocabularyData[level], ...expressions].map(w => ({
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
  updateProgressOverview();
}


// ─── 3. GENERAR LAS CARDS DEL INICIO ───────────────────────────────────────
//  Cada card es un enlace real a su propia pagina (grammar.html, etc.)

const grid = document.getElementById('cards-grid');
const sections = ['grammar', 'reading', 'vocabulary', 'game', 'tests', 'listening', 'theory'];

function renderCards() {
  grid.innerHTML = '';
  sections.forEach(key => {
    const s = data[key];

    const card = document.createElement('a');
    card.className = 'card';
    card.href = `${key}.html`;
    card.dataset.section = key;

    const progressHTML = key === 'theory' || key === 'game' ? '' : `
      <div class="card-progress">
        <div class="card-progress-fill" id="progress-fill-${key}" style="width:0%"></div>
      </div>`;

    card.innerHTML = `
      <div class="card-icon">${s.icon}</div>
      <h2>${s.title}</h2>
      <p>${s.description}</p>
      ${progressHTML}
      <div class="card-footer">
        <span class="count">${key === 'vocabulary' ? '1100+ palabras y expresiones' : s.count}</span>
        <span class="card-btn" aria-hidden="true">
          Entrar
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </span>
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
  A0: { bg: '#EEF2FF', text: '#4338CA' },
  A1: { bg: '#E1F5EE', text: '#085041' },
  A2: { bg: '#ECFDF5', text: '#047857' },
  B1: { bg: '#E6F1FB', text: '#0C447C' },
  B2: { bg: '#EDE9FE', text: '#6D28D9' },
  C1: { bg: '#FAEEDA', text: '#633806' },
  C2: { bg: '#FDF2F8', text: '#BE185D' },
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
               font-family:'Manrope',sans-serif;
               font-size:13px; font-weight:${active ? '600' : '400'};
               cursor:pointer; transition:all 0.15s;">
        ${lvlKey}
      </button>`;
  });

  html += `</div>`;
  return html;
}

function switchLevel(sectionKey, levelIndex) {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  if (typeof currentSpeechId !== 'undefined') currentSpeechId = null;
  content.innerHTML = renderSection(sectionKey, levelIndex);
}


// ─── 6. GRAMATICA ──────────────────────────────────────────────────────────

function renderGrammar(levelIndex = 0) {
  const s = data.grammar;
  const lvl = s.levels[levelIndex];
  const levelKeys = s.levels.map(l => l.level);
  const progress = loadProgress();
  const doneArr = progress.grammar[lvl.level] || [];
  const doneCount = doneArr.filter(Boolean).length;
  const lessons = lvl.lessons || [];

  // Agrupar ejercicios por tema, conservando el orden de aparición.
  const topicOrder = [];
  const byTopic = {};
  lvl.exercises.forEach((ex, i) => {
    const topic = ex.topic || 'General';
    if (!byTopic[topic]) { byTopic[topic] = []; topicOrder.push(topic); }
    byTopic[topic].push(i);
  });

  let html = `
    <div class="section-intro">
      <span class="section-code">GRAMMAR COURSE / ${lvl.level}</span>
      <h2>${lvl.level === 'A0' ? 'Empieza desde cero' : `Domina el nivel ${lvl.level}`}</h2>
      <p class="subtitle">${lessons.length} fichas paso a paso y ${lvl.exercises.length} ejercicios. Primero entiende la estructura; después practica sin mirar el solucionario.</p>
    </div>
    ${renderLevelSelector(levelKeys, levelIndex, 'grammar')}
    <div class="grammar-roadmap" aria-label="Ruta de esta hoja">
      <div><span>01</span><strong>Comprende</strong><small>Estructura y uso</small></div>
      <div><span>02</span><strong>Observa</strong><small>Ejemplos traducidos</small></div>
      <div><span>03</span><strong>Practica</strong><small>${lvl.exercises.length} retos</small></div>
      <div><span>04</span><strong>Corrige</strong><small>Soluciones al final</small></div>
    </div>

    <section class="grammar-theory" aria-labelledby="grammar-theory-title">
      <div class="content-section-heading">
        <span class="section-code">TEORÍA POR NIVEL · ${lvl.level}</span>
        <h3 id="grammar-theory-title">Aprende cada estructura</h3>
        <p>Usa el índice para saltar a una ficha. Cada bloque explica qué construir, cuándo utilizarlo y qué error evitar.</p>
      </div>
      <nav class="grammar-lesson-index" aria-label="Índice de gramática">
        ${lessons.map((lesson, i) => `
          <button onclick="scrollToGrammarLesson(${i})"><span>${String(i + 1).padStart(2, '0')}</span>${lesson.title}</button>
        `).join('')}
      </nav>
      <div class="grammar-lessons">
        ${lessons.map((lesson, i) => `
          <article class="grammar-lesson" id="grammar-lesson-${i}">
            <div class="grammar-lesson-heading">
              <span>${String(i + 1).padStart(2, '0')}</span>
              <div>
                <small>NIVEL ${lvl.level}</small>
                <h4>${lesson.title}</h4>
                <p>${lesson.goal}</p>
              </div>
            </div>
            <div class="grammar-formula">
              <span>ESTRUCTURA</span>
              <code>${lesson.structure}</code>
            </div>
            <div class="grammar-lesson-grid">
              <div class="grammar-uses">
                <span class="control-label">Cuándo se usa</span>
                <ul>${lesson.uses.map(use => `<li>${use}</li>`).join('')}</ul>
              </div>
              <div class="grammar-examples">
                <span class="control-label">Ejemplos</span>
                ${lesson.examples.map(example => `
                  <div><strong>${example.en}</strong><small>${example.es}</small></div>
                `).join('')}
              </div>
            </div>
            <div class="grammar-mistake"><span>EVITA ESTE ERROR</span><p>${lesson.mistake}</p></div>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="grammar-practice" aria-labelledby="grammar-practice-title">
      <div class="content-section-heading">
        <span class="section-code">PARTE 02 · EJERCICIOS</span>
        <h3 id="grammar-practice-title">Practica sin mirar las respuestas</h3>
        <p>Escribe la frase completa cuando sea necesario. Si fallas, revisa la ficha y vuelve a intentarlo; todas las soluciones están al final.</p>
      </div>
    <div class="module-progress">
      <div><span>Nivel ${lvl.level}</span><strong><span id="grammar-done-count">${doneCount}</span> de ${lvl.exercises.length} retos</strong></div>
      <div class="module-progress-track"><span id="grammar-module-fill" style="width:${Math.round(doneCount / lvl.exercises.length * 100)}%"></span></div>
    </div>
  `;

  topicOrder.forEach(topic => {
    html += `<div class="topic-divider">
      <span>${topic}</span>
      <div></div>
    </div>`;

    byTopic[topic].forEach(i => {
      const ex = lvl.exercises[i];
      const isDone = !!doneArr[i];
      html += `
        <div class="exercise-block">
          <div class="exercise-question">
            <span>${String(i + 1).padStart(2, '0')}</span>
            <p class="question">${ex.question} <span id="qmark-${i}" class="completion-mark">${isDone ? '✓' : ''}</span></p>
          </div>
          <div class="answer-row">
            <input type="text" id="inp-${i}" placeholder="Tu respuesta..."
              onkeydown="if(event.key==='Enter') checkGrammar(${i}, ${levelIndex})">
            <button class="card-btn" onclick="checkGrammar(${i}, ${levelIndex})">Comprobar</button>
          </div>
          <p class="exercise-hint"><span>Pista</span>${ex.hint}</p>
          <p id="fb-${i}" class="feedback-msg"></p>
        </div>`;
    });
  });

  html += `
    </section>
    <section class="grammar-answer-section" aria-labelledby="grammar-solutions-title">
      <div class="content-section-heading">
        <span class="section-code">PARTE 03 · AUTOCORRECCIÓN</span>
        <h3 id="grammar-solutions-title">Soluciones de la hoja ${lvl.level}</h3>
        <p>Ábrelas solo después de intentar los ejercicios. La pista explica el patrón que justifica cada respuesta.</p>
      </div>
      <details class="grammar-solutions">
        <summary><span>Mostrar ${lvl.exercises.length} soluciones</span><small>Las respuestas están ocultas</small></summary>
        <div class="solutions-grid">
          ${lvl.exercises.map((exercise, i) => `
            <div class="solution-item">
              <span>${String(i + 1).padStart(2, '0')}</span>
              <div>
                <small>${exercise.topic || 'General'}</small>
                <strong>${exercise.answer}</strong>
                <p>${exercise.hint}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </details>
    </section>`;

  return html;
}

function scrollToGrammarLesson(i) {
  document.getElementById(`grammar-lesson-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function checkGrammar(i, levelIndex) {
  const lvl = data.grammar.levels[levelIndex];
  const input = document.getElementById(`inp-${i}`);
  const fb    = document.getElementById(`fb-${i}`);
  const normalizeAnswer = value => value
    .trim()
    .toLowerCase()
    .replace(/[.!?]+$/, '')
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ');
  const valor = normalizeAnswer(input.value);
  const accepted = [lvl.exercises[i].answer, ...(lvl.exercises[i].answers || [])].map(normalizeAnswer);
  const isCorrect = accepted.includes(valor);

  fb.className = 'feedback-msg show';
  if (isCorrect) {
    recordStudyActivity();
    fb.classList.add('ok');
    fb.textContent = 'Correcto!';
    input.style.borderColor = '#639922';
  } else {
    fb.classList.add('ko');
    fb.textContent = 'Todavía no. Revisa la pista, consulta la ficha y vuelve a intentarlo. La solución está al final de la hoja.';
    input.style.borderColor = '#E24B4A';
  }

  const progress = loadProgress();
  if (!progress.grammar[lvl.level]) progress.grammar[lvl.level] = [];
  const wasAlreadyDone = !!progress.grammar[lvl.level][i];
  if (isCorrect) progress.grammar[lvl.level][i] = true;
  saveProgress(progress);
  updateCardProgress('grammar');

  if (isCorrect && !wasAlreadyDone) {
    const mark = document.getElementById(`qmark-${i}`);
    if (mark) mark.textContent = '✓';
    const doneArr = progress.grammar[lvl.level] || [];
    const countEl = document.getElementById('grammar-done-count');
    if (countEl) countEl.textContent = doneArr.filter(Boolean).length;
    const moduleFill = document.getElementById('grammar-module-fill');
    if (moduleFill) moduleFill.style.width = `${Math.round(doneArr.filter(Boolean).length / lvl.exercises.length * 100)}%`;
  }
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
    <div class="section-intro">
      <span class="section-code">LEXICON / ${currentVocabLevel}</span>
      <h2>Word Explorer</h2>
      <p class="subtitle">${allWords.length} palabras y expresiones · <span id="vocab-known-count">${knownInLevel}</span> aprendidas · Escucha la pronunciación y revela el significado.</p>
    </div>
    ${renderLevelSelector(levelKeys, levelIndex, 'vocabulary')}

    <!-- Filtro por categoria tematica -->
    <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px">
      <button onclick="filterVocabCategory('all', ${levelIndex})"
        style="padding:5px 12px; border-radius:99px; cursor:pointer; font-family:'Manrope',sans-serif; font-size:12px;
               border:${vocabCategory === 'all' ? '1.5px solid ' + c.text : '0.5px solid var(--border-strong)'};
               background:${vocabCategory === 'all' ? c.bg : 'var(--surface)'};
               color:${vocabCategory === 'all' ? c.text : 'var(--text-muted)'};
               font-weight:${vocabCategory === 'all' ? '600' : '400'}">
        Todas (${allWords.length})
      </button>
      ${categoryOptions.map(cat => `
        <button onclick="filterVocabCategory('${cat.key}', ${levelIndex})"
          style="padding:5px 12px; border-radius:99px; cursor:pointer; font-family:'Manrope',sans-serif; font-size:12px;
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
               border-radius:8px; font-family:'Manrope',sans-serif; font-size:14px; outline:none;">
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
          <button class="speak-word-btn"
            onclick="speakVocabulary('${escAttr(w.word)}', event)"
            aria-label="Escuchar ${w.word}">AUDIO</button>
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
                 background:var(--surface); color:var(--text); cursor:pointer; font-size:13px; font-family:'Manrope',sans-serif;
                 opacity:${vocabPage === 0 ? '0.4' : '1'}">
          ← Anterior
        </button>
        <span style="padding:6px 14px; font-size:13px; color:var(--text-muted); align-self:center">
          ${vocabPage + 1} / ${totalPages}
        </span>
        <button onclick="changeVocabPage(${levelIndex}, ${vocabPage + 1})"
          ${vocabPage >= totalPages - 1 ? 'disabled' : ''}
          style="padding:6px 14px; border-radius:6px; border:0.5px solid var(--border-strong);
                 background:var(--surface); color:var(--text); cursor:pointer; font-size:13px; font-family:'Manrope',sans-serif;
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
  const isLearning = !progress.vocabKnown[key];
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
  if (isLearning) recordStudyActivity();
  updateCardProgress('vocabulary');

  const allWords = vocabularyIndexed[currentVocabLevel] || [];
  const knownInLevel = allWords.filter(w => progress.vocabKnown[w.word.toLowerCase()]).length;
  const countEl = document.getElementById('vocab-known-count');
  if (countEl) countEl.textContent = knownInLevel;
}

function speakVocabulary(word, event) {
  event.stopPropagation();
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-GB';
  utterance.rate = 0.82;
  const voices = getEnglishVoices();
  utterance.voice = voices.find(v => /natural|premium|enhanced/i.test(v.name))
    || voices.find(v => /^en-GB/i.test(v.lang))
    || voices[0]
    || null;
  window.speechSynthesis.speak(utterance);
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
    recordStudyActivity();
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
        <h3 style="font-family:'Space Grotesk',sans-serif; font-size:26px; font-weight:600; margin-bottom:8px">
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


// ─── 9. LISTENING STUDIO ───────────────────────────────────────────────────

let currentSpeechId = null;
let listeningRate = 0.9;
let listeningVoiceMode = 'auto';

function getEnglishVoices() {
  if (!('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices()
    .filter(voice => /^en[-_]/i.test(voice.lang))
    .sort((a, b) => {
      const score = voice => /natural|premium|enhanced|neural|online/i.test(voice.name) ? 0 : 1;
      return score(a) - score(b);
    });
}

function selectListeningVoice(track) {
  const voices = getEnglishVoices();
  const requestedAccent = listeningVoiceMode === 'auto'
    ? (track.accent || 'GB')
    : listeningVoiceMode;
  const locale = requestedAccent === 'US' ? 'en-US' : 'en-GB';
  return voices.find(v => v.lang.replace('_', '-').toLowerCase() === locale.toLowerCase() &&
      /natural|premium|enhanced|neural|online/i.test(v.name))
    || voices.find(v => v.lang.replace('_', '-').toLowerCase() === locale.toLowerCase())
    || voices.find(v => v.lang.toLowerCase().startsWith(`en-${requestedAccent.toLowerCase()}`))
    || voices[0]
    || null;
}

function renderListening(levelIndex = 0) {
  const s = data.listening;
  const lvl = s.levels[levelIndex];
  const levelKeys = s.levels.map(l => l.level);
  const progress = loadProgress();
  const doneArr = progress.listening[lvl.level] || [];
  const supported = 'speechSynthesis' in window;

  let html = `
    <div class="section-intro">
      <span class="section-code">LISTEN / 0${levelIndex + 1}</span>
      <h2>${s.title} Studio</h2>
      <p class="subtitle">Escucha sin mirar el texto, responde y repite a otra velocidad. El sistema prioriza las voces inglesas de mayor calidad de tu dispositivo.</p>
    </div>
    ${renderLevelSelector(levelKeys, levelIndex, 'listening')}
    <div class="listening-console">
      <div>
        <span class="control-label">Voz</span>
        <select id="voice-mode" onchange="setListeningVoice(this.value)" aria-label="Acento de la voz">
          <option value="auto" ${listeningVoiceMode === 'auto' ? 'selected' : ''}>Automática · según pista</option>
          <option value="GB" ${listeningVoiceMode === 'GB' ? 'selected' : ''}>Inglés británico</option>
          <option value="US" ${listeningVoiceMode === 'US' ? 'selected' : ''}>Inglés americano</option>
        </select>
      </div>
      <div>
        <span class="control-label">Velocidad</span>
        <div class="speed-control" role="group" aria-label="Velocidad de reproducción">
          ${[0.75, 0.9, 1].map(rate => `
            <button class="${listeningRate === rate ? 'active' : ''}" onclick="setListeningRate(${rate}, ${levelIndex})">
              ${rate === 0.75 ? 'Lenta' : rate === 0.9 ? 'Clara' : 'Natural'} · ${rate}×
            </button>`).join('')}
        </div>
      </div>
      <div class="console-status"><i></i>${supported ? 'Motor de voz disponible' : 'Solo transcripción'}</div>
    </div>`;

  if (!supported) {
    html += `<p class="audio-warning">Tu navegador no admite síntesis de voz. Puedes usar las transcripciones y los retos de comprensión.</p>`;
  }

  lvl.tracks.forEach((track, i) => {
    const isDone = !!doneArr[i];
    html += `
      <article class="audio-block ${isDone ? 'completed' : ''}">
        <div class="audio-topline">
          <span class="track-number">${String(i + 1).padStart(2, '0')}</span>
          <div class="audio-heading">
            <div class="audio-title">${track.title}<span id="done-${i}">${isDone ? ' · Completado' : ''}</span></div>
            <div class="audio-meta">
              <span>${track.context || 'Listening'}</span>
              <span>${track.accent === 'US' ? 'US English' : 'UK English'}</span>
              <span>≈ ${Math.max(1, Math.ceil((track.script || '').split(/\s+/).length / 115))} min</span>
            </div>
          </div>
        </div>
        <p class="audio-desc">${track.desc}</p>
        <div class="audio-player">
          ${supported ? `
            <button class="play-btn" id="play-${i}" onclick="toggleListen(${i}, ${levelIndex})" aria-label="Reproducir ${track.title}">
              <span class="play-icon">▶</span><span class="play-label">Reproducir</span>
            </button>
            <div class="waveform" aria-hidden="true">${Array.from({length: 28}, (_, n) => `<i style="--h:${22 + ((n * 17) % 66)}%"></i>`).join('')}</div>
          ` : ''}
          <button class="transcript-toggle" onclick="toggleTranscript(${i}, this)">Ver transcripción</button>
        </div>
        <div class="progress-bar" aria-hidden="true">
          <div class="progress-bar-fill" id="prog-${i}" style="width:${isDone ? 100 : 0}%"></div>
        </div>
        <div class="transcript-box ${!supported ? 'show' : ''}" id="transcript-${i}">
          <span>TRANSCRIPT</span>
          <p>${track.script || track.desc}</p>
        </div>
        <div class="listening-challenge">
          <span class="control-label">Comprueba tu oído</span>
          <p>${track.question}</p>
          <div class="listening-options" id="listen-options-${i}">
            ${track.options.map((option, optionIndex) => `
              <button onclick="checkListeningAnswer(${i}, ${levelIndex}, ${optionIndex}, this)">${option}</button>
            `).join('')}
          </div>
          <div class="listening-feedback" id="listen-feedback-${i}" aria-live="polite"></div>
        </div>
      </article>`;
  });

  return html;
}

function setListeningVoice(mode) {
  listeningVoiceMode = mode;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  currentSpeechId = null;
}

function setListeningRate(rate, levelIndex) {
  listeningRate = rate;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  currentSpeechId = null;
  content.innerHTML = renderListening(levelIndex);
}

function toggleTranscript(i, btn) {
  const box = document.getElementById(`transcript-${i}`);
  box.classList.toggle('show');
  if (btn) btn.textContent = box.classList.contains('show') ? 'Ocultar transcripción' : 'Ver transcripción';
}

function resetPlayButton(btn) {
  if (!btn) return;
  btn.querySelector('.play-icon').textContent = '▶';
  btn.querySelector('.play-label').textContent = 'Reproducir';
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
    resetPlayButton(btn);
    return;
  }

  document.querySelectorAll('.play-btn').forEach(resetPlayButton);
  const wasBusy = window.speechSynthesis.speaking || window.speechSynthesis.pending;
  if (wasBusy) window.speechSynthesis.cancel();

  currentSpeechId = thisId;
  btn.querySelector('.play-icon').textContent = '■';
  btn.querySelector('.play-label').textContent = 'Detener';
  prog.style.width = '0%';

  const text = track.script || track.desc;
  let retried = false;

  const speakNow = () => {
    if (currentSpeechId !== thisId) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = selectListeningVoice(track);
    utterance.lang = voice?.lang || (track.accent === 'US' ? 'en-US' : 'en-GB');
    utterance.voice = voice;
    utterance.rate = listeningRate;
    utterance.pitch = 1;

    utterance.onboundary = event => {
      if (!text.length || currentSpeechId !== thisId) return;
      prog.style.width = `${Math.min(100, Math.round((event.charIndex / text.length) * 100))}%`;
    };

    utterance.onend = () => {
      if (currentSpeechId !== thisId) return;
      prog.style.width = '100%';
      resetPlayButton(btn);
      currentSpeechId = null;
      markListeningComplete(lvl.level, i);
    };

    utterance.onerror = event => {
      if (event.error === 'canceled' || event.error === 'interrupted') return;
      if (!retried && currentSpeechId === thisId) {
        retried = true;
        setTimeout(speakNow, 180);
        return;
      }
      prog.style.width = '0%';
      resetPlayButton(btn);
      currentSpeechId = null;
    };

    window.speechSynthesis.speak(utterance);
  };

  setTimeout(speakNow, wasBusy ? 140 : 0);
}

function markListeningComplete(level, i) {
  const progress = loadProgress();
  if (!progress.listening[level]) progress.listening[level] = [];
  const isNew = !progress.listening[level][i];
  progress.listening[level][i] = true;
  saveProgress(progress);
  if (isNew) recordStudyActivity();
  updateCardProgress('listening');
  const done = document.getElementById(`done-${i}`);
  if (done) done.textContent = ' · Completado';
}

function checkListeningAnswer(i, levelIndex, selected, button) {
  const track = data.listening.levels[levelIndex].tracks[i];
  const options = document.querySelectorAll(`#listen-options-${i} button`);
  const feedback = document.getElementById(`listen-feedback-${i}`);
  options.forEach((option, index) => {
    option.disabled = true;
    if (index === track.correct) option.classList.add('correct');
  });
  if (selected === track.correct) {
    feedback.textContent = 'Correcto. Has captado la idea clave.';
    feedback.className = 'listening-feedback show ok';
    markListeningComplete(data.listening.levels[levelIndex].level, i);
  } else {
    button.classList.add('wrong');
    feedback.textContent = `Casi. La respuesta correcta es: ${track.options[track.correct]}.`;
    feedback.className = 'listening-feedback show ko';
  }
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.addEventListener?.('voiceschanged', getEnglishVoices);
}

// ─── 10. READING ────────────────────────────────────────────────────────────

function renderReading(levelIndex = 0) {
  const section = data.reading;
  const level = section.levels[levelIndex];
  const levelKeys = section.levels.map(item => item.level);
  const done = loadProgress().reading[level.level] || [];
  const completedCount = done.filter(Boolean).length;

  let html = `
    <div class="section-intro">
      <span class="section-code">READING LAB / ${level.level}</span>
      <h2>Lee, interpreta y responde</h2>
      <p class="subtitle">Tres textos graduados por hoja. Las preguntas cerradas tienen una respuesta verificable; las abiertas incluyen un modelo orientativo, nunca una única opinión “correcta”.</p>
    </div>
    ${renderLevelSelector(levelKeys, levelIndex, 'reading')}
    <div class="reading-overview">
      <div><span class="section-code">HOJA ${level.level}</span><strong>${level.texts.length} lecturas · ${level.texts.reduce((sum, text) => sum + text.questions.length, 0)} preguntas</strong></div>
      <div><span>Completadas</span><strong id="reading-completed-count">${completedCount}/${level.texts.length}</strong></div>
      <div class="module-progress-track"><span id="reading-module-fill" style="width:${Math.round(completedCount / level.texts.length * 100)}%"></span></div>
    </div>`;

  level.texts.forEach((text, textIndex) => {
    const isDone = !!done[textIndex];
    html += `
      <article class="reading-sheet ${isDone ? 'completed' : ''}" id="reading-text-${textIndex}">
        <div class="reading-sheet-header">
          <span class="reading-number">${String(textIndex + 1).padStart(2, '0')}</span>
          <div>
            <div class="reading-meta"><span>${text.genre}</span><span>${text.time}</span><span>Nivel ${level.level}</span></div>
            <h3>${text.title}</h3>
            <p id="reading-done-${textIndex}" class="reading-status">${isDone ? 'Lectura completada' : 'Pendiente de responder'}</p>
          </div>
        </div>
        <div class="reading-text">
          ${text.paragraphs.map((paragraph, paragraphIndex) => `
            <p><span>${String(paragraphIndex + 1).padStart(2, '0')}</span>${paragraph}</p>
          `).join('')}
        </div>
        <section class="reading-questions" aria-labelledby="reading-questions-${textIndex}">
          <div class="reading-questions-heading">
            <span class="control-label">Comprensión</span>
            <h4 id="reading-questions-${textIndex}">Preguntas sobre el texto</h4>
          </div>
          ${text.questions.map((question, questionIndex) => `
            <div class="reading-question" id="reading-question-${textIndex}-${questionIndex}" data-answered="false">
              <div class="reading-question-title">
                <span>${questionIndex + 1}</span>
                <div><small>${question.type === 'open' ? 'RESPUESTA ABIERTA' : 'ELECCIÓN ÚNICA'}</small><p>${question.q}</p></div>
              </div>
              ${question.type === 'choice' ? `
                <div class="reading-options" id="reading-options-${textIndex}-${questionIndex}">
                  ${question.options.map((option, optionIndex) => `
                    <button onclick="checkReadingChoice(${textIndex}, ${questionIndex}, ${levelIndex}, ${optionIndex}, this)">${option}</button>
                  `).join('')}
                </div>
                <div class="reading-feedback" id="reading-feedback-${textIndex}-${questionIndex}" aria-live="polite"></div>
              ` : `
                <textarea id="reading-answer-${textIndex}-${questionIndex}" rows="3" placeholder="Escribe tu interpretación con tus propias palabras..."></textarea>
                <button class="reading-guide-btn" onclick="showReadingGuidance(${textIndex}, ${questionIndex}, ${levelIndex})">Comparar con una respuesta orientativa</button>
                <div class="reading-guidance" id="reading-guidance-${textIndex}-${questionIndex}"></div>
              `}
            </div>
          `).join('')}
        </section>
        <details class="reading-solutions">
          <summary><span>Ver respuestas y criterios de esta lectura</span><small>Comprueba después de responder</small></summary>
          <div class="reading-solution-list">
            ${text.questions.map((question, questionIndex) => `
              <div>
                <span>${questionIndex + 1}</span>
                <p><strong>${question.type === 'choice' ? question.options[question.correct] : 'Respuesta orientativa'}</strong>${question.type === 'choice' ? question.explanation : question.guidance}</p>
              </div>
            `).join('')}
          </div>
          <p class="orientation-note"><strong>Sobre las preguntas abiertas:</strong> el modelo sirve para comparar argumentos, claridad y evidencias. Una respuesta humana diferente también es válida si está razonada y conectada con el texto.</p>
        </details>
      </article>`;
  });

  return html;
}

function checkReadingChoice(textIndex, questionIndex, levelIndex, selected, button) {
  const level = data.reading.levels[levelIndex];
  const question = level.texts[textIndex].questions[questionIndex];
  const options = document.querySelectorAll(`#reading-options-${textIndex}-${questionIndex} button`);
  const feedback = document.getElementById(`reading-feedback-${textIndex}-${questionIndex}`);
  options.forEach((option, index) => {
    option.disabled = true;
    if (index === question.correct) option.classList.add('correct');
  });
  if (selected === question.correct) {
    feedback.className = 'reading-feedback show ok';
    feedback.textContent = `Correcto. ${question.explanation}`;
  } else {
    button.classList.add('wrong');
    feedback.className = 'reading-feedback show ko';
    feedback.textContent = `Revisa el fragmento. ${question.explanation}`;
  }
  document.getElementById(`reading-question-${textIndex}-${questionIndex}`).dataset.answered = 'true';
  updateReadingCompletion(textIndex, levelIndex);
}

function showReadingGuidance(textIndex, questionIndex, levelIndex) {
  const input = document.getElementById(`reading-answer-${textIndex}-${questionIndex}`);
  const guidance = document.getElementById(`reading-guidance-${textIndex}-${questionIndex}`);
  const question = data.reading.levels[levelIndex].texts[textIndex].questions[questionIndex];
  guidance.className = 'reading-guidance show';
  guidance.innerHTML = `<span>MODELO ORIENTATIVO</span><p>${question.guidance}</p>`;
  if (!input.value.trim()) {
    guidance.insertAdjacentHTML('afterbegin', '<small>Intenta escribir tu respuesta antes de comparar.</small>');
    return;
  }
  document.getElementById(`reading-question-${textIndex}-${questionIndex}`).dataset.answered = 'true';
  updateReadingCompletion(textIndex, levelIndex);
}

function updateReadingCompletion(textIndex, levelIndex) {
  const sheet = document.getElementById(`reading-text-${textIndex}`);
  const questions = sheet.querySelectorAll('.reading-question');
  const answered = sheet.querySelectorAll('.reading-question[data-answered="true"]');
  if (questions.length !== answered.length) return;
  markReadingComplete(data.reading.levels[levelIndex].level, textIndex);
}

function markReadingComplete(level, textIndex) {
  const progress = loadProgress();
  if (!progress.reading[level]) progress.reading[level] = [];
  const isNew = !progress.reading[level][textIndex];
  progress.reading[level][textIndex] = true;
  saveProgress(progress);
  if (isNew) recordStudyActivity();
  updateCardProgress('reading');

  document.getElementById(`reading-text-${textIndex}`)?.classList.add('completed');
  const status = document.getElementById(`reading-done-${textIndex}`);
  if (status) status.textContent = 'Lectura completada';
  const completed = progress.reading[level].filter(Boolean).length;
  const count = document.getElementById('reading-completed-count');
  const fill = document.getElementById('reading-module-fill');
  if (count) count.textContent = `${completed}/${data.reading.levels.find(item => item.level === level).texts.length}`;
  if (fill) fill.style.width = `${Math.round(completed / data.reading.levels.find(item => item.level === level).texts.length * 100)}%`;
}


// ─── 11. TEORIA ─────────────────────────────────────────────────────────────

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
    <div class="section-intro">
      <span class="section-code">KNOWLEDGE / ${s.topics.length} MODULES</span>
      <h2>${s.title} esencial</h2>
      <p class="subtitle">De la fórmula al uso real: revisa la regla, compara ejemplos y detecta los errores que más se repiten.</p>
    </div>

    <div class="theory-index">
      <div class="theory-index-heading">
        <div><span class="control-label">Mapa de contenidos</span><strong>Ir directamente a un tema</strong></div>
        <span>${groupOrder.length} bloques · ${s.topics.length} módulos</span>
      </div>
      ${groupOrder.map(g => `
        <div class="theory-index-group">
          <p>${g}</p>
          <div>
          ${byGroup[g].map(i => `
            <button onclick="scrollToTheoryTopic(${i})">
              <span>${String(i + 1).padStart(2, '0')}</span>${s.topics[i].title}
            </button>`).join('')}
          </div>
        </div>`).join('')}
    </div>
  `;

  groupOrder.forEach(g => {
    html += `<div class="topic-divider">
      <span>${g}</span>
      <div></div>
    </div>`;

    byGroup[g].forEach(i => {
      const topic = s.topics[i];
      html += `
        <article class="theory-topic" id="theory-topic-${i}">
          <div class="theory-topic-heading">
            <span>${String(i + 1).padStart(2, '0')}</span>
            <div>
              <div class="theory-topic-meta"><span>${topic.level || 'A1–C1'}</span><span>${g}</span></div>
              <h3>${topic.title}</h3>
            </div>
          </div>
          <p class="theory-intro">${topic.intro}</p>
          ${topic.formula || topic.tip ? `
            <div class="theory-insights">
              ${topic.formula ? `<div><span>Fórmula mental</span><strong>${topic.formula}</strong></div>` : ''}
              ${topic.tip ? `<div><span>Atajo útil</span><p>${topic.tip}</p></div>` : ''}
              ${topic.pitfall ? `<div class="pitfall"><span>Error frecuente</span><p>${topic.pitfall}</p></div>` : ''}
            </div>` : ''}
          <div class="theory-table-wrap">
            <table class="theory-table">
              <thead>
                <tr>${topic.table.headers.map(h => `
                  <th>${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${topic.table.rows.map((row, i2) => `
                  <tr>
                    ${row.map(cell => `
                      <td>${cell}</td>`).join('')}
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </article>`;
    });
  });

  return html;
}

function scrollToTheoryTopic(i) {
  const el = document.getElementById(`theory-topic-${i}`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


// ─── 12. DESPACHAR SECCION ─────────────────────────────────────────────────

function renderSection(key, levelIndex) {
  if (key === 'grammar')    return renderGrammar(levelIndex);
  if (key === 'vocabulary') return renderVocabulary(levelIndex);
  if (key === 'tests')      return renderTests(levelIndex);
  if (key === 'listening')  return renderListening(levelIndex);
  if (key === 'reading')    return renderReading(levelIndex);
  if (key === 'theory')     return renderTheory();
}


// ─── 13. ARRANQUE ───────────────────────────────────────────────────────────

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
