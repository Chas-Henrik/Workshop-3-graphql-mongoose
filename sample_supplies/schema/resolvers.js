import { Sale } from "../models/Sale.js";
import mongoose from "mongoose";

export const resolvers = {
	Query: {
		// sales(storeLocation, limit)
		sales: async (_p, { storeLocation, limit }) => {
			const filter = {};
            //Lägg till i filtret om storeLocation finns, hämta sedan data med .find
            //Begränsa med .limit om limit finns
            //Se om ni kan lägga in en sort på saleDate
			return query;
		},

		// sale(id)
		sale: async (_p, { id }) => {
			//Kolla att det är ett valid mongoose object
            //Hämta en sale med id
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
