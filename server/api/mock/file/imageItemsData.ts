import { FileManager } from '~/types/models';

export default defineEventHandler(async (event): Promise<FileManager[]> => {
    return [
        {
            id: 1,
            fileMime: 'image/jpeg',
            fileName: 'Img001.jpg',
            filePath:
                'https://images.unsplash.com/photo-1741540420894-46bc55554fc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            fileThumbnailPath: '',
            fileSize: '2 MB',
            fileMimeType: 'IMAGE',
        },
        {
            id: 2,
            fileMime: 'image/jpeg',
            fileName: 'Img002.jpg',
            filePath:
                'https://images.unsplash.com/photo-1734983234384-5a3edcec48ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            fileThumbnailPath: '',
            fileSize: '2 MB',
            fileMimeType: 'IMAGE',
        },
        {
            id: 3,
            fileMime: 'image/jpeg',
            fileName: 'Img003.jpg',
            filePath:
                'https://images.unsplash.com/photo-1741531472824-b3fc55e2ff9c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            fileThumbnailPath: '',
            fileSize: '2 MB',
            fileMimeType: 'IMAGE',
        },
        {
            id: 4,
            fileMime: 'image/jpeg',
            fileName: 'Img004.jpg',
            filePath:
                'https://images.unsplash.com/photo-1741509541812-5d8f3e96df23?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            fileThumbnailPath: '',
            fileSize: '2 MB',
            fileMimeType: 'IMAGE',
        },
        {
            id: 5,
            fileMime: 'image/jpeg',
            fileName: 'Img005.jpg',
            filePath:
                'https://images.unsplash.com/photo-1734630378523-c6735d798820?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            fileThumbnailPath: '',
            fileSize: '2 MB',
            fileMimeType: 'IMAGE',
        },
        {
            id: 6,
            fileMime: 'image/jpeg',
            fileName: 'Img006.jpg',
            filePath:
                'https://images.pexels.com/photos/21294005/pexels-photo-21294005/free-photo-of-portrait-of-woman-blowing-dandelion-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            fileThumbnailPath: '',
            fileSize: '2 MB',
            fileMimeType: 'IMAGE',
        },
        {
            id: 7,
            fileMime: 'image/jpeg',
            fileName: 'Img007.jpg',
            filePath:
                'https://images.pexels.com/photos/27869817/pexels-photo-27869817/free-photo-of-two-women-sitting-on-a-couch-together.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            fileThumbnailPath: '',
            fileSize: '2 MB',
            fileMimeType: 'IMAGE',
        },
        {
            id: 8,
            fileMime: 'image/jpeg',
            fileName: 'Img008.jpg',
            filePath:
                'https://images.pexels.com/photos/28924817/pexels-photo-28924817/free-photo-of-hong-kong-island-dazzling-night-skyline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            fileThumbnailPath: '',
            fileSize: '2 MB',
            fileMimeType: 'IMAGE',
        },
        {
            id: 9,
            fileMime: 'image/jpeg',
            fileName: 'Img009.jpg',
            filePath:
                'https://images.pexels.com/photos/29008754/pexels-photo-29008754/free-photo-of-scenic-desert-highway-at-sunrise-in-utah.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            fileThumbnailPath: '',
            fileSize: '2 MB',
            fileMimeType: 'IMAGE',
        },
        {
            id: 10,
            fileMime: 'image/jpeg',
            fileName: 'Img010.jpg',
            filePath:
                'https://images.pexels.com/photos/25244460/pexels-photo-25244460/free-photo-of-a-fashionable-young-woman-standing-on-a-meadow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            fileThumbnailPath: '',
            fileSize: '2 MB',
            fileMimeType: 'IMAGE',
        },
        {
            id: 11,
            fileMime: 'image/jpeg',
            fileName: 'Img011.jpg',
            filePath:
                'https://images.pexels.com/photos/27467770/pexels-photo-27467770/free-photo-of-laptop-and-camera-on-desk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            fileThumbnailPath: '',
            fileSize: '2 MB',
            fileMimeType: 'IMAGE',
        },
        {
            id: 12,
            fileMime: 'image/jpeg',
            fileName: 'Img011.jpg',
            filePath:
                'https://images.pexels.com/photos/28271613/pexels-photo-28271613/free-photo-of-a-car-mirror-is-shown-in-the-side-view-of-a-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            fileThumbnailPath: '',
            fileSize: '2 MB',
            fileMimeType: 'IMAGE',
        },
    ]
})