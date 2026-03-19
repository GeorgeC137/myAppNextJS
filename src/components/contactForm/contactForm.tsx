"use client";

import { sendContactEmail } from "@/lib/action";
import styles from "./contactForm.module.css";
import { useActionState, useEffect, useState } from "react";

const ContactForm = () => {
    const [state, formAction, isPending] = useActionState(sendContactEmail, undefined);
    const [showMessage, setShowMessage] = useState(false);

    // Track state changes to re-trigger the effect
    useEffect(() => {
        if (state?.success || state?.error) {
            // Show message
            setShowMessage(true);

            // Hide after 5 seconds
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [state]); // Watch the entire state object

    useEffect(() => {
        if (state?.success) {
            // Reset form on success
            const form = document.querySelector("form") as HTMLFormElement;
            form?.reset();
        }
    }, [state?.success]);

    return (
        <form action={formAction} className={styles.form}>
            <input
                type="text"
                name="name"
                placeholder="Name and Surname"
                disabled={isPending}
            />
            <input
                type="email"
                name="email"
                placeholder="Email Address"
                disabled={isPending}
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone Number (Optional)"
                disabled={isPending}
            />
            <textarea
                name="message"
                cols={30}
                rows={10}
                placeholder="Message"
                disabled={isPending}
            />
            <button type="submit" disabled={isPending}>
                {isPending ? "Sending..." : "Send"}
            </button>

            {showMessage && state?.success && (
                <p className={styles.success}>
                    Message sent successfully! We'll get back to you soon.
                </p>
            )}
            {showMessage && state?.error && (
                <p className={styles.error}>{state.error}</p>
            )}
        </form>
    );
}

export default ContactForm
