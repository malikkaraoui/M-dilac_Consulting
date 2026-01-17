import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import AbstractBackground from '../canvas/AbstractBackground'
import { ArrowRight, ShieldCheck, HeartPulse, Scale } from 'lucide-react'

// Fade up animation variant
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

export default function Hero() {
    return (
        <section className="relative w-full h-screen min-h-[800px] flex flex-col justify-center overflow-hidden">
            {/* 3D Background */}
            <AbstractBackground />

            <div className="container mx-auto px-6 relative z-10 pt-28 md:pt-20 [padding-top:calc(env(safe-area-inset-top)+7rem)] md:[padding-top:calc(env(safe-area-inset-top)+5rem)]">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div variants={fadeInUp} className="flex justify-center mb-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-gray-200 text-xs font-medium text-secondary backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            Indépendant • Sur mesure • Relation durable
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-6 leading-[1.1]"
                    >
                        Conseil stratégique et financier dédié aux <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">médecins</span> et professionnels de la santé.
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-xl md:text-2xl text-secondary mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Un accompagnement personnalisé pour chaque étape de votre carrière médicale.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button size="lg" className="rounded-full px-8 text-base shadow-lg shadow-accent/20" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Demander un échange <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="lg" className="rounded-full px-8 text-base" onClick={() => document.getElementById('method')?.scrollIntoView({ behavior: 'smooth' })}>
                            Découvrir notre méthode
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}

        </section>
    )
}
