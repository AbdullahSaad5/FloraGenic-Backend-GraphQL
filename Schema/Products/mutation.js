import { ApolloError } from "apollo-server-core";
import db from "../../connection.js";
import { ProductModel } from "./db.js";
import { ReviewModel } from "../Reviews/db.js";

export const ProductMutation = {
  productCreate: async (parent, args) => {
    const { data } = args;
    const product = await ProductModel.create(data);
    return product;
  },
  productUpdate: async (parent, args) => {
    const { id, data } = args;
    await ProductModel.findByIdAndUpdate(id, {
      $set: data,
    });
    return "Product updated Successfully";
  },
  productDelete: async (parent, args) => {
    const { id } = args;
    const session = await db.startSession();
    try {
      session.startTransaction();
      const product = await ProductModel.findById(id, null, { session });
      if (!product) {
        throw new ApolloError("Error: Product not found on the provided ID");
      }
      await ReviewModel.deleteMany({ productID: id }, { session });
      await ProductModel.findByIdAndDelete(id, { session });
      await session.commitTransaction();
      return "Product deleted";
    } catch (err) {
      await session.abortTransaction();
      throw new ApolloError(err);
    } finally {
      await session.endSession();
    }
  },
  productHide: async (parent, args) => {
    const { id } = args;

    const product = await ProductModel.findById(id);
    if (!product) {
      throw new ApolloError("Error: Product not found on the provided ID");
    }
    await ProductModel.findByIdAndUpdate(id, {
      $set: { hidden: !product.hidden },
    });

    const status = product.hidden ? "unhidden" : "hidden";

    return `Product ${status} from the products list on the store`;
  },
};
