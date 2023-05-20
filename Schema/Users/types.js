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
    
        profileDetails: User!
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

    input updateProfileInput {
        firstName: String
        lastName: String
        phoneNumber: String
        gender: String
        image: String
    }

    type updateProfileResponse {
        firstName: String!
        lastName: String!
        phoneNumber: String!
        gender: String!
        image: String!
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
        
        updateAdmin(id: ID!, details: AdminUpdateInput!): String!
        updateGardener(id: ID!, details: GardenerUpdateInput!): String!
        updateNurseryOwner(id: ID!, details: NurseryOwnerUpdateInput!): String!
        updateCustomer(id: ID!, details: CustomerUpdateInput!): String!
        
        addCustomer(userID: ID!, details: CustomerCreateInput!): String!
        deleteUser(id: ID!): String!


        changePassword(oldPassword: String!, newPassword: String!): String!
        updateProfile(details: updateProfileInput!): updateProfileResponse!
        
        requestPasswordReset(email: String!): String!
        resetPassword(token: String!, password: String!): String!
        blockUser(id: ID!): String!
    }
`;
