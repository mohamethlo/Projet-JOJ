import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  MapPin, 
  Clock,
  BarChart3,
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle,
  Star,
  Heart,
  Share2,
  Image as ImageIcon,
  DollarSign,
  Calendar,
  User
} from 'lucide-react';
import { GuideDetailsModal, GuideEditModal } from '@/components/modals';
import { toast } from 'sonner';

// Données mock pour les visites guidées du guide
const mockGuideTours = [
  {
    id: '1',
    name: 'Visite Historique de Saint-Louis',
    description: 'Découvrez l\'histoire fascinante de Saint-Louis, première capitale du Sénégal, avec ses bâtiments coloniaux et son patrimoine culturel unique.',
    location: 'Saint-Louis',
    specialties: ['Histoire', 'Culture', 'Patrimoine'],
    languages: ['Français', 'Wolof', 'Anglais'],
    price: '25,000 FCFA',
    duration: '4 heures',
    maxGroupSize: 15,
    rating: 4.8,
    reviews: 45,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    status: 'Disponible',
    submittedAt: '2024-01-10T10:00:00.000Z',
    autoPublishAt: '2024-01-12T10:00:00.000Z',
    validatedBy: 'Admin',
    validatedAt: '2024-01-11T14:30:00.000Z',
    guideId: '2',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    views: 1250,
    likes: 89,
    bookings: 23,
    availability: ['Lundi', 'Mercredi', 'Vendredi', 'Dimanche'],
    meetingPoint: 'Place Faidherbe, Saint-Louis',
    includes: ['Guide professionnel', 'Visite des monuments', 'Explications historiques'],
    requirements: ['Chaussures confortables', 'Bouteille d\'eau', 'Appareil photo'],
    contact: '+221 77 123 45 67',
    email: 'guide@email.com'
  },
  {
    id: '2',
    name: 'Tour Gastronomique de Dakar',
    description: 'Explorez la cuisine sénégalaise authentique à travers les marchés et restaurants traditionnels de Dakar.',
    location: 'Dakar',
    specialties: ['Gastronomie', 'Culture', 'Marchés'],
    languages: ['Français', 'Wolof'],
    price: '35,000 FCFA',
    duration: '5 heures',
    maxGroupSize: 12,
    rating: 4.6,
    reviews: 32,
    image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    status: 'Auto-publié',
    submittedAt: '2024-01-12T09:00:00.000Z',
    autoPublishAt: '2024-01-14T09:00:00.000Z',
    validatedBy: null,
    validatedAt: null,
    guideId: '2',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-18',
    views: 890,
    likes: 67,
    bookings: 18,
    availability: ['Mardi', 'Jeudi', 'Samedi'],
    meetingPoint: 'Marché Kermel, Dakar',
    includes: ['Guide gastronomique', 'Dégustations', 'Visite des marchés'],
    requirements: ['Appétit', 'Carnet de notes'],
    contact: '+221 77 123 45 67',
    email: 'guide@email.com'
  },
  {
    id: '3',
    name: 'Excursion Nature à la Réserve de Bandia',
    description: 'Découvrez la faune et la flore du Sénégal dans cette réserve naturelle exceptionnelle.',
    location: 'Thiès',
    specialties: ['Nature', 'Faune', 'Écologie'],
    languages: ['Français', 'Anglais'],
    price: '45,000 FCFA',
    duration: '6 heures',
    maxGroupSize: 20,
    rating: 4.9,
    reviews: 28,
    image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    status: 'En attente',
    submittedAt: '2024-01-20T16:00:00.000Z',
    autoPublishAt: '2024-01-22T16:00:00.000Z',
    validatedBy: null,
    validatedAt: null,
    guideId: '2',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    views: 0,
    likes: 0,
    bookings: 0,
    availability: ['Samedi', 'Dimanche'],
    meetingPoint: 'Entrée de la Réserve de Bandia',
    includes: ['Guide naturaliste', 'Transport', 'Déjeuner'],
    requirements: ['Vêtements confortables', 'Chapeau', 'Crème solaire'],
    contact: '+221 77 123 45 67',
    email: 'guide@email.com'
  }
];

const GuideManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [activeTab, setActiveTab] = useState('list');
  const [tours, setTours] = useState(mockGuideTours);
  
  // Données mock pour les visites guidées supprimées
  const mockDeletedTours = [
    {
      id: 'deleted-1',
      name: 'Visite des Îles de la Madeleine',
      description: 'Excursion en bateau vers les îles de la Madeleine avec observation des oiseaux marins.',
      location: 'Dakar',
      specialties: ['Nature', 'Oiseaux', 'Excursion'],
      languages: ['Français'],
      price: '30,000 FCFA',
      duration: '3 heures',
      maxGroupSize: 10,
      rating: 4.3,
      reviews: 15,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: [
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      status: 'Disponible',
      guideId: '2',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-10',
      views: 320,
      likes: 18,
      bookings: 8,
      availability: ['Samedi', 'Dimanche'],
      meetingPoint: 'Port de Dakar',
      includes: ['Guide', 'Bateau', 'Équipement d\'observation'],
      requirements: ['Vêtements chauds', 'Jumelles'],
      contact: '+221 77 123 45 67',
      email: 'guide@email.com',
      deletedAt: '2024-01-15T10:30:00.000Z',
      deletedBy: 'Guide'
    }
  ];

  const [deletedTours, setDeletedTours] = useState(mockDeletedTours);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [editMode, setEditMode] = useState<'create' | 'edit'>('create');

  const locations = ['Tous', 'Dakar', 'Saint-Louis', 'Thiès', 'Kaolack', 'Ziguinchor', 'Mbour'];
  const statuses = ['Tous', 'Disponible', 'Auto-publié', 'En attente', 'Brouillon', 'Rejeté', 'Suspendu'];

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

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === '' || selectedLocation === 'Tous' || tour.location === selectedLocation;
    const matchesStatus = selectedStatus === '' || selectedStatus === 'Tous' || tour.status === selectedStatus;
    
    return matchesSearch && matchesLocation && matchesStatus;
  });

  const handleViewTour = (tour: any) => {
    setSelectedTour(tour);
    setIsDetailsModalOpen(true);
  };

  const handleEditTour = (tour: any) => {
    setSelectedTour(tour);
    setEditMode('edit');
    setIsEditModalOpen(true);
  };

  const handleCreateTour = () => {
    try {
      setSelectedTour(null);
      setEditMode('create');
      setIsEditModalOpen(true);
      
      toast.info('Création de visite guidée', {
        description: 'Formulaire de création de visite guidée ouvert.'
      });
    } catch (error) {
      toast.error('Erreur lors de l\'ouverture du formulaire', {
        description: 'Une erreur est survenue lors de l\'ouverture du formulaire de création.'
      });
    }
  };

  const handleSaveTour = (tourData: any) => {
    try {
      if (editMode === 'create') {
        const now = new Date();
        const autoPublishAt = new Date(now.getTime() + 48 * 60 * 60 * 1000); // +48h
        
        const newTour = {
          ...tourData,
          id: Date.now().toString(),
          guideId: user?.id || '2',
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          views: 0,
          likes: 0,
          bookings: 0,
          reviews: 0,
          status: 'En attente',
          submittedAt: now.toISOString(),
          autoPublishAt: autoPublishAt.toISOString(),
          validatedBy: null,
          validatedAt: null
        };
        setTours(prev => [...prev, newTour]);
        
        toast.success('Visite guidée soumise avec succès', {
          description: `La visite guidée "${tourData.name}" a été soumise pour validation. Publication automatique dans 48h.`
        });
      } else {
        setTours(prev => prev.map(tour => 
          tour.id === tourData.id ? { ...tour, ...tourData, updatedAt: new Date().toISOString().split('T')[0] } : tour
        ));
        
        toast.success('Visite guidée modifiée avec succès', {
          description: `La visite guidée "${tourData.name}" a été modifiée avec succès.`
        });
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde', {
        description: 'Une erreur est survenue lors de la sauvegarde de la visite guidée.'
      });
    }
  };

  const handleDeleteTour = (tourId: string) => {
    const tourToDelete = tours.find(t => t.id === tourId);
    if (tourToDelete) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir supprimer la visite guidée "${tourToDelete.name}" ?\n\n` +
        `Cette visite guidée sera déplacée vers la corbeille et pourra être restaurée plus tard.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          const deletedTour = {
            ...tourToDelete,
            deletedAt: new Date().toISOString(),
            deletedBy: user?.name || 'Guide'
          };
          setDeletedTours(prev => [...prev, deletedTour]);
          setTours(prev => prev.filter(t => t.id !== tourId));
          
          toast.success('Visite guidée supprimée avec succès', {
            description: `La visite guidée "${tourToDelete.name}" a été déplacée vers la corbeille.`
          });
        } catch (error) {
          toast.error('Erreur lors de la suppression', {
            description: 'Une erreur est survenue lors de la suppression de la visite guidée.'
          });
        }
      }
    }
  };

  const handleRestoreTour = (tourId: string) => {
    const tourToRestore = deletedTours.find(t => t.id === tourId);
    if (tourToRestore) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir restaurer la visite guidée "${tourToRestore.name}" ?\n\n` +
        `Cette visite guidée sera remise dans la liste des visites guidées actives.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          const { deletedAt, deletedBy, ...restoredTour } = tourToRestore;
          setTours(prev => [...prev, restoredTour]);
          setDeletedTours(prev => prev.filter(t => t.id !== tourId));
          
          toast.success('Visite guidée restaurée avec succès', {
            description: `La visite guidée "${tourToRestore.name}" a été restaurée et est maintenant active.`
          });
        } catch (error) {
          toast.error('Erreur lors de la restauration', {
            description: 'Une erreur est survenue lors de la restauration de la visite guidée.'
          });
        }
      }
    }
  };

  const handleSubmitTour = (tourId: string) => {
    const tour = tours.find(t => t.id === tourId);
    if (tour) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir soumettre la visite guidée "${tour.name}" pour validation ?\n\n` +
        `La visite guidée sera publiée automatiquement dans 48h si non validée par l'admin.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          const now = new Date();
          const autoPublishAt = new Date(now.getTime() + 48 * 60 * 60 * 1000); // +48h
          
          setTours(prev => prev.map(t => 
            t.id === tourId ? { 
              ...t, 
              status: 'En attente',
              submittedAt: now.toISOString(),
              autoPublishAt: autoPublishAt.toISOString(),
              validatedBy: null,
              validatedAt: null,
              updatedAt: new Date().toISOString().split('T')[0] 
            } : t
          ));
          
          toast.success('Visite guidée soumise avec succès', {
            description: `La visite guidée "${tour.name}" a été soumise pour validation. Publication automatique dans 48h.`
          });
        } catch (error) {
          toast.error('Erreur lors de la soumission', {
            description: 'Une erreur est survenue lors de la soumission de la visite guidée.'
          });
        }
      }
    }
  };

  const handleCancelSubmission = (tourId: string) => {
    const tour = tours.find(t => t.id === tourId);
    if (tour) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir annuler la soumission de la visite guidée "${tour.name}" ?\n\n` +
        `La visite guidée retournera au statut "Brouillon".\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          setTours(prev => prev.map(t => 
            t.id === tourId ? { 
              ...t, 
              status: 'Brouillon',
              submittedAt: null,
              autoPublishAt: null,
              validatedBy: null,
              validatedAt: null,
              updatedAt: new Date().toISOString().split('T')[0] 
            } : t
          ));
          
          toast.success('Soumission annulée avec succès', {
            description: `La visite guidée "${tour.name}" est maintenant en brouillon.`
          });
        } catch (error) {
          toast.error('Erreur lors de l\'annulation', {
            description: 'Une erreur est survenue lors de l\'annulation de la soumission.'
          });
        }
      }
    }
  };

  const handlePermanentDeleteTour = (tourId: string) => {
    const tourToDelete = deletedTours.find(t => t.id === tourId);
    if (tourToDelete) {
      const confirmed = window.confirm(
        `⚠️ ATTENTION - SUPPRESSION DÉFINITIVE ⚠️\n\n` +
        `Vous êtes sur le point de supprimer définitivement la visite guidée "${tourToDelete.name}".\n\n` +
        `Cette action est IRRÉVERSIBLE et la visite guidée ne pourra plus être récupérée.\n\n` +
        `Êtes-vous absolument sûr de vouloir continuer ?\n\n` +
        `Tapez "SUPPRIMER" dans la prochaine boîte de dialogue pour confirmer.`
      );
      
      if (confirmed) {
        const doubleConfirm = window.prompt(
          `Pour confirmer la suppression définitive, tapez exactement : SUPPRIMER\n\n` +
          `Visite guidée à supprimer : "${tourToDelete.name}"`
        );
        
        if (doubleConfirm === 'SUPPRIMER') {
          try {
            setDeletedTours(prev => prev.filter(t => t.id !== tourId));
            
            toast.success('Visite guidée supprimée définitivement', {
              description: `La visite guidée "${tourToDelete.name}" a été supprimée définitivement.`
            });
          } catch (error) {
            toast.error('Erreur lors de la suppression définitive', {
              description: 'Une erreur est survenue lors de la suppression définitive de la visite guidée.'
            });
          }
        } else if (doubleConfirm !== null) {
          toast.error('Confirmation incorrecte', {
            description: 'La confirmation n\'était pas correcte. La visite guidée n\'a pas été supprimée.'
          });
        }
      }
    }
  };

  // Calculs des statistiques
  const totalTours = tours.length;
  const availableTours = tours.filter(t => t.status === 'Disponible').length;
  const autoPublishedTours = tours.filter(t => t.status === 'Auto-publié').length;
  const pendingTours = tours.filter(t => t.status === 'En attente').length;
  const draftTours = tours.filter(t => t.status === 'Brouillon').length;
  const rejectedTours = tours.filter(t => t.status === 'Rejeté').length;
  const suspendedTours = tours.filter(t => t.status === 'Suspendu').length;
  const totalBookings = tours.reduce((sum, tour) => sum + tour.bookings, 0);
  const totalViews = tours.reduce((sum, tour) => sum + tour.views, 0);
  const totalLikes = tours.reduce((sum, tour) => sum + tour.likes, 0);
  const totalReviews = tours.reduce((sum, tour) => sum + tour.reviews, 0);
  const averageRating = totalReviews > 0 ? (tours.reduce((sum, tour) => sum + (tour.rating * tour.reviews), 0) / totalReviews).toFixed(1) : '0';

  // Vérifier que l'utilisateur est guide
  if (!user || user.role !== 'guide') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-red-500" />
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
                <Users className="h-8 w-8 mr-3 text-blue-600" />
                Mes Visites Guidées
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez vos visites guidées, suivez les réservations et analysez les performances
              </p>
            </div>
            <Button onClick={handleCreateTour} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle visite guidée
            </Button>
          </div>
        </div>

        {/* Onglets */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Mes visites guidées</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Statistiques</span>
            </TabsTrigger>
            <TabsTrigger value="deleted" className="flex items-center space-x-2">
              <Trash2 className="h-4 w-4" />
              <span>Visites guidées supprimées</span>
              {deletedTours.length > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {deletedTours.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            {/* Barre de recherche et filtres */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Rechercher une visite guidée..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrer par localisation" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center text-sm text-gray-600">
                    <Filter className="h-4 w-4 mr-2" />
                    {filteredTours.length} visite(s) trouvée(s)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liste des visites guidées */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredTours.map((tour) => (
                <Card key={tour.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Image de la visite guidée */}
                  {tour.image && (
                    <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
                      <img 
                        src={tour.image} 
                        alt={tour.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {/* Badge de statut */}
                      <div className="absolute top-3 right-3">
                        <Badge 
                          variant={
                            tour.status === 'Disponible' ? 'default' : 
                            tour.status === 'Auto-publié' ? 'secondary' :
                            tour.status === 'En attente' ? 'outline' : 
                            tour.status === 'Brouillon' ? 'secondary' :
                            tour.status === 'Rejeté' ? 'destructive' :
                            tour.status === 'Suspendu' ? 'destructive' : 'outline'
                          }
                        >
                          {tour.status}
                        </Badge>
                      </div>
                      
                      {/* Compte à rebours pour les visites en attente */}
                      {tour.status === 'En attente' && tour.autoPublishAt && (
                        <div className="absolute top-3 left-3">
                          <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                            <Clock className="h-3 w-3 mr-1" />
                            {getTimeUntilAutoPublish(tour.autoPublishAt)}
                          </Badge>
                        </div>
                      )}
                      {/* Indicateur d'images multiples */}
                      {tour.images && tour.images.length > 1 && tour.status !== 'En attente' && (
                        <div className="absolute top-3 left-3">
                          <Badge variant="outline" className="bg-white/90">
                            <ImageIcon className="h-3 w-3 mr-1" />
                            {tour.images.length}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">{tour.location}</Badge>
                        <Badge variant="outline" className="text-xs">{tour.duration}</Badge>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{tour.name}</h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{tour.description}</p>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {tour.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {tour.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Max {tour.maxGroupSize} personnes
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          {tour.price}
                        </div>
                      </div>

                      {/* Informations de validation */}
                      {tour.status === 'Disponible' && tour.validatedBy && (
                        <div className="bg-green-50 p-2 rounded-lg">
                          <div className="text-xs text-green-700">
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Validé par {tour.validatedBy} le {new Date(tour.validatedAt).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {tour.status === 'Auto-publié' && (
                        <div className="bg-orange-50 p-2 rounded-lg">
                          <div className="text-xs text-orange-700">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Publié automatiquement le {new Date(tour.autoPublishAt).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {tour.status === 'En attente' && (
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <div className="text-xs text-blue-700">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Soumis le {new Date(tour.submittedAt).toLocaleDateString('fr-FR')} - Publication dans {getTimeUntilAutoPublish(tour.autoPublishAt)}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-3">
                          <span className="text-blue-600 font-medium flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {tour.views}
                          </span>
                          <span className="text-red-600 font-medium flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {tour.likes}
                          </span>
                          <span className="text-green-600 font-medium flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {tour.bookings}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{tour.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({tour.reviews})</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewTour(tour)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Voir
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditTour(tour)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Modifier
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-1">
                        {tour.status === 'Brouillon' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-blue-500 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleSubmitTour(tour.id)}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Soumettre
                          </Button>
                        )}
                        
                        {tour.status === 'En attente' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-orange-500 text-orange-600 hover:bg-orange-50"
                            onClick={() => handleCancelSubmission(tour.id)}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Annuler
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs border-red-500 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteTour(tour.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            {/* Statistiques générales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total visites guidées</p>
                      <p className="text-2xl font-bold text-gray-900">{totalTours}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Visites disponibles</p>
                      <p className="text-2xl font-bold text-green-600">{availableTours}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Auto-publiées</p>
                      <p className="text-2xl font-bold text-orange-600">{autoPublishedTours}</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total réservations</p>
                      <p className="text-2xl font-bold text-purple-600">{totalBookings}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Note moyenne</p>
                      <p className="text-2xl font-bold text-orange-600">{averageRating}</p>
                    </div>
                    <Star className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statistiques détaillées */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Répartition par statut
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="default">Disponible</Badge>
                        <span className="text-sm text-gray-600">{availableTours} visites</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {totalTours > 0 ? ((availableTours / totalTours) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Brouillon</Badge>
                        <span className="text-sm text-gray-600">{draftTours} visites</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {totalTours > 0 ? ((draftTours / totalTours) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="destructive">Suspendu</Badge>
                        <span className="text-sm text-gray-600">{suspendedTours} visites</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {totalTours > 0 ? ((suspendedTours / totalTours) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Total vues</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{totalViews}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-gray-600">Total likes</span>
                      </div>
                      <span className="text-lg font-bold text-red-600">{totalLikes}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">Total réservations</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">{totalBookings}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm text-gray-600">Total avis</span>
                      </div>
                      <span className="text-lg font-bold text-yellow-600">{totalReviews}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deleted" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Visites guidées supprimées</h3>
                    <p className="text-gray-600 mt-1">
                      {deletedTours.length} visite(s) supprimée(s)
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive" className="text-sm">
                      <Trash2 className="h-3 w-3 mr-1" />
                      {deletedTours.length} supprimée(s)
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {deletedTours.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {deletedTours.map((tour) => (
                  <Card key={tour.id} className="hover:shadow-lg transition-shadow overflow-hidden border-red-200 bg-red-50">
                    {/* Image de la visite guidée */}
                    {tour.image && (
                      <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
                        <img 
                          src={tour.image} 
                          alt={tour.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 opacity-75"
                        />
                        <div className="absolute inset-0 bg-red-900 bg-opacity-30 flex items-center justify-center">
                          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            <Trash2 className="h-4 w-4 inline mr-1" />
                            Supprimée
                          </div>
                        </div>
                        {/* Indicateur d'images multiples */}
                        {tour.images && tour.images.length > 1 && (
                          <div className="absolute top-3 left-3">
                            <Badge variant="outline" className="bg-white/90">
                              <ImageIcon className="h-3 w-3 mr-1" />
                              {tour.images.length}
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">{tour.location}</Badge>
                          <Badge variant="outline" className="text-xs">{tour.duration}</Badge>
                          <Badge className="bg-red-100 text-red-700 text-xs">
                            Supprimée
                          </Badge>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{tour.name}</h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{tour.description}</p>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {tour.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {tour.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            Max {tour.maxGroupSize} personnes
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2" />
                            {tour.price}
                          </div>
                        </div>

                        <div className="bg-red-100 p-3 rounded-lg">
                          <div className="text-xs text-red-700 space-y-1">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Supprimée le: {new Date(tour.deletedAt).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              Par: {tour.deletedBy}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-3">
                            <span className="text-blue-600 font-medium flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {tour.views}
                            </span>
                            <span className="text-red-600 font-medium flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {tour.likes}
                            </span>
                            <span className="text-green-600 font-medium flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {tour.bookings}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{tour.rating}</span>
                            <span className="text-xs text-gray-500 ml-1">({tour.reviews})</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-green-500 text-green-600 hover:bg-green-50"
                            onClick={() => handleRestoreTour(tour.id)}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Restaurer
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-red-500 text-red-600 hover:bg-red-50"
                            onClick={() => handlePermanentDeleteTour(tour.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Supprimer définitivement
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
                  <Trash2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">Aucune visite guidée supprimée</h3>
                  <p>Aucune visite guidée n'a été supprimée pour le moment.</p>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modales */}
      {selectedTour && (
        <GuideDetailsModal
          guide={selectedTour}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}

      <GuideEditModal
        guide={selectedTour}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveTour}
        mode={editMode}
      />
    </div>
  );
};

export default GuideManagementPage;
