import authenticate from "../../models/middlewares/authenticate";
import authorize from "../../models/middlewares/authorize";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    //  alert('Method not allowed ')    
     console.log('Method not allowed ')    
  }
  authenticate(req, res, () => {
    authorize(["admin"])(req, res, async () => {
      res.status(200).json({ message: "Admin access granted . " });
    });
    authorize(["editor"])(req, res, async () => {
      res.status(200).json({ message: "Editor access granted " });
    });
  });
}
