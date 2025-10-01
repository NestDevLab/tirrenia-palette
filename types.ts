export interface Color {
  name: string;
  hex: string;
  note?: string;
}

export interface PaletteSectionData {
  title: string;
  icon: string;
  imageUrl: string;
  colors: Color[];
}