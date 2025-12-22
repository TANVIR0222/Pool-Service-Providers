import { CreateReviewResponse } from "@/src/lib/global-type";
import { api, CreateReviewPayloade } from "../api/baseApi";

export const reviewApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login
    userReviewPost: builder.mutation<
      CreateReviewResponse,
      CreateReviewPayloade
    >({
      query: ({ provider_id, quote_id, rating, compliment }) => ({
        url: "/user/create-review",
        method: "POST",
        params: {
          provider_id,
          rating,
          compliment,
          quote_id,
        },
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const { useUserReviewPostMutation } = reviewApi;
