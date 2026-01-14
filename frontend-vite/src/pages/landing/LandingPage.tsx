import React, { useEffect } from 'react';
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
  ChevronRight,
  Sparkles,
  Palette,
  Compass,
  Globe,
  Sun,
  Award
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Style Africain avec motifs Kente */}
      <div className="relative h-auto py-8 md:py-10 flex items-center justify-center overflow-hidden">
        {/* Background avec image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80)'
          }}
        >
          {/* Overlay avec dégradé aux couleurs du drapeau */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-yellow-900/75 to-red-900/85"></div>
        </div>

        {/* Motifs géométriques africains en overlay */}
        <div className="absolute inset-0 opacity-20">
          {/* Motif Kente-inspired */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,193,7,.3) 20px, rgba(255,193,7,.3) 22px),
              repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(76,175,80,.3) 20px, rgba(76,175,80,.3) 22px),
              repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(244,67,54,.2) 40px, rgba(244,67,54,.2) 42px)
            `
          }}></div>
        </div>

        {/* Cercles décoratifs */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full border-8 border-yellow-400/30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full border-8 border-green-400/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-orange-500/20 blur-2xl"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-5">
          {/* Badge Teranga avec style africain */}
          <div className="mb-3 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white rounded-full text-sm font-black shadow-xl border-2 border-white/30 backdrop-blur-sm transform hover:scale-105 transition-transform">
              <Sun className="h-4 w-4 animate-spin" style={{ animationDuration: '8s' }} />
              🇸🇳 BIENVENUE AU SÉNÉGAL - TERRE DE LA TERANGA
              <Sun className="h-4 w-4 animate-spin" style={{ animationDuration: '8s' }} />
            </span>
          </div>

          {/* Titre principal avec effet */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 leading-tight animate-slide-up">
            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl mb-1" style={{
              textShadow: '0 0 40px rgba(255,193,7,0.5)'
            }}>
              DÉCOUVREZ
            </span>
            <span className="block text-white drop-shadow-2xl" style={{
              textShadow: '0 0 40px rgba(0,0,0,0.8)'
            }}>
              LE SÉNÉGAL
            </span>
          </h1>

          {/* Sous-titre avec motif */}
          <div className="mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border-2 border-yellow-400">
              <p className="text-lg sm:text-xl lg:text-2xl font-black bg-gradient-to-r from-yellow-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
                ✨ L'Esprit de la TERANGA ✨
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-white mb-4 max-w-3xl mx-auto leading-relaxed font-semibold animate-fade-in backdrop-blur-sm bg-black/20 p-3 rounded-xl" style={{ animationDelay: '0.4s' }}>
            🌍 Plongez dans l'hospitalité légendaire du Sénégal, sa culture vibrante,
            ses traditions millénaires et ses paysages à couper le souffle.
            Une aventure authentique vous attend ! 🎭
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in mb-3" style={{ animationDelay: '0.6s' }}>
            <Link to="/auth/register">
              <Button size="lg" className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 hover:from-yellow-600 hover:via-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg font-black shadow-xl hover:shadow-yellow-500/50 transition-all transform hover:scale-105 border-2 border-white rounded-xl">
                🚀 COMMENCER L'AVENTURE
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-black bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-orange-600 transition-all shadow-xl rounded-xl">
                Se connecter
              </Button>
            </Link>
          </div>

          {/* Indicateurs de scroll avec style africain */}
          <div className="flex items-center justify-center gap-4 text-white animate-bounce">
            <div className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-transparent rounded-full"></div>
            <span className="text-lg font-bold">Découvrir plus bas</span>
            <div className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Motifs décoratifs en bas */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Section Teranga - Culture de l'hospitalité */}
      <section className="py-24 bg-gradient-to-b from-orange-50 via-yellow-50 to-white relative overflow-hidden">
        {/* Motifs décoratifs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full text-base font-black mb-6 shadow-lg">
                <Heart className="h-5 w-5" />
                LA TERANGA
              </div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
                L'hospitalité sénégalaise,
                <span className="block bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">
                  une tradition sacrée
                </span>
              </h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed font-medium">
                La <strong className="text-orange-600 font-black text-2xl">Teranga</strong> est bien plus qu'un simple mot.
                C'est un art de vivre, une philosophie qui place l'accueil et le partage au cœur
                de la culture sénégalaise. 🤝
              </p>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                Chez DiscoverSenegal, nous connectons les voyageurs avec des guides locaux
                authentiques qui vous feront découvrir le vrai Sénégal. Partagez un repas
                traditionnel, apprenez le wolof, dansez au rythme des tam-tams sous les étoiles. ⭐
              </p>
              <div className="flex items-center space-x-4">
                <Link to="/auth/register">
                  <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-black px-10 py-7 text-xl shadow-xl rounded-xl transform hover:scale-105 transition-all">
                    Vivre la Teranga
                    <ChevronRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 border-8 border-yellow-400">
                <img
                  src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Culture sénégalaise"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-transparent"></div>
              </div>
              {/* Floating Card avec style africain */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl border-4 border-green-500 transform hover:scale-110 transition-transform">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-green-500 via-yellow-500 to-red-600 p-5 rounded-xl">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">500+</div>
                    <div className="text-base font-bold text-gray-700">Guides locaux</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Culture - Patrimoine Riche avec motifs africains */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Motif de fond africain */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,152,0,0.3) 45deg, transparent 90deg)`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full text-base font-black mb-6 shadow-lg">
              <Sparkles className="h-5 w-5" />
              NOTRE HÉRITAGE
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
              Une culture <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">riche et vibrante</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-bold">
              🎨 Plongez dans les traditions millénaires du Sénégal 🎭
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Musique et Danse */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-600 to-orange-700 text-white p-10 hover:shadow-2xl transition-all transform hover:scale-105 border-8 border-yellow-400">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/20 rounded-full -ml-16 -mb-16"></div>
              <div className="relative z-10">
                <div className="bg-yellow-400/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border-4 border-yellow-300">
                  <Drum className="h-12 w-12 text-yellow-100" />
                </div>
                <h3 className="text-3xl font-black mb-4">🥁 Musique & Danse</h3>
                <p className="text-orange-100 mb-6 leading-relaxed font-medium text-lg">
                  Découvrez le mbalax, la musique traditionnelle du Sénégal.
                  Apprenez les danses sabar, participez à des soirées culturelles
                  authentiques animées par les griots.
                </p>
                <div className="flex items-center text-yellow-300 group-hover:text-white transition-colors font-bold text-lg">
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Gastronomie */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white p-10 hover:shadow-2xl transition-all transform hover:scale-105 border-8 border-green-400">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-400/20 rounded-full -ml-16 -mb-16"></div>
              <div className="relative z-10">
                <div className="bg-green-400/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border-4 border-green-300">
                  <UtensilsCrossed className="h-12 w-12 text-green-100" />
                </div>
                <h3 className="text-3xl font-black mb-4">🍲 Gastronomie</h3>
                <p className="text-orange-100 mb-6 leading-relaxed font-medium text-lg">
                  Savourez le thiéboudiène, le yassa, le mafé et bien d'autres plats
                  traditionnels. Participez à des cours de cuisine avec des chefs locaux
                  et découvrez les secrets de la cuisine sénégalaise.
                </p>
                <div className="flex items-center text-green-300 group-hover:text-white transition-colors font-bold text-lg">
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Histoire et Patrimoine */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-orange-700 to-red-700 text-white p-10 hover:shadow-2xl transition-all transform hover:scale-105 border-8 border-yellow-400">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/20 rounded-full -ml-16 -mb-16"></div>
              <div className="relative z-10">
                <div className="bg-yellow-400/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border-4 border-yellow-300">
                  <BookOpen className="h-12 w-12 text-yellow-100" />
                </div>
                <h3 className="text-3xl font-black mb-4">📚 Histoire & Patrimoine</h3>
                <p className="text-orange-100 mb-6 leading-relaxed font-medium text-lg">
                  Explorez l'île de Gorée, témoin de l'histoire. Découvrez Saint-Louis,
                  ancienne capitale de l'AOF. Visitez les mosquées, les sites historiques
                  et comprenez l'héritage culturel du Sénégal.
                </p>
                <div className="flex items-center text-yellow-300 group-hover:text-white transition-colors font-bold text-lg">
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Artisanat - Style Africain */}
      <section className="py-24 bg-gradient-to-b from-white via-green-50 to-yellow-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full text-base font-black mb-6 shadow-lg">
              <Palette className="h-5 w-5" />
              ARTISANAT AUTHENTIQUE
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
              Tissus & <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">Artisanat</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-bold">
              🎨 Découvrez la richesse de l'artisanat sénégalais 🧵
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tissus Traditionnels */}
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-8 border-orange-400">
              <img
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Tissus sénégalais traditionnels"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 via-orange-900/50 to-transparent group-hover:from-orange-900/95 transition-all"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-4xl font-black mb-3">🧵 Tissus Traditionnels</h3>
                <p className="text-orange-100 mb-4 leading-relaxed font-bold text-lg">
                  Bazin, wax, bogolan... Découvrez les tissus colorés qui font la fierté du Sénégal.
                  Chaque motif raconte une histoire, chaque couleur a une signification.
                </p>
                <div className="flex items-center text-yellow-300 font-black text-lg">
                  <span>Explorer</span>
                  <ChevronRight className="ml-2 h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Artisanat Local */}
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-8 border-green-400">
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Artisan sénégalais au travail"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/50 to-transparent group-hover:from-green-900/95 transition-all"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-4xl font-black mb-3">🎨 Artisanat Local</h3>
                <p className="text-green-100 mb-4 leading-relaxed font-bold text-lg">
                  Rencontrez les artisans qui perpétuent les traditions. Bijoux, paniers,
                  sculptures... Chaque pièce est unique et faite à la main avec passion.
                </p>
                <div className="flex items-center text-yellow-300 font-black text-lg">
                  <span>Découvrir</span>
                  <ChevronRight className="ml-2 h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Iconiques */}
      <section className="py-24 bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-full text-base font-black mb-6 shadow-lg">
              <MapPin className="h-5 w-5" />
              LIEUX MAGIQUES
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
              Destinations <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">emblématiques</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-bold">
              🗺️ Des lieux qui racontent l'âme du Sénégal 🌅
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dakar */}
            <div className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer border-8 border-orange-400 hover:border-yellow-400 transition-all transform hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1564769625908-49c37c60a9e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Dakar"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 via-orange-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <MapPin className="h-8 w-8 mb-2 text-yellow-400" />
                <h3 className="text-3xl font-black mb-2">Dakar</h3>
                <p className="text-orange-100 font-black text-lg">La capitale vibrante</p>
              </div>
            </div>

            {/* Gorée */}
            <div className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer border-8 border-red-400 hover:border-yellow-400 transition-all transform hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Gorée"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <MapPin className="h-8 w-8 mb-2 text-yellow-400" />
                <h3 className="text-3xl font-black mb-2">Gorée</h3>
                <p className="text-red-100 font-black text-lg">L'île mémoire</p>
              </div>
            </div>

            {/* Saint-Louis */}
            <div className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer border-8 border-green-400 hover:border-yellow-400 transition-all transform hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Saint-Louis"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <MapPin className="h-8 w-8 mb-2 text-yellow-400" />
                <h3 className="text-3xl font-black mb-2">Saint-Louis</h3>
                <p className="text-green-100 font-black text-lg">Ville historique</p>
              </div>
            </div>

            {/* Lac Rose */}
            <div className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer border-8 border-yellow-400 hover:border-orange-400 transition-all transform hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1539650116574-75c0c6d73e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Lac Rose"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 via-orange-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <MapPin className="h-8 w-8 mb-2 text-yellow-400" />
                <h3 className="text-3xl font-black mb-2">Lac Rose</h3>
                <p className="text-orange-100 font-black text-lg">Merveille naturelle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expériences Authentiques */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-full text-base font-black mb-6 shadow-lg">
              <Star className="h-5 w-5" />
              EXPÉRIENCES UNIQUES
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
              Des expériences <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">inoubliables</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-bold">
              ✨ Vivez le Sénégal comme un local ✨
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Guide Local */}
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all border-4 border-orange-300 hover:border-orange-500 transform hover:scale-105">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 w-24 h-24 rounded-2xl flex items-center justify-center mb-6 shadow-lg border-4 border-yellow-400">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">👥 Guides Locaux Certifiés</h3>
              <p className="text-gray-700 mb-6 leading-relaxed font-bold text-lg">
                Rencontrez des guides passionnés par leur culture. Ils vous feront découvrir
                les secrets cachés, les meilleurs spots et les histoires authentiques du Sénégal.
              </p>
              <div className="flex items-center text-orange-600 font-black text-lg">
                <span>Découvrir les guides</span>
                <ChevronRight className="ml-2 h-6 w-6" />
              </div>
            </div>

            {/* Événements Culturels */}
            <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all border-4 border-green-300 hover:border-green-500 transform hover:scale-105">
              <div className="bg-gradient-to-br from-green-600 to-green-700 w-24 h-24 rounded-2xl flex items-center justify-center mb-6 shadow-lg border-4 border-yellow-400">
                <Calendar className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">📅 Événements Culturels</h3>
              <p className="text-gray-700 mb-6 leading-relaxed font-bold text-lg">
                Participez à des festivals de musique, des cérémonies traditionnelles,
                des ateliers d'artisanat. Vivez la culture sénégalaise en temps réel.
              </p>
              <div className="flex items-center text-green-600 font-black text-lg">
                <span>Voir les événements</span>
                <ChevronRight className="ml-2 h-6 w-6" />
              </div>
            </div>

            {/* Jumelage IA */}
            <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all border-4 border-yellow-300 hover:border-yellow-500 transform hover:scale-105">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 w-24 h-24 rounded-2xl flex items-center justify-center mb-6 shadow-lg border-4 border-green-400">
                <Star className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">⭐ Jumelage Intelligent</h3>
              <p className="text-gray-700 mb-6 leading-relaxed font-bold text-lg">
                Notre IA vous connecte avec des locaux partageant vos passions.
                Musique, cuisine, histoire, sport... Trouvez votre compagnon d'aventure idéal.
              </p>
              <div className="flex items-center text-orange-600 font-black text-lg">
                <span>Essayer le jumelage</span>
                <ChevronRight className="ml-2 h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section avec motifs africains */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
        }}></div>
        <div className="absolute top-10 left-10 w-32 h-32 border-8 border-yellow-400/30 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 border-8 border-green-400/30 rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-7xl font-black mb-3 text-yellow-300">500+</div>
              <div className="text-orange-100 text-xl font-black">Guides certifiés</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-7xl font-black mb-3 text-yellow-300">50+</div>
              <div className="text-orange-100 text-xl font-black">Événements par mois</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-7xl font-black mb-3 text-yellow-300">10k+</div>
              <div className="text-orange-100 text-xl font-black">Voyageurs connectés</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-7xl font-black mb-3 text-yellow-300">4.8/5</div>
              <div className="text-orange-100 text-xl font-black">Note moyenne</div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full text-base font-black mb-6 shadow-lg">
              <Heart className="h-5 w-5" />
              TÉMOIGNAGES
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
              Ils ont vécu <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">l'expérience</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-orange-300 hover:border-orange-500 transition-all transform hover:scale-105">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed font-bold text-lg">
                "Une expérience extraordinaire ! Mon guide Moussa m'a fait découvrir
                la vraie Teranga. J'ai appris à danser le sabar et goûté les meilleurs
                thiéboudiène de ma vie. Le Sénégal restera dans mon cœur pour toujours."
              </p>
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-14 h-14 flex items-center justify-center mr-4 border-4 border-yellow-400">
                  <span className="text-white font-black text-lg">SM</span>
                </div>
                <div>
                  <div className="font-black text-gray-900 text-xl">Sarah M.</div>
                  <div className="text-base text-gray-600 font-bold">🇫🇷 France</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-green-300 hover:border-green-500 transition-all transform hover:scale-105">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed font-bold text-lg">
                "Grâce au jumelage IA, j'ai rencontré Amadou, un passionné d'histoire.
                Ensemble, nous avons exploré Gorée et Saint-Louis. Une connexion humaine
                authentique qui m'a marqué profondément."
              </p>
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full w-14 h-14 flex items-center justify-center mr-4 border-4 border-yellow-400">
                  <span className="text-white font-black text-lg">JD</span>
                </div>
                <div>
                  <div className="font-black text-gray-900 text-xl">Jean D.</div>
                  <div className="text-base text-gray-600 font-bold">🇧🇪 Belgique</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-yellow-300 hover:border-yellow-500 transition-all transform hover:scale-105">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed font-bold text-lg">
                "La culture sénégalaise est incroyable. J'ai participé à un festival
                de mbalax, appris quelques mots de wolof et découvert l'artisanat local.
                DiscoverSenegal rend tout cela accessible et authentique."
              </p>
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full w-14 h-14 flex items-center justify-center mr-4 border-4 border-green-400">
                  <span className="text-white font-black text-lg">MK</span>
                </div>
                <div>
                  <div className="font-black text-gray-900 text-xl">Maria K.</div>
                  <div className="text-base text-gray-600 font-bold">🇪🇸 Espagne</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section avec motifs africains */}
      <section className="py-24 bg-gradient-to-br from-green-700 via-yellow-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
        }}></div>
        {/* Cercles décoratifs */}
        <div className="absolute top-10 right-10 w-64 h-64 border-8 border-yellow-400/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 border-8 border-green-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6">
            Prêt à découvrir la <span className="text-yellow-300">Teranga</span> ? 🌟
          </h2>
          <p className="text-2xl sm:text-3xl text-white mb-10 leading-relaxed font-bold">
            Rejoignez notre communauté et vivez des expériences uniques
            au cœur du Sénégal. L'aventure vous attend ! 🚀
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-yellow-100 px-14 py-8 text-2xl font-black shadow-2xl hover:shadow-yellow-500/50 transition-all transform hover:scale-110 rounded-2xl">
                Commencer maintenant
                <ArrowRight className="ml-3 h-7 w-7" />
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="outline" size="lg" className="px-14 py-8 text-2xl font-black border-4 border-white text-white hover:bg-white hover:text-orange-600 transition-all shadow-2xl rounded-2xl">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer avec style africain */}
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,152,0,0.3) 20px, rgba(255,152,0,0.3) 22px)`
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">DiscoverSenegal</h3>
              <p className="text-gray-400 leading-relaxed font-bold">
                Connecter les cultures, créer des souvenirs.
                Vivez la Teranga authentique. 🌍
              </p>
            </div>
            <div>
              <h4 className="font-black mb-4 text-orange-400 text-xl">Découvrir</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors font-bold">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold">Événements</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold">Destinations</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold">Articles</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4 text-green-400 text-xl">À propos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors font-bold">Notre histoire</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold">L'équipe</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold">Partenaires</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4 text-yellow-400 text-xl">Légal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors font-bold">CGU</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="font-bold">© 2024 DiscoverSenegal. Tous droits réservés. Made with ❤️ in Senegal 🇸🇳</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
