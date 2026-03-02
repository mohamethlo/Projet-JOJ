import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Star, LogIn, UserPlus, Heart, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    actionName?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({
    isOpen,
    onClose,
    title = "Rejoignez Discover Sénégal",
    message = "Créez un compte pour interagir, sauvegarder vos favoris et finaliser vos réservations.",
    actionName
}) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        onClose();
        navigate('/auth/login');
    };

    const handleRegister = () => {
        onClose();
        navigate('/auth/register');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md p-0 overflow-hidden bg-white border-none rounded-3xl shadow-2xl">
                <div className="relative h-32 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="h-20 w-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                        <ShieldCheck className="h-10 w-10 text-[#F2A900]" />
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 h-24 w-24 bg-[#F2A900]/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-8 -left-8 h-32 w-32 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="p-8 text-center">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-2xl font-black text-[#2D1B08] tracking-tighter uppercase">
                            {title}
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-[#5D4037] text-sm leading-relaxed mb-8 font-medium">
                        {actionName && (
                            <span className="block mb-2 text-[#F2A900] font-black uppercase text-[10px] tracking-widest">
                                Action requise : {actionName}
                            </span>
                        )}
                        {message}
                    </p>

                    <div className="space-y-3">
                        <Button
                            onClick={handleRegister}
                            className="w-full bg-[#F2A900] hover:bg-[#D49400] text-white font-black py-6 rounded-2xl text-sm uppercase tracking-widest shadow-xl shadow-[#F2A900]/20 flex items-center justify-center gap-2 group"
                        >
                            <UserPlus className="h-4 w-4 transition-transform group-hover:scale-110" />
                            S'inscrire gratuitement
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleLogin}
                            className="w-full border-2 border-[#EBE3D5] text-[#2D1B08] hover:bg-gray-50 font-black py-6 rounded-2xl text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            <LogIn className="h-4 w-4" />
                            Se connecter
                        </Button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center gap-1 opacity-40">
                            <Heart className="h-4 w-4" />
                            <span className="text-[8px] font-black uppercase">Favoris</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 opacity-40">
                            <Star className="h-4 w-4" />
                            <span className="text-[8px] font-black uppercase">Avis</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 opacity-40">
                            <LogIn className="h-4 w-4" />
                            <span className="text-[8px] font-black uppercase">Réservation</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
