import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  MapPin, 
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Eye,
  Ban,
  FileText,
  Camera,
  Flag
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SecurityDashboardProps {
  user: any;
}

const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ user }) => {
  const mockSecurityStats = {
    totalReports: 12,
    activeReports: 3,
    resolvedReports: 9,
    totalUsers: 12847,
    bannedUsers: 5,
    suspiciousActivities: 2,
    responseTime: '30min',
    patrolAreas: 8
  };

  const mockRecentReports = [
    {
      id: '1',
      type: 'Comportement suspect',
      location: 'Place de l\'Indépendance',
      reporter: 'Amadou Diallo',
      date: '10/04/2024 14:30',
      status: 'En cours',
      priority: 'high',
      description: 'Personne agissant de manière suspecte près du monument'
    },
    {
      id: '2',
      type: 'Objet trouvé',
      location: 'Marché Sandaga',
      reporter: 'Fatou Sarr',
      date: '09/04/2024 10:15',
      status: 'Résolu',
      priority: 'medium',
      description: 'Sac à main trouvé près de l\'entrée principale'
    },
    {
      id: '3',
      type: 'Incident de sécurité',
      location: 'Gare routière',
      reporter: 'Moussa Ba',
      date: '08/04/2024 16:45',
      status: 'En attente',
      priority: 'high',
      description: 'Altercation entre deux personnes'
    }
  ];

  const mockPatrolAreas = [
    {
      id: '1',
      name: 'Centre-ville Dakar',
      status: 'Patrouillé',
      lastCheck: 'Il y a 2h',
      incidents: 0
    },
    {
      id: '2',
      name: 'Marché Sandaga',
      status: 'En cours',
      lastCheck: 'Il y a 30min',
      incidents: 1
    },
    {
      id: '3',
      name: 'Plage de Yoff',
      status: 'Patrouillé',
      lastCheck: 'Il y a 1h',
      incidents: 0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">Bonjour, {user.name}! 👋</h2>
          <p className="opacity-90">Assurez la sécurité et la tranquillité sur la plateforme</p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Signalements actifs</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSecurityStats.activeReports}</div>
            <p className="text-xs text-muted-foreground">+1 cette semaine</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Signalements résolus</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSecurityStats.resolvedReports}</div>
            <p className="text-xs text-muted-foreground">75% de résolution</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs bannis</CardTitle>
            <Ban className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSecurityStats.bannedUsers}</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps de réponse</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSecurityStats.responseTime}</div>
            <p className="text-xs text-muted-foreground">Moyenne</p>
          </CardContent>
        </Card>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-blue-500" />
              Surveillance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Zones surveillées</span>
                  <span className="text-sm text-gray-600">8/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Taux de résolution</span>
                  <span className="text-sm text-gray-600">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Réactivité</span>
                  <span className="text-sm text-gray-600">30min</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-green-500" />
              Zones de patrouille
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPatrolAreas.map((area) => (
                <div key={area.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{area.name}</p>
                    <p className="text-xs text-gray-600">{area.lastCheck}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={area.status === 'Patrouillé' ? 'default' : 'secondary'}
                    >
                      {area.status}
                    </Badge>
                    <p className="text-xs text-gray-500">{area.incidents} incident(s)</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
              Statistiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Signalements total</span>
                <span className="font-semibold">{mockSecurityStats.totalReports}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Activités suspectes</span>
                <span className="font-semibold">{mockSecurityStats.suspiciousActivities}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Zones de patrouille</span>
                <span className="font-semibold">{mockSecurityStats.patrolAreas}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Utilisateurs surveillés</span>
                <span className="font-semibold">{mockSecurityStats.totalUsers.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Signalements récents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    report.priority === 'high' ? 'bg-red-100' : 'bg-orange-100'
                  }`}>
                    <AlertTriangle className={`h-5 w-5 ${
                      report.priority === 'high' ? 'text-red-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.type}</h4>
                    <p className="text-sm text-gray-600">{report.location}</p>
                    <p className="text-xs text-gray-500">Par {report.reporter} • {report.date}</p>
                    <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={
                      report.status === 'Résolu' 
                        ? 'default' 
                        : report.status === 'En cours' 
                        ? 'secondary' 
                        : 'outline'
                    }
                  >
                    {report.status}
                  </Badge>
                  {report.status !== 'Résolu' && (
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Traiter
                    </Button>
                  )}
                </div>
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
            <Link to="/security/scanner">
              <Button className="w-full justify-start">
                <Eye className="mr-2 h-4 w-4" />
                Scanner QR
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/security/reports">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Gérer les signalements
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/signaler">
              <Button variant="outline" className="w-full justify-start">
                <Flag className="mr-2 h-4 w-4" />
                Signaler/Commenter
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/security/patrol">
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Planifier patrouille
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/security/cameras">
              <Button variant="outline" className="w-full justify-start">
                <Camera className="mr-2 h-4 w-4" />
                Surveillance caméras
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertes en temps réel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Alerte priorité haute</p>
                  <p className="text-xs text-gray-600">Incident signalé à la gare routière</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Patrouille terminée</p>
                  <p className="text-xs text-gray-600">Zone centre-ville sécurisée</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Signalement résolu</p>
                  <p className="text-xs text-gray-600">Objet trouvé récupéré</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityDashboard;
