import { GraduationCap, Sparkles, LineChart } from "lucide-react";
import { advantages } from "@/data";

const iconMap = { GraduationCap, Sparkles, LineChart };

export default function Advantages() {
  return (
    <section id="afzalliklar" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-600">
            Bizning afzalliklarimiz
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Nega aynan "Atom"?
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Bizning yondashuvimiz natijaga yo'naltirilgan — har bir talaba shaxsiy rivojlanishni oladi.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {advantages.map((a, i) => {
            const Icon = iconMap[a.icon as keyof typeof iconMap];
            return (
              <div
                key={a.title}
                className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-glow"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Hover gradient accent */}
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-bio-500 transition-transform duration-500 group-hover:scale-x-100" />

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 transition-all duration-300 group-hover:from-brand-600 group-hover:to-brand-800 group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-ink-900">{a.title}</h3>
                <p className="mt-2.5 text-base leading-relaxed text-ink-600">{a.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
