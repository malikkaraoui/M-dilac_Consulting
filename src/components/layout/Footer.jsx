import { Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-1 items-center md:items-start">
                        <div className="flex items-center gap-2 font-bold text-lg text-primary">
                            <img src="/logo_medilac.png" alt="Médilac Consulting" className="h-16 w-auto object-contain" />
                        </div>
                        <p className="text-sm text-secondary">Conseil pour médecins et professionnels de la santé.</p>
                        <p className="text-xs text-secondary/70">FINMA de Médilac Consulting : F01540914</p>
                    </div>

                    <div className="flex gap-8 text-sm text-secondary items-center">
                        <a href="#" className="hover:text-primary transition-colors">Mentions légales</a>
                        <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
                        <a
                            href="https://www.linkedin.com/in/vincent-limbach-1329b660/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#0A66C2] transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
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
