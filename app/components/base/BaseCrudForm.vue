<script setup lang="ts">
import {
    biArrowLeft,
    biFile
} from '@quasar/extras/bootstrap-icons';
import type { ICrudAction } from '~/types/common';
const {
    crudName,
    managePermission,
    byPassPermission = false,
    listPermission,
    icon = biFile,
    loading = false,
    showBack = true,
    showActionText = true,
    fullWidth = true,
    editButton = true,
    deleteButton = true,
    copyButton = false,
    buttonSize = 'md',
    crudAction
} = defineProps<{
    crudName?: string
    listPermission?: string[]
    managePermission?: string[]
    byPassPermission?: boolean
    title?: string
    icon?: string
    loading?: boolean
    showBack?: boolean
    showDelete?: boolean
    showEdit?: boolean
    crudAction?: ICrudAction
    showActionText?: boolean
    fullWidth?: boolean
    editButton?: true
    deleteButton?: true
    copyButton?: boolean
    buttonSize?: string
}>();
const emit = defineEmits(['on-back', 'on-submit', 'on-delete', 'on-edit-enable']);
const appStore = useAppStore();
const { t } = useLang();
const isHaveManagePermission = computed(() => {
    if (byPassPermission) {
        return true;
    }
    return managePermission && managePermission.length > 0
        ? appStore.isHavePermission(managePermission)
        : crudName
            ? appStore.isHavePermission([`${crudName}_manage`])
            : true;
});
const isHaveListPermission = computed(() => {
    if (byPassPermission) {
        return true;
    }
    return listPermission && listPermission.length > 0
        ? appStore.isHavePermission(listPermission)
        : crudName
            ? appStore.isHavePermission([`${crudName}_list`])
            : true;
});

const onItemClick = (/*type: ICrudAction*/) => {
    if (crudAction == 'view') {
        emit('on-edit-enable')
    }
}
</script>
<template>
    <div class="row" :class="{ 'content-limit': !fullWidth, }">
        <div class="col">
            <QuasarCard>
                <q-card-section>
                    <slot name="crudFromToolbar">
                        <q-toolbar class="q-mb-lg">
                            <QuasarButton v-if="isHaveListPermission && showBack" flat round :icon="biArrowLeft"
                                @click="$emit('on-back')">
                                <q-tooltip>
                                    {{ t('base.back') }}
                                </q-tooltip>
                            </QuasarButton>
                            <q-toolbar-title>
                                <template v-if="crudAction && showActionText">
                                    {{
                                        crudAction === 'new' ? t('base.addNew')
                                            : crudAction === 'copy' ? t('base.copy')
                                                : crudAction === 'edit' ? t('base.edit') : ''
                                    }}
                                </template>
                                {{ title }}
                            </q-toolbar-title>
                            <slot name="toolbarAction">
                                <q-icon size="md" :name="icon" />
                            </slot>
                        </q-toolbar>
                    </slot>
                    <slot name="crudFrom">
                        <q-form class="q-gutter-md" @submit="$emit('on-submit')">
                            <slot name="crudFromContent" />
                            <slot name="crudAction">
                                <q-separator />
                                <q-card-section align="center" class="q-gutter-sm">
                                    <BaseCrudActionButton button :is-have-manage-permission="isHaveManagePermission"
                                        :size="buttonSize" :view-button="false"
                                        :loading
                                        :copy-button="crudAction == 'new' ? false : copyButton"
                                        :edit-button="editButton" :delete-button="deleteButton"
                                        :crud-action="crudAction" @on-item-click="onItemClick" @on-item-delete="$emit('on-delete')" />
                                </q-card-section>
                            </slot>
                        </q-form>
                    </slot>
                </q-card-section>

            </QuasarCard>
        </div>
    </div>
</template>