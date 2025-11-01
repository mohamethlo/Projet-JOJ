import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Flag, 
  User, 
  Calendar, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Eye,
  Download,
  Share2,
  Clock,
  Shield,
  Ban,
  UserCheck,
  UserX
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
        return 'bg-red-100 text-red-700';
      case 'Élevé':
        return 'bg-orange-100 text-orange-700';
      case 'Moyen':
        return 'bg-yellow-100 text-yellow-700';
      case 'Faible':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours':
        return 'bg-blue-100 text-blue-700';
      case 'Résolu':
        return 'bg-green-100 text-green-700';
      case 'Rejeté':
        return 'bg-red-100 text-red-700';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'guide':
        return 'bg-blue-100 text-blue-700';
      case 'organizer':
        return 'bg-green-100 text-green-700';
      case 'tourist':
        return 'bg-orange-100 text-orange-700';
      case 'local':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Flag className="h-5 w-5 text-red-500" />
              <span>Détails du signalement #{report.id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* En-tête du signalement */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <Badge className={getPriorityColor(report.priority)}>
                  {report.priority}
                </Badge>
                <Badge className={getStatusColor(report.status)}>
                  {report.status}
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{report.date}</span>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-2">{report.type}</h2>
              <p className="text-gray-700 mb-4">{report.content}</p>
            </div>
          </div>

          {/* Informations détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations sur le signaleur */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <User className="h-5 w-5 text-blue-500 mr-2" />
                  Signaleur
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Nom:</span> {report.reporter}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(report.reporterStatus)}>
                      {report.reporterStatus}
                    </Badge>
                    <Badge className={getRoleColor(report.reporterRole)}>
                      {getRoleIcon(report.reporterRole)}
                      <span className="ml-1 capitalize">{report.reporterRole}</span>
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations sur l'utilisateur signalé */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  Utilisateur signalé
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Nom:</span> {report.reportedUser}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(report.reportedUserStatus)}>
                      {report.reportedUserStatus}
                    </Badge>
                    <Badge className={getRoleColor(report.reportedUserRole)}>
                      {getRoleIcon(report.reportedUserRole)}
                      <span className="ml-1 capitalize">{report.reportedUserRole}</span>
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preuves/Évidence */}
          {report.evidence && report.evidence.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Eye className="h-5 w-5 text-purple-500 mr-2" />
                  Preuves fournies
                </h3>
                <div className="space-y-2">
                  {report.evidence.map((evidence, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded border">
                      <span className="text-sm">{evidence}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions de modération */}
          {!showActionForm ? (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Actions de modération</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    onClick={() => {
                      setAction('approve');
                      setShowActionForm(true);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approuver
                  </Button>
                  <Button
                    onClick={() => {
                      setAction('reject');
                      setShowActionForm(true);
                    }}
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Rejeter
                  </Button>
                  {!hideWarn && (
                    <Button
                      onClick={() => {
                        setAction('warn');
                        setShowActionForm(true);
                      }}
                      variant="outline"
                      className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Avertir
                    </Button>
                  )}
                  {!hideBan && (
                    <Button
                      onClick={() => {
                        setAction('ban');
                        setShowActionForm(true);
                      }}
                      variant="outline"
                      className="border-red-500 text-red-600 hover:bg-red-50"
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      Bannir
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">
                  {action === 'approve' && 'Approuver le signalement'}
                  {action === 'reject' && 'Rejeter le signalement'}
                  {action === 'warn' && 'Avertir l\'utilisateur'}
                  {action === 'ban' && 'Bannir l\'utilisateur'}
                </h3>
                
                <div className="space-y-4">
                  {action === 'approve' && (
                    <div>
                      <Label htmlFor="comment">Commentaire (optionnel)</Label>
                      <Textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Ajoutez un commentaire sur votre décision..."
                        rows={3}
                      />
                    </div>
                  )}
                  
                  {(action === 'reject' || action === 'warn' || action === 'ban') && (
                    <div>
                      <Label htmlFor="reason">Raison *</Label>
                      <Textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Expliquez la raison de cette action..."
                        rows={3}
                        required
                      />
                    </div>
                  )}
                  
                  {action === 'ban' && (
                    <div>
                      <Label htmlFor="duration">Durée du bannissement</Label>
                      <select
                        id="duration"
                        value={banDuration}
                        onChange={(e) => setBanDuration(e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="1">1 jour</option>
                        <option value="7">7 jours</option>
                        <option value="30">30 jours</option>
                        <option value="90">90 jours</option>
                        <option value="365">1 an</option>
                        <option value="permanent">Permanent</option>
                      </select>
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowActionForm(false);
                        setAction('');
                        setComment('');
                        setReason('');
                      }}
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={handleAction}
                      disabled={action === 'reject' || action === 'warn' || action === 'ban' ? !reason : false}
                      className={
                        action === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                        action === 'reject' ? 'bg-red-600 hover:bg-red-700' :
                        action === 'warn' ? 'bg-yellow-600 hover:bg-yellow-700' :
                        'bg-red-600 hover:bg-red-700'
                      }
                    >
                      Confirmer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rédaction de rapport pour admin (optionnel) */}
          {showWriteReport && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Rédiger un rapport pour l'administrateur</h3>
                <Textarea
                  value={adminReport}
                  onChange={(e) => setAdminReport(e.target.value)}
                  placeholder="Décrivez brièvement l'intervention, le contexte et la résolution..."
                  rows={4}
                />
                <div className="flex justify-end mt-3">
                  <Button onClick={() => onWriteReport?.(report.id, adminReport)} disabled={!adminReport.trim()}>
                    Envoyer le rapport
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailsModal;
