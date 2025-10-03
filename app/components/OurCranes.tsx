// Featured single crane showcase replacing previous multi-grid.
// Uses dummy data; later can be driven from Supabase.

const featuredCrane = {
  name: 'Liebherr LTM 1300-6.2',
  tagline: 'Our most requested all‑terrain powerhouse',
  description: `The LTM 1300-6.2 delivers an exceptional combination of reach, mobility and lifting performance. 
Ideal for petrochemical, infrastructure erection, and complex urban lifts where setup speed and versatility matter.`,
  stats: [
    { label: 'Max Capacity', value: '300 t' },
    { label: 'Telescopic Boom', value: '78 m' },
    { label: 'Max Hook Height', value: '120 m (w/ luffing jib)' },
    { label: 'Axles', value: '6 × All‑Terrain' },
    { label: 'Engine', value: 'Euromot 6 / Tier 4f' },
  ],
  highlights: [
    'Rapid on‑site rigging & configuration',
    'High lifting chart in mid‑radius band',
    'Advanced LICCON control & safety systems',
    'Excellent road mobility + reduced transport loads',
  ],
  image: '/atc/LTM-1300.jpg', // existing asset path from public folder
};

export default function OurCranes() {
  return (
    <section id="cranes" className="relative py-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-16">
        {/* Text / Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="uppercase tracking-wider text-xs font-semibold text-orange-600">Featured Crane</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            {featuredCrane.name}
          </h2>
          <p className="text-lg md:text-xl font-medium text-gray-700 mb-6">
            {featuredCrane.tagline}
          </p>
          <p className="text-gray-600 whitespace-pre-line mb-8 max-w-2xl">
            {featuredCrane.description}
          </p>

            {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
            {featuredCrane.stats.map(s => (
              <div key={s.label} className="bg-white/70 backdrop-blur border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">{s.label}</div>
                <div className="text-lg font-semibold text-gray-900">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <ul className="space-y-2 mb-10">
            {featuredCrane.highlights.map(h => (
              <li key={h} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-500" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <a href="/quote" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm shadow-sm transition transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-orange-400">
              Request This Crane
            </a>
            <a href="/cranes" className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition">
              View Full Fleet
            </a>
          </div>
        </div>

        {/* Image / Visual */}
        <div className="flex-1 relative">
          <div className="relative group h-[480px] w-full rounded-3xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition" />
            <img
              src={featuredCrane.image}
              alt={featuredCrane.name}
              className="h-full w-full object-cover scale-[1.05] group-hover:scale-[1.1] transition-transform duration-[3800ms] ease-out"
              loading="lazy"
            />
            {/* Floating badge */}
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-gray-800 shadow flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                Most Booked
              </div>
            </div>
            {/* Bottom overlay info */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex flex-col md:flex-row md:items-end gap-6">
              <div className="text-white max-w-md">
                <h3 className="text-2xl font-semibold mb-2 drop-shadow-sm">Unmatched Versatility</h3>
                <p className="text-sm text-white/90 leading-relaxed">Engineered for rapid deployment and complex hoisting environments—this model consistently outperforms in mid to heavy lift scenarios.</p>
              </div>
              <div className="flex gap-3">
                <div className="bg-white/90 backdrop-blur rounded-xl px-4 py-3 text-center">
                  <div className="text-[10px] uppercase tracking-wide font-semibold text-gray-500">Avg Setup</div>
                  <div className="text-sm font-bold text-gray-800">~2.5 hrs</div>
                </div>
                <div className="bg-white/90 backdrop-blur rounded-xl px-4 py-3 text-center">
                  <div className="text-[10px] uppercase tracking-wide font-semibold text-gray-500">Utilization</div>
                  <div className="text-sm font-bold text-gray-800">87%</div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="pointer-events-none select-none" aria-hidden>
            <div className="absolute -top-10 -right-10 h-40 w-40 bg-orange-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-black/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
