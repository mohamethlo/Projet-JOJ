import React, { useEffect, useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Search, BookOpen, Clock, Plus } from 'lucide-react';
import ArticleCard from '@/components/cards/ArticleCard';
import { useAuth } from '@/context/AuthContext';
import { apiGet, apiDelete } from '@/lib/api';
import AddArticleModal from '@/components/modals/AddArticleModal';
import EditArticleModal from '@/components/modals/EditArticleModal';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime?: string;
  createdAt?: string;
}

/**
 * HistoryPage
 * - Recherche + filtre par catégorie
 * - Bouton Ajouter visible uniquement pour ADMIN
 * - Intégration API backend via apiGet('/api/articles')
 * - Modales Add / Edit
 * - SweetAlert pour la suppression
 */
const categories = ['Tous', 'Histoire', 'Culture', 'Traditions', 'Art', 'Patrimoine'];

const HistoryPage: React.FC = () => {
  const { user } = useAuth();

  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Pagination légère (optionnelle — tu peux étendre)
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Fetch articles depuis le backend, with optional query params
  const fetchArticles = useCallback(async (opts?: { q?: string; category?: string; page?: number }) => {
    setLoading(true);
    try {
      let endpoint = '/api/articles';
      const params: string[] = [];

      if (opts?.q) params.push(`q=${encodeURIComponent(opts.q)}`);
      if (opts?.category && opts.category !== 'Tous') params.push(`category=${encodeURIComponent(opts.category)}`);
      if (opts?.page) params.push(`page=${opts.page}`);

      if (params.length > 0) endpoint += `?${params.join('&')}`;

      const data = await apiGet<Article[]>(endpoint);
      setArticles(data || []);
      setFilteredArticles(data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des articles :', err);
      setArticles([]);
      setFilteredArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search: évite d'appeler l'API à chaque frappe
  useEffect(() => {
    const handler = setTimeout(() => {
      // On fait la requête côté backend (meilleure cohérence si backend supporte q param)
      fetchArticles({ q: searchTerm || undefined, category: selectedCategory || undefined, page });
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm, selectedCategory, page, fetchArticles]);

  // Au montage, fetch initial
  useEffect(() => {
    fetchArticles({ page });
  }, [fetchArticles, page]);

  // Filtrage côté client (complément si backend ne gère pas tout)
  useEffect(() => {
    let list = [...articles];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(a =>
        (a.title || '').toLowerCase().includes(q) ||
        (a.excerpt || '').toLowerCase().includes(q) ||
        (a.content || '').toLowerCase().includes(q) ||
        (a.author || '').toLowerCase().includes(q)
      );
    }
    if (selectedCategory && selectedCategory !== 'Tous') {
      list = list.filter(a => (a.category || '').toLowerCase() === selectedCategory.toLowerCase());
    }
    setFilteredArticles(list);
  }, [articles, searchTerm, selectedCategory]);

  // Handlers pour modales
  const handleOpenAdd = () => setShowAddModal(true);
  const handleOpenEdit = (article: Article) => {
    setSelectedArticle(article);
    setShowEditModal(true);
  };

  // Handler pour la suppression avec SweetAlert
  const handleDelete = async (articleId: number) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Confirmer la suppression',
      text: 'Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await apiDelete(`/api/articles/${articleId}`);
        
        await Swal.fire({
          icon: 'success',
          title: 'Article supprimé 🗑️',
          text: "L'article a été supprimé avec succès.",
          confirmButtonColor: '#f97316',
          showConfirmButton: true,
        });

        // Rafraîchir la liste
        refresh();
      } catch (error) {
        console.error('Erreur suppression article:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de supprimer cet article.',
          confirmButtonColor: '#f97316',
        });
      }
    }
  };

  // Callback après ajout / modif / suppression : raffraîchir
  const refresh = () => {
    fetchArticles({ q: searchTerm || undefined, category: selectedCategory || undefined, page });
  };

  // Top count pour Badge
  const articleCount = filteredArticles.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Histoire & Culture</h1>
          <p className="text-gray-600 mt-1">Explorez le riche patrimoine sénégalais</p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-blue-100 text-blue-700">{articleCount} article(s)</Badge>

          {/* Bouton Ajouter visible uniquement pour ADMIN */}
          {user?.role === 'ADMIN' && (
            <Button
              onClick={handleOpenAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" /> Ajouter un article
            </Button>
          )}
        </div>
      </div>

      {/* Hero */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-4">Découvrez l'Âme du Sénégal</h2>
              <p className="opacity-90 mb-6">
                Plongez dans l'histoire fascinante du Sénégal, de ses royaumes précoloniaux
                à sa culture contemporaine vibrante. Chaque article vous rapproche de l'essence
                de la Teranga sénégalaise.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{articleCount}+ Articles</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Lecture : 5-20 min</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 h-64 lg:h-auto relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://images.pexels.com/photos/8828593/pexels-photo-8828593.jpeg?auto=compress&cs=tinysrgb&w=600)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={(v) => setSelectedCategory(v)}>
              <SelectTrigger className="w-48 flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Articles Grid */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Chargement des articles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={(a: Article) => handleOpenEdit(a)}
              onDelete={(id: number) => handleDelete(id)}
            />
          ))}
        </div>
      )}

      {filteredArticles.length === 0 && !loading && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-gray-500 mb-4">
              <BookOpen className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium">Aucun article trouvé</h3>
              <p className="mt-1">Essayez d'ajuster vos critères de recherche</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modales */}
      <AddArticleModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onArticleAdded={() => {
          setShowAddModal(false);
          refresh();
        }}
      />

      <EditArticleModal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedArticle(null);
        }}
        article={selectedArticle}
        onArticleUpdated={() => {
          setShowEditModal(false);
          setSelectedArticle(null);
          refresh();
        }}
      />
    </div>
  );
};

export default HistoryPage;