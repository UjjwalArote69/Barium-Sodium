import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main style={{ padding: '120px 24px', textAlign: 'center' }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <p><Link to="/">Back home</Link></p>
    </main>
  )
}
