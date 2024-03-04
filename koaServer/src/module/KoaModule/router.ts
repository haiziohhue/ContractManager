import Router from "koa-router";
import { login, upload, deleteById, getList, update } from "./service";
const router = Router()

router.post("/login", login);

router.get("/api/file", getList);

router.delete("/api/file/:id", deleteById);

router.post("/api/file", upload);
router.put("/api/file/:id", update);
export default router;
