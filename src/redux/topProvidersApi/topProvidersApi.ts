import {
  ProviderProfileResponse,
  SingleProviderPaylaode,
  TopProvidersByRatingResponse,
} from "@/src/lib/global-type";
import { api } from "../api/baseApi";

export const topProvidersApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login
    getTopProvider: builder.query<TopProvidersByRatingResponse, void>({
      query: () => ({
        url: "/user/top-providers",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    getSingleProvider: builder.query<
      ProviderProfileResponse,
      SingleProviderPaylaode
    >({
      query: ({ id }) => ({
        url: `/user/view-provider/${id}`,
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
  }),
});

export const { useGetTopProviderQuery, useGetSingleProviderQuery } =
  topProvidersApi;
