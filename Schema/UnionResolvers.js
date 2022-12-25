export const UnionResolvers = {
  UserDetails: {
    __resolveType: (obj, args, info) => {
      if (obj.services && obj.CNIC) {
        return "Gardener";
      }
      if (!obj.services && obj.CNIC) {
        return "Admin";
      }
      if (obj.nurseries) {
        return "NurseryOwner";
      }
      return "Customer";
    },
  },
};
