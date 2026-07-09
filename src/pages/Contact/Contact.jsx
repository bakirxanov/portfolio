import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { Send, MapPin, CheckCircle2 } from 'lucide-react';
import { FaTelegramPlane, FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { fadeUp, fromLeft, fromRight } from '../../utils/animations';
import { sendContactMessage } from '../../services/api/emailjs';

const SOCIALS = [
  { icon: FaTelegramPlane, href: 'https://t.me/example', label: 'Telegram' },
  { icon: FaInstagram, href: 'https://instagram.com/example', label: 'Instagram' },
  { icon: FaGithub, href: 'https://github.com/example', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com/in/example', label: 'LinkedIn' },
];

const EMPTY_FORM = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [focusField, setFocusField] = useState(null);

  const mutation = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => setForm(EMPTY_FORM),
  });

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = t('contact.form.errors.nameRequired');
    if (!form.email.trim()) e.email = t('contact.form.errors.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = t('contact.form.errors.emailInvalid');
    if (form.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(form.phone))
      e.phone = t('contact.form.errors.phoneInvalid');
    if (!form.subject.trim()) e.subject = t('contact.form.errors.subjectRequired');
    if (!form.message.trim()) e.message = t('contact.form.errors.messageRequired');
    else if (form.message.trim().length < 10) e.message = t('contact.form.errors.messageMin');
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) mutation.mutate(form);
  }

  const fields = [
    { name: 'name', type: 'text', direction: fromLeft },
    { name: 'email', type: 'email', direction: fromRight },
    { name: 'phone', type: 'tel', direction: fromLeft },
    { name: 'subject', type: 'text', direction: fromRight },
  ];

  return (
    <section className="relative pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-accent-hover tracking-[0.3em] uppercase text-sm mb-3 text-center"
        >
          {t('contact.subtitle')}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="font-display text-4xl md:text-5xl font-extrabold text-center mb-16 text-gradient"
        >
          {t('contact.title')}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-3xl p-8 glass glow-border shadow-card space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map(({ name, type, direction }) => (
                <motion.div key={name} variants={direction} className={name === 'subject' ? 'sm:col-span-2' : ''}>
                  <label className="block text-sm text-text-secondary mb-2">
                    {t(`contact.form.${name}`)}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    onFocus={() => setFocusField(name)}
                    onBlur={() => setFocusField(null)}
                    placeholder={t(`contact.form.${name}Placeholder`)}
                    className={`w-full px-4 py-3 rounded-xl bg-bg-secondary/60 border text-white placeholder:text-text-secondary/50 outline-none transition-all duration-300 ${
                      focusField === name
                        ? 'border-accent-hover shadow-glow'
                        : errors[name]
                        ? 'border-accent'
                        : 'border-border/30'
                    }`}
                  />
                  <AnimatePresence>
                    {errors[name] && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-accent-hover text-xs mt-1.5"
                      >
                        {errors[name]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp}>
              <label className="block text-sm text-text-secondary mb-2">
                {t('contact.form.message')}
              </label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocusField('message')}
                onBlur={() => setFocusField(null)}
                placeholder={t('contact.form.messagePlaceholder')}
                className={`w-full px-4 py-3 rounded-xl bg-bg-secondary/60 border text-white placeholder:text-text-secondary/50 outline-none resize-none transition-all duration-300 ${
                  focusField === 'message'
                    ? 'border-accent-hover shadow-glow'
                    : errors.message
                    ? 'border-accent'
                    : 'border-border/30'
                }`}
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-accent-hover text-xs mt-1.5"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              variants={fadeUp}
              type="submit"
              disabled={mutation.isPending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
              className="w-full flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-accent hover:bg-accent-hover text-white font-medium shadow-glow transition-colors disabled:opacity-60"
            >
              {mutation.isPending ? t('contact.form.sending') : t('contact.form.send')}
              {!mutation.isPending && <Send size={16} />}
            </motion.button>

            <AnimatePresence>
              {mutation.isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 border border-green-400/30 rounded-xl px-4 py-3"
                >
                  <CheckCircle2 size={16} />
                  {t('contact.form.success')}
                </motion.div>
              )}
              {mutation.isError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-accent-hover bg-accent/10 border border-accent/30 rounded-xl px-4 py-3"
                >
                  {mutation.error?.message || 'Xabarni yuborishda xatolik yuz berdi. Birozdan so‘ng qayta urinib ko‘ring.'}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="rounded-3xl p-8 glass glow-border shadow-card">
              <div className="flex items-center gap-3 mb-3 text-accent-hover">
                <MapPin size={20} />
                <span className="text-sm uppercase tracking-widest text-text-secondary">
                  {t('contact.location')}
                </span>
              </div>
              <p className="font-display text-xl font-semibold text-white mb-2">
                {t('contact.locationValue')}
              </p>
              <p className="text-sm text-text-secondary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
                {t('contact.availability')}
              </p>
            </div>

            <div className="rounded-3xl p-8 glass glow-border shadow-card">
              <h4 className="text-sm uppercase tracking-widest text-text-secondary mb-5">
                {t('contact.followMe')}
              </h4>
              <div className="flex gap-3 flex-wrap">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="w-12 h-12 flex items-center justify-center rounded-full glass border border-border/40 text-white hover:text-accent-hover hover:shadow-glow transition-all"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
