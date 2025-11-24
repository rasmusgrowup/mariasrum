"use client";

import Image from "next/image";
import Portrait from "../public/portrait.jpg";
import scss from "../styles/layout.module.scss";
import MailchimpForm from "../components/MailchimpForm";
import { useNewsletterModal } from "./NewsletterModalContext";

export default function NewsletterPopup() {
  const { isOpen, closeNewsletter } = useNewsletterModal();

  return (
    <div
      className={scss.newsletterPopup}
      style={{ display: isOpen ? "" : "none" }}
    >
      <div className={scss.newsletterImage}>
        <Image
          src={Portrait}
          alt="Portrait"
          width={500}
          height={600}
          objectFit="cover"
          objectPosition={"top center"}
          priority={true}
        />
      </div>
      <div className={scss.mailchimFormWrapper}>
        <MailchimpForm />
        <div className={scss.closeBtn} onClick={closeNewsletter}>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}