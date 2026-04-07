import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  CheckCircle,
  ArrowLeft,
  User,
  Package,
  Truck,
  Clock,
  ChevronRight,
  ShoppingBag
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast, Toaster } from 'sonner';

const ArtisanOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data for artisan orders
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-001',
      customerName: 'Fatou Diop',
      customerEmail: 'fatou.diop@email.sn',
      customerPhone: '+221 77 567 89 01',
      location: 'Dakar, Plateau',
      items: [
        { name: 'Statue en bois d\'ébène', quantity: 1, price: '45,000 FCFA' }
      ],
      total: '45,000 FCFA',
      status: 'En préparation',
      date: '2024-03-25',
      paymentMethod: 'Orange Money'
    },
    {
      id: 'ORD-2024-002',
      customerName: 'Michel Dupont',
      customerEmail: 'm.dupont@voyage.fr',
      customerPhone: '+33 6 12 34 56 78',
      location: 'Hôtel Terrou-Bi, Dakar',
      items: [
        { name: 'Sac en bogolan', quantity: 2, price: '15,000 FCFA' },
        { name: 'Collier perles', quantity: 1, price: '8,500 FCFA' }
      ],
      total: '38,500 FCFA',
      status: 'En attente',
      date: '2024-03-27',
      paymentMethod: 'Carte Bancaire'
    },
    {
      id: 'ORD-2024-003',
      customerName: 'Amadou Sow',
      customerEmail: 'amadou.sow@gmail.com',
      customerPhone: '+221 78 123 45 67',
      location: 'Saint-Louis, Sénégal',
      items: [
        { name: 'Plat en céramique', quantity: 3, price: '8,500 FCFA' }
      ],
      total: '25,500 FCFA',
      status: 'Expédiée',
      date: '2024-03-20',
      paymentMethod: 'Wari'
    },
    {
      id: 'ORD-2024-004',
      customerName: 'Ibrahima Fall',
      customerEmail: 'ibra.f@outlook.com',
      customerPhone: '+221 76 999 88 77',
      location: 'Thiès, Sénégal',
      items: [
        { name: 'Masque traditionnel', quantity: 1, price: '60,000 FCFA' }
      ],
      total: '60,000 FCFA',
      status: 'Livrée',
      date: '2024-03-15',
      paymentMethod: 'Espèces (Click & Collect)'
    }
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    toast.success(`Statut mis à jour : ${newStatus}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'En attente':
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200 font-bold uppercase text-[9px] tracking-widest px-3 py-1">En attente</Badge>;
      case 'En préparation':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 font-bold uppercase text-[9px] tracking-widest px-3 py-1">En préparation</Badge>;
      case 'Expédiée':
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200 font-bold uppercase text-[9px] tracking-widest px-3 py-1">Expédiée</Badge>;
      case 'Livrée':
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-bold uppercase text-[9px] tracking-widest px-3 py-1">Livrée</Badge>;
      case 'Annulée':
        return <Badge className="bg-red-100 text-red-700 border-red-200 font-bold uppercase text-[9px] tracking-widest px-3 py-1">Annulée</Badge>;
      default:
        return <Badge className="font-bold uppercase text-[9px] tracking-widest px-3 py-1">{status}</Badge>;
    }
  };

  const stats = {
    total: orders.length,
    revenue: '169,000 FCFA',
    pending: orders.filter(o => o.status === 'En attente' || o.status === 'En préparation').length,
    delivered: orders.filter(o => o.status === 'Livrée').length
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-[#FFFDFB] min-h-screen">
      <Toaster position="top-right" richColors />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#5D4037]/50 mb-2">
            <button onClick={() => navigate(-1)} className="hover:text-[#2D1B08] transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="text-[10px] font-black uppercase tracking-widest">Tableau de bord / Artisan</span>
          </div>
          <h1 className="text-3xl font-black text-[#2D1B08] uppercase tracking-tighter">Gestion des Commandes</h1>
          <p className="text-[#5D4037]/70 font-medium">Suivez vos ventes et gérez vos expéditions.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-2 border-[#EBE3D5] text-[#2D1B08] font-black rounded-xl h-12 uppercase text-[10px] tracking-widest px-6 shadow-sm">
            Exporter .CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2 border-[#EBE3D5] bg-white rounded-[2rem] shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="p-3 bg-[#F2A900]/10 text-[#F2A900] rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-[#2D1B08] tracking-tighter">{stats.total}</div>
            <div className="text-[10px] font-black text-[#5D4037]/40 uppercase tracking-widest mt-1">Commandes Totales</div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-[#EBE3D5] bg-white rounded-[2rem] shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-blue-600 tracking-tighter">{stats.pending}</div>
            <div className="text-[10px] font-black text-[#5D4037]/40 uppercase tracking-widest mt-1">En cours</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#EBE3D5] bg-white rounded-[2rem] shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-emerald-600 tracking-tighter">{stats.delivered}</div>
            <div className="text-[10px] font-black text-[#5D4037]/40 uppercase tracking-widest mt-1">Livrées</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#EBE3D5] bg-[#1B5E20] text-white rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl" />
          <CardContent className="p-6 relative z-10">
            <div className="p-3 bg-white/10 text-white rounded-2xl w-fit mb-4">
              <Package className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black tracking-tighter">{stats.revenue}</div>
            <div className="text-[10px] font-black text-white/60 uppercase tracking-widest mt-1 italic">Chiffre d'Affaire</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Bar */}
      <Card className="border-2 border-[#EBE3D5] bg-white rounded-[2rem] shadow-sm overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5D4037]/40" />
              <Input
                placeholder="Rechercher par client ou n° de commande..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 border-2 border-[#EBE3D5] rounded-2xl font-bold bg-[#FAFAFA] focus-visible:ring-[#F2A900]"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-14 border-2 border-[#EBE3D5] rounded-2xl font-bold">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-2 border-[#EBE3D5]">
                  <SelectItem value="Tous">Tous les statuts</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="En préparation">En préparation</SelectItem>
                  <SelectItem value="Expédiée">Expédiée</SelectItem>
                  <SelectItem value="Livrée">Livrée</SelectItem>
                  <SelectItem value="Annulée">Annulées</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Card key={order.id} className="border-2 border-[#EBE3D5] hover:border-[#F2A900]/30 bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-all group overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                  {/* Item Icon */}
                  <div className="hidden md:flex h-16 w-16 bg-[#FAFAFA] rounded-2xl items-center justify-center border-2 border-[#EBE3D5] group-hover:border-[#F2A900]/20 transition-colors">
                    <ShoppingBag className="h-6 w-6 text-[#2D1B08]/40" />
                  </div>

                  {/* Order Info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-[#F2A900] uppercase tracking-widest">{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <h3 className="text-xl font-black text-[#2D1B08] uppercase tracking-tighter">{order.customerName}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-[#5D4037]/60">
                      <span className="flex items-center gap-1">< Clock size={12} /> {order.date}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1 font-black text-[#1B5E20] uppercase text-[10px]">{order.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Total & Action */}
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-[#EBE3D5]/50">
                    <div className="text-2xl font-black text-[#2D1B08]">{order.total}</div>
                    <Button 
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsDialogOpen(true);
                      }}
                      className="bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black rounded-xl h-10 px-6 uppercase text-[9px] tracking-widest transition-all shadow-lg"
                    >
                      Détails
                      <ChevronRight className="h-3 w-3 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-[#EBE3D5]">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-[#EBE3D5]" />
            </div>
            <p className="text-[#5D4037]/50 font-black uppercase tracking-widest text-xs">Aucune commande trouvée</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] rounded-[3rem] border-4 border-[#EBE3D5] bg-white p-0 overflow-hidden shadow-2xl flex flex-col">
          <div className="bg-[#2D1B08] p-8 text-white relative shrink-0">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                {selectedOrder?.id}
                {selectedOrder && getStatusBadge(selectedOrder.status)}
              </DialogTitle>
              <DialogDescription className="text-white/60 font-bold uppercase text-[10px] tracking-widest mt-1">
                Détails de la vente et expédition
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {selectedOrder && (
              <>
                {/* Customer Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-6 bg-[#FAFAFA] rounded-[2rem] border-2 border-[#EBE3D5]/50">
                  <div>
                    <Label className="text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest block mb-2">Client</Label>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-[#F2A900]/10 rounded-full flex items-center justify-center text-[#F2A900]">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="font-black text-[#2D1B08] uppercase leading-tight">{selectedOrder.customerName}</p>
                        <p className="text-xs font-bold text-[#5D4037]/60 italic">{selectedOrder.customerEmail}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest block mb-2">Localisation</Label>
                    <p className="font-bold text-[#2D1B08] text-sm flex items-start gap-2">
                      <Truck className="h-4 w-4 text-[#F2A900] shrink-0" />
                      {selectedOrder.location}
                    </p>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  <Label className="text-[10px] font-black text-[#2D1B08] uppercase tracking-[0.2em] flex items-center gap-2">
                    <Package className="h-4 w-4 text-[#F2A900]" /> Articles commandés
                  </Label>
                  <div className="rounded-[2rem] border-2 border-[#EBE3D5] overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-[#FAFAFA] border-b-2 border-[#EBE3D5]">
                        <tr>
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-[#5D4037]/60">Article</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-[#5D4037]/60 text-center">Qté</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-[#5D4037]/60 text-right">Prix</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-[#EBE3D5]/30">
                        {selectedOrder.items.map((item: any, i: number) => (
                          <tr key={i}>
                            <td className="px-6 py-4 font-black text-[#2D1B08] uppercase text-xs">{item.name}</td>
                            <td className="px-6 py-4 text-center font-bold text-[#5D4037]">{item.quantity}</td>
                            <td className="px-6 py-4 text-right font-black text-[#2D1B08]">{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-[#FAFAFA] border-t-2 border-[#EBE3D5]">
                        <tr>
                          <td colSpan={2} className="px-6 py-4 text-right text-[10px] font-black uppercase text-[#2D1B08]">TOTAL</td>
                          <td className="px-6 py-4 text-right font-black text-xl text-[#1B5E20] tracking-tighter">{selectedOrder.total}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Status Update Actions */}
                <div className="space-y-4">
                  <Label className="text-[10px] font-black text-[#2D1B08] uppercase tracking-[0.2em]">Mettre à jour le statut</Label>
                  <div className="flex flex-wrap gap-2 text-center">
                    <Button 
                      variant={selectedOrder.status === 'En préparation' ? 'default' : 'outline'}
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'En préparation')}
                      className={`rounded-xl font-black uppercase text-[8px] sm:text-[9px] tracking-widest h-10 px-4 flex-1 sm:flex-none ${selectedOrder.status === 'En préparation' ? 'bg-blue-600' : 'border-2 border-blue-100 text-blue-600'}`}
                    >
                      En préparation
                    </Button>
                    <Button 
                      variant={selectedOrder.status === 'Expédiée' ? 'default' : 'outline'}
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'Expédiée')}
                      className={`rounded-xl font-black uppercase text-[8px] sm:text-[9px] tracking-widest h-10 px-4 flex-1 sm:flex-none ${selectedOrder.status === 'Expédiée' ? 'bg-purple-600' : 'border-2 border-purple-100 text-purple-600'}`}
                    >
                      Expédiée
                    </Button>
                    <Button 
                      variant={selectedOrder.status === 'Livrée' ? 'default' : 'outline'}
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'Livrée')}
                      className={`rounded-xl font-black uppercase text-[8px] sm:text-[9px] tracking-widest h-10 px-4 flex-1 sm:flex-none ${selectedOrder.status === 'Livrée' ? 'bg-emerald-600' : 'border-2 border-emerald-100 text-emerald-600'}`}
                    >
                      Livrée
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          <DialogFooter className="p-8 bg-[#FAFAFA] border-t-2 border-[#EBE3D5] flex gap-2 shrink-0">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl border-2 border-[#EBE3D5] font-black uppercase text-[10px] tracking-widest h-12 flex-1">
              Fermer
            </Button>
            <Button className="rounded-xl bg-[#2D1B08] text-white font-black uppercase text-[10px] tracking-widest h-12 flex-1 shadow-lg">
              Contacter le client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtisanOrdersPage;
