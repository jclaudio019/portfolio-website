import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] items-center px-6 pb-20 pt-28 lg:px-12" data-testid="not-found-page">
            <div className="site-shell">
                <p className="font-mono text-sm uppercase tracking-wider text-teal">404</p>
                <h1 className="fluid-page-title mt-4 font-display font-extrabold tracking-[-0.035em] text-navy">Page not found.</h1>
                <p className="mt-5 max-w-xl leading-relaxed text-navy/70">The page may have moved, but the portfolio and case studies are still available.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Link to="/projects" className="border border-navy bg-navy px-5 py-3 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:border-teal hover:bg-teal">View portfolio</Link>
                    <Link to="/" className="border border-navy/20 px-5 py-3 font-mono text-xs uppercase tracking-widest text-navy transition-colors hover:border-teal hover:text-teal">Return home</Link>
                </div>
            </div>
        </div>
    );
}
