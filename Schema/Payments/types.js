export const PaymentTypes = `
    type Payment {
        id: ID!
        cardHolderName: String!
        cardNumber: String!
        cardExpiryDate: String!
        cardCVV: String!
        customerDetails: Customer!
    }

    input PaymentInput {
        cardHolderName: String!
        cardNumber: String!
        cardExpiryDate: String!
        cardCVV: String!
    }

    input PaymentUpdateInput {
        cardHolderName: String
        cardNumber: String
        cardExpiryDate: String
        cardCVV: String
    }

    extend type Query {
        payments(customerID: ID!): [Payment!]!
        payment(id: ID!): Payment!
    }

    extend type Mutation {
        paymentCreate(payment: PaymentInput!): Payment!
        paymentUpdate(id: ID!, payment: PaymentUpdateInput!): Payment!
        paymentDelete(id: ID!): Payment!
    }
`;
