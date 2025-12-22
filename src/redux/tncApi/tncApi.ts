import { api } from "../api/baseApi";

export const tncApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login
    getAllPrivacyPolicy: builder.query<any, any>({
      query: ({ page_type }) => ({
        url: "/get-page",
        method: "GET",
        params: {
          page_type,
        },
      }),
      providesTags: ["subscriptions"],
    }),
  }),
});

export const { useGetAllPrivacyPolicyQuery } = tncApi;
