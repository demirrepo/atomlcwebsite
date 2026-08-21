import { Phone, Send, MapPin, Clock, ArrowUpRight, Instagram } from "lucide-react";
import { REG_URL } from "@/data";

export default function Contact() {
  const contacts = [
    {
      icon: Phone,
      label: "Telefon",
      value: "+998 90 719 89 09",
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
      icon: Instagram,
      label: "Instagram",
      value: "@atom_urganch",
      href: "https://www.instagram.com/atom_urganch",
      color: "brand",
    },
    {
      icon: Clock,
      label: "Ish vaqti",
      value: "Har kuni, 9:00 — 19:00",
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
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all ${isBrand
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

            {/* Manzillarimiz Card with both branches */}
            <div className="group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-soft transition-all">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <MapPin className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Manzillarimiz</p>
                <div className="mt-3 space-y-3">
                  <div>
                    <span className="inline-block rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700 mb-1">
                      1-filial
                    </span>
                    <p className="text-sm font-bold text-ink-900">Urganch shahar, Fayazov ko'chasi 1A-uy</p>
                  </div>
                  <div>
                    <span className="inline-block rounded-full bg-bio-50 px-2 py-0.5 text-xs font-bold text-bio-700 mb-1">
                      2-filial
                    </span>
                    <p className="text-sm font-bold text-ink-900">Gurlan tumani, O'zbekiston do'koni</p>
                  </div>
                </div>
              </div>
            </div>

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

          {/* Right Column: Google Maps Container */}
          <div className="relative min-h-[400px] w-full overflow-hidden rounded-3xl lg:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2608.858694871246!2d60.60947083049089!3d41.558383416822075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41dfc94d500c5add%3A0x31e1c9980d71ed19!2s%22ATOM%22%20innovatsion%20ta'lim%20markazi!5e0!3m2!1sen!2s!4v1786969943746!5m2!1sen!2s"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}