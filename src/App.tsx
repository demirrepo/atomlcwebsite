import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // <-- We brought it back!
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Advantages from "./components/Advantages";
import Teachers from "./components/Teachers";
import Contact from "./components/Contact";
import Admin from "./pages/Admin";

import Results from "./pages/Results";
import About from "./pages/About";

function MainWebsite() {
  return (
    <div className="min-h-screen bg-white text-ink-900 font-sans">
      <Navbar /> {/* <-- Plugged it in right here at the top */}
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
        {/* Your main single-page landing site */}
        <Route path="/" element={<MainWebsite />} />

        {/* The new dedicated pages */}
        <Route path="/natijalar" element={<Results />} />
        <Route path="/biz-haqimizda" element={<About />} />

        {/* Your secure admin panel */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}