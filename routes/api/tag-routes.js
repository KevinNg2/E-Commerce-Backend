const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// api tags conclusion
router.get("/", (req, res) => {
    // locate all tags
    // includes product data
    Tag.findAll({
        include: {
            model: Product,
            attributes: ["product_name", "price", "stock", "category_id"],
        },
    })
    .then(dbtagData => res.json(dbtagData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
});

router.get("/:id", (req, res) => {
    // find tag by its id
    // includes associated product data
    Tag.findOne({
        where: {
            id: req.params.id,
        },
        include: {
            model: Product,
            attributes: ["product_name", "price", "stock", "category_id"],
        },
    })
    .then(dbtagData => res.json(dbtagData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
    // creates new tag
    Tag.create({
        tag_name: req.body.tag_name,
    })
    .then(dbtagData => res.json(dbtagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
    // updates a tag's name by its id value
    Tag.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
    .then(dbtagData => {
        if (!dbtagData) {
            res.status(404).json ({ message: "no tag found with that id"})
            return
        }
        res.json(dbtagData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
    // deletes tag by its id value
    Tag.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then(dbtagData => {
        if (!dbtagData) {
            res.status(404).json ({ message: "no tag found with that id"})
            return
        }
        res.json(dbtagData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

module.exports = router;