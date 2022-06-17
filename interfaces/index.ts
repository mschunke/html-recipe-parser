export interface IRecipe {
  name?: string;
  sourceUrl?: string;
  ingredients?: string[];
  instructions?: string[];
  imageUrl?: string;
  author?: string;
  datePublished?: Date;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  keywords?: string[];
  yeld?: string;
  rating?: number;
  nutrition?: ISchemaRecipe["nutrition"];
  category?: string[];
  cuisine?: string[];
  videoUrl?: string;
  videoThumbnail?: string;
  videoTitle?: string;
}

export interface ISchemaRecipe {
  "@context": string;
  "@type": string;
  name?: string;
  description?: string;
  image?: string | ESImageObject | ESImageObject[];
  dateModified?: string;
  datePublished?: string;
  publisher?: string | IESPublisher;
  isPartOf?: string | IESIsPartOf;
  keywords?: string;
  author?: string | IESPublisher | IESPublisher[];
  nutrition?: {
    calories: string;
    carbohydrateContent: string;
    fatContent: string;
    fiberContent: string;
    proteinContent: string;
    sugarContent: string;
  };
  recipeIngredient?: string[];
  recipeInstructions?: ESHowToStep[];
  recipeYield?: string;
  aggregateRating?: {
    ratingValue: string;
    ratingCount: string;
    bestRating: string;
    worstRating: string;
  };
  cookingMethod?: string | string[];
  recipeCategory?: string | string[];
  recipeCuisine?: string | string[];
  tool?: string | string[];
  cookTime?: string;
  prepTime?: string;
  totalTime?: string;
  video?: string | ESVideoObject;
  mainEntityOfPage?: string | ESMainEntityOfPage;
}

interface ESImageObject {
  "@type": string;
  url?: string;
  width?: number;
  height?: number;
}

interface ESVideoObject {
  "@type": string;
  contentUrl?: string;
  name?: string;
  description?: string;
  thumbnailUrl?: string;
  duration?: string;
  uploadDate?: string;
  publisher?: string | IESPublisher;
  embedUrl?: string;
}

interface ESHowToStep {
  "@type": string;
  name?: string;
  text?: string;
  url?: string;
  image?: string;
}

interface IESPublisher {
  "@type": string;
  name?: string;
  logo?: string | ESImageObject;
}

interface IESIsPartOf {
  "@type": string;
  name?: string;
  url?: string;
  description?: string;
  isPartOf?: IESIsPartOf;
}

interface ESMainEntityOfPage {
  "@type"?: string | string[];
  "@id"?: string;
  // breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [Array] }
}
