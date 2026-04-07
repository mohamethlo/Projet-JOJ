import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Star, 
  ShoppingBag, 
  ArrowLeft, 
  Palette, 
  CheckCircle2,
  Info,
  Phone,
  MessageCircle,
  Instagram,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Award,
  Globe,
  Heart,
  Users,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import { mockArtisans } from '@/lib/mockData';
import ArtisanProductOrderModal from '@/components/modals/ArtisanProductOrderModal';
import { useNotifications } from '@/context/NotificationContext';
import useProtectedAction from '@/hooks/useProtectedAction';

const PublicArtisanProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'produits';
  const [activeTab, setActiveTab] = useState<'vitrine' | 'produits' | 'about' | 'reviews'>(initialTab);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
  const { toggleFollow, isFollowing: checkFollowing } = useNotifications();
  const { performAction, AuthModalComponent } = useProtectedAction();
  const isFollowing = id ? checkFollowing(id) : false;

  const baseArtisan = mockArtisans.find(a => a.id === id);

  if (!baseArtisan) {
    return (
      <div className="min-h-screen bg-[#FFFDFB] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-black text-[#2D1B08] uppercase tracking-tighter mb-4">Artisan non trouvé</h2>
        <Button onClick={() => navigate('/artisans')} className="bg-[#2D1B08] text-white">
          Retour aux artisans
        </Button>
      </div>
    );
  }

  const artisan = {
    ...baseArtisan,
    tagline: baseArtisan.description.split('.')[0] + '.',
    coverImage: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=1920&h=600&fit=crop',
    followers: 1240,
    posts: baseArtisan.products + 5,
    verified: true
  };

  const handleTabChange = (tab: string, scroll = false) => {
    setActiveTab(tab as any);
    setSearchParams({ tab });
    
    if (scroll) {
      const element = document.getElementById('profile-tabs');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleFollow = () => {
    if (!id) return;
    performAction(() => {
      toggleFollow(id);
      if (isFollowing) {
        toast.error(`Vous ne suivez plus ${artisan.name}`);
      } else {
        toast.success(`Vous suivez désormais ${artisan.name}`);
      }
    });
  };

  const handleChat = () => {
    performAction(() => {
      navigate(`/messages?userId=${artisan.id}`);
    });
  };

  const handleOrder = (product: any) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const products = artisan.productList || [];

  return (
    <div className="min-h-screen bg-[#FFFDFB] pb-12">
      <ArtisanProductOrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        product={selectedProduct} 
        artisanName={artisan.name} 
      />

      {/* Cover Image */}
      <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full overflow-hidden">
        <img 
          src={artisan.coverImage} 
          alt={`Couverture ${artisan.name}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        <div className="absolute top-4 left-4 z-20">
          <Button 
            onClick={() => navigate('/artisans')}
            variant="ghost"
            className="bg-black/20 hover:bg-black/40 text-white rounded-full p-2 h-10 w-10 flex items-center justify-center backdrop-blur-md border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-20 md:-mt-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
            {/* Profile Picture */}
            <Avatar className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 border-4 sm:border-6 border-white shadow-2xl bg-white">
              <AvatarImage src={artisan.image} alt={artisan.name} className="object-cover" />
              <AvatarFallback className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F2A900] bg-[#FFFDFB]">
                {artisan.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Info & Actions */}
            <div className="flex-1 w-full sm:pb-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2D1B08]">
                      {artisan.name}
                    </h1>
                    {artisan.verified && (
                      <Badge className="bg-[#1B5E20] text-white border-none flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Vérifié
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant="outline" className="border-[#F2A900] text-[#F2A900] font-bold">
                      <Palette className="h-3 w-3 mr-1" />
                      Artisan
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-[#5D4037]">
                      <MapPin className="h-4 w-4" />
                      <span className="font-bold">{artisan.location}</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#5D4037] max-w-2xl font-medium">
                    {artisan.tagline}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm pt-2">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#F2A900] shrink-0" />
                      <span className="font-black text-[#2D1B08]">{artisan.followers.toLocaleString()}</span>
                      <span className="text-[#5D4037]/70 hidden xs:inline">abonnés</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#F2A900] shrink-0" />
                      <span className="font-black text-[#2D1B08]">{artisan.posts}</span>
                      <span className="text-[#5D4037]/70 hidden xs:inline">publications</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#F2A900] fill-[#F2A900] shrink-0" />
                      <span className="font-black text-[#2D1B08]">{artisan.rating}</span>
                      <span className="text-[#5D4037]/70">(124)</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    onClick={handleFollow}
                    className={`${isFollowing
                      ? 'bg-[#EBE3D5] text-[#2D1B08] hover:bg-[#EBE3D5]/80'
                      : 'bg-[#F2A900] hover:bg-[#D49400] text-white'
                      } font-black rounded-full px-6 py-3 text-sm transition-all shadow-lg`}
                  >
                    {isFollowing ? (
                      <>
                        <Check className="h-4 w-4 mr-1.5" />
                        Abonné
                      </>
                    ) : (
                      <>
                        <Heart className="h-4 w-4 mr-1.5" />
                        Suivre
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#6B4226] text-[#6B4226] hover:bg-[#6B4226] hover:text-white font-black rounded-full px-6 py-3 text-sm shadow-sm"
                    onClick={handleChat}
                  >
                    <MessageSquare className="h-4 w-4 mr-1.5" />
                    Chat
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white font-black rounded-full px-6 py-3 text-sm shadow-sm"
                    onClick={() => handleTabChange('produits', true)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-1.5" />
                    Commander
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div id="profile-tabs" className="mt-8 sm:mt-10 border-b-2 border-[#EBE3D5]">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {[
              { id: 'vitrine', label: 'Vitrine', shortLabel: 'Vitrine', icon: ImageIcon },
              { id: 'produits', label: 'Maison', shortLabel: 'Maison', icon: ShoppingBag },
              { id: 'about', label: 'À propos', shortLabel: 'Info', icon: Info },
              { id: 'reviews', label: 'Avis', shortLabel: 'Avis', icon: MessageSquare }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-black text-xs sm:text-sm md:text-base transition-all relative whitespace-nowrap ${
                  activeTab === tab.id ? 'text-[#F2A900]' : 'text-[#5D4037]/60 hover:text-[#2D1B08]'
                }`}
              >
                <tab.icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F2A900] rounded-t-full shadow-[0_-4px_10px_rgba(242,169,0,0.3)]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'vitrine' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-[#EBE3D5] group relative cursor-pointer shadow-sm">
                  <img 
                    src={`https://images.pexels.com/photos/${1036623 + (i * 1000)}/pexels-photo-${1036623 + (i * 1000)}.jpeg?auto=compress&cs=tinysrgb&w=600`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt=""
                    onError={(e) => { e.currentTarget.src = artisan.image; }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'produits' && (
            <section className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product: any) => (
                  <div key={product.id} className="group bg-white border-2 border-[#EBE3D5] rounded-[2.5rem] overflow-hidden hover:border-[#F2A900] hover:shadow-2xl transition-all duration-500 flex flex-col h-full shadow-sm">
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                       <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-xl border border-[#EBE3D5]">
                            <ShoppingBag className="w-4 h-4 text-[#2D1B08]" />
                          </div>
                       </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                       <h4 className="font-black text-lg text-[#2D1B08] uppercase tracking-tight mb-2 group-hover:text-[#F2A900] transition-colors line-clamp-2">{product.name}</h4>
                       <div className="mt-auto pt-4 border-t border-gray-50">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black text-[#5D4037]/30 uppercase tracking-[0.2em]">Prix</span>
                            <span className="text-xl font-black text-[#2D1B08]">{product.price}</span>
                          </div>
                          <Button 
                            onClick={() => handleOrder(product)}
                            className="w-full bg-[#FCFAF7] hover:bg-[#F2A900] text-[#2D1B08] hover:text-white border-2 border-[#EBE3D5] hover:border-[#F2A900] font-black uppercase text-[10px] tracking-widest h-12 rounded-xl transition-all shadow-sm hover:shadow-lg shadow-[#F2A900]/10"
                          >
                             Commander
                          </Button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
              {products.length === 0 && (
                <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-[#EBE3D5] text-center max-w-2xl mx-auto">
                  <ShoppingBag className="w-12 h-12 text-[#EBE3D5] mx-auto mb-4" />
                  <h3 className="text-xl font-black text-[#2D1B08] uppercase tracking-tighter">Aucun produit listé</h3>
                  <p className="text-[#5D4037]/60 font-medium italic">Revenez bientôt pour découvrir les nouvelles créations.</p>
                </div>
              )}
            </section>
          )}

          {activeTab === 'about' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <section className="bg-white p-8 rounded-[2rem] border-2 border-[#EBE3D5] shadow-sm space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F2A900]/10 flex items-center justify-center">
                      <Palette className="w-5 h-5 text-[#F2A900]" />
                    </div>
                    <h2 className="text-xl font-black text-[#2D1B08] uppercase tracking-tighter">Notre Histoire</h2>
                  </div>
                  <div className="space-y-6 text-[#5D4037]/80 leading-relaxed font-medium">
                    <p className="font-bold text-[#5D4037] text-xl italic border-l-4 border-[#F2A900] pl-6 py-1">
                      "{artisan.description}"
                    </p>
                    <p>
                      Situé au cœur de {artisan.city}, l'atelier de {artisan.name} est un lieu de transmission et de création. 
                      Chaque pièce est façonnée avec une attention méticuleuse portée aux détails.
                    </p>
                    <p>
                      {artisan.name} travaille principalement avec des matériaux locaux comme l'ébène, le cuir tanné traditionnellement et les pigments naturels pour ses textiles. 
                    </p>
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-[1.5rem] border-2 border-[#EBE3D5] shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-black text-[#2D1B08] uppercase tracking-tight mb-1 text-xs">Certification Pro</h4>
                      <p className="text-[12px] text-[#5D4037]/60 font-medium leading-relaxed">
                        Reconnu par la Chambre des Métiers.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-[1.5rem] border-2 border-[#EBE3D5] shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F2A900]/5 flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6 text-[#F2A900]" />
                    </div>
                    <div>
                      <h4 className="font-black text-[#2D1B08] uppercase tracking-tight mb-1 text-xs">Prix d'Honneur</h4>
                      <p className="text-[12px] text-[#5D4037]/60 font-medium leading-relaxed">
                        Lauréat du grand prix 2023.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="bg-[#2D1B08] p-8 rounded-[2rem] shadow-xl text-white space-y-8 group overflow-hidden relative">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F2A900]/10 rounded-full blur-3xl" />
                  
                  <div className="space-y-2">
                    <Badge className="bg-[#1B5E20] text-white border-none font-black text-[10px] uppercase tracking-widest px-3 py-1">
                      Disponible
                    </Badge>
                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight">
                      Contact
                    </h3>
                  </div>

                  <div className="space-y-3 relative z-10">
                     <Button className="w-full justify-center gap-3 bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black uppercase text-[10px] tracking-widest h-14 rounded-xl shadow-lg transition-all">
                        <Phone className="w-4 h-4" />
                        Appeler
                     </Button>
                     <Button variant="outline" className="w-full justify-center gap-3 border-white/20 text-white hover:bg-white/10 h-14 rounded-xl bg-white/5 transition-all text-[10px] font-black uppercase">
                        <MessageCircle className="w-4 h-4 text-green-400" />
                        WhatsApp
                     </Button>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-center gap-4">
                     <button className="p-3 bg-white/5 hover:bg-[#F2A900]/20 rounded-xl text-white transition-all">
                        <Instagram className="w-5 h-5 text-pink-400" />
                     </button>
                     <button className="p-3 bg-white/5 hover:bg-[#1B5E20]/20 rounded-xl text-white transition-all">
                        <Globe className="w-5 h-5 text-[#F2A900]" />
                     </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border-2 border-[#EBE3D5] shadow-sm space-y-4">
                  <h4 className="font-black text-[#2D1B08] uppercase tracking-widest text-[10px] border-b border-[#EBE3D5] pb-3">Informations</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-[#EBE3D5]/50">
                        <MapPin className="w-4 h-4 text-[#F2A900]" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-[#5D4037]/40 uppercase tracking-widest">Atelier</p>
                        <p className="text-xs font-bold text-[#2D1B08]">{artisan.city}, Sénégal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-[2rem] border-2 border-[#EBE3D5] shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="text-6xl font-black text-[#2D1B08] leading-none mb-3">{artisan.rating}</div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(artisan.rating) ? 'text-[#F2A900] fill-[#F2A900]' : 'text-[#EBE3D5]'}`} />
                    ))}
                  </div>
                  <p className="text-[#5D4037]/60 font-black text-[9px] uppercase tracking-widest">
                    124 avis clients
                  </p>
                </div>

                <div className="lg:col-span-3 space-y-4">
                  {[
                    { name: "Fatou Ndour", rating: 5, date: "Il y a 2 jours", text: "Commande d'un sac en textile reçue hier. La qualité est incroyable, les finitions sont parfaites. On sent l'amour du métier !" },
                    { name: "Moussa Sow", rating: 5, date: "Il y a 1 semaine", text: "J'ai visité l'atelier à Saly, l'accueil était chaleureux. La statue commandée trône fièrement dans mon salon. Merci encore !" }
                  ].map((review, i) => (
                    <div key={i} className="bg-white p-6 rounded-[1.5rem] border-2 border-[#EBE3D5] shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-[#EBE3D5] rounded-xl">
                            <AvatarFallback className="bg-gray-100 text-[#2D1B08] font-black text-xs">{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-black text-[#2D1B08] uppercase tracking-tight text-xs">{review.name}</h4>
                            <div className="flex items-center gap-0.5 mt-0.5">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className={`w-2.5 h-2.5 ${j < review.rating ? 'text-[#F2A900] fill-[#F2A900]' : 'text-[#EBE3D5]'}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-[#5D4037]/40 uppercase tracking-widest">{review.date}</span>
                      </div>
                      <p className="text-[#5D4037] text-sm leading-relaxed font-medium italic">"{review.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {AuthModalComponent}
    </div>
  );
};

export default PublicArtisanProfilePage;
