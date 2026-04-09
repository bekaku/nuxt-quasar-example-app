
export default defineEventHandler(async (event): Promise<any[]> => {
    return [
        {
            label: 'Revenue Status',
            description: '12.030',
            value: '27%',
            color: '#15803d',
            bg: 'green-1',
            series: [
                {
                    name: 'status',
                    data: [10000, 14000, 20000, 16000, 18000, 20000, 16000, 14500, 18000],
                },
            ],
            categories: ['status'],
        },
        {
            label: 'Page View',
            description: '5592',
            value: '12%',
            color: '#f97316',
            bg: 'orange-1',
            series: [
                {
                    name: 'view',
                    data: [5000, 7500, 9000, 8500, 7000, 6000, 8000, 9500, 7200],
                },
            ],
            categories: ['view'],
        },
        {
            label: 'Bounce Rate',
            description: '55.56%',
            value: '22%',
            color: '#ef4444',
            bg: 'red-1',
            series: [
                {
                    name: 'rate',
                    data: [28000, 25000, 27000, 24000, 23000, 26000, 25000, 22000, 20000],
                },
            ],
            categories: ['rate'],
        },
        {
            label: 'Product Sale Rate',
            description: '12.56%',
            value: '17%',
            color: '#8b5cf6',
            bg: 'purple-1',
            series: [
                {
                    name: 'sale',
                    data: [15000, 12000, 18000, 22000, 14000, 11000, 25000, 20000, 17000],
                },
            ],
            categories: ['sale'],
        },
    ]
})