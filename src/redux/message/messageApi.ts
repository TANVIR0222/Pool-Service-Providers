import { api } from "../api/baseApi";

export const messageApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login
    storeSMS: builder.mutation<any, any>({
      query: (newMessage) => ({
        url: "/store-message",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newMessage,
      }),
      invalidatesTags: ["message"],
    }),
    getAllChateUser: builder.query<any, any>({
      query: () => ({
        url: "chat-lists",
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    getAllMessageCount: builder.query<any, any>({
      query: () => ({
        url: "unread-count",
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    markAsRead: builder.mutation<any, any>({
      query: ({ sender_id }) => ({
        url: "/mark-as-read",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        params: { sender_id },
      }),
      invalidatesTags: ["message"],
    }),
    getMySingleMessage: builder.query<any, any>({
      query: ({ receiver_id }) => ({
        url: `/get-messages`,
        method: "GET",
        params: {
          receiver_id,
        },
      }),
      providesTags: ["message"],
    }),
    deletedMySingleMessage: builder.mutation<any, any>({
      query: ({ receiver_id }) => ({
        url: `/delete-conversation`,
        method: "DELETE",
        params: {
          receiver_id,
        },
      }),
      invalidatesTags: ["message"],
    }),
    imageSendRandomuser: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/send-files`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }),
      invalidatesTags: ["message"],
    }),
    unredMessage: builder.query<any, any>({
      query: () => ({
        url: `/unread-count`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
  }),
});

export const {
  useStoreSMSMutation,
  useGetAllChateUserQuery,
  useMarkAsReadMutation,
  useGetAllMessageCountQuery,
  useGetMySingleMessageQuery,
  useDeletedMySingleMessageMutation,
  useImageSendRandomuserMutation,
  useUnredMessageQuery,
} = messageApi;
