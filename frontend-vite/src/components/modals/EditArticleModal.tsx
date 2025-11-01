import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Swal from 'sweetalert2';
import { apiPut } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface EditArticleModalProps {
  open: boolean;
  onClose: () => void;
  article: any | null;
  onArticleUpdated: () => void;
}

const categories = ['Actualités', 'Culture', 'Sport', 'Politique', 'Économie', 'Histoire', 'Traditions', 'Art', 'Patrimoine'];

const EditArticleModal: React.FC<EditArticleModalProps> = ({ open, onClose, article, onArticleUpdated }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (article) {
      setForm({
        title: article.title || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        category: article.category || '',
        author: article.author || user?.email || '',
      });
    }
  }, [article, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir le titre et le contenu.',
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
      
      // Ajouter l'image seulement si une nouvelle image a été sélectionnée
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await apiPut(`/api/articles/${article.id}`, formData);

      // Fermer le modal avant d'afficher le SweetAlert
      onClose();

      setTimeout(async () => {
        await Swal.fire({
          icon: 'success',
          title: 'Article modifié 📝',
          text: "L'article a été mis à jour avec succès !",
          confirmButtonColor: '#f97316',
          showConfirmButton: true,
        });
      }, 300);

      onArticleUpdated();
    } catch (error) {
      console.error('Erreur modification article:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Impossible de modifier l'article.",
        confirmButtonColor: '#f97316',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier l'article</DialogTitle>
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
            <span className="text-sm font-medium text-gray-700">
              Nouvelle image (optionnel - laissez vide pour garder l'image actuelle)
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
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
            required
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Mise à jour...' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditArticleModal;