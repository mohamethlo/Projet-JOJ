import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAgencies } from '@/context/AgencyContext';
import { MapPin, Info, Save, Plus, Trash2, Link as LinkIcon } from 'lucide-react';

interface AgencyEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  agencyToEdit?: any;
}

const AgencyEditModal: React.FC<AgencyEditModalProps> = ({
  isOpen,
  onClose,
  agencyToEdit
}) => {
  const { addAgency, updateAgency } = useAgencies();
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    location: '',
    image: '',
    images: [] as string[],
    rating: 4.5,
    reviews: 0,
    status: 'Actif' as const,
    offers: []
  });

  useEffect(() => {
    if (agencyToEdit) {
      setFormData({
        ...agencyToEdit,
        images: agencyToEdit.images || [agencyToEdit.image]
      });
    } else {
      setFormData({
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        description: '',
        location: '',
        image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop',
        images: ['https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop'],
        rating: 4.5,
        reviews: 0,
        status: 'Actif',
        offers: []
      });
    }
  }, [agencyToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      image: formData.images[0] || formData.image
    };
    if (agencyToEdit) {
      updateAgency(finalData as any);
    } else {
      addAgency(finalData as any);
    }
    onClose();
  };

  const handleAddImageUrl = () => {
    if (imageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()]
      }));
      setImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file);
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, url]
        }));
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-none rounded-[2rem] shadow-2xl bg-[#FFFDFB]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="p-8 bg-[#2D1B08] text-white">
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter">
              {agencyToEdit ? 'Modifier l\'Agence' : 'Nouvelle Agence'}
            </DialogTitle>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">Configurez les informations du partenaire et sa galerie</p>
          </DialogHeader>

          <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Images Gallery */}
            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Galerie Photos (Plusieurs images)</Label>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative aspect-video rounded-xl overflow-hidden border-2 border-[#EBE3D5] group">
                    <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-[#F2A900] text-[#2D1B08] text-[8px] font-black uppercase text-center py-1">Principale</div>
                    )}
                  </div>
                ))}
                
                <label className="aspect-video rounded-xl border-2 border-dashed border-[#EBE3D5] hover:border-[#F2A900] transition-colors flex flex-col items-center justify-center cursor-pointer bg-[#F9F6F2]">
                  <Plus className="w-6 h-6 text-[#5D4037]/30" />
                  <span className="text-[8px] font-black uppercase text-[#5D4037]/40 mt-1 text-center px-2">Ajouter des photos</span>
                  <input type="file" className="hidden" accept="image/*" multiple onChange={handleFileUpload} />
                </label>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input 
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    placeholder="Ajouter par URL (ex: https://...)"
                    className="pl-10 h-11 bg-white border-2 border-[#EBE3D5] rounded-xl focus:border-[#F2A900] font-medium text-xs"
                  />
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037]/30" />
                </div>
                <Button 
                  type="button" 
                  onClick={handleAddImageUrl}
                  className="bg-[#2D1B08] text-white px-6 rounded-xl hover:bg-black font-black text-xs uppercase"
                >
                  Ajouter URL
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#EBE3D5]/30">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Nom de l'agence</Label>
                <div className="relative">
                  <Input 
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-10 h-12 bg-white border-2 border-[#EBE3D5] rounded-xl focus:border-[#F2A900] font-bold"
                    placeholder="Ex: Sahel Tours"
                    required
                  />
                  <Info className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037]/30" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Localisation</Label>
                <div className="relative">
                  <Input 
                    value={formData.location}
                    onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="pl-10 h-12 bg-white border-2 border-[#EBE3D5] rounded-xl focus:border-[#F2A900] font-bold"
                    placeholder="Ex: Dakar, Sénégal"
                    required
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037]/30" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Description / Vision</Label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full min-h-[120px] p-4 bg-white border-2 border-[#EBE3D5] rounded-xl focus:border-[#F2A900] font-medium text-sm text-[#5D4037] outline-none transition-colors"
                placeholder="Décrivez l'agence et ses points forts..."
                required
              />
            </div>
          </div>

          <DialogFooter className="p-8 border-t border-[#EBE3D5] bg-[#F9F6F2]">
            <div className="flex gap-4 w-full">
              <Button 
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-2 border-[#2D1B08] text-[#2D1B08] hover:bg-[#2D1B08] hover:text-white font-black uppercase tracking-widest py-6 rounded-2xl transition-all"
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black uppercase tracking-widest py-6 rounded-2xl shadow-lg transition-all"
              >
                <Save className="w-4 h-4 mr-2" /> Enregistrer
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AgencyEditModal;
