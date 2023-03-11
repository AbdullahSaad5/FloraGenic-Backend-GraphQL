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
        loginCustomer(credentials: UserLoginInput!): User
        loginAdmin(credentials: UserLoginInput!): User
        loginGardener(credentials: UserLoginInput!): User
        users: [User!]
        user(id: ID!): User
        sendResetEmail(email: String!): String!
    }

    input UserRegisterInput {
        email: String!
        password: String!
        userType: String!
    }

    input UserUpdateInput {
        email: String
        password: String
        userType: String
    }


    extend type Mutation{
        login(credentials: UserLoginInput!): User
        register(credentials: UserRegisterInput!): String!

        registerCustomer(credentials: UserRegisterInput!, details: CustomerCreateInput!): String!
        registerAdmin(credentials: UserRegisterInput!, details: AdminCreateInput!): String!
        registerGardener(credentials: UserRegisterInput!, details: GardenerCreateInput!): String!
        registerNurseryOwner(credentials: UserRegisterInput!, details: NurseryOwnerCreateInput!): String!
        
        updateAdmin(id: ID!, details: AdminUpdateInput!): String!
        updateGardener(id: ID!, details: GardenerUpdateInput!): String!
        updateNurseryOwner(id: ID!, details: NurseryOwnerUpdateInput!): String!
        updateCustomer(id: ID!, details: CustomerUpdateInput!): String!
        
        addCustomer(userID: ID!, details: CustomerCreateInput!): String!
        deleteUser(id: ID!): String!
        
        requestPasswordReset(email: String!): String!
        resetPassword(token: String!, password: String!): String!
        blockUser(id: ID!): String!
    }
`;

// TODO Add this after
// registerNursery(credentials: UserRegisterInput!, details: NurseryData): String!
// loginNursery(credentials: UserLoginInput!):User
// loginAdmin(credentials: UserLoginInput!):User
// loginGardener(credentials: UserLoginInput!):User
