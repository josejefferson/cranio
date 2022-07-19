import React from 'react'
import EditModal from '@/components/Admin/EditModal'
import ChallengesEdit from '@/components/Admin/ChallengesEdit'
import { initialValues } from '@/components/Admin/ChallengesEdit/data'
import axios from '@/api/index'

export default function EditChallenge() {
  const [open, setOpen] = React.useState(true)
  const handleClose = () => {
    setOpen(false)
    setTimeout(() => setOpen(true), 1000)
  }

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    const data = JSON.parse(JSON.stringify(values))
    if (!data.image?.trim()) data.image = undefined
    if (!data.time?.trim()) data.time = undefined
    if (!data.preparationTime?.trim()) data.preparationTime = undefined
    if (!data.preparationMessage?.trim()) data.preparationMessage = undefined
    if (!data.correctMessage?.trim()) data.correctMessage = undefined
    if (!data.incorrectMessage?.trim()) data.incorrectMessage = undefined
    if (!data.timeOutMessage?.trim()) data.timeOutMessage = undefined
    console.log(JSON.stringify(data, null, 2))
    setSubmitting(true)
    axios.post('/challenge', data).then(success).catch(error)

    function success({ data }: any) {
      setSubmitting(false)
      console.log(data)
      handleClose()
    }

    function error(err: any) {
      setSubmitting(false)
      console.log(err)
    }
  }

  return (
    <EditModal data={initialValues} title="desafio" handleSubmit={handleSubmit} isOpen={open} handleClose={handleClose}>
      <ChallengesEdit />
    </EditModal>
  )
}