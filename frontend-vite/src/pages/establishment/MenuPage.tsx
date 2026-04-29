import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ArrowLeft,
  Flame,
  UtensilsCrossed,
  LayoutGrid,
  List as ListIcon,
  ChefHat,
  ChevronRight,
  Sparkles,
  Settings2,
  MoreVertical,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Download
} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import StatCard from '@/components/dashboard/StatCard';

const MenuPage: React.FC = () => {
  const { user } = useAuth();

  // Rediriger les hôtels vers leur dashboard (Hôtels n'ont pas forcément besoin de menu, mais certains si)
  // On laisse la condition originale ou on l'adapte
  if (user?.role === 'hotel' && !user.email?.includes('restaurant')) {
    // return <Navigate to="/dashboard" replace />;
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Thiébou Diène Royal',
      category: 'Plats principaux',
      price: '5,000 FCFA',
      description: 'Le plat national par excellence : riz au poisson rouge, légumes croquants et saveurs authentiques du terroir.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      available: true,
      spicy: true,
      popularity: '98%'
    },
    {
      id: '2',
      name: 'Yassa Poulet Tradition',
      category: 'Plats principaux',
      price: '4,500 FCFA',
      description: 'Poulet fermier mariné longuement avec oignons caramélisés, citron vert et olives.',
      image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800',
      available: true,
      spicy: false,
      popularity: '92%'
    },
    {
      id: '3',
      name: 'Mafé Boeuf Gourmet',
      category: 'Plats principaux',
      price: '4,000 FCFA',
      description: 'Tendres morceaux de boeuf mijotés dans une onctueuse sauce à l\'arachide.',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
      available: true,
      spicy: false,
      popularity: '85%'
    },
    {
      id: '4',
      name: 'Pastels de Poisson (x6)',
      category: 'Entrées',
      price: '2,500 FCFA',
      description: 'Petits chaussons frits garnis de poisson épicé, servis avec une sauce tomate pimentée.',
      image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=800',
      available: true,
      spicy: true,
      popularity: '78%'
    },
    {
      id: '5',
      name: 'Thiakry de Prestige',
      category: 'Desserts',
      price: '2,000 FCFA',
      description: 'Semoule de mil fine au lait caillé onctueux, parfumé à la vanille et fleur d\'oranger.',
      image: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=800',
      available: true,
      spicy: false,
      popularity: '90%'
    },
    {
      id: '6',
      name: 'Jus de Bissap Maison',
      category: 'Boissons',
      price: '1,500 FCFA',
      description: 'Infusion de fleurs d\'hibiscus séchées, menthe fraîche et une touche de muscade.',
      image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?w=800',
      available: false,
      spicy: false,
      popularity: '0%'
    }
  ]);

  const categories = ['Tous', 'Entrées', 'Plats principaux', 'Desserts', 'Boissons'];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    setSelectedItem(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: any) => {
    setSelectedItem(item);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élément du menu ?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
      toast.error('Élément retiré du menu.');
    }
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
    toast.info('Disponibilité mise à jour.');
  };

  const handleSaveItem = () => {
    toast.success(isEditing ? 'Plat mis à jour !' : 'Nouveau plat ajouté au menu !');
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* 🥘 Premium Header */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2D1B08] via-[#5D4037] to-[#2D1B08] p-8 md:p-14 text-white shadow-2xl mb-12">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F2A900]/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F2A900]/5 rounded-full blur-[100px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 rounded-full h-8 px-3">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Retour
                  </Button>
                </Link>
                <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[10px] px-3 border-none">
                  ESPACE GASTRONOMIE
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85]">
                CARTE DES <br /> <span className="text-[#F2A900]">SAVEURS .</span>
              </h1>
              <p className="text-white/60 font-medium italic text-sm md:text-lg max-w-xl">
                Rédigez votre menu, mettez en avant vos spécialités et gérez vos stocks en temps réel.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
               <Button className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold h-14 px-8 rounded-2xl shadow-xl transition-all hover:scale-105 backdrop-blur-md">
                <Download className="mr-3 h-5 w-5" /> IMPRIMER
              </Button>
              <Button 
                onClick={handleAddItem}
                className="bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black h-14 px-8 rounded-2xl shadow-xl shadow-[#F2A900]/20 transition-all hover:scale-105"
              >
                <Plus className="mr-3 h-5 w-5" /> AJOUTER UN PLAT
              </Button>
            </div>
          </div>
        </div>

        {/* 📊 Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={ChefHat} value={menuItems.length.toString()} label="Total Plats" trend={{ value: 0, isUp: true }} />
          <StatCard icon={CheckCircle2} value={menuItems.filter(i => i.available).length.toString()} label="En Stock" trend={{ value: 4, isUp: true }} />
          <StatCard icon={XCircle} value={menuItems.filter(i => !i.available).length.toString()} label="Rupture" trend={{ value: 1, isUp: false }} />
          <StatCard icon={TrendingUp} value="4.8k" label="Vues Carte" trend={{ value: 15, isUp: true }} />
        </div>

        {/* 🔍 Filter & Navigation */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch lg:items-center">
          <Card className="flex-1 rounded-[2rem] border-none bg-white shadow-sm overflow-hidden p-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  placeholder="Rechercher par nom, ingrédient..." 
                  className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-14 rounded-2xl border-gray-100 font-bold uppercase text-[10px] tracking-widest w-full md:w-56">
                  <SelectValue placeholder="CATÉGORIE" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-gray-100 shadow-2xl">
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat} className="font-bold uppercase text-[10px]">{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
          
          <div className="bg-white p-2 rounded-2xl shadow-sm flex gap-1 self-end lg:self-auto h-fit border border-gray-100">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="icon" 
              onClick={() => setViewMode('grid')}
              className={cn("rounded-xl h-12 w-12", viewMode === 'grid' ? "bg-[#2D1B08] text-white" : "text-gray-400")}
            >
              <LayoutGrid size={20} />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="icon" 
              onClick={() => setViewMode('list')}
              className={cn("rounded-xl h-12 w-12", viewMode === 'list' ? "bg-[#2D1B08] text-white" : "text-gray-400")}
            >
              <ListIcon size={20} />
            </Button>
          </div>
        </div>

        {/* 🥘 Menu Grid/List */}
        <div className={cn(
          "grid gap-8",
          viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {filteredItems.map((item) => (
            <Card key={item.id} className="group rounded-[2.5rem] border-none bg-white shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full text-[#2D1B08]">
              {/* Image Header */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B08]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
                  <Badge className={cn(
                    "rounded-full px-4 py-1.5 text-[10px] font-black uppercase border-none shadow-lg backdrop-blur-md",
                    item.available ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                  )}>
                    {item.available ? 'En Stock' : 'Rupture'}
                  </Badge>
                  {item.spicy && (
                    <Badge className="bg-orange-500 text-white rounded-full px-3 py-1 text-[9px] font-black uppercase border-none">
                       <Flame size={10} className="mr-1" /> ÉPICÉ
                    </Badge>
                  )}
                </div>

                <div className="absolute top-5 left-5">
                   <Badge className="bg-black/40 backdrop-blur-md text-white border-none text-[10px] font-black uppercase tracking-widest px-3 py-1">
                      {item.category}
                   </Badge>
                </div>
              </div>

              <CardContent className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-black uppercase tracking-tighter leading-tight group-hover:text-[#F2A900] transition-colors line-clamp-1">{item.name}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                       Popularité: <span className="text-[#F2A900]">{item.popularity}</span>
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                       <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-gray-400 hover:text-[#2D1B08] hover:bg-gray-100">
                          <MoreVertical size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl border-gray-100 shadow-2xl p-2 w-48">
                        <DropdownMenuItem className="rounded-xl font-bold uppercase text-[10px] tracking-widest py-3 cursor-pointer" onClick={() => handleEditItem(item)}>
                          <Edit className="mr-3 h-4 w-4 text-[#F2A900]" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold uppercase text-[10px] tracking-widest py-3 cursor-pointer" onClick={() => toggleAvailability(item.id)}>
                          <Sparkles className="mr-3 h-4 w-4 text-blue-500" /> {item.available ? 'Masquer' : 'Afficher'}
                        </DropdownMenuItem>
                        <div className="h-px bg-gray-50 my-2" />
                        <DropdownMenuItem className="rounded-xl font-bold uppercase text-[10px] tracking-widest py-3 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 className="mr-3 h-4 w-4" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-sm text-gray-500 font-medium line-clamp-3 leading-relaxed italic mb-8 flex-grow">
                  "{item.description}"
                </p>

                <div className="pt-6 border-t border-gray-50 mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1">Tarif Unitaire</span>
                    <span className="text-2xl font-black text-[#2D1B08]">{item.price}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleEditItem(item)}
                    className="text-[#F2A900] hover:text-[#2D1B08] hover:bg-[#F2A900]/10 font-black text-[10px] uppercase h-10 px-4 rounded-xl"
                  >
                    GÉRER <ChevronRight size={14} className="ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 🧾 Add/Edit Item Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl rounded-[2.5rem] border-none p-0 overflow-hidden">
          <div className="bg-[#2D1B08] p-8 text-white relative">
             <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
                <ChefHat size={120} strokeWidth={4} />
             </div>
             <div className="relative z-10">
                <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[9px] border-none mb-4">
                  {isEditing ? 'ÉDITION CARTE' : 'CRÉATION CULINAIRE'}
                </Badge>
                <h2 className="text-3xl font-black uppercase tracking-tighter">
                  {isEditing ? selectedItem?.name : 'Nouveau Plat'}
                </h2>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Détaillez les saveurs et fixez vos tarifs</p>
             </div>
          </div>
          
          <div className="p-8 bg-white space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Intitulé du Plat</Label>
              <Input defaultValue={selectedItem?.name} placeholder="Ex: Thiébou Diène Royal" className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Catégorie</Label>
                <Select defaultValue={selectedItem?.category || 'Plats principaux'}>
                   <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-none font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-none shadow-2xl">
                    <SelectItem value="Entrées">Entrées</SelectItem>
                    <SelectItem value="Plats principaux">Plats principaux</SelectItem>
                    <SelectItem value="Desserts">Desserts</SelectItem>
                    <SelectItem value="Boissons">Boissons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Prix (FCFA)</Label>
                <Input defaultValue={selectedItem?.price} placeholder="5,000" className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
              </div>
            </div>

            <div className="space-y-2">
               <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description & Ingrédients</Label>
               <Textarea defaultValue={selectedItem?.description} rows={3} className="rounded-2xl bg-gray-50 border-none font-medium italic" placeholder="Décrivez les saveurs et allergènes..." />
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="flex items-center space-x-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <input type="checkbox" id="dlg-available" defaultChecked={selectedItem?.available !== false} className="h-5 w-5 rounded border-gray-300 text-[#F2A900] focus:ring-[#F2A900]" />
                  <Label htmlFor="dlg-available" className="text-xs font-bold uppercase cursor-pointer">En Stock</Label>
               </div>
               <div className="flex items-center space-x-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <input type="checkbox" id="dlg-spicy" defaultChecked={selectedItem?.spicy} className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  <Label htmlFor="dlg-spicy" className="text-xs font-bold uppercase cursor-pointer">Plat Épicé</Label>
               </div>
            </div>
          </div>

          <DialogFooter className="p-8 border-t border-gray-50 flex items-center justify-between">
            <Button variant="ghost" className="rounded-xl h-12 font-bold px-6 uppercase text-[10px] tracking-widest" onClick={() => setIsDialogOpen(false)}>ANNULER</Button>
            <Button className="bg-[#2D1B08] hover:bg-black text-white font-black h-12 px-8 rounded-2xl shadow-xl" onClick={handleSaveItem}>
               ENREGISTRER AU MENU
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuPage;
