import React, {useState} from 'react'
import axios from 'axios'

export default function Login(){
  const [email,setEmail] = useState('admin@capital.com.br')
  const [password,setPassword] = useState('123456')
  const [msg,setMsg] = useState('')

  async function doLogin(e){
    e.preventDefault()
    try{
      const r = await axios.post('/api/login', {email,password})
      localStorage.setItem('token', r.data.token)
      setMsg('Login realizado com sucesso (demo).')
    }catch(err){
      setMsg('Erro: ' + (err.response?.data?.error || err.message))
    }
  }
  return (
    <div className="centerCard">
      <h2>Entrar</h2>
      <form onSubmit={doLogin}>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Senha</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" />
        <button className="btn">Entrar</button>
      </form>
      <p className="muted">{msg}</p>
    </div>
  )
}
