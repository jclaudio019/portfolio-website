import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Experience from "@/pages/Experience";
import Skills from "@/pages/Skills";
import Resume from "@/pages/Resume";
import Contact from "@/pages/Contact";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
    return (
        <div className="App grain">
            <MotionConfig reducedMotion="user">
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <a href="#main-content" className="skip-link">Skip to main content</a>
                    <SmoothScroll>
                        <ScrollToTop />
                        <Navbar />
                        <main id="main-content" tabIndex={-1} className="relative z-[2] min-h-screen">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/projects/:slug" element={<ProjectDetail />} />
                                <Route path="/experience" element={<Experience />} />
                                <Route path="/skills" element={<Skills />} />
                                <Route path="/resume" element={<Resume />} />
                                <Route path="/contact" element={<Contact />} />
                            </Routes>
                        </main>
                        <Footer />
                    </SmoothScroll>
                </BrowserRouter>
            </MotionConfig>
            <Toaster position="top-right" richColors />
        </div>
    );
}

export default App;
