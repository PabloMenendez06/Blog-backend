import { Router } from "express";
import { check } from "express-validator";
import { deleteComment, updateComment, listUserComments } from "./comment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { commentExistsById } from "../helpers/db-validator.js";

const router = Router();

router.get(
    "/",
    listUserComments
);

router.delete(
    "/:id",
    check("id").custom(commentExistsById),  
    validarCampos,                          
    deleteComment                           
);

router.put(
    "/:id",
    check("id").custom(commentExistsById),
    check("comment", "Comment is required").not().isEmpty(),
    check("comment", "Comment must be between 3 and 700 characters").isLength({ min: 3, max: 700 }),
    validarCampos,
    updateComment
);

export default router;
