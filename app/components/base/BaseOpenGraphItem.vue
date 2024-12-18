  <script setup lang="ts">
  import { biBoxArrowUpRight } from '@quasar/extras/bootstrap-icons';
import type { OgMeta } from '~/types/common';

  withDefaults(
    defineProps<{
      item: OgMeta;
      short?: boolean;
      showBg?: boolean;
      textLines?: number;
      descriptionLines?: number;
      imageSize?: string;
      imageMaxHeight?: string;
    }>(),
    {
      short: false,
      showBg: true,
      textLines: 1,
      descriptionLines: 2,
      imageSize: '125px',
      imageMaxHeight: '250px'
    }
  );
  const { isDark } = useTheme();
</script>
  <template>
    <q-card v-if="item && (item.image || item.domain || item.title || item.desc)" v-bind="$attrs" flat>
      <a v-if="!short" :href="item.url" target="_blank">
        <q-img v-if="item.image" spinner-color="white" :src="item.image" :ratio="16 / 9"
          :style="{ maxHeight: imageMaxHeight }" />
      </a>
      <q-item clickable
        :class="{ 'bg-grey-2': showBg && !isDark, 'app-main-bg-color-theme-dark': showBg && isDark, 'q-pl-none q-pt-none q-pb-none': short }"
        :href="item.url" target="_blank" :dense="short">
        <q-item-section v-if="short && item.image" side>
          <q-img :src="item.image" :style="{ width: `${imageSize}` }" :ratio="4 / 3" />
        </q-item-section>
        <q-item-section>
          <q-item-label v-if="item.domain" :lines="textLines">
            {{ item.domain }}
          </q-item-label>
          <q-item-label v-if="item.title" :lines="textLines">
            {{ item.title }}
          </q-item-label>
          <q-item-label v-if="item.desc" caption :lines="!short ? descriptionLines : 1">
            {{ item.desc }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon :name="biBoxArrowUpRight" />
        </q-item-section>
      </q-item>
    </q-card>
  </template>