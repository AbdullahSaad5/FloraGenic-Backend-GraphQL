import { ProductModel } from "../Products/db.js";
import { CustomerModel } from "../Customers/db.js";
import { PaymentModel } from "../Payments/db.js";

export const OrderResolvers = {
  customerDetails: async (parent) => {
    const customer = await CustomerModel.findById(parent.customerID);
    return customer;
  },
  productsDetails: async (parent) => {
    const products = await ProductModel.find({
      _id: {
        $in: parent.products.map((product) => product.productID),
      },
    });
    return products;
  },
  paymentDetails: async (parent) => {
    const payment = await PaymentModel.findById(parent.paymentID);
    return payment;
  },
};
