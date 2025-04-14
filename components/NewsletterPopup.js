"use client"

import { useState, useEffect } from "react";
import scss from "../styles/layout.module.scss";
import Image from "next/image";
import Portrait from "../public/portrait.jpg";
import MailchimpForm from "../components/MailchimpForm";

export default function NewsletterPopup() {
    const [closed, setClosed] = useState(false);

    // Read cookie when component mounts
    useEffect(() => {
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.split('=').map(c => c.trim());
            acc[key] = value;
            return acc;
        }, {});

        if (cookies.modalClosed === 'true') {
            setClosed(true);
        }
    }, []);

    const closeModal = () => {
        setClosed(true);
        document.cookie = "modalClosed=true; path=/; max-age=" + 60 * 60 * 24 * 30;
    }

    return (
        <div className={scss.newsletterPopup} style={{ display: closed ? "none" : "" }}>
            <Image src={Portrait} alt="Portrait" width={500} height={700} objectFit="cover" />
            <div className={scss.mailchimFormWrapper}>
                <MailchimpForm />
                <div className={scss.closeBtn} onClick={closeModal}>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
}