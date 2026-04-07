import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  Star,
  BookOpen,
  X,
  UserCheck,
  UserX,
  AlertTriangle
} from 'lucide-react';

interface UserDetailsModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onSuspend?: () => void;
  onActivate?: () => void;
  onVerify?: () => void;
  onDelete?: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  isOpen,
  onClose,
  onEdit,
  onSuspend,
  onActivate,
  onVerify,
  onDelete
}) => {
  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#1B5E20]/10 text-[#1B5E20]';
      case 'suspended': return 'bg-red-50 text-red-600';
      case 'inactive': return 'bg-[#EBE3D5]/30 text-[#5D4037]/60';
      default: return 'bg-[#EBE3D5]/20 text-[#5D4037]';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-[#2D1B08] text-white';
      case 'guide': return 'bg-[#F2A900]/10 text-[#F2A900] border-[#F2A900]/20';
      case 'organizer': return 'bg-[#F2A900] text-white';
      case 'security': return 'bg-red-600 text-white';
      case 'tourist': return 'bg-[#1B5E20] text-white';
      default: return 'bg-[#EBE3D5] text-[#5D4037]';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'guide': return 'Guide';
      case 'organizer': return 'Organisateur';
      case 'security': return 'Sécurité';
      case 'tourist': return 'Touriste';
      default: return role;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'suspended': return 'Suspendu';
      case 'inactive': return 'Inactif';
      default: return status;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-none bg-[#FFFDFB] rounded-3xl shadow-2xl p-0">
        <DialogHeader className="p-8 border-b border-[#EBE3D5]/50 bg-[#EBE3D5]/10">
          <DialogTitle className="flex items-center space-x-3 text-2xl font-black uppercase tracking-tighter text-[#2D1B08]">
            <div className="bg-[#F2A900] p-2 rounded-xl text-white">
              <User className="h-6 w-6" />
            </div>
            <span>Détails Profil</span>
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* En-tête avec avatar et informations principales */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            <Avatar className="h-32 w-32 border-4 border-[#F2A900]/20 shadow-xl">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-[#EBE3D5]/20 text-[#5D4037] text-2xl font-black">
                {user.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
                <h2 className="text-3xl font-black text-[#2D1B08] uppercase tracking-tighter">{user.name}</h2>
                {user.verified && (
                  <Badge className="bg-[#1B5E20]/10 text-[#1B5E20] border-none font-black text-[10px] items-center h-6">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    VÉRIFIÉ
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <Badge className={`${getRoleColor(user.role)} border-0`}>
                  <Shield className="h-3 w-3 mr-1" />
                  {getRoleLabel(user.role)}
                </Badge>
                <Badge className={`${getStatusColor(user.status)} border-0`}>
                  {getStatusLabel(user.status)}
                </Badge>
              </div>

              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                Informations de contact
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Téléphone</p>
                    <p className="text-sm text-gray-600">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Localisation</p>
                    <p className="text-sm text-gray-600">{user.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-600" />
                Activité
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Date d'inscription</p>
                    <p className="text-sm text-gray-600">
                      {new Date(user.joinDate).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Dernière connexion</p>
                    <p className="text-sm text-gray-600">
                      {new Date(user.lastLogin).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques d'activité */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-600" />
              Statistiques d'activité
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{user.totalBookings}</p>
                    <p className="text-sm text-blue-800">Réservations</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Star className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">{user.totalReviews}</p>
                    <p className="text-sm text-green-800">Avis laissés</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informations de sécurité */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-purple-600" />
              Informations de sécurité
            </h3>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  {user.verified ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">Statut de vérification</p>
                    <p className="text-sm text-gray-600">
                      {user.verified ? 'Compte vérifié' : 'Compte non vérifié'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Niveau de sécurité</p>
                    <p className="text-sm text-gray-600">
                      {user.verified ? 'Élevé' : 'Standard'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-4 px-8 pb-8">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {user.status === 'active' ? (
              <Button
                variant="outline"
                onClick={onSuspend}
                className="w-full sm:w-auto border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <UserX className="h-4 w-4 mr-2" />
                Suspendre
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={onActivate}
                className="w-full sm:w-auto border-green-500 text-green-600 hover:bg-green-50"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Activer
              </Button>
            )}

            {!user.verified && (
              <Button
                variant="outline"
                onClick={onVerify}
                className="w-full sm:w-auto border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Vérifier
              </Button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={onEdit} className="w-full sm:w-auto">
              Modifier
            </Button>
            <Button
              variant="outline"
              onClick={onDelete}
              className="w-full sm:w-auto border-red-500 text-red-600 hover:bg-red-50"
            >
              Supprimer
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
              <X className="h-4 w-4 mr-2" />
              Fermer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
