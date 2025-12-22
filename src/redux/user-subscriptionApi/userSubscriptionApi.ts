import { api } from "../api/baseApi";

export const userSubscriptionApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login

    useSubscriptionsBuyPlane: builder.mutation<any, any>({
      query: (userPaymentData) => ({
        url: "/user/create-payment-intent",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userPaymentData,
      }),
      invalidatesTags: ["user-subscriptions"],
    }),

    userSubscriptionsBuyPlaneSuccess: builder.mutation<any, any>({
      query: (payment_user_success) => ({
        url: "/user/payment-success",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payment_user_success,
      }),
      invalidatesTags: ["user-subscriptions"],
    }),
  }),
});

export const {
  useUseSubscriptionsBuyPlaneMutation,
  useUserSubscriptionsBuyPlaneSuccessMutation,
} = userSubscriptionApi;
