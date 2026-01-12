import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, TrendingUp, Anchor, Briefcase, FileText, Activity } from 'lucide-react'
import { Button } from '../ui/Button'
import Modal from '../ui/Modal'
import LeadGenModal from './LeadGenModal'

const CARDS = [
    { id: 1, title: "RC Professionnelle", icon: Shield, desc: "Protégez votre activité d'indépendant." },
    { id: 2, title: "Prévoyance LPP / 3a", icon: TrendingUp, desc: "Stratégie retraite optimisée." },
    { id: 3, title: "Protection du revenu", icon: Anchor, desc: "Maladie, accident, invalidité." },
    { id: 4, title: "Assurances Cabinet", icon: Briefcase, desc: "Locaux, matériel, cyber-risques." },
    { id: 5, title: "Fiscalité Médicale", icon: FileText, desc: "Optimisation dans le cadre légal." },
    { id: 6, title: "Installation / Cession", icon: Activity, desc: "Accompagnement transition de carrière." },
]

export default function CarouselSection() {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedTheme, setSelectedTheme] = useState(null)
    const isDraggingRef = useRef(false)
    const [rotation, setRotation] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    // Config
    const cardCount = CARDS.length
    const radius = 350 // Radius of the carousel
    const angleStep = 360 / cardCount

    // Auto-rotation
    useEffect(() => {
        let interval;
        if (!isPaused && !modalOpen) {
            interval = setInterval(() => {
                setRotation(prev => prev - angleStep)
            }, 3000)
        }
        return () => clearInterval(interval)
    }, [isPaused, modalOpen, angleStep])

    const handlePan = (event, info) => {
        setRotation(prev => prev + info.delta.x * 0.2) // Sensitivity
    }

    const handlePanStart = () => {
        setIsPaused(true)
        isDraggingRef.current = true
    }

    const handlePanEnd = () => {
        setIsPaused(false)
        setTimeout(() => {
            isDraggingRef.current = false
        }, 50)
    }

    const handleCardClick = (card) => {
        // Only open if NOT dragging
        if (isDraggingRef.current) return
        setSelectedTheme(card)
        setModalOpen(true)
    }

    // Handle Wheel (Trackpad horizontal scroll)
    const handleWheel = (e) => {
        // e.deltaX represents horizontal scroll on trackpads
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            setRotation(prev => prev - e.deltaX * 0.5); // Adjust sensitivity
            setIsPaused(true);

            // Resume auto play after a small delay
            clearTimeout(window.wheelTimeout);
            window.wheelTimeout = setTimeout(() => {
                setIsPaused(false);
            }, 1000);
        }
    }

    const nextCard = () => {
        setRotation(prev => prev - angleStep)
    }

    const prevCard = () => {
        setRotation(prev => prev + angleStep)
    }

    return (
        <section className="py-32 bg-white overflow-hidden" id="themes">
            <div className="container mx-auto px-6 text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Explorez vos thématiques</h2>
                <p className="text-secondary max-w-xl mx-auto text-lg">Choisissez un sujet pour accéder à nos guides exclusifs.</p>
            </div>

            <motion.div
                className="relative h-[600px] w-full flex items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing touch-pan-y"
                onPan={handlePan}
                onPanStart={handlePanStart}
                onPanEnd={handlePanEnd}
                onWheel={handleWheel}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* 3D Container */}
                <motion.div
                    className="relative w-[200px] h-[280px] md:w-[300px] md:h-[400px] preserve-3d"
                    animate={{ rotateY: rotation }}
                    transition={{ type: "spring", stiffness: 40, damping: 15 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {CARDS.map((card, index) => {
                        const angle = index * angleStep
                        return (
                            <div
                                key={card.id}
                                className="absolute inset-0 bg-white rounded-3xl p-4 md:p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center justify-between backface-visible transition-colors"
                                style={{
                                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
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
                                    Découvrir
                                </Button>
                            </div>
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

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={`Recevoir le guide : ${selectedTheme?.title}`}
            >
                <LeadGenModal theme={selectedTheme} onClose={() => setModalOpen(false)} />
            </Modal>
        </section>
    )
}
