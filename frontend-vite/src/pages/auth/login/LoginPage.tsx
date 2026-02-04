import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDFB] relative overflow-hidden px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2A900]/5 via-white to-[#FFFDFB]"></div>
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden border-2 border-[#F2A900] transform rotate-3 shadow-md bg-white p-1">
            <img src="/images/logo.jpeg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2D1B08] tracking-tighter mb-2">
            DISCOVER <span className="text-[#F2A900]">SÉNÉGAL</span>
          </h1>
          <p className="text-[#5D4037]/70 font-bold text-sm tracking-wide uppercase">Connectez-vous pour continuer</p>
        </div>

        <Card className="border-[#EBE3D5] shadow-xl bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-center text-[#2D1B08] font-black uppercase tracking-widest text-lg">Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#2D1B08] font-bold text-xs uppercase tracking-wider">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="border-[#EBE3D5] focus:ring-[#F2A900] focus:border-[#F2A900] rounded-xl py-6 bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#2D1B08] font-bold text-xs uppercase tracking-wider">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                  <AlertDescription className="font-medium">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-[#F2A900] hover:bg-[#D49400] text-white font-black rounded-full py-6 uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[#5D4037]/70 font-medium">
                Pas encore de compte ?{' '}
                <Link to="/auth/register" className="text-[#F2A900] hover:text-[#D49400] font-black hover:underline uppercase tracking-wide text-xs">
                  Créer un compte
                </Link>
              </p>
            </div>

            {/* Demo Accounts */}
            <div className="mt-8 p-6 bg-[#EBE3D5]/20 rounded-2xl border border-[#EBE3D5]/50">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#2D1B08]/50 mb-3 text-center">Comptes de démonstration</p>
              <div className="space-y-2 text-xs font-medium text-[#5D4037]/80">
                <p className="flex justify-between"><span>Admin:</span> <span className="font-bold">admin@discoversenegal.com</span></p>
                <p className="flex justify-between"><span>Guide:</span> <span className="font-bold">guide@discoversenegal.com</span></p>
                <p className="flex justify-between"><span>Touriste:</span> <span className="font-bold">tourist@discoversenegal.com</span></p>
                <p className="flex justify-between"><span>Mdp:</span> <span className="font-bold text-[#F2A900]">demo123</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
