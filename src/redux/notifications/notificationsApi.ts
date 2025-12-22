import { api } from "../api/baseApi";

export const notificationsApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllNotifications: builder.query<any, any>({
      query: () => ({
        url: `/notification-status`,
        method: "GET",
      }),
      providesTags: ["notifications"],
    }),
    getAllNotificationsInfo: builder.query<any, any>({
      query: () => ({
        url: `/get-notifications`,
        method: "GET",
      }),
      providesTags: ["notifications"],
    }),
    readSingleNotifications: builder.mutation<any, any>({
      query: ({ notification_id }) => ({
        url: `/read`,
        method: "PATCH",
        params: {
          notification_id,
        },
      }),
      invalidatesTags: ["notifications"],
    }),
    readAllNotifications: builder.mutation<any, any>({
      query: () => ({
        url: `/read-all`,
        method: "PATCH",
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useLazyGetAllNotificationsInfoQuery,
  useReadSingleNotificationsMutation,
  useReadAllNotificationsMutation,
} = notificationsApi;
