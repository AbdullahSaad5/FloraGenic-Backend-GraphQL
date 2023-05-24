// TODO Add Skill Type and add it inside Gardener Type

export const GardenerOrderTypes = `

    type GardenerOrder {
        id: ID!
        customer: Customer!
        gardener: Gardener!
        service: String!
        date: String!
        requestedTime: Float!
        duration: String!
        status: String!
        totalPrice: Float!
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
        duration: String!
        requestedTime: Float!
    }
    
    extend type Mutation{
        gardenerOrderCreate(data: GardenerOrderCreateInput!): String!
    }
`;
