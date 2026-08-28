import { Link } from "react-router-dom";
import { Zap, Target, Users, MapPin, CheckCircle2, GraduationCap, Quote, TrendingUp, Award } from "lucide-react";
export default function About() {
    return (
        <div className="min-h-screen bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] font-sans pb-20">

            {/* Modern Hero Section */}
            <div className="bg-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] shadow-lg mb-12 relative overflow-hidden">

                {/* Background Decor */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>

                {/* Back Button */}
                <div className="absolute top-6 left-6 md:left-12 z-10">
                    <Link to="/" className="inline-flex items-center text-sm font-bold text-blue-100 hover:text-white transition-colors">
                        &larr; Asosiy sahifaga qaytish
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto text-center mt-8 relative z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/50 text-blue-100 text-sm font-semibold tracking-wider mb-4 border border-blue-400/50">
                        ATOM TA'LIM MARKAZI
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        Kuchli energiyadan — <br className="hidden md:block" /> katta natijalargacha
                    </h1>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Metrics Row (Moved out of text for high impact) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 relative -mt-24 z-20">
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center">
                        <div className="text-3xl font-extrabold text-blue-600 mb-1">2019</div>
                        <div className="text-xs font-semibold text-gray-500 uppercase">Yil tashkil topgan</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center">
                        <div className="text-3xl font-extrabold text-blue-600 mb-1">750+</div>
                        <div className="text-xs font-semibold text-gray-500 uppercase">Faol o'quvchilar</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center">
                        <div className="text-3xl font-extrabold text-blue-600 mb-1">25+</div>
                        <div className="text-xs font-semibold text-gray-500 uppercase">Malakali ustozlar</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center">
                        <div className="text-3xl font-extrabold text-blue-600 mb-1">2 ta</div>
                        <div className="text-xs font-semibold text-gray-500 uppercase">Zamonaviy filial</div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-16">

                    {/* Section 1: History */}
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <GraduationCap className="text-blue-600 w-8 h-8" />
                            Markazimiz Tarixi
                        </h2>
                        <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                            <p>
                                ATOM innovatsion ta’lim markazi 2019-yil 3-sentabrda Xorazmda kimyo va biologiya fanlariga ixtisoslashgan ilk o‘quv markazlardan biri sifatida tashkil etilgan.
                            </p>
                            <p>
                                Markazga <span className="font-semibold text-gray-900">Matkarimov Maxmud Abdullayevich</span> tomonidan kimyo va biologiyani sifatli o‘qitish, an’anaviy repetitorlik tizimini yangi g‘oyalar va zamonaviy yondashuvlar bilan boyitish hamda kelajakdagi yetuk shifokorlarni tayyorlash maqsadida asos solingan.
                            </p>
                            <p>
                                ATOM o‘z faoliyatini atigi 3 ta xona, 2 nafar ustoz va 2 ta fan bilan boshlagan. Bugun esa u Urganch va Gurlandagi filiallarida yuzlab yoshlarni birlashtirgan katta ta'lim oilasiga aylandi.
                            </p>
                        </div>
                    </section>

                    {/* Philosophy Banner */}
                    <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-10 text-white shadow-lg relative overflow-hidden">
                        <Zap className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white opacity-10" />
                        <h3 className="text-2xl font-bold mb-4 relative z-10">Nega aynan ATOM?</h3>
                        <p className="text-blue-100 text-lg mb-6 relative z-10 leading-relaxed">
                            Atom — o‘zida ulkan energiyani saqlaydigan zarracha. Markazimiz nomi ham aynan shu g‘oyadan tug‘ilgan. Biz har bir yoshning ichida katta salohiyat va energiya borligiga ishonamiz.
                            Ustozlarimiz har bir darsda ana shu salohiyatni ochish va uni aniq natijaga olib borish uchun bor kuchini beradi. Shuning uchun ATOM uchun ta’lim — shunchaki dars o‘tish emas.
                        </p>
                        <div className="flex flex-wrap gap-4 font-extrabold text-xl md:text-2xl tracking-wide relative z-10">
                            <span>⚡ ENERGIYA.</span>
                            <span>⚙️ TIZIM.</span>
                            <span>🏃 HARAKAT.</span>
                            <span>🎯 NATIJA.</span>
                        </div>
                    </section>

                    {/* Section 2: The System */}
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Target className="text-blue-600 w-8 h-8" />
                            Natijaga Olib Boradigan Tizim
                        </h2>
                        <div className="text-lg text-gray-600 leading-relaxed mb-8">
                            <p>
                                2025-yil ATOM tarixida yangi bosqichni boshlab berdi. Urganch filiali yangi markazga ko‘chdi va ta’lim tizimi Milliy sertifikat imtihonlarida maksimal natijaga erishishga yo‘naltirilgan yangi model asosida qayta tashkil qilindi.
                            </p>
                            <p className="font-semibold text-gray-900 mt-4 text-xl">
                                Asosiy tamoyilimiz: "Har bir o‘quvchi o‘z darajasiga mos muhitda o‘qishi kerak."
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                "O‘quvchilar bilim darajasiga qarab guruhlarga ajratiladi",
                                "Bir guruhdagi o‘quvchilar soni 30 nafardan oshmaydi",
                                "Haftasiga 3 kun asosiy va 3 kun qo‘shimcha darslar",
                                "Maxsus o‘quv tizimi va mualliflik materiallari",
                                "O‘quvchilar muntazam diagnostikadan o‘tkaziladi",
                                "Natijalarga qarab guruhlar qayta shakllantiriladi",
                                "ATOM AI orqali mustaqil ishlashda qo'shimcha yordam"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-gray-600 font-medium italic text-center">
                            Bir xil daraja. Bir xil maqsad. Yuqori sur’at.
                        </p>
                    </section>

                    {/* Section 3: Results & Anecdote */}
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <TrendingUp className="text-blue-600 w-8 h-8" />
                            Natijalar Gapiradi
                        </h2>
                        <div className="text-lg text-gray-600 leading-relaxed space-y-6">
                            <p>
                                ATOMda kimyo va biologiya fanlari o‘zbek hamda rus tillarida o‘qitiladi. Bu natijalar tasodif emas. Ularning ortida aniq tizim, muntazam nazorat, kuchli ustozlar va katta mehnat turibdi.
                            </p>

                            {/* Result Highlights */}
                            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-emerald-900 relative">
                                <span className="absolute top-4 right-4 text-emerald-300"><Award className="w-12 h-12 opacity-50" /></span>
                                <p className="font-bold text-xl mb-2">🏆 Rekord Natijalarimiz:</p>
                                <ul className="list-disc pl-5 space-y-2 font-medium">
                                    <li>Kimyoni mutlaqo noldan boshlagan o‘quvchimiz atigi <span className="bg-emerald-200 px-1 rounded">7 oy ichida A daraja (100%)</span> sertifikatini qo‘lga kiritdi.</li>
                                    <li>Yana bir o‘quvchimiz 9-sinfdayoq, 7 oylik tayyorgarlikdan so‘ng <span className="bg-emerald-200 px-1 rounded">A+ darajadagi</span> natijaga erishdi.</li>
                                </ul>
                            </div>

                            {/* Trust Anecdote */}
                            <div className="bg-white border-l-4 border-blue-600 p-6 shadow-sm rounded-r-2xl my-8">
                                <Quote className="text-blue-200 w-10 h-10 mb-2" />
                                <p className="text-gray-700 italic font-medium leading-relaxed">
                                    "2025-yil oktabr oyida o‘quvchilar soni shu qadar tez oshdiki, markazdagi stullar o‘quvchilarga berilib, ba’zi paytlarda hatto administratorlar va ustozlarga o‘tirish uchun joy qolmay qolgan edi. Bu biz uchun oddiy voqea emas — bu odamlarning ATOMga bildirgan ulkan ishonchining ramzi."
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Mission */}
                    <section className="border-t border-gray-100 pt-16">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kelajak Missiyamiz</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Bizning maqsadimiz faqat o‘quvchilarga sertifikat olib berish emas. Biz mustaqil fikrlaydigan, intizomli va oldiga katta maqsadlar qo‘ya oladigan yoshlarni tarbiyalashni istaymiz.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-blue-50 p-6 rounded-2xl">
                                <h4 className="font-bold text-blue-900 text-xl mb-3">Uzoq muddatli maqsad:</h4>
                                <p className="text-blue-800/80 font-medium">
                                    Xorazmda kuchli tibbiyot kadrlarining yangi avlodini shakllantirish va kelajakda Xorazmning Markaziy Osiyodagi kuchli tibbiyot markazlaridan biriga aylanishiga xizmat qilish.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <h4 className="font-bold text-gray-900 text-xl mb-4">Oldimizdagi marralar:</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2 text-gray-700 font-semibold"><Target className="w-5 h-5 text-brand-500" /> Kuchli ta’lim ekotizimini yaratish</li>
                                    <li className="flex items-center gap-2 text-gray-700 font-semibold"><Target className="w-5 h-5 text-brand-500" /> ATOM xususiy maktabini tashkil etish</li>
                                    <li className="flex items-center gap-2 text-gray-700 font-semibold"><Target className="w-5 h-5 text-brand-500" /> Respublika bo‘ylab kengayish</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <h3 className="text-2xl font-extrabold text-blue-600">Biz hali yo‘lning boshidamiz.</h3>
                            <p className="text-gray-500 mt-2 font-medium">ATOM — natija beradigan zamonaviy ta’lim markazi.</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}