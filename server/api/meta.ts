// server/api/meta.ts
import axios from 'axios';
import { JSDOM } from 'jsdom';
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
        const dom = new JSDOM(html);
        const metaTags = Array.from(dom.window.document.querySelectorAll('meta'));

        const metaData: MetaData = metaTags.reduce<MetaData>((acc: any, tag: any) => {
            const property = tag.getAttribute('property') || tag.getAttribute('name');
            if (property && property.startsWith('og:')) {
                acc[property] = tag.getAttribute('content') || '';
            }
            return acc;
        }, {});

        return {
            domain:metaData['og:site_name'],
            url:metaData['og:url'],
            title:metaData['og:title'],
            desc:metaData['og:description'],
            image:metaData['og:image'],
        };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch metadata',
        });
    }
});
