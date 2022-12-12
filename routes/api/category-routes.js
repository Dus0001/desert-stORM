const router = require('express').Router();
const { Model } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: [
        'id',
        'category_name',
    ],
    // be sure to include its associated Products
    include: [
        {
            model: Product
        }
    ]
  })
  .then(categoryData => {
   res.json(categoryData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
        id: req.params.id
    },
    // be sure to include its associated Products
    include:[
        {
            model: Product
        }
    ],
  })
  .then(data => {
    if(!data){
        res.status(404).json({message: 'No user category with this id'});
    }
    res.json(data)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if(!data){
            res.status(404).json({message:'No category with this id'});
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
        id: req.params.id
    }
  })
  .then(data => {
    if(!data){
        res.status(404).json({message: 'No category found with this id'});
        return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
