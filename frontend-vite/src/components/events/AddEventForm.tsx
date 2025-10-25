import React, { useState } from 'react';
import { apiPost } from '@/lib/api';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface AddEventFormProps {
  onEventAdded: () => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ onEventAdded }) => {
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    startDateTime: '',
    endDateTime: '',
    type: 'sport',
    category: 'autre',
    price: '',
    capacity: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setEventData({ ...eventData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventData.title || !eventData.location || !eventData.startDateTime) {
      return Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs obligatoires.',
        confirmButtonColor: '#f97316',
      });
    }

    setLoading(true);
    try {
      const payload = {
        title: eventData.title,
        description: eventData.description || null,
        location: eventData.location,
        startDateTime: eventData.startDateTime,
        endDateTime: eventData.endDateTime || null,
        type: eventData.type,
        category: eventData.category,
        price: eventData.price || null,
        date: eventData.startDateTime, // obligatoire pour le backend
      };

      await apiPost('/api/events', payload);

      // Fermer le Dialog et rafraîchir la liste avant d'afficher l'alerte
      onEventAdded();

      // Laisser le temps au Dialog de se fermer avant d'ouvrir SweetAlert
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Événement ajouté 🎉',
          text: 'L’événement a été créé avec succès.',
          confirmButtonColor: '#f97316',
          showConfirmButton: true,
        });
      }, 300);

      // Réinitialiser le formulaire
      setEventData({
        title: '',
        description: '',
        location: '',
        startDateTime: '',
        endDateTime: '',
        type: 'sport',
        category: 'autre',
        price: '',
        capacity: ''
      });

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible d’ajouter l’événement.',
        confirmButtonColor: '#f97316',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="title" value={eventData.title} onChange={handleChange} placeholder="Titre" required />
      <Textarea name="description" value={eventData.description} onChange={handleChange} placeholder="Description" />
      <Input name="location" value={eventData.location} onChange={handleChange} placeholder="Lieu" required />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="datetime-local"
          name="startDateTime"
          value={eventData.startDateTime}
          onChange={handleChange}
          required
        />
        <Input
          type="datetime-local"
          name="endDateTime"
          value={eventData.endDateTime}
          onChange={handleChange}
        />
      </div>

      <Select value={eventData.type} onValueChange={v => handleSelectChange('type', v)}>
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sport">Sport</SelectItem>
          <SelectItem value="other">Autre</SelectItem>
        </SelectContent>
      </Select>

      <Select value={eventData.category} onValueChange={v => handleSelectChange('category', v)}>
        <SelectTrigger>
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="autre">Autre</SelectItem>
          <SelectItem value="football">Football</SelectItem>
          <SelectItem value="musique">Musique</SelectItem>
          <SelectItem value="culture">Culture</SelectItem>
        </SelectContent>
      </Select>

      <Input name="price" value={eventData.price} onChange={handleChange} placeholder="Prix (optionnel)" />

      <Button type="submit" disabled={loading}>
        {loading ? 'Ajout en cours...' : 'Ajouter l’événement'}
      </Button>
    </form>
  );
};

export default AddEventForm;
