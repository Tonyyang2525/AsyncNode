const express = require("express");

// const employees = require("./node.json");

const app = express();
const PORT = 3000;

const items = [
  { id: 1, name: "Tony", description: "Apprentice" },
  { id: 2, name: "Chris", description: "Manager" },
  { id: 3, name: "Jeff", description: "Custodian" },
  { id: 4, name: "Emma", description: "Apprentice" },
];

// app.length("/", (req, res) => {
//   res.send("Hello World");
// });

// http.get('/items', (req,res){

// })
app.get("/items", (req, res) => {
  res.json(items);
});

//POST end point to create a new data
app.post("/items", (req, res) => {
  const newItems = req.body;
  items.push(newItems);
  //   res.status(201).json(newItems);
  res.status(201).json(newItems);
});

//Delete endpoint to delete a data by id
app.delete("/items/:id", (res, req) => {
  const { id } = req.params;
  items = items.filter((item) => item.id !== parseInt(id));
  res.sendStatus(204);
});

//PUT endpoint to udpate dta by id
app.put("/items/:id", (req, res) => {
  const [id] = req.params;
  const updatedItem = req.body;
  const index = items.findIndex((item) => id === item.id);
  if (index !== -1) {
    items[index] = updatedItem;
  }
  return items;
});
//   res, json(items.find((item) => item.id === parseInt(id)));
// });
app.listen(PORT, () => {
  console.log(`Sever is listening at http://localhost:${PORT}`);
});
