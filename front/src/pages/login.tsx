import Head from 'next/head'
import { FormLogin } from 'src/container'

const Login = ({ setLoading }: any) => {
  return (
    <>
      <Head>
        <title>O Crânio | Login</title>
      </Head>
      <FormLogin setLoading={setLoading} />
    </>
  )
}

export default Login