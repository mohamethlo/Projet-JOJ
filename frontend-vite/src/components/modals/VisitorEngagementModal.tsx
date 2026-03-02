import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Compass, UserPlus, LogIn, X } from 'lucide-react';

interface VisitorEngagementModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const VisitorEngagementModal: React.FC<VisitorEngagementModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleRegister = () => {
        onClose();
        navigate('/auth/register');
    };

    const handleLogin = () => {
        onClose();
        navigate('/auth/login');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl p-0 overflow-hidden border-none bg-[#2D1B08] rounded-[2rem] shadow-3xl [&>button]:hidden">
                <div className="relative flex flex-col md:flex-row h-full min-h-[500px]">
                    {/* Background Image / Culture Side */}
                    <div className="relative w-full md:w-1/2 h-48 md:h-auto overflow-hidden bg-[#3D2B18]">
                        <img
                            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Culture Sénégalaise"
                            className="w-full h-full object-cover transition-transform duration-[20s] hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#2D1B08] via-transparent to-transparent opacity-80 md:opacity-60"></div>

                        {/* Logo or Icon Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20">
                                <Compass className="h-12 w-12 text-[#F2A900] animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left relative">
                        {/* Custom Close Button (Hiding default shadcn close button via CSS in DialogContent) */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors z-50"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <span className="text-[#F2A900] font-black uppercase text-[10px] tracking-[0.3em] block">
                                    Immersion Totale
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tighter uppercase italic">
                                    Explorez le Sénégal autrement.
                                </h2>
                            </div>

                            <p className="text-[#EBE3D5]/80 text-lg font-medium leading-relaxed">
                                Rejoignez la communauté pour sauvegarder vos pépites, réserver sans attendre et vivre l'expérience Teranga au maximum.
                            </p>

                            <div className="space-y-4 pt-4">
                                <Button
                                    onClick={handleRegister}
                                    className="w-full bg-[#F2A900] hover:bg-[#D49400] text-white h-14 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-[#F2A900]/20 transition-all hover:translate-y-[-2px] active:translate-y-[0px] flex items-center justify-center gap-3"
                                >
                                    <UserPlus className="h-5 w-5" />
                                    Devenir Membre
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={handleLogin}
                                    className="w-full text-white hover:bg-white/10 h-14 rounded-2xl font-bold uppercase tracking-widest text-[11px] border border-white/10"
                                >
                                    <LogIn className="h-4 w-4 mr-2" />
                                    Déjà inscrit ? Me connecter
                                </Button>
                            </div>
                        </div>

                        {/* Footer decoration */}
                        <div className="mt-12 flex items-center gap-4 opacity-30">
                            <div className="h-[1px] flex-1 bg-[#EBE3D5]"></div>
                            <span className="text-[#EBE3D5] text-[8px] font-black uppercase tracking-widest">Discover Sénégal</span>
                            <div className="h-[1px] flex-1 bg-[#EBE3D5]"></div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VisitorEngagementModal;
