"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";

const NewsletterModalContext = createContext(null);

export function NewsletterModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const timerRef = useRef(null);

    const openNewsletter = () => {
        setIsOpen(true);
    };

    const closeNewsletter = () => {
        setIsOpen(true); // we’ll still let cookie logic handle auto-open next time
        setIsOpen(false);
        document.cookie =
            "modalClosed=true; path=/; max-age=" + 60 * 60 * 24 * 30;
    };

    // Cookie + timer logic moved here
    useEffect(() => {
        const cookies = document.cookie.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.split("=").map((c) => c.trim());
            if (key) acc[key] = value;
            return acc;
        }, {});

        if (cookies.modalClosed === "true") {
            setIsOpen(false);
            return;
        }

        timerRef.current = setTimeout(() => {
            setIsOpen(true);
        }, 5000);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const value = {
        isOpen,
        openNewsletter,
        closeNewsletter,
    };

    return (
        <NewsletterModalContext.Provider value={value}>
            {children}
        </NewsletterModalContext.Provider>
    );
}

// Custom hook for easy access
export function useNewsletterModal() {
    const ctx = useContext(NewsletterModalContext);
    if (!ctx) {
        throw new Error(
            "useNewsletterModal must be used within a NewsletterModalProvider"
        );
    }
    return ctx;
}