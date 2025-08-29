import { biHouseDoor, biPencil, biPeople, biPerson, biShieldCheck } from "@quasar/extras/bootstrap-icons";
import type { LabelValue } from "~/types/common";
import { PageIdParamiter } from "./constants";

export const crudDetailFn = (crud: string): LabelValue<any>[] => {
    return [{
        label: 'base.detail',
        to: `/${crud}/:crud/:${PageIdParamiter}`,
        icon:{name: biPencil},
        translateLabel: true,
        params: ['crud', PageIdParamiter],
    }];
}
export const ExampleHomeBreadcrumb: LabelValue<any>[] = [
    {
        label: 'base.home',
        to: '/',
        icon:{name: biHouseDoor},
        translateLabel: true,
    },
    {
        label: 'Permission list',
        to: '/permission',
        icon: {name:biShieldCheck},
        translateLabel: false,
    },
];
export const PermissionFormBreadcrumb: LabelValue<any>[] = [
    {
        label: 'model_permission',
        to: '/permission',
        // to: `/permission/view/:${PageIdParamiter}?testQuery={testQuery}&testQuery2={testQuery2}`,
        icon:{name: biShieldCheck},
        translateLabel: true,
        // params: [PageIdParamiter],
        // queries: ['testQuery', 'testQuery2']
    },
    ...crudDetailFn('permission')
];
export const RoleFormBreadcrumb: LabelValue<any>[] = [
    {
        label: 'model.role.table',
        to: '/app-role',
        icon:{name: biPeople},
        translateLabel: true
    },
    ...crudDetailFn('app-role')
];
export const UserFormBreadcrumb: LabelValue<any>[] = [
    {
        label: 'model_user',
        to: '/app-user',
        icon:{name: biPerson},
        translateLabel: true
    },
    ...crudDetailFn('app-user')
];
