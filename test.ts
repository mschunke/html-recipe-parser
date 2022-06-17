// Sample test URLs
// https://tasty.co/recipe/the-best-chewy-chocolate-chip-cookies
// https://www.seriouseats.com/lobster-bisque-recipe
// https://www.allrecipes.com/recipe/8814/homemade-chicken-soup/
// https://www.onceuponachef.com/recipes/perfect-pound-cake.html

import { parseURL } from ".";

async function test() {
  const url = "https://www.onceuponachef.com/recipes/perfect-pound-cake.html";
  const result = await parseURL(url);
  console.log(result);
}

test();
