import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { AlertCircle, Bell, Info, Pin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Announcement {
  _id: string;
  title: string;
  content: string;
  type: 'info' | 'important' | 'urgent';
  targetAudience: 'all' | 'basic' | 'premium' | 'elite';
  createdBy: string;
  isPinned: boolean;
  createdAt: string;
  expiresAt?: string;
}

export default function AnnouncementsPage() {
  const { t } = useLanguage();

  const { data: announcements, isLoading } = useQuery<Announcement[]>({
    queryKey: ['/api/announcements'],
  });

  const pinnedAnnouncements = announcements?.filter(a => a.isPinned) || [];
  const regularAnnouncements = announcements?.filter(a => !a.isPinned) || [];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-destructive" data-testid="icon-urgent" />;
      case 'important':
        return <Bell className="w-5 h-5 text-orange-500" data-testid="icon-important" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" data-testid="icon-info" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'destructive';
      case 'important':
        return 'default';
      default:
        return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full" data-testid="loading-announcements">
        <div className="text-center">
          <div className="text-lg font-medium">{t('common.loading')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-page-title">{t('comm.announcementFeed')}</h1>
            <p className="text-muted-foreground mt-1">
              {announcements && announcements.length > 0
                ? `${announcements.length} ${announcements.length === 1 ? 'announcement' : 'announcements'}`
                : t('comm.noAnnouncements')}
            </p>
          </div>
        </div>

        {(!announcements || announcements.length === 0) && (
          <Card data-testid="card-no-announcements">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">{t('comm.noAnnouncements')}</p>
            </CardContent>
          </Card>
        )}

        {pinnedAnnouncements.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Pin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">{t('comm.pinned')}</h2>
            </div>
            
            {pinnedAnnouncements.map((announcement) => (
              <Card 
                key={announcement._id} 
                className="border-l-4 border-l-primary"
                data-testid={`card-announcement-${announcement._id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {getTypeIcon(announcement.type)}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl mb-2" data-testid={`text-title-${announcement._id}`}>
                          {announcement.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={getTypeBadgeVariant(announcement.type)} data-testid={`badge-type-${announcement._id}`}>
                            {announcement.type === 'urgent' ? t('comm.important') : 
                             announcement.type === 'important' ? t('comm.important') : 
                             t('comm.info')}
                          </Badge>
                          <Badge variant="outline" data-testid={`badge-pinned-${announcement._id}`}>
                            {t('comm.pinned')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 whitespace-pre-wrap" data-testid={`text-content-${announcement._id}`}>
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span data-testid={`text-date-${announcement._id}`}>
                      {t('comm.postedOn')} {formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {regularAnnouncements.length > 0 && (
          <div className="space-y-4">
            {pinnedAnnouncements.length > 0 && (
              <h2 className="text-xl font-semibold">{t('comm.announcements')}</h2>
            )}
            
            {regularAnnouncements.map((announcement) => (
              <Card 
                key={announcement._id}
                data-testid={`card-announcement-${announcement._id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {getTypeIcon(announcement.type)}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl mb-2" data-testid={`text-title-${announcement._id}`}>
                          {announcement.title}
                        </CardTitle>
                        <Badge variant={getTypeBadgeVariant(announcement.type)} data-testid={`badge-type-${announcement._id}`}>
                          {announcement.type === 'urgent' ? t('comm.important') : 
                           announcement.type === 'important' ? t('comm.important') : 
                           t('comm.info')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 whitespace-pre-wrap" data-testid={`text-content-${announcement._id}`}>
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span data-testid={`text-date-${announcement._id}`}>
                      {t('comm.postedOn')} {formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
