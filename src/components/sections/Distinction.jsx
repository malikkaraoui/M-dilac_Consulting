import { motion } from 'framer-motion'
import { HeartPulse, Scale, CheckCircle, Users } from 'lucide-react'

const features = [
    {
        icon: HeartPulse,
        title: "Spécialisation médicale",
        desc: "Une expertise pointue des enjeux financiers des professionnels de santé."
    },
    {
        icon: Scale,
        title: "Approche indépendante",
        desc: "Des conseils objectifs, sans conflit d'intérêt avec les assureurs ou banques."
    },
    {
        icon: CheckCircle,
        title: "Solutions sur mesure",
        desc: "Chaque stratégie est construite autour de votre situation unique."
    },
    {
        icon: Users,
        title: "Accompagnement durable",
        desc: "Un partenaire de confiance qui vous suit à chaque étape de votre carrière."
    }
]

export default function Distinction() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">

                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-4">Ce qui nous distingue</h2>
                    <p className="text-secondary max-w-2xl mx-auto">Une approche dédiée, transparente et centrée sur vos intérêts.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-soft transition-all duration-300 border border-transparent hover:border-gray-100"
                        >
                            <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:text-accent transition-colors">
                                <feature.icon size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                            <p className="text-sm text-secondary leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
