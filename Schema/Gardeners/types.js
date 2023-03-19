// TODO Add Skill Type and add it inside Gardener Type

export const GardenerTypes = `

    type Gardener {
        id: ID!
        firstName: String!
        lastName: String!
        gender: String!
        phoneNumber: String!
        city: String!
        CNIC: String!
        price: Int!
        duration: String!
        rating: Float!
        experience: Int!
        image: String
        createdAt: String!
        updatedAt: String!
        userDetails: User!
        skills: [SkillWithEndorsements!]
    }

    type SkillWithEndorsements{
        skill: Skill!
        endorsements: Int!
    }

    extend type Query{
        gardener(id: ID!): Gardener
        gardeners: [Gardener!]
        gardenerSearch(search: String!): [Gardener!]
    }

    input GardenerCreateInput{
        firstName: String!
        lastName: String!
        gender: String!
        city: String!
        phoneNumber: String!
        price: Int!
        duration: String!
        experience: Int!
        CNIC: String!
        image: String
        skills: [ID!]
    }

    input GardenerUpdateInput{
        firstName: String
        lastName: String
        gender: String
        city: String
        phoneNumber: String
        CNIC: String
        price: Int
        duration: String
        experience: Int
        image: String
        skills: [ID!]
    }
    
    extend type Mutation{
        gardenerCreate(data: GardenerCreateInput!): Gardener!
        gardenerUpdate(id: ID!, data: GardenerUpdateInput!): Gardener!
        gardenerDelete(data: ID!): String!
        gardenerBlock(data:ID!): String!
        endorseSkill(gardenerID: ID!, skillID: ID!): String!
    }
`;
