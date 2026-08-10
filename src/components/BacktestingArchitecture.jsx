import { ArrowRight } from "lucide-react";

const lanes = [
    {
        label: "Historical backtesting",
        nodes: ["Notebook", "backtestlib", "Strategy & portfolio review"],
    },
    {
        label: "Paper-trading event flow",
        nodes: ["EMA crossover", "Alpaca paper account", "Trade listener", "FastAPI", "QuestDB"],
    },
];

export default function BacktestingArchitecture() {
    return (
        <figure
            data-testid="backtesting-architecture"
            className="mt-8 overflow-hidden border border-navy/10 bg-navy px-4 py-6 text-white sm:px-6"
        >
            <figcaption className="font-mono text-xs uppercase tracking-widest text-teal">
                System architecture
            </figcaption>
            <div className="mt-5 space-y-6">
                {lanes.map((lane) => (
                    <section key={lane.label} aria-label={lane.label}>
                        <h3 className="text-sm font-semibold text-white">{lane.label}</h3>
                        <ol className="mt-3 grid gap-2 sm:grid-flow-col sm:auto-cols-fr">
                            {lane.nodes.map((node, index) => (
                                <li key={node} className="relative border border-white/20 bg-white/5 px-3 py-3 text-sm">
                                    {node}
                                    {index < lane.nodes.length - 1 ? (
                                        <ArrowRight aria-hidden="true" className="mt-2 block text-teal sm:absolute sm:-right-2 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2" />
                                    ) : null}
                                </li>
                            ))}
                        </ol>
                    </section>
                ))}
            </div>
        </figure>
    );
}
