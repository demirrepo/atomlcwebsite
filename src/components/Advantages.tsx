import { useState, useEffect } from "react";
import { supabase } from "@/supabase";
// 1. I added Target and Activity to your imports here 👇
import { Layers, Users, Lightbulb, Building2, LineChart, Rocket, Laptop, Target, Activity } from "lucide-react";

// Define the database shape
interface Advantage {
  id: number;
  icon: string;
  title: string;
  text: string;
}

// 2. I added Target and Activity to your icon map here 👇
const iconMap: Record<string, React.ElementType> = {
  Layers,
  Users,
  Lightbulb,
  Building2,
  LineChart,
  Rocket,
  Laptop,
  Target,
  Activity,
};

export default function Advantages() {
  const [advantages, setAdvantages] = useState<Advantage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvantages = async () => {
      // 3. Here is the magic .order() line to fix the sorting! 👇
      const { data, error } = await supabase
        .from("advantages")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching advantages:", error);
      } else if (data) {
        setAdvantages(data);
      }
      setLoading(false);
    };

    fetchAdvantages();
  }, []);

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

        {loading ? (
          <div className="mt-16 flex justify-center text-ink-400">
            <p>Ma'lumotlar yuklanmoqda...</p>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((adv) => {
              // Fallback to Lightbulb if the icon name is missing or typed wrong in the DB
              const Icon = iconMap[adv.icon] || Lightbulb;

              return (
                <div
                  key={adv.id}
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
        )}
      </div>
    </section>
  );
}