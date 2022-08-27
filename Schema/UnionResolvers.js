export const UnionResolvers = {
  UserDetails: {
    __resolveType: (obj, args, info) => {
      if (info.variableValues.credentials.userType === "Customer") {
        return "Customer";
      } else if (info.variableValues.credentials.userType === "Admin") {
        return "Admin";
      } else if (info.variableValues.credentials.userType === "Gardener") {
        return "Gardener";
      } else {
        throw new Error("User type not found");
      }
    },
  },
};
