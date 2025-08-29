// server/api/subdistrict.ts
import { defineEventHandler, getQuery } from 'h3';
import { district } from '~/libs/thaiProvince'
export default defineEventHandler((event) => {
    const id = event.context?.params?.id
    if (id == undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: 'id parameter is required',
        });
    }
    return district.find(t => t.id == parseInt(id));
});
