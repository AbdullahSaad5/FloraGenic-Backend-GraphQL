// customer/query.js
import { UserModel } from "../Users/db.js";
import { OrderModel } from "../Orders/db.js";
import { ProductModel } from "../Products/db.js";
import { NurseryModel } from "../Nurseries/db.js";
import { ComplaintModel } from "../Complaints/db.js";

export const DashboardQuery = {
  stats: async (parent, args) => {
    const totalUsers = await UserModel.countDocuments();
    const totalNurseries = await NurseryModel.countDocuments();
    const totalProducts = await ProductModel.countDocuments();
    const totalOrders = await OrderModel.countDocuments();

    const feedbackByType = await ComplaintModel.aggregate([
      {
        $group: {
          _id: "$type",
          type: { $first: "$type" },
          count: { $sum: 1 },
        },
      },
    ]);

    const feedbackTypes = ["Feedback", "Complaint", "Suggestion", "Bug"];
    const feedbackKeys = feedbackByType.map((item) => item.type);
    const missingTypes = feedbackTypes.filter(
      (type) => !feedbackKeys.includes(type)
    );
    missingTypes.forEach((type) => {
      feedbackByType.push({
        type,
        count: 0,
      });
    });

    const usersByType = await UserModel.aggregate([
      {
        $group: {
          _id: "$userType",
          type: { $first: "$userType" },
          count: { $sum: 1 },
        },
      },
    ]);

    const userTypes = ["Admin", "Customer", "Gardener", "NurseryOwner"];
    const userKeys = usersByType.map((item) => item.type);
    const missingUserTypes = userTypes.filter(
      (type) => !userKeys.includes(type)
    );
    missingUserTypes.forEach((type) => {
      usersByType.push({
        type,
        count: 0,
      });
    });

    const productsByCategory = await ProductModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $group: {
          _id: "$category",
          category: { $first: "$categoryInfo.name" },
          count: { $sum: 1 },
        },
      },
    ]);

    return {
      totalUsers,
      totalNurseries,
      totalProducts,
      totalOrders,
      feedbackByType,
      productsByCategory,
      usersByType,
    };
  },
};
