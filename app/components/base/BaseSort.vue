  <script setup lang="ts">
  import type { ISort, ISortModeType } from '~/types/common';
  import { biCheck, biSortDown } from '@quasar/extras/bootstrap-icons';


  const props = withDefaults(
    defineProps<{
      fields?: any[];
      sort?: ISort;
      icon?: string;
      label?: string;
      width?: string;
      listDense?: boolean;
      btnRound?: boolean;
    }>(),
    {
      fields: () => [],
      icon: biSortDown,
      width: '200px',
      listDense: false,
      btnRound: false,
    }
  );

  const emit = defineEmits(['on-sort-column', 'on-sort-mode']);
  const { t } = useLang();
  const { sortMode } = useSort();
  const onSortColumn = (column: string | number | boolean) => {
    if (!column || !props.sort) {
      return;
    }
    if (props.sort.column === column) {
      return;
    }
    emit('on-sort-column', column);
  };
  const onSortMode = (mode: ISortModeType) => {
    if (!mode || !props.sort) {
      return;
    }
    if (props.sort.mode === mode) {
      return;
    }
    emit('on-sort-mode', mode);
  };
</script>
  <template>
    <q-btn class="q-mx-sm" flat :round="btnRound" :icon="icon" :label="label">
      <q-menu>
        <q-list :style="{ minWidth: width }" :dense="listDense">
          <q-item-label header>{{ t('sort.sort') }}</q-item-label>
          <q-separator />
          <q-item v-for="(f, fi) in fields" :key="'sort-fields-' + fi" v-close-popup clickable
            @click="onSortColumn(f.value)">
            <q-item-section><span>{{ f.label
                }}<q-icon v-if="sort && sort.column === f.value" class="q-ml-sm"
                  :name="biCheck" /></span></q-item-section>
          </q-item>
          <q-separator />
          <q-item v-for="(m, mi) in sortMode" :key="'sort-mode-' + mi" v-close-popup clickable
            @click="onSortMode(m.value)">
            <q-item-section>
              <span>
                {{ m.label }}
                <q-icon v-if="sort && sort.mode === m.value" class="q-ml-sm" :name="biCheck" /></span></q-item-section>
          </q-item>
        </q-list>
      </q-menu>
      <q-tooltip>{{ t('sort.sort') }}</q-tooltip>
    </q-btn>
  </template>