function validateStrongPassword(req, res, next) {
   const { password } = req.body;
 
   // Define password requirements (adjust as needed)
   const minLength = 8;
   const uppercaseRegex = /[A-Z]/;
   const lowercaseRegex = /[a-z]/;
   const digitRegex = /[0-9]/;
   const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
 
   // Password validation checks
   if (
     password.length < minLength ||
     !uppercaseRegex.test(password) ||
     !lowercaseRegex.test(password) ||
     !digitRegex.test(password) ||
     !specialCharRegex.test(password)
   ) {
     return res.status(400).json({ error: "Password must be strong." });
   }
 
   // Password is strong, continue to the next middleware/route handler
   next();
 }

 module.exports  =validateStrongPassword;