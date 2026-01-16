import { useState, useEffect, useRef } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import { Shield, TrendingUp, Anchor, Briefcase, FileText, Activity, Scale, Gavel, Building, Stethoscope, Landmark, ShieldCheck } from 'lucide-react'
import { Button } from '../ui/Button'

const CARDS = [
    {
        id: 1,
        title: "Analyse des cyberattaques en Suisse",
        icon: Shield,
        desc: "Cybersécurité et risques numériques.",
        pdf: "/PDF/Analyse-Cyberattaques-en-Suisse.pdf"
    },
    {
        id: 2,
        title: "Assurance perte de gain",
        icon: Anchor,
        desc: "Protéger vos revenus en cas d'incapacité.",
        pdf: "/PDF/Assurance-Perte-de-Gain.pdf"
    },
    {
        id: 3,
        title: "Boostez votre retraite",
        icon: TrendingUp,
        desc: "Stratégies pour renforcer votre prévoyance.",
        pdf: "/PDF/Boostez-votre-retraite.pdf"
    },
    {
        id: 4,
        title: "Comment lancer votre cabinet médical",
        icon: Briefcase,
        desc: "Les étapes clés pour démarrer sereinement.",
        pdf: "/PDF/Comment-lancer-votre-cabinet-medical.pdf"
    },
    {
        id: 5,
        title: "Hypothèques pour médecins",
        icon: Landmark,
        desc: "Solutions de financement immobilier adaptées.",
        pdf: "/PDF/Hypothèques-pour-Medecins.pdf"
    },
    {
        id: 6,
        title: "Responsabilité civile professionnelle",
        icon: ShieldCheck,
        desc: "Couverture essentielle des médecins indépendants.",
        pdf: "/PDF/La-Responsabilite-Civile-Professionnelle-pour-Medecins-Independants.pdf"
    },
    {
        id: 7,
        title: "La balance du TARDOC",
        icon: Scale,
        desc: "Comprendre les enjeux tarifaires.",
        pdf: "/PDF/La-balance-du-Tardoc.pdf"
    },
    {
        id: 8,
        title: "Les méandres de la LPP",
        icon: FileText,
        desc: "Décryptage de la prévoyance professionnelle.",
        pdf: "/PDF/Les-Meandres-de-la-LPP.pdf"
    },
    {
        id: 9,
        title: "Les assurances sociales en Suisse",
        icon: Building,
        desc: "Panorama des protections sociales.",
        pdf: "/PDF/Les-assurances-sociales-en-Suisse.pdf"
    },
    {
        id: 10,
        title: "Optimisation des structures juridiques",
        icon: Gavel,
        desc: "Choisir la structure adaptée au cabinet.",
        pdf: "/PDF/Optimisation-des-Structures-Juridiques-pour-Cabinets-Medicaux.pdf"
    },
    {
        id: 11,
        title: "Planification financière pour médecins",
        icon: FileText,
        desc: "Construire une stratégie patrimoniale solide.",
        pdf: "/PDF/Planification-Financiere-pour-Medecins.pdf"
    },
    {
        id: 12,
        title: "Prévoyance et fiscalité",
        icon: TrendingUp,
        desc: "Le duo gagnant pour votre avenir.",
        pdf: "/PDF/Prevoyance-et-Fiscalite-Le-Duo-Gagnant-pour-Votre-Avenir.pdf"
    },
    {
        id: 13,
        title: "Protection juridique pour médecins",
        icon: Stethoscope,
        desc: "Sécuriser votre activité médicale.",
        pdf: "/PDF/Protection-Juridique-pour-Medecins.pdf"
    }
]

