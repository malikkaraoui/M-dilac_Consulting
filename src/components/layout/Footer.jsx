export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-1 items-center md:items-start">
                        <div className="flex items-center gap-2 font-bold text-lg text-primary">
                            <span>✤</span> Médilac Consulting
                        </div>
                        <p className="text-sm text-secondary">Conseil pour médecins et professionnels de santé.</p>
                    </div>

                    <div className="flex gap-8 text-sm text-secondary">
                        <a href="#" className="hover:text-primary transition-colors">Mentions légales</a>
                        <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    </div>

                    <div className="text-xs text-secondary/60">
                        © {new Date().getFullYear()} Médilac Consulting. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}
