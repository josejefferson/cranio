export const STATUS: any = {
  CORRECT: [
    'Parabéns, você acertou!',
    'Você respondeu corretamente! Continue assim.',
    'success',
    '/music/correct.mp3'
  ],
  INCORRECT: [
    'Que pena, resposta errada!',
    'Não fique triste, você deu o seu melhor! Volte amanhã.',
    'error',
    '/music/incorrect.mp3'
  ],
  TIMEOUT: [
    'Tempo esgotado!',
    'Tic tac, o tempo acabou! Infelizmente você demorou muito e o relógio não parou. Amanhã você terá uma nova chance!',
    null,
    "/music/time's-up.mp3",
    '/img/alarm.gif'
  ]
}

export const ERRORS: any = {
  // Code: [Title, Description]
  NO_CHALLENGES: [
    'Sem desafios 🙀',
    'Desculpe-nos, mas não há desafios disponíveis para o seu curso no momento 😢. Por favor, tente novamente outro dia!'
  ],
  STUDENT_NOT_FOUND: [
    'Estudante não encontrado',
    'Não encontramos um estudante com esta matrícula no nosso banco de dados'
  ],
  CANT_PLAY_TODAY: [
    'Você já jogou hoje',
    'Desculpe-nos, mas você só pode jogar uma vez por dia, volte amanhã para mais!'
  ],
  500: ['500 | Erro do servidor backend']
}
