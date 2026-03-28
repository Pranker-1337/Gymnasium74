import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { translations } from "./translations";
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Star, 
  Menu, 
  X, 
  Globe, 
  ChevronRight,
  Quote,
  Heart,
  Award,
  Users,
  ArrowUpRight
} from "lucide-react";
import { cn } from "./lib/utils";

type Language = "ru" | "tj";

export default function App() {
  const [lang, setLang] = useState<Language>("ru");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => setLang(lang === "ru" ? "tj" : "ru");

  // Image URLs - using relative paths for reliability
  const isGitHubPages = window.location.hostname.includes('github.io');
  const imgSchool = isGitHubPages ? "https://images.unsplash.com/photo-1541339907198-e08756eaa589?auto=format&fit=crop&q=80&w=2000" : "/api/attachments/input_file_1.png";
  const imgForest = isGitHubPages ? "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000" : "/api/attachments/input_file_0.png";

  // Fallback images in case attachments are missing
  const fallbackSchool = "https://images.unsplash.com/photo-1541339907198-e08756eaa589?auto=format&fit=crop&q=80&w=2000";
  const fallbackForest = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000";

  // New Gallery Images from Google Maps
  const galleryImages = [
    { 
      url: "https://images.unsplash.com/photo-1523050853051-f750004c4139?auto=format&fit=crop&q=80&w=2000", 
      mapsUrl: "https://maps.app.goo.gl/85tRNpjAGFfsRytYA" 
    },
    { 
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2000", 
      mapsUrl: "https://maps.app.goo.gl/JF142Ha3eJ5bgCZt8" 
    }
  ];

  return (
    <div className="min-h-screen selection:bg-prestige-gold selection:text-white font-sans bg-prestige-paper text-white">
      {/* Navigation */}
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 md:px-12",
          scrolled ? "bg-prestige-navy/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-8"
        )}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-prestige-gold rounded-full flex items-center justify-center text-prestige-navy transition-transform duration-500 group-hover:rotate-[360deg] neon-glow">
              <GraduationCap size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight leading-none text-white">
                Гимназия № 74
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-prestige-gold mt-1">Dushanbe, Tajikistan</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {Object.entries(t.nav).map(([key, value]) => (
              <a 
                key={key} 
                href={`#${key}`}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 hover:text-prestige-gold transition-colors relative group"
              >
                {value}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-prestige-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-4 py-2 bg-prestige-gold text-prestige-navy rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all"
            >
              <Globe size={12} />
              {lang === "ru" ? "TJ" : "RU"}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-prestige-navy flex flex-col items-center justify-center gap-10 lg:hidden"
          >
            {Object.entries(t.nav).map(([key, value]) => (
              <a 
                key={key} 
                href={`#${key}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-serif italic text-white hover:text-prestige-gold transition-colors"
              >
                {value}
              </a>
            ))}
            <button 
              onClick={() => { toggleLang(); setIsMenuOpen(false); }}
              className="mt-8 text-sm font-bold uppercase tracking-widest border-b border-prestige-gold text-prestige-gold pb-2"
            >
              Switch to {lang === "ru" ? "Tajik" : "Russian"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden bg-prestige-navy">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2 }}
            src={imgSchool} 
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackSchool;
            }}
            alt="Gymnasium Building"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-prestige-navy via-prestige-navy/60 to-transparent" />
          {/* Atmospheric Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-prestige-gold/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-prestige-gold" />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-prestige-gold">
                {t.hero.badge}
              </span>
            </div>
            <h1 className="text-7xl md:text-[120px] font-serif text-white leading-[0.85] mb-10">
              {t.hero.title.split(' ')[0]}<br />
              <span className="italic font-light text-prestige-gold ml-12 md:ml-32">{t.hero.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 max-w-xl mb-12 font-light leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-6">
              <a 
                href="#about"
                className="px-10 py-5 bg-prestige-gold text-prestige-navy rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center gap-3 group neon-glow"
              >
                {t.hero.cta}
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Vertical Rail Text */}
        <div className="absolute right-12 bottom-12 hidden xl:block">
          <div className="flex flex-col items-center gap-8">
            <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.5em] text-white/30 font-mono">
              Est. 1990 — Dushanbe
            </span>
            <div className="w-px h-24 bg-white/20" />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="bg-prestige-navy border-y border-white/5">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { label: "Учеников", value: "500+" },
            { label: "Учителей", value: "45" },
            { label: "Лет опыта", value: "30+" },
            { label: "Рейтинг", value: "3.9/5" }
          ].map((stat, i) => (
            <div key={i} className="p-12 border-r border-white/5 last:border-r-0 flex flex-col gap-2 group hover:bg-white/5 transition-colors">
              <span className="text-4xl md:text-6xl font-serif text-white group-hover:text-prestige-gold transition-colors">{stat.value}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Section - Immersive Dark */}
      <section id="about" className="py-32 px-6 md:px-12 bg-prestige-paper overflow-hidden relative">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-prestige-gold mb-6 block">
                  {t.nav.about}
                </span>
                <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-[1.1] text-white">
                  Воспитание <br />
                  <span className="italic text-prestige-gold">будущих лидеров</span>
                </h2>
                <div className="space-y-8 text-lg text-white/70 font-light leading-relaxed">
                  <p className="text-2xl font-serif italic text-white">
                    "{t.about.description}"
                  </p>
                  <p>
                    Гимназия № 74 — это пространство, где академические стандарты встречаются с человеческим теплом. 
                    Мы создаем условия для всестороннего развития личности, сочетая классические методы обучения с современными технологиями.
                  </p>
                </div>
                
                <div className="mt-12 p-8 border-l-2 border-prestige-gold bg-white/5 backdrop-blur-md">
                  <h4 className="font-serif text-xl font-bold mb-1 text-white">{t.about.leader}</h4>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-prestige-gold/60">{t.about.leaderRole}</p>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10 aspect-video rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
              >
                <img 
                  src={imgSchool} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackSchool;
                  }}
                  alt="Gymnasium Building"
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-prestige-gold/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Campus Section - Dedicated School Photo */}
      <section id="campus" className="py-32 px-6 md:px-12 bg-prestige-navy relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl group">
                <img 
                  src={imgSchool} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackSchool;
                  }}
                  alt="Gymnasium Building"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prestige-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-12">
                   <p className="text-white font-serif italic text-xl">Наше учебное заведение в 46-м микрорайоне</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-prestige-gold mb-6 block">
                {t.nav.campus}
              </span>
              <h2 className="text-5xl md:text-7xl font-serif mb-8 text-white">
                {t.campus.title} <br />
                <span className="italic text-prestige-gold">{t.campus.subtitle}</span>
              </h2>
              <p className="text-xl text-white/60 font-light leading-relaxed mb-10">
                {t.campus.description}
              </p>
              <a 
                href={t.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
              >
                <MapPin className="text-prestige-gold group-hover:scale-110 transition-transform" size={32} />
                <div>
                  <p className="text-white font-bold uppercase tracking-widest text-xs">Адрес</p>
                  <p className="text-white/70">{t.contact.address}</p>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-6 md:px-12 bg-prestige-paper relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-20">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-prestige-gold mb-6 block">
              {t.nav.campus}
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
              {t.gallery.title} <br />
              <span className="italic text-prestige-gold">{t.gallery.subtitle}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={img.url} 
                    alt={t.gallery.items[idx].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-prestige-navy via-prestige-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
                  <h3 className="text-2xl font-serif text-white mb-2">{t.gallery.items[idx].title}</h3>
                  <p className="text-white/60 mb-8 font-light">{t.gallery.items[idx].description}</p>
                  <a 
                    href={img.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-prestige-gold hover:text-white transition-colors"
                  >
                    Смотреть на картах <ArrowUpRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Bento Grid Dark */}
      <section id="features" className="py-32 px-6 md:px-12 bg-prestige-navy">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-prestige-gold mb-6 block">
                {t.nav.features}
              </span>
              <h2 className="text-5xl md:text-7xl font-serif leading-tight text-white">
                Наши <span className="italic">приоритеты</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.features.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "p-12 rounded-[40px] flex flex-col justify-between transition-all duration-500 group border border-white/5",
                  idx === 1 ? "bg-prestige-gold text-prestige-navy md:scale-105 z-10 shadow-[0_30px_60px_-15px_rgba(212,175,55,0.3)]" : "bg-white/5 hover:bg-white/10 backdrop-blur-md"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-12 transition-transform duration-500 group-hover:scale-110",
                  idx === 1 ? "bg-prestige-navy text-prestige-gold" : "bg-prestige-gold/10 text-prestige-gold"
                )}>
                  {idx === 0 ? <Heart size={32} /> : idx === 1 ? <Award size={32} /> : <Users size={32} />}
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-6">{item.title}</h3>
                  <p className={cn(
                    "text-lg leading-relaxed font-light",
                    idx === 1 ? "text-prestige-navy/70" : "text-white/60"
                  )}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews - Atmospheric Dark */}
      <section id="reviews" className="py-32 px-6 md:px-12 bg-prestige-paper relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-prestige-gold mb-6 block">
                  {t.nav.reviews}
                </span>
                <h2 className="text-5xl font-serif mb-8 text-white">Что говорят <br /><span className="italic text-prestige-gold">о нас</span></h2>
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#d4af37" className="text-prestige-gold" />)}
                  </div>
                  <span className="text-3xl font-serif text-white">3.9</span>
                </div>
                <p className="text-white/50 font-light leading-relaxed">
                  Мы гордимся доверием наших родителей и успехами наших выпускников. Каждый отзыв помогает нам становиться лучше.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              {t.reviews.items.map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-12 bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10 hover:border-prestige-gold/30 transition-all group"
                >
                  <Quote className="text-prestige-gold/20 mb-8 group-hover:text-prestige-gold/40 transition-colors" size={48} />
                  <p className="text-2xl md:text-3xl font-serif italic mb-10 leading-relaxed text-white/90">
                    {review.text}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-prestige-gold text-prestige-navy rounded-full flex items-center justify-center font-serif text-xl font-bold">
                        {review.author[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest text-white">{review.author}</h4>
                        <p className="text-[10px] uppercase tracking-widest text-prestige-gold/60 mt-1">Verified Parent</p>
                      </div>
                    </div>
                    <div className="hidden sm:flex gap-1">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="#d4af37" className="text-prestige-gold" />)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact - Future Dark */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-prestige-navy text-white relative">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-prestige-gold mb-8 block">
                {t.nav.contact}
              </span>
              <h2 className="text-6xl md:text-8xl font-serif mb-16 leading-none">
                Начните <br /><span className="italic text-prestige-gold">обучение</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <a 
                  href={t.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="space-y-4 group block"
                >
                  <h4 className="text-[10px] uppercase tracking-[0.4em] text-prestige-gold/40 font-bold group-hover:text-prestige-gold transition-colors">Локация</h4>
                  <p className="text-xl font-serif text-white group-hover:text-prestige-gold transition-colors">{t.contact.address}</p>
                  <p className="text-sm text-white/40">{t.contact.location}</p>
                </a>
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] text-prestige-gold/40 font-bold">Связь</h4>
                  <p className="text-sm text-white/40">info@gymnasium74.tj</p>
                </div>
              </div>

              {/* Social links removed as requested */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Future Dark */}
      <footer className="py-20 px-6 md:px-12 bg-prestige-paper border-t border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-prestige-gold rounded-full flex items-center justify-center text-prestige-navy neon-glow">
                <GraduationCap size={20} />
              </div>
              <span className="font-serif text-2xl font-bold text-white">Гимназия № 74</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
               {Object.entries(t.nav).map(([key, value]) => (
                 <a key={key} href={`#${key}`} className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 hover:text-prestige-gold transition-colors">
                   {value}
                 </a>
               ))}
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 text-white">
              {t.footer.rights}
            </p>
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-mono opacity-40 text-white">
               <span>Privacy Policy</span>
               <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
