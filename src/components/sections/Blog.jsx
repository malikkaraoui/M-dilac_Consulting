import { ArrowRight, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

const articles = [
    {
        tag: "Fiscalité",
        title: "Optimiser sa fiscalité en tant que médecin indépendant",
        date: "12 Oct, 2025"
    },
    {
        tag: "Installation",
        title: "Reprendre un cabinet : les pièges à éviter",
        date: "08 Oct, 2025"
    },
    {
        tag: "Prévoyance",
        title: "Comprendre le 3ème pilier bancaire vs assurance",
        date: "25 Sep, 2025"
    }
]

export default function Blog() {
    return (
        <section className="py-24 bg-gray-50" id="blog">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-2">Analyses & Conseils</h2>
                        <p className="text-secondary">L'actualité financière décryptée pour les médecins.</p>
                    </div>
                    <Link to="/blog">
                        <Button variant="ghost" className="hidden md:inline-flex">
                            Voir tous les articles <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-soft transition-all group cursor-pointer">
                            <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-semibold text-secondary rounded-full mb-4">
                                {article.tag}
                            </span>
                            <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                                {article.title}
                            </h3>
                            <div className="flex items-center text-xs text-secondary/60 mt-auto pt-4">
                                <Calendar size={14} className="mr-2" /> {article.date}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/blog">
                        <Button variant="ghost">Voir tous les articles</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
