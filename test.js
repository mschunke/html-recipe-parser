"use strict";
// Sample test URLs
// https://tasty.co/recipe/the-best-chewy-chocolate-chip-cookies
// https://www.seriouseats.com/lobster-bisque-recipe
// https://www.allrecipes.com/recipe/8814/homemade-chicken-soup/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://tasty.co/recipe/the-best-chewy-chocolate-chip-cookies";
        const result = yield (0, _1.parseURL)(url);
        console.log(result);
    });
}
test();
