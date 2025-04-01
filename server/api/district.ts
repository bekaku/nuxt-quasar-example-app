// server/api/district.ts
import { defineEventHandler, getQuery } from 'h3';
import {district} from '~/libs/thaiProvince'
export default defineEventHandler((event) => {
    const query = getQuery(event);
    const provinceId = query.provinceId as number;
    return district.filter(t=>t.province_id==provinceId);
});
