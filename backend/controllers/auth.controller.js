export const signup = async (req,res)=>{
  try {
    res.send("signup page")
  } catch (error) {
    console.log("error in the signup func in auth controller", error.message)
    res.status(500).json({error: "internal server error"})
  }
}
export const login = async (req,res)=>{
  try {
    res.send("login page")
  } catch (error) {
    console.log("error in the login func in auth controller", error.message)
    res.status(500).json({error: "internal server error"})
  }
}
export const logout = async (req,res)=>{
  try {
    res.send("logut page")
  } catch (error) {
    console.log("error in the logout func in auth controller", error.message)
    res.status(500).json({error: "internal server error"})
  }
}