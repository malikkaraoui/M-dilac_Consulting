import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import Protection from './components/sections/Protection'
import Distinction from './components/sections/Distinction'
import CarouselSection from './components/sections/CarouselSection'
import Approach from './components/sections/Approach'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import BlogPage from './pages/BlogPage'

function HomePage() {
  return (
    <>
      <Hero />
      <div id="expertise">
        <Protection />
        <Distinction />
      </div>
      <div id="themes">
        <CarouselSection />
      </div>
      <div id="method">
        <Approach />
      </div>
      <div id="blog">
        <Blog />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          <HomePage />
        </Layout>
      } />
      <Route path="/blog" element={<BlogPage />} />
    </Routes>
  )
}

export default App
