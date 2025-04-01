import {
    biPeople,
    biUiChecks,
    biCalculator,
    biArrowsCollapse,
    biDiagram3,
    biTrophy,
    biFileImage,
    biCameraVideo,
    biTags,
    biChatDots,
} from '@quasar/extras/bootstrap-icons';
import type { LabelValue } from '~/types/common';
import { PageIdParamiter } from './constants';
export const TabTest: LabelValue<any>[] = [
    {
        label: 'Point',
        to: `/tab-page/:${PageIdParamiter}/point`,
        icon: { name: biTrophy },
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Photo',
        to: `/tab-page/:${PageIdParamiter}/photo`,
        icon: { name: biFileImage },
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Video',
        to: `/tab-page/:${PageIdParamiter}/video`,
        icon: { name: biCameraVideo },
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Tags',
        to: `/tab-page/:${PageIdParamiter}/tags`,
        icon: { name: biTags },
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Message',
        // to: `/tab-page/:${PageIdParamiter}/message`,
        to: '/example/ui/tabs',
        icon: { name: biChatDots },
        translateLabel: false,
        params: [PageIdParamiter]
    },
];