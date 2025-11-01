import React, { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Flag, 
  MessageSquare, 
  AlertTriangle, 
  User, 
  Mail, 
  Phone,
  MapPin,
  Calendar,
  Star,
  Send,
  CheckCircle,
  ThumbsUp,
  Reply
} from 'lucide-react';

// Données mockées pour les commentaires
const mockComments = [
  {
    id: '1',
    author: { name: 'Marie Diop', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'Touriste' },
    content: 'Excellente plateforme ! Les guides sont très professionnels et les événements bien organisés.',
    rating: 5,
    category: 'Retour d\'expérience',
    date: '2024-01-15',
    likes: 12,
    replies: 3
  },
  {
    id: '2',
    author: { name: 'Amadou Fall', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'Local' },
    content: 'Suggestion : Ajouter plus d\'événements culturels traditionnels.',
    rating: null,
    category: 'Suggestion d\'amélioration',
    date: '2024-01-14',
    likes: 8,
    replies: 1
  },
  {
    id: '3',
    author: { name: 'Fatou Sarr', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'Guide' },
    content: 'Très satisfaite de la plateforme. Les touristes sont respectueux et les paiements sont sécurisés.',
    rating: 5,
    category: 'Retour d\'expérience',
    date: '2024-01-13',
    likes: 15,
    replies: 2
  }
];

const SignalerPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('report');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [commentsFilter, setCommentsFilter] = useState('all');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  // États pour le formulaire de signalement
  const [reportData, setReportData] = useState({
    type: '',
    targetType: '',
    targetName: '',
    description: '',
    priority: 'Moyenne',
    evidence: '',
    contactMethod: 'email',
    email: '',
    phone: ''
  });

  // États pour le formulaire de commentaire
  const [commentData, setCommentData] = useState({
    content: '',
    category: '',
    rating: null as number | null,
    contactMethod: 'email',
    contactInfo: ''
  });

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setCommentData({
      content: '',
      category: '',
      rating: null,
      contactMethod: 'email',
      contactInfo: ''
    });
    
    // Afficher un message de confirmation
    alert('Votre commentaire a été soumis et sera publié après approbation par notre équipe de modération.');
  };

  const handleInputChange = (field: string, value: string) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const handleCommentInputChange = (field: string, value: string | number | null) => {
    setCommentData(prev => ({ ...prev, [field]: value }));
  };

  const handleLikeComment = (commentId: string) => {
    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const filteredComments = useMemo(() => {
    return mockComments.filter(comment => {
      if (commentsFilter === 'all') return true;
      if (commentsFilter === 'with-rating') return comment.rating !== null;
      if (commentsFilter === 'suggestions') return comment.category === 'Suggestion d\'amélioration';
      if (commentsFilter === 'experiences') return comment.category === 'Retour d\'expérience';
      return true;
    });
  }, [commentsFilter]);

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Signalement Envoyé</h2>
            <p className="text-gray-600 mb-6">
              Votre signalement a été transmis à notre équipe de modération. 
              Nous vous contacterons dans les plus brefs délais.
            </p>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setReportData({
                  type: '',
                  targetType: '',
                  targetName: '',
                  description: '',
                  priority: 'Moyenne',
                  evidence: '',
                  contactMethod: 'email',
                  email: '',
                  phone: ''
                });
              }}
              className="w-full"
            >
              Nouveau Signalement
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Signaler / Commenter</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Signalez des problèmes ou partagez vos commentaires pour améliorer notre plateforme.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="report" className="flex items-center space-x-2">
              <Flag className="h-4 w-4" />
              <span>Signaler</span>
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Commentaires</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="report" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <span>Nouveau Signalement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReportSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Type de signalement</Label>
                      <Select value={reportData.type} onValueChange={(value) => handleInputChange('type', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inappropriate">Contenu inapproprié</SelectItem>
                          <SelectItem value="spam">Spam</SelectItem>
                          <SelectItem value="harassment">Harcèlement</SelectItem>
                          <SelectItem value="fake">Faux profil</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="priority">Priorité</Label>
                      <Select value={reportData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Faible">Faible</SelectItem>
                          <SelectItem value="Moyenne">Moyenne</SelectItem>
                          <SelectItem value="Élevée">Élevée</SelectItem>
                          <SelectItem value="Urgente">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description détaillée</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez le problème en détail..."
                      value={reportData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="evidence">Preuves (optionnel)</Label>
                    <Textarea
                      id="evidence"
                      placeholder="Liens, captures d'écran, ou autres preuves..."
                      value={reportData.evidence}
                      onChange={(e) => handleInputChange('evidence', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email de contact</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={reportData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone (optionnel)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+221 XX XXX XX XX"
                        value={reportData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !reportData.type || !reportData.description || !reportData.email}
                      className="flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Envoyer le signalement</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-blue-500" />
                        <span>Commentaires Publics</span>
                      </CardTitle>
                      <Badge variant="secondary">
                        {mockComments.length}
                      </Badge>
                    </div>
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Note :</strong> Les commentaires sont modérés avant publication. 
                        Seuls les commentaires approuvés par notre équipe apparaissent ici.
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredComments.map((comment) => (
                        <div key={comment.id} className="border rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <img
                              src={comment.author.avatar}
                              alt={comment.author.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium">{comment.author.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {comment.author.role}
                                </Badge>
                                {comment.rating && (
                                  <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < comment.rating! ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                              <p className="text-gray-700 mb-3">{comment.content}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <button
                                    onClick={() => handleLikeComment(comment.id)}
                                    className={`flex items-center space-x-1 px-2 py-1 rounded-full transition-colors ${
                                      likedComments.has(comment.id)
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'hover:bg-gray-100 text-gray-500'
                                    }`}
                                  >
                                    <ThumbsUp className="h-4 w-4" />
                                    <span className="font-medium">
                                      {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                                    </span>
                                  </button>
                                  <button className="flex items-center space-x-1 px-2 py-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                                    <Reply className="h-4 w-4" />
                                    <span className="font-medium">{comment.replies}</span>
                                  </button>
                                </div>
                                <span className="text-sm text-gray-500">{comment.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Filtres</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant={commentsFilter === 'all' ? 'default' : 'ghost'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setCommentsFilter('all')}
                      >
                        Tous ({mockComments.length})
                      </Button>
                      <Button
                        variant={commentsFilter === 'with-rating' ? 'default' : 'ghost'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setCommentsFilter('with-rating')}
                      >
                        Avec notes ({mockComments.filter(c => c.rating !== null).length})
                      </Button>
                      <Button
                        variant={commentsFilter === 'suggestions' ? 'default' : 'ghost'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setCommentsFilter('suggestions')}
                      >
                        Suggestions ({mockComments.filter(c => c.category === 'Suggestion d\'amélioration').length})
                      </Button>
                      <Button
                        variant={commentsFilter === 'experiences' ? 'default' : 'ghost'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setCommentsFilter('experiences')}
                      >
                        Expériences ({mockComments.filter(c => c.category === 'Retour d\'expérience').length})
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ajouter un Commentaire</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="comment-content">Votre commentaire</Label>
                        <Textarea
                          id="comment-content"
                          placeholder="Partagez votre expérience ou vos suggestions..."
                          value={commentData.content}
                          onChange={(e) => handleCommentInputChange('content', e.target.value)}
                          rows={3}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="comment-category">Catégorie</Label>
                        <Select value={commentData.category} onValueChange={(value) => handleCommentInputChange('category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Retour d'expérience">Retour d'expérience</SelectItem>
                            <SelectItem value="Suggestion d'amélioration">Suggestion d'amélioration</SelectItem>
                            <SelectItem value="Question">Question</SelectItem>
                            <SelectItem value="Autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="comment-rating">Note (optionnel)</Label>
                        <Select 
                          value={commentData.rating?.toString() || ''} 
                          onValueChange={(value) => handleCommentInputChange('rating', value ? parseInt(value) : null)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une note" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 étoiles</SelectItem>
                            <SelectItem value="4">4 étoiles</SelectItem>
                            <SelectItem value="3">3 étoiles</SelectItem>
                            <SelectItem value="2">2 étoiles</SelectItem>
                            <SelectItem value="1">1 étoile</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting || !commentData.content || !commentData.category}
                        className="w-full"
                      >
                        {isSubmitting ? 'Envoi en cours...' : 'Publier le commentaire'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Section Règles et Politiques */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Règles et Politiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">🔒 Confidentialité</h3>
              <p className="mb-4">
                Tous vos signalements sont traités de manière strictement confidentielle. 
                Vos informations personnelles ne seront jamais partagées avec des tiers.
              </p>
              
              <h3 className="font-medium text-gray-800 mb-2">⚖️ Traitement</h3>
              <p>
                Chaque signalement est examiné par notre équipe de modération dans les 24-48h. 
                Nous vous contacterons uniquement si des informations supplémentaires sont nécessaires.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">✅ Commentaires</h3>
              <p className="mb-4">
                Les commentaires sont soumis à modération avant publication. 
                Seuls les commentaires respectueux et constructifs seront approuvés.
              </p>
              
              <h3 className="font-medium text-gray-800 mb-2">🚫 Interdictions</h3>
              <p>
                Sont interdits : le spam, le harcèlement, les propos discriminatoires, 
                les fausses informations et tout contenu illégal.
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              En utilisant ce service, vous acceptez nos conditions d'utilisation et notre politique de confidentialité. 
              Pour toute question, contactez-nous à : support@discoversenegal.sn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalerPage;
