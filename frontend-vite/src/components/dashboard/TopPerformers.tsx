import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Heart, Eye, TrendingUp } from 'lucide-react';

const TOP_ARTISANS = [
  { id: 1, name: 'Keur Birago', category: 'Tapis Traditionnels', metric: '1.2k likes', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Keur' },
  { id: 2, name: 'Atelier Touba', category: 'Sculpture Bois', metric: '980 likes', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Touba' },
];

const TOP_POSTS = [
  { id: 1, title: 'Renaissance Africaine', viewCount: '5.4k vues', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=200' },
  { id: 2, title: 'Les Plages de Ngor', viewCount: '3.2k vues', image: 'https://images.unsplash.com/photo-1590441656222-38647acae4c9?auto=format&fit=crop&q=80&w=200' },
];

const TOP_GUIDES = [
  { id: 1, name: 'Saliou Ndiaye', rating: '4.9/5 stars', tours: '156 visites', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saliou' },
  { id: 2, name: 'Fatou Binetou', rating: '4.8/5 stars', tours: '124 visites', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou' },
];

const TopPerformers: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Top Artisans */}
      <Card className="rounded-2xl border-none bg-white shadow-sm hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-[10px] font-black text-[#2D1B08] uppercase tracking-[0.2em] flex items-center gap-2">
            <TrendingUp size={14} className="text-[#F2A900]" />
            Artisans les plus actifs
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          {TOP_ARTISANS.map((artisan) => (
            <div key={artisan.id} className="flex items-center gap-4 group">
              <Avatar className="h-10 w-10 border-2 border-[#EBE3D5] group-hover:border-[#F2A900] transition-colors rounded-xl">
                <AvatarImage src={artisan.avatar} />
                <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] font-black text-[#2D1B08] uppercase truncate">{artisan.name}</h4>
                <p className="text-[9px] text-[#5D4037]/50 font-bold uppercase tracking-widest">{artisan.category}</p>
                <div className="flex items-center gap-1.5 mt-1 text-[9px] text-emerald-600 font-bold">
                    <Heart size={10} className="fill-emerald-600" />
                    {artisan.metric}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Posts */}
      <Card className="rounded-2xl border-none bg-white shadow-sm hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-[10px] font-black text-[#2D1B08] uppercase tracking-[0.2em] flex items-center gap-2">
            <Eye size={14} className="text-[#F2A900]" />
            Publications populaires
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          {TOP_POSTS.map((post) => (
            <div key={post.id} className="flex items-center gap-4 group">
              <div className="h-10 w-10 rounded-xl overflow-hidden border-2 border-[#EBE3D5] group-hover:border-[#F2A900] transition-colors shrink-0">
                <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] font-black text-[#2D1B08] uppercase truncate">{post.title}</h4>
                <div className="flex items-center gap-1.5 mt-1 text-[9px] text-blue-600 font-bold uppercase tracking-widest">
                    <div className="w-1 h-1 rounded-full bg-blue-600 animate-pulse" />
                    {post.viewCount}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Guides */}
      <Card className="rounded-2xl border-none bg-white shadow-sm hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-[10px] font-black text-[#2D1B08] uppercase tracking-[0.2em] flex items-center gap-2">
            <Star size={14} className="text-[#F2A900]" />
            Guides les plus demandés
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          {TOP_GUIDES.map((guide) => (
            <div key={guide.id} className="flex items-center gap-4 group">
              <Avatar className="h-10 w-10 border-2 border-[#EBE3D5] group-hover:border-[#F2A900] transition-colors rounded-xl">
                <AvatarImage src={guide.avatar} />
                <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] font-black text-[#2D1B08] uppercase truncate">{guide.name}</h4>
                <p className="text-[9px] text-[#5D4037]/50 font-bold uppercase tracking-widest">{guide.rating}</p>
                <div className="flex items-center gap-1.5 mt-1 text-[9px] text-[#F2A900] font-bold uppercase tracking-widest">
                    {guide.tours}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TopPerformers;
