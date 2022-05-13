import Head from 'next/head'
import { FormLogin } from 'src/container'
import ReactAudioPlayer from 'react-audio-player'

const Login = () => {
  return (
    <>
      <Head>
        <title>O Crânio | Login</title>
      </Head>
      <FormLogin />
      <ReactAudioPlayer
        src="/music/lobby-classic.mp3"
        volume={0.1}
        autoPlay
      />
    </>
  )
}

export default Login