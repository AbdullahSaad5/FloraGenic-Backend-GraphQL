export const UserTypes = `
    type User{
        email: String!
        userType: UserType!
        bannedStatus: Boolean!
        details: UserDetails
    }
   
    union UserDetails = Customer | Admin | Gardener

    enum UserType{
        Customer
        Admin
        Gardener
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
        sendResetEmail(email: String!): String!
    }

    input UserRegisterInput {
        email: String!
        password: String!
        userType: String!
    }

    extend type Mutation{
        loginCustomer(credentials: UserLoginInput!): User
        register(credentials: UserRegisterInput!): String!
        registerCustomer(credentials: UserRegisterInput!, details: CustomerCreateInput!): String!
        registerAdmin(credentials: UserRegisterInput!, details: AdminCreateInput!): String!
        registerGardener(credentials: UserRegisterInput!, details: GardenerCreateInput!): String!
        resetPassword(password: String!): String!
    }
`;

// TODO Add this after
// registerNursery(credentials: UserRegisterInput!, details: NurseryData): String!
// loginNursery(credentials: UserLoginInput!):User
// loginAdmin(credentials: UserLoginInput!):User
// loginGardener(credentials: UserLoginInput!):User
