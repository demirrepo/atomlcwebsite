import { useState, useEffect } from "react";
import { supabase } from "@/supabase";
import { Link } from "react-router-dom";

interface ResultItem {
    id: string;
    student_name: string;
    exam_type: "DTM" | "MS";
    score: string;
    level?: string;
    date_received: string;
    image_url: string;
}

export default function Results() {
    const [activeTab, setActiveTab] = useState<"DTM" | "MS">("DTM");
    const [results, setResults] = useState<ResultItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("results")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Natijalarni yuklashda xatolik:", error.message);
        } else {
            setResults(data || []);
        }
        setLoading(false);
    };

    const filteredResults = results.filter((item) => item.exam_type === activeTab);

    return (
        <div className="min-h-screen bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                        &larr; Asosiy sahifaga qaytish
                    </Link>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        O'quvchilarimiz Natijalari
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Atom ta'lim markazida tayyorgarlik ko'rgan o'quvchilarning DTM va Milliy Sertifikat imtihonlaridagi yuqori ko'rsatkichlari.
                    </p>
                </div>

                <div className="flex justify-center mb-12">
                    <div className="bg-gray-200/50 p-1.5 rounded-2xl inline-flex space-x-1 shadow-inner backdrop-blur-sm">
                        <button
                            onClick={() => setActiveTab("DTM")}
                            className={`px-8 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === "DTM"
                                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            DTM Natijalari
                        </button>
                        <button
                            onClick={() => setActiveTab("MS")}
                            className={`px-8 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === "MS"
                                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Milliy Sertifikat (MS)
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredResults.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group flex flex-col"
                            >
                                <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
                                    <img
                                        src={item.image_url}
                                        alt={item.student_name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 flex flex-col justify-between flex-1">
                                    <div>
                                        <div className="flex items-start justify-between mb-2 gap-2">
                                            <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                                {item.student_name}
                                            </h3>
                                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                                                {item.level && (
                                                    <span className="bg-purple-50 text-purple-600 font-extrabold text-sm px-3 py-1 rounded-xl border border-purple-100 whitespace-nowrap">
                                                        Daraja: {item.level}
                                                    </span>
                                                )}
                                                {item.score && (
                                                    <span className="bg-emerald-50 text-emerald-600 font-extrabold text-sm px-3 py-1 rounded-xl border border-emerald-100 whitespace-nowrap">
                                                        ⭐ {item.score} ball
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t border-gray-50">
                                        <span className="font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs">
                                            {item.exam_type}
                                        </span>
                                        <span>{new Date(item.date_received).toLocaleDateString("uz-UZ")}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center max-w-md mx-auto text-center">
                        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Hozircha natijalar yo'q</h3>
                        <p className="text-gray-500 text-sm">
                            {activeTab} yo'nalishidagi sertifikatlar tez orada admin tomonidan yuklanadi.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}