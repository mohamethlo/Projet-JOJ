import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  MessageSquare, 
  User, 
  Calendar, 
  CheckCircle, 
  X, 
  Eye,
  Download,
  Flag,
  AlertTriangle,
  Shield,
  Ban,
  UserCheck,
  Clock
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
        return 'bg-yellow-100 text-yellow-700';
      case 'Approuvé':
        return 'bg-green-100 text-green-700';
      case 'Rejeté':
        return 'bg-red-100 text-red-700';
      case 'Supprimé':
        return 'bg-gray-100 text-gray-700';
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <span>Modération du commentaire #{comment.id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* En-tête du commentaire */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <Badge className={getStatusColor(comment.status)}>
                  {comment.status}
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{comment.date}</span>
                </div>
                {comment.reports && comment.reports > 0 && (
                  <Badge className="bg-red-100 text-red-700">
                    <Flag className="h-3 w-3 mr-1" />
                    {comment.reports} signalement{comment.reports > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              
              <h2 className="text-lg font-semibold mb-2">
                Commentaire sur: {comment.targetType} - {comment.targetName}
              </h2>
              <div className="p-4 bg-gray-50 rounded-lg border">
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          </div>

          {/* Informations sur l'auteur */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <User className="h-5 w-5 text-blue-500 mr-2" />
                Auteur du commentaire
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Nom:</span> {comment.author}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(comment.authorStatus)}>
                    {comment.authorStatus}
                  </Badge>
                  <Badge className={getRoleColor(comment.authorRole)}>
                    {getRoleIcon(comment.authorRole)}
                    <span className="ml-1 capitalize">{comment.authorRole}</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques du commentaire */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Statistiques</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{comment.reports || 0}</div>
                  <div className="text-sm text-red-600">Signalements</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{comment.likes || 0}</div>
                  <div className="text-sm text-green-600">Likes</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{comment.replies || 0}</div>
                  <div className="text-sm text-blue-600">Réponses</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions de modération */}
          {!showActionForm ? (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Actions de modération</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
                  <Button
                    onClick={() => {
                      setAction('delete');
                      setShowActionForm(true);
                    }}
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
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
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">
                  {action === 'approve' && 'Approuver le commentaire'}
                  {action === 'reject' && 'Rejeter le commentaire'}
                  {action === 'delete' && 'Supprimer le commentaire'}
                  {action === 'warn' && 'Avertir l\'utilisateur'}
                  {action === 'ban' && 'Bannir l\'utilisateur'}
                </h3>
                
                <div className="space-y-4">
                  {action === 'approve' && (
                    <div>
                      <Label htmlFor="moderatorComment">Commentaire de modération (optionnel)</Label>
                      <Textarea
                        id="moderatorComment"
                        value={moderatorComment}
                        onChange={(e) => setModeratorComment(e.target.value)}
                        placeholder="Ajoutez un commentaire sur votre décision..."
                        rows={3}
                      />
                    </div>
                  )}
                  
                  {(action === 'reject' || action === 'delete' || action === 'warn' || action === 'ban') && (
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
                        setModeratorComment('');
                        setReason('');
                      }}
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={handleAction}
                      disabled={action === 'reject' || action === 'delete' || action === 'warn' || action === 'ban' ? !reason : false}
                      className={
                        action === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                        action === 'reject' ? 'bg-red-600 hover:bg-red-700' :
                        action === 'delete' ? 'bg-red-600 hover:bg-red-700' :
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

          {/* Actions */}
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

export default CommentModerationModal;
