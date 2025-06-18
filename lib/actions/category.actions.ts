"use server";

import { CreateCategoryParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategoriesWithEventCounts = async () => {
  try {
    await connectToDatabase();

    const categoriesWithEventCounts = await Category.aggregate([
      {
        $lookup: {
          from: "events", // MongoDB collection name for events
          localField: "_id",
          foreignField: "category",
          as: "events",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          eventCount: { $size: "$events" },
        },
      },
    ]);

    return JSON.parse(JSON.stringify(categoriesWithEventCounts));
  } catch (error) {
    handleError(error);
  }
};
