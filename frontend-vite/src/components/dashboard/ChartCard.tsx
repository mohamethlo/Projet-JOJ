import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children }) => {
  return (
    <Card className="rounded-2xl border-none bg-white shadow-sm hover:shadow-md transition-all h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-black text-[#2D1B08] uppercase tracking-widest flex items-center gap-2">
          <div className="w-1 h-4 bg-[#F2A900] rounded-full" />
          {title}
        </CardTitle>
        {subtitle && <p className="text-[10px] text-[#5D4037]/50 font-bold uppercase tracking-widest">{subtitle}</p>}
      </CardHeader>
      <CardContent className="flex-1 min-h-0 pt-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
