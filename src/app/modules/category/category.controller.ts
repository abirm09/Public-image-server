import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import successResponse from "../../utils/successResponse";
import { CategoryServices } from "./category.service";

/*
 The `createCategory` constant is a function that is using the `catchAsync` middleware to handle
asynchronous operations. Inside this function, it is awaiting the `createCategoryIntoDB` method from
the `CategoryServices` class with the name provided in the request body. Once the category is
created in the database, it sends a success response back to the client with a status code of 201
(Created) and a message indicating that the category was created successfully. 
*/
const createCategory = catchAsync(async (req, res) => {
  await CategoryServices.createCategoryIntoDB(req.body?.name);
  successResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Category created successfully!",
  });
});

export const CategoryController = { createCategory };
