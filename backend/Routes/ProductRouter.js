import { Router } from "express";
import { ensureAuthenticated } from "../Middlewares/Auth.js";


const router=Router();

router.get('/',ensureAuthenticated,(req,res)=>{

    console.log("Logged in user is ... ", req.user);

    return res.status(200).json([
        {
      "Device":"Mobile",
      "Price":10000
    },
{
 "Device":"TV",
      "Price":20000
}
])
});

export const ProductRouter=router;