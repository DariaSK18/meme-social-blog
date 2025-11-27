import { validationResult, matchedData } from "express-validator";

export const validate = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).json({ errors: result.array() });
  req.validatedData = matchedData(req);
  next()
};