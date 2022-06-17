# HTML Recipe Scraper

A easy to use library to extract recipe information from any URL or HTML file compliant with schema.org's recipe schema. Available at [https://schema.org/recipe](https://schema.org/recipe).

Built with Typescript, types already included.

Currently only pages that present the information in the **JSON+LD** schema are supported. Most major recipe websites use this schema, which is also Google's recommendation.

## Installation

`npm install html-recipe-scraper`

## Reference

- `type Recipe (See format below)`
- `function parseURL(url: string): Promise<Recipe>`;
- `function parseHTML(html: string): Promise<Recipe>`;

Both `parseURL` and `parseHTML` return exactly the same results, the difference is that the URL function will downlaod the page and send it to `parseHTML` for processing.

## Basic usage

```
import { parseURL, parseHTML } from 'html-recipe-parser'

const myUrl = https://www.recipeswebsite.com/some-delicious-cookie

const recipe = await parseURL(myUrl)

// or with then/catch
parseURL(myUrl)
  .then(recipe => console.log(recipe))
  .catch(e => console.log(e))
```

### Recipe Type format

```
type Recipe = {
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
  nutrition?: {
    calories?: string;
    carbohydrateContent?: string;
    fatContent?: string;
    fiberContent?: string;
    proteinContent?: string;
    sugarContent?: string;
  };
  category?: string[];
  cuisine?: string[];
  videoUrl?: string;
  videoThumbnail?: string;
  videoTitle?: string;
}
```

### License

MIT
