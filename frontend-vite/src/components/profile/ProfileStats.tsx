import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Star, 
  Users, 
  Clock, 
  Award,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

interface ProfileStatsProps {
  stats: {
    totalBookings: number;
    totalReviews: number;
    averageRating: number;
    totalMatches: number;
    responseTime: string;
    completionRate: number;
  };
  role: string;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ stats, role }) => {
  const getStatsForRole = (role: string) => {
    switch (role) {
      case 'guide':
        return [
          {
            label: 'Visites guidées',
            value: stats.totalBookings,
            icon: <Calendar className="h-4 w-4" />,
            color: 'text-blue-600'
          },
          {
            label: 'Avis reçus',
            value: stats.totalReviews,
            icon: <MessageSquare className="h-4 w-4" />,
            color: 'text-green-600'
          },
          {
            label: 'Note moyenne',
            value: stats.averageRating,
            icon: <Star className="h-4 w-4" />,
            color: 'text-yellow-600'
          },
          {
            label: 'Taux de réussite',
            value: `${stats.completionRate}%`,
            icon: <TrendingUp className="h-4 w-4" />,
            color: 'text-purple-600'
          }
        ];
      case 'organizer':
        return [
          {
            label: 'Événements créés',
            value: stats.totalBookings,
            icon: <Calendar className="h-4 w-4" />,
            color: 'text-blue-600'
          },
          {
            label: 'Participants',
            value: stats.totalMatches,
            icon: <Users className="h-4 w-4" />,
            color: 'text-green-600'
          },
          {
            label: 'Avis reçus',
            value: stats.totalReviews,
            icon: <MessageSquare className="h-4 w-4" />,
            color: 'text-yellow-600'
          },
          {
            label: 'Note moyenne',
            value: stats.averageRating,
            icon: <Star className="h-4 w-4" />,
            color: 'text-purple-600'
          }
        ];
      case 'admin':
        return [
          {
            label: 'Utilisateurs gérés',
            value: stats.totalMatches,
            icon: <Users className="h-4 w-4" />,
            color: 'text-blue-600'
          },
          {
            label: 'Actions effectuées',
            value: stats.totalBookings,
            icon: <Award className="h-4 w-4" />,
            color: 'text-green-600'
          },
          {
            label: 'Temps de réponse',
            value: stats.responseTime,
            icon: <Clock className="h-4 w-4" />,
            color: 'text-yellow-600'
          },
          {
            label: 'Efficacité',
            value: `${stats.completionRate}%`,
            icon: <TrendingUp className="h-4 w-4" />,
            color: 'text-purple-600'
          }
        ];
      default: // tourist, local
        return [
          {
            label: 'Réservations',
            value: stats.totalBookings,
            icon: <Calendar className="h-4 w-4" />,
            color: 'text-blue-600'
          },
          {
            label: 'Avis donnés',
            value: stats.totalReviews,
            icon: <MessageSquare className="h-4 w-4" />,
            color: 'text-green-600'
          },
          {
            label: 'Jumelages',
            value: stats.totalMatches,
            icon: <Users className="h-4 w-4" />,
            color: 'text-yellow-600'
          },
          {
            label: 'Note moyenne',
            value: stats.averageRating,
            icon: <Star className="h-4 w-4" />,
            color: 'text-purple-600'
          }
        ];
    }
  };

  const roleStats = getStatsForRole(role);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Statistiques
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {roleStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="flex items-center justify-center text-sm text-gray-600">
                {stat.icon}
                <span className="ml-1">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileStats;
