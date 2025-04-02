import { api } from "@/redux/api";
import { store, type RootState } from "@/redux/store";
import type { OrgType } from "@/types/org";
import type { UserType } from "@/types/user";

// TODO: Ensure uou add your response and request types in a types.ts file in the same folder e.g (SignupResponse, SignupRequest) see below for more details
// interface UserBase {
// id: string;
// email: string;
// first_name: string;
// last_name: string;
// phone_number: string;
// user_type: string;
// }
// interface UserRequest extends UserBase {}

// interface EditUserRequest
//   extends Omit<AccessProfileBase, 'organization_id'> {
//   id: string;
// }
// export interface UserResponse extends UserBase {
//  id: string;
//  created_at: string;
//  created_by: string;
//  updated_at: string;
// }

// USING your types in your mutation import <APIResponse> from @/types/global

// editUser: builder.mutation<
//   APIResponse<UserResponse>,
//   EditUserRequest
// >({
//   query: (updatedData) => ({
//     url: `auth/user/edit`,
//     method: "PATCH",
//     body: updatedData,
//   }),
//   invalidatesTags: ["User"],
// }),

interface Organization {
  id: string;
  name: string;
  mission: string;
  initials: string;
  currency_code: string;
  business_type: string;
  tagline: string;
  slug: string;
  image_url: string;
  is_deleted: boolean;
  date_created: string;
  last_updated: string;
  date_created_db: string;
  last_updated_db: string;
}

export interface OrganizationResponse {
  data: Organization[];
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // TODO: all your endpoints must be typed

    login: builder.mutation<
      { token: string; user: UserType },
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: "/auth/login/",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),

    signup: builder.mutation({
      query: (values) => ({
        url: "/auth/signup/",
        method: "POST",
        body: values,
      }),
    }),

    // createOrg: builder.mutation<OrgType, Partial<OrgType>>({
    //   query: (values) => {
    //     const token = (store.getState() as RootState).auth.token;
    //     return {
    //       url: "/organization/create/",
    //       method: "POST",
    //       body: values,
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     };
    //   },
    // }),

    createOrg: builder.mutation<OrgType, Partial<OrgType>>({
      query: (values) => {
        const token = (store.getState() as RootState).auth.token;

        // 🔍 Debugging: Log token and body
        console.log("🟢 Token Sent from Frontend:", token);
        console.log("📝 Body Sent:", values);

        if (!token) {
          throw new Error("Authorization token is missing");
        }

        return {
          url: "/organization/create/",
          method: "POST",
          body: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    // // NOTE: This is not exactly correct look into the docs and figure out if it's needed
    // verifyOtp: builder.mutation({
    //   query: ({ email, otp_token }) => ({
    //     url: `/auth/verify-otp/?email=${email}`,
    //     method: 'PATCH',
    //     body: {
    //       otp_token: otp_token,
    //     },
    //   }),
    // }),
    // forgotPassword: builder.mutation({
    //   query: (values) => ({
    //     url: '/auth/forgot-password/',
    //     method: 'POST',
    //     body: values,
    //   }),
    // }),
    // resetPassword: builder.mutation({
    //   query: (values) => ({
    //     url: '/auth/reset-password/',
    //     method: 'POST',
    //     body: values,
    //   }),
    // }),

    // deleteAccount: builder.mutation({
    //   query: () => ({
    //     url: '/auth/remove-account/',
    //     method: 'DELETE',
    //   }),
    // }),
    // resendVerification: builder.query({
    //   query: ({ email }) => ({
    //     url: `/auth/resend-otp/?email=${email}`,
    //   }),
    // }),

    getUser: builder.query<UserType, void>({
      query: () => "auth/user",
      providesTags: ["User"],
    }),
    getOrganizations: builder.query<OrganizationResponse, void>({
      query: () => "organization",
      providesTags: ["OrganizationImage"],
    }),

    editUser: builder.mutation<
      any, // Replace with actual UserType if available
      { id: string; email?: string; first_name?: string; last_name?: string }
    >({
      query: (updatedData) => ({
        url: "auth/user", // Calls Next.js API route
        method: "PUT",
        body: updatedData, // Includes userId in body
      }),
      invalidatesTags: ["User"],
    }),

    editUserImage: builder.mutation<any, { image: File }>({
      query: (updatedData) => ({
        url: "auth/user", // Calls Next.js API route
        method: "PATCH",
        body: updatedData, // Includes userId in body
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// editUser: builder.mutation({
//   query: (updatedData) => ({
//     url: 'auth/user',
//     method: 'PATCH',
//     body: updatedData,
//   }),
//   invalidatesTags: ['User'],
// }),
// changePassword: builder.mutation({
//   query: ({ old_password, new_password }) => ({
//     url: 'auth/change-password/',
//     method: 'PATCH',
//     body: { old_password, new_password },
//   }),
// }),

// TODO: handle logout the correct way here
// logout: builder.mutation<void, void>({

// }),

export const {
  useLoginMutation,
  useSignupMutation,
  useGetUserQuery,
  useCreateOrgMutation,
  useGetOrganizationsQuery,
  useEditUserMutation,
  useEditUserImageMutation,
  // useChangePasswordMutation,
  // useVerifyOtpMutation,
  // useLazyResendVerificationQuery,
  // useForgotPasswordMutation,
  // useResetPasswordMutation,
  // useDeleteAccountMutation,
} = authApi;
