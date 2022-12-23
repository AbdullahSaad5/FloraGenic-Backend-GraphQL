export const UnionResolvers = {
  UserDetails: {
    __resolveType: (obj, args, info) => {
      if (obj.services && obj.CNIC) {
        console.log("Gardener");
        return "Gardener";
      }
      if (!obj.services && obj.CNIC) {
        console.log("Admin");
        return "Admin";
      }
      if (obj.nurseries) {
        return "NurseryOwner";
      }
      console.log("Customer");
      return "Customer";
    },
  },
};
