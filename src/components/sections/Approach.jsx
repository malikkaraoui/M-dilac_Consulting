import { motion } from 'framer-motion'
import { MessageCircle, FileBarChart, Ruler, Users } from 'lucide-react'

const steps = [
    {
        icon: MessageCircle,
        title: "Spécialisation médicale",
        desc: "Nous comprenons les enjeux spécifiques des médecins et adaptons nos conseils à leur réalité professionnelle."
    },
    {
        icon: FileBarChart,
        title: "Approche indépendante",
        desc: "Nos recommandations sont basées uniquement sur vos besoins et objectifs, sans conflit d'intérêts."
    },
    {
        icon: Ruler,
        title: "Solutions sur mesure",
        desc: "Chaque situation est unique : nous construisons des stratégies adaptées à votre carrière, votre cabinet et votre vie personnelle."
    },
    {
        icon: Users,
        title: "Accompagnement durable",
        desc: "Nous privilégions une relation de confiance sur le long terme, avec un interlocuteur unique à votre écoute."
    }
]

export default function Approach() {
    return (
        <section className="py-24 bg-white" id="method">
            <div className="container mx-auto px-6">

                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-4">Notre différence</h2>
                    <p className="text-secondary max-w-2xl mx-auto italic">
                        Ce qui nous distingue :
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-gray-100 -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
                                style={{ willChange: 'transform, opacity' }}
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
