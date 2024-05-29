const express = require("express");
const authenticationCheck = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const zod = require("zod");
const slugify = require("slugify");
const Category = require("../db/category");
const categoryRouter = express.Router();

categoryRouter.post(
  "/create-category",
  authenticationCheck,
  isAdmin,
  async (req, res) => {
    try {
      const { name } = req.body;
      const dataSchema = zod.string().min(1);
      if (dataSchema.safeParse(name).success) {
        const existed = await Category.findOne({ name });
        if (!existed) {
          const categoryCreated = await Category.create({
            name,
            slug: slugify(name),
          });
          res.status(201).send({
            message: "Category created Successfully",
            success: true,
            category: categoryCreated,
          });
        } else {
          res.status(404).send({
            message: "Category Already existed",
            success: false,
          });
        }
      } else {
        res.status(401).send({
          message: "Inavalid Category Name",
          success: false,
        });
      }
    } catch (e) {
      res.status(500).send({
        message: "Something Bad Happend at Category Create Route",
      });
    }
  }
);

//category update - put
categoryRouter.put(
  "/update-category/:id",
  authenticationCheck,
  isAdmin,
  async (req, res) => {
    try {
      const { newName } = req.body;
      const dataSchema = zod.string().min(1);
      if (dataSchema.safeParse(newName).success) {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, {
          name: newName,
          slug: slugify(newName),
        });
        if (category) {
          res.status(201).send({
            message: "Category Updated successfully",
            category,
          });
        } else {
          res.status(201).send({
            message: "Category not found ",
            category,
          });
        }
      } else {
        res.status(401).send({
          message: "Inavalid Category Name passed to update",
          success: false,
        });
      }
    } catch (e) {
      res.status(500).send({
        message: "something Bad happend in Updating Category",
      });
    }
  }
);

//get categories - GET
categoryRouter.get("/get-category", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send({
      categories,
    });
  } catch (e) {
    res.status(500).send({
      message: "something Bad happend while getting categories",
    });
  }
});

// get single - category
categoryRouter.get("/single-category/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug: slug });
    if (category) {
      res.status(200).send({
        category,
      });
    } else {
      res.status(404).send({
        message: "category not found",
      });
    }
  } catch (e) {
    res.status(500).send({
      message: "something bad happend in single category route",
    });
  }
});

//delete - category
categoryRouter.delete(
  "/delete-category/:id",
  authenticationCheck,
  isAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCategory = await Category.findOne({
        _id: id,
      });
      if (deletedCategory) {
        await Category.findByIdAndDelete({ _id: id });
        res.status(200).send({
          success: true,
          message: "Category is deleted successfully",
        });
      } else {
        res.status(404).send({
          success: true,
          message: "Category is not found",
        });
      }
    } catch (e) {
      res.status(500).send({
        message: "Something Bad happend while deleting category",
      });
    }
  }
);
module.exports = categoryRouter;
