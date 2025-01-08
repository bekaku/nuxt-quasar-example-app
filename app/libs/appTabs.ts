import {
    biPeople,
    biUiChecks,
    biCalculator,
    biArrowsCollapse,
    biDiagram3,
} from '@quasar/extras/bootstrap-icons';
import type { Breadcrumb } from '~/types/common';
import { PageIdParamiter } from './constants';
export const TabTest: Breadcrumb[] = [
    {
        label: 'Point',
        to: `/test-config/:${PageIdParamiter}/point`,
        icon: biPeople,
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Photo',
        to: `/test-config/:${PageIdParamiter}/photo`,
        icon: biUiChecks,
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Video',
        to: `/test-config/:${PageIdParamiter}/video`,
        icon: biCalculator,
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Tags',
        to: `/test-config/:${PageIdParamiter}/tags`,
        icon: biArrowsCollapse,
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Message',
        to: `/test-config/:${PageIdParamiter}/message`,
        icon: biDiagram3,
        translateLabel: false,
        params: [PageIdParamiter]
    },
];