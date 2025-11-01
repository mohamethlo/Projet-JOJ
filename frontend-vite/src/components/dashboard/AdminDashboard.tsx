import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  Star, 
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Shield,
  BarChart3,
  Settings,
  Eye,
  Ban,
  UserCheck,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminDashboardProps {
  user: any;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const mockAdminStats = {
    totalUsers: 12847,
    newUsersThisMonth: 180,
    pendingGuides: 23,
    totalBookings: 1264,
    bookingsThisWeek: 95,
    reports: 3,
    activeEvents: 45,
    totalRevenue: '15,250,000 FCFA'
  };

  const mockRecentActivity = [
    {
      id: '1',
      type: 'user_registration',
      message: 'Nouvel utilisateur inscrit : Amadou Diallo',
      time: 'Il y a 2h',
      status: 'success'
    },
    {
      id: '2',
      type: 'guide_validation',
      message: 'Guide validé : Fatou Sarr',
      time: 'Il y a 4h',
      status: 'success'
    },
    {
      id: '3',
      type: 'report',
      message: 'Signalement utilisateur reçu',
      time: 'Il y a 6h',
      status: 'warning'
    },
    {
      id: '4',
      type: 'event_created',
      message: 'Événement créé : Festival de Jazz',
      time: 'Il y a 8h',
      status: 'info'
    }
  ];

  const mockPendingActions = [
    {
      id: '1',
      type: 'guide_validation',
      title: 'Validation de guides',
      count: 23,
      description: 'Guides en attente de validation',
      priority: 'high'
    },
    {
      id: '2',
      type: 'content_moderation',
      title: 'Modération de contenu',
      count: 7,
      description: 'Contenus signalés à modérer',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'user_reports',
      title: 'Signalements utilisateurs',
      count: 3,
      description: 'Signalements à traiter',
      priority: 'high'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">Bonjour, {user.name}! 👋</h2>
          <p className="opacity-90">Gérez la plateforme DiscoverSenegal et supervisez l'activité</p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdminStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{mockAdminStats.newUsersThisMonth} ce mois</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guides en attente</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdminStats.pendingGuides}</div>
            <p className="text-xs text-muted-foreground">À valider</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdminStats.totalBookings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{mockAdminStats.bookingsThisWeek} cette semaine</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Signalements</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdminStats.reports}</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-blue-500" />
              Statistiques Plateforme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Événements actifs</span>
                <span className="font-semibold">{mockAdminStats.activeEvents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Revenus total</span>
                <span className="font-semibold">{mockAdminStats.totalRevenue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Taux de satisfaction</span>
                <span className="font-semibold text-green-600">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Taux de conversion</span>
                <span className="font-semibold text-blue-600">12.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-green-500" />
              Sécurité & Modération
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Utilisateurs bannis</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Contenus modérés</span>
                <span className="font-semibold">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Guides suspendus</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Événements supprimés</span>
                <span className="font-semibold">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
              Croissance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Nouveaux utilisateurs</span>
                  <span className="text-sm text-gray-600">+15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Réservations</span>
                  <span className="text-sm text-gray-600">+8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Revenus</span>
                  <span className="text-sm text-gray-600">+22%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
            Actions en attente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockPendingActions.map((action) => (
              <div key={action.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{action.title}</h4>
                  <Badge 
                    variant={action.priority === 'high' ? 'destructive' : 'secondary'}
                  >
                    {action.count}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-1" />
                  Voir détails
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Activité récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-orange-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/admin/validation">
              <Button variant="outline" className="w-full justify-start">
                <UserCheck className="mr-2 h-4 w-4" />
                Valider les guides ({mockAdminStats.pendingGuides})
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/admin/moderation">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Modérer les contenus
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/admin/statistics">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Voir les statistiques
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/admin-articles.html">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Gestion des articles
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres système
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outils d'administration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Ban className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium">Gestion des utilisateurs</p>
                    <p className="text-xs text-gray-600">Suspendre, bannir, valider</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Analytics avancées</p>
                    <p className="text-xs text-gray-600">Rapports détaillés</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Configuration</p>
                    <p className="text-xs text-gray-600">Paramètres de la plateforme</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default AdminDashboard;
