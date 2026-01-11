import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { fetchTodolistsTC, selectTodolists } from "@/features/todolists/model/todolists-slice"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useEffect, useState } from "react"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { useGetTodolistsQuery, useLazyGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"

// const todolists = useAppSelector(selectTodolists)
// const dispatch = useAppDispatch()
// useEffect(() => {
//   dispatch(fetchTodolistsTC())
// }, [])


export const Todolists = () => {
  const { data } = useGetTodolistsQuery()


  return (
    <>
      {data?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
