import { ArrowUpRight, BookOpen, Sparkles, Atom, CheckCircle2 } from "lucide-react";
import { REG_URL } from "@/data";

export default function Hero() {
  const scrollToCourses = () =>
    document.querySelector("#kurslar")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="asosiy" className="relative overflow-hidden bg-ink-50 pt-28 pb-20 sm:pt-32 lg:pt-40 lg:pb-28">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-200/50 blur-3xl animate-blob" />
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-bio-200/50 blur-3xl animate-blob [animation-delay:4s]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#0b1220 1px, transparent 1px), linear-gradient(90deg, #0b1220 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left: copy */}
        <div className="animate-fadeUp">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-soft">
            <Sparkles className="h-3.5 w-3.5" />
            DTM va Milliy Sertifikat tayyorgarligi
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            Atom O'quv Markazi —{" "}
            <span className="bg-gradient-to-r from-brand-600 to-bio-600 bg-clip-text text-transparent">
              A+ Sertifikat
            </span>{" "}
            Sari Ilk Qadam!
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
            Kimyo va Biologiya fanlaridan intensiv DTM va Milliy Sertifikat kurslari. Biz bilan talaba bo'lish oson!
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={REG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-bold text-white shadow-glow transition-all hover:bg-brand-700 hover:shadow-lg active:scale-95"
            >
              Ro'yxatdan o'tish
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={scrollToCourses}
              className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-ink-300 bg-white px-6 py-3.5 text-base font-bold text-ink-800 transition-all hover:border-brand-600 hover:text-brand-700 active:scale-95"
            >
              <BookOpen className="h-5 w-5" />
              Kurslar bilan tanishish
            </button>
          </div>

          {/* Mini stats */}
          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { n: "3000+", t: "Bitiruvchi talaba" },
              { n: "A+", t: "O'rtacha natija" },
              { n: "8 yil", t: "Tajriba" },
            ].map((s) => (
              <div key={s.t} className="flex flex-col">
                <span className="text-2xl font-extrabold text-ink-900">{s.n}</span>
                <span className="text-sm text-ink-500">{s.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div className="relative animate-fadeUp [animation-delay:200ms]">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Floating accent card */}
            <div className="absolute -left-4 top-6 z-20 hidden rounded-2xl border border-ink-100 bg-white/95 p-3 shadow-glow backdrop-blur sm:flex animate-floaty">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bio-100 text-bio-700">
                  <Atom className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-ink-900">A+ Sertifikat</p>
                  <p className="text-[11px] text-ink-500">Kafolatli natija</p>
                </div>
              </div>
            </div>

            {/* Floating badge bottom */}
            <div className="absolute -bottom-5 -right-3 z-20 hidden rounded-2xl border border-ink-100 bg-white/95 p-3 shadow-glow backdrop-blur sm:flex animate-floaty [animation-delay:2s]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-ink-900">DTM tayyorgarlik</p>
                  <p className="text-[11px] text-ink-500">100% amaliyot</p>
                </div>
              </div>
            </div>

            {/* Main image */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-glow">
              <img
                src="https://images.pexels.com/photos/8472004/pexels-photo-8472004.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200"
                alt="O'quvchilar laboratoriyada tajriba o'tkazmoqda"
                className="h-[340px] w-full object-cover sm:h-[440px] lg:h-[520px]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
            </div>

            {/* Decorative ring */}
            <div className="absolute -right-8 -top-8 -z-10 h-32 w-32 rounded-full border-2 border-dashed border-brand-300/60 animate-floaty [animation-delay:1s]" />
          </div>
        </div>
      </div>
    </section>
  );
}
