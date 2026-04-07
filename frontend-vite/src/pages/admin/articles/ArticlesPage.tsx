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
  Download,
  Upload,
  BarChart3,
  FileText,
  Calendar,
  User,
  X,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { ArticleDetailsModal, ArticleEditModal } from '@/components/modals';
import { toast } from 'sonner';

const ArticlesPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  
  // États pour les modales
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<'create' | 'edit'>('create');

  // Fonctions de gestion des actions
  const handleViewArticle = (article: any) => {
    setSelectedArticle(article);
    setIsDetailsModalOpen(true);
  };

  const handleEditArticle = (article: any) => {
    setSelectedArticle(article);
    setEditMode('edit');
    setIsEditModalOpen(true);
  };

  const handleCreateArticle = () => {
    try {
      setSelectedArticle(null);
      setEditMode('create');
      setIsEditModalOpen(true);
      
      toast.info('Création d\'article', {
        description: 'Formulaire de création d\'article ouvert.'
      });
    } catch (error) {
      toast.error('Erreur lors de l\'ouverture du formulaire', {
        description: 'Une erreur est survenue lors de l\'ouverture du formulaire de création.'
      });
    }
  };

  const handleSaveArticle = (articleData: any) => {
    try {
      if (editMode === 'create') {
        setArticles(prev => [...prev, articleData]);
        toast.success('Article créé avec succès', {
          description: `L'article "${articleData.title}" a été créé avec succès.`
        });
      } else {
        setArticles(prev => prev.map(article => 
          article.id === articleData.id ? articleData : article
        ));
        toast.success('Article modifié avec succès', {
          description: `L'article "${articleData.title}" a été modifié avec succès.`
        });
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde', {
        description: 'Une erreur est survenue lors de la sauvegarde de l\'article.'
      });
    }
  };

  const handleDeleteArticle = (articleId: string) => {
    const articleToDelete = articles.find(article => article.id === articleId);
    if (articleToDelete) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'article "${articleToDelete.title}" ?\n\n` +
        `Cet article sera déplacé vers la corbeille et pourra être restauré plus tard.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          // Ajouter à la liste des supprimés avec la date de suppression
          const deletedArticle = {
            ...articleToDelete,
            deletedAt: new Date().toISOString(),
            deletedBy: user?.name || 'Admin'
          };
          setDeletedArticles(prev => [...prev, deletedArticle]);
          // Supprimer de la liste active
          setArticles(prev => prev.filter(article => article.id !== articleId));
          
          toast.success('Article supprimé avec succès', {
            description: `L'article "${articleToDelete.title}" a été déplacé vers la corbeille.`
          });
        } catch (error) {
          toast.error('Erreur lors de la suppression', {
            description: 'Une erreur est survenue lors de la suppression de l\'article.'
          });
        }
      }
    }
  };

  const handleRestoreArticle = (articleId: string) => {
    const articleToRestore = deletedArticles.find(article => article.id === articleId);
    if (articleToRestore) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir restaurer l'article "${articleToRestore.title}" ?\n\n` +
        `Cet article sera remis dans la liste des articles actifs.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          // Retirer les propriétés de suppression
          const { deletedAt, deletedBy, ...restoredArticle } = articleToRestore;
          // Ajouter à la liste active
          setArticles(prev => [...prev, restoredArticle]);
          // Supprimer de la liste des supprimés
          setDeletedArticles(prev => prev.filter(article => article.id !== articleId));
          
          toast.success('Article restauré avec succès', {
            description: `L'article "${articleToRestore.title}" a été restauré et est maintenant actif.`
          });
        } catch (error) {
          toast.error('Erreur lors de la restauration', {
            description: 'Une erreur est survenue lors de la restauration de l\'article.'
          });
        }
      }
    }
  };

  const handlePermanentDeleteArticle = (articleId: string) => {
    const articleToDelete = deletedArticles.find(article => article.id === articleId);
    if (articleToDelete) {
      const confirmed = window.confirm(
        `⚠️ ATTENTION - SUPPRESSION DÉFINITIVE ⚠️\n\n` +
        `Vous êtes sur le point de supprimer définitivement l'article "${articleToDelete.title}".\n\n` +
        `Cette action est IRRÉVERSIBLE et l'article ne pourra plus être récupéré.\n\n` +
        `Êtes-vous absolument sûr de vouloir continuer ?\n\n` +
        `Tapez "SUPPRIMER" dans la prochaine boîte de dialogue pour confirmer.`
      );
      
      if (confirmed) {
        const doubleConfirm = window.prompt(
          `Pour confirmer la suppression définitive, tapez exactement : SUPPRIMER\n\n` +
          `Article à supprimer : "${articleToDelete.title}"`
        );
        
        if (doubleConfirm === 'SUPPRIMER') {
          try {
            setDeletedArticles(prev => prev.filter(article => article.id !== articleId));
            
            toast.success('Article supprimé définitivement', {
              description: `L'article "${articleToDelete.title}" a été supprimé définitivement.`
            });
          } catch (error) {
            toast.error('Erreur lors de la suppression définitive', {
              description: 'Une erreur est survenue lors de la suppression définitive de l\'article.'
            });
          }
        } else if (doubleConfirm !== null) {
          toast.error('Confirmation incorrecte', {
            description: 'La confirmation n\'était pas correcte. L\'article n\'a pas été supprimé.'
          });
        }
      }
    }
  };

  const handlePublishArticle = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (article) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir publier l'article "${article.title}" ?\n\n` +
        `L'article sera visible par tous les utilisateurs.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          setArticles(prev => prev.map(article => 
            article.id === articleId ? { ...article, status: 'Publié' } : article
          ));
          
          toast.success('Article publié avec succès', {
            description: `L'article "${article.title}" est maintenant publié et visible.`
          });
        } catch (error) {
          toast.error('Erreur lors de la publication', {
            description: 'Une erreur est survenue lors de la publication de l\'article.'
          });
        }
      }
    }
  };

  const handleArchiveArticle = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (article) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir archiver l'article "${article.title}" ?\n\n` +
        `L'article sera archivé et ne sera plus visible publiquement.\n\n` +
        `Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.`
      );
      
      if (confirmed) {
        try {
          setArticles(prev => prev.map(article => 
            article.id === articleId ? { ...article, status: 'Archivé' } : article
          ));
          
          toast.success('Article archivé avec succès', {
            description: `L'article "${article.title}" a été archivé.`
          });
        } catch (error) {
          toast.error('Erreur lors de l\'archivage', {
            description: 'Une erreur est survenue lors de l\'archivage de l\'article.'
          });
        }
      }
    }
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
  const mockArticles = [
    {
      id: '1',
      title: 'Guide complet de Dakar',
      category: 'Tourisme',
      author: 'Amadou Fall',
      status: 'Publié',
      publishDate: '2024-01-15',
      views: 1250,
      likes: 45,
      content: 'Découvrez les merveilles de Dakar, la capitale du Sénégal. Cette ville dynamique offre une richesse culturelle et historique exceptionnelle...',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: [
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    },
    {
      id: '2',
      title: 'Cuisine sénégalaise traditionnelle',
      category: 'Gastronomie',
      author: 'Fatou Sarr',
      status: 'En attente',
      publishDate: '2024-01-14',
      views: 0,
      likes: 0,
      content: 'Explorez les saveurs authentiques du Sénégal. Le thiéboudienne, le yassa, le mafé... des plats qui racontent l\'histoire du pays...',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: [
        'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    },
    {
      id: '3',
      title: 'Histoire de Gorée',
      category: 'Histoire',
      author: 'Moussa Ba',
      status: 'Brouillon',
      publishDate: '2024-01-13',
      views: 0,
      likes: 0,
      content: 'L\'île de Gorée, témoin de l\'histoire de l\'esclavage. Un lieu de mémoire et de recueillement qui raconte une page sombre de l\'histoire...',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: [
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    }
  ];

  const [articles, setArticles] = useState(mockArticles);
  
  // Données mock pour les articles supprimés
  const mockDeletedArticles = [
    {
      id: 'deleted-1',
      title: 'Guide des plages de Saly',
      category: 'Tourisme',
      author: 'Mariama Diop',
      status: 'Publié',
      publishDate: '2024-01-12',
      views: 850,
      likes: 32,
      content: 'Découvrez les plus belles plages de Saly et ses environs. Un guide complet pour profiter de la côte sénégalaise...',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: [
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      deletedAt: '2024-01-15T14:30:00.000Z',
      deletedBy: 'Admin'
    },
    {
      id: 'deleted-2',
      title: 'Recettes traditionnelles du Sénégal',
      category: 'Gastronomie',
      author: 'Fatou Sarr',
      status: 'Publié',
      publishDate: '2024-01-10',
      views: 1200,
      likes: 67,
      content: 'Apprenez à préparer les plats traditionnels sénégalais : thiéboudienne, yassa, mafé...',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: [
        'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      deletedAt: '2024-01-13T09:15:00.000Z',
      deletedBy: 'Admin'
    },
    {
      id: 'deleted-3',
      title: 'Histoire de l\'île de Gorée',
      category: 'Histoire',
      author: 'Moussa Ba',
      status: 'Brouillon',
      publishDate: '2024-01-08',
      views: 0,
      likes: 0,
      content: 'L\'île de Gorée, témoin de l\'histoire de l\'esclavage au Sénégal...',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: [
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      deletedAt: '2024-01-11T16:45:00.000Z',
      deletedBy: 'Admin'
    }
  ];

  const [deletedArticles, setDeletedArticles] = useState(mockDeletedArticles);

  const categories = ['Tous', 'Tourisme', 'Gastronomie', 'Histoire', 'Culture', 'Événements'];
  const statuses = ['Tous', 'Publié', 'En attente', 'Brouillon', 'Archivé'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || selectedCategory === 'Tous' || article.category === selectedCategory;
    const matchesStatus = !selectedStatus || selectedStatus === 'Tous' || article.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Tri des articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'date':
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      case 'views':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStatus('');
  };



  return (
    <div className="min-h-screen bg-[#FFFDFB]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#2D1B08] uppercase tracking-tighter flex items-center gap-3">
                <div className="bg-[#F2A900] p-2 rounded-xl text-white shadow-sm">
                  <FileText className="h-6 w-6" />
                </div>
                Gestion des Articles
              </h1>
              <p className="text-[#5D4037]/70 mt-2 sm:mt-1 font-medium text-sm sm:text-base">Administrez tous les articles de la plateforme</p>
            </div>
            <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
              <Badge className="bg-[#5D4037]/5 text-[#5D4037] border-[#EBE3D5] font-black uppercase tracking-tighter py-1.5 px-3">
                {sortedArticles.length} article(s)
              </Badge>
              <Button
                className="bg-[#F2A900] hover:bg-[#2D1B08] text-white font-black uppercase tracking-tighter transition-colors flex-1 sm:flex-none h-10 shadow-md hover:shadow-lg"
                onClick={handleCreateArticle}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouvel article
              </Button>
            </div>
          </div>

          {/* Onglets */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
              <TabsList className="flex w-max sm:inline-flex bg-[#EBE3D5]/20 p-1 rounded-2xl h-auto gap-1 border border-[#EBE3D5]/50 shadow-inner">
                <TabsTrigger value="list" className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-[#F2A900] data-[state=active]:text-white data-[state=inactive]:text-[#5D4037]/70 py-2.5 px-4 font-bold uppercase tracking-tighter text-xs transition-all data-[state=active]:shadow-md">
                  <FileText className="h-4 w-4" />
                  <span>Liste des articles</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-[#F2A900] data-[state=active]:text-white data-[state=inactive]:text-[#5D4037]/70 py-2.5 px-4 font-bold uppercase tracking-tighter text-xs transition-all data-[state=active]:shadow-md">
                  <BarChart3 className="h-4 w-4" />
                  <span>Statistiques</span>
                </TabsTrigger>
                <TabsTrigger value="deleted" className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-[#F2A900] data-[state=active]:text-white data-[state=inactive]:text-[#5D4037]/70 py-2.5 px-4 font-bold uppercase tracking-tighter text-xs transition-all data-[state=active]:shadow-md">
                  <Trash2 className="h-4 w-4" />
                  <span>Articles supprimés</span>
                  {deletedArticles.length > 0 && (
                    <Badge className="ml-1.5 bg-white text-[#F2A900] border-none font-black text-[10px] px-1.5 shadow-sm">
                      {deletedArticles.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="list" className="space-y-6">
              {/* Barre de recherche et filtres */}
              <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto_auto] gap-3 relative">
                    <div className="relative col-span-1 sm:col-span-2 lg:col-span-1 border border-[#EBE3D5] rounded-xl focus-within:border-[#F2A900] focus-within:ring-1 focus-within:ring-[#F2A900] transition-colors bg-white overflow-hidden group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-[#F2A900]" />
                      </div>
                      <Input
                        placeholder="Rechercher un article..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-11 border-none focus-visible:ring-0 bg-transparent font-medium w-full text-sm text-[#2D1B08] placeholder:text-[#5D4037]/50"
                      />
                    </div>

                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl h-11 font-bold uppercase text-xs tracking-tighter w-full lg:w-[140px] text-[#2D1B08]">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category} className="uppercase font-bold text-[10px] text-[#2D1B08]">{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl h-11 font-bold uppercase text-xs tracking-tighter w-full lg:w-[140px] text-[#2D1B08]">
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map(status => (
                          <SelectItem key={status} value={status} className="uppercase font-bold text-[10px] text-[#2D1B08]">{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl h-11 font-bold uppercase text-xs tracking-tighter w-full lg:w-[140px] text-[#2D1B08]">
                        <SelectValue placeholder="Trier par" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date" className="uppercase font-bold text-[10px] text-[#2D1B08]">Date</SelectItem>
                        <SelectItem value="title" className="uppercase font-bold text-[10px] text-[#2D1B08]">Titre</SelectItem>
                        <SelectItem value="author" className="uppercase font-bold text-[10px] text-[#2D1B08]">Auteur</SelectItem>
                        <SelectItem value="category" className="uppercase font-bold text-[10px] text-[#2D1B08]">Catégorie</SelectItem>
                        <SelectItem value="views" className="uppercase font-bold text-[10px] text-[#2D1B08]">Vues</SelectItem>
                        <SelectItem value="likes" className="uppercase font-bold text-[10px] text-[#2D1B08]">Likes</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant={showFilters ? "default" : "outline"}
                      onClick={() => setShowFilters(!showFilters)}
                      className={`h-11 rounded-xl font-black uppercase text-xs tracking-tighter w-full lg:w-auto transition-colors ${showFilters ? 'bg-[#2D1B08] text-white hover:bg-[#2D1B08]/90 border-transparent shadow-md' : 'border-[#EBE3D5] text-[#5D4037]/70 hover:bg-[#EBE3D5]/20 hover:text-[#2D1B08]'}`}
                    >
                      <Filter className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Filtres</span>
                    </Button>
                  </div>

                  {/* Filtres avancés */}
                  {showFilters && (
                    <div className="mt-4 pt-4 border-t border-[#EBE3D5]/50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-end justify-end">
                        <Button 
                          variant="outline" 
                          onClick={clearFilters}
                          className="h-9 px-4 rounded-lg font-bold uppercase text-[10px] tracking-tighter border-[#E11D48]/30 text-[#E11D48] hover:bg-[#E11D48]/5 transition-colors"
                        >
                          <X className="h-3.5 w-3.5 mr-1.5" />
                          Réinitialiser
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Liste des articles */}
              {sortedArticles.length > 0 ? (
                <div className="grid gap-4 sm:gap-6 grid-cols-1">
                  {sortedArticles.map((article) => (
                    <Card key={article.id} className="border-2 border-[#EBE3D5] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                          {/* Image */}
                          <div className="w-full sm:w-48 xl:w-56 h-48 sm:h-36 bg-[#EBE3D5]/20 rounded-xl flex-shrink-0 overflow-hidden relative group">
                            <img 
                              src={article.image} 
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Overlay subtil */}
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none"></div>
                          </div>
                          
                          {/* Contenu */}
                          <div className="flex-1 w-full min-w-0 flex flex-col justify-between h-full space-y-3 sm:space-y-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 w-full">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <Badge className="bg-[#5D4037]/5 text-[#5D4037] border-none font-black uppercase tracking-tighter text-[9px] px-2 py-0.5 whitespace-nowrap">
                                    {article.category}
                                  </Badge>
                                  <Badge className={`${
                                    article.status === 'Publié' ? 'bg-[#1B5E20]/10 text-[#1B5E20]' :
                                    article.status === 'En attente' ? 'bg-[#F2A900]/10 text-[#F2A900]' :
                                    article.status === 'Brouillon' ? 'bg-[#5D4037]/10 text-[#5D4037]/60' :
                                    'bg-red-50 text-red-600'
                                  } border-none font-black uppercase tracking-tighter text-[9px] px-2 py-0.5 whitespace-nowrap`}>
                                    {article.status}
                                  </Badge>
                                </div>
                                
                                <h3 className="font-black text-xl text-[#2D1B08] tracking-tighter mb-1.5 leading-tight line-clamp-2 md:line-clamp-1 group-hover:text-[#F2A900] transition-colors">{article.title}</h3>
                                <p className="font-medium text-[#5D4037]/70 text-sm mb-3 line-clamp-2 leading-relaxed">{article.content}</p>
                                
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-[#5D4037]/60">
                                  <div className="flex items-center space-x-1.5 bg-[#EBE3D5]/20 px-2 py-1 rounded-md border border-[#EBE3D5]/50 whitespace-nowrap">
                                    <User className="h-3.5 w-3.5 text-[#F2A900]" />
                                    <span>{article.author}</span>
                                  </div>
                                  <div className="flex items-center space-x-1.5 bg-[#FFFDFB] px-2 py-1 rounded-md border border-[#EBE3D5]/50 whitespace-nowrap">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{article.publishDate}</span>
                                  </div>
                                  <div className="flex items-center space-x-1.5 whitespace-nowrap ml-auto sm:ml-0">
                                    <Eye className="h-3.5 w-3.5" />
                                    <span>{article.views} vues</span>
                                  </div>
                                  <div className="flex items-center space-x-1.5 whitespace-nowrap">
                                    <CheckCircle className="h-3.5 w-3.5 text-[#1B5E20]" />
                                    <span>{article.likes} likes</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Boutons d'actions Desktop */}
                              <div className="hidden xl:flex flex-col gap-2 w-32 shrink-0">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewArticle(article)}
                                  className="w-full justify-start border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black uppercase text-[10px] tracking-tighter transition-colors"
                                >
                                  <Eye className="h-3 w-3 mr-2" />
                                  Voir
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditArticle(article)}
                                  className="w-full justify-start border-[#EBE3D5] text-[#2D1B08] hover:bg-[#EBE3D5]/30 font-black uppercase text-[10px] tracking-tighter transition-colors"
                                >
                                  <Edit className="h-3 w-3 mr-2" />
                                  Modifier
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                                      handleDeleteArticle(article.id);
                                    }
                                  }}
                                  className="w-full justify-start border-[#E11D48]/30 text-[#E11D48] hover:bg-[#E11D48] hover:text-white font-black uppercase text-[10px] tracking-tighter transition-colors"
                                >
                                  <Trash2 className="h-3 w-3 mr-2" />
                                  Supprimer
                                </Button>
                              </div>
                            </div>
                            
                            {/* Boutons d'actions Mobile & Tablet */}
                            <div className="xl:hidden flex gap-2 w-full pt-3 mt-1 border-t border-[#EBE3D5]">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewArticle(article)}
                                className="flex-1 border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black uppercase text-[10px] tracking-tighter transition-colors h-9"
                              >
                                <Eye className="h-3.5 w-3.5 sm:mr-1.5" />
                                <span className="hidden sm:inline">Voir</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditArticle(article)}
                                className="flex-1 border-[#EBE3D5] text-[#2D1B08] hover:bg-[#EBE3D5]/30 font-black uppercase text-[10px] tracking-tighter transition-colors h-9"
                              >
                                <Edit className="h-3.5 w-3.5 sm:mr-1.5" />
                                <span className="hidden sm:inline">Modifier</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                                    handleDeleteArticle(article.id);
                                  }
                                }}
                                className="flex-1 border-[#E11D48]/30 text-[#E11D48] hover:bg-[#E11D48] hover:text-white font-black uppercase text-[10px] tracking-tighter transition-colors h-9"
                              >
                                <Trash2 className="h-3.5 w-3.5 sm:mr-1.5" />
                                <span className="hidden sm:inline">Suppr</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <div className="text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">Aucun article trouvé</h3>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#5D4037]/70 uppercase tracking-tighter">Total articles</p>
                        <p className="text-2xl font-black text-[#2D1B08]">{articles.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#1B5E20]/10 p-3 rounded-xl border border-[#1B5E20]/20">
                        <CheckCircle className="h-6 w-6 text-[#1B5E20]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#5D4037]/70 uppercase tracking-tighter">Publiés</p>
                        <p className="text-2xl font-black text-[#2D1B08]">
                          {articles.filter(a => a.status === 'Publié').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#F2A900]/10 p-3 rounded-xl border border-[#F2A900]/20">
                        <Clock className="h-6 w-6 text-[#F2A900]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#5D4037]/70 uppercase tracking-tighter">En attente</p>
                        <p className="text-2xl font-black text-[#2D1B08]">
                          {articles.filter(a => a.status === 'En attente').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                        <BarChart3 className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#5D4037]/70 uppercase tracking-tighter">Vues totales</p>
                        <p className="text-2xl font-black text-[#2D1B08]">
                          {articles.reduce((acc, a) => acc + a.views, 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Statistiques détaillées */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Articles par catégorie */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span>Articles par catégorie</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categories.slice(1).map(category => {
                        const count = articles.filter(a => a.category === category).length;
                        const percentage = articles.length > 0 ? Math.round((count / articles.length) * 100) : 0;
                        return (
                          <div key={category} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${
                                category === 'Tourisme' ? 'bg-blue-500' :
                                category === 'Gastronomie' ? 'bg-orange-500' :
                                category === 'Histoire' ? 'bg-purple-500' :
                                category === 'Culture' ? 'bg-pink-500' :
                                'bg-green-500'
                              }`}></div>
                              <span className="text-sm font-medium">{category}</span>
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

                {/* Articles par statut */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      <span>Articles par statut</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {statuses.slice(1).map(status => {
                        const count = articles.filter(a => a.status === status).length;
                        const percentage = articles.length > 0 ? Math.round((count / articles.length) * 100) : 0;
                        return (
                          <div key={status} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${
                                status === 'Publié' ? 'bg-green-500' :
                                status === 'En attente' ? 'bg-yellow-500' :
                                status === 'Brouillon' ? 'bg-gray-500' :
                                'bg-red-500'
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

              {/* Top articles et auteurs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Top articles par vues */}
                <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-[#2D1B08]">
                      <Eye className="h-5 w-5 text-purple-600" />
                      <span className="font-black">Top articles par vues</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {articles
                        .sort((a, b) => b.views - a.views)
                        .slice(0, 5)
                        .map((article, index) => (
                          <div key={article.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-[#EBE3D5]/20 transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-50 border border-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                <span className="text-xs font-black text-purple-600">#{index + 1}</span>
                              </div>
                              <div className="min-w-0 pr-2">
                                <p className="text-sm font-bold text-[#2D1B08] line-clamp-1">{article.title}</p>
                                <p className="text-xs font-semibold text-[#5D4037]/70 uppercase tracking-tighter">{article.author}</p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-sm font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">{article.views.toLocaleString()}</p>
                              <p className="text-[10px] font-bold text-gray-500 uppercase mt-0.5">vues</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top auteurs */}
                <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-[#2D1B08]">
                      <User className="h-5 w-5 text-blue-600" />
                      <span className="font-black">Top auteurs</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(
                        articles.reduce((acc, article) => {
                          acc[article.author] = (acc[article.author] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      )
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 5)
                        .map(([author, count], index) => (
                          <div key={author} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-blue-600">#{index + 1}</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium">{author}</p>
                                <p className="text-xs text-gray-500">Auteur</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-blue-600">{count}</p>
                              <p className="text-xs text-gray-500">article{count > 1 ? 's' : ''}</p>
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
                        {articles.reduce((acc, a) => acc + a.likes, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">Likes total</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Moyenne: {articles.length > 0 ? Math.round(articles.reduce((acc, a) => acc + a.likes, 0) / articles.length) : 0} par article
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {articles.length > 0 ? Math.round(articles.reduce((acc, a) => acc + a.views, 0) / articles.length) : 0}
                      </div>
                      <div className="text-sm text-blue-600">Vues moyennes</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Par article
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {articles.filter(a => a.status === 'Publié').length > 0 ? 
                          Math.round((articles.filter(a => a.status === 'Publié').length / articles.length) * 100) : 0}%
                      </div>
                      <div className="text-sm text-purple-600">Taux de publication</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Articles publiés / Total
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deleted" className="space-y-6">
              {/* Header pour les articles supprimés */}
              <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-[#2D1B08] uppercase tracking-tighter">Articles supprimés</h3>
                      <p className="text-[#5D4037]/70 mt-1 text-sm font-medium">
                        {deletedArticles.length} article(s) dans la corbeille
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <Badge className="bg-[#E11D48]/10 text-[#E11D48] border-none font-black uppercase text-xs tracking-tighter py-1.5 px-3">
                        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                        {deletedArticles.length} supprimé(s)
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Liste des articles supprimés */}
              {deletedArticles.length > 0 ? (
                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {deletedArticles.map((article) => (
                    <Card key={article.id} className="hover:shadow-lg transition-all overflow-hidden border-2 border-[#E11D48]/30 bg-[#FFFDFB] rounded-2xl flex flex-col group">
                      {/* Image de l'article */}
                      {article.image && (
                        <div className="w-full h-40 bg-gray-200 overflow-hidden relative">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80"
                          />
                          {/* Overlay de suppression */}
                          <div className="absolute inset-0 bg-[#2D1B08]/40 flex items-center justify-center transition-colors group-hover:bg-[#2D1B08]/20">
                            <div className="bg-[#E11D48] text-white px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-tighter shadow-md">
                              <Trash2 className="h-3.5 w-3.5 inline mr-1.5" />
                              Supprimé
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <CardContent className="p-4 sm:p-5 flex-1 flex flex-col">
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <Badge className="bg-[#5D4037]/5 text-[#5D4037] border-none font-black uppercase text-[9px] tracking-tighter">{article.category}</Badge>
                            <Badge className="bg-[#E11D48]/10 text-[#E11D48] border-none font-black uppercase text-[9px] tracking-tighter">
                              Archivé
                            </Badge>
                          </div>
                          
                          <div>
                            <h3 className="font-black text-lg text-[#2D1B08] mb-1 leading-tight line-clamp-2">{article.title}</h3>
                            <p className="text-[#5D4037]/70 text-xs mb-2 flex items-center font-bold">
                              <User className="h-3.5 w-3.5 mr-1" />
                              {article.author}
                            </p>
                            <p className="text-[#5D4037]/80 text-sm mb-3 line-clamp-2 leading-relaxed">{article.content}</p>
                          </div>

                          {/* Informations de suppression */}
                          <div className="bg-[#E11D48]/5 border border-[#E11D48]/10 p-3 rounded-xl mt-auto">
                            <div className="text-[10px] font-bold uppercase tracking-tighter text-[#E11D48] space-y-1.5">
                              <div className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1.5" />
                                Supprimé le : {new Date(article.deletedAt).toLocaleDateString('fr-FR')}
                              </div>
                              <div className="flex items-center">
                                <User className="h-3.5 w-3.5 mr-1.5" />
                                Par : {article.deletedBy}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-4 mt-2 border-t border-[#EBE3D5]">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-[10px] font-black uppercase tracking-tighter border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white h-9"
                            onClick={() => handleRestoreArticle(article.id)}
                          >
                            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                            Restaurer
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-[10px] font-black uppercase tracking-tighter border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48] hover:text-white h-9"
                            onClick={() => handlePermanentDeleteArticle(article.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                            Définitive
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <div className="text-gray-500">
                    <Trash2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">Aucun article supprimé</h3>
                    <p>Aucun article n'a été supprimé pour le moment.</p>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modales */}
      {selectedArticle && (
        <ArticleDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedArticle(null);
          }}
          article={selectedArticle}
          onEdit={handleEditArticle}
          onDelete={handleDeleteArticle}
          onPublish={handlePublishArticle}
          onArchive={handleArchiveArticle}
        />
      )}

      <ArticleEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedArticle(null);
        }}
        article={selectedArticle}
        onSave={handleSaveArticle}
        mode={editMode}
      />
    </div>
  );
};

export default ArticlesPage;
