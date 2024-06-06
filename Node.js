const express = require("express");

// const employees = require("./node.json");

const app = express();
app.use(express.json());

const PORT = 3000;

let items = [
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
  const index = items.findIndex((item) => newItems.id == item.id);
  //This will stop from creating duplicte objects with the same id number
  //To test this please run post 2 or 3 times and it should display error message.
  //this will also keep data from having duplicate id's
  //run get to check if data has not changed
  if (index !== -1) {
    res.status(404).send("Id already exists, please enter a valid id");
  } else {
    items.push(newItems);
    //   res.status(201).json(newItems);
    res.status(200).json(newItems);
  }
});

//Delete endpoint to delete a data by id
app.delete("/items/:id", (req, res) => {
  items = items.filter((item) => item.id !== parseInt(req.params.id));
  res.send(items);
  setTimeout(() => res.send(items), 1000);
});

//PUT endpoint to udpate dta by id
app.put("/items/:id", (req, res) => {
  const [id] = req.params.id;
  const updatedItem = req.body;
  const index = items.findIndex((item) => id == item.id);
  console.log(updatedItem);
  if (index == -1) {
    res.status(404).send("error");
  }
  items[index] = updatedItem;
  // console.log(items);
  res.send(items);
});

app.listen(PORT, () => {
  console.log(`Sever is listening at http://localhost:${PORT}`);
});
