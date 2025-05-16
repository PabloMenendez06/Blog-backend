import { Router } from "express";
import { check } from "express-validator";
import {
  createCategory,
  updateCategory,
  listCategories,
  deleteCategory,
} from "./category.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existingCategory } from "../helpers/db-validator.js";

const router = Router();

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    validarCampos,
  ],
  createCategory
);

router.put(
  "/:id",
  [
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(existingCategory),
    validarCampos,
  ],
  updateCategory
);

router.get("/", listCategories);

router.delete(
  "/:id",
  [
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(existingCategory),
    validarCampos,
  ],
  deleteCategory
);

export default router;
