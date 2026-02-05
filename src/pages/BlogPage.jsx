import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import Footer from '../components/layout/Footer';
import { cn } from '../lib/utils';

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
];

export default function BlogPage() {
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sticky Header */}
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
                        onClick={() => window.location.href = '/'}
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" /> Retour à l'accueil
                    </Button>
                </div>
            </nav>

            {/* Header */}
            <div className="bg-primary text-white pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Foire aux questions</h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        Les réponses aux questions les plus fréquentes sur la prévoyance,
                        la fiscalité et l'installation des médecins indépendants.
                    </p>
                </div>
            </div>

            {/* FAQ */}
            <div className="container mx-auto px-6 py-12">
                <div className="bg-white p-8 rounded-2xl border border-gray-100">
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
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
