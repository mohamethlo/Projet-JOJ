import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, X, CheckCircle2, Phone, MapPin, Package, User } from 'lucide-react';
import { toast } from 'sonner';

interface ArtisanProductOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  artisanName: string;
}

const ArtisanProductOrderModal: React.FC<ArtisanProductOrderModalProps> = ({
  isOpen,
  onClose,
  product,
  artisanName
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    quantity: 1,
    customerName: '',
    phone: '',
    address: '',
    notes: ''
  });

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setStep('success');
      toast.success('Commande envoyée avec succès !');
    }, 800);
  };

  const handleClose = () => {
    setStep('form');
    setFormData({
      quantity: 1,
      customerName: '',
      phone: '',
      address: '',
      notes: ''
    });
    onClose();
  };

  const totalPrice = parseInt(product.price.replace(/[^0-9]/g, '')) * formData.quantity;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-[2.5rem] shadow-2xl bg-white">
        {step === 'form' ? (
          <>
            <div className="bg-[#2D1B08] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2A900]/10 rounded-full -mr-16 -mt-16 blur-3xl text-gold" />
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#F2A900]/20 rounded-xl">
                    <ShoppingBag className="w-5 h-5 text-[#F2A900]" />
                  </div>
                  <Badge className="bg-[#F2A900] text-white border-none font-black text-[8px] uppercase tracking-[0.2em] px-3">
                    Nouvelle Commande
                  </Badge>
                </div>
                <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
                  Commander une création
                </DialogTitle>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">
                  Artisan : <span className="text-[#F2A900]">{artisanName}</span>
                </p>
              </DialogHeader>
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col max-h-[calc(90vh-140px)]">
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar">
                {/* Product Summary */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-16 h-16 rounded-xl object-cover shadow-sm"
                  />
                  <div className="flex-1">
                    <h4 className="font-black text-[#2D1B08] text-sm uppercase tracking-tight">{product.name}</h4>
                    <p className="text-[#F2A900] font-black text-sm">{product.price}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Label className="text-[8px] font-black uppercase tracking-widest text-[#5D4037]/40 mb-1">Quantité</Label>
                    <Input 
                      type="number" 
                      min="1" 
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                      className="w-16 h-10 text-center font-black rounded-lg border-2 border-[#EBE3D5] focus-visible:ring-[#F2A900]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037]/60 flex items-center gap-2">
                        <User className="w-3 h-3 text-[#F2A900]" /> Nom complet
                      </Label>
                      <Input 
                        required
                        placeholder="Votre nom"
                        value={formData.customerName}
                        onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                        className="rounded-xl border-2 border-[#EBE3D5] focus-visible:ring-[#F2A900]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037]/60 flex items-center gap-2">
                        <Phone className="w-3 h-3 text-[#F2A900]" /> Téléphone
                      </Label>
                      <Input 
                        required
                        placeholder="+221 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="rounded-xl border-2 border-[#EBE3D5] focus-visible:ring-[#F2A900]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037]/60 flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-[#F2A900]" /> Adresse de livraison
                    </Label>
                    <Input 
                      required
                      placeholder="Quartier, Ville..."
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="rounded-xl border-2 border-[#EBE3D5] focus-visible:ring-[#F2A900]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037]/60">Notes ou personnalisation</Label>
                    <Textarea 
                      placeholder="Précisez une taille, une couleur ou un message..."
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="rounded-xl border-2 border-[#EBE3D5] focus-visible:ring-[#F2A900] min-h-[80px] text-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-4 border-t border-[#EBE3D5]/50 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xs font-bold text-[#5D4037]/60 uppercase tracking-widest italic">Total estimé</div>
                  <div className="text-2xl font-black text-[#2D1B08]">{totalPrice.toLocaleString()} FCFA</div>
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-[#1B5E20] hover:bg-[#154618] text-white font-black uppercase tracking-widest py-6 rounded-2xl shadow-xl shadow-green-900/10 transition-all hover:scale-[1.02]"
                >
                  Confirmer la commande
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-500 animate-in zoom-in duration-500" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-[#2D1B08] uppercase tracking-tighter mb-2">Merci !</h3>
              <p className="text-[#5D4037] font-medium leading-relaxed italic">
                Votre commande a été transmise à <span className="font-bold text-[#2D1B08]">{artisanName}</span>. 
                Il vous contactera prochainement au <span className="font-bold text-[#F2A900]">{formData.phone}</span> pour finaliser la livraison.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-start gap-4 text-left">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <Package className="w-5 h-5 text-[#F2A900]" />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#5D4037]/40 uppercase tracking-widest">Récapitulatif</p>
                <p className="text-sm font-bold text-[#2D1B08]">{formData.quantity}x {product.name}</p>
                <p className="text-sm font-black text-[#1B5E20]">{totalPrice.toLocaleString()} FCFA</p>
              </div>
            </div>
            <Button 
              onClick={handleClose}
              className="w-full bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black uppercase tracking-widest py-6 rounded-2xl transition-all"
            >
              Fermer
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ArtisanProductOrderModal;
