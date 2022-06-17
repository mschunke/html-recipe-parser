export type Recipe = {
  name?: string;
  sourceUrl?: string;
  ingredients?: string[];
  instructions?: string[];
  imageUrl?: string;
  author?: string;
  datePublished?: Date;
  prepTime?: string;
  cookTime?: string;
  keywords?: string[];
  yeld?: string;
  rating?: number;
  nutrition?: {
    calories?: string;
    carbohydrateContent?: string;
    fatContent?: string;
    fiberContent?: string;
    proteinContent?: string;
    sugarContent?: string;
  };
  category?: string[];
  cuisine?: string[];
  videoUrl?: string;
  videoThumbnail?: string;
  videoTitle?: string;
};
export function parseURL(url: string): Promise<Recipe | string>;
export function parseHTML(html: string): Promise<Recipe | string>;
