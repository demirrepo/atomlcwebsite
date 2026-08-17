import { Layers, Users, Lightbulb, Building2, LineChart, Rocket, Laptop } from "lucide-react";
import { advantages } from "@/data";

// Map the string names from data.ts to actual Lucide React components
const iconMap = {
  Layers,
  Users,
  Lightbulb,
  Building2,
  LineChart,
  Rocket,
  Laptop,
};

export default function Advantages() {
  return (
    <section id="afzalliklar" className="bg-ink-50 py-20 lg:py-28">
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

        {/* 
          Grid layout handles the responsive design:
          Mobile: 1 column
          Tablet: 2 columns
          Desktop: 3 columns (perfect for 6 items)
        */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((adv) => {
            const Icon = iconMap[adv.icon as keyof typeof iconMap];
            return (
              <div
                key={adv.title}
                className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-ink-900">{adv.title}</h3>
                <p className="text-base leading-relaxed text-ink-600">{adv.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}