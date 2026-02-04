import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Image as ImageIcon,
    X,
    Plus,
    Send,
    Eye,
    ArrowLeft,
    Tag,
    MessageSquare,
    Heart,
    Sparkles,
    MapPin,
    CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES = [
    { id: 'culture', label: 'Culture', color: 'from-orange-500 to-amber-600' },
    { id: 'promotion', label: 'Promotion', color: 'from-emerald-500 to-green-600' },
    { id: 'event', label: 'Événement', color: 'from-blue-500 to-indigo-600' },
    { id: 'story', label: 'Histoire', color: 'from-purple-500 to-pink-600' }
];

const CreatePostPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPreview, setShowPreview] = useState(true);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            // Simulation d'upload
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setImages([...images, ...newImages]);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!content.trim()) {
            toast.error('Veuillez ajouter du texte à votre publication');
            return;
        }

        setIsSubmitting(true);
        // Simulation de délai réseau
        setTimeout(() => {
            toast.success('Publication créée avec succès !');
            setIsSubmitting(false);
            navigate('/establishment/profile');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#FFFDFB] pb-12">
            {/* Header */}
            <div className="bg-white border-b-2 border-[#EBE3D5] sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Link to="/dashboard" className="shrink-0">
                                <Button variant="ghost" size="sm" className="text-[#5D4037] hover:text-[#2D1B08] h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3">
                                    <ArrowLeft className="h-4 w-4 sm:mr-2" />
                                    <span className="hidden sm:inline">Retour</span>
                                </Button>
                            </Link>
                            <div className="min-w-0">
                                <h1 className="text-xl sm:text-2xl font-black text-[#2D1B08] truncate">Créer une publication</h1>
                                <p className="text-[10px] sm:text-sm text-[#5D4037]/70 truncate">Partagez votre univers avec la communauté</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button
                                variant="ghost"
                                onClick={() => setShowPreview(!showPreview)}
                                className="flex-1 sm:flex-initial text-[#5D4037] hover:bg-[#EBE3D5]/50 text-xs sm:text-sm h-8 sm:h-10"
                            >
                                {showPreview ? <Eye className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                                <span className="inline">{showPreview ? 'Masquer' : 'Aperçu'}</span>
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 sm:flex-initial bg-[#F2A900] hover:bg-[#D49400] text-white font-black text-xs sm:text-sm h-8 sm:h-10 px-4 sm:px-6"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
                                        ...
                                    </span>
                                ) : (
                                    <>
                                        <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                                        Publier
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className={`grid gap-8 ${showPreview ? 'lg:grid-cols-2' : 'max-w-2xl mx-auto'}`}>
                    {/* Form Section */}
                    <div className="space-y-6">
                        <Card className="border-2 border-[#EBE3D5] shadow-sm overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-[#6B4226] to-[#2D1B08] text-white py-4">
                                <CardTitle className="text-lg flex items-center">
                                    <Sparkles className="h-5 w-5 mr-2 text-[#F2A900]" />
                                    Contenu de la publication
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                {/* Category Selection */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-black text-[#2D1B08] flex items-center">
                                        <Tag className="h-4 w-4 mr-2 text-[#F2A900]" />
                                        Catégorie (optionnelle)
                                    </Label>
                                    <div className="flex flex-wrap gap-2">
                                        {CATEGORIES.map((cat) => (
                                            <button
                                                key={cat.id}
                                                onClick={() => setSelectedCategory(selectedCategory === cat.label ? '' : cat.label)}
                                                className={`px-4 py-2 rounded-full text-xs font-black transition-all border-2 ${selectedCategory === cat.label
                                                    ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-md transform scale-105`
                                                    : 'bg-white text-[#5D4037] border-[#EBE3D5] hover:border-[#F2A900]'
                                                    }`}
                                            >
                                                {cat.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="space-y-3">
                                    <Label htmlFor="content" className="text-sm font-black text-[#2D1B08]">
                                        Votre message
                                    </Label>
                                    <Textarea
                                        id="content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Que souhaitez-vous partager ? (Histoire, annonce, nouveauté...)"
                                        className="min-h-[150px] border-2 border-[#EBE3D5] focus:border-[#F2A900] text-lg rounded-xl transition-all resize-none p-4"
                                    />
                                    <div className="flex justify-between items-center px-1">
                                        <p className="text-[10px] text-[#5D4037]/50 font-bold uppercase tracking-widest">
                                            {content.length} caractères • Utilisez des #hashtags pour plus de visibilité
                                        </p>
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-4">
                                    <Label className="text-sm font-black text-[#2D1B08] flex items-center">
                                        <ImageIcon className="h-4 w-4 mr-2 text-[#F2A900]" />
                                        Images (jusqu'à 4)
                                    </Label>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {images.map((img, index) => (
                                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#EBE3D5] group shadow-sm">
                                                <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 bg-white/90 p-1.5 rounded-full text-red-500 hover:bg-white shadow-md transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}

                                        {images.length < 4 && (
                                            <label className="aspect-square rounded-xl border-2 border-dashed border-[#EBE3D5] flex flex-col items-center justify-center cursor-pointer hover:border-[#F2A900] hover:bg-[#F2A900]/5 transition-all group">
                                                <Plus className="h-8 w-8 text-[#EBE3D5] group-hover:text-[#F2A900] transform group-hover:rotate-90 transition-all duration-300" />
                                                <span className="text-[10px] font-black text-[#EBE3D5] group-hover:text-[#F2A900] mt-2 uppercase tracking-tighter">Ajouter</span>
                                                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                                            </label>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-[#5D4037]/50 italic">Les images de haute qualité sont plus populaires 📸</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Preview Section */}
                    {showPreview && (
                        <div className="sticky top-28 space-y-4">
                            <h3 className="text-xs font-black text-[#5D4037]/40 uppercase tracking-[0.2em] flex items-center">
                                <CheckCircle2 className="h-3 w-3 mr-2" />
                                Aperçu de votre publication
                            </h3>

                            <div className="bg-white rounded-2xl overflow-hidden border-2 border-[#EBE3D5] shadow-xl max-w-md mx-auto transform hover:scale-[1.02] transition-transform duration-500">
                                {/* Header of post */}
                                <div className="p-4 flex items-center justify-between border-b-2 border-[#EBE3D5]/50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#F2A900] to-[#6B4226] flex items-center justify-center text-white font-black shadow-lg">
                                            {user?.name?.charAt(0) || 'E'}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-[#2D1B08]">{user?.name || 'Votre établissement'}</h4>
                                            <div className="flex items-center text-[10px] text-[#5D4037]/60 font-bold">
                                                <MapPin className="h-3 w-3 mr-1" /> Dakar, Sénégal • À l'instant
                                            </div>
                                        </div>
                                    </div>
                                    {selectedCategory && (
                                        <Badge className="bg-[#F2A900] hover:bg-[#F2A900] text-white font-black text-[9px] uppercase px-2 py-0.5">
                                            {selectedCategory}
                                        </Badge>
                                    )}
                                </div>

                                {/* Content of post */}
                                <div className="p-4">
                                    <p className="text-sm text-[#2D1B08] leading-relaxed whitespace-pre-wrap min-h-[40px]">
                                        {content || "Votre texte apparaîtra ici..."}
                                    </p>
                                </div>

                                {/* Images of post */}
                                {images.length > 0 && (
                                    <div className={`grid gap-0.5 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                        {images.map((img, i) => (
                                            <div key={i} className={`aspect-square bg-[#EBE3D5] ${images.length === 3 && i === 0 ? 'row-span-2' : ''}`}>
                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Footer of post */}
                                <div className="p-4 border-t border-[#EBE3D5]/50 flex items-center justify-between bg-gray-50/50">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1.5 text-xs font-black text-[#5D4037]/40">
                                            <Heart className="h-4 w-4" /> 0
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs font-black text-[#5D4037]/40">
                                            <MessageSquare className="h-4 w-4" /> 0
                                        </span>
                                    </div>
                                    <div className="text-[10px] font-black text-[#F2A900] uppercase tracking-wider">
                                        Échos du Sénégal
                                    </div>
                                </div>
                            </div>

                            <div className="bg-emerald-50 border-2 border-emerald-100 rounded-xl p-4 flex gap-3 text-emerald-800 shadow-sm">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                                <div className="text-xs">
                                    <p className="font-bold mb-1">Visibilité Garantie</p>
                                    <p className="opacity-80">Votre publication apparaîtra instantanément sur votre profil public et dans le fil d'actualité touristique.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatePostPage;
