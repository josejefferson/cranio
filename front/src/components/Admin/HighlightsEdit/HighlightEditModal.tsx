import axios from '@/api/index'
import React from 'react'
import EditModal from '../EditModal/index'
import EditModalContent from './HighlightEditModalContent'
import { initialValues } from './data'
import dayjs from 'dayjs'

export default function EditHighlightModal({ open, setOpen, data, onDone }: any) {
  const [error, setError] = React.useState('')
  const editing = !!data

  // Ao fechar o modal
  const handleClose = () => {
    setOpen(false)
    setError('')
  }

  // Ao enviar o formulário
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    let data: any
    try {
      data = JSON.parse(JSON.stringify(values))
      data.endDate = new Date(data.endDateRaw).toISOString()
      if (!data.title?.trim?.()) data.title = undefined
      if (!data.description?.trim?.()) data.description = undefined
      delete data.endDateRaw
      setSubmitting(true)

      if (editing) axios.put(`/highlight/${data._id}`, data).then(success).catch(error)
      else axios.post('/highlight', data).then(success).catch(error)
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

  if (data?.endDate) data.endDateRaw = dayjs(data.endDate).format('YYYY-MM-DDTHH:mm')

  return (
    <EditModal
      editing={editing}
      data={data || initialValues}
      title="anúncio"
      handleSubmit={handleSubmit}
      isOpen={open}
      handleClose={handleClose}
      error={error}
    >
      <EditModalContent />
    </EditModal>
  )
}