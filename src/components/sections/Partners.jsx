export default function Partners() {
    const partners = [
        {
            name: 'TariForm',
            href: 'https://tariform.ch',
            logo: '/TariForm.png'
        },
        {
            name: 'Medicalis',
            href: 'https://www.medicalis.ch',
            logo: '/Medicalis.png'
        },
        {
            name: 'Tectram',
            href: 'https://www.tectram.ch',
            logo: '/Tectram.png'
        },
        {
            name: 'Medilec S.A.',
            href: 'https://www.medilec.ch',
            logo: '/Medilec.png'
        }
    ]

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">Nos partenaires</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                    {partners.map((partner) => (
                        <a
                            key={partner.name}
                            href={partner.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center p-4 rounded-2xl border border-gray-100 hover:shadow-soft transition-all bg-white hover:scale-105"
                            aria-label={partner.name}
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-12 md:h-16 w-auto object-contain"
                                loading="lazy"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
