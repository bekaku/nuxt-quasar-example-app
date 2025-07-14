import { parseCookies } from 'h3'
export default defineEventHandler((event) => {
    const cookies = parseCookies(event)

    // Replace with your cookie name
    const cookieName = '_server_refresh_key_1'
    const value = cookies[cookieName]

    return {
        cookieName,
        value: value ?? null,
    }
})