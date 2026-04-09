import { ApiResponse } from "~/types/common"
import { AppUser } from "~/types/models"

export default defineEventHandler(async (event): Promise<ApiResponse<AppUser>> => {
    return {
        dataList: [
            {
                id: 1,
                email: 'Cody@mydomain.com',
                username: 'Cody Fisher',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/men/1.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/men/1.jpg'
                },
                active: true,
            },
            {
                id: 2,
                email: 'vue@mydomain.com',
                username: 'Vue Team',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/men/2.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/men/2.jpg'
                },
                active: true,
            },
            {
                id: 3,
                email: 'fox@mydomain.com',
                username: 'Robert Fox',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/men/3.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/men/3.jpg'
                },
                active: true,
            },
            {
                id: 4,
                email: 'Esther@mydomain.com',
                username: 'Esther Howard',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/women/79.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/women/79.jpg'
                },
                active: true,
            },
            {
                id: 5,
                email: 'Darlene@mydomain.com',
                username: 'Darlene Robertson',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/women/21.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/women/21.jpg'
                },
                active: true,
            },
            {
                id: 6,
                email: 'Ralph@mydomain.com',
                username: 'Ralph Edwards',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/men/44.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/men/44.jpg'
                },
                active: true,
            },
            {
                id: 7,
                email: 'Darrell@mydomain.com',
                username: 'Darrell Steward',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/men/81.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/men/81.jpg'
                },
                active: true,
            },
            {
                id: 8,
                email: 'Chanavee@mydomain.com',
                username: 'Chanavee Steward',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/men/88.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/men/88.jpg'
                },
                active: true,
            },
            {
                id: 9,
                email: 'Fisher@mydomain.com',
                username: 'Cody Fisher',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/men/0.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/men/0.jpg'
                },
                active: true,
            },
            {
                id: 10,
                email: 'kerean@mydomain.com',
                username: 'Kerean Fisher',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/men/30.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/men/30.jpg'
                },
                active: true,
            },
            {
                id: 11,
                email: 'Fox@mydomain.com',
                username: 'Robert Fox',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/men/22.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/men/22.jpg'
                },
                active: true,
            },
            {
                id: 12,
                email: 'Howard@mydomain.com',
                username: 'Esther Howard',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/women/45.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/women/45.jpg'
                },
                active: true,
            },
            {
                id: 13,
                email: 'Robertson@mydomain.com',
                username: 'Darlene Robertson',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/women/44.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/women/44.jpg'
                },
                active: true,
            },
            {
                id: 14,
                email: 'Edwards@mydomain.com',
                username: 'Ralph Edwards',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/women/11.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/women/11.jpg'
                },
                active: true,
            },
            {
                id: 15,
                email: 'Steward@mydomain.com',
                username: 'Darrell Steward',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/men/38.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/men/38.jpg'
                },
                active: true,
            },
            {
                id: 16,
                email: 'Meeyae@mydomain.com',
                username: 'Meeyae Steward',
                avatar: {
                    image: 'https://randomuser.me/api/portraits/women/17.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/women/17.jpg'
                },
                active: true,
            }
        ],
        totalPages: 100,
        totalElements: 20000,
        last: false,
    }
})