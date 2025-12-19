import { motion } from 'framer-motion'
import { MessageCircle, FileBarChart, Handshake } from 'lucide-react'

const steps = [
    {
        icon: MessageCircle,
        title: "Écouter & Comprendre",
        desc: "Nous prenons le temps d'analyser votre situation globale, vos objectifs de carrière et vos aspirations personnelles."
    },
    {
        icon: FileBarChart,
        title: "Structurer & Prioriser",
        desc: "Nous auditons l'existant et construisons une stratégie sur mesure, en hiérarchisant les actions à fort impact."
    },
    {
        icon: Handshake,
        title: "Recommander & Accompagner",
        desc: "Nous mettons en place les solutions et restons à vos côtés pour les ajuster à chaque étape de votre vie."
    }
]

export default function Approach() {
    return (
        <section className="py-24 bg-white" id="method">
            <div className="container mx-auto px-6">

                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-4">Notre Approche</h2>
                    <p className="text-secondary max-w-2xl mx-auto italic">
                        “Nous aidons les médecins à y voir clair dans des domaines complexes pour leur offrir tranquillité d’esprit et confiance.”
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-gray-100 -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="flex flex-col items-center text-center bg-white"
                            >
                                <div className="w-24 h-24 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center mb-6 shadow-sm z-10">
                                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                                        <step.icon size={32} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                                <p className="text-secondary leading-relaxed text-sm">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
