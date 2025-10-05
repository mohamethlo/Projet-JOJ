import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Star, 
  Search, 
  Filter, 
  Calendar, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Mock data - in a real app, this would come from an API
const mockReviews = [
  {
    id: '1',
    author: { name: 'Marie Diop', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'Touriste' },
    rating: 5,
    title: 'Expérience exceptionnelle !',
    content: 'Guide très professionnel et passionné. J\'ai appris énormément sur l\'histoire du Sénégal.',
    pros: 'Très cultivé, ponctuel, et à l\'écoute',
    cons: '',
    wouldRecommend: true,
    date: '2024-01-15',
    likes: 12,
    replies: 3
  },
  {
    id: '2',
    author: { name: 'Jean Martin', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'Touriste' },
    rating: 4,
    title: 'Très bonne visite',
    content: 'Visite intéressante avec de bonnes explications. Quelques petits détails à améliorer.',
    pros: 'Bonne connaissance des lieux',
    cons: 'Un peu pressé parfois',
    wouldRecommend: true,
    date: '2024-01-10',
    likes: 8,
    replies: 1
  },
  {
    id: '3',
    author: { name: 'Fatou Sarr', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'Local' },
    rating: 5,
    title: 'Je recommande vivement',
    content: 'Excellent guide qui connaît parfaitement son métier. Une expérience enrichissante.',
    pros: 'Professionnel, sympathique, très cultivé',
    cons: '',
    wouldRecommend: true,
    date: '2024-01-05',
    likes: 15,
    replies: 2
  }
];

