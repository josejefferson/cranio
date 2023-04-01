import { boomify, forbidden, internal, isBoom, methodNotAllowed } from '@hapi/boom'
import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorHandler, NoMatchHandler } from 'next-connect'

/** Middleware erro genérico */
export const error: ErrorHandler<NextApiRequest, NextApiResponse<any>> = (error, req, res) => {
  if (error?.code === 'EBADCSRFTOKEN') {
    error = forbidden(
      'Falha na verificação do token CSRF, verifique se os cookies estão ativados ou recarregue a página'
    )
  }

  if (!isBoom(error)) {
    console.error(error)
    error?.statusCode
      ? (error = boomify(error, { statusCode: error?.statusCode }))
      : (error = internal(error?.message))
  }

  res.status(error.output.statusCode)

  res.json(Object.assign(error?.output?.payload, { message: error?.message }))
}

/** Middleware erro método não permitido */
export const notAllowedMethod: NoMatchHandler<NextApiRequest, NextApiResponse<any>> = (
  req,
  res
) => {
  return error(methodNotAllowed(), req, res, () => {})
}
