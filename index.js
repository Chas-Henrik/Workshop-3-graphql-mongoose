//npm i express dotenv mongoose
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

dotenv.config();

const app = express();

app.use(express.json());

const apollo = new ApolloServer({ typeDefs, resolvers });
await apollo.start();

app.use(
	"/graphql",
	expressMiddleware(apollo, {
		context: async () => ({}),
	})
);

const PORT = 3000;

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log("GraphQL is running on port 3000");
		});
	})
	.catch(console.error);
