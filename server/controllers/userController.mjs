import { catchAsync } from "../utils/catchAsync.mjs";

const users = ['Daria', 'Burcu', 'Anna', 'Steven']
export const getAllUsers = catchAsync(async (req, res, next) => {
  res.status(200).json(users);
});
