import React, { useState } from 'react';
import { MessageSquare, X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const FloatingMessenger: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    if (isOpen) {
        return (
            <div className={cn(
                "fixed bottom-4 right-4 z-[60] w-80 bg-white rounded-2xl shadow-2xl border-2 border-[#EBE3D5] flex flex-col transition-all duration-300",
                isMinimized ? "h-14" : "h-[450px]"
            )}>
                {/* Header */}
                <div className="flex items-center justify-between p-3 border-b-2 border-[#EBE3D5] bg-[#F2A900]/5 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Avatar className="h-8 w-8 border border-[#F2A900]/20">
                                <AvatarImage src="/images/nouveau_logo.jpeg" />
                                <AvatarFallback>DS</AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#1B5E20] border-2 border-white rounded-full"></div>
                        </div>
                        <span className="text-sm font-black text-[#2D1B08]">Messenger Discover</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-[#5D4037]/40 hover:text-[#F2A900]"
                            onClick={() => setIsMinimized(!isMinimized)}
                        >
                            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-[#5D4037]/40 hover:text-red-500"
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={16} />
                        </Button>
                    </div>
                </div>

                {!isMinimized && (
                    <>
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FFFDFB]">
                            <div className="flex justify-start">
                                <div className="max-w-[80%] bg-[#EBE3D5]/30 rounded-2xl px-3 py-2 text-xs text-[#5D4037] font-medium">
                                    Bonjour ! Comment pouvons-nous vous aider aujourd'hui ? 🇸🇳
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="text-[10px] font-bold text-[#5D4037]/30 uppercase tracking-widest">Aujourd'hui</span>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="p-3 bg-white border-t border-[#EBE3D5]/30">
                            <Link to="/messages" className="w-full">
                                <Button className="w-full bg-[#1B5E20] hover:bg-[#154618] text-white font-black rounded-xl h-10 text-xs uppercase tracking-widest">
                                    Ouvrir les messages
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <Button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-[#F2A900] hover:bg-[#D49400] text-white shadow-xl hover:scale-110 transition-all flex items-center justify-center border-4 border-white hidden lg:flex"
        >
            <MessageSquare size={24} />
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-black">3</span>
        </Button>
    );
};

export default FloatingMessenger;
