import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="min-h-screen bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] font-sans pb-20">

            {/* Modern Hero Section */}
            <div className="bg-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] shadow-lg mb-12 relative">

                {/* Back Button */}
                <div className="absolute top-6 left-6 md:left-12">
                    <Link to="/" className="inline-flex items-center text-sm font-bold text-blue-100 hover:text-white transition-colors">
                        &larr; Asosiy sahifaga qaytish
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto text-center mt-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                        Biz Haqimizda
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl mx-auto leading-relaxed">
                        Atom innovatsion ta'lim markazi — yoshlarni kelajakka tayyorlash va ularga eng zamonaviy metodikalar asosida ta'lim berish maskani.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">

                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Markazimiz Tarixi</h2>

                    <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                        <p>
                            Atom o'quv markazi o'z faoliyatini boshlagan kundan boshlab, abituriyentlarni oliy ta'lim muassasalariga tayyorlashda yuqori natijalarni ko'rsatib kelmoqda. Bizning asosiy maqsadimiz faqatgina nazariy bilimlarni berish emas, balki o'quvchilarning mantiqiy fikrlashini va imtihonlarga ruhiy tayyorgarligini oshirishdir.
                        </p>
                        <p>
                            Markazimizda asosan <span className="font-semibold text-gray-900">Kimyo</span> va <span className="font-semibold text-gray-900">Biologiya</span> fanlariga chuqurlashtirilgan holda e'tibor qaratiladi. Biz DTM testlari va Milliy Sertifikat (MS) imtihonlariga tayyorlash bo'yicha maxsus ishlab chiqilgan, zamonaviy o'quv dasturlaridan foydalanamiz.
                        </p>
                        <p>
                            Har bir dars tajribali ustozlar tomonidan, interaktiv usullarda olib boriladi. O'quvchilarimizning yutuqlari — bizning eng katta boyligimizdir.
                        </p>
                    </div>

                    {/* Quick Stats Section */}
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-100 pt-12">
                        <div className="text-center">
                            <div className="text-4xl font-extrabold text-blue-600 mb-2">95%</div>
                            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">O'qishga kirish ko'rsatkichi</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-extrabold text-blue-600 mb-2">10+</div>
                            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Tajribali ustozlar</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-extrabold text-blue-600 mb-2">500+</div>
                            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Muvaffaqiyatli bitiruvchilar</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}