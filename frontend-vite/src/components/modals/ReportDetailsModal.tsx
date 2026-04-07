import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Flag,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  Download,
  Shield,
  Ban,
  UserCheck,
  MapPin,
  Clock,
  FileText
} from 'lucide-react';

interface ReportData {
  id: string;
  type: string;
  content: string;
  priority: string;
  status: string;
  date: string;
  reporter: string;
  reporterStatus: string;
  reporterRole: string;
  reportedUser: string;
  reportedUserStatus: string;
  reportedUserRole: string;
  evidence?: string[];
  category?: string;
  location?: string;
  timestamp?: string;
}

interface ReportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ReportData;
  onApprove?: (reportId: string, action: string, comment?: string) => void;
  onReject?: (reportId: string, reason: string) => void;
  onBanUser?: (userId: string, reason: string, duration: string) => void;
  onWarnUser?: (userId: string, reason: string) => void;
  hideBan?: boolean;
  hideWarn?: boolean;
  showWriteReport?: boolean;
  onWriteReport?: (reportId: string, content: string) => void;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  isOpen,
  onClose,
  report,
  onApprove,
  onReject,
  onBanUser,
  onWarnUser,
  hideBan,
  hideWarn,
  showWriteReport,
  onWriteReport
}) => {
  const [action, setAction] = useState('');
  const [comment, setComment] = useState('');
  const [reason, setReason] = useState('');
  const [banDuration, setBanDuration] = useState('7');
  const [showActionForm, setShowActionForm] = useState(false);
  const [adminReport, setAdminReport] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-[#E11D48]/10 text-[#E11D48]';
      case 'Élevé':
        return 'bg-orange-100 text-orange-700';
      case 'Moyen':
        return 'bg-[#F2A900]/10 text-[#F2A900]';
      case 'Faible':
        return 'bg-[#1B5E20]/10 text-[#1B5E20]';
      default:
        return 'bg-[#EBE3D5] text-[#5D4037]';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours':
        return 'bg-blue-100 text-blue-700';
      case 'Résolu':
        return 'bg-[#1B5E20]/10 text-[#1B5E20]';
      case 'Rejeté':
        return 'bg-[#E11D48]/10 text-[#E11D48]';
      case 'En attente':
        return 'bg-[#F2A900]/10 text-[#F2A900]';
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
        onApprove?.(report.id, 'approved', comment);
        break;
      case 'reject':
        onReject?.(report.id, reason);
        break;
      case 'ban':
        onBanUser?.(report.reportedUser, reason, banDuration);
        break;
      case 'warn':
        onWarnUser?.(report.reportedUser, reason);
        break;
    }

    setShowActionForm(false);
    setAction('');
    setComment('');
    setReason('');
    onClose();
  };

  const handleDownload = () => {
    const reportData = `
Signalement #${report.id}
Type: ${report.type}
Date: ${report.date}
Statut: ${report.status}
Priorité: ${report.priority}

Contenu:
${report.content}

Signalé par: ${report.reporter} (${report.reporterRole})
Utilisateur signalé: ${report.reportedUser} (${report.reportedUserRole})

Statut du signaleur: ${report.reporterStatus}
Statut de l'utilisateur signalé: ${report.reportedUserStatus}
    `;

    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `signalement_${report.id}.txt`;
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
            <div className="bg-[#E11D48]/10 p-2 rounded-xl">
               <Flag className="h-5 w-5 sm:h-6 sm:w-6 text-[#E11D48]" />
            </div>
            <span>Signalement #{report.id}</span>
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
          {/* En-tête du signalement */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={`${getPriorityColor(report.priority)} font-bold uppercase text-[10px] sm:text-xs tracking-tighter px-2.5 py-1 border-none`}>
                Priorité {report.priority}
              </Badge>
              <Badge className={`${getStatusColor(report.status)} font-bold uppercase text-[10px] sm:text-xs tracking-tighter px-2.5 py-1 border-none`}>
                {report.status}
              </Badge>
              {report.category && (
                 <Badge className="bg-[#F2A900]/10 text-[#F2A900] border-none font-bold uppercase text-[10px] sm:text-xs tracking-tighter px-2.5 py-1">
                   {report.category}
                 </Badge>
              )}
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#5D4037]/50 flex items-center w-full sm:w-auto mt-2 sm:mt-0 lg:ml-auto">
                <Calendar className="h-3 w-3 mr-1" />
                {report.date} {report.timestamp && `à ${report.timestamp}`}
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#2D1B08] tracking-tighter uppercase mb-3">{report.type}</h2>
              <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-[#EBE3D5] shadow-sm relative">
                <div className="absolute top-0 left-6 -mt-3 bg-[#FFFDFB] px-3">
                  <span className="text-[10px] font-black uppercase text-[#5D4037]/60 tracking-widest">Contenu signalé</span>
                </div>
                <p className="text-sm sm:text-base font-medium text-[#2D1B08] leading-relaxed italic">"{report.content}"</p>
                {report.location && (
                  <div className="mt-4 flex items-center text-xs font-bold text-[#5D4037]/70 bg-gray-50 p-2 rounded-lg inline-flex border border-gray-100">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    Lieu concerné : {report.location}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Informations détaillées - Cartes Utilisateurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* Informations sur le signaleur */}
            <Card className="border-2 border-[#EBE3D5] rounded-2xl shadow-sm bg-white">
              <CardContent className="p-5">
                <h3 className="font-black uppercase tracking-tighter text-[#2D1B08] mb-4 flex items-center text-sm">
                  <div className="bg-blue-50 p-1.5 rounded-lg mr-2">
                    <User className="h-4 w-4 text-blue-500" />
                  </div>
                  Auteur du signalement
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-[#EBE3D5]/50 flex items-center justify-center text-[#5D4037] font-black border-2 border-[#EBE3D5]">
                       {report.reporter.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-[#2D1B08]">{report.reporter}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge className={`${getStatusColor(report.reporterStatus)} font-bold uppercase text-[9px] px-1.5 border-none`}>
                          {report.reporterStatus}
                        </Badge>
                        <Badge className={`${getRoleColor(report.reporterRole)} flex items-center gap-1 font-bold uppercase text-[9px] px-1.5 border-none`}>
                          {getRoleIcon(report.reporterRole)}
                          <span className="capitalize">{report.reporterRole}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations sur l'utilisateur signalé */}
            <Card className="border-2 border-[#E11D48]/20 rounded-2xl shadow-sm bg-red-50/30">
              <CardContent className="p-5">
                <h3 className="font-black uppercase tracking-tighter text-[#2D1B08] mb-4 flex items-center text-sm">
                  <div className="bg-[#E11D48]/10 p-1.5 rounded-lg mr-2">
                    <AlertTriangle className="h-4 w-4 text-[#E11D48]" />
                  </div>
                  Utilisateur ou Contenu Signalé
                </h3>
                <div className="space-y-3">
                   <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-red-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-black border-2 border-red-200">
                       {report.reportedUser.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-[#2D1B08]">{report.reportedUser}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge className={`${getStatusColor(report.reportedUserStatus)} font-bold uppercase text-[9px] px-1.5 border-none`}>
                          {report.reportedUserStatus}
                        </Badge>
                        <Badge className={`${getRoleColor(report.reportedUserRole)} flex items-center gap-1 font-bold uppercase text-[9px] px-1.5 border-none`}>
                          {getRoleIcon(report.reportedUserRole)}
                          <span className="capitalize">{report.reportedUserRole}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preuves/Évidence */}
          {report.evidence && report.evidence.length > 0 && (
            <Card className="border-2 border-[#EBE3D5] rounded-2xl shadow-sm bg-white">
              <CardContent className="p-5">
                <h3 className="font-black uppercase tracking-tighter text-[#2D1B08] mb-4 flex items-center text-sm">
                  <div className="bg-purple-50 p-1.5 rounded-lg mr-2">
                    <Eye className="h-4 w-4 text-purple-500" />
                  </div>
                  Preuves fournies ({report.evidence.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {report.evidence.map((evidence, index) => (
                    <div key={index} className="flex items-start p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="bg-white p-1 rounded shadow-sm mr-3 border border-gray-100">
                        <FileText className="h-4 w-4 text-gray-400" />
                      </div>
                      <span className="text-sm font-medium text-[#2D1B08] break-all">{evidence}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions de modération */}
          {!showActionForm ? (
            <Card className="border-2 border-[#EBE3D5] rounded-2xl shadow-sm overflow-hidden border-t-4 border-t-[#F2A900]">
              <CardContent className="p-5 sm:p-6 bg-white">
                <h3 className="font-black uppercase tracking-widest text-[#5D4037]/60 text-[10px] mb-4 text-center sm:text-left">Options de modération</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <Button
                    onClick={() => {
                      setAction('approve');
                      setShowActionForm(true);
                    }}
                    className="w-full bg-[#1B5E20] hover:bg-[#1B5E20]/90 text-white font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11"
                  >
                    <CheckCircle className="h-4 w-4 mr-1.5" />
                    Approuver
                  </Button>
                  <Button
                    onClick={() => {
                      setAction('reject');
                      setShowActionForm(true);
                    }}
                    variant="outline"
                    className="w-full border-2 border-[#E11D48] text-[#E11D48] hover:bg-red-50 hover:text-[#E11D48] font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11"
                  >
                    <X className="h-4 w-4 mr-1.5" />
                    Rejeter
                  </Button>
                  {!hideWarn && (
                    <Button
                      onClick={() => {
                        setAction('warn');
                        setShowActionForm(true);
                      }}
                      variant="outline"
                      className="w-full border-2 border-[#F2A900] text-[#F2A900] hover:bg-orange-50 hover:text-[#F2A900] font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11"
                    >
                      <UserCheck className="h-4 w-4 mr-1.5" />
                      Avertir
                    </Button>
                  )}
                  {!hideBan && (
                    <Button
                      onClick={() => {
                        setAction('ban');
                        setShowActionForm(true);
                      }}
                      className="w-full bg-[#E11D48] hover:bg-[#E11D48]/90 text-white font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11 shadow-sm"
                    >
                      <Ban className="h-4 w-4 mr-1.5" />
                      Bannir Profil
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-[#F2A900] rounded-2xl shadow-md bg-[#FFFDFB] animate-in slide-in-from-bottom-4 duration-300">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-black uppercase tracking-tighter text-[#2D1B08] text-lg flex items-center">
                    {action === 'approve' && <><CheckCircle className="h-5 w-5 text-[#1B5E20] mr-2"/> Valider le contenu</>}
                    {action === 'reject' && <><X className="h-5 w-5 text-[#E11D48] mr-2"/> Rejeter le signalement</>}
                    {action === 'warn' && <><UserCheck className="h-5 w-5 text-[#F2A900] mr-2"/> Envoyer un avertissement</>}
                    {action === 'ban' && <><Ban className="h-5 w-5 text-[#E11D48] mr-2"/> Bannir l'utilisateur</>}
                  </h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowActionForm(false)} className="rounded-full h-8 w-8 hover:bg-gray-100">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-5">
                  {action === 'approve' && (
                    <div className="space-y-2">
                      <Label htmlFor="comment" className="font-bold text-[#2D1B08] text-sm">Commentaire public / Note interne (Optionnel)</Label>
                      <Textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Justifiez votre décision ou laissez une note..."
                        className="border-2 border-[#EBE3D5] focus:border-[#F2A900] focus:ring-[#F2A900] rounded-xl resize-none min-h-[100px]"
                      />
                    </div>
                  )}

                  {(action === 'reject' || action === 'warn' || action === 'ban') && (
                    <div className="space-y-2">
                      <Label htmlFor="reason" className="font-bold text-[#2D1B08] text-sm">
                        Justification requise <span className="text-[#E11D48]">*</span>
                      </Label>
                      <Textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Expliquez la raison détaillée de cette action..."
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
                        setComment('');
                        setReason('');
                      }}
                      className="border-2 border-[#EBE3D5] text-[#2D1B08] font-black uppercase text-xs tracking-tighter h-11"
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={handleAction}
                      disabled={(action === 'reject' || action === 'warn' || action === 'ban') ? !reason : false}
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

          {/* Rédaction de rapport pour admin (optionnel) */}
          {showWriteReport && (
            <Card className="border-2 border-dashed border-[#EBE3D5] bg-gray-50/50 rounded-2xl">
              <CardContent className="p-5">
                <h3 className="font-black uppercase tracking-widest text-[#5D4037]/80 text-[10px] mb-3">Escalade SuperAdmin</h3>
                <Textarea
                  value={adminReport}
                  onChange={(e) => setAdminReport(e.target.value)}
                  placeholder="Rédigez une note interne destinée aux Super Administrateurs..."
                  className="border-2 border-[#EBE3D5] bg-white rounded-xl resize-none text-sm placeholder:text-[#5D4037]/40 focus:border-[#F2A900]"
                  rows={3}
                />
                <div className="flex justify-end mt-3">
                  <Button 
                    onClick={() => onWriteReport?.(report.id, adminReport)} 
                    disabled={!adminReport.trim()}
                    className="bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black uppercase text-[10px] tracking-tighter transition-colors"
                  >
                    Transmettre au SuperAdmin
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailsModal;
