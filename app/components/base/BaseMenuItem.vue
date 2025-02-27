  <script setup lang="ts">
  import type { IMenuPageItem } from '~/types/common';

  const { item, darkText = 'text-white', lightText = 'text-black', dense = true, iconSize = '20px' } = defineProps<{
    item: IMenuPageItem;
    darkText?: string;
    lightText?: string;
    iconSize?: string;
    dense?: boolean;
  }>();
  const { isDark } = useTheme();
  const { t } = useLang();
  const { getCurrentPath } = useBase();
  const isActive = computed(() => {
    return item.to == getCurrentPath(false);
  });
</script>
  <template>
    <!-- <q-item v-ripple v-bind="$attrs" :to="item.to" clickable :dense
      :active-class="item.noActiveLink ? 'q-item-no-link-highlighting' : 'active-menu-link'"
      :class="isActive ? 'text-primary' : isDark ? darkText : lightText"> -->
    <q-item v-ripple v-bind="$attrs" :to="item.to" clickable :dense
      :active-class="item.noActiveLink ? 'q-item-no-link-highlighting' : 'active-menu-link'"
      :class="{ 'nav-active': isActive, 'default-nav-dense': dense }">
      <q-item-section side>
        <!-- <q-icon :name="item.icon" :class="item.to == getCurrentPath(false) ? 'text-primary' : 'q-text-black'" :size="iconSize" /> -->
        <q-icon :name="item.icon" class="q-text-black" :size="iconSize" />
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

<style scoped lang="scss">
.nav-active {
  // background-color: $primary !important;
  // color: #fff;

  background-color: #e0e0e0 !important;
  // color: $primary;
  
}

body.body--dark {
  .nav-active {
    background-color: #313234 !important;
    color: #fff;
  }
}

.default-nav-dense {
  // padding: 10px;
  margin: 5px 5px;
  border-radius: 10px;
}
</style>