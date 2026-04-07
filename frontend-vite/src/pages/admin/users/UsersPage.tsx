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
  Eye,
  Edit,
  Trash2,
  Shield,
  UserCheck,
  UserX,
  MapPin,
  CheckCircle,
  BarChart3,
  TrendingUp,
  Activity,
  Clock
} from 'lucide-react';
import { UserEditModal, UserDetailsModal } from '@/components/modals';
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
    <div className="min-h-screen bg-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 mr-3 text-[#F2A900]" />
                <span className="uppercase tracking-tighter">Gestion des Utilisateurs</span>
              </h1>
              <p className="text-[#5D4037]/70 mt-1 font-medium text-sm sm:text-base">
                Gérez les utilisateurs, leurs rôles et leurs permissions
              </p>
            </div>
            <Button onClick={handleCreateUser} className="bg-[#1B5E20] hover:bg-[#144718] text-white font-black uppercase tracking-tighter rounded-lg h-10 sm:h-11 shadow-md shadow-emerald-900/10 w-full sm:w-auto">
              <UserPlus className="h-4 w-4 mr-2" />
              Nouveau
            </Button>
          </div>
        </div>

        {/* Onglets */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-[#EBE3D5]/20 p-1 h-12 rounded-xl">
            <TabsTrigger value="list" className="flex items-center space-x-2 font-black uppercase tracking-tighter data-[state=active]:bg-[#F2A900] data-[state=active]:text-white rounded-lg transition-all">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Liste des utilisateurs</span>
              <span className="sm:hidden">Liste</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2 font-black uppercase tracking-tighter data-[state=active]:bg-[#F2A900] data-[state=active]:text-white rounded-lg transition-all">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Statistiques</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="deleted" className="flex items-center space-x-2 font-black uppercase tracking-tighter data-[state=active]:bg-[#E11D48] data-[state=active]:text-white rounded-lg transition-all">
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Corbeille</span>
              <span className="sm:hidden">Corbeille</span>
              {deletedUsers.length > 0 && (
                <Badge className="ml-1 bg-white text-[#E11D48] border-none text-[10px] font-black h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  {deletedUsers.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            {/* Barre de recherche et filtres */}
            <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl overflow-hidden shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F2A900] h-4 w-4" />
                    <Input
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-[#EBE3D5] focus:border-[#F2A900] focus:ring-[#F2A900] rounded-xl h-11 font-medium"
                    />
                  </div>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl h-11 font-bold uppercase text-xs tracking-tighter">
                      <SelectValue placeholder="Rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role} value={role} className="uppercase font-bold text-[10px]">{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl h-11 font-bold uppercase text-xs tracking-tighter">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status} className="uppercase font-bold text-[10px]">{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">
                    <Filter className="h-3 w-3 mr-2 text-[#F2A900]" />
                    {filteredUsers.length} utilisateur(s)
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="lg:hidden space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="border-2 border-[#EBE3D5] bg-white rounded-2xl overflow-hidden shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 border-2 border-[#F2A900]/20">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-[#FFFDFB] text-[#5D4037] font-black">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1.5 font-black text-[#2D1B08] uppercase tracking-tighter">
                            {user.name}
                            {user.verified && <CheckCircle className="h-4 w-4 text-[#1B5E20]" />}
                          </div>
                          <div className="text-[10px] font-bold text-[#5D4037]/60 lowercase">{user.email}</div>
                        </div>
                      </div>
                      <Badge 
                        className={`font-black uppercase tracking-tighter text-[9px] px-2 py-0.5 border-none shadow-sm ${
                          user.status === 'active' ? 'bg-[#1B5E20]/10 text-[#1B5E20]' : 
                          user.status === 'suspended' ? 'bg-[#E11D48]/10 text-[#E11D48]' : 
                          'bg-[#EBE3D5] text-[#5D4037]'
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-1">
                        <div className="text-[9px] font-black uppercase tracking-widest text-[#5D4037]/40">Rôle</div>
                        <div className="flex items-center gap-1 text-[10px] font-black text-[#F2A900] uppercase">
                          <Shield className="h-3 w-3" />
                          {user.role}
                        </div>
                      </div>
                      <div className="space-y-1 text-right">
                        <div className="text-[9px] font-black uppercase tracking-widest text-[#5D4037]/40">Localisation</div>
                        <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-[#5D4037]">
                          <MapPin className="h-3 w-3 text-[#1B5E20]" />
                          {user.location}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#EBE3D5] flex items-center justify-between">
                      <div className="flex -space-x-2">
                         <div className="bg-[#1B5E20]/5 px-2 py-1 rounded-full text-[9px] font-black text-[#1B5E20] border border-[#1B5E20]/10">
                           {user.totalBookings} RES
                         </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewUser(user)}
                          className="h-8 w-8 p-0 rounded-lg border-[#EBE3D5] text-[#5D4037]"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditUser(user)}
                          className="h-8 w-8 p-0 rounded-lg border-[#EBE3D5] text-[#F2A900]"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteUser(user.id)}
                          className="h-8 w-8 p-0 rounded-lg border-[#EBE3D5] text-[#E11D48]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Liste des utilisateurs - Version Desktop (Tableau Premium) */}
            <Card className="hidden lg:block border-2 border-[#EBE3D5] bg-white rounded-2xl overflow-hidden shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#EBE3D5]/20 border-b-2 border-[#EBE3D5]">
                        <th className="px-6 py-4 text-left text-[10px] font-black text-[#5D4037]/60 uppercase tracking-widest">Utilisateur</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-[#5D4037]/60 uppercase tracking-widest">Rôle & Statut</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-[#5D4037]/60 uppercase tracking-widest">Infos</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-[#5D4037]/60 uppercase tracking-widest">Statistiques</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black text-[#5D4037]/60 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBE3D5]">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-[#FFFDFB] transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 border-2 border-[#F2A900]/10 transition-transform group-hover:scale-110">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="bg-[#EBE3D5]/20 text-[#5D4037]">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="ml-4">
                                <div className="flex items-center gap-1.5 text-sm font-black text-[#2D1B08] uppercase tracking-tighter">
                                  {user.name}
                                  {user.verified && <CheckCircle className="h-3.5 w-3.5 text-[#1B5E20]" />}
                                </div>
                                <div className="text-[10px] font-bold text-[#5D4037]/50 lowercase">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col gap-1.5">
                              <Badge variant="outline" className="w-fit border-[#EBE3D5] text-[#F2A900] bg-[#FFF8E1] font-black uppercase text-[9px] tracking-tighter">
                                <Shield className="h-3 w-3 mr-1" />
                                {user.role}
                              </Badge>
                              <Badge 
                                className={`w-fit font-black uppercase tracking-tighter text-[8px] px-2 py-0 border-none rounded-full ${
                                  user.status === 'active' ? 'bg-[#1B5E20]/10 text-[#1B5E20]' : 
                                  user.status === 'suspended' ? 'bg-[#E11D48]/10 text-[#E11D48]' : 
                                  'bg-[#EBE3D5]/30 text-[#5D4037]/60'
                                }`}
                              >
                                {user.status}
                              </Badge>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5D4037]">
                                <MapPin className="h-3.5 w-3.5 text-[#1B5E20]" />
                                {user.location}
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#5D4037]/50">
                                <Clock className="h-3.5 w-3.5" />
                                Membre depuis {new Date(user.joinDate).getFullYear()}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-3">
                              <div className="flex flex-col">
                                <span className="text-xs font-black text-[#2D1B08] tracking-tighter">{user.totalBookings}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#5D4037]/40">Réserv.</span>
                              </div>
                              <div className="flex flex-col border-l border-[#EBE3D5] pl-3">
                                <span className="text-xs font-black text-[#2D1B08] tracking-tighter">{user.totalReviews}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#5D4037]/40">Avis</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)} className="h-9 w-9 p-0 rounded-xl hover:bg-[#EBE3D5]/20 text-[#5D4037]">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)} className="h-9 w-9 p-0 rounded-xl hover:bg-[#F2A900]/10 text-[#F2A900]">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)} className="h-9 w-9 p-0 rounded-xl hover:bg-[#E11D48]/10 text-[#E11D48]">
                                <Trash2 className="h-4 w-4" />
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

            {filteredUsers.length === 0 && (
              <Card className="border-2 border-dashed border-[#EBE3D5] bg-[#FFFDFB] p-12 text-center rounded-2xl">
                <Users className="h-12 w-12 mx-auto mb-4 text-[#EBE3D5]" />
                <h3 className="text-lg font-black uppercase tracking-tighter text-[#5D4037]/60">Aucun utilisateur</h3>
                <p className="text-sm font-medium text-[#5D4037]/40">Aucun résultat ne correspond à votre recherche.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            {/* Statistiques générales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Total</p>
                      <p className="text-2xl sm:text-3xl font-black text-[#2D1B08] tracking-tighter">{totalUsers}</p>
                    </div>
                    <div className="bg-[#F2A900]/10 p-2 sm:p-3 rounded-xl">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#F2A900]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Actifs</p>
                      <p className="text-2xl sm:text-3xl font-black text-[#1B5E20] tracking-tighter">{activeUsers}</p>
                    </div>
                    <div className="bg-[#1B5E20]/10 p-2 sm:p-3 rounded-xl">
                      <UserCheck className="h-5 w-5 sm:h-6 sm:w-6 text-[#1B5E20]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Suspendus</p>
                      <p className="text-2xl sm:text-3xl font-black text-[#E11D48] tracking-tighter">{suspendedUsers}</p>
                    </div>
                    <div className="bg-[#E11D48]/10 p-2 sm:p-3 rounded-xl">
                      <UserX className="h-5 w-5 sm:h-6 sm:w-6 text-[#E11D48]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Vérifiés</p>
                      <p className="text-2xl sm:text-3xl font-black text-[#F2A900] tracking-tighter">{verifiedUsers}</p>
                    </div>
                    <div className="bg-[#F2A900]/10 p-2 sm:p-3 rounded-xl">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-[#F2A900]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Supprimés</p>
                      <p className="text-2xl sm:text-3xl font-black text-[#5D4037]/60 tracking-tighter">{totalDeletedUsers}</p>
                    </div>
                    <div className="bg-[#EBE3D5]/40 p-2 sm:p-3 rounded-xl">
                      <Trash2 className="h-5 w-5 sm:h-6 sm:w-6 text-[#5D4037]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statistiques détaillées */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center font-black uppercase tracking-tighter text-base sm:text-lg text-[#2D1B08]">
                    <BarChart3 className="h-5 w-5 mr-2 sm:mr-3 text-[#F2A900]" />
                    Répartition par rôle
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <div className="space-y-5">
                    {Object.entries(usersByRole).map(([role, count]) => {
                      const percentage = ((count / totalUsers) * 100).toFixed(1);
                      return (
                        <div key={role} className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="border-[#EBE3D5] bg-[#FFF8E1] text-[#F2A900] font-black uppercase text-[10px] tracking-tighter">{role}</Badge>
                              <span className="text-xs font-bold text-[#5D4037]/60">{count} UTILISATEURS</span>
                            </div>
                            <span className="text-sm font-black text-[#2D1B08]">{percentage}%</span>
                          </div>
                          <div className="w-full bg-[#EBE3D5]/30 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#F2A900] h-full rounded-full transition-all duration-1000" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center font-black uppercase tracking-tighter text-base sm:text-lg text-[#2D1B08]">
                    <TrendingUp className="h-5 w-5 mr-2 sm:mr-3 text-[#1B5E20]" />
                    Activité & Croissance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-[#F2A900]/5 rounded-xl border border-[#F2A900]/10 transition-colors hover:bg-[#F2A900]/10">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                          <Clock className="h-5 w-5 text-[#F2A900]" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#5D4037]/70">Nouveaux (30j)</span>
                      </div>
                      <span className="text-2xl font-black text-[#F2A900] tracking-tighter">{recentUsers}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#1B5E20]/5 rounded-xl border border-[#1B5E20]/10 transition-colors hover:bg-[#1B5E20]/10">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                          <Activity className="h-5 w-5 text-[#1B5E20]" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#5D4037]/70">Taux d'activité</span>
                      </div>
                      <span className="text-2xl font-black text-[#1B5E20] tracking-tighter">
                        {((activeUsers / totalUsers) * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#2D1B08]/5 rounded-xl border border-[#2D1B08]/10 transition-colors hover:bg-[#2D1B08]/10">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                          <CheckCircle className="h-5 w-5 text-[#2D1B08]" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#5D4037]/70">Vérification</span>
                      </div>
                      <span className="text-2xl font-black text-[#2D1B08] tracking-tighter">
                        {((verifiedUsers / totalUsers) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deleted" className="space-y-6">
            {/* Header Corbeille */}
            <Card className="border-2 border-red-100 bg-red-50/30 rounded-2xl overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tighter text-[#2D1B08]">Corbeille des utilisateurs</h3>
                    <p className="text-[10px] sm:text-xs font-bold text-[#5D4037]/60 mt-1">
                      {deletedUsers.length} UTILISATEUR(S) SUPPRIMÉ(S) — RESTAURATION POSSIBLE
                    </p>
                  </div>
                  <Badge className="bg-red-100 text-[#E11D48] border-none font-black uppercase text-[10px] tracking-tighter px-3 h-8 shadow-sm">
                    <Trash2 className="h-3 w-3 mr-2" />
                    {deletedUsers.length} en attente
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Liste Mobile Corbeille */}
            {deletedUsers.length > 0 ? (
              <>
                <div className="lg:hidden space-y-4">
                  {deletedUsers.map((user) => (
                    <Card key={user.id} className="border-2 border-red-100 bg-white rounded-2xl overflow-hidden shadow-sm relative border-l-8 border-l-red-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="relative">
                            <Avatar className="h-12 w-12 grayscale opacity-60">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-red-50 text-red-300 font-black">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1 border-2 border-white">
                              <Trash2 className="h-2.5 w-2.5 text-white" />
                            </div>
                          </div>
                          <div>
                            <div className="font-black text-[#2D1B08] uppercase tracking-tighter line-through decoration-red-300 opacity-60">
                              {user.name}
                            </div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-red-400">
                              Supprimé par {user.deletedBy}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-[10px]">
                           <div className="space-y-1">
                             <div className="font-black text-[#5D4037]/40 uppercase tracking-widest text-[8px]">Date suppression</div>
                             <div className="font-bold text-[#5D4037]">{new Date(user.deletedAt).toLocaleDateString()}</div>
                           </div>
                           <div className="space-y-1 text-right">
                             <div className="font-black text-[#5D4037]/40 uppercase tracking-widest text-[8px]">Rôle</div>
                             <div className="font-bold uppercase text-[#F2A900]">{user.role}</div>
                           </div>
                        </div>

                        <div className="pt-4 border-t border-red-50 flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleRestoreUser(user.id)}
                            className="flex-1 bg-[#1B5E20]/5 border-[#1B5E20]/20 text-[#1B5E20] font-black uppercase h-9 rounded-xl text-[10px]"
                          >
                            <UserCheck className="h-3.5 w-3.5 mr-2" />
                            Restaurer
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handlePermanentDeleteUser(user.id)}
                            className="h-9 w-9 p-0 bg-red-50 border-red-100 text-red-600 rounded-xl"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Liste Desktop Corbeille */}
                <Card className="hidden lg:block border-2 border-red-50 bg-white rounded-2xl overflow-hidden shadow-sm">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-red-50/50 border-b border-red-100">
                            <th className="px-6 py-4 text-left text-[10px] font-black text-red-400 uppercase tracking-widest">Utilisateur</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-red-400 uppercase tracking-widest">Infos Suppression</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-red-400 uppercase tracking-widest">Rôle</th>
                            <th className="px-6 py-4 text-right text-[10px] font-black text-red-400 uppercase tracking-widest">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-red-50">
                          {deletedUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-red-50/20 transition-colors group">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center opacity-70">
                                  <Avatar className="h-9 w-9 border border-red-100 grayscale transition-all group-hover:grayscale-0">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="text-sm font-black text-red-300">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="ml-4">
                                    <div className="text-sm font-black text-[#2D1B08] uppercase tracking-tighter line-through decoration-[#E11D48]/30">{user.name}</div>
                                    <div className="text-[10px] font-bold text-[#5D4037]/50 lowercase">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-col gap-0.5">
                                  <div className="text-[11px] font-bold text-red-600">Le {new Date(user.deletedAt).toLocaleDateString()}</div>
                                  <div className="text-[9px] font-black uppercase text-[#5D4037]/40 tracking-widest">Par {user.deletedBy}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant="outline" className="border-red-100 bg-red-50 text-red-500 font-black uppercase text-[9px] tracking-tighter">
                                  {user.role}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => handleRestoreUser(user.id)} className="h-9 px-3 rounded-xl hover:bg-[#1B5E20]/10 text-[#1B5E20] font-black uppercase text-[10px]">
                                    <UserCheck className="h-3.5 w-3.5 mr-2" />
                                    Restaurer
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handlePermanentDeleteUser(user.id)} className="h-9 w-9 p-0 rounded-xl hover:bg-red-100 text-red-600">
                                    <Trash2 className="h-3.5 w-3.5" />
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
              </>
            ) : (
              <Card className="border-2 border-dashed border-[#EBE3D5] bg-[#FFFDFB] p-12 text-center rounded-2xl">
                <Trash2 className="h-12 w-12 mx-auto mb-4 text-[#EBE3D5]" />
                <h3 className="text-lg font-black uppercase tracking-tighter text-[#5D4037]/60">La corbeille est vide</h3>
                <p className="text-sm font-medium text-[#5D4037]/40">Aucun utilisateur n'a été supprimé récemment.</p>
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
