const express = require("express");
const authenticationCheck = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const formidable = require("express-formidable");
const fs = require("fs");
const zod = require("zod");
const productRouter = express.Router();
const Product = require("../db/product");
const slugify = require("slugify");

//Create-product  -  POST
productRouter.post(
  "/create-product",
  authenticationCheck,
  isAdmin,
  formidable(),
  async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;

      const productSchema = zod.object({
        name: zod.string().min(1),
        description: zod.string().min(1),
        price: zod.string(),
        category: zod.string(),
        quantity: zod.string(),
      });
      if (
        productSchema.safeParse(req.fields).success &&
        photo &&
        photo.size < 100000
      ) {
        if (photo) {
          photo.data = fs.readFileSync(photo.path);
          photo.contentType = photo.type;
        }
        const product = await Product.create({
          name: name,
          slug: slugify(name),
          description: description,
          price: price,
          category: category,
          quantity: quantity,
          shipping: shipping,
          photo: photo,
        });

        res.status(200).send({
          success: true,
          message: "Product created Successfully",
          products: product,
        });
      } else {
        res.status(404).send({
          success: false,
          message:
            "Sending wrong info whether the details wrong or sending image more than mentioned",
        });
      }
    } catch (e) {
      res.status(500).send({
        success: true,
        message: "Something bad happend in creating product",
      });
    }
  }
);

//get-products - GET
productRouter.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 })
      .populate("category");
    res.status(200).send({
      success: true,
      message: "All Products",
      totalProducts: products.length,
      products: products,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something Bad happend in getting the products",
    });
  }
});

//get-single-product GET
productRouter.get("/get-Single-Product/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.slug,
    })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true.valueOf,
      message: "Single product fetched",
      product: product,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something bad happend while getting single product",
    });
  }
});

//get-photo GET
productRouter.get("/get-photo/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something bad happend while getting photo",
    });
  }
});

//update - PUT
productRouter.put(
  "/update-product/:pid",
  authenticationCheck,
  isAdmin,
  formidable(),
  async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;

      const productSchema = zod.object({
        name: zod.string().min(1),
        description: zod.string().min(1),
        price: zod.string(),
        category: zod.string(),
        quantity: zod.string(),
      });

      if (
        productSchema.safeParse(req.fields).success &&
        photo &&
        photo.size < 100000
      ) {
        if (photo) {
          photo.data = fs.readFileSync(photo.path);
          photo.contentType = photo.type;
        }
        const product = await Product.findByIdAndUpdate(req.params.pid, {
          name: name,
          slug: slugify(name),
          description: description,
          price: price,
          category: category,
          quantity: quantity,
          shipping: shipping,
          photo: photo,
        });

        res.status(200).send({
          success: true,
          message: "Product Updated Successfully",
          products: product,
        });
      } else {
        res.status(404).send({
          success: false,
          message:
            "Sending wrong info whether the details wrong or sending image more than mentioned",
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({
        success: false,
        message: "Something bad happend in updating product",
      });
    }
  }
);

//Delete Product - Delete
productRouter.delete(
  "/delete-product/:pid",
  authenticationCheck,
  isAdmin,
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.pid);
      res.status(200).send({
        success: true,
        message: "Product Deleted Successfully",
      });
    } catch (e) {
      res.status(500).send({
        success: false,
        message: "something bad happend while deleting product",
      });
    }
  }
);

//get-filtered-products
productRouter.post("/get-filtered-products", async (req, res) => {
  try {
    const { checked, radio } = req.body;
    const args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    const result = await Product.find(args)
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      products: result,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something Bad Happend when fetching the filtered products",
    });
  }
});

//get-product count
productRouter.get("/get-product-count", async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: false,
      total: total,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something Bad Happend while getting product count",
    });
  }
});

//get-products per page
productRouter.get("/get-products/:page", async (req, res) => {
  try {
    const perPage = 2;
    const products = await Product.find({})
      .select("-photo")
      .skip((req.params.page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products: products,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something Bad Happend while getting products per page",
    });
  }
});

//searched products
productRouter.get("/searched-products/:pnorpd", async (req, res) => {
  try {
    const { pnorpd } = req.params;
    const result = await Product.find({
      $or: [
        {
          name: { $regex: pnorpd, $options: "i" },
        },
        {
          name: { $regex: pnorpd, $options: "i" },
        },
      ],
    })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      products: result,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something bad happend while getting searched products",
    });
  }
});

// get-similar-products
productRouter.get("/get-similar-products/:pid/:cid", async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await Product.find({
      category: cid,
      _id: { $ne: pid },
    }).select("-photo");
    res.status(200).send({
      success: true,
      products: products,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something bad happend while getting similar products",
    });
  }
});
module.exports = productRouter;
