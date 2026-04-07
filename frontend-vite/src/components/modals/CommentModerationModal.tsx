import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  MessageSquare,
  User,
  Calendar,
  CheckCircle,
  X,
  Download,
  Flag,
  Shield,
  Ban,
  UserCheck,
  ThumbsUp,
  MessageCircle,
  Trash2
} from 'lucide-react';

interface CommentData {
  id: string;
  content: string;
  author: string;
  authorRole: string;
  authorStatus: string;
  targetType: string;
  targetName: string;
  date: string;
  status: string;
  reports?: number;
  likes?: number;
  replies?: number;
}

interface CommentModerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  comment: CommentData;
  onApprove?: (commentId: string, action: string, comment?: string) => void;
  onReject?: (commentId: string, reason: string) => void;
  onDelete?: (commentId: string, reason: string) => void;
  onBanUser?: (userId: string, reason: string, duration: string) => void;
  onWarnUser?: (userId: string, reason: string) => void;
}

const CommentModerationModal: React.FC<CommentModerationModalProps> = ({
  isOpen,
  onClose,
  comment,
  onApprove,
  onReject,
  onDelete,
  onBanUser,
  onWarnUser
}) => {
  const [action, setAction] = useState('');
  const [moderatorComment, setModeratorComment] = useState('');
  const [reason, setReason] = useState('');
  const [banDuration, setBanDuration] = useState('7');
  const [showActionForm, setShowActionForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente':
        return 'bg-[#F2A900]/10 text-[#F2A900]';
      case 'Approuvé':
        return 'bg-[#1B5E20]/10 text-[#1B5E20]';
      case 'Rejeté':
        return 'bg-[#E11D48]/10 text-[#E11D48]';
      case 'Supprimé':
        return 'bg-[#EBE3D5] text-[#5D4037]';
      default:
        return 'bg-[#EBE3D5] text-[#5D4037]';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'guide':
        return 'bg-[#F2A900]/10 text-[#F2A900]';
      case 'organizer':
        return 'bg-blue-100 text-blue-700';
      case 'tourist':
        return 'bg-green-100 text-green-700';
      case 'local':
        return 'bg-[#EBE3D5]/50 text-[#5D4037]';
      default:
        return 'bg-[#EBE3D5]/50 text-[#5D4037]';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-3 w-3" />;
      case 'guide':
        return <User className="h-3 w-3" />;
      case 'organizer':
        return <Calendar className="h-3 w-3" />;
      case 'tourist':
        return <User className="h-3 w-3" />;
      case 'local':
        return <User className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  const handleAction = () => {
    if (!action) return;

    switch (action) {
      case 'approve':
        onApprove?.(comment.id, 'approved', moderatorComment);
        break;
      case 'reject':
        onReject?.(comment.id, reason);
        break;
      case 'delete':
        onDelete?.(comment.id, reason);
        break;
      case 'ban':
        onBanUser?.(comment.author, reason, banDuration);
        break;
      case 'warn':
        onWarnUser?.(comment.author, reason);
        break;
    }

    setShowActionForm(false);
    setAction('');
    setModeratorComment('');
    setReason('');
    onClose();
  };

  const handleDownload = () => {
    const commentData = `
Commentaire #${comment.id}
Auteur: ${comment.author} (${comment.authorRole})
Date: ${comment.date}
Statut: ${comment.status}
Cible: ${comment.targetType} - ${comment.targetName}

Contenu:
${comment.content}

Statistiques:
- Signalements: ${comment.reports || 0}
- Likes: ${comment.likes || 0}
- Réponses: ${comment.replies || 0}
    `;

    const blob = new Blob([commentData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `commentaire_${comment.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined} className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FFFDFB] border-none shadow-2xl rounded-3xl p-0 sm:p-0">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-[#EBE3D5] px-6 py-4 flex items-center justify-between">
          <DialogTitle className="flex items-center space-x-3 text-xl sm:text-2xl font-black text-[#2D1B08] tracking-tighter uppercase">
            <div className="bg-blue-50 p-2 rounded-xl border border-blue-100">
               <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
            </div>
            <span>Modération Acte #{comment.id}</span>
          </DialogTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleDownload} className="border-2 border-[#EBE3D5] text-[#2D1B08] hover:bg-[#F2A900] hover:text-white font-black uppercase text-[10px] tracking-tighter hidden sm:flex">
              <Download className="h-4 w-4 mr-1.5" />
              Exporter
            </Button>
            <Button variant="outline" size="icon" onClick={handleDownload} className="border-2 border-[#EBE3D5] text-[#2D1B08] hover:bg-[#F2A900] hover:text-white sm:hidden h-9 w-9">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* En-tête du commentaire */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className={`${getStatusColor(comment.status)} font-bold uppercase text-[10px] sm:text-xs tracking-tighter px-2.5 py-1 border-none`}>
                {comment.status}
              </Badge>
              {comment.reports && comment.reports > 0 && (
                <Badge className="bg-[#E11D48]/10 text-[#E11D48] border-none font-bold uppercase text-[10px] sm:text-xs tracking-tighter px-2.5 py-1">
                  <Flag className="h-3 w-3 mr-1" />
                  {comment.reports} Signalement{comment.reports > 1 ? 's' : ''}
                </Badge>
              )}
               <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#5D4037]/50 flex items-center w-full sm:w-auto mt-2 sm:mt-0 lg:ml-auto">
                <Calendar className="h-3 w-3 mr-1" />
                {comment.date}
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#2D1B08] tracking-tighter uppercase mb-3 flex items-center gap-2">
                <span className="text-[#5D4037]/50">Sur :</span> 
                {comment.targetType} <span className="text-[10px] sm:text-sm">&gt;</span> {comment.targetName}
              </h2>
              <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-[#EBE3D5] shadow-sm relative">
                 <div className="absolute top-0 left-6 -mt-3 bg-[#FFFDFB] px-3">
                  <span className="text-[10px] font-black uppercase text-[#5D4037]/60 tracking-widest">Contenu du commentaire</span>
                </div>
                <p className="text-sm sm:text-base font-medium text-[#2D1B08] leading-relaxed italic">"{comment.content}"</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Informations sur l'auteur */}
            <Card className="border-2 border-[#EBE3D5] rounded-2xl shadow-sm bg-white lg:col-span-2">
              <CardContent className="p-5 h-full">
                <h3 className="font-black uppercase tracking-tighter text-[#2D1B08] mb-4 flex items-center text-sm">
                  <div className="bg-blue-50 p-1.5 rounded-lg mr-2 border border-blue-100">
                    <User className="h-4 w-4 text-blue-500" />
                  </div>
                  Auteur du commentaire
                </h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100 h-[calc(100%-3rem)]">
                    <div className="w-12 h-12 rounded-full bg-[#EBE3D5]/50 flex items-center justify-center text-[#5D4037] font-black border-2 border-[#EBE3D5] text-lg">
                       {comment.author.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-[#2D1B08] text-lg">{comment.author}</p>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <Badge className={`${getStatusColor(comment.authorStatus)} font-bold uppercase text-[9px] px-2 py-0.5 border-none`}>
                          {comment.authorStatus}
                        </Badge>
                        <Badge className={`${getRoleColor(comment.authorRole)} flex items-center gap-1 font-bold uppercase text-[9px] px-2 py-0.5 border-none`}>
                          {getRoleIcon(comment.authorRole)}
                          <span className="capitalize">{comment.authorRole}</span>
                        </Badge>
                      </div>
                    </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistiques du commentaire */}
            <Card className="border-2 border-[#EBE3D5] rounded-2xl shadow-sm bg-white">
              <CardContent className="p-5">
                <h3 className="font-black uppercase tracking-tighter text-[#2D1B08] mb-4 text-sm text-center lg:text-left">Statistiques</h3>
                 <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center lg:grid-cols-1 lg:gap-3">
                  <div className="p-3 bg-[#E11D48]/5 rounded-xl border border-[#E11D48]/10 flex flex-col lg:flex-row items-center justify-between">
                    <div className="flex items-center gap-2 mb-1 lg:mb-0">
                      <Flag className="h-4 w-4 text-[#E11D48]" />
                      <div className="text-[10px] font-black uppercase text-[#E11D48] tracking-tighter">Signalements</div>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-[#E11D48]">{comment.reports || 0}</div>
                  </div>
                  <div className="p-3 bg-[#1B5E20]/5 rounded-xl border border-[#1B5E20]/10 flex flex-col lg:flex-row items-center justify-between">
                    <div className="flex items-center gap-2 mb-1 lg:mb-0">
                      <ThumbsUp className="h-4 w-4 text-[#1B5E20]" />
                      <div className="text-[10px] font-black uppercase text-[#1B5E20] tracking-tighter">Likes</div>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-[#1B5E20]">{comment.likes || 0}</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex flex-col lg:flex-row items-center justify-between">
                     <div className="flex items-center gap-2 mb-1 lg:mb-0">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                      <div className="text-[10px] font-black uppercase text-blue-600 tracking-tighter">Réponses</div>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-blue-600">{comment.replies || 0}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions de modération */}
          {!showActionForm ? (
            <Card className="border-2 border-[#EBE3D5] rounded-2xl shadow-sm overflow-hidden border-t-4 border-t-[#F2A900]">
              <CardContent className="p-5 sm:p-6 bg-white">
                <h3 className="font-black uppercase tracking-widest text-[#5D4037]/60 text-[10px] mb-4 text-center sm:text-left">Opérations de modération</h3>
                 <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
                  <Button
                    onClick={() => {
                      setAction('approve');
                      setShowActionForm(true);
                    }}
                    className="col-span-2 lg:col-span-1 bg-[#1B5E20] hover:bg-[#1B5E20]/90 text-white font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11"
                  >
                    <CheckCircle className="h-4 w-4 mr-1.5" />
                    Valider
                  </Button>
                  <Button
                    onClick={() => {
                      setAction('reject');
                      setShowActionForm(true);
                    }}
                    variant="outline"
                    className="border-2 border-[#E11D48] text-[#E11D48] hover:bg-red-50 hover:text-[#E11D48] font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11"
                  >
                    <X className="h-4 w-4 mr-1.5" />
                    Rejeter
                  </Button>
                  <Button
                    onClick={() => {
                      setAction('delete');
                      setShowActionForm(true);
                    }}
                    variant="outline"
                    className="border-2 border-[#E11D48] text-[#E11D48] hover:bg-red-50 hover:text-[#E11D48] font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11"
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Supprimer
                  </Button>
                  <Button
                    onClick={() => {
                      setAction('warn');
                      setShowActionForm(true);
                    }}
                    variant="outline"
                    className="border-2 border-[#F2A900] text-[#F2A900] hover:bg-orange-50 hover:text-[#F2A900] font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11"
                  >
                    <UserCheck className="h-4 w-4 mr-1.5" />
                    Avertir
                  </Button>
                  <Button
                    onClick={() => {
                      setAction('ban');
                      setShowActionForm(true);
                    }}
                    className="col-span-2 lg:col-span-1 bg-[#E11D48] hover:bg-[#E11D48]/90 text-white font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11 shadow-sm"
                  >
                    <Ban className="h-4 w-4 mr-1.5" />
                    Bannir Profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-[#F2A900] rounded-2xl shadow-md bg-[#FFFDFB] animate-in slide-in-from-bottom-4 duration-300">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                   <h3 className="font-black uppercase tracking-tighter text-[#2D1B08] text-lg flex flex-wrap items-center gap-2">
                    {action === 'approve' && <><CheckCircle className="h-5 w-5 text-[#1B5E20]"/> Valider le commentaire</>}
                    {action === 'reject' && <><X className="h-5 w-5 text-[#E11D48]"/> Rejeter le commentaire</>}
                    {action === 'delete' && <><Trash2 className="h-5 w-5 text-[#E11D48]"/> Exclure le commentaire</>}
                    {action === 'warn' && <><UserCheck className="h-5 w-5 text-[#F2A900]"/> Envoyer un avertissement</>}
                    {action === 'ban' && <><Ban className="h-5 w-5 text-[#E11D48]"/> Bannir l'utilisateur</>}
                  </h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowActionForm(false)} className="rounded-full h-8 w-8 hover:bg-gray-100 flex-shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-5">
                  {action === 'approve' && (
                     <div className="space-y-2">
                      <Label htmlFor="moderatorComment" className="font-bold text-[#2D1B08] text-sm">Commentaire / Note rattachée (Optionnel)</Label>
                      <Textarea
                        id="moderatorComment"
                        value={moderatorComment}
                        onChange={(e) => setModeratorComment(e.target.value)}
                        placeholder="Informations complémentaires, remarques internes..."
                        className="border-2 border-[#EBE3D5] focus:border-[#F2A900] focus:ring-[#F2A900] rounded-xl resize-none min-h-[100px]"
                      />
                    </div>
                  )}

                  {(action === 'reject' || action === 'delete' || action === 'warn' || action === 'ban') && (
                     <div className="space-y-2">
                      <Label htmlFor="reason" className="font-bold text-[#2D1B08] text-sm">
                        Justification de l'action <span className="text-[#E11D48]">*</span>
                      </Label>
                      <Textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Fournissez le contexte et le motif pour les prochaines étapes de résolution..."
                        className="border-2 border-[#EBE3D5] focus:border-[#F2A900] focus:ring-[#F2A900] rounded-xl resize-none min-h-[100px]"
                        required
                      />
                    </div>
                  )}

                  {action === 'ban' && (
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="font-bold text-[#2D1B08] text-sm">Durée de la suspension</Label>
                      <Select value={banDuration} onValueChange={setBanDuration}>
                        <SelectTrigger className="w-full h-11 border-2 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl font-bold text-[#2D1B08]">
                          <SelectValue placeholder="Sélectionnez la durée" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 border-[#EBE3D5] rounded-xl font-medium">
                          <SelectItem value="1">24 Heures</SelectItem>
                          <SelectItem value="7">7 Jours</SelectItem>
                          <SelectItem value="30">30 Jours</SelectItem>
                          <SelectItem value="90">90 Jours</SelectItem>
                          <SelectItem value="365">1 An</SelectItem>
                          <SelectItem value="permanent" className="text-red-600 font-bold">Définitif</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-[#EBE3D5]">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowActionForm(false);
                        setAction('');
                        setModeratorComment('');
                        setReason('');
                      }}
                       className="border-2 border-[#EBE3D5] text-[#2D1B08] font-black uppercase text-xs tracking-tighter h-11"
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={handleAction}
                      disabled={(action === 'reject' || action === 'delete' || action === 'warn' || action === 'ban') ? !reason : false}
                      className={`font-black uppercase text-xs tracking-tighter h-11 px-8 ${
                        action === 'approve' ? 'bg-[#1B5E20] hover:bg-[#1B5E20]/90 text-white' :
                        action === 'warn' ? 'bg-[#F2A900] hover:bg-[#F2A900]/90 text-white' :
                        'bg-[#E11D48] hover:bg-[#E11D48]/90 text-white'
                      }`}
                    >
                      Confirmer l'Action
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="hidden sm:flex justify-end space-x-3">
             <Button variant="outline" onClick={onClose} className="border-2 border-[#EBE3D5] text-[#2D1B08] font-black uppercase text-xs tracking-tighter">
              Fermer la fenêtre
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModerationModal;
