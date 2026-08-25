import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
    { to: "/about", label: "About Me" },
    { to: "/projects", label: "Portfolio" },
    { to: "/experience", label: "Experience" },
    { to: "/skills", label: "Skills" },
    { to: "/resume", label: "Resume" },
    { to: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            data-testid="navbar"
            className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
                scrolled
                    ? "border-b border-navy/10 bg-cream/70 backdrop-blur-xl"
                    : "border-b border-transparent"
            }`}
        >
            <nav className="site-shell flex items-center justify-between px-6 py-4 lg:px-12">
                <Link
                    to="/"
                    data-testid="nav-logo"
                    className="font-display text-lg font-extrabold tracking-tight text-navy"
                    onClick={() => setOpen(false)}
                >
                    Jose Claudio<span className="text-teal">.</span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            data-testid={`nav-${l.label.toLowerCase()}`}
                            className={({ isActive }) =>
                                `nav-underline font-mono text-sm uppercase tracking-wider text-navy/80 transition-colors hover:text-navy ${
                                    isActive ? "is-active text-navy" : ""
                                }`
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                    <Link
                        to="/resume"
                        data-testid="nav-resume-download"
                        className="border border-navy bg-navy px-4 py-2 font-mono text-sm uppercase tracking-wider text-cream transition-colors hover:bg-teal hover:border-teal"
                    >
                        Resume
                    </Link>
                </div>

                <button
                    className="-m-2.5 p-2.5 text-navy md:hidden"
                    onClick={() => setOpen((v) => !v)}
                    data-testid="nav-mobile-toggle"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {open && (
                <div
                    id="mobile-menu"
                    className="border-t border-navy/10 bg-cream/95 backdrop-blur-xl md:hidden"
                    data-testid="mobile-menu"
                >
                    <div className="flex flex-col px-6 py-4">
                        {links.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                onClick={() => setOpen(false)}
                                data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                                className="border-b border-navy/5 py-3 font-mono text-sm uppercase tracking-widest text-navy"
                            >
                                {l.label}
                            </NavLink>
                        ))}
                        <Link
                            to="/resume"
                            onClick={() => setOpen(false)}
                            className="mt-4 bg-navy px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-cream"
                        >
                            Resume
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
