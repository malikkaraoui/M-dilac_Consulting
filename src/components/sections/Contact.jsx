import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ReCAPTCHA from 'react-google-recaptcha'
import { Button } from '../ui/Button'

export default function Contact() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState('idle') // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('')
    const [website, setWebsite] = useState('') // honeypot
    const [captchaToken, setCaptchaToken] = useState(null)
    const recaptchaRef = useRef(null)
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6Lcc0k0sAAAAAK0fw9IX5VkkHCWr2DlgteIDSzBZ'
    const captchaReady = Boolean(siteKey)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrorMessage('')

        // Basic validation
        if (!formData.nom || !formData.prenom || !formData.email || !formData.message) {
            alert('Veuillez remplir tous les champs')
            return
        }

        if (formData.message.length > 200) {
            alert('Le message ne doit pas dépasser 200 caractères')
            return
        }

        if (!captchaReady) {
            setErrorMessage('reCAPTCHA non configuré. Contactez l’administrateur.')
            setStatus('error')
            return
        }

        if (!captchaToken) {
            setErrorMessage('Veuillez compléter le reCAPTCHA avant d’envoyer le message.')
            setStatus('idle')
            return
        }

        setStatus('loading')

        try {
            const apiBase =
                (import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')) ||
                (typeof window !== 'undefined' && window.location.hostname === 'localhost'
                    ? 'https://contact-py5p4vwucq-ew.a.run.app'
                    : '/api')
            const response = await fetch(`${apiBase}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.prenom,
                    lastName: formData.nom,
                    email: formData.email,
                    message: formData.message,
                    website,
                    recaptchaToken: captchaToken
                })
            })

            const result = await response.json().catch(() => ({}))
            if (!response.ok || !result.ok) {
                throw new Error(result.error || 'SEND_FAILED')
            }

            setStatus('success')
            setFormData({ nom: '', prenom: '', email: '', message: '' })
            setWebsite('')
            setCaptchaToken(null)
            recaptchaRef.current?.reset()
            // Don't auto-reset status so the success message stays visible
        } catch (error) {
            console.error('Error adding document: ', error)
            setErrorMessage('Échec de l’envoi. Réessayez dans un instant.')
            setStatus('error')
        }
    }

    return (
        <section className="py-24 bg-white" id="contact">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ willChange: 'transform, opacity' }}
                    className="bg-primary rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="grid md:grid-cols-2 gap-12 relative z-10">
                        <div className="text-white">
                            <h2 className="text-3xl font-bold mb-4">Parlons de votre situation</h2>
                            <p className="text-blue-100 mb-8 leading-relaxed">
                                Que vous soyez en début de carrière ou à l'approche de la retraite, un premier échange ne vous engage à rien.
                            </p>
                            <div className="space-y-4 text-sm text-blue-200">
                                <p>📍 Rue de la Corraterie 10, 1204 Genève</p>
                                <a
                                    href="https://wa.me/41793938013"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-white transition-colors w-fit"
                                    aria-label="Ouvrir WhatsApp pour contacter le +41 79 393 80 13"
                                >
                                    <span aria-hidden>📞</span>
                                    <span className="underline underline-offset-4 decoration-white/30 hover:decoration-white">
                                        +41 79 393 80 13
                                    </span>
                                </a>
                                <a
                                    href="mailto:vincent.limbach@medilac.ch"
                                    className="flex items-center gap-2 hover:text-white transition-colors w-fit"
                                    aria-label="Envoyer un email à vincent.limbach@medilac.ch"
                                >
                                    <span aria-hidden>✉️</span>
                                    <span className="underline underline-offset-4 decoration-white/30 hover:decoration-white">
                                        vincent.limbach@medilac.ch
                                    </span>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/vincent-limbach-1329b660/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-white transition-colors w-fit"
                                    aria-label="LinkedIn"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M20.447 20.452H16.89v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.345V9h3.414v1.561h.046c.476-.9 1.636-1.85 3.368-1.85 3.599 0 4.265 2.368 4.265 5.451v6.29zM5.337 7.433c-1.144 0-2.069-.927-2.069-2.07 0-1.144.925-2.07 2.069-2.07 1.143 0 2.07.926 2.07 2.07 0 1.143-.927 2.07-2.07 2.07zM6.985 20.452H3.689V9h3.296v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    <span className="underline underline-offset-4 decoration-white/30 hover:decoration-white">
                                        LinkedIn
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

                                <div className="hidden">
                                    <label htmlFor="website">Website</label>
                                    <input
                                        id="website"
                                        type="text"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                                {captchaReady ? (
                                    <div className="flex justify-center">
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={siteKey}
                                            onChange={(token) => setCaptchaToken(token)}
                                            onExpired={() => setCaptchaToken(null)}
                                        />
                                    </div>
                                ) : (
                                    <p className="text-sm text-yellow-200 text-center">
                                        reCAPTCHA non configuré : ajoutez VITE_RECAPTCHA_SITE_KEY dans votre fichier .env.local
                                    </p>
                                )}
                                <Button
                                    type="submit"
                                    disabled={status === 'loading' || !captchaReady}
                                    className="w-full bg-white text-primary hover:bg-gray-100 shadow-none border-none disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'Envoi...' : 'Envoyer le message'}
                                </Button>
                                {status === 'error' && (
                                    <p className="text-red-300 text-sm text-center">
                                        {errorMessage || "Une erreur technique est survenue, mais votre message a peut-être été reçu. N'hésitez pas à nous contacter directement par email."}
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
