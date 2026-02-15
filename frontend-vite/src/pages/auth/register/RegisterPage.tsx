import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les mots de passe ne correspondent pas',
        confirmButtonColor: '#F2A900'
      });
    }

    if (formData.password.length < 6) {
      return Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Le mot de passe doit contenir au moins 6 caractères',
        confirmButtonColor: '#F2A900'
      });
    }

    setIsLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        location: formData.location
      });

      // ✅ Message de succès avec effet fluide
      Swal.fire({
        icon: 'success',
        title: 'Inscription réussie 🎉',
        text: 'Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.',
        confirmButtonColor: '#F2A900',
        timer: 2500,
        showConfirmButton: false
      });

      // 🕒 Redirection automatique vers la page de connexion
      setTimeout(() => navigate('/auth/login'), 2500);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: err instanceof Error ? err.message : "Une erreur est survenue lors de l'inscription",
        confirmButtonColor: '#F2A900'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDFB] relative overflow-hidden px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2A900]/5 via-white to-[#FFFDFB]"></div>
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 my-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden border-2 border-[#F2A900] transform -rotate-3 shadow-md bg-white p-1">
            <img src="/images/nouveau_logo.jpeg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2D1B08] tracking-tighter mb-2">
            DISCOVER <span className="text-[#F2A900]">SÉNÉGAL</span>
          </h1>
          <p className="text-[#5D4037]/70 font-bold text-sm tracking-wide uppercase">Rejoignez notre communauté</p>
        </div>

        <Card className="border-[#EBE3D5] shadow-xl bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-center text-[#2D1B08] font-black uppercase tracking-widest text-lg">Inscription</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#2D1B08] font-bold text-xs uppercase tracking-wider">Nom complet</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="Votre nom"
                  required
                  className="border-[#EBE3D5] focus:ring-[#F2A900] focus:border-[#F2A900] rounded-xl py-6 bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#2D1B08] font-bold text-xs uppercase tracking-wider">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="border-[#EBE3D5] focus:ring-[#F2A900] focus:border-[#F2A900] rounded-xl py-6 bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-[#2D1B08] font-bold text-xs uppercase tracking-wider">Localisation</Label>
                <Input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={e => handleChange('location', e.target.value)}
                  placeholder="Votre ville"
                  className="border-[#EBE3D5] focus:ring-[#F2A900] focus:border-[#F2A900] rounded-xl py-6 bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#2D1B08] font-bold text-xs uppercase tracking-wider">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => handleChange('password', e.target.value)}
                    placeholder="••••••••"
                    required
                    className="border-[#EBE3D5] focus:ring-[#F2A900] focus:border-[#F2A900] rounded-xl py-6 bg-white/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5D4037]/50 hover:text-[#F2A900] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#2D1B08] font-bold text-xs uppercase tracking-wider">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={e => handleChange('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                  required
                  className="border-[#EBE3D5] focus:ring-[#F2A900] focus:border-[#F2A900] rounded-xl py-6 bg-white/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#F2A900] hover:bg-[#D49400] text-white font-black rounded-full py-6 uppercase tracking-widest shadow-lg hover:shadow-xl transition-all mt-4"
                disabled={isLoading}
              >
                {isLoading ? 'Inscription...' : 'Créer mon compte'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[#5D4037]/70 font-medium">
                Déjà un compte ?{' '}
                <Link
                  to="/auth/login"
                  className="text-[#F2A900] hover:text-[#D49400] font-black hover:underline uppercase tracking-wide text-xs"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
