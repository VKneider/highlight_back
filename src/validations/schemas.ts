import yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const registerSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    username: yup.string().min(6).max(10).required("Username is required"),
});

const changeUserDataSchema = yup.object().shape({
    password: yup.string(),
    username: yup.string().min(6).max(10),
    email: yup.string().email(),
});

const idSchema = yup.object().shape({
    id: yup.string().required("Id is required"),
});

const schemas = {
    loginSchema,
    registerSchema,
    changeUserDataSchema,
    idSchema
}

export default schemas;