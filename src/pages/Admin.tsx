import { useState, useEffect } from "react";
import { supabase } from "@/supabase";
import {
    Lock, LogOut, Trash2, Plus, Users, BookOpen, Star,
    FlaskConical, Dna, Layers, Lightbulb, Building2, LineChart,
    Rocket, Laptop, Globe, Target, Award, Zap, Shield, CheckCircle2,
    GripVertical, Edit2, X
} from "lucide-react";
import { Link } from "react-router-dom";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const iconOptions = [
    { name: "FlaskConical", component: FlaskConical }, { name: "Dna", component: Dna },
    { name: "Layers", component: Layers }, { name: "Users", component: Users },
    { name: "Lightbulb", component: Lightbulb }, { name: "Building2", component: Building2 },
    { name: "LineChart", component: LineChart }, { name: "Rocket", component: Rocket },
    { name: "Laptop", component: Laptop }, { name: "Globe", component: Globe },
    { name: "Target", component: Target }, { name: "Award", component: Award },
    { name: "Zap", component: Zap }, { name: "Shield", component: Shield },
];

function SortableTeacherItem({ t, onEdit, onDelete }: any) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: t.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div ref={setNodeRef} style={style} className="flex items-center justify-between rounded-xl border p-4 bg-white hover:border-brand-200">
            <div className="flex items-center gap-3">
                <button {...attributes} {...listeners} className="cursor-grab text-ink-300 hover:text-ink-600 focus:outline-none"><GripVertical className="h-5 w-5" /></button>
                {t.image && <img src={t.image} alt="pic" className="h-10 w-10 rounded-full object-cover border" />}
                <div><p className="font-bold leading-tight">{t.name}</p><p className="text-xs text-ink-500">{t.subject}</p></div>
            </div>
            <div className="flex gap-1">
                <button onClick={() => onEdit(t)} className="p-2 text-brand-500 hover:text-brand-700 hover:bg-brand-50 rounded-lg"><Edit2 className="h-4 w-4" /></button>
                <button onClick={() => onDelete("teachers", t.id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
            </div>
        </div>
    );
}

