export const emptyAlternative = { title: '', correct: false }
export const emptyCreator = { name: '', email: '' }

export const courses = [
  { value: 353, name: 'Informática' },
  { value: 350, name: 'Edificações' },
  { value: 352, name: 'Geologia' },
  { value: 366, name: 'Mineração' },
  { value: 313, name: 'Eletrônica' },
  { value: 311, name: 'Mineração (Subsequente)' },
  { value: 301, name: 'Agroecologia' },
  { value: 312, name: 'MSI' },
  { value: 355, name: 'Inglês (Iniciante)' },
  { value: 473, name: 'Inglês (Básico II)' },
  { value: 359, name: 'Espanhol' },
  { value: 357, name: 'LIBRAS' }
]

export const initialValues = {
  active: true,
  question: '',
  topic: '',
  time: '',
  preparationTime: '',
  image: '',
  alternatives: [emptyAlternative],
  randomizeAlternatives: false,
  courses: ['313','353'],
  createdBy: [emptyCreator],
  preparationMessage: '',
  correctMessage: '',
  incorrectMessage: '',
  timeOutMessage: ''
}

