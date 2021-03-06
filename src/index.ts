import { IRecipe } from "./interfaces";
import fetch from "node-fetch";
import { parseRecipe } from "./helpers/parser";

async function downloadHTML(url: string): Promise<string> {
  const response = await fetch(url);
  return response.text();
}

async function parseHTML(html: string): Promise<IRecipe | string> {
  const recipe = parseRecipe(html);
  return recipe;
}

async function parseURL(url: string): Promise<IRecipe | string> {
  const html = await downloadHTML(url);
  const parsedHTML = await parseHTML(html);
  return parsedHTML;
}

export { parseURL, parseHTML, IRecipe as Recipe };
