import { Router } from "express";
import { check } from "express-validator";
import {
  savePublication,
  updatePublication,
  listPublications,
  listPublicationsByCategory,
  deletePublication,
  addCommentToPublication
} from "./publication.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { publicationExists } from "../helpers/db-validator.js";

const router = Router();

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("text", "Text is required").not().isEmpty(),
    check("categoryName", "Category name is required").not().isEmpty(),
    validarCampos,
  ],
  savePublication
);

router.put(
  "/:id",
  [
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(publicationExists),
    validarCampos,
  ],
  updatePublication
);

router.get("/", listPublications);

router.get("/:categoryName", listPublicationsByCategory);

router.delete(
  "/:id",
  [
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(publicationExists),
    validarCampos,
  ],
  deletePublication
);

router.post("/addcomment/:id", addCommentToPublication);

export default router;
