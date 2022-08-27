export const SkillTypes = `
    type Skill{
        id: ID!
        name: String!
        description: String!
    }

    extend type Query{
        skill(id: ID!): Skill
        skills: [Skill!]
        skillSearch(search: String!): [Skill!]
    }

    input SkillCreateInput{
        name: String!
        description: String!
    }

    input SkillUpdateInput{
        name: String
        description: String
    }

    extend type Mutation{
        skillCreate(data: SkillCreateInput!): Skill!
        skillUpdate(id: ID!, data: SkillUpdateInput!): Skill!
        skillDelete(id: ID!): String!
    }

`;
