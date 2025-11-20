import { useEffect, useState } from 'react'
import './Home.css'

function Home() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Call backend via Vite proxy -> http://localhost:5000/api
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        if (data?.message) {
          setMessage(data.message)
        }
      })
      .catch((error) => {
        console.error('Failed to fetch from backend:', error)
      })
  }, [])

  return (
    <main className="home">
      <section className="home__content">
        <h1>لوحة التحكم</h1>
        <p className="home__subtitle">
          {message || 'مرحباً بك في بوابة DCU. استعرض المعلومات والإحصائيات المهمة.'}
        </p>
      </section>
    </main>
  )
}

export default Home

