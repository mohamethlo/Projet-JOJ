import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Star, MapPin, Users, ChevronRight, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockAgencies } from '@/lib/mockData';
import useProtectedAction from '@/hooks/useProtectedAction';

const AgencyPage = () => {
    const navigate = useNavigate();
    const { AuthModalComponent, performAction } = useProtectedAction();
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'Toutes', icon: Plane },
        { id: 'safari', label: 'Safaris', icon: Compass },
        { id: 'ecotourism', label: 'Éco-Tourisme', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-[#FFFDFB] pt-24 pb-12">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center max-w-3xl mx-auto">
                    <Badge className="bg-[#EBE3D5] text-[#6B4226] hover:bg-[#EBE3D5] mb-4 border-none px-4 py-1.5 font-bold uppercase tracking-widest text-[10px]">
                        Agences de Voyage
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-black text-[#2D1B08] tracking-tighter mb-4 leading-tight">
                        Préparez votre <span className="text-[#F2A900]">Aventure</span>
                    </h1>
                    <p className="text-lg text-[#5D4037] mb-8 font-medium">
                        Découvrez nos agences partenaires et trouvez le circuit parfait pour explorer les merveilles du Sénégal en toute sérénité.
                    </p>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {filters.map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-sm sm:text-base border-2 transition-all ${activeFilter === filter.id
                                    ? 'border-[#1B5E20] bg-[#1B5E20] text-white shadow-xl shadow-[#1B5E20]/20 scale-105'
                                    : 'border-[#EBE3D5] bg-white text-[#5D4037] hover:border-[#1B5E20] hover:text-[#1B5E20]'
                                    }`}
                            >
                                <filter.icon className="h-4 w-4" />
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockAgencies.map((agency) => (
                        <Card key={agency.id} className="overflow-hidden bg-white border-2 border-[#EBE3D5] hover:border-[#F2A900] transition-all duration-300 rounded-[2rem] shadow-sm hover:shadow-xl group flex flex-col h-full">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={agency.image}
                                    alt={agency.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                {agency.featured && (
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-[#F2A900] text-white border-none font-bold uppercase tracking-widest text-[10px] px-3 py-1 shadow-lg">
                                            Recommandée
                                        </Badge>
                                    </div>
                                )}

                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <h3 className="text-2xl font-black tracking-tighter mb-1 relative inline-block group-hover:text-[#F2A900] transition-colors">{agency.name}</h3>
                                    <div className="flex items-center gap-1.5 text-sm font-medium text-white/90">
                                        <MapPin className="h-4 w-4" />
                                        {agency.location}
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-6 flex-1 flex flex-col pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-1.5 bg-[#FFF9E5] px-2.5 py-1 rounded-full text-[#2D1B08]">
                                        <Star className="w-4 h-4 fill-[#F2A900] text-[#F2A900]" />
                                        <span className="font-black text-sm">{agency.rating}</span>
                                        <span className="text-xs text-[#5D4037]/70 font-semibold">({agency.reviews} avis)</span>
                                    </div>
                                </div>

                                <p className="text-[#5D4037] text-sm mb-6 flex-1 leading-relaxed font-medium line-clamp-3">
                                    {agency.description}
                                </p>

                                <div className="space-y-4 pt-4 border-t border-[#EBE3D5]/50 mt-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {agency.amenities.slice(0, 3).map((amenity, idx) => (
                                            <Badge key={idx} variant="outline" className="text-[10px] border-[#EBE3D5] text-[#5D4037] font-semibold">
                                                {amenity}
                                            </Badge>
                                        ))}
                                        {agency.amenities.length > 3 && (
                                            <Badge variant="outline" className="text-[10px] border-[#EBE3D5] text-[#5D4037] font-semibold">
                                                +{agency.amenities.length - 3}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <Button
                                            className="flex-1 bg-white border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white font-black py-5 rounded-2xl transition-all shadow-md group/btn"
                                            onClick={() => navigate(`/establishment/${agency.id}?tab=offers`)}
                                        >
                                            Voir les offres
                                            <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            {AuthModalComponent}
        </div>
    );
};

export default AgencyPage;
