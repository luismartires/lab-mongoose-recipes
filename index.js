const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    updateDB()

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


async function updateDB() {

  try {

    // CREATE

    let recipe = await Recipe.create ({ title: "Mixed Eggs", level: "UltraPro Chef", ingredients: ["Eggs", "Milk", "Salt"], cuisine: "French", dishType: "breakfast", duration: 120, creator: "Chef  Luís Mártires"})
    console.log(`Recipe Created: ${recipe.title}`);

    let otherRecipes = await Recipe.insertMany(data);
    otherRecipes.forEach((recipes) => {
    console.log(`Other Recipes: ${recipes.title}`);
    });

    // READ

    let recipesfromDB = await Recipe.find();
    console.log(`All Recipes from DB ${recipesfromDB}`);
 
    // UPDATE

    await Recipe.findOneAndUpdate( {title: "Rigatoni alla Genovese"}, {duration: 100});
    console.log("Recipe Updated Successfully");

    // DELETE

    await Recipe.deleteOne( {title: "Carrot Cake"});
    console.log("Recipe Deleted Successfully");
  }

  catch(e) {
    console.log("Error Occurred");
  }

  finally {
    mongoose.connection.close();
  }
}



