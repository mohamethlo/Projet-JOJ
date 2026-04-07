import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Flag,
  MessageSquare,
  AlertTriangle,
  Star,
  Send,
  CheckCircle,
  ThumbsUp,
  Reply,
  Shield,
  Lock,
  Calendar,
  Info
} from 'lucide-react';

// Données mockées pour les commentaires
const mockComments = [
  {
    id: '1',
    author: { name: 'Marie Diop', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'Touriste' },
    content: 'Excellente plateforme ! Les guides sont très professionnels et les événements bien organisés.',
    rating: 5,
    category: 'Retour d\'expérience',
    date: '2024-01-15',
    likes: 12,
    replies: 3
  },
  {
    id: '2',
    author: { name: 'Amadou Fall', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'Local' },
    content: 'Suggestion : Ajouter plus d\'événements culturels traditionnels organisés dans les régions reculées.',
    rating: null,
    category: 'Suggestion d\'amélioration',
    date: '2024-01-14',
    likes: 8,
    replies: 1
  },
  {
    id: '3',
    author: { name: 'Fatou Sarr', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'Guide' },
    content: 'Très satisfaite de la plateforme. Les membres sont respectueux et les paiements sont sécurisés.',
    rating: 5,
    category: 'Retour d\'expérience',
    date: '2024-01-13',
    likes: 15,
    replies: 2
  }
];

const SignalerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('report');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [commentsFilter, setCommentsFilter] = useState('all');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  // États pour le formulaire de signalement
  const [reportData, setReportData] = useState({
    type: '',
    targetType: '',
    targetName: '',
    description: '',
    priority: 'Moyenne',
    evidence: '',
    contactMethod: 'email',
    email: '',
    phone: ''
  });

  // États pour le formulaire de commentaire
  const [commentData, setCommentData] = useState({
    content: '',
    category: '',
    rating: null as number | null,
    contactMethod: 'email',
    contactInfo: ''
  });

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setCommentData({
      content: '',
      category: '',
      rating: null,
      contactMethod: 'email',
      contactInfo: ''
    });

    // Afficher un message de confirmation
    alert('Votre avis a été soumis et sera publié après approbation par notre équipe de modération.');
  };

  const handleInputChange = (field: string, value: string) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const handleCommentInputChange = (field: string, value: string | number | null) => {
    setCommentData(prev => ({ ...prev, [field]: value }));
  };

  const handleLikeComment = (commentId: string) => {
    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const filteredComments = useMemo(() => {
    return mockComments.filter(comment => {
      if (commentsFilter === 'all') return true;
      if (commentsFilter === 'with-rating') return comment.rating !== null;
      if (commentsFilter === 'suggestions') return comment.category === 'Suggestion d\'amélioration';
      if (commentsFilter === 'experiences') return comment.category === 'Retour d\'expérience';
      return true;
    });
  }, [commentsFilter]);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#FFFDFB] font-sans flex items-center justify-center p-4">
        <Card className="max-w-xl w-full mx-auto border-2 border-[#EBE3D5] rounded-[2rem] shadow-xl overflow-hidden bg-white">
          <CardContent className="p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-[#1B5E20]/10 rounded-full flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 bg-[#1B5E20]/20 rounded-full animate-ping opacity-75"></div>
              <CheckCircle className="h-12 w-12 text-[#1B5E20] relative z-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D1B08] uppercase tracking-tighter mb-4">
              Signalement Transmis
            </h2>
            <p className="text-[#5D4037]/80 mb-8 font-medium leading-relaxed max-w-sm">
              Votre signalement a été envoyé à notre équipe de modération. Nous l'examinerons avec la plus grande attention.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setReportData({
                  type: '', targetType: '', targetName: '', description: '',
                  priority: 'Moyenne', evidence: '', contactMethod: 'email', email: '', phone: ''
                });
              }}
              className="w-full sm:w-auto px-8 bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black uppercase text-xs tracking-tighter h-14 rounded-xl transition-all shadow-md hover:shadow-xl group"
            >
              <Flag className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Nouveau Signalement
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDFB] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-10 sm:mb-12 text-center max-w-2xl mx-auto px-2">
          <Badge className="bg-[#F2A900]/10 text-[#F2A900] border-none font-black uppercase text-[10px] tracking-widest px-4 py-2 mb-4">
            Espace Communautaire
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-[#2D1B08] uppercase tracking-tighter">
            Signaler & <span className="text-[#F2A900]">S'exprimer</span>
          </h1>
          <p className="text-[#5D4037]/80 text-sm sm:text-base font-medium leading-relaxed">
            Aidez-nous à maintenir un environnement sain. Signalez les comportements inappropriés ou partagez vos avis pour améliorer la plateforme.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8 sm:space-y-10">
          <div className="flex justify-center px-4">
            <div className="bg-white p-1.5 rounded-2xl border-2 border-[#EBE3D5] inline-flex flex-wrap sm:flex-nowrap gap-2 justify-center shadow-sm w-full sm:w-auto overflow-x-auto">
              <TabsList className="bg-transparent h-auto p-0 flex flex-col sm:flex-row w-full sm:w-auto gap-2">
                <TabsTrigger
                  value="report"
                  className="w-full sm:w-auto data-[state=active]:bg-[#F2A900] data-[state=active]:text-white text-[#5D4037] font-black uppercase tracking-tighter text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-none data-[state=active]:shadow-md"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Signaler un problème
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="w-full sm:w-auto data-[state=active]:bg-[#2D1B08] data-[state=active]:text-white text-[#5D4037] font-black uppercase tracking-tighter text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-none data-[state=active]:shadow-md"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Avis et Suggestions
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="report" className="animate-in fade-in duration-500 max-w-4xl mx-auto">
            <Card className="border-2 border-[#EBE3D5] bg-white rounded-3xl overflow-hidden shadow-sm">
              <div className="bg-[#E11D48]/5 p-6 sm:p-8 border-b border-[#E11D48]/10 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-12 h-12 bg-[#E11D48]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-[#E11D48]" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#2D1B08] uppercase tracking-tighter mb-1">
                    Signaler un abus
                  </h2>
                  <p className="text-[#5D4037]/70 text-sm font-medium">Fournissez le contexte pour aider notre équipe à intervenir efficacement.</p>
                </div>
              </div>

              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleReportSubmit} className="space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-xs font-black text-[#5D4037] uppercase tracking-wider">Type de signalement</Label>
                      <Select value={reportData.type} onValueChange={(value) => handleInputChange('type', value)}>
                        <SelectTrigger className="bg-gray-50/50 border-2 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl font-medium text-[#2D1B08] h-12">
                          <SelectValue placeholder="Sélectionner la nature du problème" />
                        </SelectTrigger>
                        <SelectContent className="border-[#EBE3D5] rounded-xl overflow-hidden">
                          <SelectItem value="inappropriate" className="font-medium text-[#2D1B08]">Contenu inapproprié</SelectItem>
                          <SelectItem value="spam" className="font-medium text-[#2D1B08]">Spam</SelectItem>
                          <SelectItem value="harassment" className="font-medium text-[#2D1B08]">Harcèlement</SelectItem>
                          <SelectItem value="fake" className="font-medium text-[#2D1B08]">Faux profil</SelectItem>
                          <SelectItem value="other" className="font-medium text-[#2D1B08]">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority" className="text-xs font-black text-[#5D4037] uppercase tracking-wider">Priorité (estimée)</Label>
                      <Select value={reportData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                        <SelectTrigger className="bg-gray-50/50 border-2 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl font-medium text-[#2D1B08] h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-[#EBE3D5] rounded-xl overflow-hidden">
                          <SelectItem value="Faible" className="font-medium text-[#2D1B08]">Faible</SelectItem>
                          <SelectItem value="Moyenne" className="font-medium text-[#2D1B08]">Moyenne</SelectItem>
                          <SelectItem value="Élevée" className="font-medium text-[#2D1B08]">Élevée</SelectItem>
                          <SelectItem value="Urgente" className="font-bold text-[#E11D48]">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-xs font-black text-[#5D4037] uppercase tracking-wider">Description détaillée</Label>
                    <Textarea
                      id="description"
                      placeholder="Expliquez précisemment la situation..."
                      value={reportData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="bg-gray-50/50 border-2 border-[#EBE3D5] focus-visible:ring-[#F2A900] rounded-xl font-medium text-[#2D1B08] p-4 resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="evidence" className="text-xs font-black text-[#5D4037] uppercase tracking-wider flex items-center gap-1">
                      Preuves / Liens <span className="text-gray-400 font-medium normal-case">(Optionnel)</span>
                    </Label>
                    <Textarea
                      id="evidence"
                      placeholder="Fournissez des liens URL ou d'autres élements de preuve..."
                      value={reportData.evidence}
                      onChange={(e) => handleInputChange('evidence', e.target.value)}
                      rows={2}
                      className="bg-gray-50/50 border-2 border-[#EBE3D5] focus-visible:ring-[#F2A900] rounded-xl font-medium text-[#2D1B08] p-4 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-2xl border border-dashed border-[#EBE3D5]">
                    <div className="col-span-1 md:col-span-2 flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-[#F2A900]" />
                      <span className="text-xs font-black text-[#2D1B08] uppercase tracking-wider">Vos coordonnées (Confidentiel)</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] font-black text-[#5D4037] uppercase tracking-wider">Email de contact</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={reportData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-white border-2 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl font-medium text-[#2D1B08] h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[10px] font-black text-[#5D4037] uppercase tracking-wider flex items-center gap-1">
                        Téléphone <span className="text-gray-400 font-medium normal-case">(Optionnel)</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+221 XX XXX XX XX"
                        value={reportData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-white border-2 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl font-medium text-[#2D1B08] h-12"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !reportData.type || !reportData.description || !reportData.email}
                      className="w-full sm:w-auto px-8 bg-[#E11D48] hover:bg-[#E11D48]/90 text-white font-black uppercase text-xs tracking-tighter h-14 rounded-xl transition-all shadow-md hover:shadow-xl disabled:opacity-50 disabled:hover:shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Transmission...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Soumettre le signalement
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments" className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {/* Colonne Liste des commentaires */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-2 border-[#EBE3D5] bg-white rounded-3xl overflow-hidden shadow-sm">
                  <div className="bg-[#FFFDFB] p-5 sm:p-6 border-b border-[#EBE3D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#F2A900]/10 p-2 rounded-xl text-[#F2A900]">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-black text-[#2D1B08] uppercase tracking-tighter">
                        Avis de la communauté
                      </h2>
                    </div>
                    <Badge className="bg-[#EBE3D5]/50 text-[#5D4037] border-none font-bold">
                       {filteredComments.length} Avis
                    </Badge>
                  </div>
                  
                  <CardContent className="p-0">
                    {filteredComments.length > 0 ? (
                      <div className="divide-y divide-[#EBE3D5]/50">
                        {filteredComments.map((comment) => (
                          <div key={comment.id} className="p-5 sm:p-6 transition-colors hover:bg-gray-50/30">
                            <div className="flex items-start gap-4">
                              <img
                                src={comment.author.avatar}
                                alt={comment.author.name}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#EBE3D5]"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                  <div className="flex items-center flex-wrap gap-2">
                                    <span className="font-bold text-[#2D1B08] text-sm sm:text-base">{comment.author.name}</span>
                                    <Badge variant="outline" className="text-[9px] uppercase tracking-widest font-black text-[#5D4037] border-[#EBE3D5]">
                                      {comment.author.role}
                                    </Badge>
                                    {comment.rating && (
                                      <div className="flex items-center bg-[#F2A900]/10 px-2 py-0.5 rounded-lg border border-[#F2A900]/20 ml-1">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`h-3 w-3 ${i < comment.rating! ? 'text-[#F2A900] fill-current' : 'text-[#EBE3D5]'}`}
                                          />
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/50 flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(comment.date).toLocaleDateString('fr-FR')}
                                  </span>
                                </div>
                                <p className="text-sm font-medium text-[#5D4037]/90 italic leading-relaxed mb-4">
                                  "{comment.content}"
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={() => handleLikeComment(comment.id)}
                                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-black uppercase tracking-wider ${
                                        likedComments.has(comment.id)
                                          ? 'bg-[#F2A900]/10 text-[#F2A900] border border-[#F2A900]/20'
                                          : 'hover:bg-gray-100 text-[#5D4037] border border-transparent'
                                      }`}
                                    >
                                      <ThumbsUp className="h-3.5 w-3.5" />
                                      {comment.likes + (likedComments.has(comment.id) ? 1 : 0)} Utile
                                    </button>
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-[#5D4037] transition-colors text-xs font-black uppercase tracking-wider">
                                      <Reply className="h-3.5 w-3.5" />
                                      {comment.replies} Rép.
                                    </button>
                                  </div>
                                  <Badge className="bg-[#EBE3D5] text-[#5D4037] border-none font-bold text-[9px] uppercase tracking-wider hidden sm:inline-flex">
                                    {comment.category}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-12 text-center text-[#5D4037]/60 font-medium">
                        <MessageSquare className="w-12 h-12 text-[#EBE3D5] mx-auto mb-3" />
                         Aucun avis ne correspond à vos filtres.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Colonne Filtres et Formulaire */}
              <div className="space-y-6">
                <Card className="border-2 border-[#EBE3D5] bg-white rounded-3xl overflow-hidden shadow-sm">
                  <div className="bg-[#FFFDFB] px-5 py-4 border-b border-[#EBE3D5]">
                    <h3 className="text-sm font-black text-[#2D1B08] uppercase tracking-tighter flex items-center">
                       <Flag className="w-4 h-4 mr-2 text-[#F2A900]" />
                       Filtrer les avis
                    </h3>
                  </div>
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col gap-2">
                      <Button
                        variant={commentsFilter === 'all' ? 'default' : 'ghost'}
                        className={`w-full justify-between h-10 px-4 text-xs font-bold uppercase tracking-wider rounded-xl ${
                          commentsFilter === 'all' ? 'bg-[#2D1B08] text-white hover:bg-[#2D1B08]/90' : 'text-[#5D4037] hover:bg-gray-100'
                        }`}
                        onClick={() => setCommentsFilter('all')}
                      >
                        <span>Tous les avis</span>
                        <Badge className={`${commentsFilter === 'all' ? 'bg-white/20 text-white' : 'bg-[#EBE3D5] text-[#5D4037]'} border-none font-black`}>{mockComments.length}</Badge>
                      </Button>
                      <Button
                        variant={commentsFilter === 'with-rating' ? 'default' : 'ghost'}
                        className={`w-full justify-between h-10 px-4 text-xs font-bold uppercase tracking-wider rounded-xl ${
                          commentsFilter === 'with-rating' ? 'bg-[#2D1B08] text-white hover:bg-[#2D1B08]/90' : 'text-[#5D4037] hover:bg-gray-100'
                        }`}
                        onClick={() => setCommentsFilter('with-rating')}
                      >
                        <span>Avec notes</span>
                        <Badge className={`${commentsFilter === 'with-rating' ? 'bg-white/20 text-white' : 'bg-[#EBE3D5] text-[#5D4037]'} border-none font-black`}>{mockComments.filter(c => c.rating !== null).length}</Badge>
                      </Button>
                      <Button
                        variant={commentsFilter === 'suggestions' ? 'default' : 'ghost'}
                        className={`w-full justify-between h-10 px-4 text-xs font-bold uppercase tracking-wider rounded-xl ${
                          commentsFilter === 'suggestions' ? 'bg-[#2D1B08] text-white hover:bg-[#2D1B08]/90' : 'text-[#5D4037] hover:bg-gray-100'
                        }`}
                        onClick={() => setCommentsFilter('suggestions')}
                      >
                        <span>Suggestions</span>
                        <Badge className={`${commentsFilter === 'suggestions' ? 'bg-white/20 text-white' : 'bg-[#EBE3D5] text-[#5D4037]'} border-none font-black`}>{mockComments.filter(c => c.category === 'Suggestion d\'amélioration').length}</Badge>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#EBE3D5] bg-white rounded-3xl overflow-hidden shadow-sm">
                  <div className="bg-[#1B5E20]/5 px-5 py-4 border-b border-[#1B5E20]/10">
                    <h3 className="text-sm font-black text-[#1B5E20] uppercase tracking-tighter flex items-center">
                       <Star className="w-4 h-4 mr-2 fill-current" />
                       Soumettre un avis
                    </h3>
                  </div>
                  <CardContent className="p-5 sm:p-6">
                    <form onSubmit={handleCommentSubmit} className="space-y-5 flex flex-col">
                      <div className="space-y-2">
                        <Label htmlFor="comment-category" className="text-xs font-black text-[#5D4037] uppercase tracking-wider">Type d'avis</Label>
                        <Select value={commentData.category} onValueChange={(value) => handleCommentInputChange('category', value)}>
                          <SelectTrigger className="bg-gray-50/50 border-2 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl font-medium text-[#2D1B08] h-12">
                            <SelectValue placeholder="Sélectionner..." />
                          </SelectTrigger>
                          <SelectContent className="border-[#EBE3D5] rounded-xl">
                            <SelectItem value="Retour d'expérience" className="font-medium">Retour d'expérience</SelectItem>
                            <SelectItem value="Suggestion d'amélioration" className="font-medium">Suggestion d'amélioration</SelectItem>
                            <SelectItem value="Question" className="font-medium">Question globale</SelectItem>
                            <SelectItem value="Autre" className="font-medium">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comment-rating" className="text-xs font-black text-[#5D4037] uppercase tracking-wider flex items-center justify-between">
                          Note / Appréciation
                          <span className="text-[10px] text-gray-400 normal-case">(Optionnel)</span>
                        </Label>
                        <Select
                          value={commentData.rating?.toString() || ''}
                          onValueChange={(value) => handleCommentInputChange('rating', value ? parseInt(value) : null)}
                        >
                          <SelectTrigger className="bg-gray-50/50 border-2 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl font-medium text-[#2D1B08] h-12">
                            <SelectValue placeholder="Attribuer une note..." />
                          </SelectTrigger>
                          <SelectContent className="border-[#EBE3D5] rounded-xl">
                            <SelectItem value="5" className="font-medium">⭐⭐⭐⭐⭐ (Excellent)</SelectItem>
                            <SelectItem value="4" className="font-medium">⭐⭐⭐⭐ (Très bien)</SelectItem>
                            <SelectItem value="3" className="font-medium">⭐⭐⭐ (Correct)</SelectItem>
                            <SelectItem value="2" className="font-medium">⭐⭐ (Décevant)</SelectItem>
                            <SelectItem value="1" className="font-medium">⭐ (Médiocre)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 flex-grow">
                        <Label htmlFor="comment-content" className="text-xs font-black text-[#5D4037] uppercase tracking-wider">Votre message</Label>
                        <Textarea
                          id="comment-content"
                          placeholder="Partagez votre expérience en détail..."
                          value={commentData.content}
                          onChange={(e) => handleCommentInputChange('content', e.target.value)}
                          rows={4}
                          className="bg-gray-50/50 border-2 border-[#EBE3D5] focus-visible:ring-[#F2A900] rounded-xl font-medium text-[#2D1B08] p-4 resize-none h-full"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting || !commentData.content || !commentData.category}
                        className="w-full bg-[#1B5E20] hover:bg-[#1B5E20]/90 text-white font-black uppercase text-xs tracking-tighter h-12 rounded-xl transition-all shadow-md mt-4"
                      >
                        {isSubmitting ? 'Publication en cours...' : 'Soumettre à modération'}
                      </Button>
                      
                       <p className="text-center text-[10px] text-gray-400 mt-2 font-medium px-2">
                          Votre avis sera vérifié par notre équipe avant d'être visible publiquement.
                       </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Section Règles et Politiques */}
        <div className="mt-12 sm:mt-16 bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#EBE3D5] shadow-sm max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-[#EBE3D5]/50">
             <Info className="w-6 h-6 text-[#F2A900]" />
             <h2 className="text-xl sm:text-2xl font-black text-[#2D1B08] uppercase tracking-tighter">Charte et Engagements</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-[#5D4037]/80">
            <div className="space-y-6">
              <div>
                <h3 className="font-black text-[#2D1B08] text-sm uppercase tracking-wider mb-2 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-gray-400" />
                  Confidentialité stricte
                </h3>
                <p className="leading-relaxed">
                  Tous vos signalements sont traités de manière <strong className="text-[#2D1B08]">strictement confidentielle</strong>.
                  Vos informations personnelles (email, téléphone, identité) ne seront jamais partagées avec les profils signalés ni vendues à des tiers.
                </p>
              </div>

              <div>
                <h3 className="font-black text-[#2D1B08] text-sm uppercase tracking-wider mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-blue-400" />
                  Traitement garanti
                </h3>
                <p className="leading-relaxed">
                  Chaque signalement est examiné minutieusement par notre équipe de modération dans un délai de <strong className="text-[#2D1B08]">24h à 48h ouvrées</strong>.
                  Nous intervenons rapidement en cas de risque avéré.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-black text-[#2D1B08] text-sm uppercase tracking-wider mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Valeurs des Commentaires
                </h3>
                <p className="leading-relaxed">
                  Les avis sont un espace d'entraide. Ils sont soumis à modération humaine a priori.
                  Seuls les commentaires fondés, courtois et apportant une valeur ajoutée à la communauté sont validés.
                </p>
              </div>

              <div>
                <h3 className="font-black text-[#2D1B08] text-sm uppercase tracking-wider mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                  Tolérance Zéro
                </h3>
                <p className="leading-relaxed">
                  Sont strictement prohibés et entraînent des sanctions : le spam, le harcèlement, les propos haineux, discriminatoires, les fausses informations ou le chantage aux fausses évaluations.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#EBE3D5]/50 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              En soumettant un formulaire, vous adhérez pleinement à notre{" "}
              <a href="#" className="text-[#F2A900] hover:underline">Politique de sécurité et CGU</a>.<br/>
              Support dédié : <a href="mailto:support@discoversenegal.sn" className="text-[#2D1B08] hover:underline border-b border-gray-300">support@discoversenegal.sn</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalerPage;
