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
