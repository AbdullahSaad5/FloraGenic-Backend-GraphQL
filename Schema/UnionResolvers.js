export const UnionResolvers = {
  UserDetails: {
    __resolveType: (obj, args, info) => {
      if (obj.skills && obj.CNIC) {
        return "Gardener";
      }
      if (!obj.skills && obj.CNIC) {
        return "Admin";
      }
      if (obj.nurseries) {
        return "NurseryOwner";
      }
      return "Customer";
    },
  },
};
