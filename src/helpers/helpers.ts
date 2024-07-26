import parseIsoDuration from "parse-iso-duration";
import { IRecipe, ISchemaRecipe } from "../interfaces";
import humanizeDuration from "humanize-duration";
import { HTMLElement } from "node-html-parser";

export function parseJSONListToRecipe(
  jsonList: HTMLElement[]
): ISchemaRecipe | undefined {
  if (!jsonList.length) return;

  const parsedJSONList: any[] = jsonList.map((jsonLD) =>
    JSON.parse(jsonLD.rawText)
  );

  let recipe = parsedJSONList.find((v) => {
    const type = v["@type"];
    return Array.isArray(type)
      ? type.some(
          (item) => typeof item === "string" && item.toLowerCase() === "recipe"
        )
      : typeof type === "string" && type.toLowerCase() === "recipe";
  });

  // Fallback to the first parsed JSON Object
  if (!recipe && parsedJSONList.length > 0) {
    recipe = parsedJSONList[0];
  }

  return recipe as ISchemaRecipe | undefined;
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

export function getNutrition(
  nutrition: ISchemaRecipe["nutrition"]
): IRecipe["nutrition"] | undefined {
  if (!nutrition) return undefined;
  return nutrition;
}
