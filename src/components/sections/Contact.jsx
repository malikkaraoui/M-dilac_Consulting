import { useState } from 'react'
import { Button } from '../ui/Button'
import { database } from '../../lib/firebase'
import { ref, set } from 'firebase/database'

export default function Contact() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState('idle') // idle, loading, success, error

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Basic validation
        if (!formData.nom || !formData.prenom || !formData.email || !formData.message) {
            alert('Veuillez remplir tous les champs')
            return
        }

        if (formData.message.length > 200) {
            alert('Le message ne doit pas dépasser 200 caractères')
            return
        }

        setStatus('loading')

        try {
            // Sanitize email to use as key (replace . with ,)
            const sanitizedEmail = formData.email.replace(/\./g, ',')
            const contactRef = ref(database, 'contacts/' + sanitizedEmail)

            await set(contactRef, {
                ...formData,
                timestamp: Date.now()
            })

            setStatus('success')
            setFormData({ nom: '', prenom: '', email: '', message: '' })
            // Don't auto-reset status so the success message stays visible
        } catch (error) {
            console.error('Error adding document: ', error)
            setStatus('error')
        }
    }

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
                                <a
                                    href="https://wa.me/41221234567"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-white transition-colors w-fit"
                                    aria-label="Ouvrir WhatsApp pour contacter le +41 22 123 45 67"
                                >
                                    <span aria-hidden>📞</span>
                                    <span className="underline underline-offset-4 decoration-white/30 hover:decoration-white">
                                        +41 22 123 45 67
                                    </span>
                                </a>
                                <a
                                    href="mailto:contact@medilac.ch"
                                    className="flex items-center gap-2 hover:text-white transition-colors w-fit"
                                    aria-label="Envoyer un email à contact@medilac.ch"
                                >
                                    <span aria-hidden>✉️</span>
                                    <span className="underline underline-offset-4 decoration-white/30 hover:decoration-white">
                                        contact@medilac.ch
                                    </span>
                                </a>
                            </div>
                        </div>

                        {status === 'success' ? (
                            <div className="bg-white/10 p-8 rounded-xl border border-white/20 text-center animate-fade-in flex flex-col items-center justify-center h-full">
                                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                                <p className="text-blue-100 mb-8">
                                    Nous avons bien reçu votre demande et vous répondrons dans les plus brefs délais.
                                </p>
                                <Button
                                    onClick={() => {
                                        setStatus('idle')
                                        setFormData({ nom: '', prenom: '', email: '', message: '' })
                                    }}
                                    className="bg-white text-primary hover:bg-gray-100"
                                >
                                    Envoyer un autre message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        placeholder="Nom"
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 transition-all"
                                    />
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        placeholder="Prénom"
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 transition-all"
                                    />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 transition-all"
                                />
                                <div className="relative">
                                    <textarea
                                        rows={3}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        maxLength={200}
                                        placeholder="Votre message... (max 200 caractères)"
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 transition-all"
                                    ></textarea>
                                    <span className="absolute bottom-2 right-2 text-xs text-blue-200">
                                        {formData.message.length}/200
                                    </span>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-white text-primary hover:bg-gray-100 shadow-none border-none disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'Envoi...' : 'Envoyer le message'}
                                </Button>
                                {status === 'error' && <p className="text-red-300 text-sm text-center">Une erreur technique est survenue, mais votre message a peut-être été reçu. N'hésitez pas à nous contacter directement par email.</p>}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
