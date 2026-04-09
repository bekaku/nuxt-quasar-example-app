import { ISeriresCategories } from '~/types/chart';
import { FileManager } from '~/types/models';

export default defineEventHandler(async (event): Promise<ISeriresCategories> => {
    return {
        categories: ['AAPL'],
        series: [
            {
                name: 'AAPL',
                data: [
                    1382.54, 1285.23, 1688.76, 1090.12, 1307.65, 1285.98, 1309.34, 1311.56, 1393.24, 1300.87,
                    1188.98, 1091.45, 1193.67, 1335.23, 1302.87, 1370.98, 1103.34, 1295.78, 817.34, 1395.87,
                ],
            },
        ],
    }
})