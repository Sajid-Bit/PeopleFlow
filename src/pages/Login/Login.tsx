import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!username.trim() || !password.trim()) {
      return
    }

    navigate('/home')
  }

  return (
    <main className="app">
      <section className="app__content">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label className="login-form__field">
            <span>اسم المستخدم</span>
            <input
              type="text"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="أدخل اسم المستخدم"
              required
            />
          </label>

          <label className="login-form__field">
            <span>كلمة المرور</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="أدخل كلمة المرور"
              required
            />
          </label>

          <button type="submit">تسجيل الدخول</button>
        </form>
      </section>
    </main>
  )
}

export default Login

