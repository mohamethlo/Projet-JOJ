import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  MapPin, 
  Clock,
  BarChart3,
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Image as ImageIcon,
  Star,
  Heart,
  Share2,
  Download,
  MoreVertical
} from 'lucide-react';
import { EventDetailsModal, EventEditModal } from '@/components/modals';
import { toast } from 'sonner';

// Données mock pour les événements de l'organisateur
const mockOrganizerEvents = [
  {
    id: '1',
    title: 'Festival de Jazz de Saint-Louis',
    description: 'Un festival de jazz exceptionnel avec des artistes internationaux dans la ville historique de Saint-Louis.',
    category: 'Musique',
    type: 'Culturel',
    date: '2024-02-15',
    time: '19:00',
    location: 'Saint-Louis',
    address: 'Place Faidherbe, Saint-Louis',
    price: '15,000 FCFA',
    capacity: 500,
    currentParticipants: 320,
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    status: 'Publié',
    submittedAt: '2024-01-10T10:00:00.000Z',
    autoPublishAt: '2024-01-12T10:00:00.000Z',
    validatedBy: 'Admin',
    validatedAt: '2024-01-11T14:30:00.000Z',
    organizer: 'Moussa Diallo',
    organizerId: '4',
    tags: ['Jazz', 'Musique', 'Culture'],
    requirements: ['Billet d\'entrée', 'Pièce d\'identité'],
    contact: '+221 77 456 78 90',
    email: 'moussa.diallo@email.com',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    views: 1250,
    likes: 89,
    shares: 23
  },
  {
    id: '2',
    title: 'Tournoi de Football Local',
    description: 'Tournoi de football amateur ouvert à tous les clubs de la région de Thiès.',
    category: 'Sport',
    type: 'Sportif',
    date: '2024-02-20',
    time: '14:00',
    location: 'Thiès',
    address: 'Stade Alassane Djigo, Thiès',
    price: 'Gratuit',
    capacity: 200,
    currentParticipants: 180,
    image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    status: 'Publié',
    submittedAt: '2024-01-12T09:00:00.000Z',
    autoPublishAt: '2024-01-14T09:00:00.000Z',
    validatedBy: 'Admin',
    validatedAt: '2024-01-13T11:15:00.000Z',
    organizer: 'Moussa Diallo',
    organizerId: '4',
    tags: ['Football', 'Sport', 'Tournoi'],
    requirements: ['Certificat médical', 'Licence de joueur'],
    contact: '+221 77 456 78 90',
    email: 'moussa.diallo@email.com',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-18',
    views: 890,
    likes: 67,
    shares: 15
  },
  {
    id: '3',
    title: 'Atelier de Cuisine Traditionnelle',
    description: 'Apprenez à préparer les plats traditionnels sénégalais avec des chefs expérimentés.',
    category: 'Gastronomie',
    type: 'Atelier',
    date: '2024-02-25',
    time: '10:00',
    location: 'Dakar',
    address: 'Centre Culturel Blaise Senghor, Dakar',
    price: '25,000 FCFA',
    capacity: 30,
    currentParticipants: 0,
    image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    status: 'En attente',
    submittedAt: '2024-01-20T16:00:00.000Z',
    autoPublishAt: '2024-01-22T16:00:00.000Z',
    validatedBy: null,
    validatedAt: null,
    organizer: 'Moussa Diallo',
    organizerId: '4',
    tags: ['Cuisine', 'Tradition', 'Apprentissage'],
    requirements: ['Tablier', 'Carnet de notes'],
    contact: '+221 77 456 78 90',
    email: 'moussa.diallo@email.com',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    views: 0,
    likes: 0,
    shares: 0
  },
  {
    id: '4',
    title: 'Conférence sur l\'Entrepreneuriat',
    description: 'Conférence avec des entrepreneurs sénégalais à succès pour partager leurs expériences.',
    category: 'Éducation',
    type: 'Conférence',
    date: '2024-03-05',
    time: '15:00',
    location: 'Kaolack',
    address: 'Chambre de Commerce, Kaolack',
    price: '10,000 FCFA',
    capacity: 100,
    currentParticipants: 45,
    image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    status: 'Auto-publié',
    submittedAt: '2024-01-08T14:00:00.000Z',
    autoPublishAt: '2024-01-10T14:00:00.000Z',
    validatedBy: null,
    validatedAt: null,
    organizer: 'Moussa Diallo',
    organizerId: '4',
    tags: ['Entrepreneuriat', 'Business', 'Conférence'],
    requirements: ['Inscription préalable'],
    contact: '+221 77 456 78 90',
    email: 'moussa.diallo@email.com',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-22',
    views: 650,
    likes: 34,
    shares: 8
  },
  {
    id: '5',
    title: 'Exposition d\'Art Contemporain',
    description: 'Exposition d\'œuvres d\'artistes sénégalais contemporains dans un cadre moderne.',
    category: 'Art',
    type: 'Exposition',
    date: '2024-03-10',
    time: '16:00',
    location: 'Dakar',
    address: 'Musée des Civilisations Noires, Dakar',
    price: '5,000 FCFA',
    capacity: 150,
    currentParticipants: 0,
    image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    status: 'En attente',
    submittedAt: '2024-01-25T11:30:00.000Z',
    autoPublishAt: '2024-01-27T11:30:00.000Z',
    validatedBy: null,
    validatedAt: null,
    organizer: 'Moussa Diallo',
    organizerId: '4',
    tags: ['Art', 'Exposition', 'Culture'],
    requirements: ['Respect des œuvres'],
    contact: '+221 77 456 78 90',
    email: 'moussa.diallo@email.com',
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25',
    views: 0,
    likes: 0,
    shares: 0
  }
];

const OrganizerEventsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [activeTab, setActiveTab] = useState('list');
  const [events, setEvents] = useState(mockOrganizerEvents);
  
  // Données mock pour les événements supprimés
  const mockDeletedEvents = [
    {
      id: 'deleted-1',
      title: 'Concert de Musique Traditionnelle',
      description: 'Concert de musique traditionnelle sénégalaise avec des artistes locaux.',
      category: 'Musique',
      type: 'Culturel',
      date: '2024-01-20',
      time: '20:00',
      location: 'Dakar',
      address: 'Théâtre National Daniel Sorano, Dakar',
      price: '10,000 FCFA',
      capacity: 300,
      currentParticipants: 150,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: [
        'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      status: 'Publié',
      organizer: 'Moussa Diallo',
      organizerId: '4',
      tags: ['Musique', 'Tradition', 'Culture'],
      requirements: ['Billet d\'entrée'],
      contact: '+221 77 456 78 90',
      email: 'moussa.diallo@email.com',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15',
      views: 450,
      likes: 23,
      shares: 5,
      deletedAt: '2024-01-18T10:30:00.000Z',
      deletedBy: 'Moussa Diallo'
    },
    {
      id: 'deleted-2',
      title: 'Atelier de Poterie',
      description: 'Apprenez l\'art de la poterie traditionnelle avec des artisans expérimentés.',
      category: 'Art',
      type: 'Atelier',
      date: '2024-01-25',
      time: '14:00',
      location: 'Thiès',
      address: 'Centre Artisanal, Thiès',
      price: '20,000 FCFA',
      capacity: 20,
      currentParticipants: 0,
      image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: [
        'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      status: 'Brouillon',
      organizer: 'Moussa Diallo',
      organizerId: '4',
      tags: ['Art', 'Poterie', 'Tradition'],
      requirements: ['Tablier', 'Matériel fourni'],
      contact: '+221 77 456 78 90',
      email: 'moussa.diallo@email.com',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-16',
      views: 0,
      likes: 0,
      shares: 0,
      deletedAt: '2024-01-19T14:15:00.000Z',
      deletedBy: 'Moussa Diallo'
    }
  ];

  const [deletedEvents, setDeletedEvents] = useState(mockDeletedEvents);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [editMode, setEditMode] = useState<'create' | 'edit'>('create');

  const categories = ['Tous', 'Musique', 'Sport', 'Gastronomie', 'Éducation', 'Art', 'Culture'];
  const statuses = ['Tous', 'Publié', 'Auto-publié', 'En attente', 'Brouillon', 'Rejeté', 'Annulé'];

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

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Tous' || event.category === selectedCategory;
    const matchesStatus = selectedStatus === '' || selectedStatus === 'Tous' || event.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewEvent = (event: any) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    setEditMode('edit');
    setIsEditModalOpen(true);
  };

  const handleCreateEvent = () => {
    try {
      setSelectedEvent(null);
      setEditMode('create');
      setIsEditModalOpen(true);
      
      toast.info('Création d\'événement', {
        description: 'Formulaire de création d\'événement ouvert.'
      });
    } catch (error) {
      toast.error('Erreur lors de l\'ouverture du formulaire', {
        description: 'Une erreur est survenue lors de l\'ouverture du formulaire de création.'
      });
    }
  };

  const handleSaveEvent = (eventData: any) => {
    try {
      if (editMode === 'create') {
        const now = new Date();
        const autoPublishAt = new Date(now.getTime() + 48 * 60 * 60 * 1000); // +48h
        
        const newEvent = {
          ...eventData,
          id: Date.now().toString(),
          organizer: user?.name || 'Organisateur',
          organizerId: user?.id || '4',
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          views: 0,
          likes: 0,
          shares: 0,
          currentParticipants: 0,
          status: 'En attente',
          submittedAt: now.toISOString(),
          autoPublishAt: autoPublishAt.toISOString(),
          validatedBy: null,
          validatedAt: null
        };
        setEvents(prev => [...prev, newEvent]);
        
        toast.success('Événement soumis avec succès', {
          description: `L'événement "${eventData.title}" a été soumis pour validation. Publication automatique dans 48h.`
        });
      } else {
        setEvents(prev => prev.map(event => 
          event.id === eventData.id ? { ...event, ...eventData, updatedAt: new Date().toISOString().split('T')[0] } : event
        ));
        
        toast.success('Événement modifié avec succès', {
          description: `L'événement "${eventData.title}" a été modifié avec succès.`
        });
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde', {
        description: 'Une erreur est survenue lors de la sauvegarde de l\'événement.'
      });
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    const eventToDelete = events.find(e => e.id === eventId);
    if (eventToDelete) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'événement "${eventToDelete.title}" ?\n\n` +
        `Cet événement sera déplacé vers la corbeille et pourra être restauré plus tard.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          const deletedEvent = {
            ...eventToDelete,
            deletedAt: new Date().toISOString(),
            deletedBy: user?.name || 'Organisateur'
          };
          setDeletedEvents(prev => [...prev, deletedEvent]);
          setEvents(prev => prev.filter(e => e.id !== eventId));
          
          toast.success('Événement supprimé avec succès', {
            description: `L'événement "${eventToDelete.title}" a été déplacé vers la corbeille.`
          });
        } catch (error) {
          toast.error('Erreur lors de la suppression', {
            description: 'Une erreur est survenue lors de la suppression de l\'événement.'
          });
        }
      }
    }
  };

  const handleSubmitEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir soumettre l'événement "${event.title}" pour validation ?\n\n` +
        `L'événement sera publié automatiquement dans 48h si non validé par l'admin.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          const now = new Date();
          const autoPublishAt = new Date(now.getTime() + 48 * 60 * 60 * 1000); // +48h
          
          setEvents(prev => prev.map(e => 
            e.id === eventId ? { 
              ...e, 
              status: 'En attente',
              submittedAt: now.toISOString(),
              autoPublishAt: autoPublishAt.toISOString(),
              validatedBy: null,
              validatedAt: null,
              updatedAt: new Date().toISOString().split('T')[0] 
            } : e
          ));
          
          toast.success('Événement soumis avec succès', {
            description: `L'événement "${event.title}" a été soumis pour validation. Publication automatique dans 48h.`
          });
        } catch (error) {
          toast.error('Erreur lors de la soumission', {
            description: 'Une erreur est survenue lors de la soumission de l\'événement.'
          });
        }
      }
    }
  };

  const handleCancelSubmission = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir annuler la soumission de l'événement "${event.title}" ?\n\n` +
        `L'événement retournera au statut "Brouillon".\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          setEvents(prev => prev.map(e => 
            e.id === eventId ? { 
              ...e, 
              status: 'Brouillon',
              submittedAt: null,
              autoPublishAt: null,
              validatedBy: null,
              validatedAt: null,
              updatedAt: new Date().toISOString().split('T')[0] 
            } : e
          ));
          
          toast.success('Soumission annulée avec succès', {
            description: `L'événement "${event.title}" est maintenant en brouillon.`
          });
        } catch (error) {
          toast.error('Erreur lors de l\'annulation', {
            description: 'Une erreur est survenue lors de l\'annulation de la soumission.'
          });
        }
      }
    }
  };

  const handleCancelEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir annuler l'événement "${event.title}" ?\n\n` +
        `L'événement sera marqué comme annulé et ne sera plus visible.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          setEvents(prev => prev.map(e => 
            e.id === eventId ? { ...e, status: 'Annulé', updatedAt: new Date().toISOString().split('T')[0] } : e
          ));
          
          toast.success('Événement annulé avec succès', {
            description: `L'événement "${event.title}" a été annulé.`
          });
        } catch (error) {
          toast.error('Erreur lors de l\'annulation', {
            description: 'Une erreur est survenue lors de l\'annulation de l\'événement.'
          });
        }
      }
    }
  };

  const handleRestoreEvent = (eventId: string) => {
    const eventToRestore = deletedEvents.find(e => e.id === eventId);
    if (eventToRestore) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir restaurer l'événement "${eventToRestore.title}" ?\n\n` +
        `Cet événement sera remis dans la liste des événements actifs.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          const { deletedAt, deletedBy, ...restoredEvent } = eventToRestore;
          setEvents(prev => [...prev, restoredEvent]);
          setDeletedEvents(prev => prev.filter(e => e.id !== eventId));
          
          toast.success('Événement restauré avec succès', {
            description: `L'événement "${eventToRestore.title}" a été restauré et est maintenant actif.`
          });
        } catch (error) {
          toast.error('Erreur lors de la restauration', {
            description: 'Une erreur est survenue lors de la restauration de l\'événement.'
          });
        }
      }
    }
  };

  const handlePermanentDeleteEvent = (eventId: string) => {
    const eventToDelete = deletedEvents.find(e => e.id === eventId);
    if (eventToDelete) {
      const confirmed = window.confirm(
        `⚠️ ATTENTION - SUPPRESSION DÉFINITIVE ⚠️\n\n` +
        `Vous êtes sur le point de supprimer définitivement l'événement "${eventToDelete.title}".\n\n` +
        `Cette action est IRRÉVERSIBLE et l'événement ne pourra plus être récupéré.\n\n` +
        `Êtes-vous absolument sûr de vouloir continuer ?\n\n` +
        `Tapez "SUPPRIMER" dans la prochaine boîte de dialogue pour confirmer.`
      );
      
      if (confirmed) {
        const doubleConfirm = window.prompt(
          `Pour confirmer la suppression définitive, tapez exactement : SUPPRIMER\n\n` +
          `Événement à supprimer : "${eventToDelete.title}"`
        );
        
        if (doubleConfirm === 'SUPPRIMER') {
          try {
            setDeletedEvents(prev => prev.filter(e => e.id !== eventId));
            
            toast.success('Événement supprimé définitivement', {
              description: `L'événement "${eventToDelete.title}" a été supprimé définitivement.`
            });
          } catch (error) {
            toast.error('Erreur lors de la suppression définitive', {
              description: 'Une erreur est survenue lors de la suppression définitive de l\'événement.'
            });
          }
        } else if (doubleConfirm !== null) {
          toast.error('Confirmation incorrecte', {
            description: 'La confirmation n\'était pas correcte. L\'événement n\'a pas été supprimé.'
          });
        }
      }
    }
  };

  // Calculs des statistiques
  const totalEvents = events.length;
  const publishedEvents = events.filter(e => e.status === 'Publié').length;
  const autoPublishedEvents = events.filter(e => e.status === 'Auto-publié').length;
  const pendingEvents = events.filter(e => e.status === 'En attente').length;
  const draftEvents = events.filter(e => e.status === 'Brouillon').length;
  const rejectedEvents = events.filter(e => e.status === 'Rejeté').length;
  const cancelledEvents = events.filter(e => e.status === 'Annulé').length;
  const totalParticipants = events.reduce((sum, event) => sum + event.currentParticipants, 0);
  const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0);
  const participationRate = totalCapacity > 0 ? ((totalParticipants / totalCapacity) * 100).toFixed(1) : '0';
  const totalViews = events.reduce((sum, event) => sum + event.views, 0);
  const totalLikes = events.reduce((sum, event) => sum + event.likes, 0);
  const totalShares = events.reduce((sum, event) => sum + event.shares, 0);

  // Vérifier que l'utilisateur est organisateur
  if (!user || user.role !== 'organizer') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-red-500" />
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
                <Calendar className="h-8 w-8 mr-3 text-blue-600" />
                Mes Événements
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez vos événements, suivez les inscriptions et analysez les performances
              </p>
            </div>
            <Button onClick={handleCreateEvent} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouvel événement
            </Button>
          </div>
        </div>

        {/* Onglets */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Mes événements</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Statistiques</span>
            </TabsTrigger>
            <TabsTrigger value="deleted" className="flex items-center space-x-2">
              <Trash2 className="h-4 w-4" />
              <span>Événements supprimés</span>
              {deletedEvents.length > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {deletedEvents.length}
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
                      placeholder="Rechercher un événement..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrer par catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
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
                    {filteredEvents.length} événement(s) trouvé(s)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liste des événements */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Image de l'événement */}
                  {event.image && (
                    <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {/* Badge de statut */}
                      <div className="absolute top-3 right-3">
                        <Badge 
                          variant={
                            event.status === 'Publié' ? 'default' : 
                            event.status === 'Auto-publié' ? 'secondary' :
                            event.status === 'En attente' ? 'outline' : 
                            event.status === 'Brouillon' ? 'secondary' :
                            event.status === 'Rejeté' ? 'destructive' : 'destructive'
                          }
                        >
                          {event.status}
                        </Badge>
                      </div>
                      
                      {/* Compte à rebours pour les événements en attente */}
                      {event.status === 'En attente' && event.autoPublishAt && (
                        <div className="absolute top-3 left-3">
                          <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                            <Clock className="h-3 w-3 mr-1" />
                            {getTimeUntilAutoPublish(event.autoPublishAt)}
                          </Badge>
                        </div>
                      )}
                      {/* Indicateur d'images multiples */}
                      {event.images && event.images.length > 1 && event.status !== 'En attente' && (
                        <div className="absolute top-3 left-3">
                          <Badge variant="outline" className="bg-white/90">
                            <ImageIcon className="h-3 w-3 mr-1" />
                            {event.images.length}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">{event.category}</Badge>
                        <Badge variant="outline" className="text-xs">{event.type}</Badge>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{event.title}</h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{event.description}</p>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {event.currentParticipants}/{event.capacity} participants
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {event.price}
                        </div>
                      </div>

                      {/* Informations de validation */}
                      {event.status === 'Publié' && event.validatedBy && (
                        <div className="bg-green-50 p-2 rounded-lg">
                          <div className="text-xs text-green-700">
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Validé par {event.validatedBy} le {new Date(event.validatedAt).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {event.status === 'Auto-publié' && (
                        <div className="bg-orange-50 p-2 rounded-lg">
                          <div className="text-xs text-orange-700">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Publié automatiquement le {new Date(event.autoPublishAt).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {event.status === 'En attente' && (
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <div className="text-xs text-blue-700">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Soumis le {new Date(event.submittedAt).toLocaleDateString('fr-FR')} - Publication dans {getTimeUntilAutoPublish(event.autoPublishAt)}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-3">
                          <span className="text-blue-600 font-medium flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {event.views}
                          </span>
                          <span className="text-red-600 font-medium flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {event.likes}
                          </span>
                          <span className="text-green-600 font-medium flex items-center">
                            <Share2 className="h-3 w-3 mr-1" />
                            {event.shares}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(event.updatedAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewEvent(event)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Voir
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditEvent(event)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Modifier
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-1">
                        {event.status === 'Brouillon' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-blue-500 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleSubmitEvent(event.id)}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Soumettre
                          </Button>
                        )}
                        
                        {event.status === 'En attente' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-orange-500 text-orange-600 hover:bg-orange-50"
                            onClick={() => handleCancelSubmission(event.id)}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Annuler
                          </Button>
                        )}
                        
                        {(event.status === 'Publié' || event.status === 'Auto-publié') && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-orange-500 text-orange-600 hover:bg-orange-50"
                            onClick={() => handleCancelEvent(event.id)}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Annuler
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs border-red-500 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteEvent(event.id)}
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
                      <p className="text-sm font-medium text-gray-600">Total événements</p>
                      <p className="text-2xl font-bold text-gray-900">{totalEvents}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Événements publiés</p>
                      <p className="text-2xl font-bold text-green-600">{publishedEvents}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Auto-publiés</p>
                      <p className="text-2xl font-bold text-orange-600">{autoPublishedEvents}</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total participants</p>
                      <p className="text-2xl font-bold text-purple-600">{totalParticipants}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Taux de participation</p>
                      <p className="text-2xl font-bold text-orange-600">{participationRate}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
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
                        <Badge variant="default">Publié</Badge>
                        <span className="text-sm text-gray-600">{publishedEvents} événements</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {totalEvents > 0 ? ((publishedEvents / totalEvents) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Auto-publié</Badge>
                        <span className="text-sm text-gray-600">{autoPublishedEvents} événements</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {totalEvents > 0 ? ((autoPublishedEvents / totalEvents) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">En attente</Badge>
                        <span className="text-sm text-gray-600">{pendingEvents} événements</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {totalEvents > 0 ? ((pendingEvents / totalEvents) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Brouillon</Badge>
                        <span className="text-sm text-gray-600">{draftEvents} événements</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {totalEvents > 0 ? ((draftEvents / totalEvents) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="destructive">Rejeté</Badge>
                        <span className="text-sm text-gray-600">{rejectedEvents} événements</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {totalEvents > 0 ? ((rejectedEvents / totalEvents) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="destructive">Annulé</Badge>
                        <span className="text-sm text-gray-600">{cancelledEvents} événements</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {totalEvents > 0 ? ((cancelledEvents / totalEvents) * 100).toFixed(1) : 0}%
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
                        <Share2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">Total partages</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">{totalShares}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">Capacité totale</span>
                      </div>
                      <span className="text-lg font-bold text-purple-600">{totalCapacity}</span>
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
                    <h3 className="text-lg font-semibold text-gray-900">Événements supprimés</h3>
                    <p className="text-gray-600 mt-1">
                      {deletedEvents.length} événement(s) supprimé(s)
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive" className="text-sm">
                      <Trash2 className="h-3 w-3 mr-1" />
                      {deletedEvents.length} supprimé(s)
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {deletedEvents.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {deletedEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden border-red-200 bg-red-50">
                    {/* Image de l'événement */}
                    {event.image && (
                      <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 opacity-75"
                        />
                        <div className="absolute inset-0 bg-red-900 bg-opacity-30 flex items-center justify-center">
                          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            <Trash2 className="h-4 w-4 inline mr-1" />
                            Supprimé
                          </div>
                        </div>
                        {/* Indicateur d'images multiples */}
                        {event.images && event.images.length > 1 && (
                          <div className="absolute top-3 left-3">
                            <Badge variant="outline" className="bg-white/90">
                              <ImageIcon className="h-3 w-3 mr-1" />
                              {event.images.length}
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">{event.category}</Badge>
                          <Badge variant="outline" className="text-xs">{event.type}</Badge>
                          <Badge className="bg-red-100 text-red-700 text-xs">
                            Supprimé
                          </Badge>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{event.title}</h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{event.description}</p>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {event.currentParticipants}/{event.capacity} participants
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {event.price}
                          </div>
                        </div>

                        <div className="bg-red-100 p-3 rounded-lg">
                          <div className="text-xs text-red-700 space-y-1">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Supprimé le: {new Date(event.deletedAt).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              Par: {event.deletedBy}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-3">
                            <span className="text-blue-600 font-medium flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {event.views}
                            </span>
                            <span className="text-red-600 font-medium flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {event.likes}
                            </span>
                            <span className="text-green-600 font-medium flex items-center">
                              <Share2 className="h-3 w-3 mr-1" />
                              {event.shares}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(event.updatedAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-green-500 text-green-600 hover:bg-green-50"
                            onClick={() => handleRestoreEvent(event.id)}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Restaurer
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-red-500 text-red-600 hover:bg-red-50"
                            onClick={() => handlePermanentDeleteEvent(event.id)}
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
                  <h3 className="text-lg font-semibold mb-2">Aucun événement supprimé</h3>
                  <p>Aucun événement n'a été supprimé pour le moment.</p>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modales */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}

      <EventEditModal
        event={selectedEvent}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEvent}
        mode={editMode}
      />
    </div>
  );
};

export default OrganizerEventsPage;
