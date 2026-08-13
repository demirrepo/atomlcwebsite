import { Atom, Phone, Send, MapPin, ArrowUpRight } from "lucide-react";
import { navLinks, REG_URL } from "@/data";

export default function Footer() {
  const handleNav = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-200">
      {/* Glow accents */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-700/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-bio-700/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
                <Atom className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="text-xl font-extrabold tracking-tight text-white">ATOM</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              Atom O'quv Markazi — Kimyo va Biologiya fanlaridan intensiv DTM va Milliy Sertifikat kurslari. A+ sertifikat
              sari ilk qadam.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Sahifalar</h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => handleNav(l.href)}
                    className="text-sm text-ink-400 transition-colors hover:text-brand-300"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Aloqa</h4>
            <ul className="mt-4 space-y-3 text-sm text-ink-400">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-400" />
                <a href="tel:+998938968909" className="transition-colors hover:text-brand-300">
                  +998 93 896 89 09
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Send className="h-4 w-4 text-bio-400" />
                <a href="https://t.me/ONLINE_ATOM" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-bio-300">
                  @ONLINE_ATOM
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-brand-400" />
                Urganch shahri, Al-Xorazmiy ko'chasi 12
              </li>
            </ul>
            <a
              href={REG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-brand-700 active:scale-95"
            >
              Ro'yxatdan o'tish
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-ink-500">© 2026 Atom O'quv Markazi. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}
