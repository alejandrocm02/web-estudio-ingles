// ============================================================
//  DATA.JS — Contenido completo con niveles A1, B1 y C1
//  Cada seccion tiene un array "levels" con sus ejercicios
//  organizados por nivel. Solo edita este archivo para
//  añadir o modificar contenido.
// ============================================================

const data = {

  // ----------------------------------------------------------
  //  GRAMATICA
  // ----------------------------------------------------------
  grammar: {
    title: "Gramática",
    icon: "📐",
    description: "45 retos guiados para dominar tiempos verbales, estructuras y patrones de A1 a C1",
    count: "45 ejercicios",
    levels: [
      {
        level: "A1",
        color: "#E1F5EE",
        textColor: "#085041",
        exercises: [
          {
            topic: "Presente (verbo to be)",
            question: "Completa: 'She ___ (be) a teacher.'",
            answer: "is",
            hint: "Verbo to be en presente, 3a persona"
          },
          {
            topic: "Sustantivos y plurales",
            question: "Escribe el plural de 'child':",
            answer: "children",
            hint: "Es un plural irregular"
          },
          {
            topic: "There is / There are",
            question: "Completa: 'There ___ a cat on the sofa.'",
            answer: "is",
            hint: "There is / There are segun si es singular o plural"
          },
          {
            topic: "Presente simple (negativa)",
            question: "Forma la negativa: 'I like coffee.' ->",
            answer: "I don't like coffee.",
            hint: "Do not (don't) para I, you, we, they"
          },
          {
            topic: "Presente simple (negativa)",
            question: "Completa: 'My brother ___ (not/like) vegetables.'",
            answer: "doesn't like",
            hint: "Negativa en presente simple, 3a persona: doesn't + infinitivo"
          },
          {
            topic: "Pasado simple",
            question: "Escribe la forma correcta: 'We ___ (go) to the cinema last Friday.'",
            answer: "went",
            hint: "Past Simple irregular del verbo 'go'"
          },
          {
            topic: "Artículos",
            question: "Completa: 'I have ___ umbrella.'",
            answer: "an",
            hint: "Usa an delante de un sonido vocálico"
          },
          {
            topic: "Presente simple",
            question: "Completa: 'He ___ (study) English every day.'",
            answer: "studies",
            hint: "Con he/she/it, consonante + y cambia a -ies"
          },
          {
            topic: "Presente continuo",
            question: "Completa: 'They ___ (play) football right now.'",
            answer: "are playing",
            hint: "Present Continuous: am/is/are + verbo-ing"
          },
          {
            topic: "Preguntas",
            question: "Completa: '___ you live in Madrid?'",
            answer: "Do",
            hint: "Las preguntas en Present Simple usan do con you"
          },
          {
            topic: "Preposiciones",
            question: "Completa: 'The lesson starts ___ nine o'clock.'",
            answer: "at",
            hint: "Usa at con horas concretas"
          },
          {
            topic: "Can / can't",
            question: "Completa: 'My sister ___ swim very well.'",
            answer: "can",
            hint: "Can expresa habilidad y no cambia con la persona"
          },
          {
            topic: "Comparativos",
            question: "Completa: 'A train is ___ (fast) than a bus.'",
            answer: "faster",
            hint: "Adjetivo corto + -er + than"
          },
          {
            topic: "Cuantificadores",
            question: "Completa: 'There aren't ___ chairs in the room.'",
            answer: "any",
            hint: "Any es habitual en negativas y preguntas"
          },
          {
            topic: "Pasado simple",
            question: "Forma la pregunta: '___ she call you yesterday?'",
            answer: "Did",
            hint: "Did + sujeto + infinitivo"
          }
        ]
      },
      {
        level: "B1",
        color: "#E6F1FB",
        textColor: "#0C447C",
        exercises: [
          {
            topic: "Pasado perfecto",
            question: "Completa: 'By the time she arrived, we ___ (already/eat).'",
            answer: "had already eaten",
            hint: "Past Perfect para accion anterior a otra en el pasado"
          },
          {
            topic: "Estilo indirecto",
            question: "Convierte a reported speech: 'I am tired.' -> She said she ___",
            answer: "was tired",
            hint: "El Present Simple pasa a Past Simple en reported speech"
          },
          {
            topic: "Deseos (wish)",
            question: "Completa con la forma correcta: 'I wish I ___ (can) fly.'",
            answer: "could",
            hint: "Wish + Past Simple expresa un deseo irreal en el presente"
          },
          {
            topic: "Voz pasiva",
            question: "Completa: 'The letter ___ (send) yesterday by the manager.'",
            answer: "was sent",
            hint: "Passive Voice en Past Simple: was/were + participio"
          },
          {
            topic: "Condicionales",
            question: "Completa: 'If I ___ (have) more time, I would travel more.'",
            answer: "had",
            hint: "Second conditional: If + Past Simple, would + infinitivo"
          },
          {
            topic: "Voz pasiva",
            question: "Convierte a voz pasiva: 'They are building a new bridge.' -> A new bridge ___",
            answer: "is being built",
            hint: "Present Continuous pasivo: is/are being + participio"
          },
          {
            topic: "Present Perfect",
            question: "Completa: 'I ___ (know) her since 2020.'",
            answer: "have known",
            hint: "Since marca el inicio de una situación que continúa"
          },
          {
            topic: "Gerundio e infinitivo",
            question: "Completa: 'She enjoys ___ (read) before bed.'",
            answer: "reading",
            hint: "Enjoy va seguido de gerundio"
          },
          {
            topic: "Modales de deducción",
            question: "Completa: 'The lights are on. They ___ be home.'",
            answer: "must",
            hint: "Must expresa una deducción muy probable"
          },
          {
            topic: "Oraciones de relativo",
            question: "Completa: 'That's the woman ___ helped me.'",
            answer: "who",
            hint: "Who se refiere a personas"
          },
          {
            topic: "Used to",
            question: "Completa: 'I ___ play outside every afternoon as a child.'",
            answer: "used to",
            hint: "Used to describe hábitos pasados que ya no ocurren"
          },
          {
            topic: "First conditional",
            question: "Completa: 'If it rains, we ___ (stay) at home.'",
            answer: "will stay",
            hint: "If + Present Simple, will + infinitivo"
          },
          {
            topic: "Phrasal verbs",
            question: "Completa: 'Please ___ the form before the interview.'",
            answer: "fill in",
            hint: "Fill in significa completar un formulario"
          },
          {
            topic: "Estilo indirecto",
            question: "Completa: 'I will call you.' -> She said she ___ call me.",
            answer: "would",
            hint: "Will suele retroceder a would en reported speech"
          },
          {
            topic: "Conectores",
            question: "Completa: 'I was tired; ___, I finished the report.'",
            answer: "however",
            hint: "However introduce un contraste entre dos ideas"
          }
        ]
      },
      {
        level: "C1",
        color: "#FAEEDA",
        textColor: "#633806",
        exercises: [
          {
            topic: "Inversión",
            question: "Rewrite using inversion: 'I had never seen such a thing.' ->",
            answer: "Never had I seen such a thing.",
            hint: "Inversion con Never: auxiliar + sujeto + verbo principal"
          },
          {
            topic: "Condicionales",
            question: "Completa: 'Had she ___ (study) harder, she would have passed.'",
            answer: "studied",
            hint: "Third conditional con inversion: Had + sujeto + Past Participle"
          },
          {
            topic: "Conectores",
            question: "Completa con el conector correcto: '___ his lack of experience, he got the job. (a pesar de)'",
            answer: "Despite",
            hint: "Despite + noun/gerund. Although + clause"
          },
          {
            topic: "Formación de palabras",
            question: "Forma el sustantivo de 'achieve':",
            answer: "achievement",
            hint: "Sufijo -ment para formar sustantivos de verbos"
          },
          {
            topic: "Conectores",
            question: "Completa con el conector: '___ she was tired, she kept working. (aunque)'",
            answer: "Although",
            hint: "Although + clausula completa (sujeto + verbo)"
          },
          {
            topic: "Voz pasiva",
            question: "Reescribe usando 'It': 'People say that he is very talented.' ->",
            answer: "It is said that he is very talented.",
            hint: "Estructura pasiva impersonal: It is said that..."
          },
          {
            topic: "Inversión",
            question: "Completa: 'Not only ___ she apologise, but she also offered a refund.'",
            answer: "did",
            hint: "Tras Not only, usa inversión auxiliar + sujeto"
          },
          {
            topic: "Cleft sentences",
            question: "Completa: '___ I need is a little more time.'",
            answer: "What",
            hint: "What-cleft: What + sujeto + verbo + be..."
          },
          {
            topic: "Modales en el pasado",
            question: "Completa: 'You ___ (tell) me earlier; I could have helped.'",
            answer: "should have told",
            hint: "Should have + participio expresa crítica o arrepentimiento"
          },
          {
            topic: "Participle clauses",
            question: "Completa: '___ (finish) the report, she sent it to the client.'",
            answer: "Having finished",
            hint: "Having + participio marca una acción anterior"
          },
          {
            topic: "Énfasis",
            question: "Completa: 'I ___ appreciate your honesty.'",
            answer: "do",
            hint: "Do/does/did delante del infinitivo añade énfasis"
          },
          {
            topic: "Nominalización",
            question: "Forma el sustantivo de 'resilient':",
            answer: "resilience",
            hint: "El sustantivo abstracto se forma con -ence"
          },
          {
            topic: "Concesión",
            question: "Completa: 'Much ___ I admire her, I disagree with the proposal.'",
            answer: "as",
            hint: "Much as + sujeto + verbo expresa concesión formal"
          },
          {
            topic: "Mixed conditionals",
            question: "Completa: 'If I had taken that job, I ___ in London now.'",
            answer: "would be",
            hint: "Causa pasada + resultado presente: if + Past Perfect, would + infinitivo"
          },
          {
            topic: "Subjuntivo formal",
            question: "Completa: 'The committee recommended that he ___ immediately.'",
            answer: "resign",
            hint: "Tras recommend that se usa la forma base en inglés formal"
          }
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  //  VOCABULARY
  // ----------------------------------------------------------
  vocabulary: {
    title: "Vocabulary",
    icon: "📚",
    description: "Más de 1.100 palabras y expresiones con ejemplo, pronunciación y seguimiento",
    count: "1100+ palabras y expresiones",
    levels: [
      {
        level: "A1",
        color: "#E1F5EE",
        textColor: "#085041",
        borderColor: "rgba(29,158,117,0.2)",
        words: [
          { word: "Happy", translation: "Feliz", example: "I am very happy today." },
          { word: "Hungry", translation: "Hambriento/a", example: "Are you hungry? Let's eat." },
          { word: "Big", translation: "Grande", example: "That is a big house." },
          { word: "Fast", translation: "Rapido/a", example: "He is a fast runner." },
          { word: "Friend", translation: "Amigo/a", example: "She is my best friend." },
          { word: "School", translation: "Colegio, escuela", example: "I go to school every day." },
          { word: "Work", translation: "Trabajar / Trabajo", example: "I work in an office." },
          { word: "Sleep", translation: "Dormir", example: "I sleep eight hours a night." }
        ]
      },
      {
        level: "B1",
        color: "#E6F1FB",
        textColor: "#0C447C",
        borderColor: "rgba(37,99,235,0.2)",
        words: [
          { word: "Ambitious", translation: "Ambicioso/a", example: "She's very ambitious about her career." },
          { word: "Breakthrough", translation: "Avance, logro", example: "Scientists made a breakthrough." },
          { word: "Daunting", translation: "Intimidante", example: "The task seemed daunting at first." },
          { word: "Eager", translation: "Ansioso, entusiasta", example: "He was eager to learn." },
          { word: "Fluent", translation: "Fluido/a", example: "She speaks fluent French." },
          { word: "Grateful", translation: "Agradecido/a", example: "I'm grateful for your help." },
          { word: "Hassle", translation: "Lio, molestia", example: "It's too much of a hassle." },
          { word: "Insight", translation: "Perspicacia, vision", example: "The book offers great insights." }
        ]
      },
      {
        level: "C1",
        color: "#FAEEDA",
        textColor: "#633806",
        borderColor: "rgba(186,117,23,0.2)",
        words: [
          { word: "Assertive", translation: "Asertivo/a, seguro/a", example: "You need to be more assertive in meetings." },
          { word: "Candid", translation: "Sincero/a, franco/a", example: "She gave a candid assessment of the situation." },
          { word: "Elusive", translation: "Esquivo/a, dificil de alcanzar", example: "Success can be elusive." },
          { word: "Forthcoming", translation: "Proximo/a; comunicativo/a", example: "He wasn't very forthcoming with details." },
          { word: "Innate", translation: "Innato/a", example: "She has an innate talent for languages." },
          { word: "Meticulous", translation: "Meticuloso/a", example: "He is meticulous about his work." },
          { word: "Pervasive", translation: "Generalizado/a, omnipresente", example: "Social media has a pervasive influence." },
          { word: "Tenacious", translation: "Tenaz, persistente", example: "She is tenacious in pursuing her goals." }
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  //  TESTS
  // ----------------------------------------------------------
  tests: {
    title: "Tests",
    icon: "✏️",
    description: "Preguntas tipo examen, feedback inmediato y desglose de resultados por tema",
    count: "21 preguntas",
    levels: [
      {
        level: "A1",
        color: "#E1F5EE",
        textColor: "#085041",
        questions: [
          {
            topic: "Presente simple",
            q: "Which sentence is correct?",
            options: [
              "She have a dog.",
              "She has a dog.",
              "She haves a dog.",
              "She is have a dog."
            ],
            correct: 1,
            explanation: "Con he/she/it en Present Simple, el verbo añade -s o -es."
          },
          {
            topic: "Sustantivos y plurales",
            q: "What is the plural of 'tooth'?",
            options: ["tooths", "teethes", "teeth", "toothes"],
            correct: 2,
            explanation: "'Tooth' tiene plural irregular: teeth."
          },
          {
            topic: "Expresiones cotidianas",
            q: "Choose the correct option: '___ you like some water?'",
            options: ["Do", "Would", "Are", "Have"],
            correct: 1,
            explanation: "'Would you like' es la forma correcta para ofrecer algo educadamente."
          },
          {
            topic: "Vocabulario",
            q: "What does 'tired' mean?",
            options: ["Aburrido", "Enfadado", "Cansado", "Triste"],
            correct: 2,
            explanation: "'Tired' significa cansado/a en español."
          },
          {
            topic: "There is / There are",
            q: "Complete: 'There ___ two cats in the garden.'",
            options: ["is", "are", "be", "am"],
            correct: 1,
            explanation: "Con un sujeto plural usamos 'there are'."
          },
          {
            topic: "Verbo to be",
            q: "Choose the correct option: 'I ___ from Spain.'",
            options: ["am", "is", "are", "be"],
            correct: 0,
            explanation: "'I' siempre va acompañado de 'am' en el verbo to be."
          },
          {
            topic: "Vocabulario",
            q: "What is the opposite of 'big'?",
            options: ["small", "tall", "fast", "new"],
            correct: 0,
            explanation: "'Small' es el opuesto de 'big'."
          }
        ]
      },
      {
        level: "B1",
        color: "#E6F1FB",
        textColor: "#0C447C",
        questions: [
          {
            topic: "Present Perfect",
            q: "Which sentence is correct?",
            options: [
              "I have been knowing her for years.",
              "I have known her for years.",
              "I know her since years.",
              "I knew her since years."
            ],
            correct: 1,
            explanation: "Con verbos de estado (know, like, believe) no se usa la forma continua."
          },
          {
            topic: "Condicionales",
            q: "Choose the right option: 'If I ___ you, I would apologise.'",
            options: ["am", "were", "will be", "have been"],
            correct: 1,
            explanation: "Segunda condicional: If + Past Simple (were para todos los sujetos en registro formal)."
          },
          {
            topic: "Phrasal verbs",
            q: "What does 'run out of' mean?",
            options: ["Salir corriendo", "Quedarse sin algo", "Superar algo", "Escapar de algo"],
            correct: 1,
            explanation: "'To run out of something' significa agotar las existencias de algo."
          },
          {
            topic: "Question tags",
            q: "Select the correct question tag: 'She doesn't like spicy food, ___?'",
            options: ["doesn't she", "does she", "isn't she", "is she"],
            correct: 1,
            explanation: "Con negativo en la oracion principal, la question tag es afirmativa."
          },
          {
            topic: "Vocabulario",
            q: "Which word is a synonym of 'exhausted'?",
            options: ["Energised", "Confused", "Drained", "Stubborn"],
            correct: 2,
            explanation: "'Drained' y 'exhausted' significan ambos completamente agotado."
          },
          {
            topic: "Present Perfect",
            q: "Choose the correct option: 'She has lived here ___ 2015.'",
            options: ["for", "since", "from", "at"],
            correct: 1,
            explanation: "'Since' se usa con un punto concreto en el tiempo; 'for' con una duracion."
          },
          {
            topic: "Phrasal verbs",
            q: "What does 'give up' mean?",
            options: ["Rendirse", "Entregar un regalo", "Subir", "Empezar"],
            correct: 0,
            explanation: "'Give up' significa rendirse o abandonar algo."
          }
        ]
      },
      {
        level: "C1",
        color: "#FAEEDA",
        textColor: "#633806",
        questions: [
          {
            topic: "Subjuntivo",
            q: "Which sentence uses the subjunctive correctly?",
            options: [
              "The manager insisted that he explains the situation.",
              "The manager insisted that he explained the situation.",
              "The manager insisted that he explain the situation.",
              "The manager insisted that he would explain the situation."
            ],
            correct: 2,
            explanation: "El subjuntivo en ingles usa el infinitivo sin 'to' (bare infinitive) tras verbos como insist, suggest, demand."
          },
          {
            topic: "Conectores",
            q: "Choose the correct form: '___ the bad weather, the event was a success.'",
            options: ["Despite of", "Although", "Despite", "Even"],
            correct: 2,
            explanation: "'Despite' va seguido de un sustantivo o gerundio, nunca de 'of'. 'Although' va seguido de una clausula."
          },
          {
            topic: "Inversión",
            q: "Which sentence contains a correct use of inversion?",
            options: [
              "Never I have seen such a thing.",
              "Never have I seen such a thing.",
              "Never I saw such a thing.",
              "Never saw I such a thing."
            ],
            correct: 1,
            explanation: "Con Never al inicio se invierte auxiliar y sujeto: Never + auxiliar + sujeto + verbo."
          },
          {
            topic: "Formación de palabras",
            q: "What is the noun form of 'resilient'?",
            options: ["resilience", "resiliency", "resiliention", "resilientness"],
            correct: 0,
            explanation: "El sustantivo de 'resilient' es 'resilience'. El sufijo -nce/-ence es comun en sustantivos de adjetivos en -nt."
          },
          {
            topic: "Phrasal verbs",
            q: "Which phrasal verb means 'to tolerate'?",
            options: ["put off", "put up with", "put down", "put out"],
            correct: 1,
            explanation: "'Put up with' significa tolerar o aguantar algo o a alguien."
          },
          {
            topic: "Inversión",
            q: "Choose the correct option: 'No sooner ___ she arrived than it started raining.'",
            options: ["had", "did", "have", "she had"],
            correct: 0,
            explanation: "'No sooner had + sujeto + participio' es una estructura de inversion tras 'no sooner'."
          },
          {
            topic: "Vocabulario",
            q: "What is the closest synonym of 'meticulous'?",
            options: ["Careless", "Thorough", "Hasty", "Vague"],
            correct: 1,
            explanation: "'Meticulous' y 'thorough' significan ambos minucioso, detallista."
          }
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  //  LISTENING
  // ----------------------------------------------------------
  listening: {
    title: "Listening",
    icon: "🎧",
    description: "Escucha voces inglesas naturales, regula la velocidad y comprueba qué has entendido",
    count: "15 audios",
    levels: [
      {
        level: "A1",
        color: "#E1F5EE",
        textColor: "#085041",
        tracks: [
          {
            title: "Greetings and Introductions",
            desc: "Dialogo basico de presentaciones. Nivel A1.",
            context: "Conversación cotidiana",
            accent: "US",
            script: "Hi! My name is Anna. Nice to meet you. Hi Anna, I'm Tom. Nice to meet you too. Where are you from? I'm from Italy. And you? I'm from Canada.",
            question: "Where is Anna from?",
            options: ["Canada", "Italy", "Spain"],
            correct: 1
          },
          {
            title: "Numbers and Colors",
            desc: "Practica numeros, colores y objetos cotidianos. Nivel A1.",
            context: "Vocabulario práctico",
            accent: "GB",
            script: "Look at this box. It has five red apples, three blue balls, and two green books. There are ten things in total. The apples are next to the books.",
            question: "How many objects are in the box?",
            options: ["Five", "Eight", "Ten"],
            correct: 2
          },
          {
            title: "Daily Routines",
            desc: "Una persona describe su dia a dia. Nivel A1-A2.",
            context: "Vida diaria",
            accent: "US",
            script: "Every morning I wake up at seven o'clock. I have breakfast, then I go to work by bus. In the evening, I cook dinner and watch TV before going to bed.",
            question: "How does the speaker travel to work?",
            options: ["By car", "By bus", "By train"],
            correct: 1
          },
          {
            title: "At the Café",
            desc: "Un pedido sencillo con precios y expresiones de cortesía.",
            context: "Situaciones reales",
            accent: "GB",
            script: "Good morning. Can I have a cheese sandwich and a cup of tea, please? Of course. That's six pounds fifty. Here you are. Thank you. Your order will be ready in five minutes.",
            question: "How much is the order?",
            options: ["Five pounds", "Six pounds fifty", "Seven pounds"],
            correct: 1
          },
          {
            title: "Weekend Weather",
            desc: "Una previsión breve para organizar el fin de semana.",
            context: "El tiempo",
            accent: "US",
            script: "Saturday will be sunny and warm, with a high of twenty-four degrees. On Sunday, it will be cooler and rainy, so remember to take an umbrella.",
            question: "What will the weather be like on Sunday?",
            options: ["Sunny and warm", "Snowy", "Cool and rainy"],
            correct: 2
          }
        ]
      },
      {
        level: "B1",
        color: "#E6F1FB",
        textColor: "#0C447C",
        tracks: [
          {
            title: "Job Interview",
            desc: "Dialogo en una entrevista de trabajo. Nivel B1-B2.",
            context: "Entorno laboral",
            accent: "GB",
            script: "Good morning, thank you for coming. Can you tell me about your previous experience? Of course. I worked as a customer service assistant for two years, and I really enjoyed helping people solve problems.",
            question: "What did the candidate do previously?",
            options: ["She managed a hotel", "She worked in customer service", "She taught English"],
            correct: 1
          },
          {
            title: "Talking About the Future",
            desc: "Conversacion sobre planes y predicciones. Nivel B1.",
            context: "Conversación cotidiana",
            accent: "US",
            script: "What are your plans for next year? I'm planning to travel around Europe. I think I'll visit Portugal first, and then maybe France. I'm really looking forward to it.",
            question: "Which country will the speaker probably visit first?",
            options: ["France", "Portugal", "Italy"],
            correct: 1
          },
          {
            title: "Describing a City",
            desc: "Alguien describe su ciudad favorita. Nivel B1-B2.",
            context: "Viajes y lugares",
            accent: "GB",
            script: "My favourite city is Barcelona. It has remarkable architecture, lively neighbourhoods, beautiful beaches, and excellent food. What I enjoy most is that there is always something interesting to do, day or night.",
            question: "What does the speaker value most?",
            options: ["The cheap hotels", "The variety of activities", "The public transport"],
            correct: 1
          },
          {
            title: "A Missed Connection",
            desc: "Un anuncio de estación y un cambio de viaje inesperado.",
            context: "Viajes",
            accent: "GB",
            script: "We regret to announce that the eleven fifteen service to Manchester has been delayed by forty minutes. Passengers for Leeds should take the train from platform six and change at Sheffield.",
            question: "What should passengers for Leeds do?",
            options: ["Wait forty minutes", "Use platform six and change trains", "Take a bus to Sheffield"],
            correct: 1
          },
          {
            title: "Remote Work Discussion",
            desc: "Dos argumentos sobre productividad y trabajo híbrido.",
            context: "Trabajo",
            accent: "US",
            script: "Working from home saves me nearly two hours of commuting every day. However, I miss the spontaneous conversations we used to have at the office. A hybrid schedule gives me the focus of home and the collaboration of in-person work.",
            question: "Why does the speaker prefer a hybrid schedule?",
            options: ["It offers focus and collaboration", "It means fewer working hours", "It eliminates online meetings"],
            correct: 0
          }
        ]
      },
      {
        level: "C1",
        color: "#FAEEDA",
        textColor: "#633806",
        tracks: [
          {
            title: "Newsroom Briefing",
            desc: "Extracto informativo con ritmo y acento británico.",
            context: "Noticias",
            accent: "GB",
            script: "Good evening. Tonight's main story: scientists have announced a significant breakthrough in renewable energy storage which, if deployed at scale, could reduce carbon emissions considerably over the coming decade.",
            question: "What condition is attached to the predicted reduction?",
            options: ["Lower consumer demand", "Large-scale deployment", "New government subsidies"],
            correct: 1
          },
          {
            title: "Academic Lecture Extract",
            desc: "Fragmento de una conferencia universitaria. Nivel C1.",
            context: "Ámbito académico",
            accent: "GB",
            script: "Today we will examine the relationship between cognitive development and language acquisition, focusing particularly on the critical period hypothesis. Although the theory remains influential, recent evidence suggests that adult learning outcomes are more nuanced than the original model implied.",
            question: "How does recent evidence affect the original theory?",
            options: ["It fully disproves it", "It confirms every detail", "It suggests a more complex picture"],
            correct: 2
          },
          {
            title: "Debate: Technology and Society",
            desc: "Debate formal entre dos ponentes. Nivel C1-C2.",
            context: "Debate formal",
            accent: "US",
            script: "While technology has undoubtedly improved our quality of life, one must also consider its pervasive influence on mental health. This is particularly relevant among younger generations, for whom the boundary between online and offline identity has become increasingly blurred.",
            question: "What concern does the speaker emphasise?",
            options: ["The cost of new devices", "The effect on mental health and identity", "The decline of technical skills"],
            correct: 1
          },
          {
            title: "Behavioural Economics",
            desc: "Explicación de cómo el contexto altera nuestras decisiones.",
            context: "Podcast académico",
            accent: "US",
            script: "Contrary to the assumption that consumers make consistently rational choices, behavioural economics shows that seemingly minor details can shape our decisions. The way options are framed may be just as influential as the options themselves.",
            question: "What does the speaker claim about framing?",
            options: ["It has little measurable effect", "It can influence decisions strongly", "It only affects financial experts"],
            correct: 1
          },
          {
            title: "Urban Futures",
            desc: "Análisis sobre ciudades compactas y calidad de vida.",
            context: "Reportaje",
            accent: "GB",
            script: "Advocates of the fifteen-minute city argue that proximity to essential services reduces car dependency and strengthens neighbourhood ties. Critics, however, caution that without affordable housing, such improvements may accelerate displacement rather than foster inclusion.",
            question: "What risk do critics identify?",
            options: ["Longer commuting times", "The loss of public services", "Displacement caused by rising costs"],
            correct: 2
          }
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  //  TEORIA
  // ----------------------------------------------------------
  theory: {
    title: "Teoría",
    icon: "📖",
    description: "15 módulos visuales con fórmulas, ejemplos, atajos y errores frecuentes",
    count: "15 temas",
    topics: [
      {
        group: "Tiempos verbales",
        title: "Verbos regulares e irregulares",
        intro: "Los verbos regulares forman el pasado añadiendo -ed. Los irregulares tienen su propia forma y hay que memorizarlos.",
        table: {
          headers: ["Infinitivo", "Regular (Past)", "Irregular (Past)"],
          rows: [
            ["work", "worked", "-"],
            ["play", "played", "-"],
            ["go", "-", "went"],
            ["have", "-", "had"],
            ["make", "-", "made"],
            ["take", "-", "took"]
          ]
        }
      },
      {
        group: "Tiempos verbales",
        title: "Tipos de presente",
        intro: "El ingles tiene cuatro tiempos de presente segun si la accion es habitual, esta en curso, es un resultado o lleva un tiempo ocurriendo.",
        table: {
          headers: ["Tiempo", "Uso", "Ejemplo"],
          rows: [
            ["Present Simple", "Habitos, hechos generales", "She works every day."],
            ["Present Continuous", "Accion en curso ahora mismo", "She is working now."],
            ["Present Perfect", "Accion pasada con resultado presente", "She has finished."],
            ["Present Perfect Continuous", "Accion que empezo antes y sigue", "She has been working for 2h."]
          ]
        }
      },
      {
        group: "Tiempos verbales",
        title: "Tipos de pasado",
        intro: "Cuatro formas de expresar el pasado segun si fue puntual, estaba en curso, era anterior a otro pasado o llevaba un tiempo ocurriendo.",
        table: {
          headers: ["Tiempo", "Uso", "Ejemplo"],
          rows: [
            ["Past Simple", "Accion terminada en un momento concreto", "He called yesterday."],
            ["Past Continuous", "Accion en curso en un momento del pasado", "He was calling at 8pm."],
            ["Past Perfect", "Accion anterior a otra accion pasada", "He had called before she arrived."],
            ["Past Perfect Continuous", "Accion continua anterior a otra pasada", "He had been calling for an hour."]
          ]
        }
      },
      {
        group: "Tiempos verbales",
        title: "Tipos de futuro",
        intro: "El ingles expresa el futuro de varias formas segun si es una decision espontanea, un plan, una prediccion o algo programado.",
        table: {
          headers: ["Forma", "Uso", "Ejemplo"],
          rows: [
            ["will + infinitivo", "Decision espontanea, prediccion", "I'll help you."],
            ["be going to", "Plan decidido, evidencia presente", "I'm going to study tonight."],
            ["Present Continuous", "Evento acordado y programado", "I'm meeting her at 6."],
            ["Present Simple", "Horario fijo, transporte, eventos", "The train leaves at 9."],
            ["Future Perfect", "Accion completada antes de un punto futuro", "I will have finished by then."]
          ]
        }
      },
      {
        group: "Voz y estructuras",
        title: "Passive Voice",
        intro: "La voz pasiva desplaza el foco del sujeto que hace la accion al objeto que la recibe. Se forma con el verbo to be + participio pasado.",
        table: {
          headers: ["Tiempo", "Activa", "Pasiva"],
          rows: [
            ["Present Simple", "They clean the office.", "The office is cleaned."],
            ["Past Simple", "They built this house.", "This house was built."],
            ["Present Perfect", "They have sent the email.", "The email has been sent."],
            ["Future (will)", "They will announce it.", "It will be announced."],
            ["Modal", "They must fix it.", "It must be fixed."]
          ]
        }
      },
      {
        group: "Voz y estructuras",
        title: "Oraciones condicionales",
        intro: "Las condicionales expresan situaciones hipoteticas o reales. Hay cuatro tipos segun el grado de probabilidad o realidad.",
        table: {
          headers: ["Tipo", "Estructura", "Ejemplo"],
          rows: [
            ["Zero (hechos)", "If + Present Simple, Present Simple", "If you heat water, it boils."],
            ["1st (real/posible)", "If + Present Simple, will + inf.", "If it rains, I will stay home."],
            ["2nd (hipotetica)", "If + Past Simple, would + inf.", "If I were rich, I would travel."],
            ["3rd (imposible/pasado)", "If + Past Perfect, would have + pp.", "If I had studied, I would have passed."]
          ]
        }
      },
      {
        group: "Conectores y discurso",
        title: "Oraciones de relativo y discurso indirecto",
        intro: "Las oraciones de relativo añaden informacion sobre un sustantivo. El discurso indirecto transmite lo que alguien dijo, cambiando los tiempos verbales.",
        table: {
          headers: ["Concepto", "Clave", "Ejemplo"],
          rows: [
            ["Defining relative", "who / which / that - sin comas", "The man who called is my boss."],
            ["Non-defining relative", "who / which - con comas", "My sister, who lives in London, is a doctor."],
            ["Reported speech (present)", "say/tell + that + backshift", "I work here -> He said he worked there."],
            ["Reported speech (past)", "Past Simple -> Past Perfect", "I saw it -> She said she had seen it."],
            ["Reported questions", "ask + if/whether / ask + wh-word", "Are you ok? -> He asked if I was ok."]
          ]
        }
      },
      {
        group: "Elementos gramaticales",
        title: "Tipos de pronombres",
        intro: "Los pronombres sustituyen a los sustantivos para evitar repeticion. Cada tipo tiene una funcion distinta en la oracion.",
        table: {
          headers: ["Tipo", "Ejemplos", "Uso"],
          rows: [
            ["Subject pronouns", "I, you, he, she, it, we, they", "Sujeto de la oracion"],
            ["Object pronouns", "me, you, him, her, it, us, them", "Objeto directo/indirecto"],
            ["Possessive adjectives", "my, your, his, her, its, our, their", "Acompañan a un sustantivo"],
            ["Possessive pronouns", "mine, yours, his, hers, ours, theirs", "Sustituyen al sustantivo"],
            ["Reflexive pronouns", "myself, yourself, himself, herself...", "El sujeto actua sobre si mismo"],
            ["Relative pronouns", "who, which, that, whose, whom", "Introducen oraciones de relativo"],
            ["Demonstrative pronouns", "this, that, these, those", "Señalan algo en el espacio/tiempo"],
            ["Indefinite pronouns", "someone, nobody, everything, any...", "Referencia no especifica"]
          ]
        }
      },
      {
        group: "Elementos gramaticales",
        title: "Artículos y determinantes",
        level: "A1–B1",
        formula: "a / an · the · artículo cero",
        tip: "Piensa si el sustantivo es conocido, contable y singular antes de elegir.",
        pitfall: "No uses artículo para hablar en general con plurales: Dogs are friendly.",
        intro: "Los artículos indican si hablamos de algo por primera vez, de algo ya identificado o de una categoría en general.",
        table: {
          headers: ["Forma", "Cuándo se usa", "Ejemplo"],
          rows: [
            ["a / an", "Singular contable, primera mención", "I saw a film."],
            ["the", "Referencia conocida o única", "The film was excellent."],
            ["Sin artículo", "Plural o incontable en general", "Music helps me focus."],
            ["some / any", "Cantidad indefinida", "We need some water. / Is there any?"]
          ]
        }
      },
      {
        group: "Elementos gramaticales",
        title: "Cuantificadores",
        level: "A1–B2",
        formula: "many / few + contable · much / little + incontable",
        tip: "A few y a little tienen sentido positivo; few y little sugieren insuficiencia.",
        pitfall: "Money, advice, information y furniture son incontables en inglés.",
        intro: "Los cuantificadores expresan cantidad y cambian según el sustantivo sea contable o incontable.",
        table: {
          headers: ["Cuantificador", "Tipo", "Ejemplo"],
          rows: [
            ["many / a few / few", "Contables", "We have a few options."],
            ["much / a little / little", "Incontables", "There is little time left."],
            ["a lot of / enough", "Ambos", "Do we have enough chairs?"],
            ["too many / too much", "Exceso", "There is too much traffic."]
          ]
        }
      },
      {
        group: "Voz y estructuras",
        title: "Verbos modales",
        level: "A2–C1",
        formula: "modal + infinitivo sin to",
        tip: "El significado depende de la certeza: might < may/could < must.",
        pitfall: "Después de un modal no añadas -s ni uses to: She can swim.",
        intro: "Los modales expresan capacidad, obligación, permiso, consejo, posibilidad y deducción sin conjugarse por persona.",
        table: {
          headers: ["Función", "Modales", "Ejemplo"],
          rows: [
            ["Capacidad / permiso", "can, could, may", "Could I open the window?"],
            ["Obligación", "must, have to, should", "You must wear a helmet."],
            ["Posibilidad", "might, may, could", "It might rain later."],
            ["Deducción", "must, can't, might", "She must be at work."]
          ]
        }
      },
      {
        group: "Voz y estructuras",
        title: "Gerundio e infinitivo",
        level: "B1–C1",
        formula: "verb + -ing · verb + to + infinitivo",
        tip: "Aprende el patrón junto al verbo: avoid doing, decide to do.",
        pitfall: "Stop doing significa dejar una actividad; stop to do, parar para hacer otra.",
        intro: "Algunos verbos exigen gerundio, otros infinitivo y unos pocos cambian de significado según la forma elegida.",
        table: {
          headers: ["Patrón", "Verbos frecuentes", "Ejemplo"],
          rows: [
            ["+ gerundio", "enjoy, avoid, mind, suggest", "She suggested taking a taxi."],
            ["+ to-infinitivo", "want, decide, hope, manage", "We managed to finish."],
            ["Ambos, mismo sentido", "begin, start, continue", "It started raining / to rain."],
            ["Ambos, sentido distinto", "remember, stop, try", "Remember to call her."]
          ]
        }
      },
      {
        group: "Conectores y discurso",
        title: "Conectores para escribir mejor",
        level: "B1–C1",
        formula: "idea + conector + relación lógica",
        tip: "No elijas por traducción: decide primero si añades, contrastas, causas o concluyes.",
        pitfall: "Despite va con nombre o -ing; although introduce una oración completa.",
        intro: "Los conectores hacen explícita la relación entre ideas y mejoran la cohesión de textos y presentaciones.",
        table: {
          headers: ["Relación", "Conectores", "Ejemplo"],
          rows: [
            ["Adición", "moreover, furthermore, in addition", "Moreover, costs have fallen."],
            ["Contraste", "however, whereas, nevertheless", "However, demand remains low."],
            ["Causa / resultado", "since, therefore, consequently", "Demand rose; therefore, prices increased."],
            ["Concesión", "although, despite, even though", "Despite the rain, we left."]
          ]
        }
      },
      {
        group: "Gramática avanzada",
        title: "Inversión y énfasis",
        level: "C1",
        formula: "expresión negativa + auxiliar + sujeto + verbo",
        tip: "Localiza el auxiliar; si no existe, añade do/does/did.",
        pitfall: "La inversión solo aparece cuando la expresión restrictiva abre la oración.",
        intro: "La inversión cambia el orden habitual para aportar énfasis, especialmente después de expresiones negativas o restrictivas.",
        table: {
          headers: ["Inicio", "Patrón", "Ejemplo"],
          rows: [
            ["Never / Rarely", "auxiliar + sujeto", "Rarely have I seen such care."],
            ["Not only", "inversión + but also", "Not only did she win, but she broke the record."],
            ["No sooner", "had + sujeto + pp + than", "No sooner had we left than it rained."],
            ["Only after", "auxiliar + sujeto", "Only after lunch did he call."]
          ]
        }
      },
      {
        group: "Gramática avanzada",
        title: "Cleft sentences y nominalización",
        level: "C1",
        formula: "It is/was ... that · What ... is/was ...",
        tip: "Usa estas estructuras con moderación para dirigir la atención del lector.",
        pitfall: "Una nominalización excesiva hace que el texto resulte denso y distante.",
        intro: "Las cleft sentences enfocan una parte de la oración; la nominalización convierte acciones o cualidades en conceptos.",
        table: {
          headers: ["Recurso", "Transformación", "Ejemplo"],
          rows: [
            ["It-cleft", "enfatiza un elemento", "It was Maya who solved it."],
            ["What-cleft", "enfatiza información nueva", "What we need is clarity."],
            ["Nominalización", "decide → decision", "They decided → Their decision"],
            ["Nominalización", "effective → effectiveness", "The policy's effectiveness"]
          ]
        }
      }
    ]
  }

};

// ============================================================
//  CURSO DE GRAMÁTICA DESDE CERO
//  Cada ficha incluye estructura, usos, ejemplos y un error típico.
//  Los ejercicios se agrupan por nivel y el solucionario se genera
//  automáticamente al final de cada hoja desde estos datos.
// ============================================================

const grammarExpansion = {
  A0: {
    lessons: [
      {
        title: "Orden básico de la oración",
        goal: "Construir frases afirmativas sencillas sin traducir palabra por palabra.",
        structure: "Sujeto + verbo + complemento",
        uses: ["Decir quién hace una acción", "Añadir información de lugar, tiempo u objeto"],
        examples: [
          { en: "I study English every day.", es: "Estudio inglés todos los días." },
          { en: "Mia lives in Madrid.", es: "Mia vive en Madrid." }
        ],
        mistake: "En inglés casi siempre debes escribir el sujeto: Is raining ✗ → It is raining ✓"
      },
      {
        title: "Pronombres personales",
        goal: "Sustituir nombres y reconocer quién realiza la acción.",
        structure: "I · you · he · she · it · we · they",
        uses: ["I para hablar de uno mismo", "It para cosas, animales o situaciones", "They para plural"],
        examples: [
          { en: "She is my sister.", es: "Ella es mi hermana." },
          { en: "They are at home.", es: "Ellos están en casa." }
        ],
        mistake: "I siempre se escribe con mayúscula, incluso en mitad de una oración."
      },
      {
        title: "Verbo to be",
        goal: "Presentarse, describir y localizar personas o cosas.",
        structure: "I am · you/we/they are · he/she/it is",
        uses: ["Identidad y profesión", "Edad y estado", "Lugar y descripción"],
        examples: [
          { en: "I am twenty years old.", es: "Tengo veinte años." },
          { en: "The books are on the table.", es: "Los libros están en la mesa." }
        ],
        mistake: "La edad se expresa con to be, no con have: I am 20 ✓"
      },
      {
        title: "Artículos a, an y the",
        goal: "Presentar objetos y hablar de algo ya conocido.",
        structure: "a + sonido consonante · an + sonido vocal · the + referencia conocida",
        uses: ["A/an para una cosa no identificada", "The cuando ambos saben de qué se habla"],
        examples: [
          { en: "I need a pen.", es: "Necesito un bolígrafo." },
          { en: "The pen is blue.", es: "El bolígrafo es azul." }
        ],
        mistake: "El sonido manda: an hour, pero a university."
      },
      {
        title: "Plural de los sustantivos",
        goal: "Hablar de más de una persona, animal u objeto.",
        structure: "noun + s/es · consonante + y → ies · plurales irregulares",
        uses: ["-s en la mayoría", "-es tras s, sh, ch, x", "Formas irregulares frecuentes"],
        examples: [
          { en: "one class → two classes", es: "una clase → dos clases" },
          { en: "one child → three children", es: "un niño → tres niños" }
        ],
        mistake: "Los adjetivos no tienen plural: two red cars, no two reds cars."
      },
      {
        title: "Adjetivos y posesivos",
        goal: "Describir y decir a quién pertenece algo.",
        structure: "posesivo + adjetivo + sustantivo",
        uses: ["my, your, his, her, its, our, their", "El adjetivo va antes del sustantivo"],
        examples: [
          { en: "This is her new phone.", es: "Este es su teléfono nuevo." },
          { en: "Our house is small.", es: "Nuestra casa es pequeña." }
        ],
        mistake: "No confundas his (de él) con her (de ella)."
      },
      {
        title: "Preguntas básicas",
        goal: "Pedir información personal y responder de forma breve.",
        structure: "Wh-word + to be + sujeto? · To be + sujeto...?",
        uses: ["What, where, who, how", "Preguntas de sí/no con am/is/are"],
        examples: [
          { en: "Where are you from?", es: "¿De dónde eres?" },
          { en: "Is she a student? Yes, she is.", es: "¿Es estudiante? Sí." }
        ],
        mistake: "En pregunta, el verbo va antes del sujeto: Where you are? ✗"
      },
      {
        title: "There is y there are",
        goal: "Decir qué existe o qué hay en un lugar.",
        structure: "There is + singular · There are + plural",
        uses: ["Describir habitaciones, ciudades o imágenes", "There isn't / there aren't para negar"],
        examples: [
          { en: "There is a café near here.", es: "Hay una cafetería cerca." },
          { en: "There are two windows.", es: "Hay dos ventanas." }
        ],
        mistake: "No uses have para traducir hay: There is a problem ✓"
      }
    ],
    exercises: [
      { topic: "Orden básico", question: "Ordena: 'coffee / I / like'", answer: "I like coffee", hint: "Empieza por el sujeto y continúa con el verbo." },
      { topic: "Pronombres", question: "Sustituye 'Laura' por un pronombre: '___ is my friend.'", answer: "She", hint: "Laura es una persona femenina singular." },
      { topic: "Pronombres", question: "Sustituye 'the book': '___ is new.'", answer: "It", hint: "Para una cosa singular usamos it." },
      { topic: "To be", question: "Completa: 'I ___ from Spain.'", answer: "am", hint: "To be con I." },
      { topic: "To be", question: "Completa: 'Tom and Leo ___ brothers.'", answer: "are", hint: "Dos personas equivalen a they." },
      { topic: "To be", question: "Forma la negativa: 'She is tired.'", answer: "She isn't tired", answers: ["She is not tired"], hint: "Añade not después de is." },
      { topic: "Artículos", question: "Completa: 'It is ___ old house.'", answer: "an", hint: "Old empieza por sonido vocal." },
      { topic: "Artículos", question: "Completa: 'I have a dog. ___ dog is friendly.'", answer: "The", hint: "Ya sabemos qué perro es." },
      { topic: "Plurales", question: "Escribe el plural de 'box':", answer: "boxes", hint: "Tras x añadimos -es." },
      { topic: "Plurales", question: "Escribe el plural de 'baby':", answer: "babies", hint: "Consonante + y cambia a -ies." },
      { topic: "Posesivos", question: "Completa: 'We live here. This is ___ house.'", answer: "our", hint: "El posesivo correspondiente a we." },
      { topic: "Preguntas", question: "Completa: '___ is your name?'", answer: "What", hint: "Pregunta por información o identidad." },
      { topic: "Preguntas", question: "Forma la pregunta: 'She is at home.'", answer: "Is she at home", hint: "Coloca is delante del sujeto." },
      { topic: "There is / are", question: "Completa: 'There ___ three chairs.'", answer: "are", hint: "Three chairs es plural." },
      { topic: "There is / are", question: "Completa: 'There ___ not a bank here.'", answer: "is", hint: "A bank es singular." }
    ],
    extraExercises: []
  },
  A1: {
    lessons: [
      {
        title: "Present Simple",
        goal: "Hablar de rutinas, hábitos y hechos generales.",
        structure: "I/you/we/they + verbo · he/she/it + verbo-s",
        uses: ["Rutinas", "Hechos y gustos", "Horarios"],
        examples: [
          { en: "I walk to work.", es: "Voy andando al trabajo." },
          { en: "She works on Saturdays.", es: "Ella trabaja los sábados." }
        ],
        mistake: "Con he/she/it añade -s, pero después de doesn't usa el infinitivo."
      },
      {
        title: "Present Continuous",
        goal: "Describir acciones en curso y situaciones temporales.",
        structure: "am/is/are + verbo-ing",
        uses: ["Ahora mismo", "Situaciones temporales", "Planes ya acordados"],
        examples: [
          { en: "They are studying now.", es: "Están estudiando ahora." },
          { en: "I'm meeting Ana tonight.", es: "He quedado con Ana esta noche." }
        ],
        mistake: "No olvides el verbo to be: I studying ✗ → I am studying ✓"
      },
      {
        title: "Regular and Irregular Verbs",
        goal: "Reconocer la forma base y empezar a construir el pasado de los verbos frecuentes.",
        structure: "regular: base + -ed · irregular: forma propia",
        uses: ["Identificar verbos regulares", "Aprender infinitivo, pasado y participio juntos"],
        examples: [
          { en: "work → worked → worked", es: "trabajar → trabajó → trabajado" },
          { en: "go → went → gone", es: "ir → fue → ido" }
        ],
        mistake: "No añadas -ed a un verbo irregular: goed ✗ → went ✓"
      },
      {
        title: "Can, could y have to",
        goal: "Expresar capacidad, permiso y obligación básica.",
        structure: "can/could + infinitivo · have to + infinitivo",
        uses: ["Can para capacidad presente", "Could para capacidad pasada o petición", "Have to para obligación"],
        examples: [
          { en: "Can you help me?", es: "¿Puedes ayudarme?" },
          { en: "I have to leave early.", es: "Tengo que irme pronto." }
        ],
        mistake: "No añadas to después de can o could."
      },
      {
        title: "Countable y uncountable",
        goal: "Elegir correctamente much, many, some y any.",
        structure: "many + contable plural · much + incontable · some/any + ambos",
        uses: ["Preguntar por cantidad", "Ofrecer o pedir", "Expresar cantidad indefinida"],
        examples: [
          { en: "How many books do you have?", es: "¿Cuántos libros tienes?" },
          { en: "We don't have much time.", es: "No tenemos mucho tiempo." }
        ],
        mistake: "Information, advice y furniture son incontables."
      },
      {
        title: "Comparativos y superlativos",
        goal: "Comparar personas, objetos y lugares.",
        structure: "short: -er/-est · long: more/most + adjective",
        uses: ["Comparar dos elementos", "Destacar uno dentro de un grupo"],
        examples: [
          { en: "This route is faster.", es: "Esta ruta es más rápida." },
          { en: "It is the most interesting museum.", es: "Es el museo más interesante." }
        ],
        mistake: "No mezcles formas: more easier ✗ → easier ✓"
      },
      {
        title: "Adverbios de frecuencia",
        goal: "Explicar con qué frecuencia ocurre una rutina.",
        structure: "sujeto + always/usually/often + verbo · to be + adverbio",
        uses: ["Describir hábitos", "Responder a How often?", "Matizar una rutina"],
        examples: [
          { en: "I usually walk to work.", es: "Normalmente voy andando al trabajo." },
          { en: "She is never late.", es: "Ella nunca llega tarde." }
        ],
        mistake: "Con to be, el adverbio va después: she is always, no she always is."
      },
      {
        title: "Preposiciones de tiempo y lugar",
        goal: "Situar acciones y objetos con precisión.",
        structure: "at + punto · on + superficie/día · in + espacio/periodo",
        uses: ["At 8 o'clock", "On Monday / on the table", "In July / in the room"],
        examples: [
          { en: "The class starts at nine.", es: "La clase empieza a las nueve." },
          { en: "My keys are in the bag.", es: "Mis llaves están en el bolso." }
        ],
        mistake: "No traduzcas directamente desde español; aprende cada expresión completa."
      }
    ],
    extraExercises: [
      { topic: "Present Simple", question: "Completa: 'How often ___ she ___ (go) running?'", answer: "does she go", hint: "Pregunta con does + sujeto + infinitivo." },
      { topic: "Present Continuous", question: "Completa: 'Be quiet! The baby ___ (sleep).'", answer: "is sleeping", hint: "La acción ocurre ahora mismo." },
      { topic: "Cuantificadores", question: "Completa: 'How ___ water do you drink?'", answer: "much", hint: "Water es incontable." },
      { topic: "Superlativos", question: "Completa: 'This is ___ (good) day of my life.'", answer: "the best", hint: "Good tiene una forma irregular." },
      { topic: "Futuro", question: "Completa el plan: 'We ___ (visit) London next month.'", answer: "are going to visit", hint: "Es un plan decidido." }
    ]
  },
  B1: {
    lessons: [
      {
        title: "Present Perfect",
        goal: "Conectar una experiencia o acción pasada con el presente.",
        structure: "have/has + participio",
        uses: ["Experiencias sin fecha", "Resultados presentes", "Situaciones con since/for"],
        examples: [
          { en: "I have lost my keys.", es: "He perdido las llaves." },
          { en: "She has lived here for five years.", es: "Vive aquí desde hace cinco años." }
        ],
        mistake: "Con una fecha pasada terminada usa Past Simple: I saw it yesterday."
      },
      {
        title: "Past Continuous y Past Perfect",
        goal: "Ordenar acciones y dar contexto a una narración.",
        structure: "was/were + -ing · had + participio",
        uses: ["Acción en progreso interrumpida", "Acción anterior a otro pasado"],
        examples: [
          { en: "I was driving when you called.", es: "Estaba conduciendo cuando llamaste." },
          { en: "They had left before we arrived.", es: "Se habían ido antes de que llegáramos." }
        ],
        mistake: "No uses Past Perfect para todas las acciones; solo para aclarar anterioridad."
      },
      {
        title: "Conditionals 0, 1 y 2",
        goal: "Expresar hechos, posibilidades reales e hipótesis.",
        structure: "0: present + present · 1: present + will · 2: past + would",
        uses: ["Reglas generales", "Futuro posible", "Situación imaginaria presente"],
        examples: [
          { en: "If you heat ice, it melts.", es: "Si calientas hielo, se derrite." },
          { en: "If I had more time, I would read more.", es: "Si tuviera más tiempo, leería más." }
        ],
        mistake: "Normalmente no uses will dentro de la cláusula con if."
      },
      {
        title: "Passive Voice",
        goal: "Poner el foco en la acción o su resultado.",
        structure: "objeto + to be en el tiempo correcto + participio",
        uses: ["Cuando el agente es desconocido", "Procesos y noticias", "Registro formal"],
        examples: [
          { en: "The bridge was built in 1998.", es: "El puente fue construido en 1998." },
          { en: "The results will be published tomorrow.", es: "Los resultados se publicarán mañana." }
        ],
        mistake: "El tiempo verbal está en to be; el participio no cambia."
      },
      {
        title: "Reported Speech",
        goal: "Contar lo que alguien dijo sin repetir sus palabras exactas.",
        structure: "said (that) + backshift · told + persona + backshift",
        uses: ["Transmitir afirmaciones", "Preguntas indirectas", "Órdenes y peticiones"],
        examples: [
          { en: "'I am busy.' → She said she was busy.", es: "Dijo que estaba ocupada." },
          { en: "'Call me.' → He told me to call him.", es: "Me dijo que lo llamara." }
        ],
        mistake: "Tell necesita persona: she told me; say no la lleva directamente."
      },
      {
        title: "Relative Clauses",
        goal: "Unir información y evitar frases repetitivas.",
        structure: "persona + who · cosa + which · posesión + whose · lugar + where",
        uses: ["Definir exactamente", "Añadir información extra entre comas"],
        examples: [
          { en: "The woman who called is my manager.", es: "La mujer que llamó es mi jefa." },
          { en: "Lisbon, which is beautiful, is near the coast.", es: "Lisboa, que es preciosa, está cerca de la costa." }
        ],
        mistake: "En una non-defining clause no uses that."
      },
      {
        title: "Gerundio e infinitivo",
        goal: "Elegir la forma que exige cada verbo.",
        structure: "enjoy/avoid + -ing · want/decide + to-infinitive",
        uses: ["Preferencias y actividades", "Planes y decisiones", "Cambios de significado"],
        examples: [
          { en: "I enjoy learning languages.", es: "Disfruto aprendiendo idiomas." },
          { en: "We decided to wait.", es: "Decidimos esperar." }
        ],
        mistake: "Stop doing es dejar de hacerlo; stop to do es parar para hacerlo."
      },
      {
        title: "Modales de deducción",
        goal: "Expresar grados de certeza sobre una situación.",
        structure: "must/might/could/can't + infinitivo · + have + participio para pasado",
        uses: ["Must: casi seguro", "Might/could: posible", "Can't: imposible"],
        examples: [
          { en: "She must be at work.", es: "Debe de estar en el trabajo." },
          { en: "They might have missed the train.", es: "Puede que perdieran el tren." }
        ],
        mistake: "Mustn't significa prohibición; can't expresa deducción negativa."
      }
    ],
    extraExercises: [
      { topic: "Present Perfect", question: "Completa: '___ you ever ___ (try) surfing?'", answer: "Have you ever tried", hint: "Experiencia vital sin fecha concreta." },
      { topic: "Past Continuous", question: "Completa: 'While I ___ (cook), the lights went out.'", answer: "was cooking", hint: "Acción en progreso interrumpida." },
      { topic: "Relative Clauses", question: "Completa: 'That's the café ___ we first met.'", answer: "where", hint: "El antecedente es un lugar." },
      { topic: "Gerundio e infinitivo", question: "Completa: 'He promised ___ (help) us.'", answer: "to help", hint: "Promise va seguido de to-infinitive." },
      { topic: "Deducción", question: "Completa: 'He isn't answering. He ___ be asleep.'", answer: "might", answers: ["could", "may"], hint: "Expresa una posibilidad, no una certeza." }
    ]
  },
  C1: {
    lessons: [
      {
        title: "Inversión negativa",
        goal: "Dar énfasis con un registro formal o literario.",
        structure: "expresión negativa + auxiliar + sujeto + verbo",
        uses: ["Never, rarely, seldom", "Not only", "No sooner, hardly, scarcely"],
        examples: [
          { en: "Rarely have we faced such uncertainty.", es: "Rara vez hemos afrontado tanta incertidumbre." },
          { en: "Not only did she apologise, but she offered a refund.", es: "No solo se disculpó, sino que ofreció un reembolso." }
        ],
        mistake: "Si no hay auxiliar, añade do/does/did."
      },
      {
        title: "Cleft sentences",
        goal: "Dirigir la atención hacia la información importante.",
        structure: "It is/was X that... · What + clause + be...",
        uses: ["Contrastar una persona, momento o causa", "Presentar la idea clave"],
        examples: [
          { en: "It was Maya who identified the flaw.", es: "Fue Maya quien identificó el fallo." },
          { en: "What we need is a clear deadline.", es: "Lo que necesitamos es una fecha clara." }
        ],
        mistake: "Usarlas constantemente resta naturalidad; reserva la estructura para énfasis real."
      },
      {
        title: "Participle clauses",
        goal: "Condensar información y evitar repeticiones de sujeto.",
        structure: "-ing / past participle / having + participle",
        uses: ["Acciones simultáneas", "Causa o condición", "Acción anterior"],
        examples: [
          { en: "Having reviewed the data, we changed the plan.", es: "Tras revisar los datos, cambiamos el plan." },
          { en: "Built in 1880, the house needs repairs.", es: "Construida en 1880, la casa necesita reparaciones." }
        ],
        mistake: "El sujeto implícito debe ser el mismo: Walking home, the rain started ✗"
      },
      {
        title: "Mixed conditionals",
        goal: "Relacionar una causa pasada con un resultado presente o viceversa.",
        structure: "if + past perfect, would + infinitivo · if + past, would have + participio",
        uses: ["Arrepentimiento con consecuencia actual", "Estado permanente que afectó al pasado"],
        examples: [
          { en: "If I had accepted, I would live in Berlin now.", es: "Si hubiera aceptado, ahora viviría en Berlín." },
          { en: "If she were more organised, she wouldn't have missed it.", es: "Si fuera más organizada, no se lo habría perdido." }
        ],
        mistake: "Decide primero cuándo ocurre la causa y cuándo el resultado."
      },
      {
        title: "Subjuntivo formal",
        goal: "Formular recomendaciones y exigencias en registro formal.",
        structure: "recommend/insist/essential + that + sujeto + forma base",
        uses: ["Recomendaciones", "Exigencias", "Expresiones de necesidad"],
        examples: [
          { en: "They insisted that he resign.", es: "Insistieron en que dimitiera." },
          { en: "It is vital that every member be informed.", es: "Es vital que todos estén informados." }
        ],
        mistake: "La forma base no cambia con he/she/it: that she attend."
      },
      {
        title: "Hedging académico",
        goal: "Matizar afirmaciones y evitar generalizaciones excesivas.",
        structure: "may/might · tends to · appears to · arguably · to some extent",
        uses: ["Mostrar cautela", "Reconocer límites", "Separar evidencia de interpretación"],
        examples: [
          { en: "The findings may indicate a broader trend.", es: "Los resultados pueden indicar una tendencia más amplia." },
          { en: "This approach appears to be more effective.", es: "Este enfoque parece ser más eficaz." }
        ],
        mistake: "Matizar no significa ser impreciso; acompaña el hedge con evidencia."
      },
      {
        title: "Nominalización",
        goal: "Crear un estilo formal convirtiendo acciones en conceptos.",
        structure: "verb/adjective → noun phrase",
        uses: ["Textos académicos", "Foco en procesos o resultados", "Cohesión"],
        examples: [
          { en: "They analysed the data. → Their analysis of the data...", es: "Analizaron → Su análisis..." },
          { en: "The system failed. → The system's failure...", es: "El sistema falló → El fallo del sistema..." }
        ],
        mistake: "Demasiadas nominalizaciones vuelven el texto pesado; combínalas con verbos claros."
      },
      {
        title: "Concesión y contraste avanzado",
        goal: "Construir argumentos equilibrados y sofisticados.",
        structure: "much as · whereas · notwithstanding · albeit + adjective/phrase",
        uses: ["Conceder un punto", "Contrastar perspectivas", "Limitar una afirmación"],
        examples: [
          { en: "Much as I value speed, accuracy comes first.", es: "Por mucho que valore la rapidez, la precisión es prioritaria." },
          { en: "The plan was effective, albeit expensive.", es: "El plan fue eficaz, aunque caro." }
        ],
        mistake: "Albeit no introduce normalmente una oración completa con sujeto y verbo."
      }
    ],
    extraExercises: [
      { topic: "Inversión", question: "Completa: 'Hardly ___ we arrived when the meeting began.'", answer: "had", hint: "Hardly + Past Perfect + when." },
      { topic: "Cleft sentences", question: "Reescribe con What: 'I need a reliable partner.'", answer: "What I need is a reliable partner", hint: "What + cláusula + be + foco." },
      { topic: "Participle clauses", question: "Completa: '___ (warn) about the delay, we left early.'", answer: "Having been warned", hint: "Acción pasiva anterior a la principal." },
      { topic: "Hedging", question: "Haz más cauta la frase con may: 'The policy causes inequality.'", answer: "The policy may cause inequality", hint: "May + infinitivo reduce la certeza." },
      { topic: "Concesión", question: "Completa: '___ as the task was, they completed it.'", answer: "Difficult", hint: "Adjetivo + as + sujeto + verbo." }
    ]
  }
};

const addedLevelCurriculum = {
  A2: {
    lessons: [
      {
        title: "Simple Past y formas verbales",
        goal: "Contar acciones terminadas usando correctamente verbos regulares e irregulares.",
        structure: "regular: verbo + -ed · irregular: segunda columna · did/didn't + infinitivo",
        uses: ["Experiencias con fecha terminada", "Biografías", "Secuencias de una historia"],
        examples: [
          { en: "We stayed at home and watched a film.", es: "Nos quedamos en casa y vimos una película." },
          { en: "She went to London but didn't visit the museum.", es: "Fue a Londres, pero no visitó el museo." }
        ],
        mistake: "Después de did o didn't usa la forma base: didn't went ✗ → didn't go ✓"
      },
      {
        title: "Past Continuous",
        goal: "Describir qué estaba ocurriendo en un momento del pasado.",
        structure: "was/were + verbo-ing · while + acción larga · when + acción breve",
        uses: ["Contexto narrativo", "Acción en progreso", "Dos acciones simultáneas"],
        examples: [
          { en: "I was reading when the lights went out.", es: "Estaba leyendo cuando se apagaron las luces." },
          { en: "While we were walking, it started to rain.", es: "Mientras caminábamos, empezó a llover." }
        ],
        mistake: "La acción breve que interrumpe suele ir en Simple Past."
      },
      {
        title: "Present Perfect: introducción",
        goal: "Conectar experiencias y resultados pasados con el presente.",
        structure: "have/has + participio · haven't/hasn't + participio",
        uses: ["Experiencias sin fecha", "Resultados visibles", "Already, yet, just, ever y never"],
        examples: [
          { en: "I have just finished lunch.", es: "Acabo de terminar de comer." },
          { en: "Have you ever flown in a helicopter?", es: "¿Has volado alguna vez en helicóptero?" }
        ],
        mistake: "No lo combines con yesterday o last year; esos marcadores piden Simple Past."
      },
      {
        title: "Simple Future y going to",
        goal: "Distinguir decisiones espontáneas, predicciones y planes.",
        structure: "will + infinitivo · am/is/are going to + infinitivo",
        uses: ["Will: decisión, promesa o predicción", "Going to: plan decidido o evidencia"],
        examples: [
          { en: "I'll carry that bag for you.", es: "Te llevaré esa bolsa." },
          { en: "Look at those clouds. It's going to rain.", es: "Mira esas nubes. Va a llover." }
        ],
        mistake: "No añadas to después de will: will to call ✗ → will call ✓"
      },
      {
        title: "First Conditional y tiempo futuro",
        goal: "Expresar consecuencias posibles y condiciones reales.",
        structure: "if/when + Present Simple, will + infinitivo",
        uses: ["Planes sujetos a una condición", "Advertencias", "Promesas"],
        examples: [
          { en: "If I finish early, I will call you.", es: "Si termino pronto, te llamaré." },
          { en: "When she arrives, we will eat.", es: "Cuando llegue, comeremos." }
        ],
        mistake: "No uses will normalmente después de if o when."
      },
      {
        title: "Modales cotidianos",
        goal: "Dar consejos y expresar obligación, posibilidad y permiso.",
        structure: "should/must/might/can + infinitivo · have to + infinitivo",
        uses: ["Should: consejo", "Must/have to: obligación", "Might: posibilidad"],
        examples: [
          { en: "You should get more sleep.", es: "Deberías dormir más." },
          { en: "We might be late.", es: "Puede que lleguemos tarde." }
        ],
        mistake: "Los modales no llevan -s con he/she/it ni to antes del infinitivo."
      },
      {
        title: "Relative clauses básicas",
        goal: "Añadir información sobre personas, cosas y lugares.",
        structure: "person + who · thing + which/that · place + where",
        uses: ["Definir una persona u objeto", "Unir dos frases relacionadas"],
        examples: [
          { en: "The woman who lives next door is a doctor.", es: "La mujer que vive al lado es médica." },
          { en: "This is the café where we met.", es: "Esta es la cafetería donde nos conocimos." }
        ],
        mistake: "Who se refiere a personas; where se refiere a lugares."
      },
      {
        title: "Gerundio e infinitivo básico",
        goal: "Reconocer qué forma aparece después de verbos frecuentes.",
        structure: "enjoy/like + -ing · want/need/decide + to + infinitivo",
        uses: ["Gustos", "Planes", "Necesidades y decisiones"],
        examples: [
          { en: "I enjoy cooking for my friends.", es: "Disfruto cocinando para mis amigos." },
          { en: "They decided to take the bus.", es: "Decidieron tomar el autobús." }
        ],
        mistake: "Aprende cada verbo con su patrón: enjoy to cook ✗ → enjoy cooking ✓"
      }
    ],
    exercises: [
      { topic: "Simple Past", question: "Completa: 'We ___ (stay) in a small hotel last summer.'", answer: "stayed", hint: "Stay es regular: vocal + y mantiene la y." },
      { topic: "Simple Past", question: "Completa: 'He ___ (buy) a new laptop yesterday.'", answer: "bought", hint: "Buy–bought–bought." },
      { topic: "Simple Past", question: "Forma la negativa: 'She saw the message.'", answer: "She didn't see the message", answers: ["She did not see the message"], hint: "Didn't + infinitivo." },
      { topic: "Past Continuous", question: "Completa: 'At eight, I ___ (drive) home.'", answer: "was driving", hint: "I + was + verbo-ing." },
      { topic: "Past Continuous", question: "Completa: 'While they ___ (play), it started to rain.'", answer: "were playing", hint: "Acción larga en progreso." },
      { topic: "Contraste de pasado", question: "Completa: 'I ___ (sleep) when you called.'", answer: "was sleeping", hint: "La llamada interrumpe una acción en progreso." },
      { topic: "Present Perfect", question: "Completa: 'I ___ just ___ (finish).'", answer: "have just finished", hint: "Have + just + participio." },
      { topic: "Present Perfect", question: "Completa: '___ she ever ___ (see) snow?'", answer: "Has she ever seen", hint: "Pregunta de experiencia sin fecha." },
      { topic: "Present Perfect", question: "Completa: 'They haven't arrived ___.'", answer: "yet", hint: "Yet suele aparecer al final de negativas y preguntas." },
      { topic: "Futuro", question: "Decisión instantánea: 'The phone is ringing. I ___ answer it.'", answer: "will", answers: ["'ll"], hint: "Will para una decisión tomada ahora." },
      { topic: "Futuro", question: "Plan: 'We ___ visit Prague in May.'", answer: "are going to", hint: "Going to expresa un plan decidido." },
      { topic: "First Conditional", question: "Completa: 'If it rains, we ___ (stay) home.'", answer: "will stay", hint: "If + presente, will + infinitivo." },
      { topic: "First Conditional", question: "Completa: 'When he ___ (arrive), I will tell him.'", answer: "arrives", hint: "Después de when usamos Present Simple para futuro." },
      { topic: "Modales", question: "Consejo: 'You ___ drink more water.'", answer: "should", hint: "Should expresa una recomendación." },
      { topic: "Modales", question: "Posibilidad: 'It ___ snow tonight.'", answer: "might", answers: ["may", "could"], hint: "No es seguro; expresa posibilidad." },
      { topic: "Relative clauses", question: "Completa: 'The man ___ called is my uncle.'", answer: "who", answers: ["that"], hint: "El antecedente es una persona." },
      { topic: "Relative clauses", question: "Completa: 'That's the shop ___ I bought it.'", answer: "where", hint: "El antecedente es un lugar." },
      { topic: "Gerundio", question: "Completa: 'She enjoys ___ (dance).'", answer: "dancing", hint: "Enjoy + verbo-ing." },
      { topic: "Infinitivo", question: "Completa: 'We decided ___ (leave) early.'", answer: "to leave", hint: "Decide + to-infinitive." },
      { topic: "Irregular verbs", question: "Completa las formas: go – ___ – ___", answer: "went – gone", answers: ["went - gone", "went gone"], hint: "Aprende las tres columnas juntas." }
    ]
  },
  B2: {
    lessons: [
      {
        title: "Past Perfect Continuous",
        goal: "Explicar duración o causa antes de otro momento pasado.",
        structure: "had been + verbo-ing",
        uses: ["Duración anterior", "Causa de un resultado pasado", "Contexto narrativo"],
        examples: [
          { en: "They had been travelling for hours when the car broke down.", es: "Llevaban horas viajando cuando el coche se averió." },
          { en: "Her eyes were tired because she had been reading.", es: "Tenía los ojos cansados porque había estado leyendo." }
        ],
        mistake: "Past Perfect destaca resultado; Past Perfect Continuous destaca actividad o duración."
      },
      {
        title: "Future Perfect",
        goal: "Situar una acción completada antes de un punto futuro.",
        structure: "will have + participio",
        uses: ["Objetivos con fecha límite", "Predicciones sobre logros", "By + momento futuro"],
        examples: [
          { en: "By December, we will have completed the project.", es: "Para diciembre habremos terminado el proyecto." },
          { en: "Will you have finished by six?", es: "¿Habrás terminado para las seis?" }
        ],
        mistake: "By marca el límite; until indica continuidad hasta ese punto."
      },
      {
        title: "Narrative tenses",
        goal: "Combinar pasado simple, continuo y perfecto en relatos claros.",
        structure: "background: Past Continuous · events: Simple Past · earlier event: Past Perfect",
        uses: ["Relatos", "Anécdotas", "Explicación del orden temporal"],
        examples: [
          { en: "It was snowing when we realised we had taken the wrong road.", es: "Nevaba cuando nos dimos cuenta de que habíamos tomado la carretera equivocada." },
          { en: "She opened the box that her aunt had sent.", es: "Abrió la caja que su tía había enviado." }
        ],
        mistake: "No uses Past Perfect si el orden ya es evidente y no necesitas retroceder."
      },
      {
        title: "Third y Mixed Conditionals",
        goal: "Hablar de pasados irreales y sus consecuencias.",
        structure: "if + had + participio, would have + participio · mixed: resultado presente",
        uses: ["Arrepentimientos", "Crítica", "Consecuencia actual de una decisión pasada"],
        examples: [
          { en: "If we had left earlier, we would have caught the train.", es: "Si hubiéramos salido antes, habríamos cogido el tren." },
          { en: "If I had accepted the job, I would live in Berlin now.", es: "Si hubiera aceptado, ahora viviría en Berlín." }
        ],
        mistake: "No uses would dentro de la cláusula con if."
      },
      {
        title: "Passive Voice avanzada",
        goal: "Construir pasivas con modales, perfectos y estructuras impersonales.",
        structure: "modal + be + participio · have been + participio · it is said that...",
        uses: ["Registro formal", "Noticias", "Cuando el agente no importa"],
        examples: [
          { en: "The issue should have been resolved.", es: "El problema debería haberse resuelto." },
          { en: "It is believed that the painting is authentic.", es: "Se cree que el cuadro es auténtico." }
        ],
        mistake: "Mantén el tiempo en el auxiliar; el participio permanece estable."
      },
      {
        title: "Reported Speech avanzado",
        goal: "Transmitir preguntas, órdenes y afirmaciones con perspectiva temporal.",
        structure: "asked + if/wh-clause · told + object + to-infinitive · backshift",
        uses: ["Entrevistas", "Relatos", "Reformular instrucciones"],
        examples: [
          { en: "'Where have you been?' → She asked where I had been.", es: "Preguntó dónde había estado." },
          { en: "'Don't touch it.' → He told us not to touch it.", es: "Nos dijo que no lo tocáramos." }
        ],
        mistake: "Una pregunta indirecta conserva orden afirmativo: she asked where I was."
      },
      {
        title: "Participle clauses",
        goal: "Reducir cláusulas cuando comparten sujeto.",
        structure: "verb-ing · past participle · having + participle",
        uses: ["Acciones simultáneas", "Causa", "Acción anterior"],
        examples: [
          { en: "Having finished the report, she went home.", es: "Tras terminar el informe, se fue a casa." },
          { en: "Designed in Italy, the chair is made locally.", es: "Diseñada en Italia, la silla se fabrica localmente." }
        ],
        mistake: "El sujeto implícito debe coincidir con el de la oración principal."
      },
      {
        title: "Modales sobre el pasado",
        goal: "Deducir, criticar o imaginar alternativas pasadas.",
        structure: "must/might/can't/should + have + participio",
        uses: ["Deducción", "Posibilidad no confirmada", "Crítica o consejo retrospectivo"],
        examples: [
          { en: "She must have forgotten the meeting.", es: "Debe de haberse olvidado de la reunión." },
          { en: "You should have told me earlier.", es: "Deberías habérmelo dicho antes." }
        ],
        mistake: "Must have expresa deducción; had to expresa obligación pasada."
      }
    ],
    exercises: [
      { topic: "Past Perfect Continuous", question: "Completa: 'They ___ (wait) for an hour when the bus came.'", answer: "had been waiting", hint: "Duración anterior a otra acción pasada." },
      { topic: "Past Perfect Continuous", question: "Completa: 'He was wet because he ___ (run).'", answer: "had been running", hint: "Actividad anterior que explica el resultado." },
      { topic: "Future Perfect", question: "Completa: 'By June, I ___ (finish) the course.'", answer: "will have finished", hint: "Will have + participio." },
      { topic: "Future Perfect", question: "Forma la pregunta: 'You will have arrived by noon.'", answer: "Will you have arrived by noon", hint: "Will va delante del sujeto." },
      { topic: "Narrative tenses", question: "Completa: 'It ___ (rain) when we left.'", answer: "was raining", hint: "Acción de fondo." },
      { topic: "Narrative tenses", question: "Completa: 'I realised I ___ (lose) my keys.'", answer: "had lost", hint: "Perder ocurrió antes de darse cuenta." },
      { topic: "Narrative tenses", question: "Completa: 'She ___ (open) the door and walked in.'", answer: "opened", hint: "Secuencia principal de eventos." },
      { topic: "Third Conditional", question: "Completa: 'If I had known, I ___ (help) you.'", answer: "would have helped", hint: "Resultado pasado irreal." },
      { topic: "Third Conditional", question: "Completa: 'If they ___ earlier, they would have won.'", answer: "had started", hint: "If + Past Perfect." },
      { topic: "Mixed Conditional", question: "Completa: 'If she had accepted, she ___ here now.'", answer: "would work", answers: ["would be working"], hint: "Causa pasada y resultado presente." },
      { topic: "Passive Voice", question: "Pasa a pasiva: 'They should have repaired it.'", answer: "It should have been repaired", hint: "Should have been + participio." },
      { topic: "Passive Voice", question: "Completa: 'The results ___ (announce) tomorrow.'", answer: "will be announced", hint: "Pasiva futura: will be + participio." },
      { topic: "Reported Speech", question: "Transforma: 'Where are you?' → She asked me...", answer: "She asked me where I was", hint: "Orden afirmativo y backshift." },
      { topic: "Reported Speech", question: "Transforma: 'Don't wait.' → He told us...", answer: "He told us not to wait", hint: "Tell + objeto + not to." },
      { topic: "Participle clauses", question: "Reduce: 'After she had finished, she left.'", answer: "Having finished, she left", hint: "Having + participio expresa anterioridad." },
      { topic: "Participle clauses", question: "Completa: '___ (build) in 1920, the house needs repairs.'", answer: "Built", hint: "Participio pasivo." },
      { topic: "Modales pasados", question: "Deducción: 'The lights are off. They ___ (leave).'", answer: "must have left", hint: "Conclusión casi segura sobre el pasado." },
      { topic: "Modales pasados", question: "Crítica: 'You ___ (call) me.'", answer: "should have called", hint: "Acción recomendable que no ocurrió." },
      { topic: "Modales pasados", question: "Imposibilidad: 'She ___ (see) us; she was abroad.'", answer: "can't have seen", answers: ["cannot have seen"], hint: "Can't have + participio." },
      { topic: "Contraste perfecto", question: "Elige duración: 'Before lunch, I ___ for three hours.'", answer: "had been working", hint: "La duración pide una forma perfect continuous." }
    ]
  },
  C2: {
    lessons: [
      {
        title: "Tense and aspect shifts",
        goal: "Manipular tiempo y aspecto para cambiar foco, distancia y perspectiva.",
        structure: "simple ↔ progressive ↔ perfect según evento, proceso o resultado",
        uses: ["Reencuadrar una afirmación", "Contrastar estado y actividad", "Gestionar perspectiva temporal"],
        examples: [
          { en: "I've considered your proposal. / I've been considering your proposal.", es: "He considerado la propuesta. / Llevo un tiempo considerándola." },
          { en: "She was hoping you might help.", es: "Esperaba que quizá pudieras ayudar." }
        ],
        mistake: "La corrección gramatical no basta: el aspecto debe reflejar el foco comunicativo."
      },
      {
        title: "Narrative viewpoint",
        goal: "Cambiar la distancia narrativa mediante tiempos y aspecto.",
        structure: "past narrative · historical present · free indirect style",
        uses: ["Dar inmediatez", "Señalar un giro", "Representar la perspectiva de un personaje"],
        examples: [
          { en: "So I open the door, and there he is.", es: "Entonces abro la puerta y ahí está." },
          { en: "She had trusted him. How could she have been so naive?", es: "Había confiado en él. ¿Cómo podía haber sido tan ingenua?" }
        ],
        mistake: "Un cambio temporal debe tener una función clara y mantenerse coherente."
      },
      {
        title: "Modal remoteness",
        goal: "Usar pasado y modales para expresar cortesía, irrealidad o distancia.",
        structure: "past form ≠ past time · would/could/might · were to",
        uses: ["Propuestas tentativas", "Hipótesis remotas", "Diplomacia"],
        examples: [
          { en: "I wondered whether you might reconsider.", es: "Me preguntaba si podría reconsiderarlo." },
          { en: "Were the policy to fail, the consequences would be severe.", es: "Si la política fracasara, las consecuencias serían graves." }
        ],
        mistake: "La forma pasada puede marcar distancia social o modal, no tiempo pasado."
      },
      {
        title: "Inversion and fronting",
        goal: "Controlar énfasis y ritmo con inversión y elementos iniciales.",
        structure: "negative adverbial + auxiliary + subject · fronted complement",
        uses: ["Énfasis formal", "Contraste", "Cohesión textual"],
        examples: [
          { en: "Only later did the implications become clear.", es: "Solo después quedaron claras las implicaciones." },
          { en: "Equally significant was the decline in trust.", es: "Igualmente significativa fue la caída de la confianza." }
        ],
        mistake: "La inversión exige auxiliar; si no existe, añade do/does/did."
      },
      {
        title: "Ellipsis and substitution",
        goal: "Evitar repetición manteniendo precisión y naturalidad.",
        structure: "do so · so/not · one/ones · auxiliary ellipsis",
        uses: ["Respuestas compactas", "Comparación", "Prosa cohesionada"],
        examples: [
          { en: "Some supported the plan; others did not.", es: "Algunos apoyaron el plan; otros no." },
          { en: "The first proposal was stronger than the revised one.", es: "La primera propuesta era más sólida que la revisada." }
        ],
        mistake: "La elipsis solo funciona si el elemento omitido se recupera sin ambigüedad."
      },
      {
        title: "Information structure",
        goal: "Organizar información conocida y nueva para guiar al lector.",
        structure: "theme → rheme · end-focus · cleft/pseudo-cleft",
        uses: ["Introducir contraste", "Destacar el dato nuevo", "Conectar párrafos"],
        examples: [
          { en: "What the study fails to address is long-term cost.", es: "Lo que el estudio no aborda es el coste a largo plazo." },
          { en: "Of greater concern is the lack of oversight.", es: "Más preocupante es la falta de supervisión." }
        ],
        mistake: "El énfasis sintáctico debe coincidir con la información realmente importante."
      },
      {
        title: "Register and idiomatic grammar",
        goal: "Elegir estructuras según género, relación y propósito.",
        structure: "formal nominalisation ↔ neutral clause ↔ conversational chunk",
        uses: ["Académico", "Profesional", "Conversación natural"],
        examples: [
          { en: "Implementation remains contingent upon approval.", es: "La aplicación sigue supeditada a la aprobación." },
          { en: "It all comes down to whether they approve it.", es: "Todo depende de si lo aprueban." }
        ],
        mistake: "Una estructura sofisticada en el registro equivocado puede sonar menos competente."
      },
      {
        title: "Nuance, ambiguity and editing",
        goal: "Detectar ambigüedad estructural y editar con intención.",
        structure: "scope · attachment · reference · parallelism",
        uses: ["Edición avanzada", "Argumentación", "Evitar dobles lecturas"],
        examples: [
          { en: "Only Maya said she would resign.", es: "Solo Maya lo dijo; otras personas no lo dijeron." },
          { en: "Maya said she would only resign.", es: "Maya dijo que únicamente dimitiría, no haría otra cosa." }
        ],
        mistake: "La posición de only, even o almost cambia el alcance y, con él, el significado."
      }
    ],
    exercises: [
      { topic: "Aspecto", question: "Elige duración aún relevante: 'I ___ your proposal all morning.'", answer: "have been reviewing", hint: "La actividad y su duración son el foco." },
      { topic: "Aspecto", question: "Elige resultado: 'I ___ your proposal and accept the terms.'", answer: "have reviewed", hint: "La revisión está completada." },
      { topic: "Aspecto", question: "Expresa cortesía: 'I ___ (hope) you could clarify this point.'", answer: "was hoping", hint: "Past Continuous crea distancia cortés." },
      { topic: "Narrativa", question: "Completa con presente histórico: 'So he ___ (turn) around and sees the door.'", answer: "turns", hint: "El presente histórico aporta inmediatez." },
      { topic: "Narrativa", question: "Completa: 'She ___ (trust) him for years. How could he betray her?'", answer: "had trusted", hint: "La confianza precede al punto narrativo." },
      { topic: "Modal remoteness", question: "Completa formalmente: '___ the plan to fail, we would reconsider.'", answer: "Were", hint: "Were + sujeto + to-infinitive." },
      { topic: "Modal remoteness", question: "Haz más diplomático: 'Will you reconsider?'", answer: "I wondered whether you might reconsider", hint: "Pasado + might crea distancia." },
      { topic: "Inversión", question: "Completa: 'Only later ___ we understand the risk.'", answer: "did", hint: "Only later activa inversión." },
      { topic: "Inversión", question: "Completa: 'Under no circumstances ___ this data be shared.'", answer: "should", answers: ["must", "can"], hint: "Expresión negativa inicial + auxiliar." },
      { topic: "Fronting", question: "Completa: 'Equally important ___ the social consequences.'", answer: "are", hint: "Complemento inicial seguido del verbo y sujeto." },
      { topic: "Ellipsis", question: "Evita repetición: 'Ana approved it, but Leo did not approve it.'", answer: "Ana approved it, but Leo did not", hint: "El auxiliar conserva el significado omitido." },
      { topic: "Substitution", question: "Completa: 'I prefer the original proposal to the revised ___.'", answer: "one", hint: "One sustituye a un nombre contable singular." },
      { topic: "Information structure", question: "Reescribe con What: 'We need greater transparency.'", answer: "What we need is greater transparency", hint: "Pseudo-cleft: What + clause + be + focus." },
      { topic: "Information structure", question: "Completa: 'Of particular concern ___ the missing records.'", answer: "are", hint: "El sujeto real es plural y aparece después." },
      { topic: "Registro", question: "Versión formal de 'It depends on approval':", answer: "It is contingent upon approval", answers: ["It is contingent on approval"], hint: "Contingent upon/on es una colocación formal." },
      { topic: "Registro", question: "Versión conversacional de 'The outcome is contingent upon funding':", answer: "It all comes down to funding", answers: ["It depends on funding"], hint: "Usa un chunk conversacional natural." },
      { topic: "Alcance", question: "Coloca only para indicar que únicamente Maya habló: 'Maya said she would resign.'", answer: "Only Maya said she would resign", hint: "Only modifica el elemento inmediatamente posterior." },
      { topic: "Alcance", question: "Coloca only para indicar que dimitir era lo único que haría:", answer: "Maya said she would only resign", hint: "Only modifica resign." },
      { topic: "Paralelismo", question: "Corrige: 'The role requires planning, to negotiate and clear writing.'", answer: "The role requires planning, negotiating and writing clearly", answers: ["The role requires planning, negotiation and clear writing"], hint: "Coordina elementos con la misma forma gramatical." },
      { topic: "Edición", question: "Elimina ambigüedad: 'She saw the manager with the telescope' (ella usó el telescopio).", answer: "Using the telescope, she saw the manager", hint: "Explicita quién utiliza el instrumento." }
    ]
  }
};

const a0Level = {
  level: "A0",
  color: "#EEF2FF",
  textColor: "#4338CA",
  exercises: grammarExpansion.A0.exercises,
  lessons: grammarExpansion.A0.lessons
};

const originalGrammarLevels = Object.fromEntries(data.grammar.levels.map(level => [level.level, level]));
const createAddedLevel = (level, color, textColor) => ({
  level,
  color,
  textColor,
  lessons: addedLevelCurriculum[level].lessons,
  exercises: [...addedLevelCurriculum[level].exercises]
});

data.grammar.levels = [
  a0Level,
  originalGrammarLevels.A1,
  createAddedLevel("A2", "#ECFDF5", "#047857"),
  originalGrammarLevels.B1,
  createAddedLevel("B2", "#EDE9FE", "#6D28D9"),
  originalGrammarLevels.C1,
  createAddedLevel("C2", "#FDF2F8", "#BE185D")
];
data.grammar.levels.forEach(level => {
  const expansion = grammarExpansion[level.level];
  if (!expansion) return;
  level.lessons = expansion.lessons;
  if (expansion.extraExercises?.length) {
    level.exercises.push(...expansion.extraExercises);
  }
});
data.grammar.count = `${data.grammar.levels.reduce((sum, level) => sum + level.exercises.length, 0)} ejercicios + 32 fichas`;
data.grammar.description = "Curso desde A0 con estructuras, ejemplos, errores frecuentes, práctica y solucionarios";

// ============================================================
//  GUÍA DE LOS 12 TIEMPOS VERBALES
//  Incluye las cuatro formas de presente, pasado y futuro.
// ============================================================

data.grammar.tenseGuide = [
  {
    group: "Present Tenses",
    description: "Acciones habituales, en progreso, conectadas con el presente o que llevan un tiempo ocurriendo.",
    tenses: [
      {
        title: "Simple Present Tense",
        also: "Present Simple",
        level: "A1",
        affirmative: "subject + base verb (+ s/es con he, she, it)",
        negative: "subject + do/does not + base verb",
        question: "Do/Does + subject + base verb?",
        use: "Rutinas, hábitos, hechos generales, estados y horarios.",
        markers: "always · usually · often · every day · never",
        examples: [
          { en: "She studies English every day.", es: "Ella estudia inglés todos los días." },
          { en: "Does he work on Saturdays?", es: "¿Trabaja él los sábados?" }
        ]
      },
      {
        title: "Present Continuous Tense",
        also: "Present Progressive",
        level: "A1",
        affirmative: "subject + am/is/are + verb-ing",
        negative: "subject + am/is/are not + verb-ing",
        question: "Am/Is/Are + subject + verb-ing?",
        use: "Acciones que ocurren ahora, situaciones temporales y planes acordados.",
        markers: "now · right now · at the moment · today",
        examples: [
          { en: "They are studying right now.", es: "Están estudiando ahora mismo." },
          { en: "I am not working this week.", es: "No estoy trabajando esta semana." }
        ]
      },
      {
        title: "Present Perfect Tense",
        also: "Present Perfect Simple",
        level: "A2",
        affirmative: "subject + have/has + past participle",
        negative: "subject + have/has not + past participle",
        question: "Have/Has + subject + past participle?",
        use: "Experiencias sin fecha concreta, resultados presentes y periodos no terminados.",
        markers: "ever · never · already · yet · just · since · for",
        examples: [
          { en: "I have already finished the report.", es: "Ya he terminado el informe." },
          { en: "Has she ever visited Ireland?", es: "¿Ha visitado alguna vez Irlanda?" }
        ]
      },
      {
        title: "Present Perfect Continuous Tense",
        also: "Present Perfect Progressive",
        level: "B1",
        affirmative: "subject + have/has been + verb-ing",
        negative: "subject + have/has not been + verb-ing",
        question: "Have/Has + subject + been + verb-ing?",
        use: "Actividad iniciada antes que continúa ahora o cuyo efecto reciente es visible; destaca la duración.",
        markers: "since · for · all day · lately · how long",
        examples: [
          { en: "We have been waiting for forty minutes.", es: "Llevamos cuarenta minutos esperando." },
          { en: "Why has he been running?", es: "¿Por qué ha estado corriendo?" }
        ]
      }
    ]
  },
  {
    group: "Past Tenses",
    description: "Acciones terminadas, en desarrollo o anteriores a otro punto del pasado.",
    tenses: [
      {
        title: "Simple Past Tense",
        also: "Past Simple",
        level: "A2",
        affirmative: "subject + verb-ed / irregular past form",
        negative: "subject + did not + base verb",
        question: "Did + subject + base verb?",
        use: "Acciones terminadas en un momento pasado y secuencias narrativas.",
        markers: "yesterday · last week · ago · in 2020",
        examples: [
          { en: "They moved here last year.", es: "Se mudaron aquí el año pasado." },
          { en: "Did you see Marta yesterday?", es: "¿Viste a Marta ayer?" }
        ]
      },
      {
        title: "Past Continuous Tense",
        also: "Past Progressive",
        level: "A2",
        affirmative: "subject + was/were + verb-ing",
        negative: "subject + was/were not + verb-ing",
        question: "Was/Were + subject + verb-ing?",
        use: "Acción en progreso en un momento pasado, contexto o acción interrumpida.",
        markers: "while · when · at 8 p.m. · all morning",
        examples: [
          { en: "I was cooking when you called.", es: "Estaba cocinando cuando llamaste." },
          { en: "Were they sleeping at midnight?", es: "¿Estaban durmiendo a medianoche?" }
        ]
      },
      {
        title: "Past Perfect Tense",
        also: "Past Perfect Simple",
        level: "B1",
        affirmative: "subject + had + past participle",
        negative: "subject + had not + past participle",
        question: "Had + subject + past participle?",
        use: "Acción completada antes de otra acción o referencia pasada.",
        markers: "before · after · already · by the time",
        examples: [
          { en: "The train had left before we arrived.", es: "El tren se había ido antes de que llegáramos." },
          { en: "Had she finished when you called?", es: "¿Había terminado cuando llamaste?" }
        ]
      },
      {
        title: "Past Perfect Continuous Tense",
        also: "Past Perfect Progressive",
        level: "B2",
        affirmative: "subject + had been + verb-ing",
        negative: "subject + had not been + verb-ing",
        question: "Had + subject + been + verb-ing?",
        use: "Actividad continua que duró hasta otro punto pasado; explica duración o causa.",
        markers: "for · since · before · until then · how long",
        examples: [
          { en: "She had been studying for hours before the exam.", es: "Llevaba horas estudiando antes del examen." },
          { en: "Had it been raining all night?", es: "¿Había estado lloviendo toda la noche?" }
        ]
      }
    ]
  },
  {
    group: "Future Tenses",
    description: "Decisiones y predicciones, acciones futuras en curso, completadas o acumuladas hasta un punto futuro.",
    tenses: [
      {
        title: "Simple Future Tense",
        also: "Future Simple",
        level: "A2",
        affirmative: "subject + will + base verb",
        negative: "subject + will not (won't) + base verb",
        question: "Will + subject + base verb?",
        use: "Decisiones espontáneas, promesas, ofrecimientos y predicciones.",
        markers: "tomorrow · next week · probably · I think",
        examples: [
          { en: "I will help you with that.", es: "Te ayudaré con eso." },
          { en: "Will they arrive on time?", es: "¿Llegarán a tiempo?" }
        ]
      },
      {
        title: "Future Continuous Tense",
        also: "Future Progressive",
        level: "B1",
        affirmative: "subject + will be + verb-ing",
        negative: "subject + will not be + verb-ing",
        question: "Will + subject + be + verb-ing?",
        use: "Acción que estará en progreso en un momento futuro o pregunta cortés sobre planes.",
        markers: "this time tomorrow · at 8 p.m. · next week",
        examples: [
          { en: "This time tomorrow, we will be flying to Rome.", es: "Mañana a esta hora estaremos volando a Roma." },
          { en: "Will you be using the car tonight?", es: "¿Vas a estar usando el coche esta noche?" }
        ]
      },
      {
        title: "Future Perfect Tense",
        also: "Future Perfect Simple",
        level: "B2",
        affirmative: "subject + will have + past participle",
        negative: "subject + will not have + past participle",
        question: "Will + subject + have + past participle?",
        use: "Acción que estará completada antes de una fecha o punto futuro.",
        markers: "by · by the time · before · by next year",
        examples: [
          { en: "By Friday, I will have finished the course.", es: "Para el viernes habré terminado el curso." },
          { en: "Will they have arrived by noon?", es: "¿Habrán llegado para el mediodía?" }
        ]
      },
      {
        title: "Future Perfect Continuous Tense",
        also: "Future Perfect Progressive",
        level: "C1",
        affirmative: "subject + will have been + verb-ing",
        negative: "subject + will not have been + verb-ing",
        question: "Will + subject + have been + verb-ing?",
        use: "Duración acumulada de una actividad hasta un punto concreto del futuro.",
        markers: "for + periodo · by + punto futuro · by then",
        examples: [
          { en: "By June, she will have been teaching here for ten years.", es: "En junio llevará diez años enseñando aquí." },
          { en: "How long will you have been living abroad?", es: "¿Cuánto tiempo llevarás viviendo en el extranjero?" }
        ]
      }
    ]
  }
];

data.grammar.verbGuide = {
  title: "Regular and Irregular Verbs",
  levels: ["A1", "A2"],
  intro: "Los verbos regulares siguen reglas de escritura y pronunciación; los irregulares cambian de forma y deben aprenderse en tres columnas: infinitivo, pasado y participio.",
  regularRules: [
    { rule: "Regla general", form: "verb + ed", examples: "work → worked · clean → cleaned" },
    { rule: "Termina en -e", form: "verb + d", examples: "live → lived · love → loved" },
    { rule: "Consonante + y", form: "y → ied", examples: "study → studied · carry → carried" },
    { rule: "Vocal + y", form: "se mantiene y + ed", examples: "play → played · enjoy → enjoyed" },
    { rule: "Consonante-vocal-consonante", form: "duplica la consonante final", examples: "stop → stopped · plan → planned" }
  ],
  pronunciation: [
    { sound: "/t/", when: "Después de sonido sordo, excepto /t/", examples: "worked · washed · watched" },
    { sound: "/d/", when: "Después de vocal o sonido sonoro, excepto /d/", examples: "played · cleaned · lived" },
    { sound: "/ɪd/", when: "Después de los sonidos /t/ o /d/", examples: "wanted · needed · started" }
  ],
  irregularPatterns: [
    { label: "Las tres formas iguales", examples: "cut–cut–cut · put–put–put · cost–cost–cost" },
    { label: "Pasado y participio iguales", examples: "build–built–built · buy–bought–bought" },
    { label: "Las tres formas diferentes", examples: "go–went–gone · write–wrote–written" }
  ],
  irregulars: [
    ["be", "was/were", "been", "ser / estar"],
    ["become", "became", "become", "convertirse"],
    ["begin", "began", "begun", "empezar"],
    ["break", "broke", "broken", "romper"],
    ["bring", "brought", "brought", "traer"],
    ["build", "built", "built", "construir"],
    ["buy", "bought", "bought", "comprar"],
    ["come", "came", "come", "venir"],
    ["do", "did", "done", "hacer"],
    ["drink", "drank", "drunk", "beber"],
    ["drive", "drove", "driven", "conducir"],
    ["eat", "ate", "eaten", "comer"],
    ["find", "found", "found", "encontrar"],
    ["get", "got", "got/gotten", "obtener"],
    ["give", "gave", "given", "dar"],
    ["go", "went", "gone", "ir"],
    ["have", "had", "had", "tener"],
    ["know", "knew", "known", "saber / conocer"],
    ["make", "made", "made", "hacer / fabricar"],
    ["read", "read", "read", "leer"],
    ["run", "ran", "run", "correr"],
    ["see", "saw", "seen", "ver"],
    ["speak", "spoke", "spoken", "hablar"],
    ["take", "took", "taken", "tomar / llevar"],
    ["think", "thought", "thought", "pensar"],
    ["write", "wrote", "written", "escribir"]
  ]
};

const tenseExerciseExpansion = {
  A1: [
    { topic: "Simple Present Tense", question: "Completa: 'My brother ___ (study) English every day.'", answer: "studies", hint: "Con he/she/it, consonante + y cambia a -ies." },
    { topic: "Present Continuous Tense", question: "Completa: 'We ___ (wait) for the bus right now.'", answer: "are waiting", hint: "Acción actual: are + verbo-ing." },
    { topic: "Regular Verbs", question: "Escribe el pasado de 'study':", answer: "studied", hint: "Consonante + y cambia a -ied." },
    { topic: "Irregular Verbs", question: "Escribe las formas de 'write': write – ___ – ___", answer: "wrote – written", answers: ["wrote - written", "wrote written"], hint: "Aprende infinitivo, pasado y participio juntos." }
  ],
  A2: [
    { topic: "Simple Past Tense", question: "Completa con un verbo regular: 'They ___ (visit) us yesterday.'", answer: "visited", hint: "Visit forma el pasado añadiendo -ed." },
    { topic: "Simple Past Tense", question: "Completa con un verbo irregular: 'She ___ (take) the train last night.'", answer: "took", hint: "Take–took–taken." },
    { topic: "Past Continuous Tense", question: "Completa: 'At nine, they ___ (drive) home.'", answer: "were driving", hint: "Acción en progreso: were + verbo-ing." },
    { topic: "Present Perfect Tense", question: "Completa: 'He ___ already ___ (finish) the task.'", answer: "has already finished", hint: "Has + already + participio." },
    { topic: "Simple Future Tense", question: "Completa la promesa: 'I ___ (call) you tomorrow.'", answer: "will call", hint: "Will + infinitivo." }
  ],
  B1: [
    { topic: "Present Perfect Continuous Tense", question: "Completa: 'I ___ (learn) English for two years.'", answer: "have been learning", hint: "Destaca una actividad que continúa y su duración." },
    { topic: "Past Perfect Tense", question: "Completa: 'The film ___ (start) before we arrived.'", answer: "had started", hint: "La película empezó antes de otro pasado." },
    { topic: "Future Continuous Tense", question: "Completa: 'This time tomorrow, I ___ (take) my exam.'", answer: "will be taking", hint: "Acción en curso en un momento futuro." }
  ],
  B2: [
    { topic: "Past Perfect Continuous Tense", question: "Completa: 'She was tired because she ___ (work) all day.'", answer: "had been working", hint: "Actividad continua anterior que explica un resultado pasado." },
    { topic: "Future Perfect Tense", question: "Completa: 'By Friday, we ___ (complete) the project.'", answer: "will have completed", hint: "Acción terminada antes de un límite futuro." }
  ],
  C1: [
    { topic: "Future Perfect Continuous Tense", question: "Completa: 'By 2030, she ___ (research) this topic for a decade.'", answer: "will have been researching", hint: "Duración acumulada hasta un punto futuro." }
  ],
  C2: [
    { topic: "Contraste de tiempos", question: "Completa: 'By the time you arrive, I ___ (wait) for three hours.'", answer: "will have been waiting", hint: "Importa la duración hasta el momento de tu llegada." }
  ]
};

data.grammar.levels.forEach(level => {
  if (tenseExerciseExpansion[level.level]) {
    level.exercises.push(...tenseExerciseExpansion[level.level]);
  }
});
data.grammar.count = `${data.grammar.levels.reduce((sum, level) => sum + level.exercises.length, 0)} ejercicios · 7 niveles`;
data.grammar.description = "Ruta A0–C2 con tiempos y verbos integrados por nivel, ejemplos, práctica y solucionarios";

// ============================================================
//  READING
//  Las preguntas abiertas incluyen una respuesta orientativa:
//  sirven para comparar ideas, no para invalidar otras lecturas razonadas.
// ============================================================

data.reading = {
  title: "Reading",
  icon: "R/",
  description: "9 lecturas graduadas con comprensión, vocabulario contextual y respuestas orientativas",
  count: "9 textos · 36 preguntas",
  levels: [
    {
      level: "A1",
      texts: [
        {
          title: "A New Routine",
          genre: "Diario personal",
          time: "2 min",
          paragraphs: [
            "My name is Eva and I live in Seville. I started a new job at a small hotel last month. I work from Monday to Friday. I usually get up at seven, have toast and fruit for breakfast, and take the bus at eight.",
            "At the hotel, I answer emails and help guests. My colleagues are friendly, but the job is sometimes busy. After work, I walk home through the park. In the evening, I study English for thirty minutes because many hotel guests speak English.",
            "On Fridays, I meet my friend Nora at a café. We talk about our week and plan something for the weekend. This new routine is tiring, but Eva feels proud because she is learning every day."
          ],
          questions: [
            { type: "choice", q: "How does Eva travel to work?", options: ["By train", "By bus", "On foot"], correct: 1, explanation: "El primer párrafo dice que toma el autobús a las ocho." },
            { type: "choice", q: "Why does she study English?", options: ["To change jobs", "To speak with hotel guests", "To travel on Fridays"], correct: 1, explanation: "Estudia porque muchos huéspedes hablan inglés." },
            { type: "open", q: "Which part of Eva's routine seems most useful for her future?", guidance: "Respuesta orientativa: estudiar inglés parece especialmente útil porque mejora su capacidad para atender a huéspedes y puede abrirle oportunidades laborales. También sería válida otra elección bien explicada con datos del texto." },
            { type: "open", q: "Write two sentences comparing Eva's routine with yours.", guidance: "Respuesta orientativa: Eva takes the bus to work, but I walk to school. She studies English in the evening, and I study it in the morning. Tu respuesta puede ser distinta si compara claramente dos hábitos." }
          ]
        },
        {
          title: "The Community Garden",
          genre: "Historia cotidiana",
          time: "2 min",
          paragraphs: [
            "There is a community garden behind Leo's apartment building. Ten families use it. Each family has a small area for vegetables or flowers. Leo and his daughter Mia grow tomatoes, onions and strawberries.",
            "They go to the garden every Tuesday and Saturday. Mia waters the plants while Leo removes weeds. In summer, the garden is full of colour. Neighbours often share food and advice. Mrs Green gives Leo fresh herbs, and he gives her tomatoes.",
            "The garden is more than a place for plants. It helps neighbours meet and work together. Mia says it is her favourite place because she can learn, play and talk to people of different ages."
          ],
          questions: [
            { type: "choice", q: "When do Leo and Mia visit the garden?", options: ["Every day", "Tuesday and Saturday", "Only in summer"], correct: 1, explanation: "El segundo párrafo indica los dos días." },
            { type: "choice", q: "What does Mrs Green give Leo?", options: ["Fresh herbs", "Strawberries", "Onions"], correct: 0, explanation: "Los vecinos intercambian productos y ella le da hierbas frescas." },
            { type: "open", q: "Why is the garden important to the community?", guidance: "Respuesta orientativa: porque permite que los vecinos se conozcan, cooperen, compartan alimentos y aprendan unos de otros. No es únicamente un lugar para cultivar." },
            { type: "open", q: "Would you like a community garden near your home? Explain.", guidance: "Respuesta orientativa: Yes, because I could grow fresh food and meet my neighbours. Una respuesta negativa también es válida si incluye una razón humana y coherente." }
          ]
        },
        {
          title: "A Different Birthday",
          genre: "Correo electrónico",
          time: "2 min",
          paragraphs: [
            "Hi Sam, Yesterday was my birthday, but I didn't have a big party this year. In the morning, my family made pancakes and gave me a blue backpack. Then we drove to a lake outside the city.",
            "The weather was cool but sunny. We walked around the lake and had lunch under some trees. My little brother forgot the candles, so we put one small lamp next to the cake. It looked funny, and everyone laughed.",
            "In the afternoon, I took lots of photos and read my birthday messages. It was a simple day, but I loved spending time with my family. Next weekend, I am going to watch a film with my friends. See you soon, Alex."
          ],
          questions: [
            { type: "choice", q: "What present did Alex receive?", options: ["A camera", "A backpack", "A lamp"], correct: 1, explanation: "La familia le regaló una mochila azul." },
            { type: "choice", q: "Why did they use a lamp?", options: ["It was dark", "They forgot the candles", "The cake was outside"], correct: 1, explanation: "El hermano pequeño olvidó las velas." },
            { type: "open", q: "How did Alex feel about the simple celebration?", guidance: "Respuesta orientativa: Alex felt happy and satisfied because spending time with the family mattered more than having a large party." },
            { type: "open", q: "What makes a celebration memorable for you?", guidance: "Respuesta orientativa: For me, a celebration is memorable when I share a relaxed moment with people I care about. No hay una única solución; se valora una opinión clara y explicada." }
          ]
        }
      ]
    },
    {
      level: "B1",
      texts: [
        {
          title: "The Four-Day Experiment",
          genre: "Artículo",
          time: "3 min",
          paragraphs: [
            "Last spring, a small design company decided to test a four-day working week. Employees would work from Monday to Thursday without losing salary, but they had to keep the same deadlines and level of service. The director expected productivity to fall at first.",
            "Instead, teams changed the way they organised their time. Meetings became shorter and only included people who needed to attend. Employees blocked periods for focused work and checked email less frequently. After two months, the company completed slightly more projects than during the previous period.",
            "The change was not perfect. Customer support needed coverage on Fridays, so the team created a rotating schedule. Some employees also felt pressure to fit five days of work into four. The company responded by removing low-value reports rather than asking people to work faster.",
            "At the end of the experiment, most employees reported less stress and better concentration. The director decided to continue for six more months, but she warned that the model might not suit every type of business."
          ],
          questions: [
            { type: "choice", q: "What surprised the director?", options: ["Salaries increased", "Productivity did not fall", "Customers stopped calling"], correct: 1, explanation: "Esperaba una caída, pero terminaron ligeramente más proyectos." },
            { type: "choice", q: "How did the company handle Friday support?", options: ["It closed support", "Managers answered every call", "It introduced a rotating schedule"], correct: 2, explanation: "El tercer párrafo describe un sistema rotativo." },
            { type: "open", q: "Which change probably contributed most to productivity? Use evidence.", guidance: "Respuesta orientativa: shorter, more selective meetings probably saved time for focused work. También se puede defender la reducción de correos o informes si se conecta con información concreta." },
            { type: "open", q: "What limitation of the experiment should readers remember?", guidance: "Respuesta orientativa: it involved one small design company, so the result may not apply to businesses requiring constant physical presence or different customer coverage." }
          ]
        },
        {
          title: "Learning to Repair",
          genre: "Reportaje",
          time: "3 min",
          paragraphs: [
            "Once a month, the central library in Brookdale becomes a repair café. Volunteers bring tools and help visitors fix broken lamps, clothes, bicycles and small electronic devices. The service is free, although visitors can donate money for replacement parts.",
            "The project began when engineer Priya Shah noticed how many repairable objects were being thrown away. She wanted to reduce waste, but she also believed practical skills could bring generations together. Retired technicians now work beside university students, and both groups say they learn from each other.",
            "Not every object can be saved. Modern devices are sometimes sealed or require parts that are no longer produced. Volunteers explain the problem instead of promising a repair. This honesty is important because visitors learn how products are designed and when replacement is unavoidable.",
            "The café's success has changed the library too. People who first arrived with a broken toaster now borrow manuals, attend workshops or volunteer. The organisers argue that the most valuable repair may be the community itself."
          ],
          questions: [
            { type: "choice", q: "What originally motivated Priya?", options: ["A shortage of library books", "The amount of repairable waste", "A university assignment"], correct: 1, explanation: "Observó que se tiraban objetos que podían repararse." },
            { type: "choice", q: "Why do volunteers explain failed repairs?", options: ["To teach how products work", "To sell replacement devices", "To avoid using tools"], correct: 0, explanation: "La explicación ayuda a comprender el diseño y los límites de reparación." },
            { type: "open", q: "Explain the final phrase: 'the most valuable repair may be the community itself.'", guidance: "Respuesta orientativa: repairing objects creates relationships, shared knowledge and new participation; therefore the project also strengthens a previously disconnected community." },
            { type: "open", q: "Suggest one additional activity for the repair café.", guidance: "Respuesta orientativa: it could run a basic maintenance class so visitors learn to prevent common problems. Se acepta cualquier propuesta realista explicada." }
          ]
        },
        {
          title: "The Quiet Carriage Debate",
          genre: "Opinión",
          time: "3 min",
          paragraphs: [
            "Several rail companies have introduced quiet carriages where phone calls and loud conversations are discouraged. Supporters say these spaces allow passengers to work, read or rest during long journeys. Clear signs remind travellers to keep devices silent.",
            "However, the policy often creates disagreement. Families with young children may enter the carriage by mistake, and some passengers interpret every sound as a rule violation. Staff members report that conflicts are usually caused not by noise itself, but by the unfriendly way people complain.",
            "Transport researcher Daniel Cho suggests replacing strict silence with the idea of a considerate carriage. Necessary conversation would be allowed at a low volume, while calls and videos without headphones would remain unacceptable. He believes a flexible rule would be easier to understand and enforce.",
            "Critics respond that flexible language creates uncertainty. In their view, passengers choose a quiet carriage precisely because the expectation is simple. The debate reveals how difficult it is to share public space when people have different needs."
          ],
          questions: [
            { type: "choice", q: "According to staff, what often causes conflict?", options: ["The length of journeys", "The manner of complaints", "Unclear train tickets"], correct: 1, explanation: "El texto destaca la forma poco amable de quejarse." },
            { type: "choice", q: "What does Daniel Cho propose?", options: ["Removing all rules", "A more flexible considerate-carriage rule", "Banning children from trains"], correct: 1, explanation: "Propone permitir conversaciones necesarias a volumen bajo." },
            { type: "open", q: "Which policy seems more practical to you, and why?", guidance: "Respuesta orientativa: a considerate carriage may be more practical because it distinguishes avoidable noise from necessary communication. También es válida la defensa del silencio estricto si explica cómo mejora la claridad." },
            { type: "open", q: "Identify one idea shared by both sides.", guidance: "Respuesta orientativa: both sides agree that passengers need a predictable environment and that loud calls or videos can disturb others; they disagree about how strict the rule should be." }
          ]
        }
      ]
    },
    {
      level: "C1",
      texts: [
        {
          title: "The Efficiency Paradox",
          genre: "Ensayo",
          time: "4 min",
          paragraphs: [
            "Tools designed to save time do not necessarily leave us with more of it. Email reduced the cost of sending a message, yet the volume of expected communication expanded dramatically. Faster transport shortened individual journeys while enabling people to live farther from work. Efficiency, in other words, often changes behaviour rather than simply reducing effort.",
            "Economists describe a related phenomenon as the rebound effect: when a resource becomes cheaper or easier to use, demand may rise enough to offset part of the anticipated saving. A more efficient car consumes less fuel per kilometre, but its owner may decide to drive more frequently. The technology succeeds on a narrow measure while producing a less impressive result at system level.",
            "This does not make efficiency pointless. It suggests that technical improvement alone cannot determine the outcome. Institutions, incentives and social expectations shape how the saved resource is used. A company that automates routine reporting might give employees time for creative work; it might equally fill the gap with additional reporting.",
            "The relevant question is therefore not merely whether a tool is faster, but what kind of behaviour its speed encourages. Without that broader perspective, societies risk mistaking capacity for progress."
          ],
          questions: [
            { type: "choice", q: "What is the central claim?", options: ["Efficiency always increases consumption", "Time-saving tools can alter behaviour and reduce expected gains", "Technology should be rejected"], correct: 1, explanation: "La tesis no rechaza la eficiencia; cuestiona que el ahorro técnico se traduzca automáticamente en progreso." },
            { type: "choice", q: "Why is the car example a rebound effect?", options: ["The car becomes slower", "Lower use per kilometre encourages more driving", "Fuel prices necessarily increase"], correct: 1, explanation: "El ahorro unitario puede quedar parcialmente compensado por un mayor uso." },
            { type: "open", q: "Explain the distinction between capacity and progress.", guidance: "Respuesta orientativa: capacity is the technical ability to do more or act faster; progress depends on whether institutions and behaviour use that capacity to improve meaningful outcomes." },
            { type: "open", q: "Apply the author's argument to an AI tool used for studying.", guidance: "Respuesta orientativa: an AI summariser may save reading time, but the benefit depends on whether the student uses that time for deeper practice or simply processes more material superficially. Otras aplicaciones razonadas son válidas." }
          ]
        },
        {
          title: "Who Owns a City’s Memory?",
          genre: "Artículo cultural",
          time: "4 min",
          paragraphs: [
            "City archives have traditionally preserved official documents: planning decisions, tax records and correspondence between public institutions. Such material is indispensable, yet it tends to describe a city from the perspective of those with administrative power. Everyday experience survives less reliably.",
            "Digital collection projects seek to correct that imbalance by inviting residents to submit photographs, voice recordings and personal accounts. A bus ticket or a memory of a demolished market may reveal patterns that formal records overlook. The resulting archive is richer, but it raises difficult questions about consent, verification and representation.",
            "If every contribution is treated as equally authoritative, misinformation can enter the historical record. If professional archivists impose overly strict standards, the same voices excluded in the past may be excluded again. Selection is unavoidable; neutrality is not. Even the decision to preserve one object rather than another creates an argument about what matters.",
            "Some archivists now describe their role less as guarding a finished past and more as facilitating an ongoing conversation. Their task is to preserve disagreement alongside evidence, document the limits of each source and make the process of selection visible. A democratic archive, on this view, is not one without judgement, but one whose judgements can be examined."
          ],
          questions: [
            { type: "choice", q: "What limitation of traditional archives does the text emphasise?", options: ["They contain no reliable material", "They privilege administrative perspectives", "They only preserve photographs"], correct: 1, explanation: "Los documentos oficiales tienden a reflejar a quienes tenían poder administrativo." },
            { type: "choice", q: "What does 'neutrality is not' mean in context?", options: ["Selection can be avoided", "Every selection reflects judgement", "Archivists should remove evidence"], correct: 1, explanation: "La elección de qué conservar ya expresa una visión de importancia." },
            { type: "open", q: "How does the final definition of a democratic archive address misinformation?", guidance: "Respuesta orientativa: it does not accept every claim uncritically; it preserves evidence, disagreement and source limitations while making curatorial decisions open to examination." },
            { type: "open", q: "Whose everyday experience would you add to a city archive, and why?", guidance: "Respuesta orientativa: I would record night-shift workers because their use of transport and public space is often absent from daytime accounts. Se acepta cualquier grupo con una justificación concreta." }
          ]
        },
        {
          title: "The Value of Productive Disagreement",
          genre: "Análisis",
          time: "4 min",
          paragraphs: [
            "Organisations frequently claim to value disagreement while quietly rewarding consensus. A meeting may invite alternative views, yet the first confident proposal becomes an anchor around which later comments revolve. Employees learn that challenging a popular idea carries social risk, particularly when senior figures have already expressed support.",
            "The solution is not to celebrate conflict for its own sake. Unstructured opposition can consume time, weaken trust and allow individuals to avoid responsibility. Productive disagreement requires a shared objective, evidence that participants can inspect and rules that separate criticism of an idea from judgement of the person presenting it.",
            "Some teams collect written opinions before discussion begins. Others assign a rotating member to identify assumptions and construct the strongest counterargument, even when that person privately agrees with the proposal. These methods reduce the influence of hierarchy and prevent dissent from becoming a fixed personality trait.",
            "Crucially, leaders must show that changing one's mind is evidence of judgement rather than weakness. If every concession is treated as defeat, participants will defend positions long after those positions cease to be useful. The quality of a decision depends not on the absence of disagreement, but on whether disagreement is converted into better reasoning."
          ],
          questions: [
            { type: "choice", q: "Why can invitations to disagree be ineffective?", options: ["Meetings contain no proposals", "Hierarchy and social risk still shape responses", "Written evidence is always unavailable"], correct: 1, explanation: "El texto señala el anclaje y el riesgo de contradecir a figuras superiores." },
            { type: "choice", q: "What is the purpose of assigning a counterargument role?", options: ["To create permanent opposition", "To test assumptions without personalising dissent", "To let leaders avoid decisions"], correct: 1, explanation: "El rol rota y separa la crítica de una identidad personal." },
            { type: "open", q: "Why does the author distinguish disagreement from conflict?", guidance: "Respuesta orientativa: disagreement can improve reasoning when it is structured around evidence and a shared goal; conflict becomes harmful when it targets people, lacks structure or avoids responsibility." },
            { type: "open", q: "Design one rule for a productive classroom debate.", guidance: "Respuesta orientativa: each claim must be followed by evidence or an example, and another student must summarise it fairly before responding. Son válidas otras reglas que protejan respeto y razonamiento." }
          ]
        }
      ]
    }
  ]
};
