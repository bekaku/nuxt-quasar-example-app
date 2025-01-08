<script setup lang="ts">
import { useConstant } from '~/composables/useConstant';
import { type ICrudAction, type ICrudListHeader, type IPagination, type ISort, type LabelValue, CrudListDataType, ICrudListHeaderOptionSearchType } from '~/types/common';


import {
    biArrowClockwise,
    biCheckCircle,
    biChevronExpand,
    biEraser,
    biFile,
    biPlusCircle,
    biSearch,
    biSortAlphaDown,
    biSortAlphaUpAlt,
    biThreeDots,
    biTrash,
    biX
} from '@quasar/extras/bootstrap-icons';
import { getValFromObjectByPath } from '~/utils/appUtil';
import QuasarDatePicker from '../quasar/QuasarDatePicker.vue';
import QuasarToggle from '../quasar/QuasarToggle.vue';
const {
    icon = biFile,
    showPaging = true,
    loading = false,
    firstLoaded = false,
    showCheckbox = true,
    showNewBtn = true,
    showSearchBtn = true,
    showSearchTextBox = false,
    showThreeDot = true,
    showFilter = true,
    showSort = true,
    fullWidth = true,
    pages,
    list,
    headers,
    crudName,
    viewPermission,
    managePermission,
    byPassPermission = false
} = defineProps<{
    crudName?: string
    viewPermission?: string[]
    managePermission?: string[]
    byPassPermission?: boolean
    title?: string
    icon?: string
    list: any[]
    headers: ICrudListHeader[]
    sort?: ISort
    pages?: IPagination
    firstLoaded?: boolean
    loading?: boolean
    showPaging?: boolean
    showCheckbox?: boolean
    showNewBtn?: boolean
    showSearchBtn?: boolean
    showSearchTextBox?: boolean
    showThreeDot?: boolean
    showFilter?: boolean
    showSort?: boolean
    fullWidth?: boolean
}>();
const emit = defineEmits([
    'on-page-no-change',
    'on-items-perpage-change',
    'update-search',
    'on-sort',
    'on-sort-mode',
    'on-item-copy',
    'on-item-click',
    'on-item-delete',
    'on-new-form',
    'on-reload',
    'on-advance-search',
    'on-keyword-search',
]);
const { t, locale } = useLang();
const { formatDate, formatDateTime } = useDateFns();
const { searchOperations } = useConstant();
const { inputSanitizeHtml } = useBase();
const appStore = useAppStore();
const crudPages = ref<IPagination | undefined>(pages);

