import { Phone, Send, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { REG_URL } from "@/data";

export default function Contact() {
  const contacts = [
    {
      icon: Phone,
      label: "Telefon",
      value: "+998 93 896 89 09",
      href: "tel:+998938968909",
      color: "brand",
    },
    {
      icon: Send,
      label: "Telegram",
      value: "@ONLINE_ATOM",
      href: "https://t.me/ONLINE_ATOM",
      color: "bio",
    },
    {
      icon: MapPin,
      label: "Manzil",
      value: "Urganch shahri, Al-Xorazmiy ko'chasi 12",
      href: "#aloqa",
      color: "brand",
    },
    {
      icon: Clock,
      label: "Ish vaqti",
      value: "Har kuni, 9:00 — 20:00",
      href: "#aloqa",
      color: "bio",
    },
  ];

  return (
    <section id="aloqa" className="relative bg-ink-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Aloqa va manzil</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">Biz bilan bog'laning</h2>
          <p className="mt-4 text-lg text-ink-600">
            Savollaringiz bormi? Biz bilan bog'laning — tez orada javob beramiz.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: contact info */}
          <div className="flex flex-col gap-4">
            {contacts.map((c) => {
              const Icon = c.icon;
              const isBrand = c.color === "brand";
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-glow"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all ${
                      isBrand
                        ? "bg-brand-100 text-brand-700 group-hover:bg-brand-600 group-hover:text-white"
                        : "bg-bio-100 text-bio-700 group-hover:bg-bio-600 group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{c.label}</p>
                    <p className="truncate text-base font-bold text-ink-900">{c.value}</p>
                  </div>
                </a>
              );
            })}

            <a
              href={REG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-4 text-base font-bold text-white shadow-glow transition-all hover:bg-brand-700 hover:shadow-lg active:scale-95"
            >
              Ro'yxatdan o'tish
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Right: map */}
          <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-soft">
            <iframe
              title="Atom O'quv Markazi xaritada"
              src="https://www.google.com/maps?q=Urganch,Uzbekistan&output=embed"
              className="h-full min-h-[320px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
