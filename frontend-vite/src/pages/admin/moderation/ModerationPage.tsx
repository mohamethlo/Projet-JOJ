import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Shield,
  MessageSquare,
  Flag,
  User,
  Eye,
  CheckCircle,
  X,
  AlertTriangle,
  Clock,
  MoreVertical,
  Calendar,
  Star
} from 'lucide-react';
import { ReportDetailsModal, CommentModerationModal, UserManagementModal } from '@/components/modals';

const ModerationPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [activeTab, setActiveTab] = useState('reports');
  
  // États pour les modales
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Fonctions de gestion des actions
  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };

  const handleViewComment = (comment: any) => {
    setSelectedComment(comment);
    setIsCommentModalOpen(true);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleReportAction = (reportId: string, action: string, comment?: string) => {
    console.log(`Action sur signalement ${reportId}:`, action, comment);
    // Ici vous pouvez ajouter la logique pour traiter l'action
    alert(`Signalement ${reportId} ${action}${comment ? ` avec commentaire: ${comment}` : ''}`);
  };

  const handleCommentAction = (commentId: string, action: string, comment?: string) => {
    console.log(`Action sur commentaire ${commentId}:`, action, comment);
    // Ici vous pouvez ajouter la logique pour traiter l'action
    alert(`Commentaire ${commentId} ${action}${comment ? ` avec commentaire: ${comment}` : ''}`);
  };

  const handleUserAction = (userId: string, action: string, data?: any) => {
    console.log(`Action sur utilisateur ${userId}:`, action, data);
    // Ici vous pouvez ajouter la logique pour traiter l'action
    alert(`Utilisateur ${userId} ${action}${data ? `: ${JSON.stringify(data)}` : ''}`);
  };

  // Vérifier que l'utilisateur est admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Accès refusé</h2>
          <p className="text-gray-600">Vous devez être administrateur pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  // Données mock pour la démonstration
  const mockReports = [
    {
      id: '1',
      type: 'Contenu inapproprié',
      reporter: 'Marie Dubois',
      reporterStatus: 'Actif',
      reporterRole: 'tourist',
      reportedUser: 'Jean Dupont',
      reportedUserStatus: 'Suspendu',
      reportedUserRole: 'tourist',
      content: 'Commentaire offensant sur un guide',
      status: 'En attente',
      date: '2024-01-15',
      priority: 'Haute'
    },
    {
      id: '2',
      type: 'Spam',
      reporter: 'Ahmed Fall',
      reporterStatus: 'Actif',
      reporterRole: 'guide',
      reportedUser: 'SpamBot123',
      reportedUserStatus: 'Banni',
      reportedUserRole: 'tourist',
      content: 'Messages répétitifs de promotion',
      status: 'Traité',
      date: '2024-01-14',
      priority: 'Moyenne'
    }
  ];

  const mockPendingComments = [
    {
      id: 'pending-1',
      author: 'Marie Dubois',
      authorStatus: 'Actif',
      authorRole: 'tourist',
      authorEmail: 'marie.dubois@email.com',
      category: 'Suggestion d\'amélioration',
      targetType: 'Guide',
      targetName: 'Amadou Fall',
      title: 'Excellent guide, mais amélioration possible',
      content: 'Amadou est un guide fantastique avec une excellente connaissance de l\'histoire de Dakar. Je recommande vivement ses visites. Une seule suggestion : il pourrait améliorer la gestion du temps pour éviter les retards.',
      rating: '4',
      isPublic: true,
      allowReplies: true,
      status: 'pending',
      date: '2024-01-16',
      submittedAt: '2024-01-16T10:30:00Z'
    }
  ];

  const mockComments = [
    {
      id: '1',
      author: 'Jean Dupont',
      authorStatus: 'Suspendu',
      authorRole: 'tourist',
      content: 'Ce guide est nul, je ne recommande pas du tout !',
      reported: true,
      status: 'En attente',
      date: '2024-01-15',
      likes: 0,
      dislikes: 5,
      context: 'Avis sur Guide Amadou Fall'
    }
  ];

  const mockUsers = [
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      role: 'tourist',
      status: 'Actif',
      reports: 3,
      joinDate: '2024-01-01',
      lastActivity: '2024-01-15',
      violations: ['Contenu inapproprié', 'Harcèlement']
    }
  ];

  const types = ['Tous', 'Contenu inapproprié', 'Spam', 'Fausse information', 'Harcèlement'];
  const statuses = ['Tous', 'En attente', 'Traité', 'Rejeté'];
  const commentStatuses = ['Tous', 'En attente', 'Modéré', 'Supprimé'];
  const userStatuses = ['Tous', 'Actif', 'Suspendu', 'Banni', 'En attente'];

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedType || selectedType === 'Tous' || report.type === selectedType;
    const matchesStatus = !selectedStatus || selectedStatus === 'Tous' || report.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const filteredComments = mockComments.filter(comment => {
    const matchesSearch = comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.context.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !selectedStatus || selectedStatus === 'Tous' || comment.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !selectedStatus || selectedStatus === 'Tous' || user.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Traité':
      case 'Modéré':
        return 'bg-green-100 text-green-700';
      case 'Rejeté':
      case 'Supprimé':
        return 'bg-red-100 text-red-700';
      case 'Actif':
        return 'bg-green-100 text-green-700';
      case 'Suspendu':
        return 'bg-orange-100 text-orange-700';
      case 'Banni':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute':
        return 'bg-red-100 text-red-700';
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-700';
      case 'Basse':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'guide':
        return <User className="h-4 w-4" />;
      case 'tourist':
        return <User className="h-4 w-4" />;
      case 'organizer':
        return <Calendar className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'guide':
        return 'bg-blue-100 text-blue-700';
      case 'tourist':
        return 'bg-green-100 text-green-700';
      case 'organizer':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Modération</h1>
              <p className="text-gray-600 mt-1">Gérez les signalements et modérez le contenu de la plateforme</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-700 text-sm">
                {filteredReports.length} signalement(s)
              </Badge>
            </div>
          </div>

          {/* Onglets */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="reports" className="flex items-center space-x-2">
                <Flag className="h-4 w-4" />
                <span>Signalements</span>
              </TabsTrigger>
              <TabsTrigger value="pending-comments" className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>En attente</span>
                <Badge className="bg-orange-100 text-orange-700 text-xs ml-1">
                  {mockPendingComments.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Commentaires</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Utilisateurs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="space-y-6">
              {/* Barre de recherche et filtres */}
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Rechercher un signalement..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-12 text-lg"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {types.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Liste des signalements */}
              {filteredReports.length > 0 ? (
                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <Card key={report.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <Badge className={getPriorityColor(report.priority)}>
                                {report.priority}
                              </Badge>
                              <Badge className={getStatusColor(report.status)}>
                                {report.status}
                              </Badge>
                              <span className="text-sm text-gray-500">{report.date}</span>
                            </div>
                            
                            <h3 className="font-semibold text-lg mb-2">{report.type}</h3>
                            <p className="text-gray-600 mb-3">{report.content}</p>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Signalé par:</span> {report.reporter}
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge className={getStatusColor(report.reporterStatus)}>
                                    {report.reporterStatus}
                                  </Badge>
                                  <Badge className={getRoleColor(report.reporterRole)}>
                                    {getRoleIcon(report.reporterRole)}
                                    <span className="ml-1 capitalize">{report.reporterRole}</span>
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <span className="font-medium">Utilisateur signalé:</span> {report.reportedUser}
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge className={getStatusColor(report.reportedUserStatus)}>
                                    {report.reportedUserStatus}
                                  </Badge>
                                  <Badge className={getRoleColor(report.reportedUserRole)}>
                                    {getRoleIcon(report.reportedUserRole)}
                                    <span className="ml-1 capitalize">{report.reportedUserRole}</span>
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewReport(report)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewReport(report)}
                              title="Actions rapides"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <div className="text-gray-500">
                    <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">Aucun signalement trouvé</h3>
                    <p>Aucun signalement ne correspond à vos critères de recherche.</p>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="pending-comments" className="space-y-6">
              {/* Header pour les commentaires en attente */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Commentaires en attente de modération</h2>
                  <p className="text-gray-600 mt-1">Validez ou rejetez les commentaires publics soumis par les utilisateurs</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-orange-100 text-orange-700 text-sm">
                    {mockPendingComments.length} en attente
                  </Badge>
                </div>
              </div>

              {/* Liste des commentaires en attente */}
              {mockPendingComments.length > 0 ? (
                <div className="space-y-4">
                  {mockPendingComments.map((comment) => (
                    <Card key={comment.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <Badge className={getStatusColor(comment.authorStatus)}>
                                {comment.authorStatus}
                              </Badge>
                              <Badge className={getRoleColor(comment.authorRole)}>
                                {getRoleIcon(comment.authorRole)}
                                <span className="ml-1 capitalize">{comment.authorRole}</span>
                              </Badge>
                              <Badge variant="outline" className="text-orange-600 border-orange-200">
                                {comment.category}
                              </Badge>
                              <span className="text-sm text-gray-500">{comment.date}</span>
                            </div>
                            
                            <div className="mb-4">
                              <h3 className="font-semibold text-lg mb-2">{comment.title}</h3>
                              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                                <div>
                                  <span className="font-medium">Auteur:</span> {comment.author}
                                </div>
                                <div>
                                  <span className="font-medium">Concerne:</span> {comment.targetType} - {comment.targetName}
                                </div>
                              </div>
                              <p className="text-gray-800 bg-gray-50 p-4 rounded-lg mb-3">{comment.content}</p>
                              
                              {comment.rating && (
                                <div className="flex items-center space-x-2 text-sm">
                                  <span className="font-medium">Note:</span>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`h-4 w-4 ${i < parseInt(comment.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                    <span className="ml-2 text-gray-600">({comment.rating}/5)</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2 ml-4">
                            <Button 
                              className="bg-green-600 hover:bg-green-700 text-white"
                              size="sm"
                              onClick={() => handleCommentAction(comment.id, 'approve')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approuver
                            </Button>
                            <Button 
                              className="bg-yellow-600 hover:bg-yellow-700 text-white"
                              size="sm"
                              onClick={() => handleViewComment(comment)}
                            >
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Modérer
                            </Button>
                            <Button 
                              className="bg-red-600 hover:bg-red-700 text-white"
                              size="sm"
                              onClick={() => handleCommentAction(comment.id, 'reject')}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Rejeter
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <div className="text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">Aucun commentaire en attente</h3>
                    <p>Tous les commentaires ont été traités. Félicitations !</p>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="comments" className="space-y-6">
              {/* Barre de recherche et filtres pour commentaires */}
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Rechercher un commentaire..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-12 text-lg"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                          {commentStatuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Liste des commentaires */}
              {filteredComments.length > 0 ? (
                <div className="space-y-4">
                  {filteredComments.map((comment) => (
                    <Card key={comment.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <Badge className={getStatusColor(comment.status)}>
                                {comment.status}
                              </Badge>
                              <span className="text-sm text-gray-500">{comment.date}</span>
                            </div>
                            
                            <div className="mb-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-lg">{comment.author}</h3>
                                <Badge className={getStatusColor(comment.authorStatus)}>
                                  {comment.authorStatus}
                                </Badge>
                                <Badge className={getRoleColor(comment.authorRole)}>
                                  {getRoleIcon(comment.authorRole)}
                                  <span className="ml-1 capitalize">{comment.authorRole}</span>
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{comment.context}</p>
                              <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{comment.content}</p>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>👍 {comment.likes}</span>
                              <span>👎 {comment.dislikes}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewComment(comment)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewComment(comment)}
                              title="Actions rapides"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <div className="text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">Aucun commentaire trouvé</h3>
                    <p>Aucun commentaire ne correspond à vos critères de recherche.</p>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              {/* Barre de recherche et filtres pour utilisateurs */}
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Rechercher un utilisateur..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-12 text-lg"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                          {userStatuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Liste des utilisateurs */}
              {filteredUsers.length > 0 ? (
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <Badge className={getStatusColor(user.status)}>
                                {user.status}
                              </Badge>
                              <Badge className={getRoleColor(user.role)}>
                                {getRoleIcon(user.role)}
                                <span className="ml-1 capitalize">{user.role}</span>
                              </Badge>
                              <Badge variant="outline">
                                {user.reports} signalement(s)
                              </Badge>
                            </div>
                            
                            <div className="mb-3">
                              <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
                              <p className="text-gray-600 mb-2">{user.email}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Inscription:</span> {user.joinDate}
                              </div>
                              <div>
                                <span className="font-medium">Dernière activité:</span> {user.lastActivity}
                              </div>
                            </div>
                            
                            {user.violations.length > 0 && (
                              <div className="mt-3">
                                <span className="font-medium text-sm">Violations:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {user.violations.map((violation, index) => (
                                    <Badge key={index} variant="destructive" className="text-xs">
                                      {violation}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewUser(user)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewUser(user)}
                              title="Actions rapides"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <div className="text-gray-500">
                    <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">Aucun utilisateur trouvé</h3>
                    <p>Aucun utilisateur ne correspond à vos critères de recherche.</p>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modales */}
      {selectedReport && (
        <ReportDetailsModal
          isOpen={isReportModalOpen}
          onClose={() => {
            setIsReportModalOpen(false);
            setSelectedReport(null);
          }}
          report={selectedReport}
          onApprove={handleReportAction}
          onReject={handleReportAction}
          onBanUser={handleUserAction}
          onWarnUser={handleUserAction}
        />
      )}

      {selectedComment && (
        <CommentModerationModal
          isOpen={isCommentModalOpen}
          onClose={() => {
            setIsCommentModalOpen(false);
            setSelectedComment(null);
          }}
          comment={selectedComment}
          onApprove={handleCommentAction}
          onReject={handleCommentAction}
          onDelete={handleCommentAction}
          onBanUser={handleUserAction}
          onWarnUser={handleUserAction}
        />
      )}

      {selectedUser && (
        <UserManagementModal
          isOpen={isUserModalOpen}
          onClose={() => {
            setIsUserModalOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onUpdateRole={handleUserAction}
          onBanUser={handleUserAction}
          onUnbanUser={handleUserAction}
          onWarnUser={handleUserAction}
          onVerifyUser={handleUserAction}
          onDeleteUser={handleUserAction}
        />
      )}
    </div>
  );
};

export default ModerationPage;
