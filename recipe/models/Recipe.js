import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		amount: { type: Number, required: true, min: 0 },
		unit: { type: String, required: true, trim: true },
	},
	{ _id: false }
);

const recipeSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String },
		diet: {
			type: String,
			enum: ["VEGAN", "VEGETARIAN", "GLUTEN_FREE", "NONE"],
			default: "NONE",
		},
		ingredients: { type: [ingredientSchema], default: [] },
		prepTimeMin: { type: Number, required: true, min: 0 },
		cookTimeMin: { type: Number, required: true, min: 0 },
		createdAt: { type: Date, default: () => new Date() },
	},
	{ timestamps: true, collection: "recipes" }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
