"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRecipe = void 0;
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const helpers_1 = require("./helpers");
function parseRecipe(html) {
    const root = (0, node_html_parser_1.default)(html, {
        lowerCaseTagName: true,
    });
    const jsonLD = root.querySelector("script[type='application/ld+json']");
    if (!jsonLD)
        throw new Error("No JSON-LD found");
    const recipeRaw = (0, helpers_1.parseRecipeToJSON)(jsonLD.rawText);
    if (!recipeRaw)
        throw new Error("Error parsing recipe");
    const author = (0, helpers_1.getAuthor)(recipeRaw.author);
    const datePublished = recipeRaw.datePublished
        ? new Date(recipeRaw.datePublished)
        : undefined;
    const sourceUrl = (0, helpers_1.getUrl)(recipeRaw);
    const cookTime = recipeRaw.cookTime
        ? (0, helpers_1.durationToText)(recipeRaw.cookTime)
        : undefined;
    const imageUrl = (0, helpers_1.getImage)(recipeRaw.image);
    const keywords = recipeRaw.keywords
        ? recipeRaw.keywords.split(",").map((v) => v.trim())
        : [];
    const prepTime = recipeRaw.prepTime
        ? (0, helpers_1.durationToText)(recipeRaw.prepTime)
        : undefined;
    const ingredients = recipeRaw.recipeIngredient;
    const instructions = (0, helpers_1.parseInstructions)(recipeRaw.recipeInstructions);
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
    const rating = (0, helpers_1.getRating)(recipeRaw.aggregateRating);
    const totalTime = recipeRaw.totalTime
        ? (0, helpers_1.durationToText)(recipeRaw.totalTime)
        : undefined;
    const yeld = recipeRaw.recipeYield;
    const { videoThumbnail, videoTitle, videoUrl } = (0, helpers_1.parseVideo)(recipeRaw.video);
    const nutrition = (0, helpers_1.getNutrition)(recipeRaw.nutrition);
    const recipe = {
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
    return recipe;
}
exports.parseRecipe = parseRecipe;
