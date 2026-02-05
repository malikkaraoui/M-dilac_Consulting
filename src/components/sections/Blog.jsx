import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqItems = [
    {
        question: "Quand dois-je commencer à planifier ma prévoyance ?",
        answer: "Le plus tôt possible ! Idéalement dès le début de votre activité indépendante. Plus vous commencez tôt, plus vous bénéficiez de l'effet des intérêts composés et plus votre cotisation mensuelle sera faible pour atteindre vos objectifs."
    },
    {
        question: "Comment évaluer le prix d'un cabinet médical à reprendre ?",
        answer: "L'évaluation comprend plusieurs éléments : le goodwill (clientèle), le matériel médical, les locaux, et les contrats en cours. En général, le goodwill représente 70-100% du chiffre d'affaires annuel. Il est essentiel de faire appel à un expert pour une évaluation objective."
    },
    {
        question: "Quelles sont les principales déductions fiscales pour un médecin indépendant ?",
        answer: "Vous pouvez déduire : les frais professionnels (loyer, matériel, personnel), les cotisations au 2ème et 3ème pilier, les frais de formation continue, les assurances professionnelles, les intérêts sur emprunts professionnels, et une partie de vos frais de véhicule si usage professionnel."
    },
    {
        question: "Quelle couverture d'assurance perte de gain choisir ?",
        answer: "Privilégiez une couverture de 80% de votre revenu avec un délai d'attente adapté à vos réserves (30, 60 ou 90 jours). Vérifiez les exclusions, notamment pour les affections psychiques, et optez pour une durée de versement jusqu'à l'âge de la retraite."
    },
    {
        question: "À qui s’adresse Médilac Consulting ?",
        answer: "Médilac Consulting s’adresse aux médecins et aux professionnels paramédicaux exerçant en Suisse, qu’ils soient indépendants, associés ou salariés, ainsi qu’aux cabinets et structures de soins. Nous accompagnons aussi bien les professionnels en début d’activité que ceux disposant déjà d’une structure établie."
    },
    {
        question: "Puis-je conserver mes assurances ou partenaires actuels ?",
        answer: "Oui. Notre rôle n’est pas de tout changer, mais d’analyser l’existant et de l’optimiser si nécessaire. Vous restez libre de conserver vos partenaires actuels."
    }
]

export default function Blog() {
    const [openFaqIndex, setOpenFaqIndex] = useState(null)

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index)
    }

    return (
        <section className="py-24 bg-gray-50" id="faq">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-primary mb-2">Foire aux questions</h2>
                    <p className="text-secondary">Les réponses aux questions les plus fréquentes</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                    className="bg-white p-8 rounded-2xl border border-gray-100"
                >
                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <div
                                key={index}
                                className="border border-gray-100 rounded-xl overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-primary pr-4">{item.question}</span>
                                    {openFaqIndex === index ? (
                                        <ChevronUp className="w-5 h-5 text-accent shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-secondary shrink-0" />
                                    )}
                                </button>
                                {openFaqIndex === index && (
                                    <div className="px-6 pb-4 text-secondary">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
