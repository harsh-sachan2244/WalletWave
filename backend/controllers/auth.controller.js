import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"



export const signUp=async(req,res)=>{

    try {
        const {name,email,password,confirmpassword}=req.body
        

if(!name || !email || !password || !confirmpassword){
return res.status(400).json({message:"Details can't be empty"})
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Please enter a valid email address"
    });
}
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

if (!passwordRegex.test(password)) {
    return res.status(400).json({
        message: "Password must be at least 8 characters and contain a letter and a number"
    });
}
if (password !== confirmpassword) {
    return res.status(400).json({
        message: "Passwords do not match"
    });
}

let existUser=await User.findOne({email})
if (existUser){
    return res.status(400).json({message:"User already exist"})
}
const hashedpassword=await bcrypt.hash(password,10)

const user=await User.create({
    name,
    email,
    password:hashedpassword,
});

console.log(user);

let token;
try {
token=generateToken(user._id)
}
catch (error){
console.log(error);

}

res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
maxAge:7*24*60*60*1000
})

return res.status(201).json({user:{
    name,email
}})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    
}

export const login=async (req,res)=>{
    try {
        const {email,password}=req.body
        let existUser=await User.findOne({email})
         if(!existUser){
            return res.status(400).json({message:"User does not exist"})
         }

         let match= await bcrypt.compare(password,existUser.password)
         if(!match){
            return res.status(400).json({message:"Incorrect Password"})
         }
         let token;
try {
token=generateToken(existUser._id)
}
catch (error){
console.log(error);

}

res.cookie("token",token,{
httpOnly:true,
secure:true,
sameSite:"none",
maxAge:7*24*60*60*1000
})

return res.status(200).json({user:{
    name:existUser.name,
    email
}})


    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const logout= async (req,res)=>{
    try {
res.clearCookie("token")
res.status(200).json({message:"Logout successfull"})
    }
    catch(error){
return res.status(500).json({message:"Internal Server Error"})
    }
}

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, type, category, date } = req.body;

    // Check required fields
    if (!title || !amount || !type || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Find transaction belonging to logged-in user
    const transaction = await Transaction.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    // Update transaction
    transaction.title = title.trim();
    transaction.amount = amount;
    transaction.type = type;
    transaction.category = category.trim();

    if (date) {
      transaction.date = date;
    }

    await transaction.save();

    return res.status(200).json({
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name.trim();

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};