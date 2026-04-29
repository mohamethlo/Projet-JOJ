import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Palette, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  MoreVertical,
  Filter,
  QrCode,
  Tag,
  History,
  ArrowUpRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

const MOCK_COLLECTION = [
  {
    id: '1',
    name: 'Masque Nimba',
    origin: 'Région de Boké (Héritage partagé)',
    period: 'XIXe Siècle',
    category: 'Sculpture',
    condition: 'Excellente',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Pagne de Mariage Traditionnel',
    origin: 'Casamance',
    period: 'Années 1920',
    category: 'Textile',
    condition: 'Restauré',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Statue de Guerrier Cayor',
    origin: 'Zone Nord',
    period: 'XVIIIe Siècle',
    category: 'Bronze',
    condition: 'Fragile',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Pot de Terre Cuite Oualata',
    origin: 'Est du Sénégal',
    period: 'Pré-colonial',
    category: 'Céramique',
    condition: 'Excellente',
    image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const MuseumCollectionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState(MOCK_COLLECTION);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    toast.error('Objet retiré de la collection');
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#2D1B08] tracking-tighter uppercase">Catalogue des <span className="text-[#F2A900]">Collections</span></h1>
          <p className="text-gray-500 font-medium italic text-sm">Inventaire exhaustif du patrimoine conservé.</p>
        </div>
        <Button className="rounded-2xl bg-[#2D1B08] hover:bg-[#1a1005] text-[#F2A900] font-black h-12 px-6 shadow-xl shadow-[#2D1B08]/10">
          <Plus className="mr-2 h-5 w-5" /> Cataloguer une Œuvre
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <Card className="rounded-[2rem] border-none bg-white shadow-sm p-4 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              placeholder="Rechercher un objet, une origine..." 
              className="pl-12 h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="rounded-xl h-12 border-gray-100 font-bold uppercase text-[10px] tracking-widest text-gray-500">
            <Filter className="mr-2 h-4 w-4" /> Trier par Période
          </Button>
        </div>
      </Card>

      {/* Collection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="group rounded-3xl border-none bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden text-[#2D1B08]">
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 backdrop-blur-md text-[#2D1B08] border-none text-[8px] font-black uppercase tracking-widest">
                  {item.category}
                </Badge>
              </div>
              <button className="absolute top-4 right-4 h-8 w-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#2D1B08] opacity-0 group-hover:opacity-100 transition-opacity">
                <QrCode size={16} />
              </button>
            </div>

            <CardContent className="p-5 space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-black uppercase tracking-tighter text-sm group-hover:text-[#F2A900] transition-colors">{item.name}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-400 hover:text-[#2D1B08]">
                        <MoreVertical size={14} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl border-gray-100 shadow-2xl">
                      <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest cursor-pointer">
                        <Edit className="mr-2 h-3.5 w-3.5" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest cursor-pointer text-red-600 focus:text-red-600" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="mr-2 h-3.5 w-3.5" /> Retirer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <History size={10} className="text-[#F2A900]" /> {item.period}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
                  <span className="text-gray-400 flex items-center gap-1"><Tag size={10} /> Origine</span>
                  <span className="text-[#2D1B08]">{item.origin}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
                  <span className="text-gray-400 flex items-center gap-1"> État</span>
                  <Badge variant="outline" className={cn(
                    "text-[8px] font-black border-none px-2",
                    item.condition === 'Excellente' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {item.condition}
                  </Badge>
                </div>
              </div>

              <Button variant="ghost" className="w-full rounded-xl h-9 text-[9px] font-black uppercase tracking-widest border border-gray-100 hover:border-[#F2A900] hover:text-[#F2A900] transition-all">
                Fiche Technique <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MuseumCollectionsPage;
