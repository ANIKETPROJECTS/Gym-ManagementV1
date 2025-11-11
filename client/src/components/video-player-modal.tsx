import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Play } from "lucide-react";
import { useState } from "react";

interface VideoPlayerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoTitle: string;
  videoCategory: string;
  videoDuration: string;
  videoThumbnail: string;
}

export function VideoPlayerModal({
  open,
  onOpenChange,
  videoTitle,
  videoCategory,
  videoDuration,
  videoThumbnail,
}: VideoPlayerModalProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    console.log(`Marked "${videoTitle}" as completed`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{videoTitle}</DialogTitle>
          <div className="flex items-center gap-3 pt-2">
            <Badge variant="outline">{videoCategory}</Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {videoDuration}
            </Badge>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
            <img
              src={videoThumbnail}
              alt={videoTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-primary rounded-full p-6 cursor-pointer hover-elevate">
                <Play className="h-12 w-12 text-primary-foreground fill-current" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              This is a demo player. In production, the actual video would play here.
            </p>
            <Button
              onClick={handleComplete}
              disabled={completed}
              data-testid="button-mark-complete"
              className={completed ? "bg-chart-3" : ""}
            >
              {completed ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                "Mark as Complete"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
