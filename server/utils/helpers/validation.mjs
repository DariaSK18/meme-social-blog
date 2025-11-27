export const signupValidation = {
  username: {
    bail: true,
    exists: { errorMessage: "Username is required" },
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Must be at least 3-20 characters",
    },
    stripLow: true,
    trim: true,
  },
  email: {
    bail: true,
    exists: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Invalid email" },
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    normalizeEmail: true,
    trim: true,
  },
  password: {
    bail: true,
    exists: { errorMessage: "Password is required" },
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    isLength: {
      options: { min: 6 },
      errorMessage: "Must be at least 6 characters",
    },
    matches: {
      options: /^(?=.*[A-Za-z])(?=.*\d).+$/,
      errorMessage: "Password must contain at least one letter and one number",
    },
    trim: true,
    stripLow: true,
  },
};

export const postValidation = {
  title: {
    bail: true,
    exists: { errorMessage: "Title is required" },
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    isLength: {
      options: {
        min: 3,
        max: 100,
      },
      errorMessage: "Must be at least 3-100 characters",
    },
    trim: true,
  },
  description: {
    bail: true,
    exists: { errorMessage: "Content is required" },
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    trim: true,
  },
  category: {
    bail: true,
    optional: true,
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    trim: true,
  },
  tags: {
    bail: true,
    optional: true,
    isArray: { errorMessage: "Tags must be an array" },
  },
  "tags.*": {
    bail: true,
    optional: true,
    isString: { errorMessage: "Must be a string" },
    isLength: {
      options: {
        min: 1,
        max: 20,
      },
      errorMessage: "Each tag must be 1-20 characters",
    },
    trim: true,
  },
};

export const userPatch = {
  username: {
    optional: true,
    bail: true,
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Must be at least 3-20 characters",
    },
    stripLow: true,
    trim: true,
  },
  email: {
    optional: true,
    bail: true,
    isEmail: { errorMessage: "Invalid email" },
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    normalizeEmail: true,
    trim: true,
  },
  password: {
    optional: true,
    bail: true,
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    isLength: {
      options: { min: 6 },
      errorMessage: "Must be at least 6 characters",
    },
    matches: {
      options: /^(?=.*[A-Za-z])(?=.*\d).+$/,
      errorMessage: "Password must contain at least one letter and one number",
    },
    trim: true,
    stripLow: true,
  },
};

export const postPatch = {
  title: {
    optional: true,
    bail: true,
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    isLength: {
      options: {
        min: 3,
        max: 100,
      },
      errorMessage: "Must be at least 3-100 characters",
    },
    trim: true,
  },
  description: {
    optional: true,
    bail: true,
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    trim: true,
  },
  category: {
    bail: true,
    optional: true,
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    trim: true,
  },
  tags: {
    bail: true,
    optional: true,
    isArray: { errorMessage: "Tags must be an array" },
  },
  "tags.*": {
    bail: true,
    optional: true,
    isString: { errorMessage: "Must be a string" },
    isLength: {
      options: {
        min: 1,
        max: 20,
      },
      errorMessage: "Each tag must be 1-20 characters",
    },
    trim: true,
  },
};

export const userLogin = {
  email: {
    bail: true,
    exists: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Invalid email" },
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    normalizeEmail: true,
    trim: true,
  },
  password: {
    bail: true,
    exists: { errorMessage: "Password is required" },
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    isLength: {
      options: { min: 6 },
      errorMessage: "Must be at least 6 characters",
    },
    matches: {
      options: /^(?=.*[A-Za-z])(?=.*\d).+$/,
      errorMessage: "Password must contain at least one letter and one number",
    },
    trim: true,
    stripLow: true,
  },
};
