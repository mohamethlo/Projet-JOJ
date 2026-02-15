import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Star,
  ArrowLeft,
  User,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ReviewsPage: React.FC = () => {
  const reviews = [
    {
      id: '1',
      guestName: 'Jean Dupont',
      rating: 5,
      date: '15 Avril 2024',
      comment: 'Excellent séjour ! L\'hôtel est magnifique, le personnel est très accueillant et les chambres sont très confortables. Je recommande vivement !',
      stay: 'Chambre Double - 3 nuits'
    },
    {
      id: '2',
      guestName: 'Maria Garcia',
      rating: 4,
      date: '12 Avril 2024',
      comment: 'Très bon établissement avec un excellent rapport qualité-prix. Le petit-déjeuner était délicieux.',
      stay: 'Suite Deluxe - 2 nuits'
    },
    {
      id: '3',
      guestName: 'Ahmed Diallo',
      rating: 5,
      date: '10 Avril 2024',
      comment: 'La Teranga à son meilleur ! Accueil chaleureux, service impeccable. Je reviendrai certainement.',
      stay: 'Réservation Table'
    },
    {
      id: '4',
      guestName: 'Sophie Martin',
      rating: 4,
      date: '8 Avril 2024',
      comment: 'Bel établissement, bien situé. Seul petit bémol : la connexion WiFi un peu lente.',
      stay: 'Chambre Simple - 2 nuits'
    }
  ];

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Avis Clients</h1>
        <p className="text-gray-600 mt-1">Consultez les avis et retours de vos clients</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.round(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">Basé sur {reviews.length} avis</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Répartition des notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = ratingDistribution[rating as keyof typeof ratingDistribution];
              const percentage = (count / reviews.length) * 100;
              return (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm w-8">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Statistiques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total avis</span>
              <span className="font-semibold">{reviews.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">5 étoiles</span>
              <span className="font-semibold text-emerald-600">{ratingDistribution[5]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">4 étoiles</span>
              <span className="font-semibold text-blue-600">{ratingDistribution[4]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Taux de satisfaction</span>
              <span className="font-semibold text-emerald-600">
                {((ratingDistribution[5] + ratingDistribution[4]) / reviews.length * 100).toFixed(0)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{review.guestName}</h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {review.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                  <Badge variant="outline" className="mb-3">{review.stay}</Badge>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;

