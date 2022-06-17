import parse from "node-html-parser";
import { IRecipe } from "../interfaces";
import { ERRORS } from "./errors";
import {
  durationToText,
  getAuthor,
  getImage,
  getRating,
  getUrl,
  parseInstructions,
  parseVideo,
  parseRecipeToJSON,
  getNutrition,
} from "./helpers";

export function parseRecipe(html: string): IRecipe | string {
  try {
    const root = parse(html, {
      lowerCaseTagName: true,
    });
    const jsonLD = root.querySelector("script[type='application/ld+json']");
    if (!jsonLD) throw ERRORS.NO_JSON_LD;
    const recipeRaw = parseRecipeToJSON(jsonLD.rawText);
    if (!recipeRaw) throw ERRORS.PARSING_ERROR;
    const author = getAuthor(recipeRaw.author);
    const datePublished = recipeRaw.datePublished
      ? new Date(recipeRaw.datePublished)
      : undefined;
    const sourceUrl = getUrl(recipeRaw);
    const cookTime = recipeRaw.cookTime
      ? durationToText(recipeRaw.cookTime)
      : undefined;
    const imageUrl = getImage(recipeRaw.image);
    const keywords = recipeRaw.keywords
      ? recipeRaw.keywords.split(",").map((v) => v.trim())
      : [];
    const prepTime = recipeRaw.prepTime
      ? durationToText(recipeRaw.prepTime)
      : undefined;
    const ingredients = recipeRaw.recipeIngredient;
    const instructions = parseInstructions(recipeRaw.recipeInstructions);
    const category = Array.isArray(recipeRaw.recipeCategory)
      ? recipeRaw.recipeCategory
      : recipeRaw.recipeCategory
      ? [recipeRaw.recipeCategory]
      : undefined;
    const cuisine = Array.isArray(recipeRaw.recipeCuisine)
      ? recipeRaw.recipeCuisine
      : recipeRaw.recipeCuisine
      ? [recipeRaw.recipeCuisine]
      : undefined;
    const rating = getRating(recipeRaw.aggregateRating);
    const totalTime = recipeRaw.totalTime
      ? durationToText(recipeRaw.totalTime)
      : undefined;
    const yeld = recipeRaw.recipeYield;
    const { videoThumbnail, videoTitle, videoUrl } = parseVideo(
      recipeRaw.video
    );
    const nutrition = getNutrition(recipeRaw.nutrition);

    const recipe: IRecipe = {
      name: recipeRaw.name,
      author,
      datePublished,
      sourceUrl,
      cookTime,
      imageUrl,
      keywords,
      prepTime,
      ingredients,
      instructions,
      category,
      cuisine,
      rating,
      totalTime,
      yeld,
      videoThumbnail,
      videoTitle,
      videoUrl,
      nutrition,
    };

    if (!recipe.name || !recipe.imageUrl) {
      throw ERRORS.MISSING_DATA;
    }

    return recipe;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "Unknown error";
    }
  }
}
