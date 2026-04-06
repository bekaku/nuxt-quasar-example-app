import axios from 'axios';
import * as cheerio from 'cheerio';
import { defineEventHandler, getQuery, createError } from 'h3';
import type { OgMeta } from '~/types/common';

type MetaData = Record<string, string>;

export default defineEventHandler(async (event): Promise<OgMeta> => {
    const query = getQuery(event);
    const url = query.url as string;

    if (!url) {
        throw createError({
            statusCode: 400,
            statusMessage: 'URL parameter is required',
        });
    }

    try {
        const { data: html } = await axios.get<string>(url);

        const $ = cheerio.load(html);
        const metaData: MetaData = {};

        $('meta').each((_, element) => {
            const property = $(element).attr('property') || $(element).attr('name');
            if (property && property.startsWith('og:')) {
                metaData[property] = $(element).attr('content') || '';
            }
        });

        return {
            domain: metaData['og:site_name'] || '',
            url: metaData['og:url'] || '',
            title: metaData['og:title'] || '',
            desc: metaData['og:description'] || '',
            image: metaData['og:image'] || '',
        };
    } catch (error) {
        console.error('Error fetching meta:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch metadata',
        });
    }
});