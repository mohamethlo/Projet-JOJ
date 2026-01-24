import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  MapPin,
  Music,
  UtensilsCrossed,
  Heart,
  Users,
  Star,
  Camera,
  BookOpen,
  Drum,
  Calendar,
  Sparkles,
  Palette,
  Compass,
  Globe,
  Sun,
  Award,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  ShieldCheck,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user, navigate]);

  if (user) return null;

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-[#2D1B08] selection:bg-[#F2A900] selection:text-white">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-[#F2A900] transform transition-transform group-hover:rotate-6 bg-white shrink-0 shadow-sm">
              <img src="/images/logo.jpeg" alt="Logo Discover Sénégal" className="w-full h-full object-contain p-1" />
            </div>
            <span className={`text-xl font-black tracking-tighter transition-colors ${isScrolled ? 'text-[#2D1B08]' : 'text-white'
              }`}>
              DISCOVER <span className="text-[#F2A900]">SÉNÉGAL</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Accueil', 'A propos', 'Explorer'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`text-sm font-black uppercase tracking-widest transition-colors hover:text-[#F2A900] ${isScrolled ? 'text-[#2D1B08]/70' : 'text-white/80'
                  }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/auth/login">
              <span className={`text-sm font-black uppercase tracking-widest hover:text-[#F2A900] transition-colors ${isScrolled ? 'text-[#2D1B08]' : 'text-white'
                }`}>
                Connexion
              </span>
            </Link>
            <Link to="/auth/register">
              <Button size="sm" className="bg-[#F2A900] hover:bg-[#D49400] text-white font-black rounded-full px-6">
                S'INSCRIRE
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION - IMMERSIVE JOURNEY */}
      <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video or Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_senegal.png"
            alt="Paysage majestueux du Sénégal au coucher du soleil"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#FFFDFB]"></div>
          {/* African Patterns Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white pt-24 md:pt-32">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8 animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-[#F2A900]" />
            <span className="text-sm font-bold tracking-widest uppercase">Bienvenue au pays de la Téranga</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter animate-title">
            DÉCOUVREZ LE <br />
            <span className="text-[#F2A900]">SÉNÉGAL</span> <br />
            AUTREMENT
          </h1>

          <p className="text-lg md:text-xl max-w-xl mx-auto font-medium text-white/90 mb-12 leading-relaxed animate-fade-in-up delay-300">
            Une immersion authentique au cœur du patrimoine, de la gastronomie
            et de l'hospitalité légendaire de l'Afrique de l'Ouest.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-500">
            <Link to="/auth/register">
              <Button size="lg" className="bg-[#F2A900] hover:bg-[#D49400] text-white px-8 py-6 text-lg font-black rounded-full shadow-2xl transition-all transform hover:scale-105 group">
                COMMENCER LE VOYAGE
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
            <button className="flex items-center gap-4 text-white hover:text-[#F2A900] transition-colors font-bold text-base group">
              <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-[#F2A900] transition-all">
                <Compass className="h-7 w-7" />
              </div>
              Explorer les récits
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-70 animate-bounce">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-white">Défiler</span>
          <div className="w-[2px] h-12 bg-white/50 rounded-full overflow-hidden">
            <div className="w-full h-1/2 bg-[#F2A900] animate-scroll-down"></div>
          </div>
        </div>
      </section>

      {/* 2. CULTURE & IDENTITY SECTION */}
      <section id="a-propos" className="py-16 px-6 bg-[#FFFDFB] relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#F2A900]/10 rounded-full -z-10 blur-3xl"></div>
            <div className="rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-[#EBE3D5]">
              <img
                src="/images/teranga_welcome.png"
                alt="L'accueil chaleureux du Sénégal"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            {/* Stat Overlays */}
            <div className="absolute -bottom-10 -right-10 bg-[#6B4226] p-8 rounded-3xl text-white shadow-2xl max-w-[240px]">
              <Heart className="h-10 w-10 text-[#F2A900] mb-4" />
              <p className="text-lg font-bold leading-tight">"La Téranga n'est pas un mot, c'est notre âme."</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <span className="text-[#F2A900] font-black tracking-[0.2em] uppercase text-xs">Héritage & Identité</span>
              <h2 className="text-4xl md:text-5xl font-black mt-3 leading-tight">
                L'âme d'un peuple, <br />
                <span className="text-[#6B4226]">la force d'une terre</span>
              </h2>
            </div>

            <p className="text-lg text-[#5D4037] leading-relaxed">
              Au Sénégal, chaque rencontre est sacrée. La <strong>Téranga</strong> est notre boussole,
              définissant une hospitalité qui dépasse les frontières. Des rituels ancestraux aux
              vibrations modernes de Dakar, nous vous invitons à partager notre histoire.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-[#F2A900]/10 rounded-xl flex items-center justify-center">
                  <Drum className="h-5 w-5 text-[#F2A900]" />
                </div>
                <div>
                  <h4 className="font-black text-base">Traditions</h4>
                  <p className="text-xs text-[#5D4037]/70">Une culture orale et artistique vivante.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-[#1B5E20]/10 rounded-xl flex items-center justify-center">
                  <Compass className="h-5 w-5 text-[#1B5E20]" />
                </div>
                <div>
                  <h4 className="font-black text-base">Authenticité</h4>
                  <p className="text-xs text-[#5D4037]/70">Expériences réelles loin du tourisme de masse.</p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="border-[#6B4226] text-[#6B4226] hover:bg-[#6B4226] hover:text-white px-8 py-6 rounded-full font-black">
              DÉCOUVRIR NOS VALEURS
            </Button>
          </div>
        </div>
      </section>

      {/* 3. TREASURES & STORIES OF SENEGAL */}
      <section className="py-20 bg-[#F9F6F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#F2A900] font-black tracking-[0.2em] uppercase text-xs">Patrimoine & Récits</span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 leading-tight text-[#2D1B08]">
              Trésors & Histoires <br />
              <span className="text-[#6B4226]">du Sénégal</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HistoricalCard
              image="/images/goree_history.png"
              images={[
                "/images/esclaveGoree1.webp",
                "/images/goree_history.png",
                "/images/goree2.webp",
                "/images/goree3.webp"
              ]}
              title="L'Île de Gorée"
              story="Bien plus qu'un lieu, Gorée est un sanctuaire de la mémoire universelle. Ses murs ocres et ses ruelles fleuries cachent les échos d'une histoire poignante, celle de la traite transatlantique. Symbole de résilience et de dignité, l'île invite au recueillement et à la paix, rappelant à chacun la force inébranlable de l'esprit humain face à l'adversité."
            />
            <HistoricalCard
              image="/images/monument_renaissance.png"
              images={[
                "/images/monument_renaissance.png",
                "/images/monument_renaissance2.webp",
                "/images/monument_renaissance3.webp",
                "/images/monument_renaissance4.webp"
              ]}
              title="Monument de la Renaissance"
              story="Dressé fièrement sur l'une des collines de Dakar, ce géant de bronze est le symbole d'une Afrique qui se lève, tournée vers l'avenir. Plus haut que la Statue de la Liberté, il incarne la fierté, la liberté retrouvée et l'aspiration des peuples africains à la grandeur. C'est un phare d'espoir qui veille sur la capitale et l'Atlantique."
            />
            <HistoricalCard
              image="https://images.unsplash.com/photo-1610459535031-6e3e14713e21?auto=format&fit=crop&w=1200&q=80"
              images={[
                "/images/masque1.webp",
                "/images/masque2.webp",
                "/images/masque3.webp"
              ]}
              title="Masques Traditionnels"
              story="Objets de culte et d'art, les masques sénégalais sont les gardiens des rituels et des savoirs ancestraux. Chaque trait, chaque motif raconte l'identité d'un peuple et sa connexion au spirituel. Ils ne sont pas de simples ornements, mais des partenaires de danse et de transmission, reliant les générations par le mystère et la beauté du geste."
            />
            <HistoricalCard
              image="https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&w=1200&q=80"
              images={[
                "/images/case1.webp",
                "/images/case2.webp",
                "/images/case3.webp",
                "/images/case4.webp"
              ]}
              title="Cases à Impluvium"
              story="Au cœur de la Casamance, ces architectures uniques révèlent le génie vernaculaire du peuple Diola. Conçues pour recueillir l'eau de pluie et favoriser la vie communautaire, elles sont le symbole d'une harmonie parfaite entre l'homme et la nature. Une leçon d'écologie et de solidarité inscrite dans la latérite et le chaume."
            />
          </div>
        </div>
      </section>

      {/* 4. DESTINATIONS SECTION - THE GRID */}
      <section id="explorer" className="py-24 bg-[#F5E6D3]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#1B5E20] font-black tracking-[0.2em] uppercase text-xs">Exploration</span>
              <h2 className="text-3xl md:text-4xl font-black mt-3">Sites <br /> <span className="text-[#1B5E20]">Iconiques</span></h2>
            </div>
            <p className="text-base text-[#5D4037]/80 max-w-sm">
              Du rose mystique des lacs aux ocres historiques de Gorée, parcourez les trésors du Sénégal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            {/* Main Card */}
            <div className="md:col-span-8 relative rounded-[1.5rem] overflow-hidden group cursor-pointer shadow-xl">
              <img
                src="/images/goree.jpeg"
                alt="L'île de Gorée"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <Badge label="Patrimoine UNESCO" color="#C62828" />
                <h3 className="text-3xl font-black mt-3">L'île de Gorée</h3>
                <p className="text-white/70 max-w-md mt-1 text-sm">Un sanctuaire d'histoire et de mémoire au large de Dakar.</p>
              </div>
            </div>

            {/* Side Column */}
            <div className="md:col-span-4 grid grid-rows-2 gap-6 h-full">
              <div className="relative rounded-[1.5rem] overflow-hidden group cursor-pointer shadow-lg">
                <img
                  src="/images/lac_rose.jpeg"
                  alt="Le Lac Rose"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h4 className="text-xl font-black">Lac Rose</h4>
                  <p className="text-white/70 text-xs">Une merveille naturelle unique au monde.</p>
                </div>
              </div>
              <div className="relative rounded-[1.5rem] overflow-hidden group cursor-pointer shadow-lg">
                <img
                  src="/images/falaise.jpeg"
                  alt="Dindefelo"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h4 className="text-xl font-black">Casamance</h4>
                  <p className="text-white/70 text-xs">Le jardin luxuriant du Sénégal.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-transparent border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white px-8 py-4 text-base font-black rounded-full transition-all">
              VOIR TOUTES LES DESTINATIONS
            </Button>
          </div>
        </div>
      </section>

      {/* 5. HOTELS & ACCOMMODATIONS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#6B4226] font-black tracking-[0.2em] uppercase text-xs">Séjour d'exception</span>
            <h2 className="text-3xl md:text-4xl font-black mt-3">Confort & <span className="text-[#F2A900]">Authenticité</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AccommodationCard
              image="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              name="Lodge des Savanes"
              location="Saly Portudal"
              rating={4.9}
              price="75,000 FCFA"
            />
            <AccommodationCard
              image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              name="Le Palais du Fleuve"
              location="Saint-Louis"
              rating={4.8}
              price="55,000 FCFA"
            />
            <AccommodationCard
              image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              name="Éco-Lodge Casamance"
              location="Cap Skirring"
              rating={5.0}
              price="90,000 FCFA"
            />
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 py-8 border-y border-[#EBE3D5]">
            <div className="flex items-center gap-2 opacity-60">
              <ShieldCheck className="h-6 w-6 text-[#1B5E20]" />
              <span className="font-bold text-sm tracking-widest uppercase">Réservation sécurisée</span>
            </div>
            <div className="flex items-center gap-2 opacity-60">
              <Award className="h-6 w-6 text-[#F2A900]" />
              <span className="font-bold text-sm tracking-widest uppercase">Labels Qualité Teranga</span>
            </div>
            <div className="flex items-center gap-2 opacity-60">
              <CheckCircle2 className="h-6 w-6 text-[#1B5E20]" />
              <span className="font-bold text-sm tracking-widest uppercase">Support 24/7 client</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GASTRONOMY SECTION - MOUTHWATERING */}
      <section className="py-16 bg-[#2D1B08] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C62828]/10 rounded-full blur-[120px] -mr-[300px] -mt-[300px]"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <span className="text-[#F2A900] font-black tracking-[0.2em] uppercase text-xs">Saveurs du Sénégal</span>
              <h2 className="text-4xl md:text-5xl font-black mt-3 leading-tight">
                L'art de la <br />
                <span className="text-[#F2A900]">Gastronomie</span>
              </h2>
            </div>
            <p className="text-lg text-white/70 leading-relaxed">
              Le <strong>Thiéboudienne</strong>, le <strong>Yassa</strong>, le <strong>Mafé</strong>...
              Plongez dans un univers de saveurs épicées et de couleurs généreuses.
              Une cuisine reconnue mondialement pour sa convivialité et son authenticité.
            </p>

            <ul className="space-y-2">
              <li className="flex items-center gap-4 text-base font-bold">
                <div className="w-2 h-2 rounded-full bg-[#F2A900]"></div>
                Restaurants sélectionnés pour leur authenticité
              </li>
              <li className="flex items-center gap-4 text-base font-bold">
                <div className="w-2 h-2 rounded-full bg-[#F2A900]"></div>
                Cours de cuisine chez l'habitant
              </li>
              <li className="flex items-center gap-4 text-base font-bold">
                <div className="w-2 h-2 rounded-full bg-[#F2A900]"></div>
                Découverte des produits du terroir (Bissap, Bouye)
              </li>
            </ul>

            <Button className="bg-[#F2A900] hover:bg-[#D49400] text-white px-8 py-4 text-lg font-black rounded-full shadow-2xl transition-all border-none">
              EXPLORER LA CARTE GOURMANDE
            </Button>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-[#F2A900]/20 rounded-full blur-[80px] -z-10 group-hover:scale-125 transition-transform duration-1000"></div>
            <img
              src="/images/thieboudienne.png"
              alt="Thiéboudienne traditionnel"
              className="w-full rounded-[2rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* 7. EXPERIENCES & LOCAL GUIDES */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#1B5E20] font-black tracking-[0.2em] uppercase text-xs">Vibrations Locales</span>
              <h1 className="text-3xl md:text-4xl font-black mt-3">Vivez comme <br /> <span className="text-[#6B4226]">un Sénégalais</span></h1>
            </div>
            <Link to="#" className="text-[#1B5E20] font-black text-base underline-offset-8 decoration-4 hover:underline">Voir toutes les expériences</Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExperienceCard
              icon={<Drum className="h-8 w-8" />}
              title="Atelier de Percussion Sabar"
              description="Apprenez les rythmes ancestraux avec un maître tambour."
              tag="Culture & Musique"
            />
            <ExperienceCard
              icon={<Camera className="h-8 w-8" />}
              title="Safari Photo Sine Saloum"
              description="Explorez la mangrove et observez les oiseaux migrateurs."
              tag="Nature & Aventure"
            />
            <ExperienceCard
              icon={<Palette className="h-8 w-8" />}
              title="Initiation à la Teinture Wax"
              description="Créez votre propre tissu avec des artisans locaux."
              tag="Artisanat"
            />
          </div>
        </div>
      </section>

      {/* 8. ART & CRAFT SECTION */}
      <section className="py-16 bg-[#6B4226] text-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/artisanat1.jpeg" className="rounded-2xl h-40 w-full object-cover mt-6" alt="Artisanat 1" />
            <img src="/images/artisanat2.jpeg" className="rounded-2xl h-40 w-full object-cover" alt="Artisanat 2" />
            <img src="/images/artisanat3.jpeg" className="rounded-2xl h-40 w-full object-cover" alt="Artisanat 3" />
            <img src="/images/artisanat4.jpeg" className="rounded-2xl h-40 w-full object-cover -mt-6" alt="Artisanat 4" />
          </div>

          <div className="space-y-6">
            <span className="text-[#F2A900] font-black tracking-[0.2em] uppercase text-xs">Créativité Africaine</span>
            <h2 className="text-4xl md:text-5xl font-black">L'élégance du <br /> <span className="text-[#F2A900]">Fait Main</span></h2>
            <p className="text-lg text-white/70 leading-relaxed">
              De la sculpture sur bois à la joaillerie fine, l'artisanat sénégalais
              allie savoir-faire ancestral et design contemporain. Découvrez des pièces
              uniques qui portent l'âme de nos créateurs.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-[#6B4226] hover:bg-[#F2A900] hover:text-white px-6 py-4 rounded-full font-black transition-all">
                BOUTIQUE ARTISANALE
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-4 rounded-full font-black">
                RENCONTRER LES ARTISTES
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TRUST & REVIEWS SECTION */}
      <section className="py-16 px-6 bg-[#EBE3D5]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black">Ils ont voyagé avec nous</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Lefebvre"
              origin="Paris, France"
              text="Une expérience transformatrice. Le guide a su nous ouvrir les portes d'un Sénégal vrai, loin des sentiers battus."
              stars={5}
            />
            <TestimonialCard
              name="Malick Sy"
              origin="Montréal, Canada"
              text="Redécouvrir mon pays d'origine avec cette plateforme a été un bonheur. L'organisation était impeccable."
              stars={5}
            />
            <TestimonialCard
              name="Amelia Jones"
              origin="Londres, UK"
              text="The food tour was incredible. I never thought I could cook the best thieboudienne myself!"
              stars={5}
            />
          </div>
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#F2A900] -z-10 animate-pulse-slow"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full -mr-[400px] -mt-[400px] blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black text-[#2D1B08] tracking-tighter">
            PRÊT À RÉDESSINER <br /> VOTRE CARTE ?
          </h2>
          <p className="text-lg md:text-xl text-[#6B4226] font-bold">
            Rejoignez des milliers de voyageurs et vivez l'inoubliable.
            Le Sénégal n'attend que vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-[#2D1B08] hover:bg-black text-white px-10 py-6 text-xl font-black rounded-full shadow-2xl transition-all transform hover:scale-105">
                REJOINDRE L'AVENTURE
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button size="lg" variant="outline" className="border-[#2D1B08] text-[#2D1B08] hover:bg-[#2D1B08] hover:text-white px-10 py-6 text-xl font-black rounded-full">
                SE CONNECTER
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2D1B08] text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            <div className="md:col-span-5 space-y-8">
              <h3 className="text-4xl font-black tracking-tighter">DISCOVER <span className="text-[#F2A900]">SÉNÉGAL</span></h3>
              <p className="text-white/50 text-lg max-w-sm">
                Promouvoir la culture sénégalaise et africaine à travers
                un tourisme éthique, durable et profondément humain.
              </p>
              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#F2A900] hover:border-[#F2A900] transition-all"><Instagram /></a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#F2A900] hover:border-[#F2A900] transition-all"><Facebook /></a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#F2A900] hover:border-[#F2A900] transition-all"><Twitter /></a>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <h4 className="font-black text-xl uppercase tracking-widest text-[#F2A900]">Explorer</h4>
              <ul className="space-y-4 text-white/70 font-bold">
                <li><Link to="#" className="hover:text-white transition-colors">Destinations</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Expériences</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Hôtels</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Guides</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-6">
              <h4 className="font-black text-xl uppercase tracking-widest text-[#F2A900]">Société</h4>
              <ul className="space-y-4 text-white/70 font-bold">
                <li><Link to="#" className="hover:text-white transition-colors">Notre Vision</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Patrimoine</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Éthique</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-6">
              <h4 className="font-black text-xl uppercase tracking-widest text-[#F2A900]">Newsletter</h4>
              <p className="text-sm text-white/50 font-bold">Recevez nos prochains récits de voyage et exclusivités.</p>
              <div className="flex flex-col gap-4">
                <input type="email" placeholder="Votre email" className="bg-white/5 border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F2A900]" />
                <Button className="bg-[#F2A900] hover:bg-[#D49400] text-white font-black rounded-full py-4">S'ABONNER</Button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 font-bold text-sm">
            <p>© 2024 DISCOVER SÉNÉGAL. TOUS DROITS RÉSERVÉS.</p>
            <div className="flex gap-8">
              <Link to="#" className="hover:text-white transition-colors">Conditions Générales</Link>
              <Link to="#" className="hover:text-white transition-colors">Vie Privée</Link>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes scroll-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-down {
          animation: scroll-down 2s infinite ease-in-out;
        }
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
        .animate-title {
          animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Badge = ({ label, color }: { label: string; color: string }) => (
  <span
    className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white"
    style={{ backgroundColor: color }}
  >
    {label}
  </span>
);

const AccommodationCard = ({ image, name, location, rating, price }: any) => (
  <div className="group cursor-pointer">
    <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/3] mb-4 shadow-lg">
      <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-md">
        <Star className="h-3 w-3 text-[#F2A900] fill-[#F2A900]" />
        <span className="font-black text-xs">{rating}</span>
      </div>
    </div>
    <div className="px-2">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-xl font-black text-[#2D1B08]">{name}</h3>
        <p className="font-black text-base text-[#1B5E20]">{price}</p>
      </div>
      <p className="flex items-center gap-2 text-[#5D4037]/60 font-bold mb-3 text-sm">
        <MapPin className="h-3 w-3" /> {location}
      </p>
      <button className="w-full py-3 border-2 border-[#EBE3D5] rounded-xl font-black text-sm group-hover:bg-[#6B4226] group-hover:text-white group-hover:border-[#6B4226] transition-all">
        RÉSERVER
      </button>
    </div>
  </div>
);

const ExperienceCard = ({ icon, title, description, tag }: any) => (
  <div className="p-6 rounded-[2rem] bg-white border-2 border-[#EBE3D5] hover:border-[#F2A900] transition-all group cursor-pointer shadow-sm hover:shadow-2xl">
    <div className="text-[#F2A900] mb-4 bg-[#F2A900]/5 w-14 h-14 rounded-xl flex items-center justify-center border-2 border-[#F2A900]/10 transition-colors group-hover:bg-[#F2A900] group-hover:text-white">
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-[#1B5E20] mb-2 block">{tag}</span>
    <h3 className="text-xl font-black mb-2 leading-tight">{title}</h3>
    <p className="text-sm text-[#5D4037]/70 font-medium mb-4 leading-relaxed">{description}</p>
    <div className="flex items-center gap-2 text-[#2D1B08] font-black text-sm group-hover:text-[#F2A900] transition-colors">
      VOIR L'EXPÉRIENCE <ArrowRight className="h-4 w-4" />
    </div>
  </div>
);

const TestimonialCard = ({ name, origin, text, stars }: any) => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-[#EBE3D5] shadow-sm relative">
    <Quote className="absolute top-6 right-6 h-12 w-12 text-[#F2A900]/10 -scale-x-100" />
    <div className="flex gap-1 mb-4">
      {[...Array(stars)].map((_, i) => <Star key={i} className="h-4 w-4 text-[#F2A900] fill-[#F2A900]" />)}
    </div>
    <p className="text-base font-bold text-[#2D1B08] leading-relaxed mb-6 italic">"{text}"</p>
    <div>
      <h4 className="font-black text-xl">{name}</h4>
      <p className="text-[#5D4037]/50 font-bold text-sm">{origin}</p>
    </div>
  </div>
);

const HistoricalCard = ({ image, title, story, images }: { image: string; title: string; story: string; images?: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgList = images && images.length > 0 ? images : [image];

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % imgList.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + imgList.length) % imgList.length);
  };

  useEffect(() => {
    if (imgList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imgList.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [imgList.length]);

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#EBE3D5] flex flex-col lg:flex-row group hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 min-h-[300px]">
      <div className="lg:w-1/2 h-64 lg:h-auto overflow-hidden relative group/carousel">
        <img
          src={imgList[currentIndex]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        {imgList.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md p-2 rounded-full text-white transition-all opacity-0 group-hover/carousel:opacity-100 z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md p-2 rounded-full text-white transition-all opacity-0 group-hover/carousel:opacity-100 z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {imgList.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#F2A900] w-6' : 'bg-white/70'}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:hidden pointer-events-none"></div>
      </div>
      <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center space-y-4">
        <div>
          <h3 className="text-xl lg:text-2xl font-black text-[#2D1B08] mb-3 group-hover:text-[#6B4226] transition-colors">{title}</h3>
          <p className="text-sm text-[#5D4037]/80 leading-relaxed font-medium line-clamp-4 lg:line-clamp-none">
            {story}
          </p>
        </div>
        <button className="text-[#F2A900] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all group-width-fit">
          DÉCOUVRIR L'HISTOIRE <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
