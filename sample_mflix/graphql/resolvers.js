// resolvers.js
import { Movie } from "./models/Movie.js";

export const resolvers = {
	Query: {
		movies: async (_p, { filter, limit, skip}) => {
            //Här sätter vi i ordning vårt filter med variabeln q
			const q = {};
            console.log(filter);
            //Fyll på med filter för titleContains (regex), genre(exakt matchning), minYear(gte), maxYear(lte), minRating(gte)
			
            //Skip = hoppa över X antal dokument (enkel paginering)
            //Limit = begränsa antalet dokument som returneras
			return Movie.find(q); //Vad kan vi lägga till här för att använda skip och limit?
		},

		//movie: Hur hämtar vi ut en enskild movie??,

		topRatedPerYear: async (_p, { year, minVotes, limit }) => {
			/*skriv en aggregationspipeline som hämtar toppfilmer för ett år*/
			//vi behöver $match på år och minVotes (alltså minsta antal röster)
			//vi vill sortera $sort på imdb.rating
			//vi vill begränsa $limit till limit
			//vi vill projektera $project ut title, year, imdb, genres, cast, languages, directors
			//Läs mer om aggregationspipeline på https://article.arunangshudas.com/what-is-the-mongodb-aggregation-pipeline-in-mongoose-308a05c15e7e

			return Movie.aggregate([]);
		},
	},

	/* Movie: {
		id: (doc) => String(doc._id),
		castCount: ??,
		imdbScoreRounded: ??,
	}, */
};
