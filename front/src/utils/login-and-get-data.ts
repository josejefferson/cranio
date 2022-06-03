import axios from '@/api/index'
import _Swal from 'sweetalert2'
import swalReact from 'sweetalert2-react-content'
const Swal = swalReact(_Swal)

export function loginAndGetData(path: string, data: any, setData: Function) {
  axios.get(path, {
    auth: {
      username: typeof window !== 'undefined' ? localStorage.getItem('cranio.backend.username') || '' : '',
      password: typeof window !== 'undefined' ? localStorage.getItem('cranio.backend.password') || '' : ''
    }
  }).then((res) => {
    setData(res.data)
  }).catch(async (err) => {
    if (err.response.status === 401) {
      const { value: username } = await Swal.fire({
        title: 'Fazer login',
        input: 'text',
        inputLabel: 'Digite seu usuário',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar'
      })

      const { value: password } = await Swal.fire({
        title: 'Fazer login',
        input: 'password',
        inputLabel: 'Digite sua senha',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar'
      })

      localStorage.setItem('cranio.backend.username', username)
      localStorage.setItem('cranio.backend.password', password)
      loginAndGetData(path, data, setData)
    }
  })
}