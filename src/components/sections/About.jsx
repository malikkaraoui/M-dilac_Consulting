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
                            Je m'appelle <span className="font-semibold text-primary">Vincent</span>, fondateur de <span className="font-semibold text-primary">Médilac Consulting</span>. J'accompagne les médecins et professionnels de la santé dans leurs prises de décision stratégiques, avec une approche à la fois rigoureuse, humaine et orientée solutions.
                        </p>
                        
                        <p className="text-lg text-secondary leading-relaxed">
                            Dans un environnement exigeant et souvent complexe, mon rôle est de vous apporter de la <span className="font-semibold text-primary">clarté</span>. J'analyse vos enjeux avec précision et les transforme en stratégies concrètes, cohérentes et alignées avec votre réalité professionnelle et personnelle.
                        </p>
                        
                        <p className="text-lg text-secondary leading-relaxed">
                            Fort d'une connaissance approfondie des spécificités du milieu médical, je propose un accompagnement sur mesure, fondé sur l'écoute, la discrétion et une relation de confiance inscrite dans la durée.
                        </p>

                        {/* Philosophy Section */}
                        <div className="pt-6 border-t border-gray-200">
                            <h3 className="text-2xl font-bold text-primary mb-4">Ma philosophie</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span className="text-secondary">Comprendre en profondeur avant de conseiller</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span className="text-secondary">Simplifier sans jamais dénaturer</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span className="text-secondary">Construire des solutions pérennes et évolutives</span>
                                </li>
                            </ul>
                        </div>

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
