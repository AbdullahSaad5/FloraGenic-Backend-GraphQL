export const DashboardTypes = `
    type AdminDashboard {
      totalUsers: Int!
      totalNurseries: Int!
      totalProducts: Int!
      totalOrders: Int!
      feedbackByType: [FeedbackByType]
      productsByCategory: [ProductsByCategory]
      usersByType: [UsersByType]
    }

    type FeedbackByType {
      type: FeedbackType!
      count: Int!
    }

    type ProductsByCategory {
      category: String!
      count: Int!
    }

    type UsersByType {
      type: UserType!
      count: Int!
    }

    enum UserType {
      Admin
      Customer
      Gardener
      NurseryOwner
    }

    enum FeedbackType {
      Feedback
      Complaint
      Suggestion
      Bug
    }

    extend type Query {
      stats: AdminDashboard!
    }

`;
