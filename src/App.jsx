import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import Protection from './components/sections/Protection'
import Distinction from './components/sections/Distinction'
import CarouselSection from './components/sections/CarouselSection'
import Approach from './components/sections/Approach'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Layout>
      <Hero />
      <Protection />
      <Distinction />
      <CarouselSection />
      <Approach />
      <Blog />
      <Contact />
      <Footer />
    </Layout>
  )
}

export default App
