import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 22, className = "", as }) => {
    const MotionTag = as ? motion[as] : motion.div;
    return (
        <MotionTag
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </MotionTag>
    );
};

// Masked line-by-line reveal for hero headlines.
export const MaskedLines = ({ lines, className = "", lineClass = "" }) => {
    return (
        <span className={className}>
            {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                    <motion.span
                        className={`block ${lineClass}`}
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{
                            duration: 0.9,
                            delay: 0.15 + i * 0.12,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {line}
                    </motion.span>
                </span>
            ))}
        </span>
    );
};
