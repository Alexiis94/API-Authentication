import { Router } from "express";
import { singup, singin, profile } from "../controllers/auth.controller";
import { tokenValidation } from "../libs/verifyToken";
const router: Router = Router();

router.post("/signup", singup);
router.post("/signin", singin);
router.get("/profile", tokenValidation, profile);

export default router;
