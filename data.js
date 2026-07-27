// ============================================================
//  DATA.JS — Contenido completo con niveles A1, B1 y C1
//  Cada seccion tiene un array "levels" con sus ejercicios
//  organizados por nivel. Solo edita este archivo para
//  añadir o modificar contenido.
// ============================================================

const data = {

  // ----------------------------------------------------------
  //  JUEGO DE FICHAS
  // ----------------------------------------------------------
  game: {
    title: "Flashcards",
    icon: "🃏",
    description: "Adivina vocabulario, verbos y pronombres en español e inglés",
    count: "3 modos de juego"
  },

  // ----------------------------------------------------------
  //  GRAMATICA
  // ----------------------------------------------------------
  grammar: {
    title: "Gramatica",
    icon: "📐",
    description: "Ejercicios agrupados por tema (presente, pasado, condicionales...) dentro de cada nivel",
    count: "18 ejercicios",
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
    description: "Explora por categoria tematica (comida, viajes, trabajo...) y nivel",
    count: "24 palabras",
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
    description: "Preguntas tipo examen con desglose de resultados por tema",
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
    description: "Audios por contexto (trabajo, viajes, noticias...) y nivel",
    count: "9 audios",
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
            url: null,
            script: "Hi! My name is Anna. Nice to meet you. Hi Anna, I'm Tom. Nice to meet you too. Where are you from? I'm from Italy. And you? I'm from Canada."
          },
          {
            title: "Numbers and Colors",
            desc: "Practica numeros, colores y objetos cotidianos. Nivel A1.",
            context: "Vocabulario práctico",
            url: null,
            script: "Look at this box. It has five red apples, three blue balls, and two green books. How many things are there in total? Let's count together: one, two, three, four, five."
          },
          {
            title: "Daily Routines",
            desc: "Una persona describe su dia a dia. Nivel A1-A2.",
            context: "Vida diaria",
            url: null,
            script: "Every morning I wake up at seven o'clock. I have breakfast, then I go to work by bus. In the evening, I cook dinner and watch TV before going to bed."
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
            url: null,
            script: "Good morning, thank you for coming. Can you tell me about your previous experience? Of course. I worked as a customer service assistant for two years, and I really enjoyed helping people solve problems."
          },
          {
            title: "Talking About the Future",
            desc: "Conversacion sobre planes y predicciones. Nivel B1.",
            context: "Conversación cotidiana",
            url: null,
            script: "What are your plans for next year? I'm planning to travel around Europe. I think I'll visit Portugal first, and then maybe France. I'm really looking forward to it."
          },
          {
            title: "Describing a City",
            desc: "Alguien describe su ciudad favorita. Nivel B1-B2.",
            context: "Viajes y lugares",
            url: null,
            script: "My favourite city is Barcelona. It has amazing architecture, beautiful beaches, and delicious food. There's always something interesting to do, day or night."
          }
        ]
      },
      {
        level: "C1",
        color: "#FAEEDA",
        textColor: "#633806",
        tracks: [
          {
            title: "BBC News Summary",
            desc: "Extracto de noticias con acento britanico. Nivel C1.",
            context: "Noticias",
            url: null,
            script: "Good evening. Tonight's main story: scientists have announced a significant breakthrough in renewable energy technology, which could reduce carbon emissions considerably over the next decade."
          },
          {
            title: "Academic Lecture Extract",
            desc: "Fragmento de una conferencia universitaria. Nivel C1.",
            context: "Ámbito académico",
            url: null,
            script: "Today we will examine the relationship between cognitive development and language acquisition, focusing particularly on the critical period hypothesis proposed in the mid twentieth century."
          },
          {
            title: "Debate: Technology and Society",
            desc: "Debate formal entre dos ponentes. Nivel C1-C2.",
            context: "Debate formal",
            url: null,
            script: "While technology has undoubtedly improved our quality of life, one must also consider its pervasive influence on mental health, particularly among younger generations who have grown up entirely online."
          }
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  //  TEORIA
  // ----------------------------------------------------------
  theory: {
    title: "Teoria",
    icon: "📖",
    description: "Resumenes agrupados en bloques tematicos con indice de navegacion",
    count: "8 temas",
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
      }
    ]
  }

};
