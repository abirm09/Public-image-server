import { Category } from "./category.model";

/**
 * The function `createCategoryIntoDB` creates a new category in a database with a name and a slug
 * based on the name.
 * @param {string} name - The `name` parameter is a string that represents the name of the category
 * that you want to create in the database.
 */
const createCategoryIntoDB = async (name: string) => {
  const category = new Category({
    name,
    slug: name.split(" ").join("-").toLowerCase(),
  });
  await category.save();
};

export const CategoryServices = {
  createCategoryIntoDB,
};
