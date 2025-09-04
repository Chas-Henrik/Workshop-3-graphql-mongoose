# Workshop med GraphQL och mongoose

Dagens workshop är som följer...

---

### 1. Initial setup

- En MongoDB-instans (t.ex. via **MongoDB Atlas**)
- I denna workshop ska vi arbeta med exempeldata som vi kan ladda in i MongoDB
- [Följ denna länk för instruktioner om hur man laddar exempeldata](https://www.mongodb.com/resources/basics/databases/sample-database#:~:text=Explorer%20tutorial%20below.-,Option%201%3A%20Loading%20Sample%20Data%20from%20the%20Clusters%20View,-Log%20in%20to)
- En connection string till denna instans (gå till ert kluster i atlas och clicka på "Connect", välj Drivers och sen mongoose)
- Skapa en ny mapp där ni vill ha ert projekt och fortsätt med stegen nedan

**NPM**
Kör följande kommando för att installera nödvändiga paket

```bash
npm init -y
npm i @apollo/server express graphql mongoose dotenv @as-integrations/express5
npm i nodemon --save-dev
```

**Package.json**
Om ni vill köra import istället för require, lägg till:

```json
{
	"type": "module"
}
```

Lägg till lämpliga script, ex.

```json
{
	"scripts": {
		"dev": "nodemon index.js"
	}
}
```

**.env**

- Se till att MONGODB_URI i er .env pekar på er connection string med erat användarnamn och lösenord. (se .env_example)
- Lägg också till databasens namn antingen i connection string som nedan:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.htjfnnq.mongodb.net/<databasename>?retryWrites=true&w=majority&appName=Cluster0
```

Alternativt sätt namnet när ni skapar en connection med mongoose

```javascript
await mongoose.connect(process.env.MONGODB_URI, {
	dbName: "YOUR_DATABASE_NAME_HERE",
});
```

---

### 2. Kod-setup

**Koppla till MongoDB**
Skapa en fil som heter db.js som kan hantera kopplingen till MongoDB

```javascript
//db.js
import mongoose from "mongoose"; //med "type":"module"
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
	if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
	await mongoose.connect(process.env.MONGODB_URI, {
		dbName: "YOUR_DATABASE_NAME_HERE", //om du inte sätter denna i din connection string
	});
	console.log("MongoDB connected");
}
```

---

### Stegen nedan är om ni börjar från scratch, i exemplen (sample_mflix, sample_supplies och recipe) har ni fått denna struktur redan.

**Definiera mongoose schema och model**
Skapa en mapp som heter models och där kan du lägga dina mongoose scheman, ex. Book.js.

```javascript
//models/Book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		author: { type: String, required: true, trim: true },
		genre: { type: String, required: true, trim: true },
	},
	{ timestamps: true, collection: "exampleBooks" }
);

export const Book = mongoose.model("Book", bookSchema);
```

**Definiera GraphQL-scheman**
Skapa en ny mapp som heter graphql, skapa två filer, en som heter typedefs.js och en som heter resolvers.js

Nedan följer exempel på hur dessa kan se ut. Se även tidigare repon.

```javascript
//typdefs.js
export const typeDefs = /* GraphQL */ `
	type Book {
		id: ID!
		author: String!
		title: String!
		genre: String!
	}

	# Fyll på med mutations och queries etc. efter behov.
`;
```

```javascript
//resolvers.js
import { Book } from "../models/Book.js";

export const resolvers = {
	Query: {
		books: async (_parent, args) => {
			const filter = {};
			if (args.author) filter.author = new RegExp(args.author, "i");
			if (args.genre) filter.genre = new RegExp(args.genre, "i");
			return Book.find(filter).lean();
		},
	},
	Mutation: {
		createBook: async (_parent, { input }) => {},
	},
};
```

**Sätt upp en server med Apollo och express**

Observera att importer som typedefs och resolvers behöver bytas ut för att passa er setup.

```javascript
//npm i express dotenv mongoose
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from "./graphql/typedefs.js";
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
```

---

### Resurser

**Aggregationer, pipelines, $lookup**

För att lösa vissa uppgifterna kan det vara lämpligt att använda aggregationer. Se länkar nedan för mer info.

[Om MongoDB Aggregations](https://www.mongodb.com/docs/manual/aggregation/)
[Aggregation in mongoose](https://article.arunangshudas.com/what-is-the-mongodb-aggregation-pipeline-in-mongoose-308a05c15e7e)
[Mer aggregation i mongoose](https://www.geeksforgeeks.org/mongodb/mongoose-aggregate-aggregate-api/)
