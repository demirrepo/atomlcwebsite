import { useState, useEffect } from "react";
import { supabase } from "@/supabase";
import {
    Lock, LogOut, Trash2, Plus, ArrowLeft, Users, BookOpen, Star,
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

// --- DRAG AND DROP COMPONENT FOR TEACHERS ---
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
    const [editingId, setEditingId] = useState<number | null>(null);

    const [teachers, setTeachers] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [advantages, setAdvantages] = useState<any[]>([]);

    // Forms
    const [teacherForm, setTeacherForm] = useState({ name: "", subject: "Kimyo", role: "Kimyo fani o'qituvchisi", existingImage: "" });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [courseForm, setCourseForm] = useState({ title: "", text: "", icon: "FlaskConical", color: "brand", language: "UZ / RU" });
    const [courseFeatures, setCourseFeatures] = useState<string[]>([]);
    const [featureInput, setFeatureInput] = useState("");
    const [advForm, setAdvForm] = useState({ title: "", text: "", icon: "Lightbulb" });

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); if (session) fetchAllData(); });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setSession(session); if (session) fetchAllData(); });
        return () => subscription.unsubscribe();
    }, []);

    const fetchAllData = async () => {
        const [t, c, a] = await Promise.all([
            supabase.from("teachers").select("*").order("sort_order", { ascending: true }),
            supabase.from("courses").select("*").order("id", { ascending: true }),
            supabase.from("advantages").select("*").order("id", { ascending: true })
        ]);
        if (t.data) setTeachers(t.data);
        if (c.data) setCourses(c.data);
        if (a.data) setAdvantages(a.data);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setTeacherForm({ name: "", subject: "Kimyo", role: "Kimyo fani o'qituvchisi", existingImage: "" });
        setImageFile(null);
        setCourseForm({ title: "", text: "", icon: "FlaskConical", color: "brand", language: "UZ / RU" });
        setCourseFeatures([]);
        setAdvForm({ title: "", text: "", icon: "Lightbulb" });
    };

    // --- SUBMIT TEACHER (ADD OR EDIT) ---
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

        if (editingId) {
            await supabase.from("teachers").update(payload).eq("id", editingId);
        } else {
            await supabase.from("teachers").insert([{ ...payload, sort_order: teachers.length }]);
        }

        cancelEdit();
        fetchAllData();
        setIsUploading(false);
    };

    // --- SUBMIT COURSE (ADD OR EDIT) ---
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

    // --- SUBMIT ADVANTAGE (ADD OR EDIT) ---
    const handleAdvantageSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!advForm.title) return;

        if (editingId) await supabase.from("advantages").update(advForm).eq("id", editingId);
        else await supabase.from("advantages").insert([advForm]);

        cancelEdit();
        fetchAllData();
    };

    const handleDelete = async (table: string, id: number) => {
        if (!confirm("Haqiqatan ham buni o'chirmoqchimisiz?")) return;
        await supabase.from(table).delete().eq("id", id);
        fetchAllData();
    };

    // --- DRAG AND DROP HANDLER ---
    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = teachers.findIndex(t => t.id === active.id);
            const newIndex = teachers.findIndex(t => t.id === over.id);
            const newOrder = arrayMove(teachers, oldIndex, newIndex);
            setTeachers(newOrder); // Update UI instantly

            // Update DB in background
            await Promise.all(newOrder.map((t, index) =>
                supabase.from("teachers").update({ sort_order: index }).eq("id", t.id)
            ));
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
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* FORMS SECTION */}
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
                    </div>

                    {/* LISTS SECTION */}
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
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}