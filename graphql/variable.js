import { makeVar } from '@apollo/client';

export const recipeForm = makeVar({
  "title": "",
  "image": [],
  "description": "",
  "videoUrl": "",
  "origin": "",
  "portion": null,
  "cookingTime": null,
  "ingredients": [
    {
      "name": "null"
    }
  ],
  "steps": [
    {
      "image": "null",
      "instruction": "null"
    }
  ],
});
