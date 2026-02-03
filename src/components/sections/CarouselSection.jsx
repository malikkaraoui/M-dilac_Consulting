import { useState, useEffect, useRef } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import { Shield, TrendingUp, Briefcase, FileText, Scale, Gavel, Stethoscope, Landmark } from 'lucide-react'
import { Button } from '../ui/Button'

// Premier carrousel (ANALYSE 3)
const FIRST_CARDS = [
    {
        id: 1,
        title: "Analyse des cyberattaques en Suisse",
        icon: Shield,
        desc: "Cybersécurité et risques numériques.",
        pdf: "/PDF/ANALYSE 3/Analyse-Cyberattaques-en-Suisse.pdf"
    },
    {
        id: 2,
        title: "Boostez votre retraite",
        icon: TrendingUp,
        desc: "Stratégies pour renforcer votre prévoyance.",
        pdf: "/PDF/ANALYSE 3/Boostez-votre-retraite.pdf"
    },
    {
        id: 3,
        title: "Comment lancer votre cabinet médical",
        icon: Briefcase,
        desc: "Les étapes clés pour démarrer sereinement.",
        pdf: "/PDF/ANALYSE 3/Comment-lancer-votre-cabinet-medical.pdf"
    },
    {
        id: 4,
        title: "Hypothèques pour médecins",
        icon: Landmark,
        desc: "Solutions de financement immobilier adaptées.",
        pdf: "/PDF/ANALYSE 3/Hypotheques-pour-Medecins.pdf"
    },
    {
        id: 5,
        title: "Optimisation des structures juridiques",
        icon: Gavel,
        desc: "Choisir la structure adaptée au cabinet.",
        pdf: "/PDF/ANALYSE 3/Optimisation-des-Structures-Juridiques-pour-Cabinets-Medicaux.pdf"
    },
    {
        id: 6,
        title: "Planification financière pour médecins",
        icon: FileText,
        desc: "Construire une stratégie patrimoniale solide.",
        pdf: "/PDF/ANALYSE 3/Planification-Financiere-pour-Medecins.pdf"
    },
    {
        id: 7,
        title: "Prévoyance et fiscalité",
        icon: Scale,
        desc: "Le duo gagnant pour votre avenir.",
        pdf: "/PDF/ANALYSE 3/Prevoyance-and-Fiscalite-Le-Duo-Gagnant-pour-Votre-Avenir.pdf"
    },
    {
        id: 8,
        title: "Reprise d'un cabinet médical",
        icon: Stethoscope,
        desc: "Les clés pour reprendre un cabinet avec succès.",
        pdf: "/PDF/ANALYSE 3/Reprise-dun-cabinet-medical.pdf"
    }
]

// Deuxième carrousel (analyse 2)
const SECOND_CARDS = [
    {
        id: 7,
        title: "Analyse des cyberattaques en Suisse",
        icon: Shield,
        desc: "Cybersécurité et risques numériques.",
        pdf: "/PDF/analyse 2/Analyse-Cyberattaques-en-Suisse.pdf"
    },
    {
        id: 8,
        title: "Comment lancer votre cabinet médical",
        icon: Briefcase,
        desc: "Les étapes clés pour démarrer sereinement.",
        pdf: "/PDF/analyse 2/Comment-lancer-votre-cabinet-medical.pdf"
    },
    {
        id: 9,
        title: "Hypothèques pour médecins",
        icon: Landmark,
        desc: "Solutions de financement immobilier adaptées.",
        pdf: "/PDF/assurance/Hypotheques-pour-Medecins.pdf"
    },
    {
        id: 10,
        title: "La balance du TARDOC",
        icon: Scale,
        desc: "Comprendre les enjeux tarifaires.",
        pdf: "/PDF/analyse 2/La-balance-du-Tardoc.pdf"
    },
    {
        id: 11,
        title: "Optimisation des structures juridiques",
        icon: Gavel,
        desc: "Choisir la structure adaptée au cabinet.",
        pdf: "/PDF/analyse 2/Optimisation-des-Structures-Juridiques-pour-Cabinets-Medicaux.pdf"
    },
    {
        id: 12,
        title: "Planification financière pour médecins",
        icon: FileText,
        desc: "Construire une stratégie patrimoniale solide.",
        pdf: "/PDF/analyse 2/Planification-Financiere-pour-Medecins.pdf"
    },
    {
        id: 13,
        title: "Prévoyance et fiscalité",
        icon: TrendingUp,
        desc: "Le duo gagnant pour votre avenir.",
        pdf: "/PDF/analyse 2/Prevoyance-and-Fiscalite-Le-Duo-Gagnant-pour-Votre-Avenir.pdf"
    }
]

