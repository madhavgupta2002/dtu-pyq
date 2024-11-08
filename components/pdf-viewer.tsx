"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Subject } from "@/lib/types";
import { getEmbedUrl, getDownloadUrl } from "@/lib/utils";

interface PDFViewerProps {
  subject: Subject & { code: string };
}

export function PDFViewer({ subject }: PDFViewerProps) {
  const embedUrl = getEmbedUrl(subject.link);
  const downloadUrl = getDownloadUrl(subject.link);

  return (
    <div className="h-[calc(100vh-270px)] flex flex-col">
      <div className="flex-grow bg-background rounded-lg overflow-hidden border">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="autoplay"
          loading="lazy"
          sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
        ></iframe>
      </div>
      <div className="mt-4 flex items-center justify-between p-4 rounded-lg bg-secondary">
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 mt-1 text-primary" />
          <div>
            <h3 className="font-semibold">{subject.name}</h3>
            <p className="text-sm text-muted-foreground">Cutoff: {subject.cutoff}</p>
          </div>
        </div>
        <Button variant="default" className="bg-primary hover:bg-primary/90" asChild>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </a>
        </Button>
      </div>
    </div>
  );
}