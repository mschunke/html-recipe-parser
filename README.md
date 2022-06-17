# HTML Recipe Parser

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

MIT License

Copyright (c) 2022 Murilo Schünke

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
