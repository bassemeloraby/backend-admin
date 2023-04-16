
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = (req,res)=>{
  res.status(200).json({message:"register user"})
}

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = (req,res)=>{
  res.status(200).json({message:"login user"})
}

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = (req,res)=>{
  res.status(200).json({message:"me user"})
}
module.exports = {
  registerUser,
  loginUser,
  getMe,
}