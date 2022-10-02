const router = require("express").Router()
const { Category, Product } = require("../../models")

// `/api/categories` endpoint
// include associated Products
router.get("/", (req, res) => {
    // find all categories
    Category.findAll({
        include: {
            model: Product,
            attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
    })
        .then(dbcategoryData => {
            if (!dbcategoryData) {
                res.status(404).json({ message: "No categories found" })
                return
            }
            res.json(dbcategoryData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});

router.get("/:id", (req, res) => {
    // locates one category by its `id` value
    // includes its associated products
    Category.findOne({
        where: {
            id: req.params.id,
        },
        include: {
            model: Product,
            attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
    })
        .then(dbcategoryData => {
            if (!dbcategoryData) {
                res.status(404).json({ message: "No categories found" });
                return
            }
            res.json(dbcategoryData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.post("/", (req, res) => {
    // create a new category
    Category.create({
        category_name: req.body.category_name,
    })
        .then(dbcategoryData => res.json(dbcategoryData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.put("/:id", (req, res) => {
    // update a category by its `id` value
    Category.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then(dbcategoryData => {
            if (!dbcategoryData) {
                res.status(404).json({ message: "No category found with this id" })
                return
            }
            res.json(dbcategoryData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.delete("/:id", (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then(dbcategoryData => {
            if (!dbcategoryData) {
                res.status(404).json({ message: "No category found with that id." })
                return
            }
            res.json(dbcategoryData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router;