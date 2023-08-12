import { apiSlice } from "./apiSlice";

const USER_URL = "/api/users";

// Dependency Injection
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // All Queries and Mutation Will Come Here (Post and Put is Mutation)
    login: builder.mutation({
      query: (data) => {
        return {
          url: `${USER_URL}/auth`,
          method: "POST",
          body: data,
        };
      },
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: `${USER_URL}/logout`,
          method: "POST",
        };
      },
    }),
    register: builder.mutation({
      query: (data) => {
        return {
          url: `${USER_URL}`,
          method: "POST",
          body: data,
        };
      },
    }),
    getUser: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: `${USER_URL}/profile`,
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = userApiSlice;
