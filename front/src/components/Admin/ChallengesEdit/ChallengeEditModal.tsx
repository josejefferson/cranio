import axios from '@/api/index'
import React from 'react'
import EditModal from '../EditModal/index'
import EditModalContent from './ChallengeEditModalContent'
import { courses, initialValues } from './data'

export default function EditChallengeModal({ open, setOpen, data, onDone }: any) {
  const [error, setError] = React.useState('')
  const editing = !!data

  // Ao fechar o modal
  const handleClose = () => {
    setOpen(false)
    setError('')
  }

  // Ao enviar o formulário
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    const auth = {
      username: localStorage.getItem('cranio.backend.username') || '',
      password: localStorage.getItem('cranio.backend.password') || ''
    }

    let data: any
    try {
      data = JSON.parse(JSON.stringify(values))
      if (!data.image?.trim?.()) data.image = undefined
      if (!data.time) data.time = undefined
      if (!data.preparationTime) data.preparationTime = undefined
      if (!data.preparationMessage?.trim?.()) data.preparationMessage = undefined
      if (!data.correctMessage?.trim?.()) data.correctMessage = undefined
      if (!data.incorrectMessage?.trim?.()) data.incorrectMessage = undefined
      if (!data.timeOutMessage?.trim?.()) data.timeOutMessage = undefined
      data.courseName = data.course?.map((course: string) => {
        return courses.find((c: any) => c.value === +course)?.name
      }) || []
      if (data.course?.length === 0) data.course = null
      setSubmitting(true)

      if (editing) axios.put(`/challenge/${data._id}`, data, { auth }).then(success).catch(error)
      else axios.post('/challenge', data, { auth }).then(success).catch(error)

      try {
        localStorage.setItem('cranio.defaultCreators', JSON.stringify(data.createdBy))
      } catch { }
    } catch (err) {
      error(err)
    }

    // Sucesso ao enviar o formulário
    function success({ data: result }: any) {
      setSubmitting(false)
      handleClose()
      onDone(editing ? data : result, editing)
    }

    // Erro ao enviar o formulário
    function error(err: any) {
      setSubmitting(false)
      console.error(err)
      if (typeof err?.response?.data === 'object' && err?.response?.data?.error) {
        setError(`(${err?.response?.data?.code}) ${err?.response?.data?.message}`)
      } else {
        setError(err?.message)
      }
    }
  }

  // Autocompleta os criadores
  try {
    if (editing) throw new Error()
    const defaultCreatorsString = localStorage.getItem('cranio.defaultCreators')
    if (!defaultCreatorsString) throw new Error()
    const defaultCreatorsObject = JSON.parse(defaultCreatorsString)
    if (!Array.isArray(defaultCreatorsObject)) throw new Error()
    initialValues.createdBy = defaultCreatorsObject
  } catch { }

  if (data?.course) data.course = data.course.map(String)

  return (
    <EditModal
      editing={editing}
      data={data || initialValues}
      title="desafio"
      handleSubmit={handleSubmit}
      isOpen={open}
      handleClose={handleClose}
      error={error}
    >
      <EditModalContent />
    </EditModal>
  )
}