const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

// Connection to the database
const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// own receipe
const recipe = {
	title: "Bombay Sandwich",
	level: "Amateur Chef",
	ingredients: [

                "1/2 Beetroot, small","1 cup Coriander, leaves","1 Cucumber, medium",
                "1 Garlic clove, small","1 Green chilies","1 Onion, medium","1 Potato, medium",
                "1 Tomato, medium","1 Lemon juice","1 tsp Cumin","6 slices Bread","3 tbsp Butter",
                "1 tbsp Water","½ teaspoon chat masala (or sandwich masala (more if needed))","¼ teaspoon kala namak ((optional))"],
                
	cuisine: "indian",
	dishType: "breakfast",
	image:
		"https://i.pinimg.com/564x/03/16/87/0316871fb51ac93037e5854c19c13c35.jpg",
	duration: 25,
	creator: "Swasthi's Indian Recipes",
};

// Connection
mongoose
.connect(MONGODB_URI)
.then((x) => {
  console.log(`Connected to the database: "${x.connection.name}"`);

// Clearing
// return Recipe.deleteMany();
})

// create the recipe from "const Recipe = require("./models/Recipe.model");""
.then(() => {
  Recipe.create(recipe)
    .then((rec) => console.log(`recipe has been created: ${recipe.title}`))
    .catch((error) => `an error has happended: ${error}`);
})

.catch((error) => {
  console.error("Error connecting to the database", error);
});

// insert the receipes from "const data = require("./data");"
Recipe.insertMany(data)
.then((recipes) => {
  recipes.forEach((recipe) => {
    console.log(recipe.title);
  });
})

.catch((error) => console.log(error));

// find the receipe by title (first Position in "findOneAndUpdate" and change the values depending on the properties (every position after the first one))
Recipe.findOneAndUpdate(
{ title: "Rigatoni alla Genovese" },
{ duration: 100 },
{ new: true }
)

.then(() => console.log("Executed Order 66"))

.catch((error) => console.log("error", error));

//find a receipe by the propertie of title and delete it
Recipe.findOneAndDelete(
{ title: "Carrot Cake" }
)
.then(() => {
  console.log("Go away, Carrot Cake! Nobody wants to eat you!!!1111oneoneeleven");

//Closing
  mongoose.connection.close();
})
.catch((error) => console.log("something went wrong", error));