interface Review {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  rating: number;
  title: string;
  content: string;
  pros?: string;
  cons?: string;
  wouldRecommend: boolean;
  date: string;
  likes: number;
  replies: number;
}

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: 'guide' | 'event' | 'accommodation';
  targetName: string;
  canInteract?: boolean; // Si false, désactive les likes et réponses
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ 
  isOpen, 
  onClose, 
  targetId, 
  targetType, 
  targetName,
  canInteract = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [filterRecommendation, setFilterRecommendation] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());
  const [replies, setReplies] = useState<{[key: string]: string}>({});
  const [showReplyForm, setShowReplyForm] = useState<{[key: string]: boolean}>({});
  const reviewsPerPage = 5;

  // Use mock data for now
  const reviews: Review[] = mockReviews;

  // Calculer les statistiques
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
    : '0.0';
  const recommendedCount = reviews.filter(r => r.wouldRecommend).length;
  const recommendationRate = totalReviews > 0 
    ? Math.round((recommendedCount / totalReviews) * 100)
    : 0;

  // Distribution des notes
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: totalReviews > 0 
      ? Math.round((reviews.filter(r => r.rating === rating).length / totalReviews) * 100)
      : 0
  }));

  // Filtrer les avis
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    const matchesRecommendation = filterRecommendation === 'all' || 
      (filterRecommendation === 'yes' && review.wouldRecommend) ||
      (filterRecommendation === 'no' && !review.wouldRecommend);
    
    return matchesSearch && matchesRating && matchesRecommendation;
  });

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + reviewsPerPage);

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Fonction pour gérer les likes
  const handleLikeReview = (reviewId: string) => {
    setLikedReviews(prev => {
      const newLikedReviews = new Set(prev);
      if (newLikedReviews.has(reviewId)) {
        newLikedReviews.delete(reviewId); // Unliker
      } else {
        newLikedReviews.add(reviewId); // Liker
      }
      return newLikedReviews;
    });
  };

  // Fonction pour obtenir le nombre de likes mis à jour
  const getReviewLikes = (reviewId: string, baseLikes: number) => {
    const isLiked = likedReviews.has(reviewId);
    return isLiked ? baseLikes + 1 : baseLikes;
  };

  // Fonction pour gérer l'affichage du formulaire de réponse
  const handleShowReplyForm = (reviewId: string) => {
    setShowReplyForm(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  // Fonction pour gérer la saisie de réponse
  const handleReplyChange = (reviewId: string, value: string) => {
    setReplies(prev => ({
      ...prev,
      [reviewId]: value
    }));
  };

  // Fonction pour soumettre une réponse
  const handleSubmitReply = (reviewId: string) => {
    const replyText = replies[reviewId];
    if (replyText && replyText.trim()) {
      // Simulation d'envoi de réponse
      console.log(`Réponse soumise pour l'avis ${reviewId}:`, replyText);
      
      // Réinitialiser le formulaire
      setReplies(prev => ({
        ...prev,
        [reviewId]: ''
      }));
      setShowReplyForm(prev => ({
        ...prev,
        [reviewId]: false
      }));
      
      // Afficher un message de succès (simulation)
      alert('Réponse envoyée avec succès !');
    }
  };

  const handleClose = () => {
    setSearchTerm('');
    setFilterRating('all');
    setFilterRecommendation('all');
    setCurrentPage(1);
    setLikedReviews(new Set());
    setReplies({});
    setShowReplyForm({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span>Avis - {targetName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations sur la cible */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                {targetName.charAt(0)}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{targetName}</h3>
              <p className="text-sm text-gray-600">
                {targetType === 'guide' ? 'Guide' : targetType === 'event' ? 'Événement' : 'Hébergement'}
              </p>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">{averageRating}</div>
              <div className="flex justify-center mt-1">
                {getRatingStars(Math.round(parseFloat(averageRating)))}
              </div>
              <div className="text-sm text-gray-600">Note moyenne</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{totalReviews}</div>
              <div className="text-sm text-gray-600">Total avis</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{recommendationRate}%</div>
              <div className="text-sm text-gray-600">Recommandent</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {reviews.reduce((sum, r) => sum + r.likes, 0)}
              </div>
              <div className="text-sm text-gray-600">Total likes</div>
            </div>
          </div>

          {/* Distribution des notes */}
          <div className="space-y-2">
            <h4 className="font-semibold">Distribution des notes</h4>
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 w-12 text-right">
                  {count} ({percentage}%)
                </div>
              </div>
            ))}
          </div>

          {/* Filtres et recherche */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher dans les avis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Note" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="5">5 étoiles</SelectItem>
                  <SelectItem value="4">4 étoiles</SelectItem>
                  <SelectItem value="3">3 étoiles</SelectItem>
                  <SelectItem value="2">2 étoiles</SelectItem>
                  <SelectItem value="1">1 étoile</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterRecommendation} onValueChange={setFilterRecommendation}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Recommandation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="yes">Recommandent</SelectItem>
                  <SelectItem value="no">Ne recommandent pas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Liste des avis */}
          <div className="space-y-4">
            {paginatedReviews.length === 0 ? (
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Aucun avis trouvé
                </h3>
                <p className="text-gray-500">
                  Aucun avis ne correspond à vos critères de recherche.
                </p>
              </div>
            ) : (
              paginatedReviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.author.avatar} alt={review.author.name} />
                      <AvatarFallback>
                        {review.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{review.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-600">{review.author.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {review.author.role}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {getRatingStars(review.rating)}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mt-2">{review.content}</p>
                      
                      {review.pros && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-green-700">Points positifs :</p>
                          <p className="text-sm text-gray-600">{review.pros}</p>
                        </div>
                      )}
                      
                      {review.cons && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-red-700">Points à améliorer :</p>
                          <p className="text-sm text-gray-600">{review.cons}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(review.date)}</span>
                          </div>
                          {canInteract && (
                            <div className="flex items-center space-x-1">
                              {review.wouldRecommend ? (
                                <ThumbsUp className="h-4 w-4 text-green-500" />
                              ) : (
                                <ThumbsDown className="h-4 w-4 text-red-500" />
                              )}
                              <span className={review.wouldRecommend ? 'text-green-600' : 'text-red-600'}>
                                {review.wouldRecommend ? 'Recommande' : 'Ne recommande pas'}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-3 text-sm">
                          <button
                            onClick={() => canInteract && handleLikeReview(review.id)}
                            disabled={!canInteract}
                            className={`flex items-center space-x-1 px-2 py-1 rounded-full transition-colors ${
                              !canInteract 
                                ? 'opacity-50 cursor-not-allowed text-gray-400'
                                : likedReviews.has(review.id)
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'hover:bg-gray-100 text-gray-500'
                            }`}
                          >
                            <ThumbsUp className={`h-4 w-4 ${!canInteract ? 'text-gray-400' : likedReviews.has(review.id) ? 'text-blue-600' : 'text-gray-500'}`} />
                            <span className="font-medium">
                              {getReviewLikes(review.id, review.likes)}
                            </span>
                          </button>
                          
                          <button
                            onClick={() => canInteract && handleShowReplyForm(review.id)}
                            disabled={!canInteract}
                            className={`flex items-center space-x-1 px-2 py-1 rounded-full transition-colors ${
                              !canInteract 
                                ? 'opacity-50 cursor-not-allowed text-gray-400'
                                : 'hover:bg-gray-100 text-gray-500'
                            }`}
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span className="font-medium">{review.replies}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Formulaire de réponse */}
                  {showReplyForm[review.id] && canInteract && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Votre réponse
                          </label>
                          <textarea
                            value={replies[review.id] || ''}
                            onChange={(e) => handleReplyChange(review.id, e.target.value)}
                            placeholder="Écrivez votre réponse..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={3}
                            maxLength={500}
                          />
                          <div className="text-right text-xs text-gray-500 mt-1">
                            {(replies[review.id] || '').length}/500 caractères
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShowReplyForm(review.id)}
                          >
                            Annuler
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSubmitReply(review.id)}
                            disabled={!replies[review.id] || !replies[review.id].trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Envoyer
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Affichage de {startIndex + 1} à {Math.min(startIndex + reviewsPerPage, filteredReviews.length)} sur {filteredReviews.length} avis
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewsModal;
