// TODO Add Skill Type and add it inside Gardener Type

export const GardenerTypes = `

    type Gardener {
        id: ID!
        firstName: String!
        lastName: String!
        gender: String!
        nationality: String!
        city: String!
        CNIC: String!
        image: String
        createdAt: String!
        updatedAt: String!
        userDetails: User!
        skills: [SkillWithEndorsements!]
        gigs: [Gig!]
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
