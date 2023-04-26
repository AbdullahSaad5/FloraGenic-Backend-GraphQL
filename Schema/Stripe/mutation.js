import stripe from "stripe";

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

export const StripeMutation = {
  createPaymentIntent: async (_, args) => {
    const { amount } = args;

    const paymentIntent = await stripeInstance.paymentIntents.create({
      currency: "USD",
      amount: amount,
      description: "FloraGenic Plant Store",
      // automatic_payment_methods: { enabled: true },
      payment_method_types: ["card"],
    });

    return paymentIntent.client_secret;
  },
};
