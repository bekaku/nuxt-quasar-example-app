import { LabelValue } from "~/types/common"

export default defineEventHandler(async (event): Promise<LabelValue<string>[]> => {
    return [
        {
            label: 'Olivia Martin',
            value: '+$1,999.00',
            description: 'olivia.martin@email.com',
            avatar: { src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png' },
        },
        {
            label: 'Jackson Lee',
            value: '+$39.00',
            description: 'jackson.lee@email.com',
            avatar: { src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar3.png' },
        },
        {
            label: 'Isabella Nguyen',
            value: '+$299.00',
            description: 'isabella.nguyen@email.com',
            avatar: { src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar4.png' },
        },
        {
            label: 'William Kim',
            value: '+$99.00',
            description: 'will@email.com',
            avatar: { src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar5.png' },
        },
        {
            label: 'Sofia Davis',
            value: '+$39.00',
            description: 'sofia.davis@email.com',
            avatar: { src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png' },
        },
    ]
})