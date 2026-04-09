import { FileManager } from '~/types/models';

export default defineEventHandler(async (event): Promise<FileManager[]> => {
    return [
        {
            id: 1,
            fileMime: 'application/pdf',
            fileName: 'Trace-based Just-in-Time Type Specialization for Dynamic Languages',
            filePath: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
            fileThumbnailPath: '',
            fileSize: '2 MB',
            fileMimeType: 'FILE',
        },
    ]
})