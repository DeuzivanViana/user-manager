import type { Elysia } from 'elysia'

export const errorHandler = (app: Elysia) =>
  app.onError(({ code, error, status, request }) => {
    return status(500, {
      code: code,
      data: error
    })
  })
