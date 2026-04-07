import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAgencies } from '@/context/AgencyContext';
import { Camera, Tag, DollarSign, Clock, Users, MapPin, Save } from 'lucide-react';

interface OfferEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  agencyId: string;
  offerToEdit?: any;
}

const OfferEditModal: React.FC<OfferEditModalProps> = ({
  isOpen,
  onClose,
  agencyId,
  offerToEdit
}) => {
  const { addOffer, updateOffer } = useAgencies();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    type: 'Circuit',
    price: '',
    duration: '',
    capacity: 12,
    location: '',
    status: 'Active' as const,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop',
    description: '',
    amenities: [] as string[]
  });

  useEffect(() => {
    if (offerToEdit) {
      setFormData(offerToEdit);
    } else {
      setFormData({
        id: Math.random().toString(36).substr(2, 9),
        title: '',
        type: 'Circuit',
        price: '',
        duration: '',
        capacity: 12,
        location: '',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop',
        description: '',
        amenities: []
      });
    }
  }, [offerToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (offerToEdit) {
      updateOffer(agencyId, formData as any);
    } else {
      addOffer(agencyId, formData as any);
    }
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: url }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[2rem] shadow-2xl bg-[#FFFDFB]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="p-8 bg-[#F2A900] text-[#2D1B08]">
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter">
              {offerToEdit ? 'Modifier l\'Offre' : 'Nouvelle Offre'}
            </DialogTitle>
            <DialogDescription className="text-[#2D1B08]/60 text-xs font-bold uppercase tracking-widest mt-1">Créez un package inoubliable pour les voyageurs</DialogDescription>
          </DialogHeader>

          <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {/* Image Preview */}
            <div className="relative group w-full h-40 rounded-2xl overflow-hidden border-2 border-[#EBE3D5] bg-[#F9F6F2]">
              <img src={formData.image} alt="Offer Preview" className="w-full h-full object-cover" />
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                <Camera className="w-8 h-8 text-white mb-2" />
                <span className="text-white text-[10px] font-black uppercase tracking-widest">Image de couverture</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Titre de l'expédition</Label>
              <div className="relative">
                <Input 
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="pl-10 h-12 bg-white border-2 border-[#EBE3D5] rounded-xl focus:border-[#F2A900] font-bold"
                  placeholder="Ex: Safari Delta du Saloum"
                  required
                />
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037]/30" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Prix (XOF)</Label>
                <div className="relative">
                  <Input 
                    value={formData.price}
                    onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="pl-10 h-12 bg-white border-2 border-[#EBE3D5] rounded-xl focus:border-[#F2A900] font-bold"
                    placeholder="Ex: 150.000"
                    required
                  />
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037]/30" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Durée</Label>
                <div className="relative">
                  <Input 
                    value={formData.duration}
                    onChange={e => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="pl-10 h-12 bg-white border-2 border-[#EBE3D5] rounded-xl focus:border-[#F2A900] font-bold"
                    placeholder="Ex: 3 Jours"
                    required
                  />
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037]/30" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Capacité max</Label>
                <div className="relative">
                  <Input 
                    type="number"
                    value={formData.capacity}
                    onChange={e => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                    className="pl-10 h-12 bg-white border-2 border-[#EBE3D5] rounded-xl focus:border-[#F2A900] font-bold"
                    required
                  />
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037]/30" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Région</Label>
                <div className="relative">
                  <Input 
                    value={formData.location}
                    onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="pl-10 h-12 bg-white border-2 border-[#EBE3D5] rounded-xl focus:border-[#F2A900] font-bold"
                    placeholder="Ex: Sine Saloum"
                    required
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037]/30" />
                </div>
              </div>
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
                className="flex-1 bg-[#2D1B08] hover:bg-black text-white font-black uppercase tracking-widest py-6 rounded-2xl shadow-lg transition-all"
              >
                <Save className="w-4 h-4 mr-2 text-[#F2A900]" /> {offerToEdit ? 'Mettre à jour' : 'Publier l\'offre'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OfferEditModal;
