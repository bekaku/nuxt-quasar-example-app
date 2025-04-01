// server/api/subdistrict.ts
import { defineEventHandler, getQuery } from 'h3';
import {subdistrict} from '~/libs/thaiProvince'
export default defineEventHandler((event) => {
    const query = getQuery(event);
    const districtId = query.districtId as number;
    return subdistrict.filter(t=>t.amphure_id==districtId);
});
