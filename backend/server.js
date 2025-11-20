import express from 'express'
import sqlite3 from 'sqlite3'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Database setup
const dbFilePath = path.join(__dirname, 'peopleflow.db')
const sqlite = sqlite3.verbose()
const db = new sqlite.Database(dbFilePath, (error) => {
  if (error) {
    console.error('Failed to connect to SQLite database:', error.message)
    process.exit(1)
  }
  console.log('Connected to SQLite database at', dbFilePath)
})

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`,
    (error) => {
      if (error) {
        console.error('Failed to ensure users table exists:', error.message)
      }
    },
  )

  db.run(
    `INSERT OR IGNORE INTO users (username, password)
     VALUES ('admin', 'admin123')`,
    (error) => {
      if (error) {
        console.error('Failed to seed default admin user:', error.message)
      }
    },
  )
})

// Middleware
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to PeopleFlow backend!')
})

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {}

  if (!username || !password) {
    return res.status(400).json({ message: 'اسم المستخدم وكلمة المرور مطلوبان' })
  }

  const query = `SELECT id, username FROM users WHERE username = ? AND password = ?`

  db.get(query, [username.trim(), password], (error, row) => {
    if (error) {
      console.error('Failed to execute login query:', error.message)
      return res.status(500).json({ message: 'حدث خطأ في الخادم' })
    }

    if (!row) {
      return res.status(401).json({ message: 'بيانات تسجيل الدخول غير صحيحة' })
    }

    return res.json({ message: 'تم تسجيل الدخول بنجاح', user: row })
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
