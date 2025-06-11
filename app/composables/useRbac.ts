import { useAppStore } from '@/stores/appStore';
import type { RBACProps } from '@/types/props';
export const useRbac = () => {
    const { permissions } = useAppStore();

    const isPermited = (code: string): boolean => {
        return permissions != undefined &&permissions != null && permissions.find((t: string) => t === code) != undefined;
    }
    const isHavePermission = (codes: string[] | undefined): boolean => {
        if (codes == undefined || codes.length == 0) {
            return true;
        }
        let isHave = false;
        for (const code of codes) {
            if (!isHave) {
                isHave = isPermited(code);
                if (isHave) {
                    break;
                }
            }
        }
        return isHave
    }
    const isHaveAllPermission = (codes: string[] | undefined): boolean => {
        if (codes == undefined || codes.length == 0) {
            return true;
        }
        let isHave = true;
        for (const code of codes) {
            if (isHave) {
                isHave = isPermited(code);
                if (!isHave) {
                    break;
                }
            }
        }
        return isHave
    }
    const isHavePermissionLazy = (codes: string[] | undefined): Promise<boolean> => {
        return new Promise((resolve) => {
            const isHave = isHavePermission(codes)
            resolve(isHave);
        })
    }
    const hasPermission = (rbac: RBACProps | undefined) => {
        if (!rbac || !rbac.permissions || rbac.permissions.length == 0) {
            return true;
        }
        if (!rbac.condition || rbac.condition == 'any') {
            return isHavePermission(rbac.permissions);
        }

        if (rbac.condition == 'all') {
            return isHaveAllPermission(rbac.permissions);
        }
        if (rbac.condition == 'not') {
            return !isHavePermission(rbac.permissions);
        }

        return false;
    }
    const hasPermissionLazy = async (rbac: RBACProps | undefined): Promise<boolean> => {
        const isHave = await isHavePermissionLazy(rbac?.permissions)
        return new Promise((resolve) => {
            resolve(isHave);
        })
    }
    return {
        hasPermission,
        hasPermissionLazy,
        isHavePermissionLazy
    }
};
