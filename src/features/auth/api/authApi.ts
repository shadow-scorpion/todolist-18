import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { LoginInputs } from "@/features/auth/lib/schemas"
import { baseApi } from "@/app/baseApi.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      me: build.query<BaseResponse<{id: number; email: string; login: string}>, void>({
        query: () => ({method: 'get', url: "auth/me"}),
        providesTags: ["Auth"],
      }),
      login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
        query: (payload) => ({method: 'post', url: "auth/login", body: payload}),
        invalidatesTags: ["Auth"],
      }),
      logout: build.mutation<BaseResponse, void>({
        query: () => ({method: 'delete', url: "auth/login"}),
        invalidatesTags: ["Auth"],
      }),
  }
    }
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi


export const _authApi = {
  login(payload: LoginInputs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("auth/login", payload)
  },
  logout() {
    return instance.delete<BaseResponse>("auth/login")
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me")
  },
}
