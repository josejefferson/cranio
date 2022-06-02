import { NextRequest, NextResponse } from 'next/server'
import axios from '@/api/index'

export async function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1]
    const [user, password] = Buffer.from(auth, 'base64').toString().split(':')

    if (user && password) {
      try {
        const { data } = await axios.post('/auth/verify', { user, password })
        if (data?.success) return NextResponse.next()
      } catch (err) { }
    }
  }

  return new Response('É necessário estar autenticado para acessar esta página', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  })
}