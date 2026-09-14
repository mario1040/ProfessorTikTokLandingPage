export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'MODERN' | 'CONTEMPORARY' | 'NEO CLASSIC' | 'NATURAL' | 'ELEGANT' | 'SPACE SMART';
  description: string;
  image: string;
  material: string;
  tags?: string[];
  specs?: {
    warranty: string;
    hardware: string;
    countertop: string;
  };
}

export interface MaterialInfo {
  id: string;
  name: string;
  badge: string;
  description: string;
  bestFor: string;
  features: string[];
  durability: number;
  waterResist: number;
  heatResist: number;
  image: string;
  color: string;
}

export interface EstimatorChoice {
  layout: string;
  layoutName: string;
  material: string;
  materialName: string;
  size: string;
  sizeName: string;
}
