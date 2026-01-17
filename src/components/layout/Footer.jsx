import { Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-1 items-center md:items-start">
                        <Link
                            to="/"
                            className="flex items-center gap-2 font-bold text-lg text-primary"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            aria-label="Retour à l'accueil"
                        >
                            <img src="/logo_medilac.png" alt="Médilac Consulting" className="h-16 w-auto object-contain" />
                        </Link>
                        <p className="text-sm text-secondary text-center md:text-left">Conseil pour médecins et professionnels de la santé.</p>
                        <p className="text-xs text-secondary/70">FINMA de Médilac Consulting : F01540914</p>
                    </div>

                    <div className="flex gap-8 text-sm text-secondary items-center">
                        <Link to="/politique-confidentialite" className="hover:text-primary transition-colors">Mentions légales</Link>
                        <a
                            href="https://www.linkedin.com/in/vincent-limbach-1329b660/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0A66C2] transition-transform hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M20.447 20.452H16.89v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.345V9h3.414v1.561h.046c.476-.9 1.636-1.85 3.368-1.85 3.599 0 4.265 2.368 4.265 5.451v6.29zM5.337 7.433c-1.144 0-2.069-.927-2.069-2.07 0-1.144.925-2.07 2.069-2.07 1.143 0 2.07.926 2.07 2.07 0 1.143-.927 2.07-2.07 2.07zM6.985 20.452H3.689V9h3.296v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>

                    <div className="text-xs text-secondary/60">
                        © {new Date().getFullYear()} Médilac Consulting. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}
