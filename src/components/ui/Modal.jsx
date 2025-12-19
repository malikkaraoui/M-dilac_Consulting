import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset' };
    }, [isOpen]);

    if (!isOpen) return null

    return createPortal(
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-primary">{title}</h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-secondary"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6">
                        {children}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    )
}
