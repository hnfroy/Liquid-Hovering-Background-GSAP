import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LiquidBackground from "./components/LiquidBackground";
import PageTransition from "./components/PageTransition";

export default function App() {
  const location = useLocation();

  return (
    <div className="app-root">
      {/* Liquid background sits behind everything */}
      <LiquidBackground />

      <header className="p-3! w-full flex items-center justify-center">
        <nav className="flex items-center gap-3">
          <Link to="/" className="hover:bg-white/20 px-3! py-2! bg-white/10 rounded-md">Home</Link>
          <Link to="/about" className="hover:bg-white/20 px-3! py-2! bg-white/10 rounded-md">About</Link>
        </nav>
      </header>

      {/* Page transitions wrapper */}
      <main className="h-[90vh]">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </PageTransition>
      </main>
    </div>
  );
}
