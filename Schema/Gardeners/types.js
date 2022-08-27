// TODO Add Skill Type and add it inside Gardener Type

export const GardenerTypes = `

    type Gardener {
        id: ID!
        firstName: String!
        lastName: String!
        nationality: String!
        phoneNumber: String!
        CNIC: String!
        image: String
        createdAt: String!
        updatedAt: String!
    }

    extend type Query{
        gardener(id: ID!): Gardener
        gardeners: [Gardener!]
        gardenerSearch(search: String!): [Gardener!]
    }

    input GardenerCreateInput{
        firstName: String!
        lastName: String!
        nationality: String!
        phoneNumber: String!
        CNIC: String!
        image: String
    }

    input GardenerUpdateInput{
        firstName: String
        lastName: String
        nationality: String
        phoneNumber: String
        CNIC: String
        image: String
    }
    
    extend type Mutation{
        gardenerCreate(data: GardenerCreateInput!): Gardener!
        gardenerUpdate(id: ID!, data: GardenerUpdateInput!): Gardener!
        gardenerDelete(data: ID!): String!
        gardenerBlock(data:ID!): String!
    }
`;
