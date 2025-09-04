import { Sale } from "../models/Sale.js";
import mongoose from "mongoose";

export const resolvers = {
	Query: {
		// sales(storeLocation, limit)
		sales: async (_p, { storeLocation, limit }) => {
			const filter = {};
            // Lägg till i filtret om storeLocation finns, hämta sedan data med .find
			if(storeLocation) {
				filter.storeLocation = storeLocation;
			}
            //Begränsa med .limit om limit finns
            //Se om ni kan lägga in en sort på saleDate
			let sortBy = {};
			if (sort) {
				const sortField = sort.startsWith("-") ? sort.slice(1) : sort;
				const sortOrder = sort.startsWith("-") ? -1 : 1;
				sortBy[sortField] = sortOrder;
			}

			return Sale.find(filter).limit(parseInt(limit)).sort(sortBy);
		},

		// sale(id)
		sale: async (_p, { id }) => {
			//Kolla att det är ett valid mongoose object
			if (!mongoose.Types.ObjectId.isValid(id)) {
				throw new Error("Invalid ID");
			}
            //Hämta en sale med id
			const movie = await Sale.findById(id);

			return movie;
		},

		// totalAmountPerLocation(storeLocation)
		// Aggregation: summerar price*quantity för alla items på alla sales i en location
		totalAmountPerLocation: async (_p, { storeLocation }) => {
			const [row] = await Sale.aggregate([
				//I denna aggregate behöver vi:
				//$match på storeLocation (https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/)
				//$unwind på items (https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/)
				//$group på total (https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/)
				//$sum på total (https://www.mongodb.com/docs/manual/reference/operator/aggregation/sum/)
				//$$multiply för att räkna ut totalen (https://www.mongodb.com/docs/manual/reference/operator/aggregation/multiply/)
			]);
			return row?.total ?? 0;
		},
	},

	// Fält-resolvers
	Sale: {
		id: (doc) => doc.id, // Mongoose virtual (_id -> id)

		// Hur ska vi räkna ut totalAmount per enskild sale?
		totalAmount: (doc) => {
			//???
		},
	},
};
