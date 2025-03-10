import {
    biPeople,
    biUiChecks,
    biCalculator,
    biArrowsCollapse,
    biDiagram3,
} from '@quasar/extras/bootstrap-icons';
import type { LabelValue } from '~/types/common';
import { PageIdParamiter } from './constants';
export const TabTest: LabelValue<any>[] = [
    {
        label: 'Point',
        to: `/tab-page/:${PageIdParamiter}/point`,
        icon: biPeople,
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Photo',
        to: `/tab-page/:${PageIdParamiter}/photo`,
        icon: biUiChecks,
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Video',
        to: `/tab-page/:${PageIdParamiter}/video`,
        icon: biCalculator,
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Tags',
        to: `/tab-page/:${PageIdParamiter}/tags`,
        icon: biArrowsCollapse,
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Message',
        // to: `/tab-page/:${PageIdParamiter}/message`,
        to: '/example/ui/tabs',
        icon: biDiagram3,
        translateLabel: false,
        params: [PageIdParamiter]
    },
];