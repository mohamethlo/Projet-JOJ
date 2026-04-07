import React, { useState } from 'react';
import { useAgencies } from '@/context/AgencyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  MapPin, 
  Star, 
  Globe, 
  LayoutGrid,
  Compass,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import AgencyDetailsModal from '@/components/modals/AgencyDetailsModal';
import AgencyEditModal from '@/components/modals/AgencyEditModal';
import OfferEditModal from '@/components/modals/OfferEditModal';

const AdminAgenciesPage: React.FC = () => {
  const { agencies, toggleOfferStatus, deleteAgency, deleteOffer } = useAgencies();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('agencies');
  const [selectedAgency, setSelectedAgency] = useState<any>(null);
  const [isAgencyModalOpen, setIsAgencyModalOpen] = useState(false);
  const [agencyToEdit, setAgencyToEdit] = useState<any>(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerToEdit, setOfferToEdit] = useState<any>(null);
  const [targetAgencyId, setTargetAgencyId] = useState<string>('');

  const allOffers = agencies.flatMap(a => a.offers.map(o => ({ ...o, agencyName: a.name, agencyId: a.id })));

  const filteredAgencies = agencies.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOffers = allOffers.filter(o =>
    o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.agencyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Agences', value: agencies.length, icon: <Globe className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Offres Actives', value: allOffers.filter(o => o.status === 'Active').length, icon: <CheckCircle2 className="w-5 h-5 text-green-600" />, bg: 'bg-green-50' },
    { label: 'Offres Inactives', value: allOffers.filter(o => o.status === 'Inactive').length, icon: <XCircle className="w-5 h-5 text-red-600" />, bg: 'bg-red-50' },
    { label: 'Taux Audit', value: '100%', icon: <TrendingUp className="w-5 h-5 text-amber-600" />, bg: 'bg-amber-50' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFB] p-4 sm:p-8 space-y-8">
      {/* Header & Stats */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2D1B08] uppercase tracking-tighter leading-none mb-2">
            Gestion des Agences
          </h1>
          <p className="text-[#5D4037]/70 font-medium">Contrôlez les partenaires et modérez les offres touristiques.</p>
        </div>

        <div className="flex gap-3 w-full xl:w-auto">
          <Button 
            onClick={() => {
              setAgencyToEdit(null);
              setIsAgencyModalOpen(true);
            }}
            className="h-14 bg-[#2D1B08] hover:bg-black text-white font-black uppercase tracking-widest px-8 rounded-2xl shadow-xl transition-all"
          >
            <Plus className="w-5 h-5 mr-2 text-[#F2A900]" /> Ajouter Agence
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {stats.map((stat, i) => (
          <div key={i} className={`${stat.bg} p-4 rounded-2xl border-2 border-white shadow-sm flex flex-col gap-1`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-[#2D1B08]">{stat.value}</span>
              {stat.icon}
            </div>
            <span className="text-[10px] font-bold text-[#5D4037]/60 uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>

      <Tabs defaultValue="agencies" className="space-y-6" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <TabsList className="bg-white border-2 border-[#EBE3D5] rounded-xl p-1 h-auto w-full md:w-auto">
            <TabsTrigger value="agencies" className="px-6 py-2.5 rounded-lg data-[state=active]:bg-[#2D1B08] data-[state=active]:text-white font-bold transition-all">
              <Compass className="w-4 h-4 mr-2" /> Agences
            </TabsTrigger>
            <TabsTrigger value="offers" className="px-6 py-2.5 rounded-lg data-[state=active]:bg-[#2D1B08] data-[state=active]:text-white font-bold transition-all">
              <LayoutGrid className="w-4 h-4 mr-2" /> Audit des Offres
            </TabsTrigger>
          </TabsList>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037]/40" />
            <Input 
              placeholder={activeTab === 'agencies' ? "Rechercher une agence..." : "Rechercher une offre..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 bg-white border-2 border-[#EBE3D5] rounded-xl focus:border-[#F2A900] transition-colors"
            />
          </div>
        </div>

        <TabsContent value="agencies">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgencies.map((agency) => (
              <div 
                key={agency.id}
                className="group bg-white rounded-[2rem] border-2 border-[#EBE3D5] hover:border-[#F2A900] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={agency.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={agency.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{agency.name}</h3>
                    <div className="flex items-center text-white/80 text-xs font-bold gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-[#F2A900]" /> {agency.location}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setAgencyToEdit(agency);
                        setIsAgencyModalOpen(true);
                      }}
                      size="icon" 
                      className="bg-white/20 backdrop-blur-md text-white border-none h-8 w-8 hover:bg-[#F2A900] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if(confirm('Supprimer cette agence ?')) deleteAgency(agency.id);
                      }}
                      size="icon" 
                      className="bg-white/20 backdrop-blur-md text-white border-none h-8 w-8 hover:bg-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-[#5D4037]/70 font-medium line-clamp-2">{agency.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#EBE3D5]/50">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#F2A900] fill-[#F2A900]" />
                      <span className="font-black text-[#2D1B08]">{agency.rating}</span>
                      <span className="text-[10px] text-[#5D4037]/50 font-bold">({agency.reviews})</span>
                    </div>
                    <Button 
                      onClick={() => setSelectedAgency(agency)}
                      variant="outline" 
                      className="border-2 border-[#2D1B08] text-[#2D1B08] hover:bg-[#2D1B08] hover:text-white font-black rounded-xl text-xs py-5 px-6 transition-all"
                    >
                      Audit Agency
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="offers">
          <div className="flex justify-end mb-4">
            <Button 
              onClick={() => {
                setTargetAgencyId(agencies[0]?.id || '');
                setOfferToEdit(null);
                setIsOfferModalOpen(true);
              }}
              className="bg-[#2D1B08] text-white font-black uppercase tracking-widest px-6 py-6 rounded-2xl"
            >
              <Plus className="w-4 h-4 mr-2" /> Nouvelle Offre
            </Button>
          </div>
          <div className="bg-white border-2 border-[#EBE3D5] rounded-[2rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#EBE3D5]/20 border-b border-[#EBE3D5]">
                    <th className="px-6 py-4 font-black text-[#2D1B08] text-xs uppercase tracking-widest">Offre</th>
                    <th className="px-6 py-4 font-black text-[#2D1B08] text-xs uppercase tracking-widest">Agence</th>
                    <th className="px-6 py-4 font-black text-[#2D1B08] text-xs uppercase tracking-widest">Type</th>
                    <th className="px-6 py-4 font-black text-[#2D1B08] text-xs uppercase tracking-widest">Prix</th>
                    <th className="px-6 py-4 font-black text-[#2D1B08] text-xs uppercase tracking-widest text-center">Status</th>
                    <th className="px-6 py-4 font-black text-[#2D1B08] text-xs uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE3D5]/50">
                  {filteredOffers.map((offer) => (
                    <tr key={offer.id} className="hover:bg-[#F9F6F2] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={offer.image} className="w-12 h-12 rounded-xl object-cover" alt={offer.title} />
                          <div>
                            <div className="font-black text-[#2D1B08] text-sm">{offer.title}</div>
                            <div className="text-[10px] font-bold text-[#5D4037]/60 italic">{offer.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-[#2D1B08] text-sm uppercase">{offer.agencyName}</td>
                      <td className="px-6 py-4 text-xs font-black text-[#5D4037]/60 uppercase">{offer.type}</td>
                      <td className="px-6 py-4 font-black text-[#F2A900] text-sm">{offer.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className={`text-[10px] font-black uppercase ${offer.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
                            {offer.status === 'Active' ? 'En ligne' : 'Suspendue'}
                          </span>
                          <Switch 
                            checked={offer.status === 'Active'} 
                            onCheckedChange={() => toggleOfferStatus(offer.agencyId, offer.id)}
                            className="bg-[#EBE3D5] data-[state=checked]:bg-green-500"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            onClick={() => {
                              setTargetAgencyId(offer.agencyId);
                              setOfferToEdit(offer);
                              setIsOfferModalOpen(true);
                            }}
                            variant="ghost" 
                            size="icon" 
                            className="hover:bg-[#F2A900]/10 hover:text-[#F2A900]"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={() => {
                              if(confirm('Supprimer cette offre ?')) deleteOffer(offer.agencyId, offer.id);
                            }}
                            variant="ghost" 
                            size="icon" 
                            className="hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AgencyEditModal 
        isOpen={isAgencyModalOpen}
        onClose={() => setIsAgencyModalOpen(false)}
        agencyToEdit={agencyToEdit}
      />

      <OfferEditModal 
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        agencyId={targetAgencyId}
        offerToEdit={offerToEdit}
      />

      {selectedAgency && (
        <AgencyDetailsModal 
          isOpen={!!selectedAgency} 
          onClose={() => setSelectedAgency(null)} 
          agency={selectedAgency} 
        />
      )}
    </div>
  );
};

export default AdminAgenciesPage;
