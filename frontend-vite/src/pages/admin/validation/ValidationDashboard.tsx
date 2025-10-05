import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  Users,
  MapPin,
  Eye,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Activity,
  Filter,
  Search
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
  const [activeTab, setActiveTab] = useState('pending');
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

  // Fonction pour déterminer la priorité basée sur le temps restant
  const getPriorityFromTime = (autoPublishAt: string) => {
    const now = new Date();
    const autoPublishDate = new Date(autoPublishAt);
    const diffMs = autoPublishDate.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours <= 6) return 'high';
    if (diffHours <= 24) return 'medium';
    return 'low';
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
  const mediumPriority = pendingContent.filter(c => c.priority === 'medium').length;
  const lowPriority = pendingContent.filter(c => c.priority === 'low').length;
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <CheckCircle className="h-8 w-8 mr-3 text-blue-600" />
                Dashboard de Validation
              </h1>
              <p className="text-gray-600 mt-2">
                Validez les événements et visites guidées soumis par les utilisateurs
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {totalPending} en attente
              </Badge>
              <Badge variant="destructive" className="text-sm">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {expiringSoon} expirent bientôt
              </Badge>
            </div>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total en attente</p>
                  <p className="text-2xl font-bold text-blue-600">{totalPending}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Événements</p>
                  <p className="text-2xl font-bold text-green-600">{eventsPending}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Visites guidées</p>
                  <p className="text-2xl font-bold text-purple-600">{toursPending}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Priorité haute</p>
                  <p className="text-2xl font-bold text-red-600">{highPriority}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select 
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">Tous les types</option>
                  <option value="event">Événements</option>
                  <option value="tour">Visites guidées</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <select 
                  value={selectedPriority} 
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">Toutes les priorités</option>
                  <option value="high">Priorité haute</option>
                  <option value="medium">Priorité moyenne</option>
                  <option value="low">Priorité basse</option>
                </select>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Search className="h-4 w-4 mr-2" />
                {sortedContent.length} contenu(s) trouvé(s)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste du contenu en attente */}
        <div className="space-y-6">
          {sortedContent.length > 0 ? (
            sortedContent.map((content) => (
              <Card key={content.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    {/* Image */}
                    <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={content.image} 
                        alt={content.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant={content.type === 'event' ? 'default' : 'secondary'}>
                              {content.type === 'event' ? 'Événement' : 'Visite guidée'}
                            </Badge>
                            <Badge 
                              variant={
                                content.priority === 'high' ? 'destructive' : 
                                content.priority === 'medium' ? 'outline' : 'secondary'
                              }
                            >
                              {content.priority === 'high' ? 'Priorité haute' : 
                               content.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                            </Badge>
                            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                              <Clock className="h-3 w-3 mr-1" />
                              {getTimeUntilAutoPublish(content.autoPublishAt)}
                            </Badge>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.title}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{content.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {content.location}
                            </div>
                            <div className="flex items-center">
                              {content.type === 'event' ? (
                                <>
                                  <Users className="h-4 w-4 mr-1" />
                                  {content.estimatedParticipants}/{content.capacity} participants
                                </>
                              ) : (
                                <>
                                  <Clock className="h-4 w-4 mr-1" />
                                  {content.duration} - Max {content.maxGroupSize} personnes
                                </>
                              )}
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">{content.price}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 text-xs text-gray-500">
                            Soumis par {content.type === 'event' ? content.organizer : content.guide} le {new Date(content.submittedAt).toLocaleDateString('fr-FR')} à {new Date(content.submittedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex flex-col space-y-2 ml-4">
                          <Button 
                            onClick={() => handleViewDetails(content)}
                            variant="outline"
                            size="sm"
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Voir
                          </Button>
                          <Button 
                            onClick={() => handleApprove(content.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            size="sm"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approuver
                          </Button>
                          <Button 
                            onClick={() => handleReject(content.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
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
            <Card className="p-12 text-center">
              <div className="text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold mb-2">Aucun contenu en attente</h3>
                <p>Tous les contenus ont été traités !</p>
              </div>
            </Card>
          )}
        </div>

        {/* Modal de détails */}
        {selectedContent && (
          <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Détails du contenu - {selectedContent.title}</span>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Image principale */}
                <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={selectedContent.image} 
                    alt={selectedContent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Informations principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedContent.title}</h3>
                      <p className="text-gray-600">{selectedContent.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={selectedContent.type === 'event' ? 'default' : 'secondary'}>
                        {selectedContent.type === 'event' ? 'Événement' : 'Visite guidée'}
                      </Badge>
                      <Badge variant="outline">{selectedContent.category}</Badge>
                      <Badge 
                        variant={
                          selectedContent.priority === 'high' ? 'destructive' : 
                          selectedContent.priority === 'medium' ? 'outline' : 'secondary'
                        }
                      >
                        {selectedContent.priority === 'high' ? 'Priorité haute' : 
                         selectedContent.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Informations de soumission</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Soumis par :</span>
                          <span className="font-medium">
                            {selectedContent.type === 'event' ? selectedContent.organizer : selectedContent.guide}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date de soumission :</span>
                          <span className="font-medium">
                            {new Date(selectedContent.submittedAt).toLocaleDateString('fr-FR')} à {new Date(selectedContent.submittedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Auto-publication :</span>
                          <span className="font-medium">
                            {new Date(selectedContent.autoPublishAt).toLocaleDateString('fr-FR')} à {new Date(selectedContent.autoPublishAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Temps restant :</span>
                          <span className="font-medium text-orange-600">
                            {getTimeUntilAutoPublish(selectedContent.autoPublishAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Détails spécifiques selon le type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Informations générales</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Lieu :</span>
                        <span className="font-medium">{selectedContent.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Prix :</span>
                        <span className="font-medium text-green-600">{selectedContent.price}</span>
                      </div>
                      {selectedContent.type === 'event' ? (
                        <>
                          <div className="flex items-center space-x-3">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Capacité :</span>
                            <span className="font-medium">{selectedContent.capacity} personnes</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Participants estimés :</span>
                            <span className="font-medium">{selectedContent.estimatedParticipants}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center space-x-3">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Durée :</span>
                            <span className="font-medium">{selectedContent.duration}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Taille max du groupe :</span>
                            <span className="font-medium">{selectedContent.maxGroupSize} personnes</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Participants estimés :</span>
                            <span className="font-medium">{selectedContent.estimatedParticipants}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Statistiques de performance</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {selectedContent.estimatedParticipants}
                          </div>
                          <div className="text-gray-600">Participants estimés</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {selectedContent.type === 'event' ? 
                              selectedContent.capacity : 
                              selectedContent.maxGroupSize
                            }
                          </div>
                          <div className="text-gray-600">
                            {selectedContent.type === 'event' ? 'Capacité max' : 'Groupe max'}
                          </div>
                        </div>
                      </div>
                      {selectedContent.type === 'event' && (
                        <div className="mt-4 text-center">
                          <div className="text-sm text-gray-600">
                            Taux d'occupation estimé : 
                            <span className="font-medium text-blue-600 ml-1">
                              {((selectedContent.estimatedParticipants / selectedContent.capacity) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Informations détaillées */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Informations détaillées</h4>
                    
                    {selectedContent.tags && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Tags</h5>
                        <div className="flex flex-wrap gap-1">
                          {selectedContent.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedContent.requirements && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Exigences</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {selectedContent.requirements.map((req: string, index: number) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedContent.specialties && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Spécialités</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {selectedContent.specialties.map((specialty: string, index: number) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                              {specialty}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedContent.languages && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Langues parlées</h5>
                        <div className="flex flex-wrap gap-1">
                          {selectedContent.languages.map((lang: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Contact et informations</h4>
                    
                    {selectedContent.contactInfo && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Email :</span>
                            <span className="font-medium">{selectedContent.contactInfo.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Téléphone :</span>
                            <span className="font-medium">{selectedContent.contactInfo.phone}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedContent.includedItems && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Inclus dans le prix</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {selectedContent.includedItems.map((item: string, index: number) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedContent.additionalInfo && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Informations supplémentaires</h5>
                        <p className="text-sm text-gray-600">{selectedContent.additionalInfo}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Informations importantes */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
                    Informations importantes
                  </h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>• Ce contenu a été soumis pour validation et sera publié automatiquement si non traité dans les 48h</p>
                    <p>• L'organisateur/guide a été notifié de la soumission</p>
                    <p>• Une fois approuvé, le contenu sera immédiatement visible par tous les utilisateurs</p>
                    <p>• En cas de rejet, l'organisateur/guide recevra une notification avec la raison</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDetailsModalOpen(false)}
                >
                  Fermer
                </Button>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => {
                      setIsDetailsModalOpen(false);
                      handleApprove(selectedContent.id);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approuver
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsDetailsModalOpen(false);
                      handleReject(selectedContent.id);
                    }}
                    variant="destructive"
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
