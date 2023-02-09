const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    })
    res.status(200).json(categoryData)
    console.log(categoryData)
  }
  catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    const categorys = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    //If categorys is not valid
    if (!categorys) {
      res.status(404).json({ message: 'This category ID is not valid!' });
    }
    //if categorys is valid
    res.status(200).json(categorys);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new category

  try {
    const categorys = await Category.create(req.body);
    res.status(200).json(categorys);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  try {
    const categorys = await Category.update(req.body, 
      {
      where: {
        id: req.params.id,
      },
    });
    //if categorys is not valid
    if (!categorys) {
      res.status(404).json({ message: 'This category ID is not valid!' });
    }
    //if categorys is valid
    res.status(200).json(categorys);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategorys = Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteCategorys);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
