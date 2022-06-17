import parseIsoDuration from "parse-iso-duration";
import { ISchemaRecipe } from "../interfaces";
import humanizeDuration from "humanize-duration";

export function parseRecipeToJSON(jsonLD: string): ISchemaRecipe | undefined {
  if (!jsonLD) return undefined;

  const json = JSON.parse(jsonLD);

  if (Array.isArray(json)) {
    const recipe = json.find((v) => v["@type"].toLowerCase() === "recipe");
    return recipe as ISchemaRecipe;
  } else {
    return json as ISchemaRecipe;
  }
}

export function getAuthor(author: ISchemaRecipe["author"]): string | undefined {
  if (typeof author === "string") return author;

  if (Array.isArray(author)) {
    return author[0].name;
  }
  return author?.name;
}

export function durationToText(duration: string): string | undefined {
  try {
    const durationObject = parseIsoDuration(duration);
    const durationText = humanizeDuration(durationObject);
    return durationText;
  } catch (error) {
    return undefined;
  }
}

export function parseInstructions(
  instructions: ISchemaRecipe["recipeInstructions"]
): string[] {
  if (!instructions) return [];
  return instructions.map((v) => v.text || v.name || "");
}

export function getUrl(recipe: ISchemaRecipe): string | undefined {
  if (typeof recipe.mainEntityOfPage === "string")
    return recipe.mainEntityOfPage;
  if (recipe.mainEntityOfPage?.["@id"]?.includes("http")) {
    return recipe.mainEntityOfPage["@id"];
  }
  const url =
    typeof recipe.isPartOf === "string"
      ? recipe.isPartOf
      : recipe.isPartOf?.url;
  return url;
}

export function getImage(image: ISchemaRecipe["image"]): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return image;
  if (Array.isArray(image)) return image[0].url;
  return image.url;
}

export function getRating(
  rating: ISchemaRecipe["aggregateRating"]
): number | undefined {
  if (!rating) return undefined;

  return parseFloat(rating.ratingValue);
}

export function parseVideo(video: ISchemaRecipe["video"]): {
  videoUrl?: string;
  videoThumbnail?: string;
  videoTitle?: string;
} {
  if (!video) return {};
  if (typeof video === "string") return { videoUrl: video };
  if (Array.isArray(video))
    return {
      videoUrl: video[0].url || video[0].embedUrl,
      videoThumbnail: video[0].thumbnailUrl,
      videoTitle: video[0].name,
    };
  return {
    videoThumbnail: video.thumbnailUrl,
    videoTitle: video.name,
    videoUrl: video.contentUrl || video.embedUrl,
  };
}
