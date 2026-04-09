import { LabelValue } from "~/types/common"

export default defineEventHandler(async (event): Promise<LabelValue<string>[]> => {
    return [
        {
            label: 'Total Revenue',
            value: '$45,231.89',
            description: '+20.1% from last month',
            icon: { name: 'lucide:dollar-sign' },
        },
        {
            label: 'Subscriptions',
            value: '+2350',
            description: '+180.1% from last month',
            icon: { name: 'lucide:users' },
        },
        {
            label: 'Sales',
            value: '+12,234',
            description: '+19% from last month',
            icon: { name: 'lucide:credit-card' },
        },
        {
            label: 'Active Now',
            value: '+573',
            description: '+201 since last hour',
            icon: { name: 'lucide:trending-up' },
        },
    ]
})