import { api } from "../api/baseApi";

export const currentPalaneApi = api.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createdConnectedPlane: builder.query<any, any>({
            query: ({ provider_id }) => ({
                url: "/provider/current-plan",
                method: "GET",
                params: {
                    provider_id
                }
            }),
            providesTags: ["palan"],
        }),
    }),
});

export const { useCreatedConnectedPlaneQuery } = currentPalaneApi;
