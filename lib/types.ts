export interface Subject {
  name: string;
  link: string;
  cutoff: string;
  semester: string;
}

export interface SubjectData {
  [key: string]: Subject;
}

export interface GroupedSubjects {
  [key: string]: Array<Subject & { code: string }>;
}