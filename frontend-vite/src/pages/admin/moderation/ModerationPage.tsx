import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Shield,
  Search,
  MessageSquare,
  Flag,
  CheckCircle,
  X,
  Eye,
  AlertTriangle,
  User,
  Clock,
  Star,
  Users,
  MapPin,
  Calendar
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

  return (
    <div className="min-h-screen bg-[#FFFDFB] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black flex items-center text-[#2D1B08] uppercase tracking-tighter">
                <div className="p-2 bg-[#F2A900]/10 text-[#F2A900] rounded-xl flex-shrink-0 mr-3">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <span>Signalements & Modération</span>
              </h1>
              <p className="text-[#5D4037]/80 mt-2 font-medium text-sm sm:text-base leading-relaxed max-w-2xl">
                Gérez les signalements des utilisateurs, modérez le contenu public et assurez la sécurité de la plateforme.
              </p>
            </div>
            <div className="flex items-center">
              <Badge className="bg-[#E11D48]/10 text-[#E11D48] border-none font-black uppercase text-xs tracking-tighter px-4 py-2 shadow-sm whitespace-nowrap">
                <AlertTriangle className="h-4 w-4 mr-2" />
                {filteredReports.filter(r => r.status === 'En attente').length} À traiter
              </Badge>
            </div>
          </div>

          {/* Onglets */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="relative w-full overflow-hidden bg-[#FFFDFB] border-b-2 border-[#EBE3D5]">
              <div className="overflow-x-auto scrollbar-none pb-2 -mb-2">
                <TabsList className="flex w-max min-w-full bg-transparent p-0 h-auto">
                  <TabsTrigger 
                    value="reports" 
                    className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 py-4 px-6 font-black uppercase tracking-tighter rounded-t-xl rounded-b-none border-b-4 border-transparent data-[state=active]:border-[#F2A900] data-[state=active]:bg-[#F2A900]/5 data-[state=active]:text-[#F2A900] text-[#5D4037]/60 hover:text-[#2D1B08] hover:bg-[#EBE3D5]/20 transition-all text-sm"
                  >
                    <Flag className="h-4 w-4" />
                    <span>Signalements</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pending-comments" 
                    className="flex-1 min-w-[170px] flex items-center justify-center space-x-2 py-4 px-6 font-black uppercase tracking-tighter rounded-t-xl rounded-b-none border-b-4 border-transparent data-[state=active]:border-[#F2A900] data-[state=active]:bg-[#F2A900]/5 data-[state=active]:text-[#F2A900] text-[#5D4037]/60 hover:text-[#2D1B08] hover:bg-[#EBE3D5]/20 transition-all text-sm"
                  >
                    <Clock className="h-4 w-4" />
                    <span>Avis en attente</span>
                    {mockPendingComments.length > 0 && (
                      <Badge className="ml-1.5 bg-[#E11D48] text-white border-none text-[10px] font-black h-5 w-5 flex items-center justify-center p-0 rounded-full shadow-sm">
                        {mockPendingComments.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="comments" 
                    className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 py-4 px-6 font-black uppercase tracking-tighter rounded-t-xl rounded-b-none border-b-4 border-transparent data-[state=active]:border-[#F2A900] data-[state=active]:bg-[#F2A900]/5 data-[state=active]:text-[#F2A900] text-[#5D4037]/60 hover:text-[#2D1B08] hover:bg-[#EBE3D5]/20 transition-all text-sm"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Avis publiés</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="users" 
                    className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 py-4 px-6 font-black uppercase tracking-tighter rounded-t-xl rounded-b-none border-b-4 border-transparent data-[state=active]:border-[#F2A900] data-[state=active]:bg-[#F2A900]/5 data-[state=active]:text-[#F2A900] text-[#5D4037]/60 hover:text-[#2D1B08] hover:bg-[#EBE3D5]/20 transition-all text-sm"
                  >
                    <Users className="h-4 w-4" />
                    <span>Utilisateurs</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="reports" className="space-y-6 mt-6 animate-in fade-in duration-500">
              {/* Filtres Signalements */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#EBE3D5] shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F2A900] h-4 w-4" />
                  <Input
                    placeholder="Rechercher (type, plaignant, accusé)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-gray-50/50 border-[#EBE3D5] focus:border-[#F2A900] focus:ring-[#F2A900] rounded-xl font-medium text-sm text-[#2D1B08]"
                  />
                </div>
                <div className="flex flex-row gap-3 sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="h-12 min-w-[160px] bg-gray-50/50 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl font-black uppercase text-xs tracking-tighter text-[#2D1B08]">
                      <SelectValue placeholder="Type de problème" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#EBE3D5] rounded-xl">
                      {types.map(type => (
                        <SelectItem key={type} value={type} className="uppercase font-bold text-[10px] text-[#5D4037] focus:bg-[#F2A900]/10 focus:text-[#2D1B08]">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="h-12 min-w-[140px] bg-gray-50/50 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl font-black uppercase text-xs tracking-tighter text-[#2D1B08]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#EBE3D5] rounded-xl">
                      {statuses.map(status => (
                        <SelectItem key={status} value={status} className="uppercase font-bold text-[10px] text-[#5D4037] focus:bg-[#F2A900]/10 focus:text-[#2D1B08]">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Liste des signalements */}
              {filteredReports.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {filteredReports.map((report) => (
                    <Card key={report.id} className="border-2 border-[#EBE3D5] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                      <CardContent className="p-0">
                        <div className="flex flex-col lg:flex-row h-full">
                          
                          {/* Indicateur de priorité (bordure gauche) */}
                          <div className={`h-1 lg:h-auto lg:w-2 flex-shrink-0 ${
                            report.priority === 'Haute' ? 'bg-[#E11D48]' : 
                            report.priority === 'Moyenne' ? 'bg-[#F2A900]' : 'bg-[#1B5E20]'
                          }`}></div>

                          <div className="p-4 sm:p-6 flex-1 flex flex-col lg:flex-row gap-6">
                            {/* Colonne Principale: Type et Message */}
                            <div className="flex-1 lg:min-w-0 flex flex-col justify-between">
                              <div>
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                  <Badge className={`font-black uppercase tracking-tighter text-[10px] border-none ${
                                    report.priority === 'Haute' ? 'bg-[#E11D48]/10 text-[#E11D48]' : 
                                    report.priority === 'Moyenne' ? 'bg-[#F2A900]/10 text-[#F2A900]' : 'bg-[#1B5E20]/10 text-[#1B5E20]'
                                  }`}>
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                    Priorité {report.priority}
                                  </Badge>
                                  <Badge className={`font-black uppercase tracking-tighter text-[10px] border-none ${
                                    report.status === 'En attente' ? 'bg-[#F2A900] text-white' : 
                                    report.status === 'Traité' ? 'bg-[#1B5E20]/10 text-[#1B5E20]' : 'bg-[#EBE3D5] text-[#5D4037]'
                                  }`}>
                                    {report.status}
                                  </Badge>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/50 lg:ml-auto flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(report.date).toLocaleDateString('fr-FR')}
                                  </span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-black text-[#2D1B08] uppercase tracking-tighter mb-3">
                                  {report.type}
                                </h3>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative">
                                  <div className="absolute top-0 left-4 -mt-2 bg-white px-2">
                                    <span className="text-[10px] font-black uppercase text-[#F2A900] tracking-widest">Description</span>
                                  </div>
                                  <p className="text-sm font-medium text-[#5D4037]/80 italic line-clamp-3">"{report.content}"</p>
                                </div>
                              </div>
                            </div>

                            {/* Colonne Secondaire: Acteurs */}
                            <div className="lg:w-72 flex-shrink-0 flex flex-col gap-3 justify-center">
                              {/* Plaignant */}
                              <div className="bg-[#FFFDFB] rounded-xl p-3 border-2 border-[#EBE3D5] flex items-center justify-between group-hover:border-[#F2A900]/30 transition-colors">
                                <div className="min-w-0 pr-2">
                                  <div className="text-[9px] font-black uppercase text-[#5D4037]/60 tracking-widest flex items-center mb-1">
                                    <Flag className="w-3 h-3 mr-1 text-blue-500" />
                                    Signalé par
                                  </div>
                                  <div className="font-bold text-[#2D1B08] text-sm truncate">{report.reporter}</div>
                                </div>
                                <Badge variant="outline" className="border-[#EBE3D5] text-[#5D4037] text-[9px] font-black uppercase px-2 h-6 flex-shrink-0">
                                  {report.reporterRole}
                                </Badge>
                              </div>

                              {/* Accusé */}
                              <div className="bg-red-50/50 rounded-xl p-3 border-2 border-red-100 flex items-center justify-between">
                                <div className="min-w-0 pr-2">
                                  <div className="text-[9px] font-black uppercase text-red-400 tracking-widest flex items-center mb-1">
                                    <Shield className="w-3 h-3 mr-1" />
                                    Cible
                                  </div>
                                  <div className="font-bold text-red-900 text-sm truncate">{report.reportedUser}</div>
                                </div>
                                <Badge variant="outline" className="border-red-200 text-red-700 text-[9px] font-black uppercase px-2 h-6 flex-shrink-0">
                                  {report.reportedUserRole}
                                </Badge>
                              </div>
                            </div>
                            
                            {/* Actions (Desktop) */}
                            <div className="hidden sm:flex flex-row lg:flex-col gap-2 justify-center lg:w-32 lg:pl-4 lg:border-l border-[#EBE3D5] pt-4 lg:pt-0 border-t lg:border-t-0">
                                <Button
                                  onClick={() => handleViewReport(report)}
                                  className="w-full bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black uppercase text-[10px] sm:text-xs tracking-tighter h-10 transition-colors"
                                >
                                  <Eye className="h-4 w-4 mr-1.5" />
                                  Examiner
                                </Button>
                                {report.status === 'En attente' && (
                                  <>
                                    <Button
                                      variant="outline"
                                      onClick={() => handleReportAction(report.id, 'dismiss')}
                                      className="w-full border-2 border-[#EBE3D5] text-[#5D4037] hover:bg-[#EBE3D5]/50 font-black uppercase text-[10px] sm:text-xs tracking-tighter h-10"
                                    >
                                      Ignorer
                                    </Button>
                                  </>
                                )}
                            </div>
                          </div>
                          
                          {/* Actions (Mobile) */}
                          <div className="sm:hidden grid grid-cols-2 gap-2 p-4 pt-0">
                             <Button
                                onClick={() => handleViewReport(report)}
                                className="w-full bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black uppercase text-[10px] tracking-tighter h-10"
                              >
                                <Eye className="h-4 w-4 mr-1.5" />
                                Examiner
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleReportAction(report.id, 'dismiss')}
                                disabled={report.status !== 'En attente'}
                                className="w-full border-2 border-[#EBE3D5] text-[#5D4037] hover:bg-[#EBE3D5]/50 font-black uppercase text-[10px] tracking-tighter h-10 disabled:opacity-50"
                              >
                                Ignorer
                              </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-2 border-dashed border-[#EBE3D5] bg-[#FFFDFB] p-8 sm:p-16 text-center rounded-[2rem]">
                  <div className="max-w-md mx-auto flex flex-col items-center">
                    <div className="w-20 h-20 bg-[#F2A900]/10 rounded-full flex items-center justify-center mb-6">
                      <Shield className="h-10 w-10 text-[#F2A900]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-[#2D1B08] mb-3">Aucun signalement</h3>
                    <p className="text-sm sm:text-base font-medium text-[#5D4037]/70 leading-relaxed">
                      La plateforme est saine. Aucun signalement ne correspond aux filtres actuels ou la file d'attente est vide.
                    </p>
                    {(searchTerm || selectedType || selectedStatus) && (
                       <Button 
                         variant="outline" 
                         onClick={() => {setSearchTerm(''); setSelectedType(''); setSelectedStatus('');}}
                         className="mt-6 border-2 border-[#EBE3D5] text-[#2D1B08] font-black uppercase text-xs tracking-tighter hover:bg-[#F2A900] hover:text-white transition-colors h-10 px-6"
                       >
                         Réinitialiser les filtres
                       </Button>
                    )}
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="pending-comments" className="space-y-6 animate-in fade-in duration-500">
              {/* Header pour les commentaires en attente */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#EBE3D5] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#2D1B08] tracking-tighter uppercase flex items-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-[#F2A900]" />
                    Commentaires en attente
                  </h2>
                  <p className="text-[#5D4037]/70 mt-1 text-sm font-medium">Validez ou rejetez les commentaires publics soumis par les utilisateurs</p>
                </div>
                <div className="flex items-center">
                  <Badge className="bg-[#F2A900]/10 text-[#F2A900] border-none font-black uppercase text-xs tracking-tighter px-4 py-2 shadow-sm whitespace-nowrap">
                    {mockPendingComments.length} en attente
                  </Badge>
                </div>
              </div>

              {/* Liste des commentaires en attente */}
              {mockPendingComments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {mockPendingComments.map((comment) => (
                    <Card key={comment.id} className="border-2 border-[#EBE3D5] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="flex flex-col lg:flex-row h-full">
                           {/* Highlight Ligne (bordure gauche) */}
                           <div className="h-1 lg:h-auto lg:w-2 flex-shrink-0 bg-[#F2A900]"></div>

                          <div className="p-4 sm:p-6 flex-1 flex flex-col lg:flex-row gap-6">
                            
                            {/* Colonne Principale: Info Auteur & Commentaire */}
                            <div className="flex-1 lg:min-w-0 flex flex-col">
                              {/* Meta Info */}
                              <div className="flex flex-wrap items-center gap-2 mb-4">
                                <Badge className={`font-black uppercase tracking-tighter text-[10px] border-none ${
                                  comment.authorStatus === 'Actif' ? 'bg-[#1B5E20]/10 text-[#1B5E20]' : 'bg-[#E11D48]/10 text-[#E11D48]'
                                }`}>
                                  {comment.authorStatus}
                                </Badge>
                                <Badge className="bg-[#EBE3D5]/50 text-[#5D4037] font-black uppercase text-[10px] tracking-tighter flex items-center border-none">
                                  {getRoleIcon(comment.authorRole)}
                                  <span className="ml-1">{comment.authorRole}</span>
                                </Badge>
                                <Badge className="bg-[#F2A900]/10 text-[#F2A900] border-none font-black uppercase text-[10px] tracking-tighter">
                                  {comment.category}
                                </Badge>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/50 lg:ml-auto flex items-center mt-2 sm:mt-0 w-full sm:w-auto">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(comment.submittedAt).toLocaleString('fr-FR', {
                                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'
                                  })}
                                </span>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <h3 className="font-black text-lg sm:text-xl text-[#2D1B08] tracking-tighter mb-1 line-clamp-1">{comment.title}</h3>
                                  
                                  {comment.rating && (
                                    <div className="flex items-center mb-3">
                                      <div className="flex bg-[#FFFDFB] px-2 py-1 rounded-lg border border-[#EBE3D5] items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`h-3.5 w-3.5 ${i < parseInt(comment.rating) ? 'text-[#F2A900] fill-current' : 'text-[#EBE3D5]'}`}
                                          />
                                        ))}
                                        <span className="ml-1 font-black text-[#5D4037] text-xs px-1">({comment.rating}/5)</span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100 relative">
                                  <div className="absolute top-0 left-4 -mt-2 bg-white px-2">
                                    <span className="text-[10px] font-black uppercase text-[#5D4037]/60 tracking-widest">Contenu proposé</span>
                                  </div>
                                  <p className="text-sm font-medium text-[#5D4037] leading-relaxed italic">"{comment.content}"</p>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                  <div className="flex items-center gap-3 bg-[#FFFDFB] p-3 rounded-xl border border-[#EBE3D5]">
                                     <div className="bg-[#F2A900]/10 p-2 rounded-lg text-[#F2A900]">
                                       <User className="w-4 h-4" />
                                     </div>
                                     <div className="min-w-0">
                                       <p className="text-[9px] font-black uppercase text-[#5D4037]/60 tracking-widest">Auteur</p>
                                       <p className="font-bold text-[#2D1B08] text-sm truncate">{comment.author}</p>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-3 bg-[#FFFDFB] p-3 rounded-xl border border-[#EBE3D5]">
                                     <div className="bg-blue-50 p-2 rounded-lg text-blue-500">
                                       <MapPin className="w-4 h-4" />
                                     </div>
                                     <div className="min-w-0">
                                       <p className="text-[9px] font-black uppercase text-[#5D4037]/60 tracking-widest">Concerne {comment.targetType}</p>
                                       <p className="font-bold text-[#2D1B08] text-sm truncate">{comment.targetName}</p>
                                     </div>
                                  </div>
                                </div>

                              </div>
                            </div>

                            {/* Actions (Desktop) */}
                            <div className="hidden sm:flex flex-row lg:flex-col gap-2 justify-center lg:w-36 lg:pl-6 lg:border-l border-[#EBE3D5] pt-4 lg:pt-0 border-t lg:border-t-0">
                                <Button
                                  className="w-full bg-[#1B5E20] hover:bg-[#1B5E20]/90 text-white font-black uppercase text-[10px] tracking-tighter h-10 transition-colors shadow-sm"
                                  onClick={() => handleCommentAction(comment.id, 'approve')}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1.5" />
                                  Approuver
                                </Button>
                                <Button
                                  variant="outline"
                                  className="w-full border-2 border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black uppercase text-[10px] tracking-tighter h-10 transition-colors"
                                  onClick={() => handleViewComment(comment)}
                                >
                                  <AlertTriangle className="h-4 w-4 mr-1.5" />
                                  Examiner
                                </Button>
                                <Button
                                  variant="outline"
                                  className="w-full border-2 border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48] hover:text-white font-black uppercase text-[10px] tracking-tighter h-10 transition-colors mt-2"
                                  onClick={() => handleCommentAction(comment.id, 'reject')}
                                >
                                  <X className="h-4 w-4 mr-1.5" />
                                  Rejeter
                                </Button>
                            </div>
                          </div>
                          
                          {/* Actions (Mobile) */}
                          <div className="sm:hidden grid grid-cols-2 gap-2 p-4 pt-0">
                            <Button
                                className="col-span-2 w-full bg-[#1B5E20] hover:bg-[#1B5E20]/90 text-white font-black uppercase text-[10px] tracking-tighter h-10 shadow-sm"
                                onClick={() => handleCommentAction(comment.id, 'approve')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1.5" />
                                Approuver la publication
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full border-2 border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black uppercase text-[10px] tracking-tighter h-10"
                                onClick={() => handleViewComment(comment)}
                              >
                                <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                                Examiner
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full border-2 border-red-100 text-[#E11D48] hover:bg-red-50 font-black uppercase text-[10px] tracking-tighter h-10"
                                onClick={() => handleCommentAction(comment.id, 'reject')}
                              >
                                <X className="h-3.5 w-3.5 mr-1" />
                                Rejeter
                              </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-2 border-dashed border-[#EBE3D5] bg-[#FFFDFB] p-8 sm:p-16 text-center rounded-[2rem]">
                  <div className="max-w-md mx-auto flex flex-col items-center">
                    <div className="w-20 h-20 bg-[#1B5E20]/5 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="h-10 w-10 text-[#1B5E20]/50" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-[#2D1B08] mb-3">À jour !</h3>
                    <p className="text-sm sm:text-base font-medium text-[#5D4037]/70 leading-relaxed">
                      Aucun commentaire n'est en attente de modération. Tous les avis publiés ont été traités.
                    </p>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="comments" className="space-y-6 animate-in fade-in duration-500">
              {/* Filtres Commentaires publiés */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#EBE3D5] shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F2A900] h-4 w-4" />
                  <Input
                    placeholder="Rechercher par auteur, contenu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-gray-50/50 border-[#EBE3D5] focus:border-[#F2A900] focus:ring-[#F2A900] rounded-xl font-medium text-sm text-[#2D1B08]"
                  />
                </div>
                <div className="flex flex-row gap-3 sm:w-auto w-full">
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="h-12 w-full sm:min-w-[180px] bg-gray-50/50 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl font-black uppercase text-xs tracking-tighter text-[#2D1B08]">
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#EBE3D5] rounded-xl">
                      {commentStatuses.map(status => (
                        <SelectItem key={status} value={status} className="uppercase font-bold text-[10px] text-[#5D4037] focus:bg-[#F2A900]/10 focus:text-[#2D1B08]">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Liste des commentaires publiés */}
              {filteredComments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {filteredComments.map((comment) => (
                    <Card key={comment.id} className="border-2 border-[#EBE3D5] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="flex flex-col lg:flex-row h-full">
                           {/* Indicateur si signalé (bordure gauche) */}
                           <div className={`h-1 lg:h-auto lg:w-2 flex-shrink-0 ${comment.reported ? 'bg-[#E11D48]' : 'bg-[#EBE3D5]'}`}></div>

                          <div className="p-4 sm:p-6 flex-1 flex flex-col lg:flex-row gap-6">
                            
                            {/* Colonne Principale: Info & Contenu */}
                            <div className="flex-1 lg:min-w-0 flex flex-col">
                              {/* Meta: Tags et Date */}
                              <div className="flex flex-wrap items-center gap-2 mb-4">
                                <Badge className={`font-black uppercase tracking-tighter text-[10px] border-none ${
                                  comment.status === 'En attente' ? 'bg-[#F2A900] text-white' : 
                                  comment.status === 'Modéré' ? 'bg-orange-100 text-orange-700' :
                                  comment.status === 'Supprimé' ? 'bg-red-100 text-red-700' : 'bg-[#EBE3D5] text-[#5D4037]'
                                }`}>
                                  {comment.status}
                                </Badge>
                                {comment.reported && (
                                   <Badge className="bg-[#E11D48]/10 text-[#E11D48] border-none font-black uppercase text-[10px] tracking-tighter shadow-sm flex items-center">
                                      <Flag className="w-3 h-3 mr-1" />
                                      Signalé
                                   </Badge>
                                )}
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/50 lg:ml-auto flex items-center mt-2 sm:mt-0 w-full sm:w-auto">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(comment.date).toLocaleDateString('fr-FR')}
                                </span>
                              </div>

                              {/* Auteur et Contexte */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-[#EBE3D5]/50 flex items-center justify-center text-[#5D4037] font-black border-2 border-[#EBE3D5]">
                                    {comment.author.substring(0,2).toUpperCase()}
                                  </div>
                                  <div>
                                    <h3 className="font-black text-sm sm:text-base text-[#2D1B08] tracking-tighter flex items-center gap-2">
                                      {comment.author}
                                      {comment.authorStatus === 'Suspendu' && (
                                        <Badge className="bg-orange-100 text-orange-700 text-[9px] px-1.5 h-4 font-bold border-none uppercase">Suspendu</Badge>
                                      )}
                                    </h3>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60 flex items-center gap-1 mt-0.5">
                                      <span className="text-[#F2A900]">{comment.authorRole}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <Badge variant="outline" className="border-2 border-[#EBE3D5] bg-[#FFFDFB] text-[#5D4037] font-bold text-[10px] uppercase w-fit">
                                  {comment.context}
                                </Badge>
                              </div>

                              {/* Message */}
                              <div className="bg-[#FFFDFB] rounded-xl p-4 sm:p-5 border border-[#EBE3D5]">
                                <p className="text-sm font-medium text-[#2D1B08]">{comment.content}</p>
                              </div>
                              
                              {/* Footer: Likes/Dislikes */}
                              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#EBE3D5]/50 px-2">
                                <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                                  <span className="text-base">👍</span> {comment.likes}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-red-700 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                                  <span className="text-base">👎</span> {comment.dislikes}
                                </span>
                              </div>
                            </div>

                            {/* Actions (Desktop) */}
                            <div className="hidden sm:flex flex-row lg:flex-col gap-2 justify-center lg:w-36 lg:pl-6 lg:border-l border-[#EBE3D5] pt-4 lg:pt-0 border-t lg:border-t-0">
                                <Button
                                  variant="outline"
                                  className="w-full border-2 border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black uppercase text-[10px] tracking-tighter h-10 transition-colors"
                                  onClick={() => handleViewComment(comment)}
                                >
                                  <Eye className="h-4 w-4 mr-1.5" />
                                  Modérer
                                </Button>
                                {comment.status !== 'Supprimé' && (
                                  <Button
                                    variant="outline"
                                    className="w-full border-2 border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48] hover:text-white font-black uppercase text-[10px] tracking-tighter h-10 transition-colors mt-2"
                                  >
                                    <X className="h-4 w-4 mr-1.5" />
                                    Supprimer
                                  </Button>
                                )}
                            </div>
                          </div>
                          
                          {/* Actions (Mobile) */}
                          <div className="sm:hidden grid grid-cols-2 gap-2 p-4 pt-0">
                              <Button
                                variant="outline"
                                className={`w-full border-2 border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black uppercase text-[10px] tracking-tighter h-10 ${comment.status === 'Supprimé' ? 'col-span-2' : ''}`}
                                onClick={() => handleViewComment(comment)}
                              >
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                Modérer
                              </Button>
                              {comment.status !== 'Supprimé' && (
                                <Button
                                  variant="outline"
                                  className="w-full border-2 border-[#E11D48] text-[#E11D48] hover:bg-red-50 font-black uppercase text-[10px] tracking-tighter h-10"
                                >
                                  <X className="h-3.5 w-3.5 mr-1" />
                                  Supprimer
                                </Button>
                              )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-2 border-dashed border-[#EBE3D5] bg-[#FFFDFB] p-8 sm:p-16 text-center rounded-[2rem]">
                  <div className="max-w-md mx-auto flex flex-col items-center">
                    <div className="w-20 h-20 bg-[#EBE3D5]/30 rounded-full flex items-center justify-center mb-6">
                      <MessageSquare className="h-10 w-10 text-[#5D4037]/50" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-[#2D1B08] mb-3">Aucun commentaire</h3>
                    <p className="text-sm sm:text-base font-medium text-[#5D4037]/70 leading-relaxed">
                      Aucun avis publié ne correspond à vos filtres.
                    </p>
                     {(searchTerm || selectedStatus) && (
                       <Button 
                         variant="outline" 
                         onClick={() => {setSearchTerm(''); setSelectedStatus('');}}
                         className="mt-6 border-2 border-[#EBE3D5] text-[#2D1B08] font-black uppercase text-xs tracking-tighter hover:bg-[#F2A900] hover:text-white transition-colors h-10 px-6"
                       >
                         Réinitialiser
                       </Button>
                    )}
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="users" className="space-y-6 animate-in fade-in duration-500">
              {/* Filtres Utilisateurs */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#EBE3D5] shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F2A900] h-4 w-4" />
                  <Input
                    placeholder="Rechercher (nom, email, rôle)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-gray-50/50 border-[#EBE3D5] focus:border-[#F2A900] focus:ring-[#F2A900] rounded-xl font-medium text-sm text-[#2D1B08]"
                  />
                </div>
                <div className="flex flex-row gap-3 sm:w-auto w-full">
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="h-12 w-full sm:min-w-[180px] bg-gray-50/50 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl font-black uppercase text-xs tracking-tighter text-[#2D1B08]">
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#EBE3D5] rounded-xl">
                      {userStatuses.map(status => (
                        <SelectItem key={status} value={status} className="uppercase font-bold text-[10px] text-[#5D4037] focus:bg-[#F2A900]/10 focus:text-[#2D1B08]">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Liste des utilisateurs */}
              {filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className="border-2 border-[#EBE3D5] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                      <CardContent className="p-0">
                         <div className="flex flex-col lg:flex-row h-full">
                           {/* Indicateur si signalements ou alertes (bordure gauche) */}
                           <div className={`h-1 lg:h-auto lg:w-2 flex-shrink-0 ${
                             user.status === 'Banni' ? 'bg-[#E11D48]' : 
                             user.status === 'Suspendu' ? 'bg-[#F2A900]' : 
                             user.reports > 0 ? 'bg-orange-400' : 'bg-[#1B5E20]'
                           }`}></div>

                          <div className="p-4 sm:p-6 flex-1 flex flex-col lg:flex-row gap-6">
                            
                            {/* Colonne Principale: Info User & Stats */}
                            <div className="flex-1 lg:min-w-0 flex flex-col">
                              {/* Meta: Tags et Signalements */}
                              <div className="flex flex-wrap items-center gap-2 mb-4">
                                <Badge className={`font-black uppercase tracking-tighter text-[10px] border-none ${
                                  user.status === 'Actif' ? 'bg-[#1B5E20]/10 text-[#1B5E20]' : 
                                  user.status === 'Suspendu' ? 'bg-[#F2A900] text-white' : 'bg-[#E11D48]/10 text-[#E11D48]'
                                }`}>
                                  {user.status}
                                </Badge>
                                <Badge className="bg-[#EBE3D5]/50 text-[#5D4037] font-black uppercase text-[10px] tracking-tighter flex items-center border-none">
                                  {getRoleIcon(user.role)}
                                  <span className="ml-1">{user.role}</span>
                                </Badge>
                                {user.reports > 0 && (
                                   <Badge className="bg-orange-100 text-orange-700 border-none font-black uppercase text-[10px] tracking-tighter shadow-sm flex items-center lg:ml-auto w-full sm:w-auto mt-2 sm:mt-0">
                                      <AlertTriangle className="w-3 h-3 mr-1" />
                                      {user.reports} signalement(s)
                                   </Badge>
                                )}
                              </div>

                              <div className="flex flex-col sm:flex-row gap-6 mb-4">
                                {/* Details User */}
                                <div className="flex-1">
                                  <h3 className="font-black text-xl sm:text-2xl text-[#2D1B08] tracking-tighter mb-1 truncate">{user.name}</h3>
                                  <p className="font-medium text-[#5D4037]/70 text-sm bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg inline-block">{user.email}</p>
                                </div>
                                
                                {/* Info Dates */}
                                <div className="flex sm:flex-col gap-3 sm:gap-2 sm:min-w-[150px] sm:items-end">
                                   <div className="flex flex-col sm:items-end text-xs">
                                     <span className="font-black uppercase tracking-widest text-[#5D4037]/50 text-[9px] mb-0.5">Inscription</span>
                                     <span className="font-bold text-[#2D1B08]">{new Date(user.joinDate).toLocaleDateString('fr-FR')}</span>
                                   </div>
                                   <div className="flex flex-col sm:items-end text-xs">
                                     <span className="font-black uppercase tracking-widest text-[#5D4037]/50 text-[9px] mb-0.5">Dernière activité</span>
                                     <span className="font-bold text-[#2D1B08]">{new Date(user.lastActivity).toLocaleDateString('fr-FR')}</span>
                                   </div>
                                </div>
                              </div>

                              {/* Violations Profil */}
                              {user.violations.length > 0 && (
                                <div className="bg-red-50 p-4 rounded-xl border border-red-100 relative mt-2">
                                  <div className="absolute top-0 left-4 -mt-2 bg-red-50/0">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-white px-2 border border-red-100 rounded-md">Historique Modération</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {user.violations.map((violation, index) => (
                                      <Badge key={index} className="bg-red-100/50 text-red-700 border border-red-200 font-bold text-[10px] uppercase">
                                        <X className="w-3 h-3 mr-1" />
                                        {violation}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Actions (Desktop) */}
                            <div className="hidden sm:flex flex-row lg:flex-col gap-2 justify-center lg:w-36 lg:pl-6 lg:border-l border-[#EBE3D5] pt-4 lg:pt-0 border-t lg:border-t-0">
                                <Button
                                  className="w-full bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black uppercase text-[10px] tracking-tighter h-10 transition-colors"
                                  onClick={() => handleViewUser(user)}
                                >
                                  <User className="h-4 w-4 mr-1.5" />
                                  Gérer
                                </Button>
                                {user.status !== 'Banni' && (
                                  <Button
                                    variant="outline"
                                    className="w-full border-2 border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48] hover:text-white font-black uppercase text-[10px] tracking-tighter h-10 transition-colors mt-2"
                                  >
                                    <Shield className="h-4 w-4 mr-1.5" />
                                    Bannir
                                  </Button>
                                )}
                            </div>
                          </div>
                          
                          {/* Actions (Mobile) */}
                          <div className="sm:hidden grid grid-cols-2 gap-2 p-4 pt-0">
                               <Button
                                  className={`w-full bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black uppercase text-[10px] tracking-tighter h-10 ${user.status === 'Banni' ? 'col-span-2' : ''}`}
                                  onClick={() => handleViewUser(user)}
                                >
                                  <User className="h-4 w-4 mr-1.5" />
                                  Gérer Profil
                                </Button>
                                {user.status !== 'Banni' && (
                                  <Button
                                    variant="outline"
                                    className="w-full border-2 border-[#E11D48] text-[#E11D48] hover:bg-red-50 font-black uppercase text-[10px] tracking-tighter h-10"
                                  >
                                    <Shield className="h-3.5 w-3.5 mr-1" />
                                    Bannir
                                  </Button>
                                )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-2 border-dashed border-[#EBE3D5] bg-[#FFFDFB] p-8 sm:p-16 text-center rounded-[2rem]">
                  <div className="max-w-md mx-auto flex flex-col items-center">
                    <div className="w-20 h-20 bg-[#EBE3D5]/30 rounded-full flex items-center justify-center mb-6">
                      <Users className="h-10 w-10 text-[#5D4037]/50" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-[#2D1B08] mb-3">Aucun utilisateur</h3>
                    <p className="text-sm sm:text-base font-medium text-[#5D4037]/70 leading-relaxed">
                      Aucun profil utilisateur ne correspond aux filtres appliqués.
                    </p>
                    {(searchTerm || selectedStatus) && (
                       <Button 
                         variant="outline" 
                         onClick={() => {setSearchTerm(''); setSelectedStatus('');}}
                         className="mt-6 border-2 border-[#EBE3D5] text-[#2D1B08] font-black uppercase text-xs tracking-tighter hover:bg-[#F2A900] hover:text-white transition-colors h-10 px-6"
                       >
                         Réinitialiser
                       </Button>
                    )}
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
          onUpdateRole={(userId) => handleUserAction(userId, 'role')}
          onBanUser={(userId) => handleUserAction(userId, 'ban')}
          onUnbanUser={(userId) => handleUserAction(userId, 'unban')}
          onWarnUser={(userId) => handleUserAction(userId, 'warn')}
          onVerifyUser={(userId) => handleUserAction(userId, 'verify')}
          onDeleteUser={(userId) => handleUserAction(userId, 'delete')}
        />
      )}
    </div>
  );
};

export default ModerationPage;
