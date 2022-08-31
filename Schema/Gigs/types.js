export const GigTypes = `
    type Gig{
        id: ID!
        gardenerID: ID!
        name: String!
        description: String!
        type: String!
        images: [String!]
        packages: [Package!]!
        overallRating: Float!
        gardenerDetails: Gardener!
        reviews: [Review!]!
    }

    type Package{
        name: String!
        description: String!
        price: Float!
        deliverWithinDays: Int!
    }

    input PackageCreateInput{
        name: String!
        description: String!
        price: Float!
        deliverWithinDays: Int!
    }

    input PackageUpdateInput{
        name: String
        description: String
        price: Float
        deliverWithinDays: Int
    }

    extend type Query{
        gigs(gardenerID: ID): [Gig!]!
        gig(id: ID!): Gig!
        gigSearch(search: String!): [Gig!]!
    }

    input GigCreateInput {
        gardenerID: ID!
        name: String!
        description: String!
        type: String!
        images: [String!]!
        packages: [PackageCreateInput!]!
    }

    input GigUpdateInput {
        name: String
        description: String
        type: String
        images: [String!]
        packages: [PackageUpdateInput!]
    }

    extend type Mutation {
        gigCreate(input: GigCreateInput!): Gig!
        gigUpdate(id: ID!, input: GigUpdateInput!): Gig!
        gigDelete(id: ID!): Boolean!
        gigHide(id: ID!): Boolean!
    }
`;
