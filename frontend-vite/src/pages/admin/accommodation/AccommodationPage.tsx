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
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Building,
  Utensils,
  Home,
  Bed,
  X,
  CheckCircle,
  AlertCircle,
  User,
  Star,
  MapPin,
  Clock,
  DollarSign
} from 'lucide-react';
import { AccommodationDetailsModal, AccommodationEditModal } from '@/components/modals';
import { toast } from 'sonner';

const AccommodationPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  
  // États pour les modales
  const [selectedAccommodation, setSelectedAccommodation] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<'create' | 'edit'>('create');

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
  const mockAccommodations = [
    {
      id: '1',
      name: 'Hôtel Terrou-Bi',
      type: 'Hôtel',
      location: 'Dakar',
      description: 'Hôtel de luxe avec vue sur l\'océan Atlantique. Situé sur la corniche de Dakar, cet établissement 5 étoiles offre un service exceptionnel et des équipements de premier plan.',
      price: '150,000 FCFA',
      rating: 4.5,
      reviews: 120,
      availability: 'Disponible',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: 'Route de la Corniche Ouest, Dakar',
      phone: '+221 33 821 21 21',
      email: 'contact@terroubi.com',
      website: 'https://www.terroubi.com',
      checkIn: '14:00',
      checkOut: '12:00',
      amenities: ['WiFi', 'Parking', 'Piscine', 'Spa', 'Restaurant', 'Bar', 'Gym'],
      policies: ['Annulation gratuite jusqu\'à 24h avant', 'Animaux acceptés', 'Fumeurs autorisés dans certaines zones'],
      images: [
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    },
    {
      id: '2',
      name: 'Restaurant Le Lagon',
      type: 'Restaurant',
      location: 'Saint-Louis',
      description: 'Restaurant gastronomique spécialisé dans la cuisine sénégalaise traditionnelle. Une expérience culinaire authentique dans un cadre historique.',
      price: '25,000 FCFA',
      rating: 4.2,
      reviews: 85,
      availability: 'Disponible',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: 'Rue Blaise Diagne, Saint-Louis',
      phone: '+221 33 961 12 34',
      email: 'info@lelagon.sn',
      checkIn: '12:00',
      checkOut: '23:00',
      amenities: ['WiFi', 'Parking', 'Terrasse', 'Climatisation'],
      policies: ['Réservation recommandée', 'Code vestimentaire décontracté'],
      images: [
        'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    },
    {
      id: '3',
      name: 'Auberge de la Petite Côte',
      type: 'Auberge',
      location: 'Mbour',
      description: 'Auberge familiale au cœur de la Petite Côte. Proche des plages et des sites touristiques, parfait pour un séjour authentique.',
      price: '45,000 FCFA',
      rating: 4.0,
      reviews: 67,
      availability: 'En attente',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: 'Route de Saly, Mbour',
      phone: '+221 33 957 89 01',
      email: 'contact@aubergepetitecote.com',
      checkIn: '15:00',
      checkOut: '11:00',
      amenities: ['WiFi', 'Parking', 'Jardin', 'Cuisine commune'],
      policies: ['Paiement en espèces accepté', 'Petit-déjeuner inclus'],
      images: [
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    },
    {
      id: '4',
      name: 'Villa Océane',
      type: 'Villa',
      location: 'Dakar',
      description: 'Villa de luxe avec piscine privée et vue sur l\'océan. Idéale pour les familles et les groupes.',
      price: '200,000 FCFA',
      rating: 4.8,
      reviews: 45,
      availability: 'Disponible',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: 'Almadies, Dakar',
      phone: '+221 33 820 15 30',
      email: 'reservation@villaoceane.sn',
      checkIn: '16:00',
      checkOut: '10:00',
      amenities: ['WiFi', 'Parking', 'Piscine privée', 'Jardin', 'Cuisine équipée', 'Service de ménage'],
      policies: ['Séjour minimum 3 nuits', 'Caution demandée', 'Animaux non acceptés'],
      images: [
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    },
    {
      id: '5',
      name: 'Résidence Les Palmiers',
      type: 'Résidence',
      location: 'Thiès',
      description: 'Résidence moderne avec appartements meublés. Parfait pour les séjours longue durée.',
      price: '80,000 FCFA',
      rating: 3.9,
      reviews: 32,
      availability: 'Suspendu',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: 'Avenue Léopold Sédar Senghor, Thiès',
      phone: '+221 33 951 45 67',
      email: 'info@residencepalmiers.com',
      checkIn: '14:00',
      checkOut: '12:00',
      amenities: ['WiFi', 'Parking', 'Climatisation', 'Cuisine équipée', 'Lave-linge'],
      policies: ['Séjour minimum 1 mois', 'Paiement mensuel', 'Contrat de location'],
      images: [
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    }
  ];

  const [accommodations, setAccommodations] = useState(mockAccommodations);
  
  // Données mock pour les établissements supprimés
  const mockDeletedAccommodations = [
    {
      id: 'deleted-1',
      name: 'Hôtel du Plateau',
      type: 'Hôtel',
      location: 'Dakar',
      description: 'Ancien hôtel du centre-ville de Dakar, fermé pour rénovation. Établissement historique qui nécessitait des travaux majeurs.',
      price: '75,000 FCFA',
      rating: 3.2,
      reviews: 45,
      availability: 'Disponible',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: 'Avenue Léopold Sédar Senghor, Dakar',
      phone: '+221 33 821 45 67',
      email: 'contact@hotelplateau.sn',
      checkIn: '14:00',
      checkOut: '12:00',
      amenities: ['WiFi', 'Parking', 'Restaurant', 'Climatisation'],
      policies: ['Annulation gratuite 24h avant', 'Animaux non acceptés'],
      images: [
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      deletedAt: '2024-01-10T10:30:00.000Z',
      deletedBy: 'Admin'
    },
    {
      id: 'deleted-2',
      name: 'Restaurant Chez Fatou',
      type: 'Restaurant',
      location: 'Saint-Louis',
      description: 'Restaurant familial spécialisé dans la cuisine traditionnelle sénégalaise. Fermé temporairement pour cause de déménagement.',
      price: '15,000 FCFA',
      rating: 4.1,
      reviews: 78,
      availability: 'Disponible',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: 'Rue des Pêcheurs, Saint-Louis',
      phone: '+221 33 961 23 45',
      email: 'info@chezfatou.sn',
      checkIn: '12:00',
      checkOut: '22:00',
      amenities: ['WiFi', 'Terrasse', 'Climatisation'],
      policies: ['Réservation recommandée', 'Paiement en espèces accepté'],
      images: [
        'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      deletedAt: '2024-01-08T15:45:00.000Z',
      deletedBy: 'Admin'
    },
    {
      id: 'deleted-3',
      name: 'Auberge de la Baie',
      type: 'Auberge',
      location: 'Mbour',
      description: 'Petite auberge au bord de mer, fermée pour non-conformité aux normes de sécurité. Nécessitait des travaux de mise aux normes.',
      price: '35,000 FCFA',
      rating: 3.8,
      reviews: 52,
      availability: 'Disponible',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: 'Route de la Petite Côte, Mbour',
      phone: '+221 33 957 12 34',
      email: 'contact@aubergebaie.com',
      checkIn: '15:00',
      checkOut: '11:00',
      amenities: ['WiFi', 'Parking', 'Plage privée', 'Restaurant'],
      policies: ['Petit-déjeuner inclus', 'Animaux acceptés'],
      images: [
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      deletedAt: '2024-01-05T09:15:00.000Z',
      deletedBy: 'Admin'
    },
    {
      id: 'deleted-4',
      name: 'Résidence Les Cocotiers',
      type: 'Résidence',
      location: 'Thiès',
      description: 'Résidence moderne fermée pour problèmes de gestion. L\'établissement avait des difficultés financières et des plaintes récurrentes des résidents.',
      price: '60,000 FCFA',
      rating: 2.9,
      reviews: 23,
      availability: 'Disponible',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: 'Quartier HLM, Thiès',
      phone: '+221 33 951 78 90',
      email: 'info@cocotiers.sn',
      checkIn: '14:00',
      checkOut: '12:00',
      amenities: ['WiFi', 'Parking', 'Climatisation', 'Cuisine équipée'],
      policies: ['Séjour minimum 1 mois', 'Caution demandée'],
      images: [
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      deletedAt: '2024-01-03T14:20:00.000Z',
      deletedBy: 'Admin'
    }
  ];

  const [deletedAccommodations, setDeletedAccommodations] = useState(mockDeletedAccommodations);

  const types = ['Tous', 'Hôtel', 'Restaurant', 'Auberge', 'Appartement', 'Villa', 'Résidence'];
  const statuses = ['Tous', 'Actif', 'Inactif', 'En attente', 'Suspendu'];
  const locations = ['Tous', 'Dakar', 'Saint-Louis', 'Thiès', 'Kaolack', 'Ziguinchor', 'Mbour', 'Touba'];

  // Fonctions de gestion des actions
  const handleViewAccommodation = (accommodation: any) => {
    setSelectedAccommodation(accommodation);
    setIsDetailsModalOpen(true);
  };

  const handleEditAccommodation = (accommodation: any) => {
    setSelectedAccommodation(accommodation);
    setEditMode('edit');
    setIsEditModalOpen(true);
  };

  const handleCreateAccommodation = () => {
    try {
      setSelectedAccommodation(null);
      setEditMode('create');
      setIsEditModalOpen(true);
      
      toast.info('Création d\'établissement', {
        description: 'Formulaire de création d\'établissement ouvert.'
      });
    } catch (error) {
      toast.error('Erreur lors de l\'ouverture du formulaire', {
        description: 'Une erreur est survenue lors de l\'ouverture du formulaire de création.'
      });
    }
  };

  const handleSaveAccommodation = (accommodationData: any) => {
    try {
      if (editMode === 'create') {
        // Les nouveaux établissements créés par l'admin sont automatiquement disponibles
        const newAccommodation = {
          ...accommodationData,
          availability: 'Disponible'
        };
        setAccommodations(prev => [...prev, newAccommodation]);
        
        toast.success('Établissement créé avec succès', {
          description: `L'établissement "${accommodationData.name}" a été créé et est maintenant disponible.`
        });
      } else {
        setAccommodations(prev => prev.map(accommodation => 
          accommodation.id === accommodationData.id ? accommodationData : accommodation
        ));
        
        toast.success('Établissement modifié avec succès', {
          description: `L'établissement "${accommodationData.name}" a été modifié avec succès.`
        });
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde', {
        description: 'Une erreur est survenue lors de la sauvegarde de l\'établissement.'
      });
    }
  };

  const handleDeleteAccommodation = (accommodationId: string) => {
    const accommodationToDelete = accommodations.find(acc => acc.id === accommodationId);
    if (accommodationToDelete) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'établissement "${accommodationToDelete.name}" ?\n\n` +
        `Cet établissement sera déplacé vers la corbeille et pourra être restauré plus tard.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          // Ajouter à la liste des supprimés avec la date de suppression
          const deletedAccommodation = {
            ...accommodationToDelete,
            deletedAt: new Date().toISOString(),
            deletedBy: user?.name || 'Admin'
          };
          setDeletedAccommodations(prev => [...prev, deletedAccommodation]);
          // Supprimer de la liste active
          setAccommodations(prev => prev.filter(accommodation => accommodation.id !== accommodationId));
          
          toast.success('Établissement supprimé avec succès', {
            description: `L'établissement "${accommodationToDelete.name}" a été déplacé vers la corbeille.`
          });
        } catch (error) {
          toast.error('Erreur lors de la suppression', {
            description: 'Une erreur est survenue lors de la suppression de l\'établissement.'
          });
        }
      }
    }
  };


  const handleSuspendAccommodation = (accommodationId: string) => {
    const accommodation = accommodations.find(acc => acc.id === accommodationId);
    if (accommodation) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir suspendre l'établissement "${accommodation.name}" ?\n\n` +
        `L'établissement sera suspendu et ne sera plus disponible pour les réservations.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          setAccommodations(prev => prev.map(accommodation => 
            accommodation.id === accommodationId ? { ...accommodation, availability: 'Suspendu' } : accommodation
          ));
          
          toast.success('Établissement suspendu avec succès', {
            description: `L'établissement "${accommodation.name}" a été suspendu.`
          });
        } catch (error) {
          toast.error('Erreur lors de la suspension', {
            description: 'Une erreur est survenue lors de la suspension de l\'établissement.'
          });
        }
      }
    }
  };

  const handleActivateAccommodation = (accommodationId: string) => {
    const accommodation = accommodations.find(acc => acc.id === accommodationId);
    if (accommodation) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir activer l'établissement "${accommodation.name}" ?\n\n` +
        `L'établissement sera disponible pour les réservations.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          setAccommodations(prev => prev.map(accommodation => 
            accommodation.id === accommodationId ? { ...accommodation, availability: 'Disponible' } : accommodation
          ));
          
          toast.success('Établissement activé avec succès', {
            description: `L'établissement "${accommodation.name}" est maintenant disponible.`
          });
        } catch (error) {
          toast.error('Erreur lors de l\'activation', {
            description: 'Une erreur est survenue lors de l\'activation de l\'établissement.'
          });
        }
      }
    }
  };

  const handleRestoreAccommodation = (accommodationId: string) => {
    const accommodationToRestore = deletedAccommodations.find(acc => acc.id === accommodationId);
    if (accommodationToRestore) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir restaurer l'établissement "${accommodationToRestore.name}" ?\n\n` +
        `Cet établissement sera remis dans la liste des établissements actifs.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          // Retirer les propriétés de suppression
          const { deletedAt, deletedBy, ...restoredAccommodation } = accommodationToRestore;
          // Ajouter à la liste active
          setAccommodations(prev => [...prev, restoredAccommodation]);
          // Supprimer de la liste des supprimés
          setDeletedAccommodations(prev => prev.filter(accommodation => accommodation.id !== accommodationId));
          
          toast.success('Établissement restauré avec succès', {
            description: `L'établissement "${accommodationToRestore.name}" a été restauré et est maintenant actif.`
          });
        } catch (error) {
          toast.error('Erreur lors de la restauration', {
            description: 'Une erreur est survenue lors de la restauration de l\'établissement.'
          });
        }
      }
    }
  };

  const handlePermanentDeleteAccommodation = (accommodationId: string) => {
    const accommodationToDelete = deletedAccommodations.find(acc => acc.id === accommodationId);
    if (accommodationToDelete) {
      const confirmed = window.confirm(
        `⚠️ ATTENTION - SUPPRESSION DÉFINITIVE ⚠️\n\n` +
        `Vous êtes sur le point de supprimer définitivement l'établissement "${accommodationToDelete.name}".\n\n` +
        `Cette action est IRRÉVERSIBLE et l'établissement ne pourra plus être récupéré.\n\n` +
        `Êtes-vous absolument sûr de vouloir continuer ?\n\n` +
        `Tapez "SUPPRIMER" dans la prochaine boîte de dialogue pour confirmer.`
      );
      
      if (confirmed) {
        const doubleConfirm = window.prompt(
          `Pour confirmer la suppression définitive, tapez exactement : SUPPRIMER\n\n` +
          `Établissement à supprimer : "${accommodationToDelete.name}"`
        );
        
        if (doubleConfirm === 'SUPPRIMER') {
          try {
            setDeletedAccommodations(prev => prev.filter(accommodation => accommodation.id !== accommodationId));
            
            toast.success('Établissement supprimé définitivement', {
              description: `L'établissement "${accommodationToDelete.name}" a été supprimé définitivement.`
            });
          } catch (error) {
            toast.error('Erreur lors de la suppression définitive', {
              description: 'Une erreur est survenue lors de la suppression définitive de l\'établissement.'
            });
          }
        } else if (doubleConfirm !== null) {
          toast.error('Confirmation incorrecte', {
            description: 'La confirmation n\'était pas correcte. L\'établissement n\'a pas été supprimé.'
          });
        }
      }
    }
  };

  const filteredAccommodations = accommodations.filter(accommodation => {
    const matchesSearch = accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         accommodation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         accommodation.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedType || selectedType === 'Tous' || accommodation.type === selectedType;
    const matchesStatus = !selectedStatus || selectedStatus === 'Tous' || 
                         (selectedStatus === 'Actif' && accommodation.availability === 'Disponible') ||
                         (selectedStatus === 'Inactif' && accommodation.availability === 'Indisponible') ||
                         (selectedStatus === 'En attente' && accommodation.availability === 'En attente') ||
                         (selectedStatus === 'Suspendu' && accommodation.availability === 'Suspendu');
    
    const matchesLocation = !selectedLocation || selectedLocation === 'Tous' || accommodation.location === selectedLocation;
    
    return matchesSearch && matchesType && matchesStatus && matchesLocation;
  });

  // Tri des établissements
  const sortedAccommodations = [...filteredAccommodations].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'type':
        return a.type.localeCompare(b.type);
      case 'location':
        return a.location.localeCompare(b.location);
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedStatus('');
    setSelectedLocation('');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Hôtel':
        return <Building className="h-4 w-4" />;
      case 'Restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'Auberge':
        return <Home className="h-4 w-4" />;
      default:
        return <Bed className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible':
        return 'bg-green-100 text-green-700';
      case 'Indisponible':
        return 'bg-red-100 text-red-700';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Suspendu':
        return 'bg-gray-100 text-gray-700';
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
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Hébergements</h1>
              <p className="text-gray-600 mt-1">Administrez tous les établissements de la plateforme</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-700 text-sm">
                {sortedAccommodations.length} établissement(s)
              </Badge>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleCreateAccommodation}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un établissement
              </Button>
            </div>
          </div>

          {/* Onglets */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="list" className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Liste des établissements</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Statistiques</span>
              </TabsTrigger>
              <TabsTrigger value="deleted" className="flex items-center space-x-2">
                <Trash2 className="h-4 w-4" />
                <span>Établissements supprimés</span>
                {deletedAccommodations.length > 0 && (
                  <Badge variant="destructive" className="ml-1 text-xs">
                    {deletedAccommodations.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-6">
              {/* Barre de recherche et filtres */}
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Rechercher un établissement..."
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
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center space-x-2">
                                {getTypeIcon(type)}
                                <span>{type}</span>
                              </div>
                            </SelectItem>
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

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Nom</SelectItem>
                          <SelectItem value="type">Type</SelectItem>
                          <SelectItem value="location">Localisation</SelectItem>
                          <SelectItem value="rating">Note</SelectItem>
                          <SelectItem value="price">Prix</SelectItem>
                          <SelectItem value="reviews">Avis</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4"
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        Filtres
                      </Button>
                    </div>
                  </div>

                  {/* Filtres avancés */}
                  {showFilters && (
                    <div className="mt-6 pt-6 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Localisation</label>
                          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                            <SelectTrigger>
                              <SelectValue placeholder="Localisation" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map(location => (
                                <SelectItem key={location} value={location}>{location}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-end">
                          <Button variant="outline" className="w-full" onClick={clearFilters}>
                            <X className="h-4 w-4 mr-2" />
                            Réinitialiser
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Liste des établissements */}
              {sortedAccommodations.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {sortedAccommodations.map((accommodation) => (
                    <Card key={accommodation.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                      {/* Image de l'établissement */}
                      {accommodation.image && (
                        <div className="w-full h-48 bg-gray-200 overflow-hidden">
                          <img 
                            src={accommodation.image} 
                            alt={accommodation.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <CardContent className="p-4">
                        <div className="space-y-3">
                              <div className="flex items-center space-x-2 mb-2">
                                {getTypeIcon(accommodation.type)}
                            <Badge variant="outline" className="text-xs">{accommodation.type}</Badge>
                            <Badge className={`${getStatusColor(accommodation.availability)} text-xs`}>
                                  {accommodation.availability}
                                </Badge>
                              </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{accommodation.name}</h3>
                            <p className="text-gray-600 text-sm mb-2 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {accommodation.location}
                            </p>
                              <p className="text-gray-700 text-sm mb-3 line-clamp-2">{accommodation.description}</p>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-3">
                              <span className="text-yellow-600 font-medium flex items-center">
                                <Star className="h-3 w-3 mr-1" />
                                {accommodation.rating}
                              </span>
                              <span className="text-gray-500">({accommodation.reviews} avis)</span>
                            </div>
                            <span className="font-semibold text-green-600">{accommodation.price}</span>
                          </div>

                          <div className="grid grid-cols-3 gap-2 pt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs"
                              onClick={() => handleViewAccommodation(accommodation)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Voir
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs"
                              onClick={() => handleEditAccommodation(accommodation)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Modifier
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs border-red-500 text-red-600 hover:bg-red-50"
                              onClick={() => {
                                if (window.confirm('Êtes-vous sûr de vouloir supprimer cet établissement ?')) {
                                  handleDeleteAccommodation(accommodation.id);
                                }
                              }}
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
              ) : (
                <Card className="p-12 text-center">
                  <div className="text-gray-500">
                    <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">Aucun établissement trouvé</h3>
                    <p>Essayez de modifier vos critères de recherche ou vos filtres.</p>
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="mt-4"
                    >
                      Réinitialiser les filtres
                    </Button>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              {/* Statistiques générales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Building className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Total établissements</p>
                        <p className="text-2xl font-bold">{accommodations.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Disponibles</p>
                        <p className="text-2xl font-bold">
                          {accommodations.filter(a => a.availability === 'Disponible').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-8 w-8 text-yellow-600" />
                      <div>
                        <p className="text-sm text-gray-600">En attente</p>
                        <p className="text-2xl font-bold">
                          {accommodations.filter(a => a.availability === 'En attente').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Note moyenne</p>
                        <p className="text-2xl font-bold">
                          {accommodations.length > 0 ? (accommodations.reduce((acc, a) => acc + a.rating, 0) / accommodations.length).toFixed(1) : '0.0'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Statistiques détaillées */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Établissements par type */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      <span>Établissements par type</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {types.slice(1).map(type => {
                        const count = accommodations.filter(a => a.type === type).length;
                        const percentage = accommodations.length > 0 ? Math.round((count / accommodations.length) * 100) : 0;
                        return (
                          <div key={type} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${
                                type === 'Hôtel' ? 'bg-blue-500' :
                                type === 'Restaurant' ? 'bg-orange-500' :
                                type === 'Auberge' ? 'bg-green-500' :
                                type === 'Villa' ? 'bg-purple-500' :
                                type === 'Résidence' ? 'bg-pink-500' :
                                'bg-gray-500'
                              }`}></div>
                              <span className="text-sm font-medium">{type}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">{count}</span>
                              <span className="text-xs text-gray-500">({percentage}%)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Établissements par statut */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      <span>Établissements par statut</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['Disponible', 'En attente', 'Suspendu', 'Indisponible'].map(status => {
                        const count = accommodations.filter(a => a.availability === status).length;
                        const percentage = accommodations.length > 0 ? Math.round((count / accommodations.length) * 100) : 0;
                        return (
                          <div key={status} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${
                                status === 'Disponible' ? 'bg-green-500' :
                                status === 'En attente' ? 'bg-yellow-500' :
                                status === 'Suspendu' ? 'bg-red-500' :
                                'bg-gray-500'
                              }`}></div>
                              <span className="text-sm font-medium">{status}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">{count}</span>
                              <span className="text-xs text-gray-500">({percentage}%)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top établissements et localisations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top établissements par note */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-purple-600" />
                      <span>Top établissements par note</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {accommodations
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 5)
                        .map((accommodation, index) => (
                          <div key={accommodation.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-purple-600">#{index + 1}</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium line-clamp-1">{accommodation.name}</p>
                                <p className="text-xs text-gray-500">{accommodation.type} • {accommodation.location}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-purple-600">{accommodation.rating}/5</p>
                              <p className="text-xs text-gray-500">{accommodation.reviews} avis</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top localisations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span>Top localisations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(
                        accommodations.reduce((acc, accommodation) => {
                          acc[accommodation.location] = (acc[accommodation.location] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      )
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 5)
                        .map(([location, count], index) => (
                          <div key={location} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-blue-600">#{index + 1}</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium">{location}</p>
                                <p className="text-xs text-gray-500">Ville</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-blue-600">{count}</p>
                              <p className="text-xs text-gray-500">établissement{count > 1 ? 's' : ''}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Statistiques d'engagement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Statistiques d'engagement</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {accommodations.reduce((acc, a) => acc + a.reviews, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">Avis total</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Moyenne: {accommodations.length > 0 ? Math.round(accommodations.reduce((acc, a) => acc + a.reviews, 0) / accommodations.length) : 0} par établissement
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {accommodations.length > 0 ? (accommodations.reduce((acc, a) => acc + a.rating, 0) / accommodations.length).toFixed(1) : '0.0'}
                      </div>
                      <div className="text-sm text-blue-600">Note moyenne</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Sur 5 étoiles
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {accommodations.filter(a => a.availability === 'Disponible').length > 0 ? 
                          Math.round((accommodations.filter(a => a.availability === 'Disponible').length / accommodations.length) * 100) : 0}%
                      </div>
                      <div className="text-sm text-purple-600">Taux de disponibilité</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Établissements disponibles / Total
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deleted" className="space-y-6">
              {/* Header pour les établissements supprimés */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Établissements supprimés</h3>
                      <p className="text-gray-600 mt-1">
                        {deletedAccommodations.length} établissement(s) supprimé(s)
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="destructive" className="text-sm">
                        <Trash2 className="h-3 w-3 mr-1" />
                        {deletedAccommodations.length} supprimé(s)
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Liste des établissements supprimés */}
              {deletedAccommodations.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {deletedAccommodations.map((accommodation) => (
                    <Card key={accommodation.id} className="hover:shadow-lg transition-shadow overflow-hidden border-red-200 bg-red-50">
                      {/* Image de l'établissement */}
                      {accommodation.image && (
                        <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
                          <img 
                            src={accommodation.image} 
                            alt={accommodation.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 opacity-75"
                          />
                          {/* Overlay de suppression */}
                          <div className="absolute inset-0 bg-red-900 bg-opacity-30 flex items-center justify-center">
                            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                              <Trash2 className="h-4 w-4 inline mr-1" />
                              Supprimé
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 mb-2">
                            {getTypeIcon(accommodation.type)}
                            <Badge variant="outline" className="text-xs">{accommodation.type}</Badge>
                            <Badge className="bg-red-100 text-red-700 text-xs">
                              Supprimé
                            </Badge>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{accommodation.name}</h3>
                            <p className="text-gray-600 text-sm mb-2 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {accommodation.location}
                            </p>
                            <p className="text-gray-700 text-sm mb-3 line-clamp-2">{accommodation.description}</p>
                          </div>

                          {/* Informations de suppression */}
                          <div className="bg-red-100 p-3 rounded-lg">
                            <div className="text-xs text-red-700 space-y-1">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Supprimé le: {new Date(accommodation.deletedAt).toLocaleDateString('fr-FR')}
                              </div>
                              <div className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                Par: {accommodation.deletedBy}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-3">
                              <span className="text-yellow-600 font-medium flex items-center">
                                <Star className="h-3 w-3 mr-1" />
                                {accommodation.rating}
                              </span>
                              <span className="text-gray-500">({accommodation.reviews} avis)</span>
                            </div>
                            <span className="font-semibold text-green-600">{accommodation.price}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs border-green-500 text-green-600 hover:bg-green-50"
                              onClick={() => handleRestoreAccommodation(accommodation.id)}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Restaurer
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs border-red-500 text-red-600 hover:bg-red-50"
                              onClick={() => handlePermanentDeleteAccommodation(accommodation.id)}
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
                    <h3 className="text-lg font-semibold mb-2">Aucun établissement supprimé</h3>
                    <p>Aucun établissement n'a été supprimé pour le moment.</p>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modales */}
      {selectedAccommodation && (
        <AccommodationDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => { setIsDetailsModalOpen(false); setSelectedAccommodation(null); }}
          accommodation={selectedAccommodation}
          onEdit={handleEditAccommodation}
          onDelete={handleDeleteAccommodation}
          onSuspend={handleSuspendAccommodation}
          onActivate={handleActivateAccommodation}
        />
      )}
      <AccommodationEditModal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setSelectedAccommodation(null); }}
        accommodation={selectedAccommodation}
        onSave={handleSaveAccommodation}
        mode={editMode}
      />
    </div>
  );
};

export default AccommodationPage;
