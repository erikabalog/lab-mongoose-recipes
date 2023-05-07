const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://0.0.0.0:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
    console.log("All existing recipes deleted from DB");
  })
  // Iteration 2 - Create a recipe
  .then(() => {
    const newRecipe = {
      title: "American-style pancakes",
      level: "Amateur Chef",
      "Preparation time": "40min",
      ingredients: [
        "200 g plain flour",
        "50 g butter, plus extra for frying",
        "300 g milk",
        "2 eggs",
        "30 g sugar",
        "1 tbsp baking powder",
        "¼ tsp salt",
      ],
    };

    return Recipe.create(newRecipe);
  })
  // Iteration 3 - Insert multiple recipes
  .then(() => {
    return Recipe.insertMany(data);
  })

  // Iteration 4 - Update recipe
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: "true" }
    );
  })
  .then((result) => {
    console.log("Rigatoni alla Genovese recipe updated!", result.duration);
    //Connected to the database: "recipe-app" , Rigatoni alla Genovese recipe updated! 100 (Terminal)
  })

  //Iteration 5 - Remove a recipe
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((result) => {
    console.log("Carrot Cake deleted");
    //Connected to the database: "recipe-app", Rigatoni alla Genovese recipe updated! 100, Carrot Cake deleted (Terminal)
  })

//Iteration 6 - Close the Database
.then(() => {
      mongoose.connection.close(function(){
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    })
    //Mongoose default connection disconnected through app termination
})

.catch (error => {
console.error('Error connecting to the database', error);
 })

