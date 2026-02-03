import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Protection from './components/sections/Protection'
import Distinction from './components/sections/Distinction'
import { CarouselSectionFirst, CarouselSectionSecond } from './components/sections/CarouselSection'
import Partners from './components/sections/Partners'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'
import Testimonials from './components/sections/Testimonials'
import Footer from './components/layout/Footer'
import LegalPrivacyPage from './pages/LegalPrivacyPage'

function HomePage() {
  return (
    <>
      <Hero />
      <div id="expertise">
        <Protection />
      </div>
      <CarouselSectionFirst />
      <Distinction />
      <CarouselSectionSecond />
      <div id="faq">
        <Blog />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <About />
      <Testimonials />
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
      <Route path="/politique-confidentialite" element={<LegalPrivacyPage />} />
    </Routes>
  )
}

export default App
