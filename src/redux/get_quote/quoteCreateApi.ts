import {
  GetAllQuotesResponse,
  ProviderSearchPaylode,
  ProviderSearchResponse,
} from "@/src/lib/global-type";
import { api } from "../api/baseApi";

export const quoteCreateApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login
    cretedUserQuote: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/user/create-quote",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }),
      invalidatesTags: ["profile"],
    }),
    getAllQuote: builder.query<GetAllQuotesResponse, void>({
      query: () => ({
        url: "/user/get-quotes",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    searchAllUser: builder.query<ProviderSearchResponse, ProviderSearchPaylode>(
      {
        query: ({ search }) => ({
          url: "/user/search-provider",
          method: "GET",
          params: { search },
        }),
        providesTags: ["profile"],
      }
    ),
  }),
});

export const {
  useCretedUserQuoteMutation,
  useGetAllQuoteQuery,
  useSearchAllUserQuery,
} = quoteCreateApi;
