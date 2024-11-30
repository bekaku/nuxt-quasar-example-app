export default defineEventHandler(() => {
    const data = {
        createdAt: new Date(),
        toJSON() {
            return {
                now: this.createdAt,
                createdAt: {
                    year: this.createdAt.getFullYear(),
                    month: this.createdAt.getMonth(),
                    day: this.createdAt.getDate(),
                    h: this.createdAt.getHours(),
                    minute: this.createdAt.getMinutes(),
                    second: this.createdAt.getSeconds(),
                },
            }
        },
    }
    return data
})