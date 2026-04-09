import { ISeriresCategories } from '~/types/chart';
import { FileManager } from '~/types/models';

export default defineEventHandler(async (event): Promise<ISeriresCategories> => {
    return {
        categories: ['January', 'February', 'March', 'April', 'May', 'June'],
        series: [
            {
                name: 'Access',
                data: [80, 50, 30, 40, 100, 20],
            },
            {
                name: 'Post',
                data: [20, 30, 40, 80, 20, 80],
            },
            {
                name: 'Repost',
                data: [44, 76, 78, 13, 43, 10],
            },
        ],
    }
})