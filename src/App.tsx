import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Advantages from "./components/Advantages";
import Teachers from "./components/Teachers";
import Contact from "./components/Contact";
import Admin from "./pages/Admin";

function MainWebsite() {
  return (
    <div className="min-h-screen bg-white text-ink-900 font-sans">
      <main>
        <Hero />
        <Courses />
        <Advantages />
        <Teachers />
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainWebsite />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}