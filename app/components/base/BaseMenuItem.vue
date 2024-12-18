  <script setup lang="ts">
  import type { IMenuPageItem } from '~/types/common';

  const { item, darkText = 'text-white', lightText = 'text-black', dense = false, iconSize = 'sm' } = defineProps<{
    item: IMenuPageItem;
    darkText?: string;
    lightText?: string;
    iconSize?: string;
    dense?: boolean;
  }>();
  const { isDark } = useTheme();
  const { t } = useLang();
  const { getCurrentPath } = useBase();
</script>
  <template>
    <q-item v-ripple v-bind="$attrs" :to="item.to" clickable :dense
      :active-class="item.noActiveLink ? 'q-item-no-link-highlighting' : 'active-menu-link'"
      :class="item.to == getCurrentPath(false) ? 'text-primary' : isDark ? darkText : lightText">
      <q-item-section side>
        <q-icon :name="item.icon" :class="item.to == getCurrentPath(false) ? 'text-primary' : 'q-text-black'"
          :size="iconSize" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ item?.translate !== false ? t(`${item.title}`) : item.title }}
        </q-item-label>
        <q-item-label v-if="item?.caption" caption lines="1">
          {{ item.caption }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </template>