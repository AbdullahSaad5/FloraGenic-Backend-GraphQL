export const PromoTypes = `
    type Promo {
        id: ID!
        name: String!
        description: String!
        discount: Float!
        startDate: String!
        endDate: String!
    }


    extend type Query {
        promos: [Promo!]!
        promo(id: ID!): Promo
    }

    input PromoCreateInput {
        name: String!
        description: String!
        discount: Float!
        startDate: String!
        endDate: String!
    }

    input PromoUpdateInput {
        name: String
        description: String
        discount: Float
        startDate: String
        endDate: String
    }

    extend type Mutation {
        promoCreate(input: PromoCreateInput!): Promo
        promoUpdate(id: ID!, input: PromoUpdateInput!): Promo
        promoDelete(id: ID!): Boolean
    }
`;
