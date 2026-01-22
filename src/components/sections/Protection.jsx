import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight } from 'lucide-react'

export default function Protection() {
    return (
        <section className="py-24 bg-white" id="expertise">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{ willChange: 'transform, opacity' }}
                        className="flex-1"
                    >
                        <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent">
                            <ShieldCheck size={24} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                            Êtes-vous correctement protégé par rapport à votre activité médicale ?
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                        style={{ willChange: 'transform, opacity' }}
                        className="flex-1"
                    >
                        <p className="text-lg text-secondary leading-relaxed mb-6">
                            RC professionnelle, prévoyance, protection du revenu, cabinet… Nous clarifions et structurons votre couverture pour vous offrir une totale tranquillité d'esprit.
                        </p>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center text-accent font-medium hover:text-accent/80 transition-colors group"
                        >
                            Faire le point sur ma situation <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
