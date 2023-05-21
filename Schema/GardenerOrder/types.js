// TODO Add Skill Type and add it inside Gardener Type

export const GardenerOrderTypes = `

    type GardenerOrder {
        id: ID!
        customer: Customer!
        gardener: Gardener!
        service: String!
        date: String!
        requestedTimeInDays: String!
        status: String!
        totalPrice: Int!
        createdAt: String!
        updatedAt: String!
    }

    extend type Query{
        gardenerOrders: [GardenerOrder!]
        gardenerOrder(id:ID!): GardenerOrder
    }

    input GardenerOrderCreateInput{
        customer: ID
        gardener: ID!
        service: String!
        date: String!
        requestedTimeInDays: String!
        totalPrice: Int!
    }
    
    extend type Mutation{
        gardenerOrderCreate(data: GardenerOrderCreateInput!): Gardener!
    }
`;
