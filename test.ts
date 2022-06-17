// Sample test URLs
// https://tasty.co/recipe/the-best-chewy-chocolate-chip-cookies
// https://www.seriouseats.com/lobster-bisque-recipe
// https://www.allrecipes.com/recipe/8814/homemade-chicken-soup/

import { parseURL } from ".";

async function test() {
  const url = "https://tasty.co/recipe/the-best-chewy-chocolate-chip-cookies";
  const result = await parseURL(url);
  console.log(result);
}

test();
