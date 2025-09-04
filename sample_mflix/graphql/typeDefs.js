// schema.js
export const typeDefs = /* GraphQL */ `
	type IMDB {
		rating: Float
		votes: Int
		id: Int
	}
	type Movie {
		id: ID!
		title: String!
		year: Int
		genres: [String!]
		plot: String
		cast: [String!]
		languages: [String!]
		directors: [String!]
		imdb: IMDB
		castCount: Int! # computed
		imdbScoreRounded: Int! # computed
	}

	input MovieFilter {
		titleContains: String
		genre: String
		minYear: Int
		maxYear: Int
		minRating: Float
	}

	type Query {
		movies(filter: MovieFilter, limit: Int = 20, skip: Int = 0): [Movie!]!

		movie(id: ID!): Movie

		# Räkna ut oppfilmer för ett år
		topRatedPerYear(
			year: Int!
			minVotes: Int = 1000
			limit: Int = 10
		): [Movie!]!
	}
`;
