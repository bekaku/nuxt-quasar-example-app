// server/api/provinces.ts
import { defineEventHandler } from 'h3';
import { provinces } from '~/libs/thaiProvince';
export default defineEventHandler(() => {
    return provinces;
});
