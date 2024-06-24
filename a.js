

//CREATE ONE ORL FOR BOTH (POST AND PUT)


const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.post('/resource', (req, res) => {
  // Handle creating a resource
  const data = req.body;
  res.status(201).json({ message: 'Resource created', data });
});

app.put('/resource/:id', (req, res) => {
  // Handle updating a resource
  const id = req.params.id;
  const data = req.body;
  res.status(200).json({ message: `Resource ${id} updated`, data });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//==================================================================================
/*
RUN--- node OneUrlforBothCreateAndUpdate.js


POST---http://localhost:3000/resource
in body-------- {"name": "New Resource"}
------------------
output---{
    "message": "Resource created",
    "resource": {
        "id": 1,
        "name": "New Resource"
    }
}
    =====================================
PUT---http://localhost:3000/resource/1

in body--- {"name": "Updated Resource"}
output----{
    "message": "Resource updated",
    "resource": {
        "id": "1",
        "name": "Updated Resource"
    }
}
*/