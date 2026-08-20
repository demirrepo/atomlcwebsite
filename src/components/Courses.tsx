import { useState, useEffect } from "react";
import { supabase } from "@/supabase";
import {
  FlaskConical, Dna, ArrowUpRight, CheckCircle2,
  Layers, Users, Lightbulb, Building2, LineChart,
  Rocket, Laptop, Globe, Target, Award, Zap, Shield
} from "lucide-react";
import { REG_URL } from "@/data";

interface Course {
  id: number;
  icon: string;
  title: string;
  text: string;
  tag: string;
  color: "brand" | "bio";
  language: string;
  features: string[];
}

const iconMap: Record<string, React.ElementType> = {
  FlaskConical, Dna, Layers, Users, Lightbulb, Building2,
  LineChart, Rocket, Laptop, Globe, Target, Award, Zap, Shield
};

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*").order("id", { ascending: true });

      if (error) {
        console.error("Error fetching courses:", error);
      } else if (data) {
        setCourses(data);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  return (
    <section id="kurslar" className="relative bg-ink-50 py-20 lg:py-28">
      {/* Subtle grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0b1220 1px, transparent 1px), linear-gradient(90deg, #0b1220 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Kurslarimiz</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Fan bo'yicha intensiv tayyorgarlik
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Har bir kurs DTM va Milliy Sertifikat talablariga to'liq moslashtirilgan.
          </p>
        </div>

        {loading ? (
          <div className="mt-14 flex justify-center text-ink-400">
            <p>Ma'lumotlar yuklanmoqda...</p>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {courses.map((c) => {
              const Icon = iconMap[c.icon] || FlaskConical;
              const isBrand = c.color === "brand";

              return (
                <div
                  key={c.id}
                  className={`group relative overflow-hidden rounded-3xl border bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow ${isBrand ? "border-brand-200 hover:border-brand-300" : "border-bio-200 hover:border-bio-300"
                    }`}
                >
                  {/* Decorative blob */}
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${isBrand ? "bg-brand-100 opacity-60" : "bg-bio-100 opacity-60"
                      }`}
                  />

                  <div className="relative flex items-start justify-between">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${isBrand
                          ? "bg-brand-100 text-brand-700 group-hover:bg-brand-600 group-hover:text-white"
                          : "bg-bio-100 text-bio-700 group-hover:bg-bio-600 group-hover:text-white"
                        }`}
                    >
                      <Icon className="h-8 w-8" strokeWidth={2} />
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Dynamic Language Tag */}
                      <span className="inline-flex items-center rounded-full bg-ink-100 px-2.5 py-1 text-xs font-semibold text-ink-700">
                        🌐 {c.language}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${isBrand ? "bg-brand-50 text-brand-700" : "bg-bio-50 text-bio-700"
                          }`}
                      >
                        {c.tag}
                      </span>
                    </div>
                  </div>

                  <h3 className="relative mt-6 text-2xl font-bold text-ink-900">{c.title}</h3>
                  <p className="relative mt-3 text-base leading-relaxed text-ink-600">{c.text}</p>

                  {/* Dynamic Features Checkmarks */}
                  <ul className="relative mt-5 space-y-2">
                    {c.features && c.features.map((f, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-ink-700">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 ${isBrand ? "text-brand-600" : "text-bio-600"}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={REG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative mt-7 inline-flex items-center gap-1.5 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all hover:shadow-lg active:scale-95 ${isBrand ? "bg-brand-600 hover:bg-brand-700 shadow-glow" : "bg-bio-600 hover:bg-bio-700 shadow-glowGreen"
                      }`}
                  >
                    Yozilish
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}