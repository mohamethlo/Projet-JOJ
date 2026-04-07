import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

import {
  ArrowLeft,
  Save,
  Eye,
  Upload,
  X,
  Plus,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  ShoppingBag,
  Check,
  Star,
  Users,
  Settings,
  Sparkles,
  Scissors
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  // File refs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // States
  const [coverImage, setCoverImage] = useState('/images/artisan_cover.png');
  const [profileImage, setProfileImage] = useState('/images/artisan_avatar.png');
  const [name, setName] = useState('Artisanat d\'Excellence');
  const [tagline, setTagline] = useState('Créations uniques mêlant tradition sénégalaise et modernité');
  const [description, setDescription] = useState('Notre atelier est spécialisé dans la sculpture traditionnelle sur bois exotique et la forge artistique. Chaque pièce est une création unique, mêlant savoir-faire ancestral et design contemporain. Nous travaillons essentiellement avec des matériaux durables et locaux.');
  const [location, setLocation] = useState('Dakar, Village Artisanal');
  const [phone, setPhone] = useState('+221 77 123 45 67');
  const [email, setEmail] = useState('moussa.art@discover.sn');
  const [website, setWebsite] = useState('www.moussa-artisanat.sn');
  const [specialties, setSpecialties] = useState(['Sculpture sur bois', 'Forge artistique', 'Restauration d\'objets d\'art', 'Teinture naturelle']);
  const [newSpecialty, setNewSpecialty] = useState('');

  // Modal states
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRelayPointsOpen, setIsRelayPointsOpen] = useState(false);

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
      setSpecialties([...specialties, newSpecialty.trim()]);
      setNewSpecialty('');
      toast.success(`${newSpecialty} ajouté`);
    }
  };

  const handleRemoveSpecialty = (index: number) => {
    setSpecialties(specialties.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Profil artisan mis à jour !', {
        description: "Les modifications sont effectives immédiatement."
      });
    }, 1500);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'avatar') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'cover') setCoverImage(url);
      else setProfileImage(url);
      
      toast.success(`${type === 'cover' ? 'Couverture' : 'Photo'} mise à jour avec succès !`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] pb-12">
      {/* Hidden inputs */}
      <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={(e) => onFileChange(e, 'cover')} />
      <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => onFileChange(e, 'avatar')} />

      {/* Header with Actions */}
      <div className="bg-white border-b-2 border-[#EBE3D5] sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-[#5D4037] font-bold">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <div>
                <h1 className="text-2xl font-black text-[#2D1B08] uppercase tracking-tighter">Modifier mon profil</h1>
                <p className="text-xs text-[#5D4037]/70 font-bold uppercase tracking-widest">Gestion de la vitrine publique</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/artisan/${user?.id || '1'}`}>
                <Button variant="outline" className="border-2 border-[#F2A900] text-[#F2A900] font-black rounded-xl">
                  <Eye className="h-4 w-4 mr-2" />
                  Aperçu public
                </Button>
              </Link>
              <Button onClick={handleSave} disabled={isSaving} className="bg-[#1B5E20] text-white font-black rounded-xl shadow-lg">
                {isSaving ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Images Section */}
            <div className="bg-white rounded-[2.5rem] border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
              <div className="p-6 border-b-2 border-[#EBE3D5] bg-[#FFFDFB]">
                <h2 className="text-xl font-black text-[#2D1B08] uppercase tracking-tight flex items-center gap-2">
                  <Camera className="h-5 w-5 text-[#F2A900]" />
                  Images de l'Atelier
                </h2>
              </div>
              <div className="p-8 space-y-8">
                <div>
                  <Label className="text-xs font-black text-[#5D4037]/60 uppercase mb-3 block italic tracking-widest">Image de couverture / En-tête</Label>
                  <div className="relative h-56 rounded-[2rem] overflow-hidden border-2 border-[#EBE3D5] group shadow-inner">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button onClick={() => coverInputRef.current?.click()} className="bg-white text-[#2D1B08] hover:bg-[#F2A900] hover:text-white font-black rounded-xl border-none">
                        <Upload className="h-4 w-4 mr-2" />
                        Changer la couverture
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 bg-gray-50/50 p-6 rounded-[2rem] border border-[#EBE3D5]/50">
                  <div className="relative group shrink-0">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-2xl bg-white transition-transform duration-500 group-hover:scale-105">
                      <AvatarImage src={profileImage} />
                      <AvatarFallback className="text-3xl font-black text-[#F2A900] bg-[#FFFDFB]">{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <button onClick={() => avatarInputRef.current?.click()} className="absolute bottom-1 right-1 h-8 w-8 bg-[#F2A900] text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg hover:bg-[#2D1B08] transition-colors">
                      <Upload size={14} />
                    </button>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-sm font-black text-[#2D1B08] uppercase tracking-widest">Logo ou Photo de Profil</h3>
                    <p className="text-xs text-[#5D4037]/60 leading-relaxed italic">Utilisez une image carrée. Formats recommandés : JPG ou PNG.</p>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" onClick={() => setProfileImage('')} className="border-2 border-[#EBE3D5] text-red-500 font-bold rounded-xl h-9">Supprimer</Button>
                      <Button size="sm" onClick={() => setIsCropModalOpen(true)} className="bg-[#2D1B08] text-white font-bold rounded-xl h-9 flex items-center gap-2">
                        <Scissors size={14} />
                        Recadrer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Identité Section */}
            <div className="bg-white rounded-[2.5rem] border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
              <div className="p-6 border-b-2 border-[#EBE3D5] bg-[#FFFDFB]">
                <h2 className="text-xl font-black text-[#2D1B08] uppercase tracking-tight">Identité de l'Échoppe</h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-[#5D4037]/60">Nom Professionnel *</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="rounded-2xl border-2 border-[#EBE3D5] h-12 font-bold focus:ring-[#F2A900]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-[#5D4037]/60">Slogan *</Label>
                    <Input value={tagline} onChange={(e) => setTagline(e.target.value)} className="rounded-2xl border-2 border-[#EBE3D5] h-12 font-bold focus:ring-[#F2A900]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-[#5D4037]/60">Description de votre Art *</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="rounded-2xl border-2 border-[#EBE3D5] font-medium resize-none focus:ring-[#F2A900]" />
                </div>
              </div>
            </div>

            {/* Specialties Section */}
            <div className="bg-white rounded-[2.5rem] border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
              <div className="p-6 border-b-2 border-[#EBE3D5] bg-[#FFFDFB]">
                <h2 className="text-xl font-black text-[#2D1B08] uppercase tracking-tight flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#F2A900]" />
                  Spécialités & Savoir-faire
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex flex-wrap gap-2 p-4 bg-gray-50/50 rounded-[2rem] border border-[#EBE3D5]/50 min-h-[60px]">
                  {specialties.map((s, i) => (
                    <Badge key={i} className="bg-white border-2 border-[#1B5E20]/20 text-[#1B5E20] font-black px-4 py-2 text-[10px] uppercase tracking-widest shadow-sm">
                      {s} <button onClick={() => handleRemoveSpecialty(i)} className="ml-2 hover:text-red-600"><X className="h-3 w-3" /></button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input value={newSpecialty} onChange={(e) => setNewSpecialty(e.target.value)} placeholder="Ajoutez une compétence..." className="h-12 border-2 border-[#EBE3D5] rounded-xl font-bold flex-1" />
                  <Button onClick={handleAddSpecialty} className="bg-[#1B5E20] hover:bg-[#15490F] text-white font-black px-6 rounded-xl">Ajouter</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-gradient-to-br from-[#1B5E20] to-[#0D3010] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
              <div className="relative z-10">
                <Badge className="bg-white/20 text-white border-none font-black text-[9px] uppercase tracking-widest mb-4 italic">Statut Activé</Badge>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Profil Public Visible</h3>
                <Link to={`/artisan/${user?.id || '1'}`} className="block">
                  <Button className="w-full bg-white text-[#1B5E20] hover:bg-[#FFFDFB] font-black uppercase tracking-widest h-14 rounded-[1.2rem] shadow-xl group-hover:scale-[1.02] transition-transform">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir ma page
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-[2.5rem] border-2 border-[#EBE3D5] overflow-hidden shadow-sm p-4 space-y-2">
              <Link to="/artisan/products" className="block">
                <Button className="w-full justify-start bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black uppercase tracking-widest h-14 rounded-2xl shadow-lg transition-transform hover:translate-x-1">
                  <ShoppingBag className="h-4 w-4 mr-3" /> Mes Produits
                </Button>
              </Link>
              <Button onClick={() => setIsSettingsOpen(true)} variant="outline" className="w-full justify-start border-2 border-[#EBE3D5] hover:border-[#F2A900] font-bold h-12 rounded-xl">
                <Settings className="h-4 w-4 mr-3 text-[#5D4037]/60" /> Paramètres de vente
              </Button>
              <Button onClick={() => setIsRelayPointsOpen(true)} variant="outline" className="w-full justify-start border-2 border-[#EBE3D5] hover:border-[#F2A900] font-bold h-12 rounded-xl">
                <MapPin className="h-4 w-4 mr-3 text-[#5D4037]/60" /> Points relais
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Crop Modal */}
      <Dialog open={isCropModalOpen} onOpenChange={setIsCropModalOpen}>
        <DialogContent className="max-w-xl rounded-[2.5rem] border-4 border-[#EBE3D5] bg-white p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[#2D1B08] uppercase tracking-tighter">Recadrez votre photo</DialogTitle>
            <DialogDescription className="font-bold text-[#5D4037]/60 uppercase text-[10px] tracking-widest">Ajustez l'image pour un rendu optimal sur votre profil</DialogDescription>
          </DialogHeader>
          <div className="my-8 aspect-square rounded-[2rem] bg-gray-100 border-2 border-dashed border-[#EBE3D5]/50 flex items-center justify-center overflow-hidden">
            <img src={profileImage} alt="Crop preview" className="max-h-full max-w-full object-contain p-4" />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setIsCropModalOpen(false)} className="font-bold rounded-xl">Annuler</Button>
            <Button onClick={() => { setIsCropModalOpen(false); toast.success("Photo recadrée !"); }} className="bg-[#2D1B08] text-white font-black rounded-xl px-8">Appliquer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-2xl rounded-[2.5rem] border-4 border-[#EBE3D5] bg-white p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[#2D1B08] uppercase tracking-tighter">Paramètres de vente</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 my-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-[#EBE3D5]">
              <div>
                <p className="font-black text-[#2D1B08] text-sm uppercase tracking-tight">Livraison domicile</p>
                <p className="text-xs text-[#5D4037]/70">Autoriser les commandes vers Dakar & banlieue</p>
              </div>
              <div className="w-12 h-6 bg-[#1B5E20] rounded-full flex items-center px-1"><div className="w-4 h-4 bg-white rounded-full translate-x-6" /></div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-[#EBE3D5]">
              <div>
                <p className="font-black text-[#2D1B08] text-sm uppercase tracking-tight">Click & Collect</p>
                <p className="text-xs text-[#5D4037]/70">Retrait direct à votre atelier</p>
              </div>
              <div className="w-12 h-6 bg-[#1B5E20] rounded-full flex items-center px-1"><div className="w-4 h-4 bg-white rounded-full translate-x-6" /></div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsSettingsOpen(false)} className="bg-[#1B5E20] text-white font-black rounded-xl w-full h-12">Sauvegarder les paramètres</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Relay Points Modal */}
      <Dialog open={isRelayPointsOpen} onOpenChange={setIsRelayPointsOpen}>
        <DialogContent className="max-w-2xl rounded-[2.5rem] border-4 border-[#EBE3D5] bg-white p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[#2D1B08] uppercase tracking-tighter">Mes Points Relais</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 my-6">
            <div className="p-4 border-2 border-[#EBE3D5] rounded-2xl flex justify-between items-center group hover:bg-[#F2A900]/5 transition-colors">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#F2A900] h-5 w-5 mt-1" />
                <div>
                  <p className="font-black text-[#2D1B08] text-sm uppercase">Station ELTON - Mermoz</p>
                  <p className="text-xs text-[#5D4037]/70">Dakar, Sénégal (Dépôt sécurisé)</p>
                </div>
              </div>
              <button className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
            </div>
            <Button variant="outline" className="w-full border-2 border-dashed border-[#EBE3D5] h-14 rounded-2xl font-black flex items-center gap-2 text-[#5D4037]/50 hover:bg-gray-50">
              <Plus size={18} /> Ajouter un point relais
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Trash2 = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  </svg>
);

export default ProfilePage;
