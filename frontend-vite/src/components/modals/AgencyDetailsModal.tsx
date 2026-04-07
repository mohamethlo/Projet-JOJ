import React from 'react';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAgencies } from '@/context/AgencyContext';
import { 
  MapPin, 
  Star, 
  Compass, 
  CheckCircle2, 
  ImageIcon,
  X
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AgencyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  agency: any;
}

const AgencyDetailsModal: React.FC<AgencyDetailsModalProps> = ({
  isOpen,
  onClose,
  agency
}) => {
  const { toggleOfferStatus, updateAgencyStatus } = useAgencies();

  if (!agency) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden border-none rounded-[2rem] shadow-2xl bg-[#FFFDFB]">
        <div className="flex flex-col h-[92vh] md:h-[90vh]">
          {/* Compact Header for Maximum Content Space */}
          <div className="relative h-40 md:h-48 shrink-0 overflow-hidden">
            <img 
              src={agency.images?.[0] || agency.image} 
              alt={agency.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1108]/90 via-[#1A1108]/40 to-black/10"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all z-20 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-6 left-8 right-8 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-[#F2A900] text-[#2D1B08] border-none font-black text-[9px] uppercase tracking-widest px-3 py-1">
                    {agency.status}
                  </Badge>
                  <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-2 py-0.5 border border-white/10">
                    <Star className="w-3 h-3 text-[#F2A900] fill-[#F2A900]" />
                    <span className="text-white text-[10px] font-black">{agency.rating}</span>
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-lg">
                  {agency.name}
                </h2>
              </div>
            </div>
          </div>

          {/* Main Content Areas - Maximized */}
          <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
            <div className="bg-white border-b border-[#EBE3D5] px-8 py-0 shrink-0 z-10 shadow-sm">
              <TabsList className="bg-transparent border-none gap-8 p-0 h-auto">
                <TabsTrigger 
                  value="overview" 
                  className="bg-transparent border-b-4 border-transparent data-[state=active]:border-[#F2A900] rounded-none px-0 py-4 font-black text-[11px] uppercase tracking-widest text-[#5D4037]/60 data-[state=active]:text-[#2D1B08] transition-all"
                >
                  Présentation
                </TabsTrigger>
                <TabsTrigger 
                  value="gallery" 
                  className="bg-transparent border-b-4 border-transparent data-[state=active]:border-[#F2A900] rounded-none px-0 py-4 font-black text-[11px] uppercase tracking-widest text-[#5D4037]/60 data-[state=active]:text-[#2D1B08] transition-all"
                >
                  Galerie Images
                </TabsTrigger>
                <TabsTrigger 
                  value="offers" 
                  className="bg-transparent border-b-4 border-transparent data-[state=active]:border-[#F2A900] rounded-none px-0 py-4 font-black text-[11px] uppercase tracking-widest text-[#5D4037]/60 data-[state=active]:text-[#2D1B08] transition-all"
                >
                  Circuits & Offres
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-[#FCFAF7]">
              <TabsContent value="overview" className="mt-0 space-y-8 focus-visible:outline-none animate-in fade-in duration-300">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#F2A900]" />
                    <h3 className="text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest">A propos du partenaire</h3>
                  </div>
                  <p className="text-[#2D1B08] leading-relaxed font-bold text-lg md:text-xl">
                    {agency.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#EBE3D5]">
                  <div className="bg-white p-6 rounded-3xl border-2 border-[#EBE3D5] shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F2A900]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-[#F2A900]" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-[#5D4037]/40 uppercase tracking-widest">Localisation</p>
                      <p className="text-lg font-black text-[#2D1B08]">{agency.location}</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border-2 border-[#EBE3D5] shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-[#5D4037]/40 uppercase tracking-widest">Certification</p>
                      <p className="text-lg font-black text-[#2D1B08]">Membre Officiel</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2D1B08] p-8 rounded-[2.5rem] shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <h4 className="font-black text-white text-lg uppercase">Visibilité Publique</h4>
                    <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Activer l'agence sur Discover Sénégal</p>
                  </div>
                  <Switch 
                    checked={agency.status === 'Actif'} 
                    onCheckedChange={(checked) => updateAgencyStatus(agency.id, checked ? 'Actif' : 'Suspendu')}
                    className="data-[state=checked]:bg-green-500 bg-red-500 h-7 w-14"
                  />
                </div>
              </TabsContent>

              <TabsContent value="gallery" className="mt-0 focus-visible:outline-none animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(agency.images || [agency.image]).map((img: string, i: number) => (
                    <div key={i} className="aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-xl group relative">
                      <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="offers" className="mt-0 space-y-4 focus-visible:outline-none animate-in fade-in duration-300">
                {agency.offers.map((offer: any) => (
                  <div key={offer.id} className="flex flex-col md:flex-row items-center justify-between p-5 bg-white border-2 border-[#EBE3D5] rounded-3xl hover:border-[#F2A900] transition-all group gap-6">
                    <div className="flex items-center gap-6 w-full">
                      <div className="h-20 w-20 shrink-0 rounded-2xl overflow-hidden shadow-md">
                        <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[9px] font-black text-[#F2A900] uppercase tracking-widest">{offer.type}</p>
                        <h4 className="font-black text-[#2D1B08] text-lg uppercase tracking-tight">{offer.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold text-[#5D4037]">{offer.price}</span>
                          <span className="text-[10px] text-[#5D4037]/50">•</span>
                          <span className="text-[10px] font-bold text-[#5D4037]">{offer.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-[#F9F6F2] px-5 py-3 rounded-2xl border border-[#EBE3D5] min-w-[160px] justify-between">
                      <span className={`text-[9px] font-black uppercase ${offer.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
                        {offer.status === 'Active' ? 'En ligne' : 'Off'}
                      </span>
                      <Switch 
                        checked={offer.status === 'Active'} 
                        onCheckedChange={() => toggleOfferStatus(agency.id, offer.id)}
                        className="data-[state=checked]:bg-green-600 bg-[#EBE3D5] h-6 w-12"
                      />
                    </div>
                  </div>
                ))}
              </TabsContent>
            </div>
          </Tabs>

          <DialogFooter className="p-6 md:p-8 border-t border-[#EBE3D5] bg-white shrink-0">
            <Button 
              onClick={onClose}
              className="w-full bg-[#2D1B08] hover:bg-black text-white font-black uppercase tracking-widest py-6 rounded-2xl shadow-lg transition-all text-xs"
            >
              Fermer l'Audit
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgencyDetailsModal;
