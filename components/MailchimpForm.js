import {useEffect, useState} from "react";
import Script from "next/script";
import styles from '../styles/mailchimp.module.scss'

export default function MailchimpForm() {
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        const initializeMailchimp = () => {
            if (typeof window !== "undefined") {
                window.fnames = [];
                window.ftypes = [];
                window.fnames[0] = "EMAIL";
                window.ftypes[0] = "email";
                window.fnames[1] = "FNAME";
                window.ftypes[1] = "text";
            }

            if (window.jQuery) {
                window.$mcj = window.jQuery.noConflict(true);
            }
        };

        if (window.jQuery) {
            initializeMailchimp();
        } else {
            const interval = setInterval(() => {
                if (window.jQuery) {
                    initializeMailchimp();
                    clearInterval(interval);
                }
            }, 500);
        }
    }, []);

    const handleSubmit = (e) => {
        setTimeout(() => {
            setFormSubmitted(true);
        }, 1000);
    };

    return (
        <div className={styles.mailChimpContainer}>
            {/* Load Mailchimp validation script */}
            <Script
                src="https://s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
                strategy="afterInteractive"
                onLoad={() => console.log("Mailchimp script loaded")}
            />

            {/* Mailchimp Form */}
            {!formSubmitted ? (
                <form
                    action="https://gmail.us14.list-manage.com/subscribe/post?u=afa7bafb8da9deb3bd242c3f0&amp;id=8b33abd27d&amp;f_id=0086fbe0f0"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    target="_blank"
                    noValidate
                    className={styles.form}
                >
                    <div id="mc_embed_signup_scroll">
                        <h2 className="text-xl font-semibold text-center">Tilmeld dig mit nyhedsbrev og få mine bedste tips til at balancere dit nervesystem.</h2>

                        <div>
                            <label className="d-none block text-sm font-medium" style={{ display: 'none' }}>Navn</label>
                            <input
                                type="text"
                                name="FNAME"
                                id="mce-FNAME"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Navn"
                            />
                        </div>

                        <div>
                            <label className="d-none block text-sm font-medium" style={{ display: 'none' }}>Email</label>
                            <input
                                type="email"
                                name="EMAIL"
                                required
                                id="mce-EMAIL"
                                placeholder="Email"
                                defaultValue=""
                            />
                        </div>

                        <input
                            type="submit"
                            className={styles.signUpButton}
                            id="mc-embedded-subscribe"
                            value={"Tilmeld"}
                            onClick={handleSubmit}
                        />
                    </div>
                </form>
            ) : (
                <h2 className="text-center text-green-600">Af hjertet tak fordi du har tilmeldt dig mit nyhedsbrev.</h2>
            )}
        </div>
    );
}