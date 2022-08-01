import React from 'react'
import EditModal from '@/components/Admin/EditModal'
import ChallengesEdit from '@/components/Admin/ChallengesEdit'
import { initialValues } from '@/components/Admin/ChallengesEdit/data'
import axios from '@/api/index'

export default function EditChallenge() {
  const [open, setOpen] = React.useState(true)
  const [error, setError] = React.useState('')
  const handleClose = () => {
    setOpen(false)
    setError('')
    setTimeout(() => setOpen(true), 1000)
  }

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
    } catch (err) {
      error(err)
    }

    function success({ data }: any) {
      setSubmitting(false)
      console.log(data)
      handleClose()
    }

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

  return (
    <EditModal data={initialValues} title="desafio" handleSubmit={handleSubmit} isOpen={open} handleClose={handleClose} error={error}>
      <ChallengesEdit />
    </EditModal>
  )
}