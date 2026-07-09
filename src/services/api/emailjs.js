import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends the contact form payload via EmailJS.
 * Requires VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and
 * VITE_EMAILJS_PUBLIC_KEY to be set in the project's .env file.
 */
export async function sendContactMessage(payload) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      "EmailJS sozlanmagan. .env faylida VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID va VITE_EMAILJS_PUBLIC_KEY qiymatlarini to'ldiring."
    );
  }

  const result = await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      subject: payload.subject,
      message: payload.message,
    },
    { publicKey: PUBLIC_KEY }
  );

  return result;
}
