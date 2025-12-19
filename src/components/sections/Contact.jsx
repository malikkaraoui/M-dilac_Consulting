import { Button } from '../ui/Button'

export default function Contact() {
    return (
        <section className="py-24 bg-white" id="contact">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-primary rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="grid md:grid-cols-2 gap-12 relative z-10">
                        <div className="text-white">
                            <h2 className="text-3xl font-bold mb-4">Parlons de votre situation</h2>
                            <p className="text-blue-100 mb-8 leading-relaxed">
                                Que vous soyez en début de carrière ou à l'approche de la retraite, un premier échange ne vous engage à rien.
                            </p>
                            <div className="space-y-4 text-sm text-blue-200">
                                <p>📍 Genève • Lausanne • Fribourg</p>
                                <p>📞 +41 22 123 45 67</p>
                                <p>✉️ contact@medilac.ch</p>
                            </div>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Nom" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 transition-all" />
                                <input type="text" placeholder="Prénom" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 transition-all" />
                            </div>
                            <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 transition-all" />
                            <textarea rows={3} placeholder="Votre message..." className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 transition-all"></textarea>

                            <Button className="w-full bg-white text-primary hover:bg-gray-100 shadow-none border-none">
                                Envoyer le message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
