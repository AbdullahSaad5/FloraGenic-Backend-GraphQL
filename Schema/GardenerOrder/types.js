// TODO Add Skill Type and add it inside Gardener Type

export const GardenerOrderTypes = `

    type GardenerOrder {
        id: ID!
        customer: Customer!
        gardener: Gardener!
        service: String!
        date: String!
        requestedTime: Int!
        duration: String!
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
        duration: String!
        requestedTime: Int!
    }
    
    extend type Mutation{
        gardenerOrderCreate(data: GardenerOrderCreateInput!): Gardener!
    }
`;
