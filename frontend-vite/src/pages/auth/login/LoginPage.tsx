import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, ArrowLeft, Mail, CheckCircle2, Lock } from 'lucide-react';

type AuthView = 'login' | 'forgot-password' | 'sent';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<AuthView>('login');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulation d'envoi d'email
    setTimeout(() => {
      setIsLoading(false);
      setView('sent');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDFB] relative overflow-hidden px-4 md:py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F2A900]/10 via-white to-[#FFFDFB]"></div>
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden border-4 border-[#F2A900] transform rotate-6 shadow-2xl bg-white p-1 transition-transform hover:rotate-0 duration-500">
            <img src="/images/nouveau_logo.jpeg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#2D1B08] tracking-tighter mb-2 uppercase italic">
            Discover <span className="text-[#F2A900] not-italic">Sénégal</span>
          </h1>
          <p className="text-[#5D4037]/70 font-black text-xs tracking-[0.2em] uppercase">Plateforme de Tourisme Premium</p>
        </div>

        <Card className="border-2 border-[#EBE3D5] shadow-[0_32px_64px_-16px_rgba(45,27,8,0.15)] bg-white/90 backdrop-blur-xl rounded-[3rem] overflow-hidden">
          <CardHeader className="pt-10 pb-4">
            <CardTitle className="text-center text-[#2D1B08] font-black uppercase tracking-[0.3em] text-xl">
              {view === 'login' ? 'Connexion' : view === 'forgot-password' ? 'Récupération' : 'Félicitations'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="px-8 pb-10">
            {view === 'login' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#2D1B08] font-black text-[10px] uppercase tracking-widest ml-1">Adresse Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ex: moussa@discover.sn"
                    required
                    className="border-2 border-[#EBE3D5] focus:border-[#F2A900] focus:ring-0 rounded-2xl py-7 bg-white font-bold transition-all placeholder:text-[#5D4037]/30"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <Label htmlFor="password" className="text-[#2D1B08] font-black text-[10px] uppercase tracking-widest">Mot de passe</Label>
                    <button 
                      type="button"
                      onClick={() => setView('forgot-password')}
                      className="text-[#F2A900] font-black text-[10px] uppercase tracking-widest hover:underline"
                    >
                      Oublié ?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="border-2 border-[#EBE3D5] focus:border-[#F2A900] focus:ring-0 rounded-2xl py-7 bg-white font-bold transition-all pr-12 placeholder:text-[#5D4037]/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#5D4037]/40 hover:text-[#F2A900] transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="bg-red-50 border-2 border-red-200 text-red-800 rounded-2xl py-4">
                    <AlertDescription className="font-black text-xs uppercase italic tracking-wide">{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black rounded-2xl py-8 uppercase tracking-[0.2em] shadow-xl hover:shadow-[#F2A900]/20 transition-all text-xs"
                  disabled={isLoading}
                >
                  {isLoading ? 'Authentification...' : 'Se connecter'}
                </Button>
              </form>
            )}

            {view === 'forgot-password' && (
              <form onSubmit={handleForgotPassword} className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="text-center space-y-2 mb-4">
                  <p className="text-sm text-[#5D4037]/70 font-medium leading-relaxed italic">
                    Saisissez votre email pour recevoir un lien sécurisé de réinitialisation.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-[#2D1B08] font-black text-[10px] uppercase tracking-widest ml-1">Votre Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="border-2 border-[#EBE3D5] focus:border-[#F2A900] focus:ring-0 rounded-2xl py-7 bg-white font-bold"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black rounded-2xl py-8 uppercase tracking-[0.2em] shadow-xl transition-all text-xs"
                  disabled={isLoading}
                >
                  {isLoading ? 'Traitement...' : 'Envoyer le lien'}
                </Button>

                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="w-full flex items-center justify-center gap-2 text-[#5D4037]/60 font-black text-[10px] uppercase tracking-widest hover:text-[#2D1B08] transition-colors"
                >
                  <ArrowLeft size={14} /> Retour à la connexion
                </button>
              </form>
            )}

            {view === 'sent' && (
              <div className="text-center space-y-8 animate-in zoom-in duration-300 py-4">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border-2 border-emerald-100">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-[#2D1B08] uppercase tracking-tight leading-none">Vérifiez votre boîte mail</h3>
                  <p className="text-sm text-[#5D4037]/70 font-medium italic">
                    Un lien de réinitialisation a été envoyé à : <br />
                    <span className="font-black text-[#F2A900] not-italic">{email}</span>
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                  <p className="text-[10px] text-[#5D4037] font-bold leading-relaxed">
                    Pensez à regarder dans vos courriers indésirables (Spams) si vous ne recevez rien dans les 2 minutes.
                  </p>
                </div>
                <Button
                  onClick={() => setView('login')}
                  variant="outline"
                  className="w-full border-2 border-[#EBE3D5] text-[#2D1B08] font-black rounded-2xl py-7 uppercase tracking-[0.2em] hover:bg-gray-50"
                >
                  Retour à la connexion
                </Button>
              </div>
            )}

            {view === 'login' && (
              <div className="mt-10 text-center border-t-2 border-[#EBE3D5]/50 pt-8">
                <p className="text-sm text-[#5D4037]/70 font-medium">
                  Pas encore de compte ?{' '}
                  <Link to="/auth/register" className="text-[#F2A900] hover:text-[#D49400] font-black hover:underline uppercase tracking-wide text-xs">
                    Créer un compte
                  </Link>
                </p>
              </div>
            )}

            {/* Premium Features Info */}
            {view === 'login' && (
               <div className="mt-8 flex justify-center gap-6">
                 <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity cursor-default">
                    <Lock size={16} className="text-[#5D4037]" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Sécurisé</span>
                 </div>
                 <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity cursor-default">
                    <Mail size={16} className="text-[#5D4037]" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Support</span>
                 </div>
               </div>
            )}
          </CardContent>
        </Card>
        
        {/* Simple Demo Box - Less intrusive */}
        {view === 'login' && (
          <div className="mt-8 text-center bg-transparent">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#5D4037]/30 mb-2 italic">Accès Démo Rapide</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="border-[#EBE3D5] text-[#5D4037]/40 text-[8px] font-bold py-0.5 rounded-lg">Admin</Badge>
              <Badge variant="outline" className="border-[#EBE3D5] text-[#5D4037]/40 text-[8px] font-bold py-0.5 rounded-lg">Guide</Badge>
              <Badge variant="outline" className="border-[#EBE3D5] text-[#5D4037]/40 text-[8px] font-bold py-0.5 rounded-lg">Artisan</Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
