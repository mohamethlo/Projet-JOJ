export interface PublicReview {
  id: string;
  targetId: string;
  targetType: 'guide' | 'event' | 'accommodation';
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

// Mock data pour les avis des guides
export const mockGuideReviews: PublicReview[] = [
  {
    id: '1',
    targetId: '1',
    targetType: 'guide',
    author: {
      name: 'Jean Dupont',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Touriste'
    },
    rating: 5,
    title: 'Guide exceptionnel !',
    content: 'Amadou est un guide fantastique. Il connaît parfaitement l\'histoire de Dakar et sait la rendre passionnante. Très professionnel et à l\'écoute.',
    pros: 'Connaissances approfondies, très professionnel',
    cons: 'Aucun',
    wouldRecommend: true,
    date: '2024-03-15',
    likes: 12,
    replies: 2
  },
  {
    id: '2',
    targetId: '1',
    targetType: 'guide',
    author: {
      name: 'Maria Garcia',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Touriste'
    },
    rating: 5,
    title: 'Visite inoubliable',
    content: 'Grâce à Amadou, j\'ai découvert des aspects de la culture sénégalaise que je n\'aurais jamais connus. Il parle parfaitement français et anglais.',
    pros: 'Multilingue, culture riche',
    cons: 'Aucun',
    wouldRecommend: true,
    date: '2024-03-10',
    likes: 8,
    replies: 1
  },
  {
    id: '3',
    targetId: '2',
    targetType: 'guide',
    author: {
      name: 'Kenji Tanaka',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Touriste'
    },
    rating: 4,
    title: 'Bonne expérience nature',
    content: 'Fatou nous a emmenés dans des endroits magnifiques. Elle connaît très bien la faune et la flore locale.',
    pros: 'Connaissances nature, endroits magnifiques',
    cons: 'Parfois un peu rapide',
    wouldRecommend: true,
    date: '2024-03-08',
    likes: 5,
    replies: 0
  }
];

// Mock data pour les avis des événements
export const mockEventReviews: PublicReview[] = [
  {
    id: '4',
    targetId: '1',
    targetType: 'event',
    author: {
      name: 'Sophie Martin',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Touriste'
    },
    rating: 5,
    title: 'Match fantastique !',
    content: 'Le match était incroyable, l\'ambiance au stade était électrisante. Les Lions ont bien joué !',
    pros: 'Ambiance géniale, match de qualité',
    cons: 'Aucun',
    wouldRecommend: true,
    date: '2024-04-26',
    likes: 25,
    replies: 5
  },
  {
    id: 'event-review-5',
    targetId: '1',
    targetType: 'event',
    author: {
      name: 'Ahmed Kone',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Touriste'
    },
    rating: 4,
    title: 'Bonne expérience',
    content: 'Très bon match, bien organisé. Seul bémol : les files d\'attente pour les rafraîchissements.',
    pros: 'Bien organisé, match intéressant',
    cons: 'Files d\'attente longues',
    wouldRecommend: true,
    date: '2024-04-25',
    likes: 12,
    replies: 2
  },
  {
    id: 'event-review-6',
    targetId: '2',
    targetType: 'event',
    author: {
      name: 'Moussa Diop',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Touriste'
    },
    rating: 5,
    title: 'Tournoi de lutte exceptionnel',
    content: 'Un spectacle incroyable ! La tradition et la passion étaient au rendez-vous. À revoir sans hésitation.',
    pros: 'Tradition respectée, ambiance unique',
    cons: 'Aucun',
    wouldRecommend: true,
    date: '2024-04-29',
    likes: 18,
    replies: 4
  },
  {
    id: 'event-review-7',
    targetId: '7',
    targetType: 'event',
    author: {
      name: 'Claire Dubois',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Touriste'
    },
    rating: 5,
    title: 'Festival magnifique !',
    content: 'Le Festival de Jazz de Saint-Louis était incroyable. L\'ambiance était fantastique et les artistes de qualité.',
    pros: 'Artistes de qualité, ambiance géniale',
    cons: 'Un peu cher',
    wouldRecommend: true,
    date: '2024-04-16',
    likes: 15,
    replies: 3
  },
  {
    id: 'event-review-8',
    targetId: '8',
    targetType: 'event',
    author: {
      name: 'Ibrahima Ba',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Touriste'
    },
    rating: 4,
    title: 'Foire intéressante',
    content: 'Beaucoup de produits locaux à découvrir. Bien organisé mais un peu de monde.',
    pros: 'Produits locaux variés',
    cons: 'Beaucoup de monde',
    wouldRecommend: true,
    date: '2024-04-21',
    likes: 8,
    replies: 1
  }
];

// Mock data pour les avis des hébergements
export const mockAccommodationReviews: PublicReview[] = [
  {
    id: 'acc-review-5',
    targetId: '1',
    targetType: 'accommodation',
    author: {
      name: 'Pierre Dubois',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Touriste'
    },
    rating: 4,
    title: 'Hôtel confortable',
    content: 'Bon hôtel avec un bon rapport qualité-prix. Le personnel est accueillant et l\'emplacement est pratique.',
    pros: 'Bon rapport qualité-prix, personnel accueillant',
    cons: 'WiFi parfois lent',
    wouldRecommend: true,
    date: '2024-03-12',
    likes: 7,
    replies: 1
  }
];

// Fonctions utilitaires pour récupérer les avis
export const getGuideReviews = (guideId: string): PublicReview[] => {
  return mockGuideReviews.filter(review => review.targetId === guideId);
};

export const getEventReviews = (eventId: string): PublicReview[] => {
  return mockEventReviews.filter(review => review.targetId === eventId);
};

export const getAccommodationReviews = (accommodationId: string): PublicReview[] => {
  return mockAccommodationReviews.filter(review => review.targetId === accommodationId);
};

// Fonction pour obtenir les statistiques des avis
export const getReviewStats = (targetId: string, targetType: 'guide' | 'event' | 'accommodation') => {
  let reviews: PublicReview[] = [];
  
  if (targetType === 'guide') {
    reviews = getGuideReviews(targetId);
  } else if (targetType === 'event') {
    reviews = getEventReviews(targetId);
  } else if (targetType === 'accommodation') {
    reviews = getAccommodationReviews(targetId);
  }

  if (reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  const ratingDistribution = reviews.reduce((dist, review) => {
    dist[review.rating as keyof typeof dist]++;
    return dist;
  }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  return {
    averageRating,
    totalReviews: reviews.length,
    ratingDistribution
  };
};

// Fonction pour obtenir les avis récents
export const getRecentReviews = (targetId: string, targetType: 'guide' | 'event' | 'accommodation', limit: number = 3): PublicReview[] => {
  let reviews: PublicReview[] = [];
  
  if (targetType === 'guide') {
    reviews = getGuideReviews(targetId);
  } else if (targetType === 'event') {
    reviews = getEventReviews(targetId);
  } else if (targetType === 'accommodation') {
    reviews = getAccommodationReviews(targetId);
  }

  return reviews
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};
