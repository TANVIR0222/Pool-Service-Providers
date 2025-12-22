import { api } from "../api/baseApi";

export const myQuoteApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMyViewQuotes: builder.query<any, any>({
      query: ({ status, page, per_page = 10 }) => ({
        url: "/provider/my-service-quotes",
        method: "GET",
        params: {
          status,
          page: page,
          per_page,
        },
      }),
      providesTags: ["view_quote"],
    }),
    viewSingleBrowseCode: builder.query<any, any>({
      query: ({ quote_id }) => ({
        url: `provider/view-browse-quote/${quote_id}`,
        method: "GET",
      }),
      providesTags: ["view_quote"],
    }),
    viewMyEarning: builder.query<any, any>({
      query: () => ({
        url: `/provider/my-earnings`,
        method: "GET",
      }),
      providesTags: ["view_quote"],
    }),
    cancelBidsProvider: builder.mutation<
      any,
      { quote_id: string | number | undefined }
    >({
      query: ({ quote_id }) => ({
        url: `/provider/cancel-bid/${quote_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["my_quote"],
    }),
    cancelCompleteProvider: builder.mutation<
      any,
      { bid_id: string | number | undefined }
    >({
      query: ({ bid_id }) => ({
        url: `/provider/mark-as-complete`,
        method: "PATCH",
        params: {
          bid_id,
        },
      }),
      invalidatesTags: ["my_quote"],
    }),
    getProviderRating: builder.query<
      any,
      { quote_id: string | number | undefined }
    >({
      query: ({ quote_id }) => ({
        url: `/provider/get-provider-rating`,
        method: "GET",
        params: {
          quote_id,
        },
      }),
      providesTags: ["my_quote"],
    }),
  }),
});

export const {
  useLazyGetMyViewQuotesQuery,
  useViewSingleBrowseCodeQuery,
  useViewMyEarningQuery,
  useCancelBidsProviderMutation,
  useCancelCompleteProviderMutation,
  useGetProviderRatingQuery,
} = myQuoteApi;
