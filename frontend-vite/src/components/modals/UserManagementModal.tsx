import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  User,
  Calendar,
  Shield,
  Ban,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle,
  Download,
  Edit,
  Trash2,
  Settings,
  X
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
        return 'bg-[#1B5E20]/10 text-[#1B5E20]';
      case 'Banni':
        return 'bg-[#E11D48]/10 text-[#E11D48]';
      case 'Suspendu':
        return 'bg-[#F2A900]/10 text-[#F2A900]';
      case 'En attente':
        return 'bg-blue-100 text-blue-700';
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
      case 'security':
        return 'bg-[#E11D48]/10 text-[#E11D48]';
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
      <DialogContent aria-describedby={undefined} className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FFFDFB] border-none shadow-2xl rounded-3xl p-0 sm:p-0">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-[#EBE3D5] px-6 py-4 flex items-center justify-between">
          <DialogTitle className="flex items-center space-x-3 text-xl sm:text-2xl font-black text-[#2D1B08] tracking-tighter uppercase">
            <div className="bg-purple-50 p-2 rounded-xl border border-purple-100">
               <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <span>Gestion Utilisateur</span>
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
          {/* En-tête de l'utilisateur */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className={`${getStatusColor(user.status)} font-bold uppercase text-[10px] sm:text-xs tracking-tighter px-2.5 py-1 border-none`}>
                {user.status}
              </Badge>
              <Badge className={`${getRoleColor(user.role)} flex items-center gap-1 font-bold uppercase text-[10px] sm:text-xs px-2.5 py-1 border-none`}>
                {getRoleIcon(user.role)}
                <span className="capitalize">{user.role}</span>
              </Badge>
              {user.isVerified && (
                <Badge className="bg-[#1B5E20]/10 text-[#1B5E20] border-none font-bold uppercase text-[10px] sm:text-xs tracking-tighter px-2.5 py-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Vérifié
                </Badge>
              )}
              {user.isBanned && (
                <Badge className="bg-[#E11D48]/10 text-[#E11D48] border-none font-bold uppercase text-[10px] sm:text-xs tracking-tighter px-2.5 py-1">
                  <Ban className="h-3 w-3 mr-1" />
                  Banni
                </Badge>
              )}
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EBE3D5]/50 flex items-center justify-center text-[#5D4037] font-black border-4 border-white shadow-md text-2xl sm:text-3xl">
                   {user.name.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#2D1B08] tracking-tighter uppercase">{user.name}</h2>
                  <p className="text-[#5D4037]/60 font-medium text-sm sm:text-base">ID: {user.id}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm text-[#2D1B08] font-medium bg-gray-50/50 p-3 sm:p-4 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-1.5 flex-1 min-w-[200px]">
                  <Mail className="h-4 w-4 text-[#5D4037]" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-1.5">
                    <Phone className="h-4 w-4 text-[#5D4037]" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="h-4 w-4 text-[#5D4037]" />
                    <span>{user.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Informations détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* Informations de connexion */}
            <Card className="border-2 border-[#EBE3D5] rounded-2xl shadow-sm bg-white">
              <CardContent className="p-5">
                <h3 className="font-black uppercase tracking-tighter text-[#2D1B08] mb-4 flex items-center text-sm">
                  <div className="bg-blue-50 p-1.5 rounded-lg mr-2 border border-blue-100">
                    <Calendar className="h-4 w-4 text-blue-500" />
                  </div>
                  Historique de Présence
                </h3>
                <div className="space-y-4 text-sm font-medium text-[#2D1B08]">
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-[#5D4037]/70">Inscrit(e) le</span>
                    <span className="font-bold">{user.joinDate}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#5D4037]/70">Dernière connexion</span>
                    <span className="font-bold">{user.lastActivity}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistiques d'activité */}
            <Card className="border-2 border-[#EBE3D5] rounded-2xl shadow-sm bg-white">
              <CardContent className="p-5">
                <h3 className="font-black uppercase tracking-tighter text-[#2D1B08] mb-4 flex items-center text-sm">
                  <div className="bg-green-50 p-1.5 rounded-lg mr-2 border border-green-100">
                    <Activity className="h-4 w-4 text-green-500" />
                  </div>
                  Engagement & Activité
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="p-3 bg-[#E11D48]/5 border border-[#E11D48]/10 rounded-xl text-center">
                    <div className="text-xl font-black text-[#E11D48]">{user.reports || 0}</div>
                    <div className="text-[10px] font-black uppercase text-[#E11D48] tracking-tighter">Signalements</div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-center">
                    <div className="text-xl font-black text-blue-600">{user.reviews || 0}</div>
                    <div className="text-[10px] font-black uppercase text-blue-600 tracking-tighter">Avis Publiés</div>
                  </div>
                  <div className="p-3 bg-[#1B5E20]/5 border border-[#1B5E20]/10 rounded-xl text-center">
                    <div className="text-xl font-black text-[#1B5E20]">{user.events || 0}</div>
                    <div className="text-[10px] font-black uppercase text-[#1B5E20] tracking-tighter">Événements</div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-center">
                    <div className="text-xl font-black text-purple-600">{user.guides || 0}</div>
                    <div className="text-[10px] font-black uppercase text-purple-600 tracking-tighter">Guides/Héb.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informations de bannissement */}
          {user.isBanned && (
            <Card className="border-2 border-[#E11D48]/20 bg-red-50/50 rounded-2xl">
              <CardContent className="p-5">
                <h3 className="font-black uppercase tracking-tighter text-[#E11D48] mb-3 flex items-center text-sm">
                  <Ban className="h-4 w-4 mr-2" />
                  Mesure de Bannissement Active
                </h3>
                <div className="space-y-2 text-sm text-[#2D1B08] p-3 bg-white rounded-xl border border-red-100 shadow-sm">
                  {user.banReason && (
                    <div className="flex">
                      <span className="font-bold w-24 flex-shrink-0">Motif:</span> 
                      <span className="italic">"{user.banReason}"</span>
                    </div>
                  )}
                  {user.banExpiry && (
                    <div className="flex">
                      <span className="font-bold w-24 flex-shrink-0">Expresse le:</span> 
                      <span className="font-medium text-[#E11D48]">{user.banExpiry}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions de gestion */}
          {!showActionForm ? (
            <Card className="border-2 border-[#EBE3D5] rounded-2xl shadow-sm overflow-hidden border-t-4 border-t-[#F2A900]">
              <CardContent className="p-5 sm:p-6 bg-white">
                <h3 className="font-black uppercase tracking-widest text-[#5D4037]/60 text-[10px] mb-4 text-center sm:text-left">Opérations Administratives</h3>
                 <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
                  <Button
                    onClick={() => {
                      setAction('updateRole');
                      setShowActionForm(true);
                    }}
                    variant="outline"
                    className="col-span-2 lg:col-span-1 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11"
                  >
                    <Edit className="h-4 w-4 mr-1.5" />
                    Röle
                  </Button>
                  {!user.isBanned ? (
                    <Button
                      onClick={() => {
                        setAction('ban');
                        setShowActionForm(true);
                      }}
                      className="bg-[#E11D48] hover:bg-[#E11D48]/90 text-white font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11 shadow-sm"
                    >
                      <Ban className="h-4 w-4 mr-1.5" />
                      Suspendre
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setAction('unban');
                        setShowActionForm(true);
                      }}
                      className="bg-[#1B5E20] hover:bg-[#1B5E20]/90 text-white font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11 shadow-sm"
                    >
                      <UserCheck className="h-4 w-4 mr-1.5" />
                      Réhabiliter
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setAction('warn');
                      setShowActionForm(true);
                    }}
                    variant="outline"
                     className="border-2 border-[#F2A900] text-[#F2A900] hover:bg-orange-50 hover:text-[#F2A900] font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11"
                  >
                    <AlertTriangle className="h-4 w-4 mr-1.5" />
                    Avertir
                  </Button>
                  {!user.isVerified && (
                    <Button
                      onClick={() => {
                        setAction('verify');
                        setShowActionForm(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] sm:text-xs tracking-tighter h-11 shadow-sm"
                    >
                      <CheckCircle className="h-4 w-4 mr-1.5" />
                      Profil OK
                    </Button>
                  )}
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
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-[#F2A900] rounded-2xl shadow-md bg-[#FFFDFB] animate-in slide-in-from-bottom-4 duration-300">
              <CardContent className="p-5 sm:p-6">
                 <div className="flex items-center justify-between mb-5">
                   <h3 className="font-black uppercase tracking-tighter text-[#2D1B08] text-lg flex flex-wrap items-center gap-2">
                    {action === 'updateRole' && <><Edit className="h-5 w-5 text-blue-600"/> Modifier les privilèges</>}
                    {action === 'ban' && <><Ban className="h-5 w-5 text-[#E11D48]"/> Appliquer une suspension</>}
                    {action === 'unban' && <><UserCheck className="h-5 w-5 text-[#1B5E20]"/> Lever la suspension</>}
                    {action === 'warn' && <><AlertTriangle className="h-5 w-5 text-[#F2A900]"/> Envoyer un avertissement formel</>}
                    {action === 'verify' && <><CheckCircle className="h-5 w-5 text-blue-600"/> Certifier le compte</>}
                    {action === 'delete' && <><Trash2 className="h-5 w-5 text-[#E11D48]"/> Suppression définitive</>}
                  </h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowActionForm(false)} className="rounded-full h-8 w-8 hover:bg-gray-100 flex-shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-5">
                  {action === 'updateRole' && (
                    <div className="space-y-2">
                      <Label htmlFor="newRole" className="font-bold text-[#2D1B08] text-sm">Attribuer un nouveau rôle</Label>
                      <Select value={newRole} onValueChange={setNewRole}>
                        <SelectTrigger className="w-full h-11 border-2 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl font-bold text-[#2D1B08]">
                          <SelectValue placeholder="Sélectionnez un rôle" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 border-[#EBE3D5] rounded-xl font-medium">
                          <SelectItem value="tourist">Touriste (Base)</SelectItem>
                          <SelectItem value="local">Local (Certifié)</SelectItem>
                          <SelectItem value="guide">Guide Touristique</SelectItem>
                          <SelectItem value="organizer">Organisateur</SelectItem>
                          <SelectItem value="security">Agent de Sécurité</SelectItem>
                          <SelectItem value="admin" className="text-purple-600 font-bold">Administrateur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {(action === 'ban' || action === 'warn' || action === 'delete') && (
                     <div className="space-y-2">
                      <Label htmlFor="reason" className="font-bold text-[#2D1B08] text-sm">
                        Justification requise <span className="text-[#E11D48]">*</span>
                      </Label>
                      <Textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                         placeholder="Motif détaillé de la sanction pour l'historique de modération..."
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
                        setReason('');
                        setNewRole(user.role);
                      }}
                      className="border-2 border-[#EBE3D5] text-[#2D1B08] font-black uppercase text-xs tracking-tighter h-11"
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={handleAction}
                      disabled={(action === 'ban' || action === 'warn' || action === 'delete') ? !reason : false}
                      className={`font-black uppercase text-xs tracking-tighter h-11 px-8 ${
                        action === 'updateRole' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                        action === 'verify' || action === 'unban' ? 'bg-[#1B5E20] hover:bg-[#1B5E20]/90 text-white' :
                        action === 'warn' ? 'bg-[#F2A900] hover:bg-[#F2A900]/90 text-white' :
                        'bg-[#E11D48] hover:bg-[#E11D48]/90 text-white'
                      }`}
                    >
                      Exécuter l'Action
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

export default UserManagementModal;
