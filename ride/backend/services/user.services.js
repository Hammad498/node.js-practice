import userModel from "../models/users.model.js";



export const createUser = async ({ firstname, lastname, email, password, verificationToken, verificationTokenExpiresAt }) => {
    if (!firstname || !lastname || !email || !password) {
        throw new Error("Missing required fields");
    }

    const newUser = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        verificationToken, 
        verificationTokenExpiresAt
    });

    return newUser;
};
