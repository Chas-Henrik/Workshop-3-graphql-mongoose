import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
	{
		name: String,
		tags: [String],
		price: Number,
		quantity: Number,
	},
	{ _id: false }
);

const CustomerSchema = new mongoose.Schema(
	{
		gender: String,
		age: Number,
		email: String,
		satisfaction: Number,
	},
	{ _id: false }
);

const SaleSchema = new mongoose.Schema(
	{
		saleDate: Date,
		items: [ItemSchema],
		storeLocation: String,
		customer: CustomerSchema,
		couponUsed: Boolean,
		purchaseMethod: String,
	},
	{ collection: "sales" } // bind till sample_supplies.sales
);

export const Sale = mongoose.model("Sale", SaleSchema);
