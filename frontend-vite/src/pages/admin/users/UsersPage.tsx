import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  Shield, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  BarChart3,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { UserManagementModal, UserEditModal, UserDetailsModal } from '@/components/modals';
import { toast } from 'sonner';

// Données mock pour les utilisateurs
const mockUsers = [
  {
    id: '1',
    name: 'Mariama Diop',
    email: 'mariama.diop@email.com',
    phone: '+221 77 123 45 67',
    role: 'admin',
    status: 'active',
    location: 'Dakar',
    joinDate: '2024-01-15',
    lastLogin: '2024-01-20T10:30:00.000Z',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    totalBookings: 0,
    totalReviews: 0
  },
  {
    id: '2',
    name: 'Amadou Ba',
    email: 'amadou.ba@email.com',
    phone: '+221 78 234 56 78',
    role: 'guide',
    status: 'active',
    location: 'Saint-Louis',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-19T14:20:00.000Z',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    totalBookings: 12,
    totalReviews: 8,
    // Informations spécifiques au guide
    languages: ['Français', 'Anglais', 'Wolof'],
    specialties: ['Histoire', 'Culture', 'Gastronomie'],
    rating: 4.9,
    reviews: 127,
    price: '25,000 FCFA',
    availability: 'Disponible',
    description: 'Guide expérimenté spécialisé dans l\'histoire et la culture du Sénégal. Passionné par le partage de connaissances.',
    experience: '8 ans',
    toursCompleted: 245,
    responseTime: '2h',
    badge: 'Guide Premium',
    featured: true,
    type: 'Certifiés'
  },
  {
    id: '3',
    name: 'Fatou Sarr',
    email: 'fatou.sarr@email.com',
    phone: '+221 76 345 67 89',
    role: 'tourist',
    status: 'active',
    location: 'Thiès',
    joinDate: '2024-01-08',
    lastLogin: '2024-01-20T09:15:00.000Z',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    totalBookings: 5,
    totalReviews: 3
  },
  {
    id: '4',
    name: 'Moussa Diallo',
    email: 'moussa.diallo@email.com',
    phone: '+221 77 456 78 90',
    role: 'organizer',
    status: 'active',
    location: 'Kaolack',
    joinDate: '2024-01-12',
    lastLogin: '2024-01-18T16:45:00.000Z',
    avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: false,
    totalBookings: 0,
    totalReviews: 0
  },
  {
    id: '5',
    name: 'Aïcha Ndiaye',
    email: 'aicha.ndiaye@email.com',
    phone: '+221 78 567 89 01',
    role: 'security',
    status: 'active',
    location: 'Ziguinchor',
    joinDate: '2024-01-05',
    lastLogin: '2024-01-19T11:30:00.000Z',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    totalBookings: 0,
    totalReviews: 0
  },
  {
    id: '6',
    name: 'Ibrahima Fall',
    email: 'ibrahima.fall@email.com',
    phone: '+221 76 678 90 12',
    role: 'tourist',
    status: 'suspended',
    location: 'Mbour',
    joinDate: '2024-01-03',
    lastLogin: '2024-01-15T08:20:00.000Z',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: false,
    totalBookings: 2,
    totalReviews: 1
  },
  {
    id: '7',
    name: 'Khadija Mbaye',
    email: 'khadija.mbaye@email.com',
    phone: '+221 77 789 01 23',
    role: 'guide',
    status: 'inactive',
    location: 'Touba',
    joinDate: '2023-12-28',
    lastLogin: '2024-01-10T13:45:00.000Z',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    totalBookings: 8,
    totalReviews: 6,
    // Informations spécifiques au guide
    languages: ['Français', 'Wolof'],
    specialties: ['Religion', 'Traditions'],
    rating: 4.2,
    reviews: 12,
    price: '15,000 FCFA',
    availability: 'Indisponible',
    description: 'Guide spécialisée dans les visites religieuses et les traditions sénégalaises.',
    experience: '2 ans',
    toursCompleted: 25,
    responseTime: '4h',
    badge: 'Guide Local',
    featured: false,
    type: 'Local'
  },
  {
    id: '8',
    name: 'Ousmane Ndiaye',
    email: 'ousmane.ndiaye@email.com',
    phone: '+221 78 890 12 34',
    role: 'tourist',
    status: 'active',
    location: 'Diourbel',
    joinDate: '2024-01-18',
    lastLogin: '2024-01-20T08:30:00.000Z',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: false,
    totalBookings: 3,
    totalReviews: 2
  },
  {
    id: '9',
    name: 'Aminata Traoré',
    email: 'aminata.traore@email.com',
    phone: '+221 76 901 23 45',
    role: 'organizer',
    status: 'active',
    location: 'Fatick',
    joinDate: '2024-01-14',
    lastLogin: '2024-01-19T15:20:00.000Z',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    totalBookings: 0,
    totalReviews: 0
  },
  {
    id: '10',
    name: 'Cheikh Diop',
    email: 'cheikh.diop@email.com',
    phone: '+221 77 012 34 56',
    role: 'security',
    status: 'active',
    location: 'Kolda',
    joinDate: '2024-01-16',
    lastLogin: '2024-01-20T12:15:00.000Z',
    avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    totalBookings: 0,
    totalReviews: 0
  },
  {
    id: '11',
    name: 'Rokhaya Sarr',
    email: 'rokhaya.sarr@email.com',
    phone: '+221 78 123 45 67',
    role: 'guide',
    status: 'active',
    location: 'Matam',
    joinDate: '2024-01-11',
    lastLogin: '2024-01-20T09:45:00.000Z',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: false,
    totalBookings: 15,
    totalReviews: 12
  },
  {
    id: '12',
    name: 'Mamadou Fall',
    email: 'mamadou.fall@email.com',
    phone: '+221 76 234 56 78',
    role: 'tourist',
    status: 'suspended',
    location: 'Sédhiou',
    joinDate: '2024-01-09',
    lastLogin: '2024-01-17T14:30:00.000Z',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: false,
    totalBookings: 1,
    totalReviews: 0
  },
  {
    id: '13',
    name: 'Fatou Diagne',
    email: 'fatou.diagne@email.com',
    phone: '+221 77 345 67 89',
    role: 'admin',
    status: 'active',
    location: 'Tambacounda',
    joinDate: '2024-01-07',
    lastLogin: '2024-01-20T16:00:00.000Z',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    totalBookings: 0,
    totalReviews: 0
  },
  {
    id: '14',
    name: 'Ibrahima Sow',
    email: 'ibrahima.sow@email.com',
    phone: '+221 78 456 78 90',
    role: 'organizer',
    status: 'inactive',
    location: 'Dakar',
    joinDate: '2024-01-04',
    lastLogin: '2024-01-15T11:20:00.000Z',
    avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    totalBookings: 0,
    totalReviews: 0
  },
  {
    id: '15',
    name: 'Aïda Ba',
    email: 'aida.ba@email.com',
    phone: '+221 76 567 89 01',
    role: 'tourist',
    status: 'active',
    location: 'Saint-Louis',
    joinDate: '2024-01-20',
    lastLogin: '2024-01-20T17:30:00.000Z',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: false,
    totalBookings: 0,
    totalReviews: 0
  }
];

const UsersPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [activeTab, setActiveTab] = useState('list');
  const [users, setUsers] = useState(mockUsers);
  
  // Données mock pour les utilisateurs supprimés
  const mockDeletedUsers = [
    {
      id: 'deleted-1',
      name: 'Samba Diallo',
      email: 'samba.diallo@email.com',
      phone: '+221 77 111 22 33',
      role: 'tourist',
      status: 'active',
      location: 'Dakar',
      joinDate: '2024-01-02',
      lastLogin: '2024-01-12T10:30:00.000Z',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: false,
      totalBookings: 2,
      totalReviews: 1,
      deletedAt: '2024-01-15T14:30:00.000Z',
      deletedBy: 'Admin'
    },
    {
      id: 'deleted-2',
      name: 'Aminata Fall',
      email: 'aminata.fall@email.com',
      phone: '+221 78 222 33 44',
      role: 'guide',
      status: 'suspended',
      location: 'Thiès',
      joinDate: '2023-12-15',
      lastLogin: '2024-01-08T16:45:00.000Z',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      totalBookings: 8,
      totalReviews: 5,
      deletedAt: '2024-01-14T09:15:00.000Z',
      deletedBy: 'Admin'
    },
    {
      id: 'deleted-3',
      name: 'Moussa Ndiaye',
      email: 'moussa.ndiaye@email.com',
      phone: '+221 76 333 44 55',
      role: 'organizer',
      status: 'active',
      location: 'Kaolack',
      joinDate: '2024-01-01',
      lastLogin: '2024-01-13T11:20:00.000Z',
      avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: false,
      totalBookings: 0,
      totalReviews: 0,
      deletedAt: '2024-01-16T13:45:00.000Z',
      deletedBy: 'Admin'
    }
  ];

  const [deletedUsers, setDeletedUsers] = useState(mockDeletedUsers);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editMode, setEditMode] = useState<'create' | 'edit'>('create');

  const roles = ['Tous', 'admin', 'guide', 'tourist', 'organizer', 'security'];
  const statuses = ['Tous', 'active', 'inactive', 'suspended'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === '' || selectedRole === 'Tous' || user.role === selectedRole;
    const matchesStatus = selectedStatus === '' || selectedStatus === 'Tous' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditMode('edit');
    setIsEditModalOpen(true);
  };

  const handleCreateUser = () => {
    try {
      setSelectedUser(null);
      setEditMode('create');
      setIsEditModalOpen(true);
      
      toast.info('Création d\'utilisateur', {
        description: 'Formulaire de création d\'utilisateur ouvert.'
      });
    } catch (error) {
      toast.error('Erreur lors de l\'ouverture du formulaire', {
        description: 'Une erreur est survenue lors de l\'ouverture du formulaire de création.'
      });
    }
  };

  const handleSaveUser = (userData: any) => {
    try {
      if (editMode === 'create') {
        const newUser = {
          ...userData,
          id: Date.now().toString(),
          joinDate: new Date().toISOString().split('T')[0],
          lastLogin: new Date().toISOString(),
          totalBookings: 0,
          totalReviews: 0
        };
        setUsers(prev => [...prev, newUser]);
        
        toast.success('Utilisateur créé avec succès', {
          description: `L'utilisateur "${userData.name}" a été créé avec succès.`
        });
      } else {
        setUsers(prev => prev.map(user => 
          user.id === userData.id ? userData : user
        ));
        
        toast.success('Utilisateur modifié avec succès', {
          description: `L'utilisateur "${userData.name}" a été modifié avec succès.`
        });
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde', {
        description: 'Une erreur est survenue lors de la sauvegarde de l\'utilisateur.'
      });
    }
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    if (userToDelete) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'utilisateur "${userToDelete.name}" ?\n\n` +
        `Cet utilisateur sera déplacé vers la corbeille et pourra être restauré plus tard.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          // Ajouter à la liste des supprimés avec la date de suppression
          const deletedUser = {
            ...userToDelete,
            deletedAt: new Date().toISOString(),
            deletedBy: user?.name || 'Admin'
          };
          setDeletedUsers(prev => [...prev, deletedUser]);
          // Supprimer de la liste active
          setUsers(prev => prev.filter(u => u.id !== userId));
          
          toast.success('Utilisateur supprimé avec succès', {
            description: `L'utilisateur "${userToDelete.name}" a été déplacé vers la corbeille.`
          });
        } catch (error) {
          toast.error('Erreur lors de la suppression', {
            description: 'Une erreur est survenue lors de la suppression de l\'utilisateur.'
          });
        }
      }
    }
  };

  const handleRestoreUser = (userId: string) => {
    const userToRestore = deletedUsers.find(u => u.id === userId);
    if (userToRestore) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir restaurer l'utilisateur "${userToRestore.name}" ?\n\n` +
        `Cet utilisateur sera remis dans la liste des utilisateurs actifs.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          // Retirer les propriétés de suppression
          const { deletedAt, deletedBy, ...restoredUser } = userToRestore;
          // Ajouter à la liste active
          setUsers(prev => [...prev, restoredUser]);
          // Supprimer de la liste des supprimés
          setDeletedUsers(prev => prev.filter(u => u.id !== userId));
          
          toast.success('Utilisateur restauré avec succès', {
            description: `L'utilisateur "${userToRestore.name}" a été restauré et est maintenant actif.`
          });
        } catch (error) {
          toast.error('Erreur lors de la restauration', {
            description: 'Une erreur est survenue lors de la restauration de l\'utilisateur.'
          });
        }
      }
    }
  };

  const handlePermanentDeleteUser = (userId: string) => {
    const userToDelete = deletedUsers.find(u => u.id === userId);
    if (userToDelete) {
      const confirmed = window.confirm(
        `⚠️ ATTENTION - SUPPRESSION DÉFINITIVE ⚠️\n\n` +
        `Vous êtes sur le point de supprimer définitivement l'utilisateur "${userToDelete.name}".\n\n` +
        `Cette action est IRRÉVERSIBLE et toutes les données de l'utilisateur seront perdues.\n\n` +
        `Êtes-vous absolument sûr de vouloir continuer ?\n\n` +
        `Tapez "SUPPRIMER" dans la prochaine boîte de dialogue pour confirmer.`
      );
      
      if (confirmed) {
        const doubleConfirm = window.prompt(
          `Pour confirmer la suppression définitive, tapez exactement : SUPPRIMER\n\n` +
          `Utilisateur à supprimer : "${userToDelete.name}"`
        );
        
        if (doubleConfirm === 'SUPPRIMER') {
          try {
            setDeletedUsers(prev => prev.filter(u => u.id !== userId));
            
            toast.success('Utilisateur supprimé définitivement', {
              description: `L'utilisateur "${userToDelete.name}" a été supprimé définitivement.`
            });
          } catch (error) {
            toast.error('Erreur lors de la suppression définitive', {
              description: 'Une erreur est survenue lors de la suppression définitive de l\'utilisateur.'
            });
          }
        } else if (doubleConfirm !== null) {
          toast.error('Confirmation incorrecte', {
            description: 'La confirmation n\'était pas correcte. L\'utilisateur n\'a pas été supprimé.'
          });
        }
      }
    }
  };

  const handleSuspendUser = (userId: string) => {
    const userToSuspend = users.find(u => u.id === userId);
    if (userToSuspend) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir suspendre l'utilisateur "${userToSuspend.name}" ?\n\n` +
        `L'utilisateur ne pourra plus se connecter à la plateforme.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          setUsers(prev => prev.map(u => 
            u.id === userId ? { ...u, status: 'suspended' } : u
          ));
          
          toast.success('Utilisateur suspendu avec succès', {
            description: `L'utilisateur "${userToSuspend.name}" a été suspendu.`
          });
        } catch (error) {
          toast.error('Erreur lors de la suspension', {
            description: 'Une erreur est survenue lors de la suspension de l\'utilisateur.'
          });
        }
      }
    }
  };

  const handleActivateUser = (userId: string) => {
    const userToActivate = users.find(u => u.id === userId);
    if (userToActivate) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir activer l'utilisateur "${userToActivate.name}" ?\n\n` +
        `L'utilisateur pourra à nouveau se connecter à la plateforme.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          setUsers(prev => prev.map(u => 
            u.id === userId ? { ...u, status: 'active' } : u
          ));
          
          toast.success('Utilisateur activé avec succès', {
            description: `L'utilisateur "${userToActivate.name}" est maintenant actif.`
          });
        } catch (error) {
          toast.error('Erreur lors de l\'activation', {
            description: 'Une erreur est survenue lors de l\'activation de l\'utilisateur.'
          });
        }
      }
    }
  };

  const handleVerifyUser = (userId: string) => {
    const userToVerify = users.find(u => u.id === userId);
    if (userToVerify) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir vérifier l'utilisateur "${userToVerify.name}" ?\n\n` +
        `L'utilisateur sera marqué comme vérifié.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          setUsers(prev => prev.map(u => 
            u.id === userId ? { ...u, verified: true } : u
          ));
          
          toast.success('Utilisateur vérifié avec succès', {
            description: `L'utilisateur "${userToVerify.name}" a été vérifié.`
          });
        } catch (error) {
          toast.error('Erreur lors de la vérification', {
            description: 'Une erreur est survenue lors de la vérification de l\'utilisateur.'
          });
        }
      }
    }
  };

  // Calculs des statistiques
  const totalUsers = users.length;
  const totalDeletedUsers = deletedUsers.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const suspendedUsers = users.filter(u => u.status === 'suspended').length;
  const verifiedUsers = users.filter(u => u.verified).length;
  const usersByRole = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const recentUsers = users.filter(u => {
    const joinDate = new Date(u.joinDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return joinDate >= thirtyDaysAgo;
  }).length;

  // Vérifier que l'utilisateur est admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-red-500" />
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
                Gestion des Utilisateurs
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez les utilisateurs, leurs rôles et leurs permissions
              </p>
            </div>
            <Button onClick={handleCreateUser} className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Nouvel utilisateur
            </Button>
          </div>
        </div>

        {/* Onglets */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Liste des utilisateurs</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Statistiques</span>
            </TabsTrigger>
            <TabsTrigger value="deleted" className="flex items-center space-x-2">
              <Trash2 className="h-4 w-4" />
              <span>Utilisateurs supprimés</span>
              {deletedUsers.length > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {deletedUsers.length}
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
                      placeholder="Rechercher un utilisateur..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrer par rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
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
                    {filteredUsers.length} utilisateur(s) trouvé(s)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liste des utilisateurs */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Utilisateur
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rôle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Localisation
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Inscription
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Activité
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="text-sm">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="ml-4">
                                <div className="flex items-center space-x-2">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  {user.verified && (
                                    <CheckCircle className="h-4 w-4 text-green-500" title="Vérifié" />
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                                <div className="text-xs text-gray-400">{user.phone}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className="capitalize">
                              <Shield className="h-3 w-3 mr-1" />
                              {user.role}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              variant={user.status === 'active' ? 'default' : user.status === 'suspended' ? 'destructive' : 'secondary'}
                              className="capitalize"
                            >
                              {user.status === 'active' ? 'Actif' : user.status === 'suspended' ? 'Suspendu' : 'Inactif'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-900">
                              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                              {user.location}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="text-xs text-gray-500">
                              Dernière connexion: {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              <div className="flex items-center space-x-3">
                                <span className="text-blue-600 font-medium">
                                  {user.totalBookings} réservations
                                </span>
                                <span className="text-green-600 font-medium">
                                  {user.totalReviews} avis
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewUser(user)}
                                className="text-xs"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Voir
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleEditUser(user)}
                                className="text-xs"
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Modifier
                              </Button>
                              {user.status === 'active' ? (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-xs border-orange-500 text-orange-600 hover:bg-orange-50"
                                  onClick={() => handleSuspendUser(user.id)}
                                >
                                  <UserX className="h-3 w-3 mr-1" />
                                  Suspendre
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-xs border-green-500 text-green-600 hover:bg-green-50"
                                  onClick={() => handleActivateUser(user.id)}
                                >
                                  <UserCheck className="h-3 w-3 mr-1" />
                                  Activer
                                </Button>
                              )}
                              {!user.verified && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-xs border-blue-500 text-blue-600 hover:bg-blue-50"
                                  onClick={() => handleVerifyUser(user.id)}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Vérifier
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs border-red-500 text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Supprimer
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-500">Aucun utilisateur trouvé</h3>
                    <p className="text-gray-400">Aucun utilisateur ne correspond à vos critères de recherche.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            {/* Statistiques générales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total utilisateurs</p>
                      <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
                      <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Utilisateurs suspendus</p>
                      <p className="text-2xl font-bold text-red-600">{suspendedUsers}</p>
                    </div>
                    <UserX className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Utilisateurs vérifiés</p>
                      <p className="text-2xl font-bold text-blue-600">{verifiedUsers}</p>
                    </div>
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Utilisateurs supprimés</p>
                      <p className="text-2xl font-bold text-orange-600">{totalDeletedUsers}</p>
                    </div>
                    <Trash2 className="h-8 w-8 text-orange-600" />
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
                    Répartition par rôle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(usersByRole).map(([role, count]) => {
                      const percentage = ((count / totalUsers) * 100).toFixed(1);
                      return (
                        <div key={role} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{role}</Badge>
                            <span className="text-sm text-gray-600">{count} utilisateurs</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Activité récente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Nouveaux utilisateurs (30 derniers jours)</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{recentUsers}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">Taux d'activité</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        {((activeUsers / totalUsers) * 100).toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">Taux de vérification</span>
                      </div>
                      <span className="text-lg font-bold text-purple-600">
                        {((verifiedUsers / totalUsers) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deleted" className="space-y-6">
            {/* Header pour les utilisateurs supprimés */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Utilisateurs supprimés</h3>
                    <p className="text-gray-600 mt-1">
                      {deletedUsers.length} utilisateur(s) supprimé(s)
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive" className="text-sm">
                      <Trash2 className="h-3 w-3 mr-1" />
                      {deletedUsers.length} supprimé(s)
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liste des utilisateurs supprimés */}
            {deletedUsers.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-red-50 border-b">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Utilisateur
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rôle
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Localisation
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Suppression
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Activité
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {deletedUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-red-50 transition-colors border-l-4 border-red-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="relative">
                                  <Avatar className="h-10 w-10 opacity-75">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="text-sm">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  {/* Overlay de suppression */}
                                  <div className="absolute inset-0 bg-red-900 bg-opacity-30 rounded-full flex items-center justify-center">
                                    <Trash2 className="h-4 w-4 text-white" />
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="flex items-center space-x-2">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    {user.verified && (
                                      <CheckCircle className="h-4 w-4 text-green-500" title="Vérifié" />
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                  <div className="text-xs text-gray-400">{user.phone}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline" className="capitalize">
                                <Shield className="h-3 w-3 mr-1" />
                                {user.role}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge 
                                variant={user.status === 'active' ? 'default' : user.status === 'suspended' ? 'destructive' : 'secondary'}
                                className="capitalize"
                              >
                                {user.status === 'active' ? 'Actif' : user.status === 'suspended' ? 'Suspendu' : 'Inactif'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center text-sm text-gray-900">
                                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                {user.location}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(user.deletedAt).toLocaleDateString('fr-FR')}
                              </div>
                              <div className="text-xs text-gray-500">
                                Par: {user.deletedBy}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                <div className="flex items-center space-x-3">
                                  <span className="text-blue-600 font-medium">
                                    {user.totalBookings} réservations
                                  </span>
                                  <span className="text-green-600 font-medium">
                                    {user.totalReviews} avis
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleViewUser(user)}
                                  className="text-xs"
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  Voir
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleRestoreUser(user.id)}
                                  className="text-xs border-green-500 text-green-600 hover:bg-green-50"
                                >
                                  <UserCheck className="h-3 w-3 mr-1" />
                                  Restaurer
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handlePermanentDeleteUser(user.id)}
                                  className="text-xs border-red-500 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Supprimer définitivement
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <div className="text-gray-500">
                  <Trash2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">Aucun utilisateur supprimé</h3>
                  <p>Aucun utilisateur n'a été supprimé pour le moment.</p>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modales */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onEdit={() => {
            setIsDetailsModalOpen(false);
            setEditMode('edit');
            setIsEditModalOpen(true);
          }}
          onSuspend={() => {
            setIsDetailsModalOpen(false);
            handleSuspendUser(selectedUser.id);
          }}
          onActivate={() => {
            setIsDetailsModalOpen(false);
            handleActivateUser(selectedUser.id);
          }}
          onVerify={() => {
            setIsDetailsModalOpen(false);
            handleVerifyUser(selectedUser.id);
          }}
          onDelete={() => {
            setIsDetailsModalOpen(false);
            handleDeleteUser(selectedUser.id);
          }}
        />
      )}

      <UserEditModal
        user={selectedUser}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveUser}
        mode={editMode}
      />
    </div>
  );
};

export default UsersPage;
