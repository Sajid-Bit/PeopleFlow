import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!username.trim() || !password.trim()) {
      setErrorMessage('الرجاء إدخال اسم المستخدم وكلمة المرور')
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage(null)

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message ?? 'فشل تسجيل الدخول')
      }

      navigate('/home')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'حدث خطأ غير متوقع'
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
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

          {errorMessage && (
            <p className="login-form__error" role="alert">
              {errorMessage}
            </p>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'جاري التحقق...' : 'تسجيل الدخول'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login

