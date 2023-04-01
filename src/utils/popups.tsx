import _Swal from 'sweetalert2'
import swalReact from 'sweetalert2-react-content'
const Swal = swalReact(_Swal)
import { STATUS, ERRORS } from '@/utils/messages'
import { Center } from '@chakra-ui/react'
import { BsAsterisk, BsHash } from 'react-icons/bs'

// ----------- LOGIN -----------

export function studentConfirm({ data }: any) {
  return Swal.fire({
    title: `Você é <u>${data.shortName}</u>?`,
    html: `Você digitou a matrícula <b>${data.registration}</b> correspondente a(o) aluno(a) ` +
      `<b>${data.shortName}</b> do curso de <b>${data.courseName}</b>.<br><br>Caso esteja correta, ` +
      'pressione <b>*</b><br>Se você deseja corrigir, pressione <b>#</b>',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: <Center><BsAsterisk /> SIM</Center>,
    cancelButtonText: <Center><BsHash /> NÃO</Center>,
    timer: 10000,
    timerProgressBar: true
  })
}

export function cantPlayToday() {
  return Swal.fire({
    title: 'Ops, você já jogou hoje!',
    text: 'Por favor, volte amanhã para mais desafios',
    icon: 'info',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })
}

export function studentNotFound() {
  return Swal.fire({
    title: 'Ops, estudante não encontrado!',
    text: 'Verifique se a sua matrícula está correta',
    icon: 'info',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })
}

// ----------- PÁGINA DO DESAFIO -----------

export function drum() {
  return Swal.fire({
    imageUrl: '/img/drum.gif',
    text: 'Que rufem os tambores...',
    showConfirmButton: false
  })
}

export function status({ data }: any) {
  return Swal.fire({
    title: STATUS[data.status][0],
    text: data.message || STATUS[data.status][1],
    icon: STATUS[data.status][2],
    imageUrl: STATUS[data.status][4],
    imageHeight: '8em',
    showConfirmButton: false
  })
}

export function error() {
  return Swal.fire({
    title: 'Ocorreu um erro',
    icon: 'error',
    showConfirmButton: false
  })
}