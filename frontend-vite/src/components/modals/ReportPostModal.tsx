import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
    Flag, 
    AlertTriangle, 
    ShieldAlert, 
    MessageSquareX, 
    ZapOff, 
    UserX,
    Info,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ReportPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    postAuthor: string;
}

const REPORT_REASONS = [
    { id: 'spam', label: 'Spam ou contenu indésirable', icon: ZapOff, color: 'text-amber-500' },
    { id: 'harassment', label: 'Harcèlement ou discours de haine', icon: UserX, color: 'text-red-500' },
    { id: 'inappropriate', label: 'Contenu inapproprié ou sexuel', icon: ShieldAlert, color: 'text-purple-500' },
    { id: 'fake', label: 'Fausses informations ou tromperie', icon: Info, color: 'text-blue-500' },
    { id: 'violence', label: 'Violence ou contenu graphique', icon: AlertTriangle, color: 'text-orange-600' },
    { id: 'other', label: 'Autre raison', icon: MessageSquareX, color: 'text-gray-500' }
];

const ReportPostModal: React.FC<ReportPostModalProps> = ({
    isOpen,
    onClose,
    postAuthor
}) => {
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [details, setDetails] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = () => {
        if (!selectedReason) return;
        
        setIsSubmitting(true);
        // Simulation d'envoi API
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            toast.success('Signalement envoyé avec succès. Merci de contribuer à la sécurité de la communauté.');
            
            // Auto close after 2 seconds
            setTimeout(() => {
                handleClose();
            }, 2000);
        }, 1500);
    };

    const handleClose = () => {
        onClose();
        // Reset state
        setTimeout(() => {
            setSelectedReason(null);
            setDetails('');
            setIsSuccess(false);
        }, 300);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-xl max-h-[95vh] flex flex-col rounded-[2.5rem] sm:rounded-[3.5rem] border-4 border-[#EBE3D5] bg-white p-0 overflow-hidden shadow-2xl">
                {!isSuccess ? (
                    <>
                        <div className="flex-none bg-[#2D1B08] p-8 text-white relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F2A900]/10 rounded-full blur-3xl" />
                            <DialogHeader className="relative z-10">
                                <DialogTitle className="text-2xl sm:text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                                    <div className="bg-[#F2A900] p-2 rounded-xl">
                                        <Flag className="h-5 w-5 sm:h-6 sm:w-6 text-[#2D1B08]" />
                                    </div>
                                    Signaler le Post
                                </DialogTitle>
                                <DialogDescription className="text-white/60 font-bold uppercase text-[10px] sm:text-xs tracking-widest mt-1">
                                    Aidez-nous à garder Discover Sénégal sûr et authentique
                                </DialogDescription>
                            </DialogHeader>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar">
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black text-[#2D1B08] uppercase tracking-[0.2em] ml-1">
                                    Pourquoi signalez-vous cette publication de <span className="text-[#F2A900]">{postAuthor}</span> ?
                                </Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {REPORT_REASONS.map((reason) => (
                                        <button
                                            key={reason.id}
                                            onClick={() => setSelectedReason(reason.id)}
                                            className={cn(
                                                "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left group",
                                                selectedReason === reason.id
                                                    ? "border-[#F2A900] bg-[#F2A900]/5 shadow-inner"
                                                    : "border-[#EBE3D5] hover:border-[#F2A900]/30 bg-gray-50"
                                            )}
                                        >
                                            <div className={cn(
                                                "p-2 rounded-lg bg-white shadow-sm transition-transform group-hover:scale-110",
                                                reason.color
                                            )}>
                                                <reason.icon size={16} />
                                            </div>
                                            <span className="text-[11px] font-black text-[#2D1B08] uppercase tracking-tight leading-tight">
                                                {reason.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3 pb-2">
                                <Label htmlFor="report-details" className="text-[10px] font-black text-[#2D1B08] uppercase tracking-[0.2em] ml-1">
                                    Détails supplémentaires (facultatif)
                                </Label>
                                <Textarea
                                    id="report-details"
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    placeholder="Expliquez-nous brièvement ce qui ne va pas..."
                                    className="border-2 border-[#EBE3D5] focus:border-[#F2A900] focus:ring-0 rounded-2xl p-4 min-h-[100px] font-bold text-sm bg-white"
                                />
                            </div>
                        </div>

                        <DialogFooter className="flex-none p-6 sm:p-8 bg-[#FAFAFA] border-t-2 border-[#EBE3D5] flex gap-3">
                            <Button 
                                variant="outline" 
                                onClick={handleClose}
                                className="rounded-2xl border-2 border-[#EBE3D5] font-black uppercase text-[10px] tracking-widest h-14 flex-1 shadow-sm hover:bg-white"
                            >
                                Annuler
                            </Button>
                            <Button 
                                onClick={handleSubmit}
                                disabled={!selectedReason || isSubmitting}
                                className="rounded-2xl bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black uppercase text-[10px] tracking-widest h-14 flex-1 shadow-lg transition-all"
                            >
                                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le signalement'}
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    <div className="p-12 sm:p-20 text-center space-y-8 animate-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border-4 border-emerald-100">
                            <CheckCircle2 size={48} className="animate-pulse" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl sm:text-3xl font-black text-[#2D1B08] uppercase tracking-tighter leading-none">Signalement Envoyé</h3>
                            <p className="text-sm text-[#5D4037]/70 font-medium italic max-w-sm mx-auto">
                                Votre vigilance nous aide à protéger la communauté Discover Sénégal. Notre équipe de modération traitera ce message dans les plus brefs délais.
                            </p>
                        </div>
                        <div className="pt-4">
                            <Badge className="bg-[#1B5E20] text-white font-black uppercase tracking-widest text-[10px] px-4 py-1.5 rounded-full">
                                Sécurité Renforcée
                            </Badge>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ReportPostModal;
