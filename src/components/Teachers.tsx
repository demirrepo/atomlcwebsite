import { Award, FlaskConical, Dna } from "lucide-react";
import { teachers } from "@/data";

export default function Teachers() {
  return (
    <section id="ustozlar" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Bizning ustozlar</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Tajribali mutaxassislar jamoasi
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Har bir ustoz o'z fanida yuqori natijalarga erishgan va o'z tajribasini sizga yetkazadi.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((t) => {
            const isChem = t.subject === "Kimyo";
            return (
              <div
                key={t.name}
                className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-ink-50 p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:bg-white hover:shadow-glow"
              >
                {/* Photo / placeholder */}
                <div className="relative mx-auto h-28 w-28">
                  <div
                    className={`absolute inset-0 rounded-full p-1 transition-all duration-300 ${
                      isChem ? "bg-gradient-to-br from-brand-400 to-brand-700" : "bg-gradient-to-br from-bio-400 to-bio-700"
                    }`}
                  >
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="h-full w-full rounded-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = "none";
                        const sib = target.nextElementSibling as HTMLElement | null;
                        if (sib) sib.style.display = "flex";
                      }}
                    />
                    <div
                      className="hidden h-full w-full items-center justify-center rounded-full bg-white text-2xl font-extrabold text-ink-800"
                      style={{ display: "none" }}
                    >
                      {t.initials}
                    </div>
                  </div>
                  <span
                    className={`absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white shadow-soft ${
                      isChem ? "bg-brand-100 text-brand-700" : "bg-bio-100 text-bio-700"
                    }`}
                  >
                    {isChem ? <FlaskConical className="h-4 w-4" /> : <Dna className="h-4 w-4" />}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-ink-900">{t.name}</h3>
                <p className={`text-sm font-semibold ${isChem ? "text-brand-700" : "text-bio-700"}`}>{t.subject}</p>

                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                  <Award className="h-3.5 w-3.5" />
                  {t.badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
