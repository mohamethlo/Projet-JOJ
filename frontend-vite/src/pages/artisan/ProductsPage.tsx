import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Plus, Edit, Trash2, Eye, Package, Info } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockProducts = [
  { 
    id: '1', 
    name: 'Statue en bois d\'ébène', 
    price: '45,000 FCFA', 
    stock: 5, 
    category: 'Sculpture', 
    status: 'En vente',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '2', 
    name: 'Sac en bogolan noir et blanc', 
    price: '15,000 FCFA', 
    stock: 12, 
    category: 'Mode', 
    status: 'En vente',
    image: 'https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '3', 
    name: 'Plat en céramique peint à la main', 
    price: '8,500 FCFA', 
    stock: 3, 
    category: 'Poterie', 
    status: 'Indisponible',
    image: 'https://images.pexels.com/photos/1452129/pexels-photo-1452129.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '4', 
    name: 'Bijou en argent filigrané', 
    price: '35,000 FCFA', 
    stock: 8, 
    category: 'Bijoux', 
    status: 'En vente',
    image: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
];

const ArtisanProductsPage: React.FC = () => {
  const [products, setProducts] = useState(mockProducts);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    status: 'En vente',
    image: '',
    description: ''
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      setProducts(products.filter(p => p.id !== id));
      toast.success('Produit supprimé avec succès');
    }
  };

  const handleEdit = (product: any) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price.replace(' FCFA', '').replace(',', ''),
      stock: product.stock.toString(),
      category: product.category,
      status: product.status,
      image: product.image,
      description: product.description || "Une création artisanale unique faite avec passion au Sénégal."
    });
    setIsEditing(true);
    setIsAddEditOpen(true);
  };

  const handleView = (product: any) => {
    setCurrentProduct(product);
    setIsViewOpen(true);
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      price: '',
      stock: '',
      category: '',
      status: 'En vente',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: ''
    });
    setIsEditing(false);
    setIsAddEditOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      setProducts(products.map(p => p.id === currentProduct.id ? {
        ...p,
        name: formData.name,
        price: `${parseInt(formData.price).toLocaleString()} FCFA`,
        stock: parseInt(formData.stock),
        category: formData.category,
        status: formData.status,
        image: formData.image,
        description: formData.description
      } : p));
      toast.success('Produit mis à jour avec succès');
    } else {
      const newProduct = {
        id: (products.length + 1).toString(),
        name: formData.name,
        price: `${parseInt(formData.price).toLocaleString()} FCFA`,
        stock: parseInt(formData.stock),
        category: formData.category,
        status: formData.status,
        image: formData.image,
        description: formData.description
      };
      setProducts([newProduct, ...products]);
      toast.success('Produit ajouté avec succès');
    }
    setIsAddEditOpen(false);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8">
      <Toaster position="top-right" richColors />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2D1B08] uppercase tracking-tighter">Mes Créations</h1>
          <p className="text-[#5D4037]/70 font-medium">Gérez votre inventaire et vos produits en ligne.</p>
        </div>
        <Button 
          onClick={handleAdd}
          className="bg-[#1B5E20] hover:bg-[#154618] text-white font-black uppercase text-xs tracking-widest px-6 h-12 rounded-xl shadow-lg shadow-green-900/10"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <Badge className="bg-blue-100 text-blue-600 border-none font-bold">+2 ce mois</Badge>
            </div>
            <div className="text-3xl font-black text-[#2D1B08]">{products.length}</div>
            <div className="text-sm font-bold text-[#5D4037]/60 uppercase tracking-widest mt-1">Produits Totaux</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-black text-[#2D1B08] uppercase tracking-widest flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-[#F2A900]" />
          Mes articles ({products.length})
        </h2>
        <div className="flex items-center gap-2 text-xs font-bold text-[#5D4037]/60">
          Vue : <Badge className="bg-[#2D1B08] text-white">Grille</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="border-2 border-[#EBE3D5] bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={product.image}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={product.name}
              />
              <div className="absolute top-4 left-4">
                <Badge className={`font-black uppercase text-[8px] tracking-widest px-2 py-1 shadow-sm border-none ${
                  product.status === 'En vente' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {product.status}
                </Badge>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Button 
                  size="icon" 
                  onClick={() => handleView(product)}
                  className="bg-white hover:bg-[#F2A900] text-[#2D1B08] hover:text-white rounded-full w-10 h-10 shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button 
                  size="icon" 
                  onClick={() => handleEdit(product)}
                  className="bg-white hover:bg-[#2D1B08] text-[#2D1B08] hover:text-white rounded-full w-10 h-10 shadow-lg"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="mb-4">
                <div className="text-[10px] font-black text-[#F2A900] uppercase tracking-[0.2em] mb-1">{product.category}</div>
                <h3 className="text-lg font-black text-[#2D1B08] uppercase tracking-tighter leading-tight group-hover:text-[#F2A900] transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#EBE3D5]/50">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#5D4037]/40 uppercase tracking-widest">Prix</span>
                  <span className="text-md font-black text-[#2D1B08]">{product.price}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-[#5D4037]/40 uppercase tracking-widest">Stock</span>
                  <span className={`text-sm font-black ${product.stock <= 5 ? 'text-red-500' : 'text-[#2D1B08]'}`}>
                    {product.stock} pcs
                  </span>
                </div>
              </div>

              <button 
                onClick={() => handleDelete(product.id, product.name)}
                className="w-full mt-6 py-3 border-2 border-[#EBE3D5] text-[#2D1B08] hover:text-red-500 hover:border-red-100 hover:bg-red-50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-3 h-3" />
                Supprimer
              </button>
            </CardContent>
          </Card>
        ))}

        {/* Add New Product Card */}
        <button 
          onClick={handleAdd}
          className="group border-2 border-dashed border-[#EBE3D5] hover:border-[#F2A900] bg-gray-50/50 hover:bg-[#F2A900]/5 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[350px]"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-[#F2A900]/20 group-hover:scale-110 transition-all mb-4 border border-[#EBE3D5]">
            <Plus className="w-8 h-8 text-[#F2A900]" />
          </div>
          <h3 className="text-sm font-black text-[#2D1B08] uppercase tracking-widest mb-2">Nouvelle Création</h3>
          <p className="text-xs font-medium text-[#5D4037]/60 max-w-[150px]">
            Ajoutez un nouvel article à votre catalogue
          </p>
        </button>
      </div>

      {/* Add/Edit Product Modal */}
      <Dialog open={isAddEditOpen} onOpenChange={setIsAddEditOpen}>
        <DialogContent className="sm:max-w-[500px] border-none rounded-[2rem] p-0 overflow-hidden shadow-2xl">
          <div className="bg-[#2D1B08] p-8 text-white relative">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
                {isEditing ? "Modifier le produit" : "Ajouter une création"}
              </DialogTitle>
              <p className="text-white/60 text-sm font-bold uppercase tracking-widest mt-1">
                {isEditing ? "Mettez à jour les détails de votre article" : "Partagez votre nouveau savoir-faire"}
              </p>
            </DialogHeader>
          </div>
          
          <form onSubmit={handleSave} className="p-8 space-y-6 bg-white">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037]/60">Nom du produit</Label>
                <Input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="rounded-xl border-2 border-[#EBE3D5] focus-visible:ring-[#F2A900]"
                  placeholder="Ex: Statue Mandingue" 
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037]/60">Prix (FCFA)</Label>
                <Input 
                  required
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="rounded-xl border-2 border-[#EBE3D5] focus-visible:ring-[#F2A900]"
                  placeholder="Ex: 5000" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037]/60">Stock</Label>
                <Input 
                  required
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="rounded-xl border-2 border-[#EBE3D5] focus-visible:ring-[#F2A900]"
                  placeholder="Ex: 10" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037]/60">Catégorie</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(val) => setFormData({...formData, category: val})}
                >
                  <SelectTrigger className="rounded-xl border-2 border-[#EBE3D5]">
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 border-[#EBE3D5]">
                    <SelectItem value="Sculpture">Sculpture</SelectItem>
                    <SelectItem value="Mode">Mode</SelectItem>
                    <SelectItem value="Poterie">Poterie</SelectItem>
                    <SelectItem value="Bijoux">Bijoux</SelectItem>
                    <SelectItem value="Textile">Textile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037]/60">Statut</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(val) => setFormData({...formData, status: val})}
                >
                  <SelectTrigger className="rounded-xl border-2 border-[#EBE3D5]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 border-[#EBE3D5]">
                    <SelectItem value="En vente">En vente</SelectItem>
                    <SelectItem value="Indisponible">Indisponible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 col-span-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037]/60">Description</Label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="rounded-xl border-2 border-[#EBE3D5] focus-visible:ring-[#F2A900] min-h-[100px]"
                  placeholder="Décrivez votre création..." 
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddEditOpen(false)}
                className="rounded-xl border-2 border-[#EBE3D5] text-[#2D1B08] font-black uppercase text-[10px] tracking-widest px-8"
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                className="rounded-xl bg-[#F2A900] hover:bg-[#D49400] text-white font-black uppercase text-[10px] tracking-widest px-8 shadow-lg shadow-[#F2A900]/20"
              >
                {isEditing ? "Enregistrer" : "Créer l'article"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Product Details Modal */}
      {currentProduct && (
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="sm:max-w-[800px] border-none rounded-[2rem] p-0 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            <div className="md:w-1/2 relative bg-gray-100 min-h-[300px]">
              <img 
                src={currentProduct.image} 
                className="absolute inset-0 w-full h-full object-cover"
                alt={currentProduct.name}
              />
              <Badge className="absolute top-6 left-6 font-black uppercase text-[10px] tracking-widest bg-white text-[#2D1B08] border-none px-4 py-2 shadow-xl">
                {currentProduct.category}
              </Badge>
            </div>
            
            <div className="md:w-1/2 p-10 bg-white overflow-y-auto">
              <div className="mb-8">
                <div className="text-[12px] font-black text-[#F2A900] uppercase tracking-[0.3em] mb-2">Artisanat du Sénégal</div>
                <h2 className="text-3xl font-black text-[#2D1B08] uppercase tracking-tighter leading-tight mb-4">
                  {currentProduct.name}
                </h2>
                <div className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-black uppercase tracking-widest">
                  <Package className="w-3 h-3 mr-2" />
                  {currentProduct.status}
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex gap-10">
                  <div>
                    <div className="text-[10px] font-black text-[#5D4037]/40 uppercase tracking-widest mb-1">Prix de vente</div>
                    <div className="text-2xl font-black text-[#2D1B08]">{currentProduct.price}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-[#5D4037]/40 uppercase tracking-widest mb-1">Stock actuel</div>
                    <div className="text-2xl font-black text-[#2D1B08]">{currentProduct.stock} pcs</div>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-black text-[#5D4037]/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Info className="w-3 h-3" />
                    Description & Histoire
                  </div>
                  <p className="text-[#5D4037] leading-relaxed font-medium">
                    {currentProduct.description || "Cette pièce unique témoigne d'un savoir-faire traditionnel transmis de génération en génération. Fabriquée à partir de matériaux locaux de haute qualité."}
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-[#EBE3D5] flex gap-4">
                <Button 
                  onClick={() => {
                    setIsViewOpen(false);
                    handleEdit(currentProduct);
                  }}
                  className="flex-1 bg-[#2D1B08] hover:bg-[#1a1005] text-white font-black uppercase text-xs tracking-widest h-12 rounded-xl"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button 
                  onClick={() => setIsViewOpen(false)}
                  variant="outline"
                  className="flex-1 border-2 border-[#EBE3D5] text-[#2D1B08] font-black uppercase text-xs tracking-widest h-12 rounded-xl"
                >
                  Fermer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ArtisanProductsPage;