export default function CarouselSection() {
    const [baseIndex, setBaseIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const isDraggingRef = useRef(false)
    const rotation = useMotionValue(0)
    const wheelTimeoutRef = useRef(null)

    // Config
    const visibleCardCount = 6
    const radius = 350 // Radius of the carousel
    const angleStep = 360 / visibleCardCount
    const dragThreshold = 80

    const computeOpacity = (slotIndex, rotationValue) => {
        const angle = slotIndex * angleStep + rotationValue
        const normalized = ((angle % 360) + 540) % 360 - 180
        const depth = Math.max(0, Math.cos((normalized * Math.PI) / 180))
        return 0.3 + depth * 0.7
    }

    const slot0Opacity = useTransform(rotation, (v) => computeOpacity(0, v))
    const slot1Opacity = useTransform(rotation, (v) => computeOpacity(1, v))
    const slot2Opacity = useTransform(rotation, (v) => computeOpacity(2, v))
    const slot3Opacity = useTransform(rotation, (v) => computeOpacity(3, v))
    const slot4Opacity = useTransform(rotation, (v) => computeOpacity(4, v))
    const slot5Opacity = useTransform(rotation, (v) => computeOpacity(5, v))
    const slotOpacities = [slot0Opacity, slot1Opacity, slot2Opacity, slot3Opacity, slot4Opacity, slot5Opacity]

    // Auto-rotation
    useEffect(() => {
        let interval;
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
        const animation = animate(rotation, rotation.get() + delta, {
            type: "spring",
            stiffness: 40,
            damping: 15,
            onComplete: () => {
                setBaseIndex((prev) => {
                    const shift = direction === 'next' ? 1 : -1
                    return (prev + shift + CARDS.length) % CARDS.length
                })
                rotation.set(0)
                setIsAnimating(false)
            }
        })
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
        animate(rotation, target, {
            type: "spring",
            stiffness: 60,
            damping: 18,
            onComplete: () => {
                setBaseIndex((prev) => {
                    const shift = -steps
                    return (prev + shift + CARDS.length) % CARDS.length
                })
                rotation.set(0)
                setIsAnimating(false)
            }
        })
    }

    const nextCard = () => rotateOnce('next')
    const prevCard = () => rotateOnce('prev')

    return (
        <section className="py-32 bg-white overflow-hidden" id="themes">
            <div className="container mx-auto px-6 text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Explorez vos thématiques</h2>
                <p className="text-secondary max-w-xl mx-auto text-lg">Accédez directement à nos guides PDF, sans inscription.</p>
            </div>

            <motion.div
                className="relative h-[600px] w-full flex items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing touch-pan-y"
                onPanStart={() => {
                    setIsPaused(true)
                    isDraggingRef.current = true
                }}
                onPan={(_, info) => {
                    if (isAnimating) return
                    rotation.set(rotation.get() + info.delta.x * 0.4)
                }}
                onPanEnd={(_, info) => {
                    setIsPaused(false)
                    if (Math.abs(info.offset.x) > dragThreshold) {
                        snapToNearest()
                    } else {
                        animate(rotation, 0, { type: "spring", stiffness: 80, damping: 20 })
                    }
                    setTimeout(() => {
                        isDraggingRef.current = false
                    }, 50)
                }}
                onWheel={(e) => {
                    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                        e.preventDefault()
                        setIsPaused(true)
                        if (!isAnimating) {
                            rotation.set(rotation.get() - e.deltaX * 0.6)
                        }
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
                {/* 3D Container */}
                <motion.div
                    className="relative w-[200px] h-[280px] md:w-[300px] md:h-[400px] preserve-3d"
                    style={{ rotateY: rotation, transformStyle: 'preserve-3d' }}
                >
                    {Array.from({ length: visibleCardCount }).map((_, index) => {
                        const card = CARDS[(baseIndex + index) % CARDS.length]
                        const angle = index * angleStep
                        return (
                            <motion.div
                                key={`${card.id}-${index}`}
                                className="absolute inset-0 bg-white rounded-3xl p-4 md:p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center justify-between backface-visible transition-colors"
                                style={{
                                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                    opacity: slotOpacities[index]
                                }}
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/5 rounded-2xl flex items-center justify-center text-accent mb-3 md:mb-4">
                                    <card.icon size={24} className="md:w-8 md:h-8" />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-xl font-bold text-primary mb-1 md:mb-2">{card.title}</h3>
                                    <p className="text-xs md:text-sm text-secondary">{card.desc}</p>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full mt-3 md:mt-4 group text-sm md:text-base py-2 md:py-3"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent partial drags triggering or conflicting
                                        handleCardClick(card);
                                    }}
                                >
                                    Télécharger le PDF
                                </Button>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Controls (Optional, for accessibility/ease) */}
                {/* Controls */}
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

        </section>
    )
}
