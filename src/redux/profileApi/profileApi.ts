import { api } from "../api/baseApi";

export const profileApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login
    userProfileUpdated: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/edit-account",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useUserProfileUpdatedMutation } = profileApi;
