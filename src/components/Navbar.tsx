import { useEffect, useState } from "react";
import { Atom, Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, REG_URL } from "@/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-ink-200/70 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#asosiy"
          onClick={(e) => {
            e.preventDefault();
            handleNav("#asosiy");
          }}
          className="group flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-glow transition-transform group-hover:scale-105">
            <Atom className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span
            className={`text-xl font-extrabold tracking-tight transition-colors ${
              scrolled ? "text-ink-900" : "text-ink-900"
            }`}
          >
            ATOM
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="group relative rounded-lg px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-brand-700"
            >
              {l.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand-600 transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href={REG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-glow transition-all hover:bg-brand-700 hover:shadow-lg active:scale-95 md:inline-flex"
        >
          Ro'yxatdan o'tish
          <ArrowUpRight className="h-4 w-4" />
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 bg-white/80 text-ink-800 transition hover:bg-white md:hidden"
          aria-label="Menyu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-ink-200/70 bg-white/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="block w-full rounded-lg px-4 py-3 text-left text-base font-semibold text-ink-700 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {l.label}
            </button>
          ))}
          <a
            href={REG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 py-3 text-base font-bold text-white shadow-glow transition hover:bg-brand-700 active:scale-95"
          >
            Ro'yxatdan o'tish
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
