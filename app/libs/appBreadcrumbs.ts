import { biHouseDoor, biPencil, biPeople, biPerson, biShieldCheck } from "@quasar/extras/bootstrap-icons";
import type { LabelValue } from "~/types/common";
import { PageIdParamiter } from "./constants";

export const crudDetailFn = (crud: string): LabelValue<any>[] => {
    return [{
        label: 'base.detail',
        to: `/${crud}/:crud/:${PageIdParamiter}`,
        icon: biPencil,
        translateLabel: true,
        params: ['crud', PageIdParamiter],
    }];
}
export const ExampleHomeBreadcrumb: LabelValue<any>[] = [
    {
        label: 'base.home',
        to: '/',
        icon: biHouseDoor,
        translateLabel: true,
    },
    {
        label: 'Permission list',
        to: '/permission',
        icon: biShieldCheck,
        translateLabel: false,
    },
];
export const PermissionFormBreadcrumb: LabelValue<any>[] = [
    {
        label: 'model_permission',
        to: '/permission',
        // to: `/permission/view/:${PageIdParamiter}?testQuery={testQuery}&testQuery2={testQuery2}`,
        icon: biShieldCheck,
        translateLabel: true,
        // params: [PageIdParamiter],
        // queries: ['testQuery', 'testQuery2']
    },
    ...crudDetailFn('permission')
];
export const RoleFormBreadcrumb: LabelValue<any>[] = [
    {
        label: 'model.role.table',
        to: '/role',
        icon: biPeople,
        translateLabel: true
    },
    ...crudDetailFn('role')
];
export const UserFormBreadcrumb: LabelValue<any>[] = [
    {
        label: 'model_user',
        to: '/user',
        icon: biPerson,
        translateLabel: true
    },
    ...crudDetailFn('user')
];
