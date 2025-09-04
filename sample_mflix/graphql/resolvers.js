// resolvers.js
import { Movie } from "../models/Movie.js";

export const resolvers = {
	Query: {
		movies: async (_p, { filter, limit, skip}) => {
            //Här sätter vi i ordning vårt filter med variabeln q
			const q = {};

            //Fyll på med filter för titleContains (regex), genre(exakt matchning), minYear(gte), maxYear(lte), minRating(gte)
			if(filter) {
				if (filter.titleContains) q.title = new RegExp(filter.titleContains, "i");
				if (filter.genre) q.genres = filter.genre;
				if (filter.minYear || filter.maxYear) {
					q.year = {};
					if (filter.minYear) q.year = {$gte: filter.minYear};
					if (filter.maxYear) q.year.$lte = parseInt(filter.maxYear);
				}
				if (filter.minRating) {
					q["imdb.rating"] = { $gte: parseFloat(filter.minRating) };
				}
			}
            console.log("q", q);
            //Skip = hoppa över X antal dokument (enkel paginering)
			const offset = parseInt(skip) * parseInt(limit);

            //Limit = begränsa antalet dokument som returneras
			return Movie.find(q).limit(parseInt(limit)).skip(offset); //Vad kan vi lägga till här för att använda skip och limit?
		},

		//movie: Hur hämtar vi ut en enskild movie??,

		topRatedPerYear: async (_p, { year, minVotes, limit }) => {
			/*skriv en aggregationspipeline som hämtar toppfilmer för ett år*/
			const pipeline = [];
			//vi behöver $match på år och minVotes (alltså minsta antal röster)
			const matchStage = {
				year: year,
				"imdb.votes": { $gte: minVotes }
			};
			pipeline.push({ $match: matchStage });

			//vi vill sortera $sort på imdb.rating
			pipeline.push({ $sort: { "imdb.rating": -1 } });

			//vi vill begränsa $limit till limit
			if (limit) {
				pipeline.push({ $limit: limit });
			}
			//vi vill projektera $project ut title, year, imdb, genres, cast, languages, directors
			//Läs mer om aggregationspipeline på https://article.arunangshudas.com/what-is-the-mongodb-aggregation-pipeline-in-mongoose-308a05c15e7e
			pipeline.push({
				$project: {
					title: 1,
					year: 1,
					imdb: 1,
					genres: 1,
					cast: 1,
					languages: 1,
					directors: 1
				}
			});

			return await Movie.aggregate(pipeline);
		},
		movie: async (_p, { id }) => {
			if (!id) return null;
			const movie = await Movie.findById(id);

			return movie;
		},
	},

	Movie: {
		id: (doc) => String(doc._id),
		castCount: (doc) => doc.cast.length,
		imdbScoreRounded: (doc) =>  Math.round(doc.imdb.rating),
	},
};
