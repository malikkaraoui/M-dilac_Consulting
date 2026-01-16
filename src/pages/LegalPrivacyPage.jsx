import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { cn } from '../lib/utils'
import Footer from '../components/layout/Footer'

export default function LegalPrivacyPage() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-primary/95 backdrop-blur-md shadow-lg py-3"
                        : "bg-primary py-5"
                )}
            >
                <div className="container mx-auto px-6">
                    <Button
                        variant="ghost"
                        className="text-white hover:text-white/80"
                        onClick={() => (window.location.href = '/')}
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" /> Retour à l'accueil
                    </Button>
                </div>
            </nav>

            <section className="pt-32 pb-24 bg-white" id="top">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                        Politique de confidentialité et protection des données
                    </h1>

                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-4">Mentions légales</h2>
                            <div className="text-secondary leading-relaxed space-y-2">
                                <p>Médilac Consulting</p>
                                <p>Raison individuelle</p>
                                <p>Siège : Rue de la Corraterie 10</p>
                                <p>CH-1204 Genève, Suisse</p>
                                <p>Email : vincent.limbach@medilac.ch</p>
                                <p>Téléphone : +41 79 393 80 13</p>
                                <p>Numéro IDE : CHE-219.824.205</p>
                                <p>Responsable du contenu :</p>
                                <p>Vincent Limbach</p>
                                <p>Hébergement</p>
                                <p>Infomaniak Network SA</p>
                                <p>Rue Eugène-Marziano 25</p>
                                <p>1227 Les Acacias (GE)</p>
                                <p>Suisse</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-4">Politique de confidentialité</h2>

                            <div className="space-y-6 text-secondary leading-relaxed">
                                <div>
                                    <h3 className="text-xl font-semibold text-primary mb-2">1. Généralités</h3>
                                    <p>
                                        Médilac Consulting attache une grande importance à la protection des données personnelles et traite les données conformément à la Loi fédérale sur la protection des données (LPD) en vigueur en Suisse, ainsi que, le cas échéant, au Règlement général sur la protection des données (RGPD).
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-primary mb-2">2. Données collectées</h3>
                                    <p>Les données personnelles collectées via ce site peuvent inclure :</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>nom et prénom</li>
                                        <li>adresse e-mail</li>
                                        <li>numéro de téléphone</li>
                                        <li>toute information transmise volontairement via le formulaire de contact</li>
                                    </ul>
                                    <p className="mt-2">Aucune donnée médicale sensible n’est collectée via le site internet.</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-primary mb-2">3. Finalité du traitement</h3>
                                    <p>Les données sont utilisées exclusivement pour :</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>répondre aux demandes de contact</li>
                                        <li>établir une relation professionnelle</li>
                                        <li>assurer le suivi des échanges</li>
                                    </ul>
                                    <p className="mt-2">Les données ne sont ni vendues ni transmises à des tiers sans consentement préalable.</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-primary mb-2">4. Conservation des données</h3>
                                    <p>
                                        Les données sont conservées uniquement pendant la durée nécessaire au traitement de la demande ou conformément aux obligations légales.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-primary mb-2">5. Droits des utilisateurs</h3>
                                    <p>Conformément à la législation applicable, vous disposez des droits suivants :</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>droit d’accès</li>
                                        <li>droit de rectification</li>
                                        <li>droit à l’effacement</li>
                                        <li>droit à la limitation du traitement</li>
                                    </ul>
                                    <p className="mt-2">Toute demande peut être adressée à :</p>
                                    <p>vincent.limbach@medilac.ch</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-primary mb-2">6. Sécurité et hébergement</h3>
                                    <p>
                                        Le site de Médilac Consulting est hébergé par Infomaniak Network SA, dont les serveurs sont situés en Suisse.
                                    </p>
                                    <p className="mt-2">
                                        Des mesures techniques et organisationnelles appropriées sont mises en œuvre afin de protéger les données contre tout accès non autorisé, perte ou divulgation.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-primary mb-2">7. Cookies</h3>
                                    <p>
                                        Ce site utilise des cookies afin d’assurer son bon fonctionnement et d’améliorer l’expérience utilisateur, notamment à des fins statistiques.
                                    </p>
                                    <p className="mt-2">
                                        Les cookies sont de petits fichiers enregistrés sur votre appareil. Vous pouvez à tout moment configurer votre navigateur pour refuser ou limiter les cookies. Le refus des cookies peut toutefois limiter certaines fonctionnalités du site.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="mt-12">
                        <a
                            href="#top"
                            className="inline-flex items-center text-accent font-medium hover:text-accent/80 transition-colors"
                        >
                            Retour en haut
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
