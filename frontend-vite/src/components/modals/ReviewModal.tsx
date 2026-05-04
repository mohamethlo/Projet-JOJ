import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Star,
  Send,
  User,
  ThumbsUp,
  ThumbsDown,
  MessageSquareQuote,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: 'guide' | 'event' | 'accommodation';
  targetName: string;
  onSubmit?: (review: ReviewData) => void;
}

interface ReviewData {
  rating: number;
  title: string;
  content: string;
  pros: string;
  cons: string;
  wouldRecommend: boolean;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  targetId,
  targetType,
  targetName,
  onSubmit
}) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert('Veuillez donner une note avant de soumettre votre avis.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert('Veuillez remplir le titre et le contenu de votre avis.');
      return;
    }

    setIsSubmitting(true);

    const reviewData: ReviewData = {
      rating,
      title: title.trim(),
      content: content.trim(),
      pros: pros.trim(),
      cons: cons.trim(),
      wouldRecommend
    };

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Avis soumis:', reviewData);
    onSubmit?.(reviewData);

    // Reset du formulaire
    setRating(0);
    setTitle('');
    setContent('');
    setPros('');
    setCons('');
    setWouldRecommend(true);
    setIsSubmitting(false);
    onClose();
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #F2A900;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #D49400;
          }
        `}
      </style>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none bg-[#FFFDFB] rounded-[2rem] shadow-2xl custom-scrollbar">
          
          {/* Header Banner */}
          <div className="relative h-32 bg-[#2D1B08] overflow-hidden shrink-0">
             <div className="absolute inset-0 bg-gradient-to-br from-[#2D1B08] to-[#2D1B08]/80 z-10" />
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2A900]/10 rounded-full -mr-20 -mt-20 blur-3xl z-10" />
             <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <DialogTitle className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter leading-none flex items-center gap-3">
                    <MessageSquareQuote className="h-8 w-8 text-[#F2A900]" />
                    Partagez votre expérience
                </DialogTitle>
             </div>
             <Sparkles className="absolute top-6 right-6 h-8 w-8 text-[#F2A900]/20 z-20" />
          </div>

          <div className="p-8 space-y-8">
            {/* Target Info Card (Floating style) */}
            <div className="relative -mt-16 bg-white p-6 rounded-3xl shadow-xl border border-[#EBE3D5] z-30 flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-[#2D1B08]/5 border-2 border-[#F2A900]/20 flex items-center justify-center shrink-0">
                    <User className="h-6 w-6 text-[#2D1B08]" />
                </div>
                <div>
                    <h3 className="font-black text-[#2D1B08] uppercase tracking-tighter text-lg leading-none mb-1.5">{targetName}</h3>
                    <Badge className="bg-[#2D1B08]/5 text-[#2D1B08] hover:bg-[#2D1B08]/10 border-none font-bold uppercase tracking-widest text-[9px]">
                        {targetType === 'guide' ? 'Guide' : targetType === 'event' ? 'Événement' : 'Hébergement'}
                    </Badge>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Rating */}
              <div className="space-y-3 flex flex-col items-center justify-center bg-[#FDFCFB] p-6 rounded-3xl border border-[#EBE3D5]">
                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-center w-full">Votre Note Globale</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                      disabled={isSubmitting}
                    >
                      <Star
                        className={`h-10 w-10 transition-colors drop-shadow-sm ${star <= rating
                          ? 'fill-[#F2A900] text-[#F2A900]'
                          : 'text-[#EBE3D5] fill-[#EBE3D5]/20 hover:text-[#F2A900]/50'
                          }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="h-4">
                  {rating > 0 && (
                    <span className="text-xs font-black uppercase tracking-widest text-[#F2A900]">
                      {rating === 1 && 'Très décevant'}
                      {rating === 2 && 'Décevant'}
                      {rating === 3 && 'Correct'}
                      {rating === 4 && 'Très bien'}
                      {rating === 5 && 'Excellent'}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                  {/* Titre */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Titre de votre avis <span className="text-red-500">*</span></Label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex: Un séjour inoubliable..."
                      className="w-full h-12 px-4 bg-white rounded-xl border border-[#EBE3D5] focus:border-[#F2A900] focus:ring-4 focus:ring-[#F2A900]/10 font-bold text-[#2D1B08] transition-all"
                      disabled={isSubmitting}
                      maxLength={100}
                    />
                  </div>

                  {/* Contenu */}
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Votre avis détaillé <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Racontez-nous ce que vous avez aimé (ou moins aimé)..."
                      className="min-h-[120px] p-4 bg-white rounded-xl border border-[#EBE3D5] focus:border-[#F2A900] focus:ring-4 focus:ring-[#F2A900]/10 font-medium text-[#2D1B08] transition-all resize-none"
                      disabled={isSubmitting}
                      maxLength={1000}
                    />
                    <div className="text-right text-[10px] font-bold text-gray-400">
                      {content.length}/1000 caractères
                    </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Points positifs */}
                  <div className="space-y-2">
                    <Label htmlFor="pros" className="text-[10px] font-black uppercase tracking-widest text-[#1B5E20] ml-1">Points Positifs</Label>
                    <Textarea
                      id="pros"
                      value={pros}
                      onChange={(e) => setPros(e.target.value)}
                      placeholder="Ce qui vous a marqué en bien..."
                      className="min-h-[80px] p-4 bg-[#1B5E20]/5 rounded-xl border border-[#1B5E20]/10 focus:border-[#1B5E20] focus:ring-4 focus:ring-[#1B5E20]/10 font-medium text-[#2D1B08] transition-all resize-none"
                      disabled={isSubmitting}
                      maxLength={500}
                    />
                  </div>

                  {/* Points négatifs */}
                  <div className="space-y-2">
                    <Label htmlFor="cons" className="text-[10px] font-black uppercase tracking-widest text-[#E11D48] ml-1">Points à Améliorer</Label>
                    <Textarea
                      id="cons"
                      value={cons}
                      onChange={(e) => setCons(e.target.value)}
                      placeholder="Ce qui pourrait être mieux..."
                      className="min-h-[80px] p-4 bg-[#E11D48]/5 rounded-xl border border-[#E11D48]/10 focus:border-[#E11D48] focus:ring-4 focus:ring-[#E11D48]/10 font-medium text-[#2D1B08] transition-all resize-none"
                      disabled={isSubmitting}
                      maxLength={500}
                    />
                  </div>
              </div>

              {/* Recommandation */}
              <div className="space-y-3 bg-[#FDFCFB] p-6 rounded-3xl border border-[#EBE3D5]">
                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-center w-full block mb-4">Recommanderiez-vous ce choix ?</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setWouldRecommend(true)}
                    className={`flex items-center justify-center gap-2 h-12 rounded-xl border-2 transition-all font-black uppercase tracking-widest text-[10px] ${wouldRecommend
                      ? 'bg-[#1B5E20] border-[#1B5E20] text-white shadow-lg shadow-[#1B5E20]/20'
                      : 'bg-white border-[#EBE3D5] text-gray-400 hover:border-[#1B5E20]/30 hover:text-[#1B5E20]'
                      }`}
                    disabled={isSubmitting}
                  >
                    <ThumbsUp className={`h-4 w-4 ${wouldRecommend ? 'text-white' : ''}`} />
                    Oui, Absolument
                  </button>
                  <button
                    type="button"
                    onClick={() => setWouldRecommend(false)}
                    className={`flex items-center justify-center gap-2 h-12 rounded-xl border-2 transition-all font-black uppercase tracking-widest text-[10px] ${!wouldRecommend
                      ? 'bg-[#E11D48] border-[#E11D48] text-white shadow-lg shadow-[#E11D48]/20'
                      : 'bg-white border-[#EBE3D5] text-gray-400 hover:border-[#E11D48]/30 hover:text-[#E11D48]'
                      }`}
                    disabled={isSubmitting}
                  >
                    <ThumbsDown className={`h-4 w-4 ${!wouldRecommend ? 'text-white' : ''}`} />
                    Non, Pas Vraiment
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="text-gray-400 hover:text-[#2D1B08] font-black uppercase tracking-widest h-12 px-6"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || rating === 0 || !title.trim() || !content.trim()}
                  className="bg-[#2D1B08] hover:bg-black text-[#F2A900] font-black uppercase tracking-widest h-12 px-8 rounded-xl shadow-xl shadow-[#2D1B08]/20 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#F2A900] mr-2"></div>
                      Publication...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Publier l'avis
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewModal;

