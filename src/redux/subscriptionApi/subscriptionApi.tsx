import { api } from "../api/baseApi";

export const reviewApi = api.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // login
        getAllSubscripe: builder.query<any, any>({
            query: () => ({
                url: "get-subscriptions-lists",
                method: "GET",
            }),
            providesTags: ["subscriptions"],
        }),
        userBuyPlane: builder.mutation<any, any>({
            query: (userPaymentData) => ({
                url: "/provider/buy-plan-intent",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: userPaymentData
            }),
            invalidatesTags: ["subscriptions"],
        }),

        userBuyPlaneSuccess: builder.mutation<any, any>({
            query: (payment_user_success) => ({
                url: "/provider/buy-plan-success",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: payment_user_success
            }),
            invalidatesTags: ["subscriptions"],
        }),
        createdConnectedAccout: builder.query<any, any>({
            query: () => ({
                url: "/provider/create-connected-account",
                method: "GET",
            }),
            providesTags: ["subscriptions"],
        }),
        createdConnectedPlane: builder.query<any, any>({
            query: () => ({
                url: "/provider/current-plan",
                method: "GET",
            }),
            providesTags: ["subscriptions"],
        }),
    }),
});

export const { useGetAllSubscripeQuery, useLazyCreatedConnectedPlaneQuery, useUserBuyPlaneMutation, useUserBuyPlaneSuccessMutation, useCreatedConnectedAccoutQuery } = reviewApi;
