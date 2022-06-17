"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNutrition = exports.parseVideo = exports.getRating = exports.getImage = exports.getUrl = exports.parseInstructions = exports.durationToText = exports.getAuthor = exports.parseRecipeToJSON = void 0;
const parse_iso_duration_1 = __importDefault(require("parse-iso-duration"));
const humanize_duration_1 = __importDefault(require("humanize-duration"));
function parseRecipeToJSON(jsonLD) {
    if (!jsonLD)
        return undefined;
    const json = JSON.parse(jsonLD);
    if (Array.isArray(json)) {
        const recipe = json.find((v) => v["@type"].toLowerCase() === "recipe");
        return recipe;
    }
    else {
        return json;
    }
}
exports.parseRecipeToJSON = parseRecipeToJSON;
function getAuthor(author) {
    if (typeof author === "string")
        return author;
    if (Array.isArray(author)) {
        return author[0].name;
    }
    return author === null || author === void 0 ? void 0 : author.name;
}
exports.getAuthor = getAuthor;
function durationToText(duration) {
    try {
        const durationObject = (0, parse_iso_duration_1.default)(duration);
        const durationText = (0, humanize_duration_1.default)(durationObject);
        return durationText;
    }
    catch (error) {
        return undefined;
    }
}
exports.durationToText = durationToText;
function parseInstructions(instructions) {
    if (!instructions)
        return [];
    return instructions.map((v) => v.text || v.name || "");
}
exports.parseInstructions = parseInstructions;
function getUrl(recipe) {
    var _a, _b, _c;
    if (typeof recipe.mainEntityOfPage === "string")
        return recipe.mainEntityOfPage;
    if ((_b = (_a = recipe.mainEntityOfPage) === null || _a === void 0 ? void 0 : _a["@id"]) === null || _b === void 0 ? void 0 : _b.includes("http")) {
        return recipe.mainEntityOfPage["@id"];
    }
    const url = typeof recipe.isPartOf === "string"
        ? recipe.isPartOf
        : (_c = recipe.isPartOf) === null || _c === void 0 ? void 0 : _c.url;
    return url;
}
exports.getUrl = getUrl;
function getImage(image) {
    if (!image)
        return undefined;
    if (typeof image === "string")
        return image;
    if (Array.isArray(image))
        return image[0].url;
    return image.url;
}
exports.getImage = getImage;
function getRating(rating) {
    if (!rating)
        return undefined;
    return parseFloat(rating.ratingValue);
}
exports.getRating = getRating;
function parseVideo(video) {
    if (!video)
        return {};
    if (typeof video === "string")
        return { videoUrl: video };
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
exports.parseVideo = parseVideo;
function getNutrition(nutrition) {
    if (!nutrition)
        return undefined;
    return nutrition;
}
exports.getNutrition = getNutrition;
