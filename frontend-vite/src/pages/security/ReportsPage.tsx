import React, { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReportDetailsModal } from '@/components/modals';
import { 
  Search,
  Shield,
  Flag,
  AlertTriangle,
  Eye,
  CheckCircle,
  X,
  MoreVertical,
  Clock
} from 'lucide-react';

type ReportStatus = 'En attente' | 'En cours' | 'Résolu' | 'Rejeté';
type ReportPriority = 'Haute' | 'Moyenne' | 'Basse';

interface SecurityReport {
  id: string;
  type: string;
  reporter: string;
  location?: string;
  date: string;
  status: ReportStatus;
  priority: ReportPriority;
  description: string;
}

const ReportsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('Tous');
  const [selectedPriority, setSelectedPriority] = useState<string>('Tous');
  const [selectedReport, setSelectedReport] = useState<SecurityReport | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user || user.role !== 'security') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Accès refusé</h2>
          <p className="text-gray-600">Vous devez être agent de sécurité pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  const mockReports: SecurityReport[] = [
    {
      id: 'SR-001',
      type: 'Comportement suspect',
      reporter: 'Amadou Diallo',
      location: "Place de l'Indépendance",
      date: '2024-04-10 14:30',
      status: 'En cours',
      priority: 'Haute',
      description: 'Personne observée à proximité du monument, attitude suspecte.'
    },
    {
      id: 'SR-002',
      type: 'Objet trouvé',
      reporter: 'Fatou Sarr',
      location: 'Marché Sandaga',
      date: '2024-04-09 10:15',
      status: 'Résolu',
      priority: 'Moyenne',
      description: 'Sac à main retrouvé près de l’entrée principale. Déposé au poste.'
    },
    {
      id: 'SR-003',
      type: 'Incident de sécurité',
      reporter: 'Moussa Ba',
      location: 'Gare routière',
      date: '2024-04-08 16:45',
      status: 'En attente',
      priority: 'Haute',
      description: 'Altercation entre deux personnes, besoin de médiation.'
    }
  ];

  const statuses = ['Tous', 'En attente', 'En cours', 'Résolu', 'Rejeté'];
  const priorities = ['Tous', 'Haute', 'Moyenne', 'Basse'];

  const filteredReports = useMemo(() =>
    mockReports.filter(r => {
      const matchSearch = [r.id, r.type, r.reporter, r.location || '', r.description]
        .join(' ')?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = selectedStatus === 'Tous' || r.status === selectedStatus;
      const matchPriority = selectedPriority === 'Tous' || r.priority === selectedPriority;
      return matchSearch && matchStatus && matchPriority;
    }), [searchTerm, selectedStatus, selectedPriority]
  );

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700';
      case 'En cours':
        return 'bg-blue-100 text-blue-700';
      case 'Résolu':
        return 'bg-green-100 text-green-700';
      case 'Rejeté':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: ReportPriority) => {
    switch (priority) {
      case 'Haute':
        return 'bg-red-100 text-red-700';
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-700';
      case 'Basse':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleViewReport = (report: SecurityReport) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleReportAction = (reportId: string, action: string, comment?: string) => {
    console.log('Security action', { reportId, action, comment });
    alert(`Signalement ${reportId} ${action}${comment ? `: ${comment}` : ''}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Signalements</h1>
          <p className="text-gray-600 mt-1">Gérer et suivre les signalements terrain</p>
        </div>
        <Badge className="bg-blue-100 text-blue-700 text-sm">{filteredReports.length} signalement(s)</Badge>
      </div>

      <Card className="shadow-sm mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Rechercher (type, lieu, auteur, id, ...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>

            <div className="flex gap-3">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredReports.length > 0 ? (
        <div className="space-y-4">
          {filteredReports.map((r) => (
            <Card key={r.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={getPriorityColor(r.priority)}>{r.priority}</Badge>
                      <Badge className={getStatusColor(r.status)}>{r.status}</Badge>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {r.date}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                      <Flag className="h-4 w-4" /> {r.type}
                    </h3>
                    <p className="text-gray-600 mb-3">{r.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Signalé par:</span> {r.reporter}
                      </div>
                      {r.location && (
                        <div>
                          <span className="font-medium">Lieu:</span> {r.location}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewReport(r)}>
                      <Eye className="h-4 w-4 mr-1" /> Voir
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleViewReport(r)} title="Actions rapides">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="text-gray-500">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold mb-2">Aucun signalement trouvé</h3>
            <p>Ajustez vos filtres ou réessayez plus tard.</p>
          </div>
        </Card>
      )}

      {selectedReport && (
        <ReportDetailsModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setSelectedReport(null); }}
          report={{
            id: selectedReport.id,
            type: selectedReport.type,
            content: selectedReport.description,
            priority: selectedReport.priority,
            status: selectedReport.status,
            date: selectedReport.date,
            reporter: selectedReport.reporter,
            reporterStatus: 'Actif',
            reporterRole: 'tourist',
            reportedUser: '-',
            reportedUserStatus: '-',
            reportedUserRole: '-',
          } as any}
          onApprove={(id, comment) => handleReportAction(id, 'approuvé', comment)}
          onReject={(id, reason) => handleReportAction(id, 'rejeté', reason)}
          hideBan
          hideWarn
          showWriteReport
          onWriteReport={(id, content) => handleReportAction(id, 'rapport envoyé', content)}
        />
      )}
    </div>
  );
};

export default ReportsPage;


