/*This approach leverages a single HTTP verb (POST) to handle both create and update operations, using an if-else statement to differentiate between the two actions based on the existence of the item in the storage. */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage (for demonstration purposes)
let items = [];

// POST endpoint to handle both create and update
app.post('/item', (req, res) => {
    const { id, data } = req.body;

    if (!id || !data) {
        return res.status(400).json({ message: 'ID and data are required' });
    }

    const existingItemIndex = items.findIndex(item => item.id === id);

    if (existingItemIndex !== -1) {
        // Update existing item
        items[existingItemIndex].data = data;
        res.status(200).json({ message: 'Item updated successfully', item: items[existingItemIndex] });
    } else {
        // Create new item
        const newItem = { id, data };
        items.push(newItem);
        res.status(201).json({ message: 'Item created successfully', item: newItem });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/*
POST Endpoint:

Define a POST endpoint at /item.
Extract id and data from the request body.
Validate the input: ensure both id and data are present.
Check if an item with the given id already exists.
If the item exists, update its data.
If the item does not exist, create a new item and add it to the array.
Respond with appropriate status codes and messages.
========================FOR CREATE DATA======================
POST---  http://localhost:3000/item/

{
    "id": 1,
    "data": "New item data"
}

{
    "message": "Item created successfully",
    "item": {
        "id": 1,
        "data": "New item data"
    }
}
    ====================================FOR UPDATE DATA====================
POST---  http://localhost:3000/item/
    {
    "id": 1,
    "data": "Updated item data"
}
    --
    {
    "message": "Item updated successfully",
    "item": {
        "id": 1,
        "data": "Updated item data"
    }
}


*/