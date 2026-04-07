import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Users,
  MapPin,
  Eye,
  Filter,
  Search,
  Mail,
  Phone
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Données mock pour les contenus en attente de validation
const mockPendingContent = [
  {
    id: 'event-1',
    type: 'event',
    title: 'Festival de Jazz de Saint-Louis',
    description: 'Un festival de jazz exceptionnel avec des artistes internationaux dans la ville historique de Saint-Louis.',
    category: 'Musique',
    location: 'Saint-Louis',
    organizer: 'Moussa Diallo',
    submittedAt: '2024-01-20T10:00:00.000Z',
    autoPublishAt: '2024-01-22T10:00:00.000Z',
    price: '15,000 FCFA',
    capacity: 500,
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    priority: 'high', // high, medium, low
    estimatedParticipants: 320,
    tags: ['Jazz', 'Musique', 'Culture', 'Saint-Louis'],
    requirements: ['Billet d\'entrée', 'Vêtements confortables'],
    contactInfo: {
      email: 'moussa.diallo@email.com',
      phone: '+221 77 123 45 67'
    },
    additionalInfo: 'Parking disponible sur place. Restauration et boissons disponibles.'
  },
  {
    id: 'tour-1',
    type: 'tour',
    title: 'Visite Historique de Saint-Louis',
    description: 'Découvrez l\'histoire fascinante de Saint-Louis, première capitale du Sénégal.',
    category: 'Histoire',
    location: 'Saint-Louis',
    guide: 'Fatou Sarr',
    submittedAt: '2024-01-20T14:30:00.000Z',
    autoPublishAt: '2024-01-22T14:30:00.000Z',
    price: '25,000 FCFA',
    duration: '4 heures',
    maxGroupSize: 15,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    priority: 'medium',
    estimatedParticipants: 45,
    tags: ['Histoire', 'Culture', 'Patrimoine', 'Saint-Louis'],
    specialties: ['Histoire du Sénégal', 'Architecture coloniale', 'Patrimoine UNESCO'],
    languages: ['Français', 'Wolof', 'Anglais'],
    includedItems: ['Guide professionnel', 'Transport', 'Déjeuner traditionnel'],
    requirements: ['Chaussures confortables', 'Chapeau', 'Crème solaire'],
    contactInfo: {
      email: 'fatou.sarr@email.com',
      phone: '+221 78 234 56 78'
    },
    additionalInfo: 'Visite adaptée aux enfants. Accessible aux personnes à mobilité réduite.'
  },
  {
    id: 'event-2',
    type: 'event',
    title: 'Atelier de Cuisine Traditionnelle',
    description: 'Apprenez à préparer les plats traditionnels sénégalais avec des chefs expérimentés.',
    category: 'Gastronomie',
    location: 'Dakar',
    organizer: 'Aminata Diop',
    submittedAt: '2024-01-21T09:15:00.000Z',
    autoPublishAt: '2024-01-23T09:15:00.000Z',
    price: '20,000 FCFA',
    capacity: 30,
    image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
    priority: 'low',
    estimatedParticipants: 0
  },
  {
    id: 'tour-2',
    type: 'tour',
    title: 'Excursion Nature à la Réserve de Bandia',
    description: 'Découvrez la faune et la flore du Sénégal dans cette réserve naturelle exceptionnelle.',
    category: 'Nature',
    location: 'Thiès',
    guide: 'Moussa Ba',
    submittedAt: '2024-01-21T16:45:00.000Z',
    autoPublishAt: '2024-01-23T16:45:00.000Z',
    price: '45,000 FCFA',
    duration: '6 heures',
    maxGroupSize: 20,
    image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400',
    priority: 'high',
    estimatedParticipants: 28
  }
];

