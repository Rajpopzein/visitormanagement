import yup, { string, number, date, object } from "yup";

const userPayloadValidatior = {
  userCreationPayload: async (req, res, next) => {
    try {
      const userSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup
          .string()
          .email("Invalid email format")
          .required("Email is required"),
        phone: yup.string().required("Phone number is required"),
        password: yup.string().required("Password is required"),
        role_id: yup.string().required("Role ID is required"),
        createdOn: yup.date().default(() => new Date()),
      });
      const validatedData = await userSchema.validate(req.body, {
        abortEarly: false,
      });
      console.log("Validated Data:", validatedData);
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors,
        });
      }

      console.error("Unexpected Error:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  userLoginPayload: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please provide a username and password" });
    }
    next();
  },
  visitorPayload: async (req, res, next) => {
    try{
        const visitorSchema = yup.object().shape({
      name: yup.string().required("Name is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: yup.string().required("Phone number is required"),
      date: yup.date().required("Date is required"),
      site: yup.string().required("Site is required"),
      purpose: yup.string().required("Purpose is required"),
      vehicle: yup.boolean(),
      vehicleNumber: yup.string().nullable(),
      docs: yup.string().nullable(),
      createdOn: yup.date().default(() => new Date())
    });
    const validatedData = await visitorSchema.validate(req.body, {
        abortEarly: false,
      });
    
    next();
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
          return res.status(400).json({
            message: "Validation error",
            errors: error.errors,
          });
        }
  
        console.error("Unexpected Error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
      }
    
  },
};

export default userPayloadValidatior;
