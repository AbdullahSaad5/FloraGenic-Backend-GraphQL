import { ProductModel } from "../Products/db.js";
import { CustomerModel } from "../Customers/db.js";
import { PaymentModel } from "../Payments/db.js";
import { NurseryOwnerModel } from "../NurseryOwner/db.js";

export const OrderResolvers = {
  customerDetails: async (parent) => {
    const customer = await CustomerModel.findById(parent.customerID);
    return customer;
  },
  productsDetails: async (parent, args, context) => {
    const { user } = context;

    let products;
    if (user?.userType === "NurseryOwner") {
      const nurseryOwner = await NurseryOwnerModel.find({
        userID: user.id,
      });
      products = await ProductModel.find({
        _id: {
          $in: parent.products.map((product) => product.productID),
        },
        nurseryID: {
          $in: nurseryOwner.nurseries,
        },
      });
    } else {
      products = await ProductModel.find({
        _id: {
          $in: parent.products.map((product) => product.productID),
        },
      });
    }

    return products;
  },
  paymentDetails: async (parent) => {
    const payment = await PaymentModel.findById(parent.paymentID);
    return payment;
  },
};

export const ProductOrderResolvers = {
  productDetails: async (parent) => {
    const product = await ProductModel.findById(parent.productID);
    return product;
  },
};
