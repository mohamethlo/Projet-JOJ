import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Calendar, 
  Shield, 
  Ban, 
  UserCheck, 
  UserX,
  Mail,
  Phone,
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle,
  X,
  Download,
  Eye,
  Edit,
  Trash2,
  Clock,
  Star
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  lastActivity: string;
  location?: string;
  phone?: string;
  reports?: number;
  reviews?: number;
  events?: number;
  guides?: number;
  accommodations?: number;
  isVerified?: boolean;
  isBanned?: boolean;
  banReason?: string;
  banExpiry?: string;
}

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData;
  onUpdateRole?: (userId: string, newRole: string) => void;
  onBanUser?: (userId: string, reason: string, duration: string) => void;
  onUnbanUser?: (userId: string) => void;
  onWarnUser?: (userId: string, reason: string) => void;
  onVerifyUser?: (userId: string) => void;
  onDeleteUser?: (userId: string, reason: string) => void;
}

const UserManagementModal: React.FC<UserManagementModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateRole,
  onBanUser,
  onUnbanUser,
  onWarnUser,
  onVerifyUser,
  onDeleteUser
}) => {
  const [action, setAction] = useState('');
  const [reason, setReason] = useState('');
  const [banDuration, setBanDuration] = useState('7');
  const [newRole, setNewRole] = useState(user.role);
  const [showActionForm, setShowActionForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif':
        return 'bg-green-100 text-green-700';
      case 'Banni':
        return 'bg-red-100 text-red-700';
      case 'Suspendu':
        return 'bg-yellow-100 text-yellow-700';
      case 'En attente':
        return 'bg-blue-100 text-blue-700';
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
      case 'security':
        return 'bg-red-100 text-red-700';
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
      case 'security':
        return <Shield className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  const handleAction = () => {
    if (!action) return;

    switch (action) {
      case 'updateRole':
        onUpdateRole?.(user.id, newRole);
        break;
      case 'ban':
        onBanUser?.(user.id, reason, banDuration);
        break;
      case 'unban':
        onUnbanUser?.(user.id);
        break;
      case 'warn':
        onWarnUser?.(user.id, reason);
        break;
      case 'verify':
        onVerifyUser?.(user.id);
        break;
      case 'delete':
        onDeleteUser?.(user.id, reason);
        break;
    }

    setShowActionForm(false);
    setAction('');
    setReason('');
    onClose();
  };

  const handleDownload = () => {
    const userData = `
Utilisateur #${user.id}
Nom: ${user.name}
Email: ${user.email}
Rôle: ${user.role}
Statut: ${user.status}
Date d'inscription: ${user.joinDate}
Dernière activité: ${user.lastActivity}
${user.location ? `Localisation: ${user.location}` : ''}
${user.phone ? `Téléphone: ${user.phone}` : ''}

Statistiques:
- Signalements: ${user.reports || 0}
- Avis: ${user.reviews || 0}
- Événements: ${user.events || 0}
- Guides: ${user.guides || 0}
- Hébergements: ${user.accommodations || 0}

Vérifié: ${user.isVerified ? 'Oui' : 'Non'}
Banni: ${user.isBanned ? 'Oui' : 'Non'}
${user.banReason ? `Raison du bannissement: ${user.banReason}` : ''}
${user.banExpiry ? `Expiration du bannissement: ${user.banExpiry}` : ''}
    `;
    
    const blob = new Blob([userData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `utilisateur_${user.id}.txt`;
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
              <User className="h-5 w-5 text-blue-500" />
              <span>Gestion de l'utilisateur: {user.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* En-tête de l'utilisateur */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <Badge className={getStatusColor(user.status)}>
                  {user.status}
                </Badge>
                <Badge className={getRoleColor(user.role)}>
                  {getRoleIcon(user.role)}
                  <span className="ml-1 capitalize">{user.role}</span>
                </Badge>
                {user.isVerified && (
                  <Badge className="bg-blue-100 text-blue-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Vérifié
                  </Badge>
                )}
                {user.isBanned && (
                  <Badge className="bg-red-100 text-red-700">
                    <Ban className="h-3 w-3 mr-1" />
                    Banni
                  </Badge>
                )}
              </div>
              
              <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Informations détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations personnelles */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <User className="h-5 w-5 text-blue-500 mr-2" />
                  Informations personnelles
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">ID:</span> {user.id}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {user.email}
                  </div>
                  {user.phone && (
                    <div>
                      <span className="font-medium">Téléphone:</span> {user.phone}
                    </div>
                  )}
                  {user.location && (
                    <div>
                      <span className="font-medium">Localisation:</span> {user.location}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Date d'inscription:</span> {user.joinDate}
                  </div>
                  <div>
                    <span className="font-medium">Dernière activité:</span> {user.lastActivity}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistiques d'activité */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Activity className="h-5 w-5 text-green-500 mr-2" />
                  Statistiques d'activité
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 bg-red-50 rounded text-center">
                    <div className="text-lg font-bold text-red-600">{user.reports || 0}</div>
                    <div className="text-xs text-red-600">Signalements</div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded text-center">
                    <div className="text-lg font-bold text-blue-600">{user.reviews || 0}</div>
                    <div className="text-xs text-blue-600">Avis</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded text-center">
                    <div className="text-lg font-bold text-green-600">{user.events || 0}</div>
                    <div className="text-xs text-green-600">Événements</div>
                  </div>
                  <div className="p-2 bg-purple-50 rounded text-center">
                    <div className="text-lg font-bold text-purple-600">{user.guides || 0}</div>
                    <div className="text-xs text-purple-600">Guides</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informations de bannissement */}
          {user.isBanned && (
            <Card className="border-red-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center text-red-600">
                  <Ban className="h-5 w-5 mr-2" />
                  Informations de bannissement
                </h3>
                <div className="space-y-2">
                  {user.banReason && (
                    <div>
                      <span className="font-medium">Raison:</span> {user.banReason}
                    </div>
                  )}
                  {user.banExpiry && (
                    <div>
                      <span className="font-medium">Expiration:</span> {user.banExpiry}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions de gestion */}
          {!showActionForm ? (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Actions de gestion</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    onClick={() => {
                      setAction('updateRole');
                      setShowActionForm(true);
                    }}
                    variant="outline"
                    className="border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Changer rôle
                  </Button>
                  {!user.isBanned ? (
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
                  ) : (
                    <Button
                      onClick={() => {
                        setAction('unban');
                        setShowActionForm(true);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Débannir
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setAction('warn');
                      setShowActionForm(true);
                    }}
                    variant="outline"
                    className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Avertir
                  </Button>
                  {!user.isVerified && (
                    <Button
                      onClick={() => {
                        setAction('verify');
                        setShowActionForm(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Vérifier
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setAction('delete');
                      setShowActionForm(true);
                    }}
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">
                  {action === 'updateRole' && 'Changer le rôle de l\'utilisateur'}
                  {action === 'ban' && 'Bannir l\'utilisateur'}
                  {action === 'unban' && 'Débannir l\'utilisateur'}
                  {action === 'warn' && 'Avertir l\'utilisateur'}
                  {action === 'verify' && 'Vérifier l\'utilisateur'}
                  {action === 'delete' && 'Supprimer l\'utilisateur'}
                </h3>
                
                <div className="space-y-4">
                  {action === 'updateRole' && (
                    <div>
                      <Label htmlFor="newRole">Nouveau rôle</Label>
                      <select
                        id="newRole"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="tourist">Touriste</option>
                        <option value="local">Local</option>
                        <option value="guide">Guide</option>
                        <option value="organizer">Organisateur</option>
                        <option value="security">Sécurité</option>
                        <option value="admin">Administrateur</option>
                      </select>
                    </div>
                  )}
                  
                  {(action === 'ban' || action === 'warn' || action === 'delete') && (
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
                        setReason('');
                        setNewRole(user.role);
                      }}
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={handleAction}
                      disabled={action === 'ban' || action === 'warn' || action === 'delete' ? !reason : false}
                      className={
                        action === 'updateRole' ? 'bg-blue-600 hover:bg-blue-700' :
                        action === 'ban' ? 'bg-red-600 hover:bg-red-700' :
                        action === 'unban' ? 'bg-green-600 hover:bg-green-700' :
                        action === 'warn' ? 'bg-yellow-600 hover:bg-yellow-700' :
                        action === 'verify' ? 'bg-blue-600 hover:bg-blue-700' :
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

export default UserManagementModal;
