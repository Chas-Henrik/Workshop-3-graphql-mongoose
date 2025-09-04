// models/Movie.js
import mongoose from "mongoose";
const MovieSchema = new mongoose.Schema(
	{
		title: { type: String, index: true },
		year: Number,
		genres: [String],
		plot: String,
		cast: [String],
		languages: [String],
		directors: [String],
		imdb: { rating: Number, votes: Number, id: Number },
	},
	{ collection: "movies" }
);
export const Movie = mongoose.model("Movie", MovieSchema);
