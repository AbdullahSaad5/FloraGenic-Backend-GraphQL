export const SkillTypes = `
    type Skill{
        id: ID!
        name: String!
        description: String!
        image: String!
    }

    extend type Query{
        skill(id: ID!): Skill
        skills: [Skill!]
        skillSearch(search: String!): [Skill!]
    }

    input SkillCreateInput{
        name: String!
        description: String!
        image: String!
    }

    input SkillUpdateInput{
        name: String
        description: String
        image: String
    }

    extend type Mutation{
        skillCreate(data: SkillCreateInput!): Skill!
        skillUpdate(id: ID!, data: SkillUpdateInput!): String!
        skillDelete(id: ID!): String!
        skillHide(id: ID!): String!
    }

`;
