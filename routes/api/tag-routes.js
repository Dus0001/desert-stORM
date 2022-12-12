const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
  // be sure to include its associated Product data
    include: [
      {
        model: Product,
        through: ProductTag,
        as:'products'
      }
    ]
  })
  .then(data => res.json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where:{
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as:'products'
      }
    ]
  })
  .then(data => res.json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(data => res.json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },

    {
      where:{
      id: req.params.id
    },
  })
  .then(data => { 
    if(!data){
      res.status(404).json({message: 'There is no tag with that id'})
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(data => {
    if(!data){
      res.status(404).json({message: 'There is no tag with this id'})
    }
    res.json({message:`Tag with this id has been deleted`})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;