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
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'guide': return 'bg-blue-100 text-blue-800';
      case 'organizer': return 'bg-orange-100 text-orange-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'tourist': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Détails de l'utilisateur</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* En-tête avec avatar et informations principales */}
          <div className="flex items-start space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                {user.verified && (
                  <CheckCircle className="h-6 w-6 text-green-500" title="Utilisateur vérifié" />
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

        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            {user.status === 'active' ? (
              <Button 
                variant="outline" 
                onClick={onSuspend}
                className="border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <UserX className="h-4 w-4 mr-2" />
                Suspendre
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={onActivate}
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Activer
              </Button>
            )}
            
            {!user.verified && (
              <Button 
                variant="outline" 
                onClick={onVerify}
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Vérifier
              </Button>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onEdit}>
              Modifier
            </Button>
            <Button 
              variant="outline" 
              onClick={onDelete}
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              Supprimer
            </Button>
            <Button variant="outline" onClick={onClose}>
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
