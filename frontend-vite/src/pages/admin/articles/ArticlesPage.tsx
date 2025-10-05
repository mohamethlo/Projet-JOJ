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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Publié':
        return 'bg-green-100 text-green-700';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Brouillon':
        return 'bg-gray-100 text-gray-700';
      case 'Archivé':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tourisme':
        return 'bg-blue-100 text-blue-700';
      case 'Gastronomie':
        return 'bg-orange-100 text-orange-700';
      case 'Histoire':
        return 'bg-purple-100 text-purple-700';
      case 'Culture':
        return 'bg-pink-100 text-pink-700';
      case 'Événements':
        return 'bg-green-100 text-green-700';
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
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Articles</h1>
              <p className="text-gray-600 mt-1">Administrez tous les articles de la plateforme</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-700 text-sm">
                {sortedArticles.length} article(s)
              </Badge>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleCreateArticle}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouvel article
              </Button>
            </div>
          </div>

          {/* Onglets */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="list" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Liste des articles</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Statistiques</span>
              </TabsTrigger>
              <TabsTrigger value="deleted" className="flex items-center space-x-2">
                <Trash2 className="h-4 w-4" />
                <span>Articles supprimés</span>
                {deletedArticles.length > 0 && (
                  <Badge variant="destructive" className="ml-1 text-xs">
                    {deletedArticles.length}
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
                        placeholder="Rechercher un article..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-12 text-lg"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
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
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="title">Titre</SelectItem>
                          <SelectItem value="author">Auteur</SelectItem>
                          <SelectItem value="category">Catégorie</SelectItem>
                          <SelectItem value="views">Vues</SelectItem>
                          <SelectItem value="likes">Likes</SelectItem>
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
                      <div className="flex items-end">
                        <Button variant="outline" onClick={clearFilters}>
                          <X className="h-4 w-4 mr-2" />
                          Réinitialiser
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Liste des articles */}
              {sortedArticles.length > 0 ? (
                <div className="space-y-4">
                  {sortedArticles.map((article) => (
                    <Card key={article.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
                            <img 
                              src={article.image} 
                              alt={article.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge className={getCategoryColor(article.category)}>
                                    {article.category}
                                  </Badge>
                                  <Badge className={getStatusColor(article.status)}>
                                    {article.status}
                                  </Badge>
                                </div>
                                
                                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{article.title}</h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.content}</p>
                                
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <User className="h-4 w-4" />
                                    <span>{article.author}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{article.publishDate}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Eye className="h-4 w-4" />
                                    <span>{article.views} vues</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>{article.likes} likes</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2 ml-4">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewArticle(article)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Voir
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditArticle(article)}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
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
                                  className="border-red-500 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Supprimer
                                </Button>
                              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Total articles</p>
                        <p className="text-2xl font-bold">{articles.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Publiés</p>
                        <p className="text-2xl font-bold">
                          {articles.filter(a => a.status === 'Publié').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-8 w-8 text-yellow-600" />
                      <div>
                        <p className="text-sm text-gray-600">En attente</p>
                        <p className="text-2xl font-bold">
                          {articles.filter(a => a.status === 'En attente').length}
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
                        <p className="text-sm text-gray-600">Vues totales</p>
                        <p className="text-2xl font-bold">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top articles par vues */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-purple-600" />
                      <span>Top articles par vues</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {articles
                        .sort((a, b) => b.views - a.views)
                        .slice(0, 5)
                        .map((article, index) => (
                          <div key={article.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-purple-600">#{index + 1}</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium line-clamp-1">{article.title}</p>
                                <p className="text-xs text-gray-500">{article.author}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-purple-600">{article.views.toLocaleString()}</p>
                              <p className="text-xs text-gray-500">vues</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top auteurs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-blue-600" />
                      <span>Top auteurs</span>
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
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Articles supprimés</h3>
                      <p className="text-gray-600 mt-1">
                        {deletedArticles.length} article(s) supprimé(s)
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="destructive" className="text-sm">
                        <Trash2 className="h-3 w-3 mr-1" />
                        {deletedArticles.length} supprimé(s)
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Liste des articles supprimés */}
              {deletedArticles.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {deletedArticles.map((article) => (
                    <Card key={article.id} className="hover:shadow-lg transition-shadow overflow-hidden border-red-200 bg-red-50">
                      {/* Image de l'article */}
                      {article.image && (
                        <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
                          <img 
                            src={article.image} 
                            alt={article.title}
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
                            <Badge variant="outline" className="text-xs">{article.category}</Badge>
                            <Badge className="bg-red-100 text-red-700 text-xs">
                              Supprimé
                            </Badge>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{article.title}</h3>
                            <p className="text-gray-600 text-sm mb-2 flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {article.author}
                            </p>
                            <p className="text-gray-700 text-sm mb-3 line-clamp-2">{article.content}</p>
                          </div>

                          {/* Informations de suppression */}
                          <div className="bg-red-100 p-3 rounded-lg">
                            <div className="text-xs text-red-700 space-y-1">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Supprimé le: {new Date(article.deletedAt).toLocaleDateString('fr-FR')}
                              </div>
                              <div className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                Par: {article.deletedBy}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-3">
                              <span className="text-blue-600 font-medium flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {article.views}
                              </span>
                              <span className="text-green-600 font-medium flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {article.likes}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">{article.publishDate}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs border-green-500 text-green-600 hover:bg-green-50"
                              onClick={() => handleRestoreArticle(article.id)}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Restaurer
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs border-red-500 text-red-600 hover:bg-red-50"
                              onClick={() => handlePermanentDeleteArticle(article.id)}
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
