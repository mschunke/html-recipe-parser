interface IErrors {
  [key: string]: Error;
}

export const ERRORS: IErrors = {
  NO_JSON_LD: new Error("No JSON-LD found"),
  MISSING_DATA: new Error("Missing data"),
  PARSING_ERROR: new Error("Error parsing recipe"),
};
