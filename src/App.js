import "@/App.css";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "sonner";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Experience from "@/pages/Experience";
import Resume from "@/pages/Resume";
import NotFound from "@/pages/NotFound";

const CreditRiskDashboard = lazy(() => import("@/pages/CreditRiskDashboard"));

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
                        <PageMeta />
                        <Navbar />
                        <main id="main-content" tabIndex={-1} className="relative z-[2] min-h-screen">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/projects/credit-risk-pd-model/dashboard" element={<Suspense fallback={<div className="flex min-h-[70vh] items-center justify-center font-mono text-sm uppercase tracking-wider text-navy/60">Loading case study…</div>}><CreditRiskDashboard /></Suspense>} />
                                <Route path="/projects/:slug" element={<ProjectDetail />} />
                                <Route path="/experience" element={<Experience />} />
                                <Route path="/skills" element={<Navigate to="/projects" replace />} />
                                <Route path="/resume" element={<Resume />} />
                                <Route path="/contact" element={<Navigate to="/resume" replace />} />
                                <Route path="*" element={<NotFound />} />
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
