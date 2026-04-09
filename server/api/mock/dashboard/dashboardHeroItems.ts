import { LabelValue } from '~/types/common';

export default defineEventHandler(async (event): Promise<LabelValue<string>[]> => {
    return [
        {
            label: 'Social Feed',
            description: 'Example Facebook feed clone',
            to: '/example/feed',
            icon: { name: 'lucide:newspaper' },
        },
        {
            label: 'Chats',
            description: 'Chat layout example',
            to: '/example/chats',
            icon: { name: 'lucide:message-circle-more' },
        },
        {
            label: 'Charts',
            description: 'Chart components Area, Bar, Line, Pie...',
            to: '/example/charts',
            icon: { name: 'lucide:chart-spline' },
        },
    ]
})