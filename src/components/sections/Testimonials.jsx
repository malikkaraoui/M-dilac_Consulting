import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            quote: "Médilac Consulting a pris le temps de comprendre ma situation unique et m'a proposé des solutions d'assurance parfaitement adaptées à mes besoins. Je me sens en confiance et bien protégé.",
            name: "Dre Laila Jaaidi",
            title: "Psychiatre"
        },
        {
            id: 2,
            quote: "L'équipe de Médilac Consulting est toujours disponible pour répondre à mes questions et me conseiller. Leur expertise est inestimable, surtout lorsque l'on est occupé par sa pratique médicale.",
            name: "Dr Antoine Homsy",
            title: "Chirurgien"
        },
        {
            id: 3,
            quote: "Je recommande vivement Médilac Consulting à tous mes collègues. Leur approche personnalisée et leur connaissance du secteur de la santé font toute la différence.",
            name: "Dr Raphaël Meyer",
            title: "Chirurgien"
        }
    ]

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Ce que disent nos clients</h2>
                    <p className="text-secondary text-lg max-w-2xl mx-auto">
                        La confiance de médecins qui nous ont fait confiance pour leur protection et leur avenir.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                            whileHover={{ 
                                y: -6,
                                transition: { duration: 0.2, ease: "easeOut" } 
                            }}
                            style={{ willChange: 'transform' }}
                            className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-xl transition-shadow duration-200 border border-gray-100 hover:border-accent/20 cursor-pointer"
                        >
                            <div className="flex items-start mb-6">
                                <Quote className="w-10 h-10 text-accent/20 flex-shrink-0" />
                            </div>
                            <p className="text-secondary mb-6 leading-relaxed italic">
                                "{testimonial.quote}"
                            </p>
                            <div className="pt-4 border-t border-gray-100">
                                <p className="font-bold text-primary">{testimonial.name}</p>
                                <p className="text-sm text-secondary">{testimonial.title}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
