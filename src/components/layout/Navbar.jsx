import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Expertise', href: '#expertise' },
        { name: 'Thèmes', href: '#themes' },
        { name: 'Méthode', href: '#method' },
        { name: 'Blogue', href: '#blog' },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-gray-100 py-3" : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="font-bold text-xl tracking-tight text-primary flex items-center gap-2">
                    <span className="text-2xl">✤</span>
                    <span className={cn("transition-opacity duration-300", isScrolled ? "opacity-100" : "opacity-90")}>
                        Médilac <span className="font-light">Consulting</span>
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-secondary hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <Button variant="primary" size="sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        Demander un échange
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-primary"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-primary"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Button className="w-full mt-2" onClick={() => { setMobileMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Demander un échange</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
