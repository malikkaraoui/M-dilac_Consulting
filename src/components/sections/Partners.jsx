import { motion } from 'framer-motion'

export default function Partners() {
    const partners = [
        {
            name: 'TariForm',
            href: 'https://tariform.ch',
            logo: '/logo_tariform.png'
        },
        {
            name: 'Medilec S.A.',
            href: 'https://www.medilec.ch',
            logo: '/Medilec.png'
        }
    ]

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-center mb-10"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">Nos partenaires</h2>
                </motion.div>
                <div className="flex flex-wrap justify-center gap-8">
                    {partners.map((partner, index) => (
                        <motion.a
                            key={partner.name}
                            href={partner.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
                            whileHover={{ scale: 1.05, y: -3 }}
                            style={{ willChange: 'transform' }}
                            className="flex items-center justify-center p-4 rounded-2xl border border-gray-100 hover:shadow-soft transition-shadow duration-200 bg-white text-center w-40 md:w-48"
                            aria-label={partner.name}
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-12 md:h-16 w-auto object-contain mx-auto"
                                loading="lazy"
                            />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
}
