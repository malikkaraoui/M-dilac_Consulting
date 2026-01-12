import { useState, useEffect } from 'react';
import { Calendar, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import Footer from '../components/layout/Footer';
import { cn } from '../lib/utils';

const blogArticles = [
    {
        id: 1,
        tag: "Fiscalité",
        title: "Optimiser sa fiscalité en tant que médecin indépendant",
        date: "12 Oct, 2025",
        excerpt: "Découvrez les stratégies essentielles pour réduire votre charge fiscale tout en respectant la législation suisse.",
        content: "La fiscalité des médecins indépendants en Suisse présente des opportunités d'optimisation importantes. Que vous soyez en début de carrière ou expérimenté, comprendre les déductions possibles et la planification fiscale est crucial.",
        link: "#fiscalite"
    },
    {
        id: 2,
        tag: "Installation",
        title: "Reprendre un cabinet : les pièges à éviter",
        date: "08 Oct, 2025",
        excerpt: "Les points de vigilance lors de la reprise d'un cabinet médical pour éviter les erreurs coûteuses.",
        content: "La reprise d'un cabinet médical est une étape majeure. De l'évaluation du goodwill à la vérification des contrats en cours, plusieurs aspects nécessitent une attention particulière.",
        link: "#installation"
    },
    {
        id: 3,
        tag: "Prévoyance",
        title: "Comprendre le 3ème pilier bancaire vs assurance",
        date: "25 Sep, 2025",
        excerpt: "Analyse comparative des solutions de prévoyance pour faire le meilleur choix selon votre situation.",
        content: "Le 3ème pilier est un élément clé de la prévoyance en Suisse. Choisir entre la solution bancaire et l'assurance dépend de nombreux facteurs personnels et professionnels.",
        link: "#prevoyance"
    },
    {
        id: 4,
        tag: "Gestion",
        title: "Structurer sa société médicale : SARL ou raison individuelle ?",
        date: "15 Sep, 2025",
        excerpt: "Les avantages et inconvénients de chaque forme juridique pour votre activité médicale.",
        content: "Le choix de la structure juridique a des implications fiscales, sociales et patrimoniales importantes pour un médecin.",
        link: "#gestion"
    },
    {
        id: 5,
        tag: "Investissement",
        title: "Diversifier son patrimoine : immobilier médical",
        date: "01 Sep, 2025",
        excerpt: "Comment investir intelligemment dans l'immobilier professionnel médical.",
        content: "L'investissement dans l'immobilier médical peut offrir des avantages fiscaux et patrimoniaux intéressants.",
        link: "#investissement"
    },
    {
        id: 6,
        tag: "Prévoyance",
        title: "Assurance perte de gain : bien choisir sa couverture",
        date: "20 Août, 2025",
        excerpt: "Les critères essentiels pour sélectionner une assurance perte de gain adaptée à votre pratique.",
        content: "Une protection adéquate en cas d'incapacité de travail est fondamentale pour les médecins indépendants.",
        link: "#prevoyance"
    },
    {
        id: 7,
        tag: "Fiscalité",
        title: "Déductions fiscales pour le matériel médical",
        date: "10 Août, 2025",
        excerpt: "Maximiser vos déductions fiscales sur les investissements en équipement médical.",
        content: "Les investissements en matériel médical peuvent être optimisés fiscalement avec une bonne planification.",
        link: "#fiscalite"
    },
    {
        id: 8,
        tag: "Retraite",
        title: "Préparer sa retraite en tant que médecin indépendant",
        date: "28 Juil, 2025",
        excerpt: "Les étapes clés pour assurer votre sécurité financière à la retraite.",
        content: "La planification de la retraite nécessite une approche structurée et anticipée pour les médecins indépendants.",
        link: "#retraite"
    },
    {
        id: 9,
        tag: "Installation",
        title: "Financer l'ouverture de son cabinet médical",
        date: "15 Juil, 2025",
        excerpt: "Options de financement et stratégies pour démarrer votre activité en toute sérénité.",
        content: "L'ouverture d'un cabinet nécessite un financement adapté et une bonne gestion de trésorerie.",
        link: "#installation"
    }
];

const faqItems = [
    {
        question: "Quand dois-je commencer à planifier ma prévoyance ?",
        answer: "Le plus tôt possible ! Idéalement dès le début de votre activité indépendante. Plus vous commencez tôt, plus vous bénéficiez de l'effet des intérêts composés et plus votre cotisation mensuelle sera faible pour atteindre vos objectifs."
    },
    {
        question: "Quelle est la différence entre le 2ème et le 3ème pilier ?",
        answer: "Le 2ème pilier (LPP) est obligatoire pour les salariés et facultatif pour les indépendants. Le 3ème pilier est une prévoyance privée facultative qui offre des avantages fiscaux importants. Pour les médecins indépendants, le 3ème pilier lié (3a) permet de déduire jusqu'à CHF 7'056 par an (montant 2025)."
    },
    {
        question: "Comment évaluer le prix d'un cabinet à reprendre ?",
        answer: "L'évaluation comprend plusieurs éléments : le goodwill (clientèle), le matériel médical, les locaux, et les contrats en cours. En général, le goodwill représente 70-100% du chiffre d'affaires annuel. Il est essentiel de faire appel à un expert pour une évaluation objective."
    },
    {
        question: "Quelles sont les principales déductions fiscales pour un médecin indépendant ?",
        answer: "Vous pouvez déduire : les frais professionnels (loyer, matériel, personnel), les cotisations au 2ème et 3ème pilier, les frais de formation continue, les assurances professionnelles, les intérêts sur emprunts professionnels, et une partie de vos frais de véhicule si usage professionnel."
    },
    {
        question: "Quelle couverture d'assurance perte de gain choisir ?",
        answer: "Privilégiez une couverture de 80% de votre revenu avec un délai d'attente adapté à vos réserves (30, 60 ou 90 jours). Vérifiez les exclusions, notamment pour les affections psychiques, et optez pour une durée de versement jusqu'à l'âge de la retraite."
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Analyses & Conseils</h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        L'actualité financière décryptée pour les médecins. 
                        Conseils pratiques et analyses approfondies pour optimiser votre situation.
                    </p>
                </div>
            </div>

            {/* Articles */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {blogArticles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-soft transition-all group cursor-pointer"
                        >
                            <span className="inline-block px-3 py-1 bg-accent/10 text-xs font-semibold text-accent rounded-full mb-4">
                                {article.tag}
                            </span>
                            <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-secondary text-sm mb-4">{article.excerpt}</p>
                            <div className="flex items-center text-xs text-secondary/60 mt-auto pt-4 border-t border-gray-100">
                                <Calendar size={14} className="mr-2" /> {article.date}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Ressources utiles */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 mb-16">
                    <h2 className="text-2xl font-bold text-primary mb-6">Ressources utiles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-primary mb-3">Institutions officielles</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="https://www.fmh.ch" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        FMH - Fédération des médecins suisses
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.admin.ch/gov/fr/accueil.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        Administration fédérale suisse
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.ahv-iv.ch" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        AVS/AI - Assurances sociales
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.estv.admin.ch" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        AFC - Administration fédérale des contributions
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-primary mb-3">Prévoyance & Assurances</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="https://www.ch.ch/fr/travail/independance-professionnelle/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        Guide de la prévoyance professionnelle
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.bsv.admin.ch" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        Office fédéral des assurances sociales
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.ahv-iv.ch/fr/Contacts/Caisses-cantonales-de-compensation" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        Caisse de compensation Roko
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-primary mb-2">Foire aux questions</h2>
                    <p className="text-secondary mb-8">Les réponses aux questions les plus fréquentes</p>
                    
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
