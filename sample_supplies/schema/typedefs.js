export const typeDefs = /* GraphQL */ `
	# Översätt Sale.js modellen till GraphQL-schema. Int, Float, String, Boolean, ID är inbyggda typer
    # Date i saleDate får vara String i GraphQL

	type Item {
	}

	type Customer {
	}

	type Sale {
		# Beräknat fält (resolver): summerar items.price * items.quantity
		totalAmount: Float!
	}

	type Query {
		# Hämta alla sales, valfritt filter & limit
		sales(storeLocation: String, limit: Int): [Sale!]!

		# Hämta en specifik sale
		sale(id: ID!): Sale

		# Total summa för alla sales på en storeLocation
		totalAmountPerLocation(storeLocation: String!): Float!
	}
`;