const filterText = ref('');
const selectedAll = ref(false);
const showSearch = ref(false);
const selected = ref<number[]>([]);
const onCheckedAll = () => {
    updateSelectedAll(selectedAll.value);
};
const updateSelectedAll = (val: boolean) => {
    selected.value = [];
    if (val) {
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (item) {
                selected.value.push(item.id);
            }
        }
    }
};
const onDeleteItemSelected = () => {
    if (selected.value.length > 0) {
        onItemDelete(selected.value, false);
    }
};
const onItemDelete = (indexOrIds: number | number[], isSingle: boolean) => {
    emit('on-item-delete', indexOrIds, isSingle);
};
const getItemByIndex = (index: number) => {
    const item = list[index];
    if (!item) {
        return;
    }
    return item;
};
const getValueByColunm = (column: string, index: number) => {
    const item = getItemByIndex(index);
    if (!column || !item) {
        return null;
    }
    const path = column.split('.');
    if (path.length > 1) {
        return getValFromObjectByPath(item, column);
    }
    return !isEmpty(item[column]) ? item[column] : null;
};
const getValueBoolean = (column: string, index: number) => {
    if (!column) {
        return false;
    }
    const val = getValueByColunm(column, index);
    if (!val) {
        return false;
    }
    return val === true;
};
const sortableHeaders = computed<LabelValue<string>[]>(() => {
    const filters = headers.filter((c) => c.options && c.options.sortable === true);
    const listHeaders: LabelValue<string>[] = [];
    for (const item of filters) {
        const sortVal = item.options.sortColunm ? item.options.sortColunm : item.column;
        if (sortVal != undefined) {
            listHeaders.push({
                value: sortVal,
                label: t(item.label),
            });
        }
    }
    return listHeaders;
});
const fillableHeaders = computed<ICrudListHeader[]>(() => {
    if (!headers || headers.length === 0) {
        return [];
    }
    return headers.filter((c) => c.options && c.options.fillable === true);
});
const searchableHeaders = computed(() => {
    if (!headers || headers.length === 0) {
        return [];
    }
    return headers.filter((c) => c.options && c.options.searchable === true);
});
const onClearSearch = () => {
    // showSearch.value = false;
    onClearSearchModel();
    emit('on-reload');
};
const onClearSearchModel = () => {
    if (searchableHeaders.value.length > 0) {
        for (const col of searchableHeaders.value) {
            if (col.options) {
                if (col.type == CrudListDataType.STATUS) {
                    col.options.searchModel = true;
                } else {
                    col.options.searchModel = null;
                }
            }
        }
    }
}
const onAdvanceSearch = () => {
    filterText.value = '';
    let q = '';
    if (searchableHeaders.value.length > 0) {
        for (const col of searchableHeaders.value) {
            if (col.options) {
                const operation = col.options.searchOperation;
                const searchVal = col.options.searchModel;
                const colunm = col.options.searchColunm
                    ? col.options.searchColunm
                    : col.column;
                if (operation != undefined && searchVal != undefined) {
                    let val = inputSanitizeHtml(searchVal);
                    if (col.type == CrudListDataType.STATUS) {
                        val = searchVal;
                    }
                    if (q) {
                        q += ',';
                    }
                    q += `${colunm}${operation}${val}`;
                }
            }
        }
    }
    emit('on-advance-search', q);
};
const onKeywordSearch = () => {
    // if (filterText.value?.trim().length >= SearchMinCharactor) {
    emit('on-keyword-search', inputSanitizeHtml(filterText.value));
    // }
};
const isHaveViewPermission = computed(() => {
    if (byPassPermission) {
        return true;
    }
    return viewPermission && viewPermission.length>0
        ? appStore.isHavePermission(viewPermission)
        : crudName
            ? appStore.isHavePermission([`${crudName}_view`])
            : true;
});
const isHaveManagePermission = computed(() => {
    if (byPassPermission) {
        return true;
    }
    return managePermission && managePermission.length>0
        ? appStore.isHavePermission(managePermission)
        : crudName
            ? appStore.isHavePermission([`${crudName}_manage`])
            : true;
});
const dateForMat = (d: string, format: string | undefined = undefined) => {
    return d
        ? formatDate(d, format || FORMAT_DATE1, locale.value)
        : undefined;
};
const datetimeForMat = (d: string, format: string | undefined = undefined) => {
    return d
        ? formatDateTime(d, format || FORMAT_DATETIME, locale.value)
        : undefined;
};
const onPageChange = async (v: number | undefined) => {
    if (v && crudPages.value) {
        crudPages.value.current = v;
        emit('on-page-no-change', v);
    }
};
const onPerPageChange = async (v: number | undefined) => {
    console.log('CrudList > onPerPageChange')
    if (v && crudPages.value) {
        crudPages.value.itemsPerPage = v;
        emit('on-items-perpage-change', v);
    }
};
</script>
<template>
    <div class="row" :class="{ 'content-limit': !fullWidth, }">
        <div class="col">
            <QuasarCard>
                <slot name="headerCard" />
                <q-card-section>
                    <q-toolbar>
                        <q-toolbar-title>
                            <slot name="title">
                                <template v-if="title">
                                    <q-icon :name="icon" />
                                    {{ title }}
                                </template>
                            </slot>
                        </q-toolbar-title>
                        <div class="row items-center">
                            <q-form v-if="showSearchTextBox && !showSearch" @submit="onKeywordSearch">
                                <QuasarInput v-model="filterText" rounded clearable :placeholder="t('base.searchHelp3')"
                                    class="q-mr-md" style="width: 350px">
                                    <template #prepend>
                                        <q-icon :name="biSearch" />
                                    </template>
                                </QuasarInput>
                                <!-- <q-input v-model="filterText" dense outlined rounded clearable style="width: 350px"
                                    :placeholder="t('base.searchHelp3')">
                                    <template #prepend>
                                        <q-icon :name="biSearch" />
                                    </template>
                                </q-input> -->
                            </q-form>
                            <slot name="extraBeforeInnerToolbar" />
                            <QuasarButton v-if="isHaveManagePermission && showNewBtn" class="q-ml-xs"
                                :label="t('base.addNew')" color="primary" unelevated :icon="biPlusCircle"
                                @click="$emit('on-new-form')">
                                <q-tooltip>{{ t('base.addNew') }}</q-tooltip>
                            </QuasarButton>
                            <QuasarButton v-if="showSearchBtn" class="q-ml-xs" flat round :icon="biSearch"
                                @click="showSearch = !showSearch">
                                <q-tooltip>{{ t('base.search') }}</q-tooltip>
                            </QuasarButton>
                            <base-sort v-if="showSort" :sort="sort" flat round :fields="sortableHeaders"
                                @on-sort-column="$emit('on-sort', $event)"
                                @on-sort-mode="$emit('on-sort-mode', $event)" />

                            <BaseCrudListHeaderFilter v-if="showFilter" :headers="headers" />

                            <q-btn v-if="showThreeDot" flat round :icon="biThreeDots">
                                <q-menu>
                                    <q-list style="min-width: 200px" dense>
                                        <q-item v-if="isHaveManagePermission && showNewBtn" v-close-popup clickable
                                            @click="$emit('on-new-form')">
                                            <q-item-section side>
                                                <q-icon size="18px" :name="biPlusCircle" class="q-text-black" />
                                            </q-item-section>
                                            <q-item-section>{{ t('base.addNew') }}</q-item-section>
                                        </q-item>
                                        <q-item v-if="isHaveManagePermission && showCheckbox" v-close-popup clickable
                                            @click="onDeleteItemSelected">
                                            <q-item-section side>
                                                <q-icon size="18px" :name="biTrash" class="q-text-black" />
                                            </q-item-section>
                                            <q-item-section>{{ t('base.deleteSeleted') }}
                                            </q-item-section>
                                        </q-item>
                                        <q-item v-if="showSearchBtn" v-close-popup clickable @click="showSearch = true">
                                            <q-item-section side>
                                                <q-icon size="18px" :name="biSearch" class="q-text-black" />
                                            </q-item-section>
                                            <q-item-section>{{ t('base.searchAdvance') }}
                                            </q-item-section>
                                        </q-item>
                                        <q-separator />
                                        <q-item v-close-popup clickable @click="$emit('on-reload')">
                                            <q-item-section side>
                                                <q-icon size="18px" :name="biArrowClockwise" class="q-text-black" />
                                            </q-item-section>
                                            <q-item-section>{{ t('base.reload') }}</q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-btn>
                            <slot name="extraInnerToolbar" />
                        </div>
                    </q-toolbar>
                    <slot name="extraToolbar" />
                </q-card-section>
                <q-card-section v-if="showSearch" class="q-mb-lg">
                    <q-card flat bordered>
                        <q-card-section>
                            <div class="text-h6">
                                {{ t('base.search') }}
                            </div>
                        </q-card-section>
                        <q-form class="q-pa-md" @submit="onAdvanceSearch">
                            <slot name="topSearchExtra" />
                            <template v-if="searchableHeaders.length > 0">
                                <div class="row">
                                    <slot name="topInnerSearchExtra" />
                                    <template v-for="(searchCol, searchIndex) in searchableHeaders"
                                        :key="`advance-search-${searchIndex}`">
                                        <div v-if="searchCol.options" class="col-12 col-md-4 q-pa-sm">
                                            <div class="q-gutter-md row items-center">
                                                <template v-if="
                                                    searchCol.options?.searchType ==
                                                    ICrudListHeaderOptionSearchType.TEXT ||
                                                    searchCol.options?.searchType ==
                                                    ICrudListHeaderOptionSearchType.NUMBER
                                                ">
                                                    <q-input v-model="searchCol.options.searchModel" outlined dense
                                                        :type="searchCol.options?.searchType ==
                                                            ICrudListHeaderOptionSearchType.TEXT
                                                            ? 'text'
                                                            : 'number'
                                                            " :label="t(searchCol.label)" clearable
                                                        style="width: 100%">
                                                        <template #before>
                                                            <q-select v-if="
                                                                !searchCol.options.searchOperationReadonly
                                                            " v-model="searchCol.options.searchOperation" dense filled
                                                                :label="t(searchCol.label)" class="q-mx-lg"
                                                                :options="searchOperations" option-value="value"
                                                                option-label="text" emit-value map-options :readonly="searchCol.options.searchOperationReadonly
                                                                    " style="min-width: 150px"
                                                                :dropdown-icon="biChevronExpand" />
                                                        </template>
                                                    </q-input>
                                                </template>
                                                <template v-else-if="
                                                    searchCol.options?.searchType ==
                                                    ICrudListHeaderOptionSearchType.BOOLEAN
                                                ">
                                                    <QuasarToggle v-model="searchCol.options.searchModel" use-checkbox
                                                        use-label-title :label="t(searchCol.label)" />
                                                </template>
                                                <template v-else-if="
                                                    searchCol.options?.searchType ==
                                                    ICrudListHeaderOptionSearchType.DATE
                                                ">
                                                    <template v-if="searchCol.options.searchModel != undefined">
                                                        <QuasarDatePicker v-model="searchCol.options.searchModel" dense
                                                            :title="t(searchCol.label)" />
                                                    </template>
                                                </template>
                                            </div>
                                        </div>
                                    </template>

                                    <slot name="belowInnerSearchExtra" />
                                </div>

                                <slot name="belowSearchExtra" />
                                <q-separator />
                                <q-card-actions align="center">
                                    <QuasarButton type="submit" outline :icon="biSearch" :label="t('base.okay')" />
                                    <QuasarButton flat :icon="biX" :label="t('base.close')"
                                        @click="showSearch = false" />
                                    <QuasarButton flat :icon="biEraser" :label="t('base.clear')"
                                        @click="onClearSearch" />
                                </q-card-actions>
                            </template>
                        </q-form>
                    </q-card>
                </q-card-section>
                <!-- <q-markup-table v-if="list.length > 0" separator="cell" flat bordered> -->
                <template v-if="!firstLoaded || loading">
                    <skeleton-table />
                </template>
                <template v-else>
                    <slot name="table">
                        <q-markup-table v-if="list.length > 0" separator="cell" flat bordered>
                            <thead>
                                <slot name="theader">
                                    <tr>
                                        <th v-if="isHaveManagePermission && showCheckbox">
                                            <q-checkbox v-model="selectedAll" @click="onCheckedAll">
                                                <q-tooltip>
                                                    {{
                                                        !selectedAll
                                                            ? t('base.selectAll')
                                                            : t('base.deselectAll')
                                                    }}
                                                </q-tooltip>
                                            </q-checkbox>
                                        </th>
                                        <template v-for="(tblHeader, tblIndex) in fillableHeaders"
                                            :key="`tblHeader-${tblIndex}`">
                                            <template v-if="tblHeader.type === CrudListDataType.BASE_TOOL">
                                                <th v-if="isHaveManagePermission || isHaveViewPermission">
                                                    {{ t(tblHeader.label) }}
                                                </th>
                                            </template>
                                            <th v-else>
                                                <template v-if="tblHeader.options && tblHeader.options.sortable">
                                                    <q-btn flat no-caps rounded @click="
                                                        $emit(
                                                            'on-sort',
                                                            tblHeader.options.sortColunm
                                                                ? tblHeader.options.sortColunm
                                                                : tblHeader.column,
                                                        )
                                                        ">
                                                        <template v-if="
                                                            sort && sort.column == tblHeader.options.sortColunm ||
                                                            sort && sort.column == tblHeader.column
                                                        ">
                                                            <q-icon :name="sort.mode == 'desc'
                                                                ? biSortAlphaUpAlt
                                                                : biSortAlphaDown
                                                                " />
                                                        </template>

                                                        {{ t(tblHeader.label) }}
                                                    </q-btn>
                                                </template>
                                                <template v-else>
                                                    {{ t(tblHeader.label) }}
                                                </template>
                                            </th>
                                        </template>
                                    </tr>
                                </slot>
                            </thead>
                            <tbody>
                                <slot name="tbody" v-bind="{ list, fillableHeaders }">
                                    <tr v-for="(item, index) in list" :key="`item-tr-${index}`">
                                        <td v-if="isHaveManagePermission && showCheckbox" class="text-center">
                                            <q-checkbox v-model="selected" :val="item.id" />
                                        </td>

                                        <template v-for="(fillable, bodyIndex) in fillableHeaders"
                                            :key="`item-body-${bodyIndex}`">
                                            <template v-if="fillable.options">
                                                <template v-if="fillable.type === CrudListDataType.BASE_TOOL">
                                                    <td class="text-center">
                                                        <slot name="baseTool" v-bind="{ item: item, index: index }">
                                                            <template
                                                                v-if="isHaveManagePermission || isHaveViewPermission">
                                                                <BaseCrudActionButton
                                                                    :is-have-manage-permission="isHaveManagePermission"
                                                                    :is-have-view-permission="isHaveViewPermission"
                                                                    :edit-button="fillable.options && fillable.options.editButton"
                                                                    :copy-button="fillable.options && fillable.options.copyButton"
                                                                    :delete-button="fillable.options && fillable.options.deleteButton"
                                                                    @on-item-click="(clickType: ICrudAction) => $emit('on-item-click', index, clickType)"
                                                                    @on-item-copy="() => $emit('on-item-copy', index)"
                                                                    @on-item-delete="() => onItemDelete(index, true)" />
                                                            </template>
                                                        </slot>
                                                        <slot name="additionalBaseTool"
                                                            v-bind="{ item: item, index: index }" />
                                                    </td>
                                                </template>
                                                <td v-else :class="{
                                                    'text-center':
                                                        fillable.options &&
                                                        fillable.options.align == 'center',
                                                    'text-left':
                                                        fillable.options &&
                                                        fillable.options.align == 'left',
                                                    'text-right':
                                                        fillable.options &&
                                                        fillable.options.align == 'right',
                                                    'long-text-break':
                                                        fillable.options && fillable.options.maxWidth,
                                                }" :style="{
                                                    maxWidth:
                                                        fillable.options && fillable.options.maxWidth
                                                            ? fillable.options.maxWidth
                                                            : '',
                                                }">
                                                    <template v-if="fillable.type === CrudListDataType.TEXT">
                                                        <template v-if="
                                                            fillable.options && fillable.options.toolTip
                                                        ">
                                                            <span>
                                                                {{
                                                                    fillable.column
                                                                        ? getValueByColunm(fillable.column, index)
                                                                        : ''
                                                                }}
                                                                <q-tooltip>
                                                                    {{
                                                                        fillable.column
                                                                            ? getValueByColunm(fillable.column, index)
                                                                            : ''
                                                                    }}
                                                                </q-tooltip>
                                                            </span>
                                                        </template>
                                                        <template v-else>
                                                            {{
                                                                fillable.column
                                                                    ? getValueByColunm(fillable.column, index)
                                                                    : ''
                                                            }}
                                                        </template>
                                                    </template>
                                                    <template v-else-if="
                                                        fillable.type === CrudListDataType.FUNCTION &&
                                                        fillable.options &&
                                                        fillable.options.func
                                                    ">
                                                        <template v-if="
                                                            fillable.column &&
                                                            getValueByColunm(fillable.column, index) !=
                                                            undefined
                                                        ">
                                                            {{
                                                                fillable.options.func(
                                                                    getValueByColunm(fillable.column, index),
                                                                )
                                                            }}
                                                        </template>
                                                    </template>
                                                    <template v-else-if="
                                                        fillable.type === CrudListDataType.NUMBER_FORMAT
                                                    ">
                                                        {{
                                                            fillable.column
                                                                ? getValueByColunm(
                                                                    fillable.column,
                                                                    index,
                                                                ).toLocaleString()
                                                                : ''
                                                        }}
                                                    </template>
                                                    <template v-else-if="fillable.type === CrudListDataType.DATE">
                                                        {{
                                                            fillable.column
                                                                ? dateForMat(
                                                                    getValueByColunm(fillable.column, index),
                                                                )
                                                                : ''
                                                        }}
                                                    </template>
                                                    <template v-else-if="
                                                        fillable.type === CrudListDataType.DATE_TIME
                                                    ">
                                                        {{
                                                            fillable.column
                                                                ? datetimeForMat(
                                                                    getValueByColunm(fillable.column, index),
                                                                )
                                                                : ''
                                                        }}
                                                    </template>
                                                    <template v-else-if="
                                                        fillable.type === CrudListDataType.STATUS
                                                    ">
                                                        <q-icon size="sm" :color="fillable.column &&
                                                            getValueBoolean(fillable.column, index)
                                                            ? 'positive'
                                                            : 'grey-4'
                                                            " :name="biCheckCircle" />
                                                    </template>
                                                    <template v-else-if="
                                                        fillable.type === CrudListDataType.AVATAR
                                                    ">
                                                        <q-avatar v-if="
                                                            fillable.column &&
                                                            getValueByColunm(fillable.column, index)
                                                        " :rounded="fillable.options.rounded"
                                                            :square="fillable.options.square" :size="fillable.options.size
                                                                ? fillable.options.size
                                                                : '36px'
                                                                ">
                                                            <q-img v-if="
                                                                fillable.column &&
                                                                getValueByColunm(fillable.column, index)
                                                            " :src="getValueByColunm(fillable.column, index)"
                                                                :alt="'item-img-' + bodyIndex" :ratio="1" />
                                                            <img v-else src="/images/no_picture_thumb.jpg"
                                                                :alt="'item-img-' + bodyIndex">
                                                        </q-avatar>
                                                    </template>
                                                    <template v-else-if="fillable.type === CrudListDataType.IMAGE">
                                                        <q-img v-if="
                                                            fillable.column &&
                                                            getValueByColunm(fillable.column, index)
                                                        " :src="getValueByColunm(fillable.column, index)"
                                                            spinner-color="white" class="bg-grey-8" :ratio="4 / 3"
                                                            :style="fillable.options.size
                                                                ? `width: ${fillable.options.size}; height: ${fillable.options.size}`
                                                                : 'width:55px;height:55px'
                                                                " />
                                                        <q-img v-else src="/images/no_picture_thumb.jpg"
                                                            spinner-color="white" class="bg-grey-8" :ratio="4 / 3"
                                                            :style="fillable.options.size
                                                                ? `width: ${fillable.options.size}; height: ${fillable.options.size}`
                                                                : 'width:55px;height:55px'
                                                                " />
                                                    </template>
                                                    <template v-else-if="fillable.type === CrudListDataType.ICON">
                                                        <q-icon v-if="fillable.column"
                                                            :name="getValueByColunm(fillable.column, index)" />
                                                    </template>
                                                </td>
                                            </template>
                                        </template>
                                    </tr>
                                </slot>
                            </tbody>
                        </q-markup-table>
                        <q-card-section v-else class="text-center">
                            <base-result status="empty" :description="t('error.dataNotfound')" />
                        </q-card-section>
                    </slot>
                </template>
                <slot name="paging">
                    <base-paging v-if="crudPages && showPaging && crudPages.totalPages > 0" v-model="crudPages"
                        :boundary-numbers="false" @update-current="onPageChange" @update-perpage="onPerPageChange" />
                </slot>
            </QuasarCard>
        </div>
    </div>
</template>