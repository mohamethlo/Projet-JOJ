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
  Flame
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

const MenuPage: React.FC = () => {
  const { user } = useAuth();

  // Rediriger les hôtels vers leur dashboard
  if (user?.role === 'hotel') {
    return <Navigate to="/dashboard" replace />;
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Thiébou Diène',
      category: 'Plats principaux',
      price: '5,000 FCFA',
      description: 'Riz au poisson traditionnel sénégalais',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      available: true,
      spicy: true
    },
    {
      id: '2',
      name: 'Yassa Poulet',
      category: 'Plats principaux',
      price: '4,500 FCFA',
      description: 'Poulet mariné avec oignons et citron',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      available: true,
      spicy: false
    },
    {
      id: '3',
      name: 'Mafé',
      category: 'Plats principaux',
      price: '4,000 FCFA',
      description: 'Viande en sauce arachide',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      available: true,
      spicy: false
    },
    {
      id: '4',
      name: 'Accras de Morue',
      category: 'Entrées',
      price: '2,500 FCFA',
      description: 'Beignets de morue frits',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      available: true,
      spicy: false
    },
    {
      id: '5',
      name: 'Thiakry',
      category: 'Desserts',
      price: '2,000 FCFA',
      description: 'Semoule de mil au lait caillé et vanille',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      available: true,
      spicy: false
    },
    {
      id: '6',
      name: 'Bissap',
      category: 'Boissons',
      price: '1,500 FCFA',
      description: 'Jus de bissap frais',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      available: false,
      spicy: false
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
    }
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Gestion du Menu</h1>
          <p className="text-gray-600 mt-1">Gérez votre carte et vos spécialités culinaires</p>
        </div>
        <Button onClick={handleAddItem} className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un plat
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Plats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{menuItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">
              {menuItems.filter(i => i.available).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Indisponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {menuItems.filter(i => !i.available).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Prix moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">3,250 FCFA</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un plat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex space-x-2">
                {item.spicy && (
                  <Badge className="bg-red-500 text-white">
                    <Flame className="h-3 w-3 mr-1" />
                    Épicé
                  </Badge>
                )}
                <Badge className={item.available ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}>
                  {item.available ? 'Disponible' : 'Indisponible'}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-white/90 text-gray-900">{item.category}</Badge>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{item.name}</CardTitle>
                <span className="text-2xl font-bold text-orange-600">{item.price}</span>
              </div>
              <p className="text-sm text-gray-600">{item.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleAvailability(item.id)}
                  className={`flex-1 ${item.available ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`}
                >
                  {item.available ? 'Marquer indisponible' : 'Marquer disponible'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditItem(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Menu Item Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Modifier le plat' : 'Ajouter un nouveau plat'}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du plat
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Nom du plat</Label>
              <Input id="name" defaultValue={selectedItem?.name} placeholder="Thiébou Diène" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Catégorie</Label>
                <Select defaultValue={selectedItem?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entrées">Entrées</SelectItem>
                    <SelectItem value="Plats principaux">Plats principaux</SelectItem>
                    <SelectItem value="Desserts">Desserts</SelectItem>
                    <SelectItem value="Boissons">Boissons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Prix</Label>
                <Input id="price" defaultValue={selectedItem?.price} placeholder="5,000 FCFA" />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                defaultValue={selectedItem?.description}
                placeholder="Description du plat..."
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="available" defaultChecked={selectedItem?.available !== false} />
                <Label htmlFor="available">Disponible</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="spicy" defaultChecked={selectedItem?.spicy} />
                <Label htmlFor="spicy">Épicé</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700">
              {isEditing ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuPage;

