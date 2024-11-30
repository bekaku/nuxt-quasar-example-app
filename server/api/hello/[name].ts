export default defineEventHandler((event) => {
    const name = getRouterParam(event, 'name')
    return {
        event,
        message: `Hello, ${name}!`
    }
})