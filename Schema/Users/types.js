export const UserTypes = `
    type User{
        id: ID!
        email: String!
        userType: UserType!
        bannedStatus: Boolean!
        details: UserDetails
        token: String!
    }
   
    union UserDetails = Customer | Admin | Gardener | NurseryOwner

    enum UserType{
        Customer
        Admin
        Gardener
        NurseryOwner
    }

    input UserLoginInput {
        email: String!
        password: String!
        userType: String!
    }

    extend type Query{
        users: [User!]
        user(id: ID!): User
    }

    input UserRegisterInput {
        email: String!
        password: String!
        userType: String!
    }

    input UserUpdateInput {
        password: String
        userType: String
    }

    extend type Mutation{
        login(credentials: UserLoginInput!): User
        loginWithToken(token: String!): User


        register(credentials: UserRegisterInput!): String!
        registerWithToken(token: String!, userType: String!): String!

        registerCustomer(credentials: UserRegisterInput!, details: CustomerCreateInput!): String!
        registerAdmin(credentials: UserRegisterInput!, details: AdminCreateInput!): String!
        registerGardener(credentials: UserRegisterInput!, details: GardenerCreateInput!): String!
        registerNurseryOwner(credentials: UserRegisterInput!, details: NurseryOwnerCreateInput!): String!
        
        updateAdmin(id: ID!, credentials: UserUpdateInput!, details: AdminUpdateInput!): String!
        updateGardener(id: ID!, credentials: UserUpdateInput!, details: GardenerUpdateInput!): String!
        updateNurseryOwner(id: ID!, credentials: UserUpdateInput!, details: NurseryOwnerUpdateInput!): String!
        updateCustomer(id: ID!, credentials: UserUpdateInput!, details: CustomerUpdateInput!): String!
        
        addCustomer(userID: ID!, details: CustomerCreateInput!): String!
        deleteUser(id: ID!): String!
        
        requestPasswordReset(email: String!): String!
        resetPassword(token: String!, password: String!): String!
        blockUser(id: ID!): String!
    }
`;
