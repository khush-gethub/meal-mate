# Data Dictionary

This document provides a dictionary of the data models used in the College-Recipe project.

## User Model (`userSchema.js`)

The `userModel` stores information about registered users.

| Field           | Type   | Description                               | Required | Default |
|-----------------|--------|-------------------------------------------|----------|---------|
| `rname`         | String | The user's registered name.               | No       |         |
| `email`         | String | The user's email address.                 | No       |         |
| `password`      | String | The user's hashed password.               | No       |         |
| `conformPassword` | String | The user's hashed password for confirmation. | No       |         |
| `role`          | String | The user's role (`user` or `admin`).      | No       | `user`  |

## Recipe Models (`schema.js`)

The recipe models store information about the recipes. There are five different recipe models, but they all share the same schema.

*   `VegetarianRecipe`: Stores vegetarian recipes in the `veg-data` collection.
*   `SeafoodRecipe`: Stores seafood recipes in the `seafood-data` collection.
*   `DessertRecipe`: Stores dessert recipes in the `dessert-data` collection.
*   `ChickenRecipe`: Stores chicken recipes in the `chicken-data` collection.
*   `General`: Stores general recipes in the `general` collection.

| Field         | Type     | Description                          | Required |
|---------------|----------|--------------------------------------|----------|
| `title`       | String   | The title of the recipe.             | Yes      |
| `image`       | String   | The URL of the recipe image.         | Yes      |
| `description` | String   | A short description of the recipe.   | Yes      |
| `ingredients` | [String] | A list of ingredients for the recipe.| Yes      |
| `steps`       | [String] | The steps to prepare the recipe.     | Yes      |
