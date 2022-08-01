import React from 'react'
import EditModal from '@/components/Admin/EditModal'
import ChallengesEdit from '@/components/Admin/ChallengesEdit'
import { initialValues } from '@/components/Admin/ChallengesEdit/data'
import axios from '@/api/index'

export default function EditChallenge() {
  const [open, setOpen] = React.useState(true)
  const [error, setError] = React.useState('')

  // Ao fechar o modal
  const handleClose = () => {
    setOpen(false)
    setError('')
    setTimeout(() => setOpen(true), 1000)
  }

  // Ao enviar o formulário
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    try {
      const data = JSON.parse(JSON.stringify(values))
      if (!data.image?.trim?.()) data.image = undefined
      if (!data.time) data.time = undefined
      if (!data.preparationTime) data.preparationTime = undefined
      if (!data.preparationMessage?.trim?.()) data.preparationMessage = undefined
      if (!data.correctMessage?.trim?.()) data.correctMessage = undefined
      if (!data.incorrectMessage?.trim?.()) data.incorrectMessage = undefined
      if (!data.timeOutMessage?.trim?.()) data.timeOutMessage = undefined
      if (data.course?.length === 0) data.course = null
      setSubmitting(true)
      axios.post('/challenge', data).then(success).catch(error)

      try {
        localStorage.setItem('cranio.defaultCreators', JSON.stringify(data.createdBy))
      } catch { }
    } catch (err) {
      error(err)
    }

    // Sucesso ao enviar o formulário
    function success({ data }: any) {
      setSubmitting(false)
      handleClose()
    }

    // Erro ao enviar o formulário
    function error(err: any) {
      setSubmitting(false)
      console.log(err)
      if (typeof err.response.data === 'object' && err.response.data.error) {
        setError(`(${err.response.data.code}) ${err.response.data.message}`)
      } else {
        setError(err.message)
      }
    }
  }

  // Autocompleta os criadores
  try {
    const defaultCreatorsString = localStorage.getItem('cranio.defaultCreators')
    if (!defaultCreatorsString) throw new Error()
    const defaultCreatorsObject = JSON.parse(defaultCreatorsString)
    if (!Array.isArray(defaultCreatorsObject)) throw new Error()
    initialValues.createdBy = defaultCreatorsObject
  } catch { }

  return (
    <EditModal
      data={initialValues}
      title="desafio"
      handleSubmit={handleSubmit}
      isOpen={open}
      handleClose={handleClose}
      error={error}
    >
      <ChallengesEdit />
    </EditModal>
  )
}