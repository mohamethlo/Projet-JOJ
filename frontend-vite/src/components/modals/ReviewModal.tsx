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
  Calendar,
  MapPin,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span>Laisser un avis - {targetName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations sur la cible */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{targetName}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <span>{targetType === 'guide' ? 'Guide' : targetType === 'event' ? 'Événement' : 'Hébergement'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Note */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Note globale *</Label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                    disabled={isSubmitting}
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 hover:text-yellow-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-3 text-sm text-gray-600">
                  {rating > 0 && (
                    <>
                      {rating === 1 && 'Très décevant'}
                      {rating === 2 && 'Décevant'}
                      {rating === 3 && 'Correct'}
                      {rating === 4 && 'Très bien'}
                      {rating === 5 && 'Excellent'}
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Titre */}
            <div className="space-y-2">
              <Label htmlFor="title">Titre de votre avis *</Label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Résumez votre expérience en quelques mots..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
                maxLength={100}
              />
            </div>

            {/* Contenu */}
            <div className="space-y-2">
              <Label htmlFor="content">Votre avis détaillé *</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Décrivez votre expérience en détail..."
                rows={4}
                disabled={isSubmitting}
                maxLength={1000}
              />
              <div className="text-right text-sm text-gray-500">
                {content.length}/1000 caractères
              </div>
            </div>

            {/* Points positifs */}
            <div className="space-y-2">
              <Label htmlFor="pros">Points positifs</Label>
              <Textarea
                id="pros"
                value={pros}
                onChange={(e) => setPros(e.target.value)}
                placeholder="Ce qui vous a plu..."
                rows={2}
                disabled={isSubmitting}
                maxLength={500}
              />
            </div>

            {/* Points négatifs */}
            <div className="space-y-2">
              <Label htmlFor="cons">Points à améliorer</Label>
              <Textarea
                id="cons"
                value={cons}
                onChange={(e) => setCons(e.target.value)}
                placeholder="Ce qui pourrait être amélioré..."
                rows={2}
                disabled={isSubmitting}
                maxLength={500}
              />
            </div>

            {/* Recommandation */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Recommanderiez-vous cette {targetType === 'guide' ? 'guide' : targetType === 'event' ? 'événement' : 'hébergement'} ?</Label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setWouldRecommend(true)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    wouldRecommend
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                  disabled={isSubmitting}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Oui, je recommande</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWouldRecommend(false)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    !wouldRecommend
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                  disabled={isSubmitting}
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>Non, je ne recommande pas</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || rating === 0 || !title.trim() || !content.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
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
  );
};

export default ReviewModal;
