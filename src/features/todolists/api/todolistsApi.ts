import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { Todolist } from "./todolistsApi.types"
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { AUTH_TOKEN } from "@/common/constants"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { baseApi } from "@/app/baseApi.ts"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build)=>{
    return {
      getTodolists: build.query<DomainTodolist[], void>({
        query: () => "/todo-lists",
        transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
          todolists.map((todolist) => ({ ...todolist, filter: "all", entityStatus: "idle" })),
        providesTags: ['Todolists']
      }),
      createTodolist: build.mutation<DomainTodolist[], string>({
        query: (title) => ({ method: "post", url: "todo-lists", body: { title } }),
        invalidatesTags: ['Todolists']
      }),
      deleteTodolist: build.mutation<BaseResponse, string>({
        query: (id: string) => ({method: 'delete', url: `todo-lists/${id}`}),
        invalidatesTags: ['Todolists']
      }),
      changeTodolistTitle: build.mutation<BaseResponse, {id: string, title: string}>({
        query: ({title, id}) => ({method: 'put', url: `todo-lists/${id}`, body: {title}}),
        invalidatesTags: ['Todolists']
      })
    }
  },
})

export const { useGetTodolistsQuery, useCreateTodolistMutation, useDeleteTodolistMutation, useChangeTodolistTitleMutation } = todolistsApi



export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
}
