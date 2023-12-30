
// import { NextApiResponse } from "next";
import prisma from "../../../utils/connect";
// import bcrypt from 'bcrypt';

// const saltRounds = 10;

// export default async function POST(req, res) {

//     try {

//         if (!name || !email || !password) {
//             throw new Error("Invalid credentials. Please provide name, email, and password.");
//         }

//         const exist = await prisma.user.findUnique({
//             where: {
//                 email: email
//             }
//         });
//         if (exist) {
//             // throw new Error(`User with the email already exists.`);
//             return res.status(422).json({
//                 success: false,
//                 message: 'A user with the same email already exists!',
//                 userExists: true,
//             });


//         }
//         // Hashing Password
//         const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(saltRounds));
//         const user = await prisma.user.create({
//             data: {
//                 name,
//                 email,
//                 password: hashedPassword
//             },
//         })
//         res
//             .status(201)
//             .json({ success: true, message: 'User signed up successfuly' });
//     } catch (error) {
//         res.status(500).json({ error: error.message || "Internal Server Error" });
//     };





//     //   // Sign a JWT token for the user
//     //   const token = sign(
//     //     { userId: user.id, email: user.email },
//     //     process.env.JWT_SECRET,
//     //     {
//     //       expiresIn: '30d', // You can adjust the expiration time as needed
//     //     }
//     //   );

//     //   // Set the token as a cookie
//     //   res.setHeader(
//     //     'Set-Cookie',
//     //     `token=${token}; Path=/; HttpOnly; SameSite=Lax`
//     //   );

//     //   return res.status(200).json({ message: 'Registration successful', user });
//     // } catch (error) {
//     //   console.error('Error during registration:', error);
//     //   return res.status(500).json({ message: 'Internal Server Error' });
//     // }
// }




import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import axios from "axios";

const checkEmailValidity = async (email) => {
    const options = {
        method: 'GET',
        url: 'https://mailcheck.p.rapidapi.com/',
        params: {
            email: email,
        },
        headers: {
            'X-RapidAPI-Key': process.env.Valid_EmailKey,
            'X-RapidAPI-Host': 'mailcheck.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error checking email validity");
    }
};


export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { name, email, password } = reqBody.data

        const emailValidationResponse = await checkEmailValidity(email);
        console.log(emailValidationResponse)
        if (emailValidationResponse.risk>10) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }


        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }

        })

        return NextResponse.json({
            message: "User created successfully",
            success: true,
        },
            { status: 200 })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}

