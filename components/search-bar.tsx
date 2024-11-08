"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onDepartmentChange: (department: Department) => void;
}

type Department = 'all' | 'cs' | 'others';

export function SearchBar({ value, onChange, onDepartmentChange }: SearchBarProps) {
  const [department, setDepartment] = useState<Department>('all');

  const handleDepartmentChange = (newDepartment: Department) => {
    setDepartment(newDepartment);
    onDepartmentChange(newDepartment);
    // Clear the search input when switching departments
    onChange('');
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by subject name or code..."
          className="pl-9 bg-background"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant={department === 'all' ? 'default' : 'secondary'}
          onClick={() => handleDepartmentChange('all')}
          className="flex-1"
        >
          All
        </Button>
        <Button
          variant={department === 'cs' ? 'default' : 'secondary'}
          onClick={() => handleDepartmentChange('cs')}
          className="flex-1"
        >
          Computer Science
        </Button>
        <Button
          variant={department === 'others' ? 'default' : 'secondary'}
          onClick={() => handleDepartmentChange('others')}
          className="flex-1"
        >
          Others
        </Button>
      </div>
    </div>
  );
}