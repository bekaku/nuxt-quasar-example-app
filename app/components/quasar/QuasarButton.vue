  <script setup lang="ts">
  const {
    outline = false,
    noCaps = true,
    unelevated = false,
    glossy = false,
    flat = false,
    stack = false,
    round = false,
    push = false,
    rounded = false,
    loading = false,
    disable = false,
    dense = false,
  } = defineProps<{
    align?: 'left' | 'right' | 'center' | 'around' | 'between' | 'evenly';
    color?: string;
    count?: number;
    disable?: boolean;
    flat?: boolean;
    glossy?: boolean;
    icon?: string;
    iconRight?: string;
    label?: string;
    loading?: boolean;
    noCaps?: boolean;
    outline?: boolean;
    push?: boolean;
    round?: boolean;
    rounded?: boolean;
    size?: string;
    square?: boolean;
    stack?: boolean;
    textColor?: string;
    to?: string;
    unelevated?: boolean;
    dense?: boolean;
  }>();
</script>
  <template>
    <q-btn
v-bind="$attrs" :outline :label :color :text-color="textColor" :no-caps="noCaps" :unelevated :glossy :flat
      :icon :icon-right="iconRight" :stack :round :square :push :rounded :align :size :loading :to :disable :dense>
      <slot/>
    </q-btn>
  </template>