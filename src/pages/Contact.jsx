import { useState } from "react";
import { Github, Linkedin, Mail, Send, MapPin } from "lucide-react";
import { toast } from "sonner";
import { profile } from "../data/content";
import { sendContactMessage } from "../lib/api";
import { Reveal } from "../components/Reveal";

const initial = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
    const [form, setForm] = useState(initial);
    const [submitting, setSubmitting] = useState(false);

    const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error("Please fill in your name, email, and message.");
            return;
        }
        setSubmitting(true);
        try {
            const result = await sendContactMessage(form);
            if (result?.via === "mailto") {
                toast.success("Opening your email client…");
            } else {
                toast.success("Message sent — thank you! I'll get back to you soon.");
            }
            setForm(initial);
        } catch (err) {
            toast.error("Something went wrong. Please try again or email directly.");
        } finally {
            setSubmitting(false);
        }
    };

    const channels = [
        { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, testid: "contact-email" },
        { icon: Linkedin, label: "LinkedIn", value: "Connect", href: profile.linkedin, testid: "contact-linkedin" },
        { icon: Github, label: "GitHub", value: "View code", href: profile.github, testid: "contact-github" },
        { icon: MapPin, label: "Location", value: profile.location, href: null, testid: "contact-location" },
    ];

    const inputClass =
        "w-full border border-navy/15 bg-surface px-4 py-3 text-navy placeholder-navy/40 outline-none transition-colors focus:border-teal";

    return (
        <div className="px-6 pb-24 pt-36 lg:px-12 lg:pt-44" data-testid="contact-page">
            <div className="mx-auto max-w-[1400px]">
                <Reveal>
                    <p className="font-mono text-xs uppercase tracking-widest text-teal">Contact</p>
                    <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] tracking-tighter text-navy sm:text-5xl md:text-6xl">
                        Let’s talk about your data problem.
                    </h1>
                </Reveal>

                <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
                    {/* Channels */}
                    <Reveal>
                        <div className="space-y-px border border-navy/10 bg-navy/10">
                            {channels.map((c) => {
                                const Icon = c.icon;
                                const inner = (
                                    <div className="flex items-center gap-4 bg-surface p-6 transition-colors hover:bg-teal/10">
                                        <span className="text-teal">
                                            <Icon size={22} />
                                        </span>
                                        <div>
                                            <p className="font-mono text-[11px] uppercase tracking-widest text-navy/50">
                                                {c.label}
                                            </p>
                                            <p className="mt-1 font-display text-lg font-bold text-navy">
                                                {c.value}
                                            </p>
                                        </div>
                                    </div>
                                );
                                return c.href ? (
                                    <a
                                        key={c.label}
                                        href={c.href}
                                        target={c.href.startsWith("http") ? "_blank" : undefined}
                                        rel="noreferrer"
                                        data-testid={c.testid}
                                        className="block"
                                    >
                                        {inner}
                                    </a>
                                ) : (
                                    <div key={c.label} data-testid={c.testid}>{inner}</div>
                                );
                            })}
                        </div>
                    </Reveal>

                    {/* Form */}
                    <Reveal delay={0.1}>
                        <form onSubmit={onSubmit} data-testid="contact-form" className="border border-navy/10 bg-surface p-8">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="font-mono text-xs uppercase tracking-widest text-navy/60">Name</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={update}
                                        data-testid="contact-input-name"
                                        placeholder="Your name"
                                        className={`mt-2 ${inputClass}`}
                                    />
                                </div>
                                <div>
                                    <label className="font-mono text-xs uppercase tracking-widest text-navy/60">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={update}
                                        data-testid="contact-input-email"
                                        placeholder="you@company.com"
                                        className={`mt-2 ${inputClass}`}
                                    />
                                </div>
                            </div>
                            <div className="mt-5">
                                <label className="font-mono text-xs uppercase tracking-widest text-navy/60">Subject</label>
                                <input
                                    name="subject"
                                    value={form.subject}
                                    onChange={update}
                                    data-testid="contact-input-subject"
                                    placeholder="What's this about?"
                                    className={`mt-2 ${inputClass}`}
                                />
                            </div>
                            <div className="mt-5">
                                <label className="font-mono text-xs uppercase tracking-widest text-navy/60">Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={update}
                                    data-testid="contact-input-message"
                                    rows={5}
                                    placeholder="Tell me about the problem you're trying to solve…"
                                    className={`mt-2 resize-none ${inputClass}`}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                data-testid="contact-submit-btn"
                                className="mt-6 flex items-center gap-2 border border-navy bg-navy px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:bg-teal hover:border-teal disabled:opacity-60"
                            >
                                <Send size={16} /> {submitting ? "Sending…" : "Send message"}
                            </button>
                        </form>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
