import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Advantages from "@/components/Advantages";
import Courses from "@/components/Courses";
import Teachers from "@/components/Teachers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink-900 antialiased">
      <Navbar />
      <main>
        <Hero />
        <Advantages />
        <Courses />
        <Teachers />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
