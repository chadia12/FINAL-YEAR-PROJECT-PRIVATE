import jwt from "jsonwebtoken";

// export const verifyToken = async(req, res, next) =>{
//     try{
//         const authHeader = req.headers.token;
//         if (authHeader) {
//             const token = authHeader.split(" ")[1];
//             jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//               if (err) res.status(403).json("Acess Denied !");
//               req.user = user;
//               next();
//             });
//           } else {
//             return res.status(401).json("You are not authenticated!");
//           }
//     }catch(err){
//         res.status(500).json({err})
//     }
// }

export const verifyToken = async(req, res, next) =>{
    try{
        let token = req.header("Authorization");
        if (!token ) {
           return res.status(403).json("Acess Denied !");
        }
           if(token.startsWith("Bearer ")){
token = token.slice(7, token.length).trimLeft()
           }
       const verified = jwt.verify(token, process.env.JWT_SEC);
              req.user = verified
              next();       
    }catch(err){
        res.status(500).json({error: err.message});
    }
};


