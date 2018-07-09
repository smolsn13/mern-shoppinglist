const express = require('express');
const router = express.Router();

// Item model
const Item = require('../../models/Item');

// GET route to api/items
// Get All Items
router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
});

// POST route to api/items
// Create an item
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// DELETE route to api/items/:id
// Delete an item
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))    
        .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;