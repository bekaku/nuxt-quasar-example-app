// server/api/subdistrict.ts
import { defineEventHandler, getQuery } from 'h3';
import { subdistrict, district } from '~/libs/thaiProvince'
interface SubdistrictInitial {
    subdistrictId: number | null;
    districtId: number | null;
    provinceId: number | null;
}
export default defineEventHandler((event) => {
    const id = event.context?.params?.id
    if (id == undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: 'id parameter is required',
        });
    }
    const subdistrictItem = subdistrict.find(t => t.id == parseInt(id));
    const reponse: SubdistrictInitial = {
        districtId: null,
        provinceId: null,
        subdistrictId: null
    };
    if (subdistrictItem && subdistrictItem.amphure_id) {
        reponse.districtId = subdistrictItem.amphure_id;
        reponse.subdistrictId = subdistrictItem.id;
        console.log('subdistrictItem.amphure_id', subdistrictItem.amphure_id);
        const districtItem = district.find(t => t.id == subdistrictItem.amphure_id);
        if (districtItem && districtItem.province_id) {
            reponse.provinceId = districtItem.province_id;
            console.log('districtItem.province_id', districtItem.province_id);
        }
    }
    return reponse;
});
