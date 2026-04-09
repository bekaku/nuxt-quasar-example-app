import { defineEventHandler, setResponseStatus } from 'h3'

export default defineEventHandler((event) => {
  // 1. Set the HTTP status code to 404
  setResponseStatus(event, 404)

  // 2. Return your custom JSON structure
  return {
    success: false,
    statusCode: 404,
    message: `API Endpoint not found`,
    path: event.path
  }
})