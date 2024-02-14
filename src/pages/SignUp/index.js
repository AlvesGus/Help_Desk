import { useState } from 'react'
import '../Signin/signin.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>
        <form>
          <h1>Nova conta</h1>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="************"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </form>
        <Link to="/">Já possuí uma conta? Faça login</Link>
      </div>
    </div>
  )
}