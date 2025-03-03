  <script setup lang="ts">
  import type { IMenu } from '~/types/common';
  import { checkExpansionChildActive } from '@/utils/appUtil';
  import { mdiChevronDown, mdiChevronRight } from '@quasar/extras/mdi-v7';
  import { computed } from 'vue';

  const { menuItems, iconSize = '20px', dense = true } = defineProps<{
    menuItems: IMenu[];
    darkText?: string;
    lightText?: string;
    dark?: boolean;
    iconSize?: string;
    dense?: boolean;
  }>();
  const { t } = useLang();
  const { getCurrentPath } = useBase();
  const currentUrlPath = computed(() => getCurrentPath(false));
</script>
  <template>
    <q-list v-bind="$attrs" padding>
      <slot name="before" />
      <template v-if="menuItems.length > 0">
        <template v-for="(item, index) in menuItems" :key="`parent-${index}`">
          <q-separator v-if="item.border" />
          <template v-if="item.header">
            <q-item-label header>
              {{ item?.translate !== false ? t(`${item.header}`) : item.header }}
            </q-item-label>
          </template>
          <template v-if="item.pages && item.pages.length > 0">
            <template v-for="(page, pageIndex) in item.pages" :key="`parent-${index}-page-${pageIndex}`">
              <template v-if="!page.items">
                <BaseMenuItem :dark-text="darkText" :light-text="lightText" :dense :item="page" />
              </template>
              <template v-else>
                <q-expansion-item :icon="page.icon" :label="page?.translate !== false ? t(`${page.title}`) : page.title"
                  :default-opened="checkExpansionChildActive(currentUrlPath, page.items)" :expand-icon="mdiChevronRight"
                  :expanded-icon="mdiChevronDown" expand-icon-class="text-muted" :dense>
                  <template #header>
                    <q-item-section avatar>
                      <q-icon :name="page.icon" :size="iconSize" />
                    </q-item-section>

                    <q-item-section>
                      {{ page?.translate !== false ? t(`${page.title}`) : page.title }}
                    </q-item-section>
                  </template>
                  <q-list class="q-pl-sm">
                    <div class="parent-menu-border">
                      <BaseMenuItem v-for="(pageItem, pageItemIndex) in page.items"
                        :key="`parent-${index}-page-${pageIndex}-sub-${pageItemIndex}`" :light-text="lightText"
                        :dark-text="darkText" :dense :item="pageItem" icon-size="18px" />
                    </div>
                  </q-list>

                </q-expansion-item>
              </template>
            </template>
          </template>
        </template>
      </template>
      <slot name="after" />
    </q-list>
  </template>
<style lang="scss">
.parent-menu-border {
  border-left: 1px solid var(--app-main-border-color);
}
.default-nav {
  padding: 10px;
  border-radius: 10px;
}
</style>
