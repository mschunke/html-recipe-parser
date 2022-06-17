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
};
export function parseURL(url: string): Promise<Recipe>;
export function parseHTML(html: string): Promise<Recipe>;
