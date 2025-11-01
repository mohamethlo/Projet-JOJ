import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Swal from 'sweetalert2';
import { apiPost } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface AddArticleModalProps {
  open: boolean;
  onClose: () => void;
  onArticleAdded: () => void;
}

const categories = ['Actualités', 'Culture', 'Sport', 'Politique', 'Économie'];

const AddArticleModal: React.FC<AddArticleModalProps> = ({ open, onClose, onArticleAdded }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: user?.email || '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!form.title || !form.content) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir le titre et le contenu.',
        confirmButtonColor: '#f97316',
      });
      return;
    }
    if (!form.category) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez sélectionner une catégorie.',
        confirmButtonColor: '#f97316',
      });
      return;
    }
    if (!imageFile) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez sélectionner une image.',
        confirmButtonColor: '#f97316',
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('excerpt', form.excerpt);
      formData.append('content', form.content);
      formData.append('category', form.category);
      formData.append('author', form.author);
      formData.append('image', imageFile);

      await apiPost('/api/articles', formData);

      // Réinitialiser le formulaire
      setForm({ 
        title: '', 
        excerpt: '', 
        content: '', 
        category: '', 
        author: user?.email || '' 
      });
      setImageFile(null);

      // Fermer le modal avant d'afficher le SweetAlert
      onClose();

      // Petit délai pour laisser le Dialog se fermer
      setTimeout(async () => {
        await Swal.fire({
          icon: 'success',
          title: 'Article ajouté 📰',
          text: "L'article a été créé avec succès !",
          confirmButtonColor: '#f97316',
          showConfirmButton: true,
        });
      }, 300);

      // Rafraîchir la liste des articles
      onArticleAdded();

    } catch (error) {
      console.error('Erreur ajout article:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Impossible d'ajouter l'article.",
        confirmButtonColor: '#f97316',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" aria-describedby="add-article-dialog">
        <DialogHeader>
          <DialogTitle>Ajouter un article</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Titre"
            required
          />

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Catégorie</span>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="">-- Sélectionnez une catégorie --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <Input 
            name="author" 
            value={form.author} 
            onChange={handleChange} 
            placeholder="Auteur" 
          />

          <Textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Résumé (extrait)"
            rows={3}
          />
          
          <Textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Contenu complet..."
            rows={8}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Ajout en cours...' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddArticleModal;