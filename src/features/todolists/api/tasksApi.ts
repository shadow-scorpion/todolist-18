import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "@/app/baseApi.ts"

export const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getTasks: build.query<GetTasksResponse, string>({
        query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
        providesTags: ["Tasks"],
      }),
      createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
        query: (payload) => ({
          method: "post",
          url: `/todo-lists/${payload.todolistId}/tasks`,
          body: {title: payload.title},
        }),
        invalidatesTags: ['Tasks'],
      }),
      deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
        query: (payload) => ({ method: "delete", url: `/todo-lists/${payload.todolistId}/tasks/${payload.taskId}` }),
        invalidatesTags: ['Tasks']
      }),
      updateTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; taskId: string; task: DomainTask}>({
        query: (payload)=> {
          const {task} = payload
        const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status,
          }

          return {
            method: 'put',
            url: `/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
            body: model,
          }
            },
        invalidatesTags: ['Tasks']
      })
    }
  },
})

export const {useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} = taskApi

// export const _tasksApi = {
//   getTasks(todolistId: string) {
//     return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
//   },
//   createTask(payload: { todolistId: string; title: string }) {
//     const { todolistId, title } = payload
//     return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title })
//   },
//   updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
//     const { todolistId, taskId, model } = payload
//     return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
//   },
//   deleteTask(payload: { todolistId: string; taskId: string }) {
//     const { todolistId, taskId } = payload
//     return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
//   },
// }
