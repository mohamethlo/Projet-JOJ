import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Users, Star, Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              <span className="text-orange-600">la</span>Teranga
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              La plateforme qui connecte les voyageurs aux authentiques expériences sénégalaises. 
              Découvrez la culture, rencontrez des locaux passionnés et créez des souvenirs inoubliables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                  Commencer l'aventure
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button variant="outline" size="lg" className="px-8 py-3">
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="relative h-96 mt-12">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1200)'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Une expérience authentique vous attend
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez le Sénégal à travers les yeux de ses habitants
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Guides Certifiés</h3>
              <p className="text-gray-600">
                Rencontrez des guides locaux expérimentés et passionnés par leur culture
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Événements Culturels</h3>
              <p className="text-gray-600">
                Participez à des festivals, ateliers et événements authentiques
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Jumelage IA</h3>
              <p className="text-gray-600">
                Notre IA vous connecte avec des locaux partageant vos centres d'intérêt
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sécurité Garantie</h3>
              <p className="text-gray-600">
                Voyagez en toute sérénité avec notre système de sécurité intégré
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-orange-100">Guides certifiés</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-orange-100">Événements par mois</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-orange-100">Voyageurs connectés</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8/5</div>
              <div className="text-orange-100">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Prêt à découvrir la Teranga sénégalaise ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez notre communauté et vivez des expériences uniques au cœur du Sénégal
          </p>
          <Link to="/auth/register">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
              Rejoindre laTeranga
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">laTeranga</h3>
          <p className="text-gray-400 mb-4">
            Connecter les cultures, créer des souvenirs
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">À propos</a>
            <a href="#" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">Confidentialité</a>
            <a href="#" className="hover:text-white">CGU</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
