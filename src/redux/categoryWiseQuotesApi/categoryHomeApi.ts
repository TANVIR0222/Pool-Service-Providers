import { CategoryResponse } from "@/src/lib/global-type";
import { api } from "../api/baseApi";

export const categoryHomeApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllCategory: builder.query<CategoryResponse, void>({
      query: () => ({
        url: "get-category-lists",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getAllQuetsRequest: builder.query<any, any>({
      query: ({ search, page, per_page = 10 }) => ({
        url: "/provider/browse-quotes",
        method: "GET",
        params: {
          page: page,
          per_page,
          search,
        },
      }),
      providesTags: ["category"],
    }),
    getAllSingleCategory: builder.query<any, any>({
      query: ({ category, page, per_page = 10 }) => ({
        url: "/provider/browse-quotes",
        method: "GET",
        params: {
          page,
          per_page,
          category: category,
        },
      }),
      providesTags: ["category"],
    }),
    viewAllSingleCategory: builder.query<any, any>({
      query: ({ user_id }) => ({
        url: `/provider/view-browse-quote/${user_id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    srtartQuots: builder.mutation<any, any>({
      query: (data) => ({
        url: `/provider/apply-bid`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    singleBiddingListView: builder.query<any, any>({
      query: ({ quote_id }) => ({
        url: `/provider/bidding-lists`,
        method: "GET",
        params: {
          quote_id,
        },
      }),
      providesTags: ["category"],
    }),
    getMyBidding: builder.query<any, any>({
      query: ({ quote_id }) => ({
        url: `/provider/get-your-bid`,
        method: "GET",
        params: {
          quote_id,
        },
      }),
      providesTags: ["category"],
    }),
    editeBiddits: builder.mutation<any, any>({
      query: ({ quote_id, price_offered, quote_outline }) => ({
        url: `/provider/edit-your-bid`,
        method: "PUT",
        params: {
          quote_id,
          price_offered,
          quote_outline,
        },
      }),
      invalidatesTags: ["category"],
    }),
    biddisComplite: builder.mutation<any, any>({
      query: ({ quote_id }) => ({
        url: `/provider/make-final-save-your-bid`,
        method: "PATCH",
        params: {
          quote_id,
        },
      }),
      invalidatesTags: ["category"],
    }),
    acceptBudget: builder.mutation<any, any>({
      query: ({ quote_id }) => ({
        url: `/provider/accept-budget`,
        method: "POST",
        params: {
          quote_id,
        },
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useLazyGetAllQuetsRequestQuery,
  useLazyGetAllSingleCategoryQuery,
  useGetAllQuetsRequestQuery,
  useViewAllSingleCategoryQuery,
  useSrtartQuotsMutation,
  useLazySingleBiddingListViewQuery,
  useGetMyBiddingQuery,
  useEditeBidditsMutation,
  useBiddisCompliteMutation,
  useAcceptBudgetMutation,
} = categoryHomeApi;
