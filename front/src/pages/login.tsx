import Head from 'next/head'
import { FormLogin } from 'src/container'
import { SplashScreen } from '@/components/index'

const Login = () => {
  return (
    <>
      <Head>
        <title>O Crânio | Login</title>
      </Head>
      <FormLogin />
      <SplashScreen />
    </>
  )
}

export default Login