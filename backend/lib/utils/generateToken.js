import jwt from 'jsonwebtoken';

export const generateTokenAnSetCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '15d'
    })
    res.cookie("jwt",token,{
        maxAge : 15*24*60*60*1000, //milisec
        httpOnly : true, // prevents Xss attacks cross_site scripting attacks
        sameSites: "strict", // csrf attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"

    })
}