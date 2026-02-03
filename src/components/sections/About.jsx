import { motion } from 'framer-motion'

export default function About() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="about">
            <div className="container mx-auto px-6 max-w-6xl">
                
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">À propos</h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    
                    {/* Photo Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ willChange: 'transform, opacity' }}
                        className="flex-shrink-0"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl opacity-30"></div>
                            <img
                                src="/vincent.png"
                                alt="Vincent, fondateur de Médilac Consulting"
                                className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-2xl"
                            />
                        </div>
                        <p className="text-center text-primary font-semibold mt-4">Vincent Limbach<br />Fondateur de Médilac Consulting</p>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        style={{ willChange: 'transform, opacity' }}
                        className="flex-1 space-y-6"
                    >
                        <p className="text-lg text-secondary leading-relaxed">
                            Nous accompagnons les médecins et les professionnels de la santé dans leurs prises de décision stratégiques, avec une approche à la fois rigoureuse, humaine et orientée solutions.
                        </p>

                        <p className="text-lg text-secondary leading-relaxed">
                            Dans un environnement exigeant et souvent complexe, notre rôle est d'apporter de la clarté. Nous analysons chaque situation avec précision afin de la transformer en stratégies concrètes, cohérentes et alignées avec la réalité professionnelle et personnelle de nos clients.
                        </p>

                        <p className="text-lg text-secondary leading-relaxed">
                            Forts d'une connaissance approfondie des spécificités du milieu médical, nous proposons un accompagnement sur mesure, fondé sur l'écoute, la discrétion et une relation de confiance inscrite dans la durée.
                        </p>

                        {/* Location */}
                        <div className="pt-4">
                            <p className="text-sm text-secondary italic">
                                📍 Basé à Genève, accompagnement en Suisse romande
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
