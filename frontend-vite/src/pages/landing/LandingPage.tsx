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
  ChevronRight
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
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Immersive */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1564769625908-49c37c60a9e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-orange-600/90 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              🇸🇳 Bienvenue au Sénégal
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="text-orange-400">Discover</span>
            <span className="text-white">Senegal</span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-orange-100 mb-4 font-light">
            Vivez la <span className="font-bold text-orange-400">Teranga</span>
          </p>
          
          <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Découvrez l'hospitalité légendaire du Sénégal, sa culture vibrante, 
            ses traditions millénaires et ses paysages à couper le souffle. 
            Une expérience authentique vous attend.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                Commencer votre aventure
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="outline" size="lg" className="px-10 py-6 text-lg font-semibold bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ArrowRight className="h-6 w-6 text-white rotate-90" />
        </div>
      </div>

      {/* Teranga Section - La culture de l'hospitalité */}
      <section className="py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6">
                La Teranga
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                L'hospitalité sénégalaise,
                <span className="text-orange-600"> une tradition sacrée</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                La <strong className="text-orange-600">Teranga</strong> est bien plus qu'un simple mot. 
                C'est un art de vivre, une philosophie qui place l'accueil et le partage au cœur 
                de la culture sénégalaise.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chez DiscoverSenegal, nous connectons les voyageurs avec des guides locaux 
                authentiques qui vous feront découvrir le vrai Sénégal. Partagez un repas 
                traditionnel, apprenez le wolof, dansez au rythme des tam-tams sous les étoiles.
              </p>
              <div className="flex items-center space-x-4">
                <Link to="/auth/register">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    Vivre la Teranga
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1598880595806-3cf9b1b455c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Culture sénégalaise" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Guides locaux</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section - Rich Heritage */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Une culture <span className="text-orange-600">riche et vibrante</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plongez dans les traditions millénaires du Sénégal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Musique et Danse */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white p-8 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <Drum className="h-12 w-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Musique & Danse</h3>
              <p className="text-orange-100 mb-6 leading-relaxed">
                Découvrez le mbalax, la musique traditionnelle du Sénégal. 
                Apprenez les danses sabar, participez à des soirées culturelles 
                authentiques animées par les griots.
              </p>
              <div className="flex items-center text-orange-100 group-hover:text-white transition-colors">
                <span className="font-semibold">En savoir plus</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>

            {/* Gastronomie */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white p-8 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <UtensilsCrossed className="h-12 w-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Gastronomie</h3>
              <p className="text-orange-100 mb-6 leading-relaxed">
                Savourez le thiéboudiène, le yassa, le mafé et bien d'autres plats 
                traditionnels. Participez à des cours de cuisine avec des chefs locaux 
                et découvrez les secrets de la cuisine sénégalaise.
              </p>
              <div className="flex items-center text-orange-100 group-hover:text-white transition-colors">
                <span className="font-semibold">En savoir plus</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>

            {/* Histoire et Patrimoine */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 to-red-600 text-white p-8 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <BookOpen className="h-12 w-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Histoire & Patrimoine</h3>
              <p className="text-orange-100 mb-6 leading-relaxed">
                Explorez l'île de Gorée, témoin de l'histoire. Découvrez Saint-Louis, 
                ancienne capitale de l'AOF. Visitez les mosquées, les sites historiques 
                et comprenez l'héritage culturel du Sénégal.
              </p>
              <div className="flex items-center text-orange-100 group-hover:text-white transition-colors">
                <span className="font-semibold">En savoir plus</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Iconiques */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Destinations <span className="text-orange-600">emblématiques</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des lieux qui racontent l'âme du Sénégal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dakar */}
            <div className="group relative overflow-hidden rounded-xl h-80 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1564769625908-49c37c60a9e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Dakar" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <MapPin className="h-5 w-5 mb-2" />
                <h3 className="text-2xl font-bold mb-2">Dakar</h3>
                <p className="text-white/90">La capitale vibrante</p>
              </div>
            </div>

            {/* Gorée */}
            <div className="group relative overflow-hidden rounded-xl h-80 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Gorée" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <MapPin className="h-5 w-5 mb-2" />
                <h3 className="text-2xl font-bold mb-2">Gorée</h3>
                <p className="text-white/90">L'île mémoire</p>
              </div>
            </div>

            {/* Saint-Louis */}
            <div className="group relative overflow-hidden rounded-xl h-80 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Saint-Louis" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <MapPin className="h-5 w-5 mb-2" />
                <h3 className="text-2xl font-bold mb-2">Saint-Louis</h3>
                <p className="text-white/90">Ville historique</p>
              </div>
            </div>

            {/* Lac Rose */}
            <div className="group relative overflow-hidden rounded-xl h-80 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1539650116574-75c0c6d73e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Lac Rose" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <MapPin className="h-5 w-5 mb-2" />
                <h3 className="text-2xl font-bold mb-2">Lac Rose</h3>
                <p className="text-white/90">Merveille naturelle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expériences Authentiques */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Des expériences <span className="text-orange-600">inoubliables</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vivez le Sénégal comme un local
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Guide Local */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Guides Locaux Certifiés</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Rencontrez des guides passionnés par leur culture. Ils vous feront découvrir 
                les secrets cachés, les meilleurs spots et les histoires authentiques du Sénégal.
              </p>
              <div className="flex items-center text-orange-600 font-semibold">
                <span>Découvrir les guides</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </div>
            </div>

            {/* Événements Culturels */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Événements Culturels</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Participez à des festivals de musique, des cérémonies traditionnelles, 
                des ateliers d'artisanat. Vivez la culture sénégalaise en temps réel.
              </p>
              <div className="flex items-center text-orange-600 font-semibold">
                <span>Voir les événements</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </div>
            </div>

            {/* Jumelage IA */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Jumelage Intelligent</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Notre IA vous connecte avec des locaux partageant vos passions. 
                Musique, cuisine, histoire, sport... Trouvez votre compagnon d'aventure idéal.
              </p>
              <div className="flex items-center text-orange-600 font-semibold">
                <span>Essayer le jumelage</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl font-bold mb-3">500+</div>
              <div className="text-orange-100 text-lg">Guides certifiés</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl font-bold mb-3">50+</div>
              <div className="text-orange-100 text-lg">Événements par mois</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl font-bold mb-3">10k+</div>
              <div className="text-orange-100 text-lg">Voyageurs connectés</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl font-bold mb-3">4.8/5</div>
              <div className="text-orange-100 text-lg">Note moyenne</div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Ils ont vécu <span className="text-orange-600">l'expérience</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-orange-400 fill-orange-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed">
                "Une expérience extraordinaire ! Mon guide Moussa m'a fait découvrir 
                la vraie Teranga. J'ai appris à danser le sabar et goûté les meilleurs 
                thiéboudiène de ma vie. Le Sénégal restera dans mon cœur pour toujours."
              </p>
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-orange-600 font-bold">SM</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah M.</div>
                  <div className="text-sm text-gray-500">France</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-orange-400 fill-orange-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed">
                "Grâce au jumelage IA, j'ai rencontré Amadou, un passionné d'histoire. 
                Ensemble, nous avons exploré Gorée et Saint-Louis. Une connexion humaine 
                authentique qui m'a marqué profondément."
              </p>
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-orange-600 font-bold">JD</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Jean D.</div>
                  <div className="text-sm text-gray-500">Belgique</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-orange-400 fill-orange-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed">
                "La culture sénégalaise est incroyable. J'ai participé à un festival 
                de mbalax, appris quelques mots de wolof et découvert l'artisanat local. 
                DiscoverSenegal rend tout cela accessible et authentique."
              </p>
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-orange-600 font-bold">MK</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Maria K.</div>
                  <div className="text-sm text-gray-500">Espagne</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-24 bg-gradient-to-br from-orange-600 via-orange-700 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Prêt à découvrir la <span className="text-orange-200">Teranga</span> ?
          </h2>
          <p className="text-xl sm:text-2xl text-orange-50 mb-10 leading-relaxed">
            Rejoignez notre communauté et vivez des expériences uniques 
            au cœur du Sénégal. L'aventure vous attend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="outline" size="lg" className="px-10 py-6 text-lg font-semibold border-2 border-white text-white hover:bg-white/10">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">DiscoverSenegal</h3>
              <p className="text-gray-400 leading-relaxed">
                Connecter les cultures, créer des souvenirs. 
                Vivez la Teranga authentique.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Découvrir</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Événements</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Destinations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Articles</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">À propos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Notre histoire</a></li>
                <li><a href="#" className="hover:text-white transition-colors">L'équipe</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partenaires</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DiscoverSenegal. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
