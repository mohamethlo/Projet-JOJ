import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Star,
  ArrowLeft,
  User,
  Calendar,
  Search,
  Filter,
  MessageSquare,
  ThumbsUp,
  MoreVertical,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import StatCard from '@/components/dashboard/StatCard';
import { toast } from 'sonner';

const ReviewsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const [reviews, setReviews] = useState([
    {
      id: '1',
      guestName: 'Jean Dupont',
      avatar: 'JD',
      rating: 5,
      date: '15 Avril 2024',
      comment: 'Excellent séjour ! L\'hôtel est magnifique, le personnel est très accueillant et les chambres sont très confortables. Je recommande vivement !',
      stay: 'Chambre Double - 3 nuits',
      status: 'verified',
      metrics: { propreté: 5, accueil: 5, emplacement: 5, prix: 4 },
      replied: true,
      reply: 'Merci beaucoup Jean ! C\'était un plaisir de vous accueillir.'
    },
    {
      id: '2',
      guestName: 'Maria Garcia',
      avatar: 'MG',
      rating: 4,
      date: '12 Avril 2024',
      comment: 'Très bon établissement avec un excellent rapport qualité-prix. Le petit-déjeuner était délicieux.',
      stay: 'Suite Deluxe - 2 nuits',
      status: 'verified',
      metrics: { propreté: 4, accueil: 5, emplacement: 4, prix: 5 },
      replied: false
    },
    {
      id: '3',
      guestName: 'Ahmed Diallo',
      avatar: 'AD',
      rating: 5,
      date: '10 Avril 2024',
      comment: 'La Teranga à son meilleur ! Accueil chaleureux, service impeccable. Je reviendrai certainement.',
      stay: 'Réservation Table',
      status: 'verified',
      metrics: { propreté: 5, accueil: 5, emplacement: 5, prix: 4 },
      replied: false
    },
    {
      id: '4',
      guestName: 'Sophie Martin',
      avatar: 'SM',
      rating: 3,
      date: '8 Avril 2024',
      comment: 'Bel établissement, bien situé. Seul petit bémol : la connexion WiFi un peu lente et le bruit le matin.',
      stay: 'Chambre Simple - 2 nuits',
      status: 'new',
      metrics: { propreté: 4, accueil: 3, emplacement: 5, prix: 3 },
      replied: false
    }
  ]);

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  
  const handleReply = (id: string) => {
    toast.success('Réponse envoyée avec succès !');
    setReviews(reviews.map(r => r.id === id ? { ...r, replied: true, reply: replyText } : r));
    setReplyingTo(null);
    setReplyText('');
  };

  const filteredReviews = reviews.filter(r => {
    const matchesSearch = r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         r.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 'all' || r.rating === filterRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* 🏛️ Premium Header */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2D1B08] via-[#5D4037] to-[#2D1B08] p-8 md:p-14 text-white shadow-2xl mb-12">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F2A900]/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 rounded-full h-8 px-3">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Retour
                  </Button>
                </Link>
                <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[10px] px-3 border-none">
                  PATRIMOINE & RÉPUTATION
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85]">
                L'EXPÉRIENCE <br /> <span className="text-[#F2A900]">CLIENT .</span>
              </h1>
              <p className="text-white/60 font-medium italic text-sm md:text-lg max-w-xl">
                Analysez les retours, répondez à votre communauté et cultivez l'excellence de votre établissement.
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="text-5xl font-black text-[#F2A900] leading-none">{averageRating.toFixed(1)}</div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={cn(i < Math.round(averageRating) ? "fill-[#F2A900] text-[#F2A900]" : "text-white/20")} />
                ))}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Moyenne Globale</div>
            </div>
          </div>
        </div>

        {/* 📊 Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={Award} value="92%" label="Satisfaction" trend={{ value: 4, isUp: true }} />
          <StatCard icon={TrendingUp} value="4.8/5" label="Qualité Service" trend={{ value: 2, isUp: true }} />
          <StatCard icon={MessageSquare} value={reviews.length.toString()} label="Total Avis" trend={{ value: 12, isUp: true }} />
          <StatCard icon={Sparkles} value="85%" label="Sentiment Positif" trend={{ value: 5, isUp: true }} />
        </div>

        {/* 🔍 Controls & Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Distribution Card */}
          <Card className="lg:col-span-4 rounded-[2.5rem] border-none bg-white shadow-sm overflow-hidden p-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
              <Filter size={14} className="text-[#F2A900]" /> Répartition
            </h3>
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = (count / reviews.length) * 100;
                return (
                  <div key={rating} className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#2D1B08]">{rating}</span>
                        <Star size={10} className="fill-[#F2A900] text-[#F2A900]" />
                      </div>
                      <span className="text-gray-400">{count} Avis</span>
                    </div>
                    <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#2D1B08] to-[#F2A900] rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Search & Filter Controls */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="rounded-[2rem] border-none bg-white shadow-sm overflow-hidden p-3">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input 
                    placeholder="Chercher dans les commentaires..." 
                    className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-14 rounded-2xl border-gray-100 font-bold uppercase text-[10px] tracking-widest px-6 text-gray-500">
                      Note: {filterRating === 'all' ? 'Toutes' : `${filterRating} Étoiles`} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-xl border-none shadow-2xl p-2 w-48">
                    <DropdownMenuItem onClick={() => setFilterRating('all')} className="rounded-lg font-bold text-[10px] uppercase p-3">Toutes les notes</DropdownMenuItem>
                    {[5, 4, 3, 2, 1].map(n => (
                      <DropdownMenuItem key={n} onClick={() => setFilterRating(n)} className="rounded-lg font-bold text-[10px] uppercase p-3">
                        {n} Étoiles
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>

            {/* 📋 Reviews List */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="group rounded-[2.5rem] border-none bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Left: User Info */}
                      <div className="md:w-48 shrink-0 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#2D1B08] to-[#5D4037] flex items-center justify-center text-white font-black text-xl shadow-lg">
                            {review.avatar}
                          </div>
                          <div>
                            <h4 className="font-black text-[#2D1B08] uppercase tracking-tighter leading-tight">{review.guestName}</h4>
                            <div className="flex items-center gap-1.5 mt-1">
                              {review.status === 'verified' ? (
                                <Badge className="bg-emerald-50 text-emerald-600 border-none rounded-full px-2 py-0 text-[8px] font-black uppercase tracking-widest">
                                  <CheckCircle2 size={10} className="mr-1" /> Vérifié
                                </Badge>
                              ) : (
                                <Badge className="bg-blue-50 text-blue-600 border-none rounded-full px-2 py-0 text-[8px] font-black uppercase tracking-widest">Nouveau</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3 pt-4 border-t border-gray-50">
                          {Object.entries(review.metrics).map(([key, val]) => (
                            <div key={key} className="space-y-1">
                              <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-gray-400">
                                <span>{key}</span>
                                <span>{val}/5</span>
                              </div>
                              <div className="h-1 bg-gray-50 rounded-full overflow-hidden">
                                <div className="h-full bg-[#F2A900] rounded-full" style={{ width: `${(val / 5) * 100}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Content */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={18} className={cn(i < review.rating ? "fill-[#F2A900] text-[#F2A900]" : "text-gray-200")} />
                            ))}
                          </div>
                          <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <Calendar size={12} className="mr-2" /> {review.date}
                          </div>
                        </div>

                        <div className="bg-gray-50/50 rounded-2xl p-6 italic font-medium text-[#2D1B08]/80 relative">
                           <span className="absolute top-2 left-3 text-4xl text-[#F2A900]/20 font-serif leading-none">“</span>
                           {review.comment}
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <div className="text-[10px] font-bold text-gray-400 italic">
                             Expérience : <span className="text-[#2D1B08]">{review.stay}</span>
                          </div>
                          <div className="flex gap-2">
                             <Button variant="ghost" size="sm" className="h-10 rounded-xl px-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#2D1B08]">
                               <ThumbsUp size={14} className="mr-2" /> Utile
                             </Button>
                             {!review.replied && replyingTo !== review.id && (
                               <Button 
                                 onClick={() => setReplyingTo(review.id)}
                                 className="h-10 rounded-xl px-6 bg-[#2D1B08] text-white text-[10px] font-black uppercase tracking-widest shadow-lg"
                               >
                                 <MessageSquare size={14} className="mr-2" /> Répondre
                               </Button>
                             )}
                          </div>
                        </div>

                        {/* Reply Section */}
                        {review.replied && (
                          <div className="mt-6 bg-[#F2A900]/5 border-l-4 border-[#F2A900] rounded-r-2xl p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-6 w-6 rounded bg-[#2D1B08] flex items-center justify-center text-[8px] text-white font-black">DS</div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#2D1B08]">Votre Réponse</span>
                            </div>
                            <p className="text-sm font-medium text-[#2D1B08]/70 leading-relaxed italic">
                              "{review.reply}"
                            </p>
                          </div>
                        )}

                        {replyingTo === review.id && (
                          <div className="mt-6 space-y-4 p-6 bg-gray-50 rounded-2xl animate-in slide-in-from-top duration-500">
                             <Label className="text-[10px] font-black uppercase tracking-widest text-[#2D1B08]">Votre réponse à {review.guestName}</Label>
                             <Textarea 
                               value={replyText}
                               onChange={(e) => setReplyText(e.target.value)}
                               placeholder="Remerciez votre client ou apportez des précisions..." 
                               className="rounded-xl border-none bg-white shadow-inner font-medium italic min-h-[100px]"
                             />
                             <div className="flex justify-end gap-2">
                               <Button variant="ghost" onClick={() => setReplyingTo(null)} className="h-10 rounded-xl text-[10px] font-black uppercase">Annuler</Button>
                               <Button onClick={() => handleReply(review.id)} className="h-10 rounded-xl bg-[#F2A900] text-[#2D1B08] px-8 text-[10px] font-black uppercase">Envoyer la réponse</Button>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;

