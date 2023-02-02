import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const whatshyAPi = createApi({
  reducerPath: "whatshyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "",
    },
  }),
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      providesTags: ["User"],
    }),
    userLogin: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      providesTags: ["User"],
    }),
    getPhonebook: builder.query({
      query: ({ id }) => ({
        url: "/phonebook/get",
        method: "POST",
        body: { id },
      }),
      providesTags: ["Phonebook"],
    }),
    addPhonebook: builder.mutation({
      query: ({ user_id, name, number }) => ({
        url: "/phonebook",
        method: "POST",
        body: { user_id, name, number },
      }),
      invalidatesTags: ["Phonebook"],
    }),
    deletePhonebook: builder.mutation({
      query: ({ id }) => ({
        url: `/phonebook`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Phonebook"],
    }),
    updatePhonebook: builder.mutation({
      query: ({ id, name, number }) => ({
        url: `/phonebook`,
        method: "PUT",
        body: { id, name, number },
      }),
      invalidatesTags: ["Phonebook"],
    }),
    getByIdPhonebook: builder.query({
      query: ({ id }) => ({
        url: `/phonebook/id`,
        method: "POST",
        params: { id },
      }),
      providesTags: ["Phonebook"],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useGetPhonebookQuery,
  useAddPhonebookMutation,
  useDeletePhonebookMutation,
  useUpdatePhonebookMutation,
  useGetByIdPhonebookQuery,
} = whatshyAPi;
