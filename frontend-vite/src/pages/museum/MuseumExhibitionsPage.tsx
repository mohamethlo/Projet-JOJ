import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Calendar, 
  Users, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  MoreVertical,
  Filter,
  Palette,
  MapPin,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

const MOCK_EXHIBITIONS = [
  {
    id: '1',
    title: 'Les Masques du Sine Saloum',
    description: 'Une exploration profonde des traditions de masques dans la région du Sine Saloum, révélant des secrets séculaires.',
    startDate: '2024-03-01',
    endDate: '2024-05-15',
    visitors: 1240,
    status: 'En cours',
    category: 'Histoire',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Éclats Contemporains',
    description: 'Le meilleur de la scène artistique dakaroise actuelle, entre peinture, sculpture et installations numériques.',
    startDate: '2024-04-10',
    endDate: '2024-06-10',
    visitors: 850,
    status: 'En cours',
    category: 'Art Contemporain',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'Léopold Sédar Senghor : L\'Héritage',
    description: 'Exposition hommage au premier président du Sénégal, explorant sa poésie, sa philosophie et son impact politique.',
    startDate: '2024-06-01',
    endDate: '2024-08-30',
    visitors: 0,
    status: 'À venir',
    category: 'Littérature / Histoire',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const MuseumExhibitionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [exhibitions, setExhibitions] = useState(MOCK_EXHIBITIONS);

  const filteredExhibitions = exhibitions.filter(ex => 
    ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setExhibitions(prev => prev.filter(ex => ex.id !== id));
    toast.error('Exposition supprimée');
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#2D1B08] tracking-tighter uppercase">Gestion des <span className="text-[#F2A900]">Expositions</span></h1>
          <p className="text-gray-500 font-medium italic text-sm">Organisez et suivez l'impact de vos événements culturels.</p>
        </div>
        <Button className="rounded-2xl bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black h-12 px-6 shadow-lg shadow-[#F2A900]/20">
          <Plus className="mr-2 h-5 w-5" /> Programmer une Exposition
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <Card className="rounded-[2rem] border-none bg-white shadow-sm p-4 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              placeholder="Rechercher une exposition..." 
              className="pl-12 h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="rounded-xl h-12 border-gray-100 font-bold uppercase text-[10px] tracking-widest text-gray-500">
            <Filter className="mr-2 h-4 w-4" /> Filtres Avancés
          </Button>
        </div>
      </Card>

      {/* Exhibitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredExhibitions.map((exhibit) => (
          <Card key={exhibit.id} className="group rounded-[2.5rem] border-none bg-white shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full text-[#2D1B08]">
            {/* Image Header */}
            <div className="relative h-56 overflow-hidden">
              <img 
                src={exhibit.image} 
                alt={exhibit.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B08]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute top-5 right-5">
                <Badge className={cn(
                  "rounded-full px-4 py-1.5 text-[10px] font-black uppercase border-none shadow-lg backdrop-blur-md",
                  exhibit.status === 'En cours' ? "bg-emerald-500 text-white" : 
                  exhibit.status === 'Permanent' ? "bg-blue-500 text-white" : "bg-amber-500 text-white"
                )}>
                  {exhibit.status}
                </Badge>
              </div>

              <div className="absolute bottom-5 left-5">
                <Badge className="bg-white/20 backdrop-blur-md text-white border-none text-[9px] font-bold uppercase">
                  {exhibit.category}
                </Badge>
              </div>
            </div>

            <CardContent className="p-8 flex-grow flex flex-col space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-xl font-black uppercase tracking-tighter leading-tight group-hover:text-[#F2A900] transition-colors line-clamp-1">
                    {exhibit.title}
                  </h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl border-gray-100 shadow-2xl">
                      <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest cursor-pointer">
                        <Edit className="mr-2 h-3.5 w-3.5" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest cursor-pointer text-red-600 focus:text-red-600" onClick={() => handleDelete(exhibit.id)}>
                        <Trash2 className="mr-2 h-3.5 w-3.5" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock size={12} className="text-[#F2A900]" /> {exhibit.startDate}</span>
                  <span className="flex items-center gap-1"><Users size={12} className="text-[#F2A900]" /> {exhibit.visitors} Visiteurs</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 font-medium line-clamp-3 leading-relaxed italic">
                "{exhibit.description}"
              </p>

              <div className="pt-6 mt-auto flex items-center justify-between border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Fin prévue</span>
                  <span className="text-sm font-black text-[#2D1B08]">{exhibit.endDate || 'N/A'}</span>
                </div>
                <Button variant="ghost" className="rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest text-[#F2A900] hover:text-[#2D1B08] hover:bg-[#F2A900]/10">
                  Détails <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MuseumExhibitionsPage;
