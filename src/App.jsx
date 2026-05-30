import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import './pages/Landing/landing.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ErrorBoundary from './components/layout/ErrorBoundary'
// Home is the most-likely entry point — keep it eager so the landing page
// has no extra round-trip on first load. Everything else is lazy.
import Home from './pages/Landing/Home'

const AboutPage     = lazy(() => import('./pages/About/AboutPage'))
const ProductsPage  = lazy(() => import('./pages/Products/ProductsPage'))
const ProductDetail = lazy(() => import('./pages/Products/ProductDetail'))
const Contact       = lazy(() => import('./pages/Contact'))
const Careers       = lazy(() => import('./pages/Careers'))
const NotFound      = lazy(() => import('./pages/NotFound'))

// Minimal Suspense fallback — a thin centered shimmer that only shows for
// the brief moment a route chunk takes to download. Match the page layout
// so the navbar/footer don't jump.
function RouteFallback() {
  return (
    <main aria-busy="true" style={{ minHeight: '60vh' }} />
  )
}

function App() {
  // Re-key the boundary on every navigation so a recovered error route
  // doesn't keep showing the fallback after the user clicks elsewhere.
  const location = useLocation()
  return (
    <ReactLenis root>
      <Navbar />
      <ErrorBoundary key={location.pathname}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </ReactLenis>
  )
}

export default App