const ValidationDashboard: React.FC = () => {
  const { user } = useAuth();
  const [pendingContent, setPendingContent] = useState(mockPendingContent);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);

  // Fonction pour calculer le temps restant avant auto-publication
  const getTimeUntilAutoPublish = (autoPublishAt: string) => {
    const now = new Date();
    const autoPublishDate = new Date(autoPublishAt);
    const diffMs = autoPublishDate.getTime() - now.getTime();

    if (diffMs <= 0) return 'Expiré';

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 24) {
      const days = Math.floor(diffHours / 24);
      return `${days}j ${diffHours % 24}h`;
    } else if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    } else {
      return `${diffMinutes}m`;
    }
  };



  // Filtrer le contenu
  const filteredContent = pendingContent.filter(content => {
    const matchesType = selectedType === 'all' || content.type === selectedType;
    const matchesPriority = selectedPriority === 'all' || content.priority === selectedPriority;
    return matchesType && matchesPriority;
  });

  // Trier par priorité et temps restant
  const sortedContent = filteredContent.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder];
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder];

    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }

    // Si même priorité, trier par temps restant
    const aTime = new Date(a.autoPublishAt).getTime();
    const bTime = new Date(b.autoPublishAt).getTime();
    return aTime - bTime;
  });

  const handleApprove = (contentId: string) => {
    const content = pendingContent.find(c => c.id === contentId);
    if (content) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir approuver "${content.title}" ?\n\n` +
        `Ce contenu sera immédiatement publié et visible par tous les utilisateurs.`
      );

      if (confirmed) {
        try {
          setPendingContent(prev => prev.filter(c => c.id !== contentId));

          toast.success('Contenu approuvé avec succès', {
            description: `"${content.title}" a été approuvé et publié.`
          });
        } catch (error) {
          toast.error('Erreur lors de l\'approbation', {
            description: 'Une erreur est survenue lors de l\'approbation du contenu.'
          });
        }
      }
    }
  };

  const handleViewDetails = (content: any) => {
    setSelectedContent(content);
    setIsDetailsModalOpen(true);
  };

  const handleReject = (contentId: string) => {
    const content = pendingContent.find(c => c.id === contentId);
    if (content) {
      const reason = window.prompt(
        `Veuillez indiquer la raison du rejet pour "${content.title}" :\n\n` +
        `Cette information sera transmise à l'organisateur/guide.`
      );

      if (reason && reason.trim()) {
        try {
          setPendingContent(prev => prev.filter(c => c.id !== contentId));

          toast.success('Contenu rejeté avec succès', {
            description: `"${content.title}" a été rejeté. L'organisateur/guide a été notifié.`
          });
        } catch (error) {
          toast.error('Erreur lors du rejet', {
            description: 'Une erreur est survenue lors du rejet du contenu.'
          });
        }
      }
    }
  };

  // Calculs des statistiques
  const totalPending = pendingContent.length;
  const eventsPending = pendingContent.filter(c => c.type === 'event').length;
  const toursPending = pendingContent.filter(c => c.type === 'tour').length;
  const highPriority = pendingContent.filter(c => c.priority === 'high').length;
  const expiringSoon = pendingContent.filter(c => {
    const timeLeft = getTimeUntilAutoPublish(c.autoPublishAt);
    return timeLeft !== 'Expiré' && (timeLeft.includes('h') || timeLeft.includes('m'));
  }).length;

  // Vérifier que l'utilisateur est admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2">Accès refusé</h2>
            <p className="text-gray-600">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FFFDFB]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#2D1B08] uppercase tracking-tighter flex items-center">
                <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 mr-3 text-[#1B5E20]" />
                Dashboard de Validation
              </h1>
              <p className="text-[#5D4037]/70 mt-2 font-medium text-sm sm:text-base">
                Validez les événements et visites guidées soumis par les utilisateurs
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Badge variant="outline" className="bg-blue-50/50 text-blue-700 border-blue-200 font-black uppercase tracking-tighter text-xs py-1.5 px-3">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {totalPending} en attente
              </Badge>
              <Badge variant="outline" className="bg-[#E11D48]/10 text-[#E11D48] border-none font-black uppercase tracking-tighter text-xs py-1.5 px-3">
                <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                {expiringSoon} urgent(s)
              </Badge>
            </div>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-black uppercase tracking-tighter text-[#5D4037]/70">Total en attente</p>
                  <p className="text-2xl sm:text-3xl font-black text-[#2D1B08] mt-1">{totalPending}</p>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-black uppercase tracking-tighter text-[#5D4037]/70">Événements</p>
                  <p className="text-2xl sm:text-3xl font-black text-[#2D1B08] mt-1">{eventsPending}</p>
                </div>
                <div className="p-3 bg-[#1B5E20]/10 text-[#1B5E20] rounded-xl">
                  <Calendar className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-black uppercase tracking-tighter text-[#5D4037]/70">Visites guidées</p>
                  <p className="text-2xl sm:text-3xl font-black text-[#2D1B08] mt-1">{toursPending}</p>
                </div>
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-black uppercase tracking-tighter text-[#5D4037]/70">Priorité haute</p>
                  <p className="text-2xl sm:text-3xl font-black text-[#E11D48] mt-1">{highPriority}</p>
                </div>
                <div className="p-3 bg-[#E11D48]/10 text-[#E11D48] rounded-xl">
                  <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card className="mb-6 border-2 border-[#EBE3D5] bg-white shadow-none rounded-2xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Filter className="h-4 w-4 hidden sm:block text-[#F2A900]" />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2 bg-[#FFFDFB] border-2 border-[#EBE3D5] rounded-xl text-sm font-medium text-[#2D1B08] focus:border-[#F2A900] focus:ring-0 transition-colors"
                  >
                    <option value="all">Tous les types</option>
                    <option value="event">Événements</option>
                    <option value="tour">Visites guidées</option>
                  </select>
                </div>

                <div className="w-full sm:w-auto">
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2 bg-[#FFFDFB] border-2 border-[#EBE3D5] rounded-xl text-sm font-medium text-[#2D1B08] focus:border-[#F2A900] focus:ring-0 transition-colors"
                  >
                    <option value="all">Toutes les priorités</option>
                    <option value="high">Priorité haute</option>
                    <option value="medium">Priorité moyenne</option>
                    <option value="low">Priorité basse</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center text-sm font-black text-[#5D4037]/70 uppercase tracking-tighter w-full sm:w-auto justify-center sm:justify-start">
                <Search className="h-4 w-4 mr-2 text-[#F2A900]" />
                {sortedContent.length} contenu(s)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste du contenu en attente */}
        <div className="space-y-4 sm:space-y-6">
          {sortedContent.length > 0 ? (
            sortedContent.map((content) => (
              <Card key={content.id} className="border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden group">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    {/* Image */}
                    <div className="w-full sm:w-48 h-48 sm:h-32 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={content.image}
                        alt={content.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <div className="flex-1 w-full">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge className={`font-black uppercase tracking-tighter text-xs border-none ${content.type === 'event' ? 'bg-[#2D1B08] text-white hover:bg-[#5D4037]' : 'bg-[#EBE3D5] text-[#2D1B08] hover:bg-[#D5CDBC]'}`}>
                              {content.type === 'event' ? 'Événement' : 'Visite guidée'}
                            </Badge>
                            <Badge
                              className={`font-black uppercase tracking-tighter text-xs border-none ${
                                content.priority === 'high' ? 'bg-[#E11D48] text-white' :
                                  content.priority === 'medium' ? 'bg-[#F2A900] text-white' : 'bg-[#1B5E20] text-white'
                              }`}
                            >
                              {content.priority === 'high' ? 'Priorité haute' :
                                content.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                            </Badge>
                            <Badge variant="outline" className="bg-[#F2A900]/10 text-[#F2A900] border-none font-black uppercase tracking-tighter text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {getTimeUntilAutoPublish(content.autoPublishAt)}
                            </Badge>
                          </div>

                          <h3 className="text-lg sm:text-xl font-black text-[#2D1B08] uppercase tracking-tighter mb-2 line-clamp-2">{content.title}</h3>
                          <p className="text-[#5D4037]/80 font-medium text-sm mb-4 line-clamp-2">{content.description}</p>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#5D4037]">
                            <div className="flex items-center font-medium">
                              <MapPin className="h-4 w-4 mr-1 text-[#F2A900]" />
                              {content.location}
                            </div>
                            <div className="flex items-center font-medium">
                              {content.type === 'event' ? (
                                <>
                                  <Users className="h-4 w-4 mr-1 text-[#F2A900]" />
                                  {content.estimatedParticipants}/{content.capacity} participants
                                </>
                              ) : (
                                <>
                                  <Clock className="h-4 w-4 mr-1 text-[#F2A900]" />
                                  {content.duration} - {content.maxGroupSize} max
                                </>
                              )}
                            </div>
                            <div className="flex items-center font-black text-[#1B5E20]">
                              {content.price}
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-[#EBE3D5] text-xs font-medium text-[#5D4037]/60">
                            Soumis par <span className="text-[#2D1B08] font-black uppercase tracking-tighter">{content.type === 'event' ? content.organizer : content.guide}</span> le {new Date(content.submittedAt).toLocaleDateString('fr-FR')} à {new Date(content.submittedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>

                        {/* Actions (Desktop) */}
                        <div className="hidden lg:flex flex-col space-y-2 ml-4 flex-shrink-0 min-w-[140px]">
                          <Button
                            onClick={() => handleViewDetails(content)}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start border-2 border-[#EBE3D5] text-[#2D1B08] hover:bg-[#F2A900] hover:text-white hover:border-[#F2A900] font-black uppercase tracking-tighter text-xs"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Voir détails
                          </Button>
                          <Button
                            onClick={() => handleApprove(content.id)}
                            size="sm"
                            className="w-full justify-start bg-[#1B5E20] hover:bg-[#15490F] text-white font-black uppercase tracking-tighter text-xs"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approuver
                          </Button>
                          <Button
                            onClick={() => handleReject(content.id)}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start border-2 border-[#E11D48]/30 text-[#E11D48] hover:bg-[#E11D48] hover:text-white font-black uppercase tracking-tighter text-xs"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Rejeter
                          </Button>
                        </div>

                        {/* Actions (Mobile & Tablette) */}
                        <div className="flex lg:hidden flex-row gap-2 w-full pt-4 mt-2 border-t lg:border-none border-[#EBE3D5] overflow-x-auto pb-2 -mb-2 scrollbar-none">
                          <Button   
                            onClick={() => handleViewDetails(content)}
                            variant="outline"
                            size="sm"
                            className="flex-1 min-w-[120px] border-2 border-[#EBE3D5] text-[#2D1B08] hover:bg-[#F2A900] hover:text-white hover:border-[#F2A900] font-black uppercase tracking-tighter text-xs"
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            Détails
                          </Button>
                          <Button
                            onClick={() => handleApprove(content.id)}
                            size="sm"
                            className="flex-1 min-w-[120px] bg-[#1B5E20] hover:bg-[#15490F] text-white font-black uppercase tracking-tighter text-xs"
                          >
                            <CheckCircle className="h-3.5 w-3.5 mr-1" />
                            Approuver
                          </Button>
                          <Button
                            onClick={() => handleReject(content.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 min-w-[120px] border-2 border-[#E11D48]/30 text-[#E11D48] hover:bg-[#E11D48] hover:text-white font-black uppercase tracking-tighter text-xs"
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            Rejeter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="p-8 sm:p-12 text-center border-2 border-[#EBE3D5] shadow-none rounded-2xl bg-white">
              <div className="text-[#5D4037]/70">
                <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-[#EBE3D5]" />
                <h3 className="text-lg sm:text-xl font-black text-[#2D1B08] uppercase tracking-tighter mb-2">Aucun contenu en attente</h3>
                <p className="font-medium text-sm sm:text-base">Tous les contenus ont été traités avec succès !</p>
              </div>
            </Card>
          )}
        </div>

        {/* Modal de détails */}
        {selectedContent && (
          <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
            <DialogContent aria-describedby={undefined} className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-[90vw] p-4 sm:p-6 bg-[#FFFDFB] rounded-[2rem] border-2 border-[#EBE3D5]">
              <DialogHeader>
                <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xl sm:text-2xl font-black text-[#2D1B08] uppercase tracking-tighter">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-[#F2A900]/10 text-[#F2A900] rounded-xl flex-shrink-0">
                      <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span>Détails</span>
                  </div>
                  <span className="hidden sm:inline text-[#EBE3D5] text-2xl">|</span>
                  <span className="text-[#5D4037]/80 leading-tight">{selectedContent.title}</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 sm:space-y-8 mt-4">
                {/* Image principale */}
                <div className="w-full h-48 sm:h-72 bg-gray-200 rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src={selectedContent.image}
                    alt={selectedContent.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Informations principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-[#2D1B08] uppercase tracking-tighter mb-2">{selectedContent.title}</h3>
                      <p className="text-[#5D4037] font-medium leading-relaxed text-sm sm:text-base">{selectedContent.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-[#EBE3D5]">
                      <Badge className={`font-black uppercase tracking-tighter text-xs border-none ${selectedContent.type === 'event' ? 'bg-[#2D1B08] text-white hover:bg-[#5D4037]' : 'bg-[#EBE3D5] text-[#2D1B08] hover:bg-[#D5CDBC]'}`}>
                        {selectedContent.type === 'event' ? 'Événement' : 'Visite guidée'}
                      </Badge>
                      <Badge variant="outline" className="border-2 border-[#EBE3D5] text-[#5D4037] font-black uppercase tracking-tighter text-xs">{selectedContent.category}</Badge>
                      <Badge
                        className={`font-black uppercase tracking-tighter text-xs border-none ${
                          selectedContent.priority === 'high' ? 'bg-[#E11D48] text-white' :
                            selectedContent.priority === 'medium' ? 'bg-[#F2A900] text-white' : 'bg-[#1B5E20] text-white'
                        }`}
                      >
                        {selectedContent.priority === 'high' ? 'Priorité haute' :
                          selectedContent.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#FFFDFB] border-2 border-[#EBE3D5] p-5 rounded-2xl shadow-sm">
                      <h4 className="font-black text-[#2D1B08] uppercase tracking-tighter mb-4 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-[#F2A900]" />
                        Informations de soumission
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center border-b border-[#EBE3D5]/50 pb-2">
                          <span className="text-[#5D4037]/70 font-medium">Soumis par :</span>
                          <span className="font-black text-[#2D1B08] uppercase tracking-tighter text-right">
                            {selectedContent.type === 'event' ? selectedContent.organizer : selectedContent.guide}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[#EBE3D5]/50 pb-2">
                          <span className="text-[#5D4037]/70 font-medium">Date soumission :</span>
                          <span className="font-medium text-[#5D4037] text-right">
                            {new Date(selectedContent.submittedAt).toLocaleDateString('fr-FR')} {new Date(selectedContent.submittedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[#EBE3D5]/50 pb-2">
                          <span className="text-[#5D4037]/70 font-medium">Auto-publication :</span>
                          <span className="font-medium text-[#5D4037] text-right">
                            {new Date(selectedContent.autoPublishAt).toLocaleDateString('fr-FR')} {new Date(selectedContent.autoPublishAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#5D4037]/70 font-medium pt-1">Temps restant :</span>
                          <span className="font-black text-[#E11D48] uppercase tracking-tighter pt-1 text-right">
                            {getTimeUntilAutoPublish(selectedContent.autoPublishAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Détails spécifiques selon le type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <h4 className="font-black text-[#2D1B08] uppercase tracking-tighter text-sm sm:text-base border-b-2 border-[#EBE3D5] pb-2 inline-block">Informations générales</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                        <div className="p-2 bg-[#F2A900]/10 rounded-lg"><MapPin className="h-4 w-4 text-[#F2A900]" /></div>
                        <div className="flex flex-col">
                           <span className="text-xs text-[#5D4037]/70 font-black uppercase tracking-tighter">Lieu</span>
                           <span className="font-bold text-[#2D1B08] text-sm">{selectedContent.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                        <div className="p-2 bg-[#1B5E20]/10 rounded-lg"><span className="text-sm font-black text-[#1B5E20]">CFA</span></div>
                        <div className="flex flex-col">
                           <span className="text-xs text-[#5D4037]/70 font-black uppercase tracking-tighter">Prix</span>
                           <span className="font-black text-[#1B5E20] text-sm">{selectedContent.price}</span>
                        </div>
                      </div>
                      {selectedContent.type === 'event' ? (
                        <>
                          <div className="flex items-center space-x-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users className="h-4 w-4" /></div>
                            <div className="flex flex-col">
                               <span className="text-xs text-[#5D4037]/70 font-black uppercase tracking-tighter">Capacité max</span>
                               <span className="font-bold text-[#2D1B08] text-sm">{selectedContent.capacity} personnes</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Calendar className="h-4 w-4" /></div>
                            <div className="flex flex-col">
                               <span className="text-xs text-[#5D4037]/70 font-black uppercase tracking-tighter">Participants estimés</span>
                               <span className="font-bold text-[#2D1B08] text-sm">{selectedContent.estimatedParticipants} personnes</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center space-x-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Clock className="h-4 w-4" /></div>
                            <div className="flex flex-col">
                               <span className="text-xs text-[#5D4037]/70 font-black uppercase tracking-tighter">Durée</span>
                               <span className="font-bold text-[#2D1B08] text-sm">{selectedContent.duration}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Users className="h-4 w-4" /></div>
                            <div className="flex flex-col">
                               <span className="text-xs text-[#5D4037]/70 font-black uppercase tracking-tighter">Taille max du groupe</span>
                               <span className="font-bold text-[#2D1B08] text-sm">{selectedContent.maxGroupSize} personnes</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Calendar className="h-4 w-4" /></div>
                            <div className="flex flex-col">
                               <span className="text-xs text-[#5D4037]/70 font-black uppercase tracking-tighter">Participants estimés</span>
                               <span className="font-bold text-[#2D1B08] text-sm">{selectedContent.estimatedParticipants} personnes</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-black text-[#2D1B08] uppercase tracking-tighter text-sm sm:text-base border-b-2 border-[#EBE3D5] pb-2 inline-block">Statistiques de performance</h4>
                    <div className="bg-[#FFFDFB] p-5 rounded-2xl border-2 border-[#EBE3D5] shadow-sm">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                          <div className="text-2xl sm:text-3xl font-black text-blue-600 mb-1">
                            {selectedContent.estimatedParticipants}
                          </div>
                          <div className="text-[#5D4037]/70 font-black text-[10px] sm:text-xs uppercase tracking-tighter">Estimés</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                          <div className="text-2xl sm:text-3xl font-black text-[#1B5E20] mb-1">
                            {selectedContent.type === 'event' ?
                              selectedContent.capacity :
                              selectedContent.maxGroupSize
                            }
                          </div>
                          <div className="text-[#5D4037]/70 font-black text-[10px] sm:text-xs uppercase tracking-tighter">
                            {selectedContent.type === 'event' ? 'Capacité max' : 'Groupe max'}
                          </div>
                        </div>
                      </div>
                      {selectedContent.type === 'event' && (
                        <div className="mt-4 pt-4 border-t border-[#EBE3D5] text-center">
                          <div className="text-sm text-[#5D4037]/80 font-medium">
                            Taux d'occupation estimé :
                            <span className="font-black text-blue-600 ml-2 py-1 px-2 bg-blue-50 rounded-lg">
                              {((selectedContent.estimatedParticipants / selectedContent.capacity) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Informations détaillées */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 border-t border-[#EBE3D5] pt-4 sm:pt-6">
                  <div className="space-y-4 sm:space-y-6">
                    <h4 className="font-black text-[#2D1B08] uppercase tracking-tighter text-sm sm:text-base border-b-2 border-[#EBE3D5] pb-2 inline-block">Spécificités</h4>

                    {selectedContent.tags && (
                      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-tighter text-[#5D4037]/70 mb-3">Tags</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedContent.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs bg-white border-[#EBE3D5] text-[#5D4037] font-medium">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedContent.requirements && (
                      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-tighter text-[#5D4037]/70 mb-3">Exigences</h5>
                        <ul className="text-xs sm:text-sm text-[#5D4037] font-medium space-y-2">
                          {selectedContent.requirements.map((req: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-[#F2A900] rounded-full mr-2.5 mt-1.5 flex-shrink-0"></span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedContent.specialties && (
                      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-tighter text-[#5D4037]/70 mb-3">Spécialités</h5>
                        <ul className="text-xs sm:text-sm text-[#5D4037] font-medium space-y-2">
                          {selectedContent.specialties.map((specialty: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2.5 mt-1.5 flex-shrink-0"></span>
                              <span>{specialty}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedContent.languages && (
                      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-tighter text-[#5D4037]/70 mb-3">Langues parlées</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedContent.languages.map((lang: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-white text-[#5D4037] border border-gray-200">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <h4 className="font-black text-[#2D1B08] uppercase tracking-tighter text-sm sm:text-base border-b-2 border-[#EBE3D5] pb-2 inline-block">Contact et détails</h4>

                    {selectedContent.contactInfo && (
                      <div className="bg-[#FFFDFB] border-2 border-[#EBE3D5] p-4 rounded-xl shadow-sm">
                        <div className="space-y-4 text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-100 rounded-lg"><Mail className="h-4 w-4 text-[#5D4037]" /></div>
                            <span className="text-[#2D1B08] break-all">{selectedContent.contactInfo.email}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-100 rounded-lg"><Phone className="h-4 w-4 text-[#5D4037]" /></div>
                            <span className="text-[#2D1B08]">{selectedContent.contactInfo.phone}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedContent.includedItems && (
                      <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                        <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-tighter text-[#1B5E20] mb-3">Inclus dans le prix</h5>
                        <ul className="text-xs sm:text-sm text-[#5D4037] font-medium space-y-2">
                          {selectedContent.includedItems.map((item: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-[#1B5E20] mr-2 flex-shrink-0 mt-0" />
                              <span className="pt-0.5">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedContent.additionalInfo && (
                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <h5 className="text-[10px] sm:text-xs font-black uppercase tracking-tighter text-blue-800 mb-2">Informations supplémentaires</h5>
                        <p className="text-xs sm:text-sm text-[#5D4037] font-medium leading-relaxed">{selectedContent.additionalInfo}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Informations importantes */}
                <div className="bg-amber-50 p-4 sm:p-5 rounded-2xl border border-amber-200 shadow-sm mt-4">
                  <h4 className="font-black text-amber-900 uppercase tracking-tighter mb-3 flex items-center text-sm sm:text-base">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                    À savoir avant validation
                  </h4>
                  <div className="text-xs sm:text-sm text-amber-900/80 font-medium space-y-2">
                    <p className="flex items-start"><span className="mr-2 opacity-50">•</span> Ce contenu a été soumis pour validation et sera publié automatiquement si non traité dans les délais.</p>
                    <p className="flex items-start"><span className="mr-2 opacity-50">•</span> L'organisateur/guide a reçu un email de confirmation de soumission.</p>
                    <p className="flex items-start"><span className="mr-2 opacity-50">•</span> Une fois approuvé, le contenu sera immédiatement visible sur les flux publics.</p>
                    <p className="flex items-start"><span className="mr-2 opacity-50">•</span> En cas de rejet, vous devrez spécifier une raison qui sera transmise à l'auteur.</p>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 mt-8 pt-4 sm:pt-6 border-t border-[#EBE3D5]">
                <Button
                  variant="outline"
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="w-full sm:w-auto text-xs font-black uppercase tracking-tighter border-2 border-[#EBE3D5] text-[#2D1B08] hover:bg-[#EBE3D5]/50 py-5"
                >
                  Fermer
                </Button>
                <div className="flex flex-col lg:flex-row gap-3 w-full sm:w-auto">
                  <Button
                    onClick={() => {
                      setIsDetailsModalOpen(false);
                      handleApprove(selectedContent.id);
                    }}
                    className="w-full lg:w-auto bg-[#1B5E20] hover:bg-[#15490F] text-white text-xs font-black uppercase tracking-tighter py-5"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approuver et publier
                  </Button>
                  <Button
                    onClick={() => {
                      setIsDetailsModalOpen(false);
                      handleReject(selectedContent.id);
                    }}
                    variant="outline"
                    className="w-full lg:w-auto border-2 border-[#E11D48]/30 text-[#E11D48] hover:bg-[#E11D48] hover:text-white text-xs font-black uppercase tracking-tighter py-5"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Rejeter
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default ValidationDashboard;