function CarouselRing({ cards, visibleCardCount }) {
    const [isAnimating, setIsAnimating] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const isDraggingRef = useRef(false)
    const rotation = useMotionValue(0)
    const wheelTimeoutRef = useRef(null)
    const animationRef = useRef(null)

    const radius = 480
    const angleStep = 360 / visibleCardCount
    const dragThreshold = 80

    const computeOpacity = (slotIndex, rotationValue) => {
        const angle = slotIndex * angleStep + rotationValue
        const normalized = ((angle % 360) + 540) % 360 - 180
        const depth = Math.max(0, Math.cos((normalized * Math.PI) / 180))
        return 0.3 + depth * 0.7
    }

    const slotOpacities = Array.from({ length: visibleCardCount }).map((_, index) =>
        useTransform(rotation, (v) => computeOpacity(index, v))
    )

    useEffect(() => {
        let interval
        if (!isPaused && !isAnimating) {
            interval = setInterval(() => {
                rotateOnce('next')
            }, 3000)
        }
        return () => clearInterval(interval)
    }, [isPaused, isAnimating])

    const handleCardClick = (card) => {
        if (isDraggingRef.current) return
        window.open(card.pdf, '_blank', 'noopener,noreferrer')
    }

    const rotateOnce = (direction) => {
        if (isAnimating) return
        setIsAnimating(true)
        const delta = direction === 'next' ? -angleStep : angleStep
        if (animationRef.current) animationRef.current.stop()
        const animation = animate(rotation, rotation.get() + delta, {
            type: "spring",
            stiffness: 40,
            damping: 15,
            onComplete: () => {
                const normalized = ((rotation.get() % 360) + 360) % 360
                rotation.set(normalized)
                setIsAnimating(false)
            }
        })
        animationRef.current = animation
        return () => animation.stop()
    }

    const snapToNearest = () => {
        const current = rotation.get()
        const steps = Math.round(current / angleStep)
        if (steps === 0) {
            rotation.set(0)
            return
        }
        setIsAnimating(true)
        const target = steps * angleStep
        if (animationRef.current) animationRef.current.stop()
        const animation = animate(rotation, target, {
            type: "spring",
            stiffness: 60,
            damping: 18,
            onComplete: () => {
                const normalized = ((target % 360) + 360) % 360
                rotation.set(normalized)
                setIsAnimating(false)
            }
        })
        animationRef.current = animation
    }

    const nextCard = () => rotateOnce('next')
    const prevCard = () => rotateOnce('prev')

    return (
        <motion.div
            className="relative h-[600px] w-full flex items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing touch-pan-y"
            onPanStart={() => {
                setIsPaused(true)
                isDraggingRef.current = true
                if (animationRef.current) animationRef.current.stop()
                setIsAnimating(false)
            }}
            onPan={(_, info) => {
                rotation.set(rotation.get() + info.delta.x * 0.4)
            }}
            onPanEnd={(_, info) => {
                setIsPaused(false)
                if (animationRef.current) animationRef.current.stop()
                if (Math.abs(info.offset.x) > dragThreshold) {
                    snapToNearest()
                } else {
                    const animation = animate(rotation, 0, { type: "spring", stiffness: 80, damping: 20 })
                    animationRef.current = animation
                }
                setTimeout(() => {
                    isDraggingRef.current = false
                }, 50)
            }}
            onWheel={(e) => {
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                    e.preventDefault()
                    setIsPaused(true)
                    if (animationRef.current) animationRef.current.stop()
                    setIsAnimating(false)
                    rotation.set(rotation.get() - e.deltaX * 0.6)
                    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current)
                    wheelTimeoutRef.current = setTimeout(() => {
                        snapToNearest()
                        setIsPaused(false)
                    }, 200)
                }
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <motion.div
                className="relative w-[180px] h-[260px] md:w-[240px] md:h-[340px] preserve-3d"
                style={{ rotateY: rotation, transformStyle: 'preserve-3d' }}
            >
                {Array.from({ length: visibleCardCount }).map((_, index) => {
                    const card = cards[index % cards.length]
                    const angle = index * angleStep
                    return (
                        <motion.div
                            key={`${card.id}-${index}`}
                            className="absolute inset-0 bg-white rounded-2xl p-4 md:p-5 shadow-xl border-2 border-gray-200 flex flex-col items-center text-center backface-visible transition-colors select-none hover:border-accent/50"
                            style={{
                                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                opacity: slotOpacities[index]
                            }}
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/5 rounded-xl flex items-center justify-center text-accent shrink-0">
                                <card.icon size={20} className="md:w-6 md:h-6" />
                            </div>
                            <div className="flex-1 flex flex-col justify-center py-2 md:py-3">
                                <h3 className="text-sm md:text-base font-bold text-primary mb-1 line-clamp-2">{card.title}</h3>
                                <p className="text-[10px] md:text-xs text-secondary line-clamp-2">{card.desc}</p>
                            </div>
                            <Button
                                variant="outline"
                                className="w-full shrink-0 text-xs md:text-sm py-1.5 md:py-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCardClick(card);
                                }}
                            >
                                Télécharger le PDF
                            </Button>
                        </motion.div>
                    )
                })}
            </motion.div>

            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 pointer-events-none z-20">
                <Button
                    onClick={prevCard}
                    variant="secondary"
                    className="pointer-events-auto rounded-full w-12 h-12 p-0 shadow-lg bg-white/80 backdrop-blur hover:bg-white text-primary border border-gray-100 flex items-center justify-center text-lg"
                >
                    ←
                </Button>
                <Button
                    onClick={nextCard}
                    variant="secondary"
                    className="pointer-events-auto rounded-full w-12 h-12 p-0 shadow-lg bg-white/80 backdrop-blur hover:bg-white text-primary border border-gray-100 flex items-center justify-center text-lg"
                >
                    →
                </Button>
            </div>
        </motion.div>
    )
}

export function CarouselSectionFirst() {
    return (
        <section className="py-32 bg-white overflow-hidden" id="themes">
            <div className="container mx-auto px-6 text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Explorez les Thématiques</h2>
                <p className="text-secondary max-w-xl mx-auto text-lg">Accédez directement à nos guides PDF.</p>
            </div>

            <CarouselRing cards={FIRST_CARDS} visibleCardCount={8} />
        </section>
    )
}

export function CarouselSectionSecond() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Analyses & Conseils</h2>
                <p className="text-secondary max-w-xl mx-auto text-lg">L'actualité financière décryptée pour les médecins.</p>
            </div>
            <CarouselRing cards={SECOND_CARDS} visibleCardCount={7} />
        </section>
    )
}
