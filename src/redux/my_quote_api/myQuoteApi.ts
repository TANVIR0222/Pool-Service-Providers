import {
  DeletedQuoteProcessPaloade,
  DeletedQuotesResponse,
  MyQuotesResponse,
  ViewQuotePayloade,
  ViewQuoteResponse,
} from "@/src/lib/global-type";
import { api } from "../api/baseApi";

export const myQuoteApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login
    getMyQuotesPending: builder.query<MyQuotesResponse, any>({
      query: ({ page, per_page = 10 }) => ({
        url: "/user/get-my-quotes",
        method: "GET",
        params: {
          page: page,
          per_page,
        },
      }),
      providesTags: ["my_quote"],
    }),
    getMyQuotesInPreogree: builder.query<any, any>({
      query: ({ page, per_page = 10 }) => ({
        url: "/user/get-accepted-bids",
        method: "GET",
        params: {
          page: page,
          per_page,
        },
      }),
      providesTags: ["my_quote"],
    }),
    getMyQuotesComplete: builder.query<any, any>({
      query: ({ status, page, per_page = 10 }) => ({
        url: "/user/get-accepted-bids?status=Completed",
        method: "GET",
        params: {
          status: status,
          page: page,
          per_page,
        },
      }),
      providesTags: ["my_quote"],
    }),
    getListProvider: builder.query<any, any>({
      query: ({ status, page, per_page = 10, quote_id }) => ({
        // url: "/user/get-check-bids?quote_id=177",
        url: "/user/get-check-bids",
        method: "GET",
        params: {
          status: status,
          page: page,
          per_page,
          quote_id,
        },
      }),
      providesTags: ["my_quote"],
    }),
    singleUserViewQuote: builder.query<ViewQuoteResponse, ViewQuotePayloade>({
      query: ({ post_id }) => ({
        url: `/user/view-quote/${post_id}`,
        method: "GET",
      }),
      providesTags: ["my_quote"],
    }),
    singleUserDeleteQuote: builder.mutation<
      DeletedQuotesResponse,
      DeletedQuoteProcessPaloade
    >({
      query: (user_id) => ({
        url: `/user/delete-quote/${user_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["my_quote"],
    }),
    singleUserQuoteView: builder.query<any, any>({
      query: ({ quote_id }) => ({
        url: `/user/view-quote/${quote_id}`,
        method: "GET",
      }),
      providesTags: ["my_quote"],
    }),

    acceptBids: builder.mutation<any, { bid_id: string | number | undefined }>({
      query: ({ bid_id }) => ({
        url: `/user/accept-request`,
        method: "PATCH",
        params: { bid_id },
      }),
      invalidatesTags: ["my_quote"],
    }),

    cancelBids: builder.mutation<
      any,
      { quote_id: string | number | undefined }
    >({
      query: ({ quote_id }) => ({
        url: `/user/cancel-order`,
        method: "PATCH",
        params: { quote_id },
      }),
      invalidatesTags: ["my_quote"],
    }),

    getAllQuetsRequestUser: builder.query<any, any>({
      query: ({ search, page, per_page = 10 }) => ({
        url: "/user/search-provider",
        method: "GET",
        params: {
          page: page,
          per_page,
          search,
        },
      }),
      providesTags: ["category"],
    }),
    getViewProvider: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/user/view-provider/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
  }),
});

export const {
  useSingleUserDeleteQuoteMutation,
  useSingleUserViewQuoteQuery,
  useLazyGetMyQuotesInPreogreeQuery,
  useLazyGetMyQuotesPendingQuery,
  useLazyGetMyQuotesCompleteQuery,
  useLazyGetListProviderQuery,
  useAcceptBidsMutation,
  useSingleUserQuoteViewQuery,
  useCancelBidsMutation,
  useGetAllQuetsRequestUserQuery,
  useLazyGetAllQuetsRequestUserQuery,
  useGetViewProviderQuery,
} = myQuoteApi;
