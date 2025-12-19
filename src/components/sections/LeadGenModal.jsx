import { useState } from 'react'
import { Button } from '../ui/Button'
import { FileText, CheckCircle, ArrowRight } from 'lucide-react'

export default function LeadGenModal({ isOpen, onClose, theme }) {
    const [step, setStep] = useState('form') // 'form' | 'success'
    const [loading, setLoading] = useState(false)

    // Simulate API call
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setStep('success')
        }, 1500)
    }

    if (!theme) return null

    return (
        <div className="space-y-6">
            {step === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm text-secondary mb-4">
                        Remplissez ce formulaire pour recevoir votre guide PDF sur : <span className="font-semibold text-primary">{theme.title}</span>.
                    </p>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Prénom</label>
                        <input required type="text" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" placeholder="Vincent" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Email</label>
                        <input required type="email" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" placeholder="vincent@exemple.ch" />
                    </div>

                    <div className="flex items-start gap-2 pt-2">
                        <input required type="checkbox" id="consent" className="mt-1 accent-accent" />
                        <label htmlFor="consent" className="text-xs text-secondary leading-tight">
                            J'accepte d'être contacté par Médilac Consulting. Pas de spam, désinscription possible à tout moment.
                        </label>
                    </div>

                    <Button type="submit" className="w-full mt-4" disabled={loading}>
                        {loading ? 'Traitement...' : 'Accéder au PDF'}
                    </Button>
                </form>
            ) : (
                <div className="flex flex-col items-center text-center space-y-4 py-4">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
                        <CheckCircle size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-primary">Accès autorisé !</h4>
                    <p className="text-sm text-secondary">Votre guide est prêt à être téléchargé.</p>

                    <div className="w-full bg-gray-50 p-4 rounded-xl flex items-center gap-4 my-2 border border-gray-100">
                        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-red-500">
                            <FileText size={20} />
                        </div>
                        <div className="text-left flex-1">
                            <div className="font-medium text-sm text-primary truncate max-w-[200px]">{theme.title}.pdf</div>
                            <div className="text-xs text-secondary">1.2 MB</div>
                        </div>
                        <Button size="sm" variant="outline">Télécharger</Button>
                    </div>

                    <div className="pt-4 border-t border-gray-100 w-full">
                        <p className="text-xs text-secondary mb-3">Vous souhaitez aller plus loin ?</p>
                        <Button className="w-full" variant="secondary">
                            Demander un échange de 15 min
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
