import { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Custom500() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 1000)
  })

  return <h1>500 - Server-side error occurred</h1>
}