import { Recipe } from "../models/Recipe.js";
import mongoose from "mongoose";

export const resolvers = {
	Query: {
		recipes: async (_p, { title, diet, maxTimeMin, limit }) => {
			// TODO:
			// 1) bygg filter = {}
			//    - om title: filter.title = { $regex: title, $options: "i" }
			//    - om diet: filter.diet = diet
			//    - om maxTimeMin: använd $expr med ($add: ["$prepTimeMin","$cookTimeMin"]) <= maxTimeMin
			//       -> kräver aggregate ELLER klient-beräkning. För enkelhet: gör aggregate.
			// 2) sortera t.ex. { createdAt: -1 }, applicera limit
			return [];
		},

		recipe: async (_p, { id }) => {
			// TODO: validera ObjectId, findById
			return null;
		},
	},

	Mutation: {
		createRecipe: async (_p, { input }) => {
			// TODO: skapa nytt recept (createdAt = new Date().toISOString())
			// return saved doc
			return null;
		},

		//updateRecipe
		//deleteRecipe
		//addIngredient
		//updateIngredient
		//removeIngredient
	},

	Recipe: {
		id: (doc) => doc.id,
		totalTimeMin: (doc) => {
			//console.log("Kolla vad dokumentet är för något:", doc);
			// TODO: return doc.?? + doc.??
			return 0;
		},
	},
};