export default function Admin() {
    const [session, setSession] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("courses");
    const [editingId, setEditingId] = useState<any>(null);

    const [teachers, setTeachers] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [advantages, setAdvantages] = useState<any[]>([]);
    const [results, setResults] = useState<any[]>([]);

    const [teacherForm, setTeacherForm] = useState({ name: "", subject: "Kimyo", role: "Kimyo fani o'qituvchisi", existingImage: "" });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [courseForm, setCourseForm] = useState({ title: "", text: "", icon: "FlaskConical", color: "brand", language: "UZ / RU" });
    const [courseFeatures, setCourseFeatures] = useState<string[]>([]);
    const [featureInput, setFeatureInput] = useState("");

    const [advForm, setAdvForm] = useState({ title: "", text: "", icon: "Lightbulb" });

    const [resName, setResName] = useState("");
    const [resType, setResType] = useState<"DTM" | "MS">("DTM");
    const [resScore, setResScore] = useState("");
    const [resLevel, setResLevel] = useState("");
    const [resUniversity, setResUniversity] = useState("");
    const [resDate, setResDate] = useState("");
    const [resImageFile, setResImageFile] = useState<File | null>(null);
    const [isUploadingRes, setIsUploadingRes] = useState(false);

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); if (session) fetchAllData(); });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setSession(session); if (session) fetchAllData(); });
        return () => subscription.unsubscribe();
    }, []);

    const fetchAllData = async () => {
        const [t, c, a, r] = await Promise.all([
            supabase.from("teachers").select("*").order("sort_order", { ascending: true }),
            supabase.from("courses").select("*").order("id", { ascending: true }),
            supabase.from("advantages").select("*").order("id", { ascending: true }),
            supabase.from("results").select("*").order("created_at", { ascending: false })
        ]);
        if (t.data) setTeachers(t.data);
        if (c.data) setCourses(c.data);
        if (a.data) setAdvantages(a.data);
        if (r.data) setResults(r.data);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setTeacherForm({ name: "", subject: "Kimyo", role: "Kimyo fani o'qituvchisi", existingImage: "" });
        setImageFile(null);
        setCourseForm({ title: "", text: "", icon: "FlaskConical", color: "brand", language: "UZ / RU" });
        setCourseFeatures([]);
        setAdvForm({ title: "", text: "", icon: "Lightbulb" });
    };

    const handleTeacherSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!teacherForm.name) return;
        setIsUploading(true);
        let imageUrl = teacherForm.existingImage;
        if (imageFile) {
            const fileName = `${Date.now()}.${imageFile.name.split('.').pop()}`;
            const { error: uploadError } = await supabase.storage.from("teachers").upload(fileName, imageFile);
            if (uploadError) { alert("Rasm yuklashda xatolik: " + uploadError.message); setIsUploading(false); return; }
            imageUrl = supabase.storage.from("teachers").getPublicUrl(fileName).data.publicUrl;
        }
        const payload = { name: teacherForm.name, subject: teacherForm.subject, role: teacherForm.role, image: imageUrl };
        if (editingId) await supabase.from("teachers").update(payload).eq("id", editingId);
        else await supabase.from("teachers").insert([{ ...payload, sort_order: teachers.length }]);
        cancelEdit();
        fetchAllData();
        setIsUploading(false);
    };

    const handleCourseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!courseForm.title) return;
        const generatedTag = courseForm.title.split(" ")[0];
        const payload = { ...courseForm, tag: generatedTag, features: courseFeatures };
        if (editingId) await supabase.from("courses").update(payload).eq("id", editingId);
        else await supabase.from("courses").insert([payload]);
        cancelEdit();
        fetchAllData();
    };

    const addFeature = () => { if (featureInput.trim()) { setCourseFeatures([...courseFeatures, featureInput.trim()]); setFeatureInput(""); } };

    const handleAdvantageSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!advForm.title) return;
        if (editingId) await supabase.from("advantages").update(advForm).eq("id", editingId);
        else await supabase.from("advantages").insert([advForm]);
        cancelEdit();
        fetchAllData();
    };

    const handleResultSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resImageFile || !resName || !resDate || !resScore) {
            alert("Iltimos, barcha majburiy maydonlarni to'ldiring!");
            return;
        }
        if (resType === "DTM" && !resUniversity) {
            alert("DTM uchun oliygoh nomini kiriting!");
            return;
        }
        if (resType === "MS" && !resLevel) {
            alert("Sertifikat darajasini (masalan: A+) kiriting!");
            return;
        }

        setIsUploadingRes(true);

        try {
            const fileExt = resImageFile.name.split(".").pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage.from("certificates").upload(fileName, resImageFile);
            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage.from("certificates").getPublicUrl(fileName);
            const imageUrl = publicUrlData.publicUrl;

            const { error: insertError } = await supabase.from("results").insert([{
                student_name: resName,
                exam_type: resType,
                score: resScore,
                level: resType === "MS" ? resLevel : null,
                university: resType === "DTM" ? resUniversity : null,
                date_received: resDate,
                image_url: imageUrl,
            }]);

            if (insertError) throw insertError;

            alert("Natija muvaffaqiyatli qo'shildi! 🎉");
            setResName(""); setResScore(""); setResLevel(""); setResUniversity(""); setResDate(""); setResImageFile(null);

            const fileInput = document.getElementById('res-file-upload') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            fetchAllData();
        } catch (error: any) {
            alert("Xatolik yuz berdi: " + error.message);
        } finally {
            setIsUploadingRes(false);
        }
    };

    const handleDelete = async (table: string, id: any) => {
        if (!confirm("Haqiqatan ham buni o'chirmoqchimisiz?")) return;
        await supabase.from(table).delete().eq("id", id);
        fetchAllData();
    };

    const handleResultDelete = async (id: string, imageUrl: string) => {
        if (!confirm("Haqiqatan ham bu natijani o'chirmoqchimisiz?")) return;
        try {
            await supabase.from("results").delete().eq("id", id);
            const fileName = imageUrl.split('/').pop();
            if (fileName) {
                await supabase.storage.from("certificates").remove([fileName]);
            }
            fetchAllData();
        } catch (error: any) {
            alert("O'chirishda xatolik: " + error.message);
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = teachers.findIndex(t => t.id === active.id);
            const newIndex = teachers.findIndex(t => t.id === over.id);
            const newOrder = arrayMove(teachers, oldIndex, newIndex);
            setTeachers(newOrder);
            await Promise.all(newOrder.map((t, index) => supabase.from("teachers").update({ sort_order: index }).eq("id", t.id)));
        }
    };

    if (!session) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4">
                <form onSubmit={async (e) => { e.preventDefault(); setLoading(true); await supabase.auth.signInWithPassword({ email, password }); setLoading(false); }} className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-soft">
                    <div className="mb-6 flex justify-center"><Lock className="h-10 w-10 text-brand-600" /></div>
                    <h1 className="mb-6 text-center text-2xl font-bold">Admin Panel</h1>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="mb-4 w-full rounded-xl border p-3 text-sm focus:outline-brand-600" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Parol" className="mb-6 w-full rounded-xl border p-3 text-sm focus:outline-brand-600" />
                    <button type="submit" disabled={loading} className="w-full rounded-xl bg-brand-600 p-3 font-bold text-white hover:bg-brand-700">Kirish</button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ink-50 pb-20">
            <header className="border-b border-ink-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-extrabold text-ink-900">Atom CMS</h1>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-sm font-bold text-ink-600 hover:text-brand-600">Saytni ko'rish</Link>
                        <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50"><LogOut className="h-4 w-4" /> Chiqish</button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 pt-8">
                <div className="mb-8 flex flex-wrap gap-3 border-b border-ink-200 pb-4">
                    <button onClick={() => { setActiveTab("courses"); cancelEdit(); }} className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${activeTab === "courses" ? "bg-ink-900 text-white" : "bg-white text-ink-600 hover:bg-ink-100"}`}><BookOpen className="h-4 w-4" /> Kurslar</button>
                    <button onClick={() => { setActiveTab("teachers"); cancelEdit(); }} className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${activeTab === "teachers" ? "bg-ink-900 text-white" : "bg-white text-ink-600 hover:bg-ink-100"}`}><Users className="h-4 w-4" /> Ustozlar</button>
                    <button onClick={() => { setActiveTab("advantages"); cancelEdit(); }} className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${activeTab === "advantages" ? "bg-ink-900 text-white" : "bg-white text-ink-600 hover:bg-ink-100"}`}><Star className="h-4 w-4" /> Afzalliklar</button>
                    <button onClick={() => { setActiveTab("results"); cancelEdit(); }} className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${activeTab === "results" ? "bg-brand-600 text-white" : "bg-white text-ink-600 hover:bg-ink-100"}`}><Award className="h-4 w-4" /> Natijalar</button>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft lg:col-span-1 h-fit">

                        {activeTab === "teachers" && (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold">{editingId ? "Ustozni tahrirlash" : "Yangi ustoz qo'shish"}</h2>
                                    {editingId && <button onClick={cancelEdit} className="text-ink-400 hover:text-red-500"><X className="h-5 w-5" /></button>}
                                </div>
                                <form onSubmit={handleTeacherSubmit} className="space-y-4">
                                    <input type="text" value={teacherForm.name} onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })} placeholder="F.I.O" required className="w-full rounded-xl border p-2.5 text-sm" />
                                    <select value={teacherForm.subject} onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })} className="w-full rounded-xl border p-2.5 text-sm bg-white">
                                        <option value="Kimyo">Kimyo</option><option value="Biologiya">Biologiya</option>
                                    </select>
                                    <input type="text" value={teacherForm.role} onChange={(e) => setTeacherForm({ ...teacherForm, role: e.target.value })} placeholder="Lavozim" required className="w-full rounded-xl border p-2.5 text-sm" />
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold text-ink-500">{editingId ? "Yangi rasm yuklash (ixtiyoriy)" : "Rasm yuklash"}</label>
                                        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full rounded-xl border p-2 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700 cursor-pointer" />
                                    </div>
                                    <button type="submit" disabled={isUploading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 p-3 font-bold text-white hover:bg-brand-700 disabled:opacity-50">
                                        <Plus className="h-4 w-4" /> {isUploading ? "Yuklanmoqda..." : (editingId ? "Yangilash" : "Qo'shish")}
                                    </button>
                                </form>
                            </>
                        )}

                        {activeTab === "courses" && (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold">{editingId ? "Kursni tahrirlash" : "Yangi kurs qo'shish"}</h2>
                                    {editingId && <button onClick={cancelEdit} className="text-ink-400 hover:text-red-500"><X className="h-5 w-5" /></button>}
                                </div>
                                <form onSubmit={handleCourseSubmit} className="space-y-4">
                                    <input type="text" value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} placeholder="Kurs nomi" required className="w-full rounded-xl border p-2.5 text-sm" />
                                    <textarea value={courseForm.text} onChange={(e) => setCourseForm({ ...courseForm, text: e.target.value })} placeholder="Qisqacha ta'rif" required rows={3} className="w-full rounded-xl border p-2.5 text-sm" />
                                    <div className="rounded-xl border border-ink-200 bg-ink-50 p-3">
                                        <label className="mb-2 block text-xs font-bold text-ink-600 uppercase">Qulayliklar</label>
                                        <div className="flex gap-2 mb-3">
                                            <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }} placeholder="Yangi qulaylik..." className="flex-1 rounded-lg border p-2 text-sm" />
                                            <button type="button" onClick={addFeature} className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-bold text-white">+</button>
                                        </div>
                                        <ul className="space-y-2">
                                            {courseFeatures.map((f, i) => (
                                                <li key={i} className="flex items-center justify-between rounded-lg bg-white p-2 text-sm shadow-sm border border-ink-100"><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-500" /> {f}</span><button type="button" onClick={() => setCourseFeatures(courseFeatures.filter((_, index) => index !== i))} className="text-red-500"><Trash2 className="h-4 w-4" /></button></li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex gap-2">
                                        <select value={courseForm.language} onChange={(e) => setCourseForm({ ...courseForm, language: e.target.value })} className="w-1/2 rounded-xl border p-2.5 text-sm bg-white"><option value="UZ / RU">UZ / RU</option><option value="UZ">Faqat UZ</option><option value="RU">Faqat RU</option></select>
                                        <select value={courseForm.color} onChange={(e) => setCourseForm({ ...courseForm, color: e.target.value })} className="w-1/2 rounded-xl border p-2.5 text-sm bg-white"><option value="brand">Brand (Ko'k)</option><option value="bio">Bio (Yashil)</option></select>
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-xs font-semibold text-ink-500">Ikonka</label>
                                        <div className="flex flex-wrap gap-2">
                                            {iconOptions.map((icon) => {
                                                const Icon = icon.component;
                                                return (<button key={icon.name} type="button" onClick={() => setCourseForm({ ...courseForm, icon: icon.name })} className={`p-2.5 rounded-xl border transition-all ${courseForm.icon === icon.name ? "border-brand-600 bg-brand-50 text-brand-600" : "border-ink-200 text-ink-400 hover:bg-ink-50"}`}><Icon className="h-5 w-5" /></button>);
                                            })}
                                        </div>
                                    </div>
                                    <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 p-3 font-bold text-white hover:bg-brand-700"><Plus className="h-4 w-4" /> {editingId ? "Yangilash" : "Qo'shish"}</button>
                                </form>
                            </>
                        )}

                        {activeTab === "advantages" && (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold">{editingId ? "Afzallikni tahrirlash" : "Yangi afzallik qo'shish"}</h2>
                                    {editingId && <button onClick={cancelEdit} className="text-ink-400 hover:text-red-500"><X className="h-5 w-5" /></button>}
                                </div>
                                <form onSubmit={handleAdvantageSubmit} className="space-y-4">
                                    <input type="text" value={advForm.title} onChange={(e) => setAdvForm({ ...advForm, title: e.target.value })} placeholder="Sarlavha" required className="w-full rounded-xl border p-2.5 text-sm" />
                                    <textarea value={advForm.text} onChange={(e) => setAdvForm({ ...advForm, text: e.target.value })} placeholder="Matn" required rows={3} className="w-full rounded-xl border p-2.5 text-sm" />
                                    <div>
                                        <label className="mb-2 block text-xs font-semibold text-ink-500">Ikonka</label>
                                        <div className="flex flex-wrap gap-2">
                                            {iconOptions.map((icon) => {
                                                const Icon = icon.component;
                                                return (<button key={icon.name} type="button" onClick={() => setAdvForm({ ...advForm, icon: icon.name })} className={`p-2.5 rounded-xl border transition-all ${advForm.icon === icon.name ? "border-brand-600 bg-brand-50 text-brand-600" : "border-ink-200 text-ink-400 hover:bg-ink-50"}`}><Icon className="h-5 w-5" /></button>);
                                            })}
                                        </div>
                                    </div>
                                    <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 p-3 font-bold text-white hover:bg-brand-700"><Plus className="h-4 w-4" /> {editingId ? "Yangilash" : "Qo'shish"}</button>
                                </form>
                            </>
                        )}

                        {activeTab === "results" && (
                            <>
                                <h2 className="text-lg font-bold mb-4 text-brand-600">Yangi Natija Qo'shish</h2>
                                <form onSubmit={handleResultSubmit} className="space-y-4">
                                    <input type="text" value={resName} onChange={(e) => setResName(e.target.value)} placeholder="O'quvchining F.I.O." required className="w-full rounded-xl border p-2.5 text-sm" />

                                    <div className="grid grid-cols-2 gap-2">
                                        <select value={resType} onChange={(e) => setResType(e.target.value as "DTM" | "MS")} className="w-full rounded-xl border p-2.5 text-sm bg-white">
                                            <option value="DTM">DTM Imtihoni</option>
                                            <option value="MS">Milliy Sertifikat</option>
                                        </select>
                                        <input type="text" value={resScore} onChange={(e) => setResScore(e.target.value)} placeholder="Ball (mas: 189 yoki 100%)" required className="w-full rounded-xl border p-2.5 text-sm" />
                                    </div>

                                    {resType === "MS" ? (
                                        <input type="text" value={resLevel} onChange={(e) => setResLevel(e.target.value)} placeholder="Daraja (mas: A+, A, B)" required className="w-full rounded-xl border p-2.5 text-sm" />
                                    ) : (
                                        <input type="text" value={resUniversity} onChange={(e) => setResUniversity(e.target.value)} placeholder="Oliygoh nomi (mas: TMA)" required className="w-full rounded-xl border p-2.5 text-sm" />
                                    )}

                                    <input type="date" value={resDate} onChange={(e) => setResDate(e.target.value)} required className="w-full rounded-xl border p-2.5 text-sm" />

                                    <div>
                                        <label className="mb-1 block text-xs font-semibold text-ink-500">Natija Rasmi / Sertifikat</label>
                                        <input id="res-file-upload" type="file" accept="image/*" onChange={(e) => setResImageFile(e.target.files?.[0] || null)} required className="w-full rounded-xl border p-2 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700 cursor-pointer" />
                                    </div>

                                    <button type="submit" disabled={isUploadingRes} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 p-3 font-bold text-white hover:bg-brand-700 disabled:opacity-50">
                                        <Plus className="h-4 w-4" /> {isUploadingRes ? "Yuklanmoqda..." : "Natijani Qo'shish"}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>

                    <div className="col-span-2 rounded-2xl border border-ink-200 bg-white p-6 shadow-soft">
                        <h2 className="mb-4 text-lg font-bold">Mavjud ma'lumotlar ro'yxati</h2>
                        <div className="max-h-[600px] space-y-3 overflow-y-auto pr-2">

                            {activeTab === "teachers" && (
                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={teachers} strategy={verticalListSortingStrategy}>
                                        {teachers.map((t) => (
                                            <SortableTeacherItem key={t.id} t={t} onDelete={handleDelete} onEdit={(t: any) => { setEditingId(t.id); setTeacherForm({ name: t.name, subject: t.subject, role: t.role, existingImage: t.image }); }} />
                                        ))}
                                    </SortableContext>
                                </DndContext>
                            )}

                            {activeTab === "courses" && courses.map((c) => (
                                <div key={c.id} className="flex items-center justify-between rounded-xl border p-4 hover:border-brand-200">
                                    <div><p className="font-bold">{c.title}</p><p className="text-xs font-medium text-brand-600">{c.language} | {c.features.length} ta qulaylik</p></div>
                                    <div className="flex gap-1">
                                        <button onClick={() => { setEditingId(c.id); setCourseForm({ title: c.title, text: c.text, icon: c.icon, color: c.color, language: c.language }); setCourseFeatures(c.features || []); }} className="p-2 text-brand-500 hover:bg-brand-50 rounded-lg"><Edit2 className="h-4 w-4" /></button>
                                        <button onClick={() => handleDelete("courses", c.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                                    </div>
                                </div>
                            ))}

                            {activeTab === "advantages" && advantages.map((a) => (
                                <div key={a.id} className="flex items-center justify-between rounded-xl border p-4 hover:border-brand-200">
                                    <div><p className="font-bold">{a.title}</p></div>
                                    <div className="flex gap-1">
                                        <button onClick={() => { setEditingId(a.id); setAdvForm({ title: a.title, text: a.text, icon: a.icon }); }} className="p-2 text-brand-500 hover:bg-brand-50 rounded-lg"><Edit2 className="h-4 w-4" /></button>
                                        <button onClick={() => handleDelete("advantages", a.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                                    </div>
                                </div>
                            ))}

                            {activeTab === "results" && results.map((r) => (
                                <div key={r.id} className="flex items-center justify-between rounded-xl border p-4 hover:border-brand-200 bg-white">
                                    <div className="flex items-center gap-4">
                                        <img src={r.image_url} alt="cert" className="h-12 w-16 object-cover rounded-lg border border-ink-200" />
                                        <div>
                                            <p className="font-bold">
                                                {r.student_name}
                                                <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded ml-2">{r.score}</span>
                                            </p>
                                            <p className="text-xs font-medium text-gray-500 mt-1">
                                                <span className="text-brand-600 font-bold">{r.exam_type}</span>
                                                {r.level && ` • ${r.level} daraja`}
                                                {r.university && ` • 🏛️ ${r.university}`}
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleResultDelete(r.id, r.image_url)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            {activeTab === "results" && results.length === 0 && (
                                <p className="text-center text-ink-500 py-10 text-sm">Hozircha natijalar yo'q.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}