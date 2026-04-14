import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend: {
    value: number;
    isUp: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, trend }) => {
  return (
    <Card className="group overflow-hidden border-none bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-xl bg-orange-50 group-hover:bg-[#F2A900]/10 transition-colors">
            <Icon size={24} className="text-[#6B4226] group-hover:text-[#F2A900]" />
          </div>
          <div className={cn(
            "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full",
            trend.isUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          )}>
            {trend.isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {trend.value}%
          </div>
        </div>
        <div className="space-y-0.5 md:space-y-1">
          <h3 className="text-xl md:text-3xl font-black text-[#2D1B08] tracking-tighter truncate">{value}</h3>
          <p className="text-[8px] md:text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest md:tracking-[0.2em] truncate">{label}</p>
        </div>
        <div className="mt-4 h-1 w-full bg-gray-50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#6B4226] to-[#F2A900] transition-all duration-1000 delay-300" 
            style={{ width: trend.isUp ? '70%' : '30%' }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
