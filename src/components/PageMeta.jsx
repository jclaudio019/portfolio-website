import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { publishedProjects } from "../data/content";

const SITE_NAME = "Jose Claudio";
const DEFAULT_DESCRIPTION = "Portfolio of Jose Claudio, an analytics professional combining forecasting, statistical modeling, automation, finance, and supply-chain decision support.";

const pageMeta = {
    "/": { title: "Applied Analytics, Forecasting & Statistical Modeling", description: DEFAULT_DESCRIPTION },
    "/about": { title: "About", description: "Learn how Jose Claudio combines finance, operations, supply chain, and applied statistics." },
    "/projects": { title: "Analytics Portfolio", description: "Explore forecasting, credit risk, retail operations, time-series, and financial-modeling case studies by Jose Claudio." },
    "/experience": { title: "Experience", description: "Professional experience in forecasting, inventory analysis, financial reporting, automation, and decision support." },
    "/resume": { title: "Resume & Contact", description: "View Jose Claudio's analytics resume and contact information." },
    "/projects/credit-risk-pd-model/dashboard": { title: "Credit Risk & Portfolio Expected Loss", description: "Interactive credit-risk analysis connecting probability of default to expected loss, portfolio risk, stress, simulation, and monitoring." },
};

export const resolvePageMeta = (pathname) => {
    if (pageMeta[pathname]) return pageMeta[pathname];
    const slug = pathname.match(/^\/projects\/([^/]+)$/)?.[1];
    const project = publishedProjects.find((item) => item.slug === slug);
    if (project) return { title: project.title, description: project.summary };
    return { title: "Page Not Found", description: DEFAULT_DESCRIPTION };
};

export default function PageMeta() {
    const { pathname } = useLocation();

    useEffect(() => {
        const meta = resolvePageMeta(pathname);
        document.title = `${meta.title} | ${SITE_NAME}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    }, [pathname]);

    return null;
}
