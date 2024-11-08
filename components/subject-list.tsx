"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FileText, GraduationCap } from "lucide-react";
import { GroupedSubjects } from "@/lib/types";

interface SubjectListProps {
  groupedSubjects: GroupedSubjects;
  selectedSubject: string | null;
  onSubjectSelect: (code: string) => void;
}

export function SubjectList({ groupedSubjects, selectedSubject, onSubjectSelect }: SubjectListProps) {
  const semesters = Object.keys(groupedSubjects).sort();

  if (semesters.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
        <GraduationCap className="h-12 w-12 mb-4 opacity-50" />
        <p>No subjects found</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-270px)]">
      {semesters.map((semester) => (
        <div key={semester} className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-primary">Semester {semester}</span>
          </h2>
          <div className="space-y-2">
            {groupedSubjects[semester].map(({ code, name }) => (
              <Button
                key={code}
                variant={selectedSubject === code ? "default" : "secondary"}
                className={`w-full justify-start transition-colors p-2.5 h-auto ${selectedSubject === code
                    ? "bg-primary hover:bg-primary/90"
                    : "hover:bg-secondary/80"
                  }`}
                onClick={() => onSubjectSelect(code)}
              >
                <FileText className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">{code}</div>
                  <div className="text-sm text-muted-foreground truncate">{name}</div>
                </div>
              </Button>
            ))}
          </div>
          {semester !== semesters[semesters.length - 1] && (
            <Separator className="my-4" />
          )}
        </div>
      ))}
    </ScrollArea>
  );
}