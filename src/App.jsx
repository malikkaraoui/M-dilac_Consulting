import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import Protection from './components/sections/Protection'
import Distinction from './components/sections/Distinction'
import { CarouselSectionFirst, CarouselSectionSecond } from './components/sections/CarouselSection'
import Approach from './components/sections/Approach'
import Partners from './components/sections/Partners'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import BlogPage from './pages/BlogPage'
import LegalPrivacyPage from './pages/LegalPrivacyPage'

function HomePage() {
  return (
    <>
      <Hero />
      <div id="expertise">
        <Protection />
        <Distinction />
      </div>
      <CarouselSectionFirst />
      <div id="method">
        <Approach />
      </div>
      <div id="blog">
        <Blog />
      </div>
      <CarouselSectionSecond />
      <div id="contact">
        <Contact />
      </div>
      <Partners />
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
      <Route path="/politique-confidentialite" element={<LegalPrivacyPage />} />
    </Routes>
  )
}

export default App
