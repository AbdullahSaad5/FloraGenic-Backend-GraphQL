import { CustomerModel } from "../Customers/db.js";
import { GardenerModel } from "../Gardeners/db.js";
import { GardenerOrderModel } from "./db.js";

export const GardenerOrderMutation = {
  gardenerOrderCreate: async (_, args, ctx) => {
    const { user } = ctx;
    if (!user) {
      throw new Error("You are not authenticated!");
    }

    if (user.userType === "Admin") {
      if (!args.data.customer) {
        throw new Error("You must provide a customer");
      }
    }

    if (user.userType === "Customer") {
      const customer = await CustomerModel.findById(user.id);
      args.data.customer = customer.id;
    }

    const { data } = args;

    const gardener = await GardenerModel.findById(data.gardener);

    if (!gardener) {
      throw new Error("Gardener not found!");
    }

    let totalPrice;

    if (gardener.duration === "Hourly" && data.duration === "Hours") {
      totalPrice = gardener.price * data.requestedTime;
    } else if (gardener.duration === "Daily" && data.duration === "Days") {
      totalPrice = gardener.price * data.requestedTime;
    } else {
      let hourlyPrice;
      switch (gardener.duration) {
        case "Hourly":
          hourlyPrice = gardener.price;
          break;
        case "Daily":
          hourlyPrice = gardener.price / 8;
          break;
        case "Weekly":
          hourlyPrice = gardener.price / 40;
          break;
        case "Monthly":
          hourlyPrice = gardener.price / 160;
          break;
        default:
          hourlyPrice = gardener.price;
      }

      switch (data.duration) {
        case "Hours":
          totalPrice = hourlyPrice * data.requestedTime;
          break;
        case "Days":
          totalPrice = hourlyPrice * data.requestedTime * 8;
          break;
        default:
          totalPrice = hourlyPrice * data.requestedTime;
      }
    }

    const gardenerOrder = await GardenerOrderModel.create({
      ...data,
      totalPrice,
    });

    return gardenerOrder;
  },
};
