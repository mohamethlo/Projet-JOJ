import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Trash2, Image as ImageIcon, Upload } from 'lucide-react';
import { useRef } from 'react';

interface RestaurantEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant?: any;
  mode: 'create' | 'edit';
  onSave?: (data: any) => void;
}

const RestaurantEditModal: React.FC<RestaurantEditModalProps> = ({
  isOpen,
  onClose,
  restaurant,
  mode,
  onSave
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    location: '',
    images: [''], // Tableau de chaines pour les URLs d'images
    phone: '',
    email: '',
    openingHours: '',
    description: ''
  });

  useEffect(() => {
    if (mode === 'edit' && restaurant) {
      setFormData({
        name: restaurant.name || '',
        specialty: restaurant.specialty || '',
        location: restaurant.location || '',
        images: restaurant.images && restaurant.images.length > 0 ? [...restaurant.images] : [restaurant.image || ''],
        phone: restaurant.phone || '',
        email: restaurant.email || '',
        openingHours: restaurant.openingHours || '',
        description: restaurant.description || ''
      });
    } else {
      setFormData({
        name: '',
        specialty: '',
        location: '',
        images: [''],
        phone: '',
        email: '',
        openingHours: '',
        description: ''
      });
    }
  }, [mode, restaurant, isOpen]);

  const handleAddImage = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const handleRemoveImage = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData({ ...formData, images: newImages });
    } else {
      setFormData({ ...formData, images: [''] });
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = [...formData.images];
      
      // Convertir les fichiers en URLs d'objets (pour la prévisualisation locale)
      Array.from(files).forEach(file => {
        const objectUrl = URL.createObjectURL(file);
        // Si le dernier champ est vide, on le remplace, sinon on ajoute
        if (newImages.length === 1 && newImages[0] === '') {
          newImages[0] = objectUrl;
        } else {
          newImages.push(objectUrl);
        }
      });
      
      setFormData({ ...formData, images: newImages });
      // Reset input pour permettre de ré-uploader le même fichier si besoin
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    toast.success(mode === 'create' ? 'Restaurant créé avec succès' : 'Modifications enregistrées');
    onClose();
  };

  const specialties = ['Sénégalaise', 'Fruits de Mer', 'Italienne', 'Asiatique', 'Française', 'Libanaise'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[2.5rem] shadow-2xl bg-white">
        <div className="bg-[#2D1B08] pt-12 pb-10 px-10 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter">
              {mode === 'create' ? 'Ajouter un Restaurant' : 'Modifier l\'établissement'}
            </DialogTitle>
            <p className="text-white/60 text-[11px] font-black uppercase tracking-widest mt-2">
              Remplissez les informations professionnelles de l'établissement
            </p>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Nom du restaurant</Label>
              <Input 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="h-12 rounded-xl border-2 border-[#EBE3D5] focus:ring-[#F2A900] font-bold"
                placeholder="Ex: Le Lagon"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Spécialité</Label>
              <Select 
                value={formData.specialty} 
                onValueChange={(val) => setFormData({...formData, specialty: val})}
              >
                <SelectTrigger className="h-12 rounded-xl border-2 border-[#EBE3D5] font-black uppercase text-[10px] tracking-widest">
                  <SelectValue placeholder="Choisir" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map(s => <SelectItem key={s} value={s} className="font-bold uppercase text-[10px] tracking-widest">{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Localisation (Ville)</Label>
              <Input 
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="h-12 rounded-xl border-2 border-[#EBE3D5] focus:ring-[#F2A900] font-bold"
                placeholder="Ex: Dakar, Plateau"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Téléphone</Label>
              <Input 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="h-12 rounded-xl border-2 border-[#EBE3D5] focus:ring-[#F2A900] font-bold"
                placeholder="+221 ..."
              />
            </div>

            {/* Gestion des Images */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Photos de l'établissement</Label>
                <div className="flex gap-2">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                  />
                  <Button 
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 border-2 border-[#EBE3D5] text-[#1B5E20] font-black uppercase text-[9px] tracking-widest rounded-lg hover:bg-emerald-50"
                  >
                    <Upload className="w-3 h-3 mr-1" /> Uploader
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddImage}
                    className="h-8 border-2 border-[#EBE3D5] text-[#2D1B08] font-black uppercase text-[9px] tracking-widest rounded-lg"
                  >
                    <Plus className="w-3 h-3 mr-1" /> URL
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="flex gap-3 items-start bg-gray-50/50 p-3 rounded-2xl border-2 border-dashed border-[#EBE3D5]">
                    {img && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037]/30" />
                        <Input 
                          value={img}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          className="pl-12 h-11 rounded-xl border-none bg-white font-medium text-xs shadow-sm"
                          placeholder="Collez l'URL de l'image ou utilisez 'Uploader'"
                        />
                      </div>
                    </div>
                    {formData.images.length > 1 && (
                      <Button 
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveImage(index)}
                        className="h-11 w-11 rounded-xl border-none bg-white shadow-sm text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Description & Histoire</Label>
              <Textarea 
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="min-h-[120px] rounded-xl border-2 border-[#EBE3D5] focus:ring-[#F2A900] font-medium leading-relaxed"
                placeholder="Décrivez l'ambiance, la cuisine et l'histoire de l'établissement..."
              />
            </div>
          </div>
        </form>

        <DialogFooter className="py-10 px-10 border-t border-[#EBE3D5] flex gap-4 bg-gray-50/50">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1 h-14 rounded-2xl border-2 border-[#EBE3D5] text-[#2D1B08] font-black uppercase tracking-widest text-xs"
          >
            Annuler
          </Button>
          <Button 
            onClick={handleSubmit}
            className="flex-1 h-14 rounded-2xl bg-[#F2A900] hover:bg-[#D49400] text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-[#F2A900]/20"
          >
            {mode === 'create' ? 'Créer l\'établissement' : 'Enregistrer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantEditModal;
