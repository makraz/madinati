export type Lang = "fr" | "en" | "ar";

export type Localized = { fr: string; en: string; ar: string };

export type Category = "route" | "eclairage" | "proprete" | "espaces-verts" | "securite";
export type IssueStatus = "ouvert" | "en-cours" | "resolu";
export type ProjectStatus = "planifie" | "en-cours" | "termine";
export type MarkerType = "issue" | "proposal" | "project";

export interface Update {
  date: string;
  text: Localized;
}

export interface Issue {
  id: string;
  ref: string; // ex: MRK-48102
  title: Localized;
  description: Localized;
  category: Category;
  status: IssueStatus;
  lat: number;
  lng: number;
  landmarkId: string;
  photo: string; // data-URI (photo d'exemple) ou URL
  upvotes: number;
  supportedByMe: boolean;
  reporter: string; // nom, ou clé "you" pour l'utilisateur courant
  createdAt: string;
  updates: Update[];
}

export interface Proposal {
  id: string;
  title: Localized;
  description: Localized;
  author: string;
  category: Category;
  lat: number;
  lng: number;
  landmarkId: string;
  votes: number;
  votedByMe: boolean;
  status: "proposee" | "retenue";
  createdAt: string;
}

export interface Milestone {
  label: Localized;
  date: string;
  done: boolean;
}

export interface Project {
  id: string;
  title: Localized;
  description: Localized;
  category: Category;
  lat: number;
  lng: number;
  landmarkId: string;
  status: ProjectStatus;
  progress: number; // 0-100
  budget: string;
  startDate: string;
  endDate: string;
  milestones: Milestone[];
}

export interface Landmark {
  id: string;
  name: Localized;
  lat: number;
  lng: number;
}

export interface ExamplePhoto {
  id: string;
  label: Localized;
  src: string; // data-URI SVG, fonctionne hors ligne
}

export interface Draft {
  landmarkId: string;
  category: Category;
  description: string;
  photoId: string;
}

export interface Toast {
  id: number;
  msg: string;
}

export type View = "map" | "proposals";

export interface Selected {
  type: MarkerType;
  id: string;
}
