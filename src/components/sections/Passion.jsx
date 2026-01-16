import { motion } from 'framer-motion'

export default function Passion() {
    return (
        <section className="py-24 bg-white" id="passion">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-4">Notre passion</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm"
                    >
                        <h3 className="text-xl font-bold text-primary mb-4">Notre passion</h3>
                        <p className="text-secondary leading-relaxed">
                            Ce qui nous passionne le plus chez Médilac Consulting, c&apos;est d&apos;aider les médecins à y voir clair dans des domaines complexes, afin qu&apos;ils puissent prendre des décisions sereines et cohérentes avec leurs objectifs de vie et leur pratique professionnelle. Au-delà des solutions d&apos;assurance, notre rôle consiste à écouter, comprendre et structurer. Chaque situation est unique, et nous attachons une grande importance à proposer des recommandations réellement adaptées, utiles et durables.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm"
                    >
                        <h3 className="text-xl font-bold text-primary mb-4">Ce que nous voulons vous apporter</h3>
                        <p className="text-secondary leading-relaxed">
                            Nous souhaitons avant tout transmettre à nos clients la tranquillité d&apos;esprit, la confiance dans les décisions prises, et le sentiment d&apos;être accompagnés par un partenaire indépendant, engagé et disponible sur le long terme. Notre objectif est que vous puissiez vous concentrer pleinement sur votre métier de médecin, en sachant que votre situation est maîtrisée et évolue de manière cohérente avec votre parcours.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
