import { useState } from "react";
import { teachers } from "@/data";

export default function Teachers() {
  const [activeTab, setActiveTab] = useState("Barchasi");

  const filteredTeachers = teachers.filter((teacher) => {
    if (activeTab === "Barchasi") return true;
    return teacher.subject === activeTab;
  });

  return (
    <section id="ustozlar" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Ustozlar</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Bizning professional jamoa
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            O'z ishining ustalari bilan yuqori natijalarga erishing.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {["Barchasi", "Kimyo", "Biologiya"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${activeTab === tab
                  ? "bg-ink-900 text-white shadow-lg"
                  : "bg-ink-50 text-ink-600 hover:bg-ink-100"
                }`}
            >
              {tab === "Barchasi" ? "Barcha ustozlar" : `${tab} ustozlari`}
            </button>
          ))}
        </div>

        {/* Teachers Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTeachers.map((teacher) => {
            const isBrand = teacher.subject === "Kimyo";

            // Safely extract initials (e.g., "Maxmud Matkarimov" -> "MM")
            const nameParts = teacher.name.split(" ");
            const initials = nameParts.length > 1
              ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
              : nameParts[0][0].toUpperCase();

            return (
              <div
                key={teacher.name}
                className="group relative flex flex-col items-center rounded-3xl border border-ink-100 bg-white p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow"
              >
                {/* Avatar Placeholder */}
                <div className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-ink-50 font-bold text-ink-700 shadow-inner overflow-hidden border-4 border-white">
                  {teacher.image ? (
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span
                      className={`text-3xl font-extrabold ${isBrand ? "text-brand-600" : "text-bio-600"
                        }`}
                    >
                      {initials}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-ink-900">{teacher.name}</h3>

                {/* Subject Badge */}
                <p className={`mt-3 rounded-full px-3 py-1 text-xs font-bold ${isBrand ? "bg-brand-50 text-brand-700" : "bg-bio-50 text-bio-700"
                  }`}>
                  {teacher.subject}
                </p>

                <p className="mt-3 text-sm text-ink-600">{teacher.role}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}