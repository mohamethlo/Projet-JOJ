import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Clock, 
  Utensils, 
  Tag,
  Info,
  Calendar,
  Image as ImageIcon,
  ChevronRight,
  Plus,
  ChefHat,
  ChevronLeft
} from 'lucide-react';

interface RestaurantDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: any;
  onStatusChange: (id: string, status: string) => void;
}

const RestaurantDetailsModal: React.FC<RestaurantDetailsModalProps> = ({
  isOpen,
  onClose,
  restaurant,
  onStatusChange
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (!restaurant) return null;

  // Utiliser les images du restaurant ou l'image principale par défaut
  const galleryImages = restaurant.images && restaurant.images.length > 0 ? restaurant.images : [restaurant.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Mock Menu and Offers for verification
  const mockMenu = [
    { category: 'Entrées', items: ['Pastels au thon', 'Salade de la mer', 'Accras de morue'] },
    { category: 'Plats', items: ['Thieboudienne Penda Mbaye', 'Yassa au Poulet', 'Mafé de Boeuf'] },
    { category: 'Desserts', items: ['Thiakry à la mangue', 'Beignets dougoub', 'Crème au pain de singe'] }
  ];

  const mockOffers = [
    { title: 'Menu Midi', description: 'Plat + Boisson à 7 500 FCFA', validity: 'Lun-Ven' },
    { title: 'Happy Hour', description: '-20% sur les cocktails', validity: '18h - 20h' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Validé': return <Badge className="bg-green-500 text-white border-none px-4 py-1.5 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-green-500/20">Validé</Badge>;
      case 'En attente': return <Badge className="bg-blue-500 text-white border-none px-4 py-1.5 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-500/20">En attente</Badge>;
      default: return <Badge className="bg-red-500 text-white border-none px-4 py-1.5 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-red-500/20">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0 overflow-y-auto lg:overflow-hidden border-none rounded-[2rem] sm:rounded-[3rem] shadow-2xl bg-[#FFFDFB] max-h-[95vh] sm:max-h-[92vh] custom-scrollbar">
        <DialogHeader className="sr-only">
          <DialogTitle>{restaurant.name}</DialogTitle>
          <DialogDescription>Détails du restaurant {restaurant.name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col lg:flex-row lg:h-full lg:overflow-hidden">
          {/* Left Side: Visual & Basic Info (Carousel) */}
          <div className="lg:w-2/5 relative bg-[#2D1B08] min-h-[250px] sm:min-h-[400px] lg:min-h-full overflow-hidden group/carousel flex-shrink-0">
            <div className="absolute inset-0 transition-transform duration-500 ease-in-out flex items-center justify-center bg-[#2D1B08]">
              {galleryImages[currentImageIndex] ? (
                <img 
                  src={galleryImages[currentImageIndex]} 
                  className="w-full h-full object-cover opacity-60 transition-all duration-700 group-hover/carousel:scale-110"
                  alt={`${restaurant.name} - ${currentImageIndex + 1}`}
                  key={currentImageIndex}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-white/20">
                  <ImageIcon className="w-24 h-24 mb-4" />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Aucune image disponible</span>
                </div>
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B08] via-transparent to-transparent"></div>
            
            {/* Carousel Navigation */}
            {galleryImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[#F2A900] transition-all opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0 outline-none"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[#F2A900] transition-all opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0 outline-none"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                {/* Carousel Indicators */}
                <div className="absolute bottom-32 left-6 sm:bottom-40 sm:left-10 flex gap-1.5">
                  {galleryImages.map((_: string, i: number) => (
                    <div 
                      key={i} 
                      className={`h-1 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'w-8 bg-[#F2A900]' : 'w-2 bg-white/30'}`}
                    ></div>
                  ))}
                </div>
              </>
            )}

            <div className="absolute top-6 left-6 sm:top-10 sm:left-10 flex gap-3">
              {getStatusBadge(restaurant.status)}
            </div>

            <div className="absolute bottom-8 left-6 right-6 sm:bottom-12 sm:left-10 sm:right-10 text-white">
              <div className="text-[10px] sm:text-[13px] font-black text-[#F2A900] uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-2 sm:mb-3">{restaurant.specialty}</div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-tight mb-4 sm:mb-6 drop-shadow-lg break-words">{restaurant.name}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-[10px] sm:text-sm font-bold text-white/90 bg-black/20 backdrop-blur-md w-fit p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10">
                <div className="flex items-center"><MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#F2A900]" /> {restaurant.location}</div>
                <div className="flex items-center text-[#F2A900]"><Star className="w-4 h-4 sm:w-5 sm:h-5 mr-1 fill-current" /> {restaurant.rating}</div>
              </div>
            </div>
          </div>

          {/* Right Side: Detailed Stats & Verification */}
          <div className="lg:w-3/5 p-6 sm:p-10 lg:p-14 lg:overflow-y-auto custom-scrollbar">
            <div className="space-y-12">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-8 bg-white p-5 sm:p-6 rounded-3xl border-2 border-[#EBE3D5]/50 shadow-sm">
                <div className="space-y-2 w-full sm:w-auto">
                  <div className="text-[10px] font-black text-[#5D4037]/40 uppercase tracking-widest">Contact Pro</div>
                  <div className="text-[12px] sm:text-[13px] font-black text-[#2D1B08] flex items-center gap-2 group cursor-pointer hover:text-[#F2A900] transition-colors break-all"><Phone className="w-3.5 h-3.5 text-[#F2A900] flex-shrink-0" /> {restaurant.phone}</div>
                  <div className="text-[12px] sm:text-[13px] font-black text-[#2D1B08] flex items-center gap-2 group cursor-pointer hover:text-[#F2A900] transition-colors break-all"><Mail className="w-3.5 h-3.5 text-[#F2A900] flex-shrink-0" /> {restaurant.email}</div>
                </div>
                <div className="space-y-2 text-left sm:text-right w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-[#EBE3D5]/30">
                  <div className="text-[10px] font-black text-[#5D4037]/40 uppercase tracking-widest">Ouverture</div>
                  <div className="text-[12px] sm:text-[13px] font-black text-[#2D1B08] flex items-center sm:justify-end gap-2"><Clock className="w-3.5 h-3.5 text-[#F2A900] flex-shrink-0" /> {restaurant.openingHours}</div>
                  <Badge variant="outline" className="mt-2 border-green-100 text-green-600 bg-green-50 uppercase text-[8px] font-black tracking-widest">Ouvert actuellement</Badge>
                </div>
              </div>

              {/* Galerie Photos */}
              {galleryImages.length > 0 && (
                <div>
                  <div className="text-[12px] font-black text-[#2D1B08] uppercase tracking-widest mb-6 flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-[#F2A900]" /> Galerie d'images ({galleryImages.length})
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {galleryImages.map((img: string, i: number) => (
                      <div 
                        key={i} 
                        onClick={() => setCurrentImageIndex(i)}
                        className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer group shadow-sm hover:shadow-lg ${i === currentImageIndex ? 'border-[#F2A900] ring-4 ring-[#F2A900]/10' : 'border-[#EBE3D5] hover:border-[#F2A900]'}`}
                      >
                        <img 
                          src={img} 
                          alt={`Aperçu ${i}`} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                    <button className="aspect-square rounded-2xl border-2 border-dashed border-[#EBE3D5] hover:border-[#F2A900] hover:bg-[#F2A900]/5 flex flex-col items-center justify-center gap-1 transition-all group">
                      <Plus className="w-4 h-4 text-[#5D4037]/40 group-hover:text-[#F2A900]" />
                      <span className="text-[8px] font-black uppercase text-[#5D4037]/40 group-hover:text-[#F2A900]">Plus</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="bg-[#EBE3D5]/20 p-8 rounded-[2rem] border-2 border-[#EBE3D5]/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <ChefHat className="w-24 h-24 text-[#2D1B08]" />
                </div>
                <div className="text-[11px] font-black text-[#F2A900] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Histoire & Vision culinaire
                </div>
                <p className="text-[#5D4037] text-sm leading-relaxed font-bold italic">"{restaurant.description}"</p>
              </div>

              {/* Menu Verification */}
              <div>
                <div className="text-[14px] font-black text-[#2D1B08] uppercase tracking-tighter mb-8 flex items-center gap-3">
                  <Utensils className="w-6 h-6 text-[#F2A900]" /> Vérification du Menu
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-[#EBE3D5] to-transparent ml-4"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                  {mockMenu.map((cat, i) => (
                    <div key={i} className="space-y-4 bg-white p-5 rounded-3xl border border-[#EBE3D5]/60 hover:shadow-md transition-shadow">
                      <div className="text-[10px] font-black text-[#F2A900] uppercase tracking-widest flex items-center justify-between">
                        {cat.category}
                        <ChevronRight className="w-3 h-3" />
                      </div>
                      <ul className="space-y-3">
                        {cat.items.map((item, j) => (
                          <li key={j} className="text-[11px] font-bold text-[#2D1B08] flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div> 
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offers Verification */}
              <div>
                <div className="text-[14px] font-black text-[#2D1B08] uppercase tracking-tighter mb-8 flex items-center gap-3">
                  <Tag className="w-6 h-6 text-[#F2A900]" /> Offres Promotionnelles
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-[#EBE3D5] to-transparent ml-4"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {mockOffers.map((offer, i) => (
                    <div key={i} className="flex flex-col p-6 bg-white border-2 border-[#EBE3D5] rounded-[2rem] group hover:border-[#F2A900] transition-all hover:shadow-lg relative overflow-hidden">
                      <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#F2A900]/5 rounded-full group-hover:scale-150 transition-transform"></div>
                      <div className="text-[14px] font-black text-[#2D1B08] uppercase tracking-tighter mb-2">{offer.title}</div>
                      <div className="text-[11px] text-[#5D4037]/70 font-bold mb-4 flex-1">{offer.description}</div>
                      <div className="text-[9px] font-black px-4 py-2 bg-[#2D1B08] text-white rounded-xl uppercase tracking-widest w-fit flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-[#F2A900]" /> {offer.validity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="mt-20 pt-10 border-t border-[#EBE3D5] flex flex-col sm:flex-row gap-6">
              {restaurant.status === 'En attente' ? (
                <>
                  <Button 
                    onClick={() => {
                      onStatusChange(restaurant.id, 'Validé');
                      onClose();
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black uppercase text-xs tracking-widest h-16 rounded-2xl shadow-2xl shadow-green-600/30 transition-all hover:-translate-y-1 active:scale-95"
                  >
                    Valider l'établissement
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      onStatusChange(restaurant.id, 'Suspendu');
                      onClose();
                    }}
                    className="flex-1 border-2 border-red-100 text-red-500 hover:bg-red-50 font-black uppercase text-xs tracking-widest h-16 rounded-2xl transition-all hover:border-red-200"
                  >
                    Refuser la demande
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={onClose}
                  className="w-full bg-[#2D1B08] hover:bg-[#1a1005] text-white font-black uppercase text-xs tracking-widest h-16 rounded-2xl shadow-xl shadow-[#2D1B08]/20 transition-all hover:-translate-y-1 active:scale-95"
                >
                  Fermer le dossier de vérification
                </Button>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantDetailsModal;
