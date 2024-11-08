"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SubjectList } from "@/components/subject-list";
import { PDFViewer } from "@/components/pdf-viewer";
import { SearchBar } from "@/components/search-bar";
import { ThemeToggle } from "@/components/theme-toggle";
import { subjectsData } from "@/lib/data";
import { GroupedSubjects } from "@/lib/types";
import { BookOpen, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDepartment, setCurrentDepartment] = useState<'all' | 'cs' | 'others'>('all');

  const filteredAndGroupedSubjects = Object.entries(subjectsData).reduce((acc, [code, data]) => {
    const matchesSearch =
      data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      currentDepartment === 'all' ||
      (currentDepartment === 'cs' && code.startsWith('CO')) ||
      (currentDepartment === 'others' && !code.startsWith('CO'));

    if (matchesSearch && matchesDepartment) {
      const sem = data.semester;
      if (!acc[sem]) acc[sem] = [];
      acc[sem].push({ code, ...data });
      acc[sem].sort((a, b) => a.code.localeCompare(b.code));
    }
    return acc;
  }, {} as GroupedSubjects);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">DTU PYQ Solutions</h1>
            </div>
            <div className="flex items-center gap-6">
              <Button
                variant="outline"
                className="gap-3 text-primary hover:text-primary px-6 py-5 text-lg"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/madhavgupta2002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <span>Made by Madhav Gupta</span>
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <ThemeToggle />
            </div>
          </div>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onDepartmentChange={setCurrentDepartment}
          />
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-[450px_1fr] gap-6">
          <Card className="p-4 h-[calc(100vh-220px)] bg-card">
            <SubjectList
              groupedSubjects={filteredAndGroupedSubjects}
              selectedSubject={selectedSubject}
              onSubjectSelect={setSelectedSubject}
            />
          </Card>

          <Card className="p-4 h-[calc(100vh-220px)] bg-card">
            <div className="max-w-[800px] mx-auto h-full">
              {selectedSubject ? (
                <PDFViewer
                  subject={{ code: selectedSubject, ...subjectsData[selectedSubject] }}
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <BookOpen className="h-24 w-24 mb-6 opacity-50" />
                  <p className="text-xl">Select a subject to view its PYQ solutions</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}