import type { ISeriresCategories } from '~/types/chart';

export default defineEventHandler(async (event): Promise<ISeriresCategories> => {
    return {
        categories: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        series: [
            {
                name: 'Access',
                data: [32, 26, 57, 21, 8, 6, 14, 39, 10, 7, 9, 25],
            },
            {
                name: 'Post',
                data: [10, 8, 30, 21, 27, 10, 9, 40, 20, 10, 50, 12],
            },
            {
                name: 'Repost',
                data: [8, 10, 15, 21, 4, 15, 10, 50, 8, 0, 9, 25],
            },
            {
                name: 'Comment',
                data: [11, 20, 12, 14, 0, 10, 51, 22, 30, 10, 31, 11],
            },
            {
                name: 'Feel',
                data: [20, 10, 40, 16, 0, 5, 19, 1, 5, 0, 1, 4],
            },
            {
                name: 'Share',
                data: [1, 10, 11, 21, 17, 36, 51, 30, 15, 24, 56, 8],
            },
            {
                name: 'Read',
                data: [75, 38, 25, 70, 3, 2, 45, 35, 9, 6, 11, 24],
            },
            {
                name: 'Learn',
                data: [22, 0, 3, 2, 45, 11, 31, 20, 22, 10, 12, 21],
            },
            {
                name: 'Reward',
                data: [30, 1, 13, 1, 0, 0, 3, 0, 3, 0, 20, 15],
            },
        ],
    }
})