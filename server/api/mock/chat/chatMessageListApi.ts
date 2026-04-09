import { ApiResponse } from "~/types/common"
import { GroupChatMsg } from "~/types/models"

export default defineEventHandler(async (event): Promise<ApiResponse<GroupChatMsg>> => {
    return {
        dataList: [
            {
                id: 667,
                chatMsg: 'The rest of the documentation assumes basic familiarity with HTML, CSS, and JavaScript. If you are totally new to frontend development, it might not be the best idea to jump right into a framework as your first step - grasp the basics and then come back! You can check your knowledge level with these overviews for JavaScript, HTML and CSS if needed. Prior experience with other frameworks helps, but is not required.',
                msgDateTime: '2025-03-21 13:55:25',
                groupId: 17,
                readCount: 10,
                unsend: false,
                sent: true,
                sendUser: {
                    id: 1,
                    email: 'Cody@mydomain.com',
                    username: 'Cody Fisher',
                    avatar: {
                        image: 'https://randomuser.me/api/portraits/men/1.jpg',
                        thumbnail: 'https://randomuser.me/api/portraits/men/1.jpg'
                    },
                    active: true,
                },
                files: [],
                liked: false,
                emojiType: 'LIKE',
                reactionEngage: [{
                    total: 1,
                    emojiType: 'LIKE'
                }],
                dtoReplyTo: null,
                chatMessageType: 'TEXT'
            },
            {
                id: 666,
                chatMsg: 'Just sent emoji \uD83D\uDCAF \uD83D\uDE0C ✨️ \uD83D\uDE42 \uD83D\uDE43 \uD83D\uDC4C \uD83D\uDCAF \uD83D\uDE0C ✨️ \uD83D\uDE42 \uD83D\uDE43',
                msgDateTime: '2025-03-21 13:55:12',
                groupId: 17,
                readCount: 0,
                unsend: false,
                sent: true,
                sendUser: {
                    id: 2,
                    email: 'vue@mydomain.com',
                    username: 'Vue Team',
                    avatar: {
                        image: 'https://randomuser.me/api/portraits/men/2.jpg',
                        thumbnail: 'https://randomuser.me/api/portraits/men/2.jpg'
                    },
                    active: true,
                },
                files: [],
                liked: false,
                emojiType: null,
                reactionEngage: [],
                dtoReplyTo: null,
                chatMessageType: 'TEXT'
            },
            {
                id: 567,
                chatMsg: '13.9795581,100.6267777',
                msgDateTime: '2024-10-11 15:36:47',
                groupId: 17,
                readCount: 2,
                unsend: false,
                sent: true,
                sendUser: {
                    id: 3,
                    email: 'fox@mydomain.com',
                    username: 'Robert Fox',
                    avatar: {
                        image: 'https://randomuser.me/api/portraits/men/3.jpg',
                        thumbnail: 'https://randomuser.me/api/portraits/men/3.jpg'
                    },
                    active: true,
                },
                files: [],
                liked: false,
                emojiType: null,
                reactionEngage: [],
                dtoReplyTo: null,
                chatMessageType: 'LOCATION'
            },
            {
                id: 665,
                chatMsg: 'https://www.youtube.com/watch?v=_5hAk3ic5Ok',
                msgDateTime: '2025-03-21 13:54:12',
                groupId: 17,
                readCount: 0,
                unsend: false,
                sent: false,
                sendUser: {
                    id: 3,
                    email: 'fox@mydomain.com',
                    username: 'Robert Fox',
                    avatar: {
                        image: 'https://randomuser.me/api/portraits/men/3.jpg',
                        thumbnail: 'https://randomuser.me/api/portraits/men/3.jpg'
                    },
                    active: true,
                },
                files: [],
                liked: false,
                emojiType: null,
                reactionEngage: [],
                dtoReplyTo: null,
                chatMessageType: 'TEXT'
            },
            {
                id: 664,
                chatMsg: null,
                msgDateTime: '2025-03-21 13:53:04',
                groupId: 17,
                readCount: 0,
                unsend: false,
                sent: false,
                sendUser: {
                    id: 4,
                    email: 'Esther@mydomain.com',
                    username: 'Esther Howard',
                    avatar: {
                        image: 'https://randomuser.me/api/portraits/women/79.jpg',
                        thumbnail: 'https://randomuser.me/api/portraits/women/79.jpg'
                    },
                    active: true,
                },
                files: [
                    {
                        id: 152,
                        fileManager: {
                            id: 1,
                            fileMime: 'application/pdf',
                            fileName: 'Trace-based Just-in-Time Type Specialization for Dynamic Languages',
                            filePath: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
                            fileThumbnailPath: '',
                            fileSize: '2 MB',
                            fileMimeType: 'FILE',
                        },
                    }
                ],
                liked: false,
                emojiType: null,
                reactionEngage: [],
                dtoReplyTo: null,
                chatMessageType: 'FILE'
            },
            {
                id: 663,
                chatMsg: null,
                msgDateTime: '2025-03-21 13:52:48',
                groupId: 17,
                readCount: 0,
                unsend: false,
                sent: true,
                sendUser: {
                    id: 5,
                    email: 'Darlene@mydomain.com',
                    username: 'Darlene Robertson',
                    avatar: {
                        image: 'https://randomuser.me/api/portraits/women/21.jpg',
                        thumbnail: 'https://randomuser.me/api/portraits/women/21.jpg'
                    },
                    active: true,
                },
                files: [
                    {
                        id: 147,
                        fileManager: {
                            id: 1,
                            fileMime: 'image/jpeg',
                            fileName: 'Img001.jpg',
                            filePath:
                                'https://images.unsplash.com/photo-1741540420894-46bc55554fc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            fileThumbnailPath: '',
                            fileSize: '2 MB',
                            fileMimeType: 'IMAGE',
                        },
                    },
                    {
                        id: 148,
                        fileManager: {
                            id: 2,
                            fileMime: 'image/jpeg',
                            fileName: 'Img002.jpg',
                            filePath:
                                'https://images.unsplash.com/photo-1734983234384-5a3edcec48ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            fileThumbnailPath: '',
                            fileSize: '2 MB',
                            fileMimeType: 'IMAGE',
                        },
                    },
                    {
                        id: 149,
                        fileManager: {
                            id: 3,
                            fileMime: 'image/jpeg',
                            fileName: 'Img003.jpg',
                            filePath:
                                'https://images.unsplash.com/photo-1741531472824-b3fc55e2ff9c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            fileThumbnailPath: '',
                            fileSize: '2 MB',
                            fileMimeType: 'IMAGE',
                        },
                    },
                    {
                        id: 150,
                        fileManager: {
                            id: 4,
                            fileMime: 'image/jpeg',
                            fileName: 'Img004.jpg',
                            filePath:
                                'https://images.unsplash.com/photo-1741509541812-5d8f3e96df23?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            fileThumbnailPath: '',
                            fileSize: '2 MB',
                            fileMimeType: 'IMAGE',
                        },
                    },
                    {
                        id: 151,
                        fileManager: {
                            id: 5,
                            fileMime: 'image/jpeg',
                            fileName: 'Img005.jpg',
                            filePath:
                                'https://images.unsplash.com/photo-1734630378523-c6735d798820?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            fileThumbnailPath: '',
                            fileSize: '2 MB',
                            fileMimeType: 'IMAGE',
                        },
                    },
                    {
                        id: 152,
                        fileManager: {
                            id: 6,
                            fileMime: 'image/jpeg',
                            fileName: 'Img006.jpg',
                            filePath:
                                'https://images.pexels.com/photos/21294005/pexels-photo-21294005/free-photo-of-portrait-of-woman-blowing-dandelion-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                            fileThumbnailPath: '',
                            fileSize: '2 MB',
                            fileMimeType: 'IMAGE',
                        },
                    },
                    {
                        id: 153,
                        fileManager: {
                            id: 7,
                            fileMime: 'image/jpeg',
                            fileName: 'Img007.jpg',
                            filePath:
                                'https://images.pexels.com/photos/27869817/pexels-photo-27869817/free-photo-of-two-women-sitting-on-a-couch-together.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                            fileThumbnailPath: '',
                            fileSize: '2 MB',
                            fileMimeType: 'IMAGE',
                        },
                    },
                    {
                        id: 154,
                        fileManager: {
                            id: 8,
                            fileMime: 'image/jpeg',
                            fileName: 'Img008.jpg',
                            filePath:
                                'https://images.pexels.com/photos/28924817/pexels-photo-28924817/free-photo-of-hong-kong-island-dazzling-night-skyline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                            fileThumbnailPath: '',
                            fileSize: '2 MB',
                            fileMimeType: 'IMAGE',
                        },
                    }
                ],
                liked: false,
                emojiType: null,
                reactionEngage: [
                    {
                        total: 1,
                        emojiType: 'LAUGH'
                    }
                ],
                dtoReplyTo: null,
                chatMessageType: 'IMAGE'
            },
            {
                id: 662,
                chatMsg: 'An approachable, performant and versatile framework for building web user interfaces.',
                msgDateTime: '2025-03-21 13:52:10',
                groupId: 17,
                readCount: 1,
                unsend: false,
                sent: true,
                sendUser: {
                    id: 5,
                    email: 'Darlene@mydomain.com',
                    username: 'Darlene Robertson',
                    avatar: {
                        image: 'https://randomuser.me/api/portraits/women/21.jpg',
                        thumbnail: 'https://randomuser.me/api/portraits/women/21.jpg'
                    },
                    active: true,
                },
                files: [],
                liked: false,
                emojiType: null,
                reactionEngage: [],
                dtoReplyTo: {
                    id: 667,
                    chatMsg: 'they will have to be a topic to see the deference of options and show the Silly things that the world on the way are not the same as you want me vuejs I don\'t want you change springboot I don\'t have any plans ',
                    msgDateTime: '2024-10-02 19:36:56',
                    groupId: 17,
                    readCount: 1,
                    unsend: false,
                    sent: false,
                    sendUser: {
                        id: 1,
                        email: 'Cody@mydomain.com',
                        username: 'Cody Fisher',
                        avatar: {
                            image: 'https://randomuser.me/api/portraits/men/1.jpg',
                            thumbnail: 'https://randomuser.me/api/portraits/men/1.jpg'
                        },
                        active: true,
                    },
                    files: [],
                    liked: false,
                    emojiType: null,
                    reactionEngage: [],
                    dtoReplyTo: null,
                    chatMessageType: 'TEXT'
                },
                chatMessageType: 'TEXT'
            },
            {
                id: 646,
                chatMsg: 'Message unsent.',
                msgDateTime: '2025-01-11 11:55:03',
                groupId: 17,
                readCount: 1,
                unsend: true,
                sent: false,
                sendUser: {
                    id: 7,
                    email: 'Darrell@mydomain.com',
                    username: 'Darrell Steward',
                    avatar: {
                        image: 'https://randomuser.me/api/portraits/men/81.jpg',
                        thumbnail: 'https://randomuser.me/api/portraits/men/81.jpg'
                    },
                    active: true,
                },
                files: [],
                liked: false,
                emojiType: null,
                reactionEngage: [],
                dtoReplyTo: null,
                chatMessageType: 'LOCATION'
            },
            {
                id: 645,
                chatMsg: 'Message with photo',
                msgDateTime: '2025-01-10 12:59:52',
                groupId: 17,
                readCount: 10,
                unsend: false,
                sent: true,
                sendUser: {
                    id: 8,
                    email: 'Chanavee@mydomain.com',
                    username: 'Chanavee Steward',
                    avatar: {
                        image: 'https://randomuser.me/api/portraits/men/88.jpg',
                        thumbnail: 'https://randomuser.me/api/portraits/men/88.jpg'
                    },
                    active: true,
                },
                files: [
                    {
                        id: 142,
                        fileManager: {
                            id: 6,
                            fileMime: 'image/jpeg',
                            fileName: 'Img006.jpg',
                            filePath:
                                'https://images.pexels.com/photos/21294005/pexels-photo-21294005/free-photo-of-portrait-of-woman-blowing-dandelion-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                            fileThumbnailPath: '',
                            fileSize: '2 MB',
                            fileMimeType: 'IMAGE',
                        },
                    }
                ],
                liked: false,
                emojiType: null,
                reactionEngage: [
                    {
                        total: 1,
                        emojiType: 'SAD'
                    }
                ],
                dtoReplyTo: null,
                chatMessageType: 'IMAGE'
            },
            {
                id: 649,
                chatMsg: 'Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative, component-based programming model that helps you efficiently develop user interfaces of any complexity.',
                msgDateTime: '2025-01-10 12:42:20',
                groupId: 17,
                readCount: 1,
                unsend: false,
                sent: false,
                sendUser: {
                    id: 9,
                    email: 'Fisher@mydomain.com',
                    username: 'Cody Fisher',
                    avatar: {
                        image: 'https://randomuser.me/api/portraits/men/0.jpg',
                        thumbnail: 'https://randomuser.me/api/portraits/men/0.jpg'
                    },
                    active: true,
                },
                files: [],
                liked: true,
                emojiType: 'LIKE',
                reactionEngage: [
                    {
                        total: 1,
                        emojiType: 'LIKE'
                    },
                    {
                        total: 10,
                        emojiType: 'CARE'
                    },
                    {
                        total: 2,
                        emojiType: 'FIGHTING'
                    },
                    {
                        total: 1,
                        emojiType: 'LAUGH'
                    },
                    {
                        total: 1,
                        emojiType: 'SAD'
                    },
                    {
                        total: 1,
                        emojiType: 'WOW'
                    }
                ],
                dtoReplyTo: null,
                chatMessageType: 'TEXT'
            },
            {
                id: 644,
                chatMsg: null,
                msgDateTime: '2025-01-10 12:42:20',
                groupId: 17,
                readCount: 1,
                unsend: false,
                sent: false,
                sendUser: {
                    id: 9,
                    email: 'Fisher@mydomain.com',
                    username: 'Cody Fisher',
                    avatar: {
                        image: 'https://randomuser.me/api/portraits/men/0.jpg',
                        thumbnail: 'https://randomuser.me/api/portraits/men/0.jpg'
                    },
                    active: true,
                },
                files: [
                    {
                        id: 141,
                        fileManager: {
                            id: 5,
                            fileMime: 'image/jpeg',
                            fileName: 'Img005.jpg',
                            filePath:
                                'https://images.unsplash.com/photo-1734630378523-c6735d798820?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            fileThumbnailPath: '',
                            fileSize: '2 MB',
                            fileMimeType: 'IMAGE',
                        },
                    }
                ],
                liked: false,
                emojiType: null,
                reactionEngage: [
                    {
                        total: 1,
                        emojiType: 'LAUGH'
                    }
                ],
                dtoReplyTo: null,
                chatMessageType: 'IMAGE'
            }
        ],
        totalPages: 12,
        totalElements: 112,
        last: false
    }
})