<script setup lang="ts">
import { biArrowUpRight } from '@quasar/extras/bootstrap-icons';
useHead({
  title: 'Avatar'
})
const authenStore = useAuthenStore()
const items = ref<string[]>([
  'https://cdn.quasar.dev/img/avatar1.jpg',
  'https://cdn.quasar.dev/img/avatar2.jpg',
  'https://cdn.quasar.dev/img/avatar3.jpg',
  'https://cdn.quasar.dev/img/avatar4.jpg',
  'https://cdn.quasar.dev/img/avatar5.jpg',
  'https://cdn.quasar.dev/img/avatar6.jpg',
  'https://cdn.quasar.dev/img/avatar7.jpg',
  'https://cdn.quasar.dev/img/avatar8.jpg'
])
const getTooltipBy = (index: number) => {
  return items.value[index]
}
</script>
<template>
  <BasePage>
    <BaseCard title="Avatar">
      <q-card-section>
        <div class="row q-pa-md q-gutter-md">
          <LazyBaseSuspense>
            <LazyBaseAvatar
              v-if="authenStore.auth?.avatar?.image"
              :src="authenStore.auth?.avatar?.image"
              fetch-image
              size="120px"
            />
            <template #fallback> Loading... </template>
          </LazyBaseSuspense>
          <base-avatar src="https://cdn.quasar.dev/img/avatar2.jpg" size="120px" />
          <base-avatar rounded src="https://cdn.quasar.dev/img/avatar1.jpg" size="120px" />
          <base-avatar square src="https://cdn.quasar.dev/img/avatar3.jpg" size="120px" />
          <base-avatar
            src="https://cdn.quasar.dev/img/avatar6.jpg"
            bordered
            bordered-color="#23d160"
            bordered-width="4px"
            size="120px"
            class="shadow-10"
          />
          <base-avatar
            src="https://cdn.quasar.dev/img/avatar4.jpg"
            size="64px"
            :badge="{ color: 'primary', text: 'new' }"
          />
          <base-avatar
            src="https://cdn.quasar.dev/img/avatar5.jpg"
            bordered
            size="42px"
            :badge="{
              color: 'positive',
              rounded: true,
              transparent: true,
              cssClass: 'absolute-top-right',
              cssStyle: { top: '2px' },
            }"
          />
        </div>

        <div class="row q-gutter-x-xl">
          <base-avatar-group :items="items" :limit="5" size="42px" class="q-pl-lg">
            <template #extra="{ index }">
              <BaseTooltip>
                {{ getTooltipBy(index) }}
              </BaseTooltip>
            </template>
          </base-avatar-group>
          <base-avatar-group :items="items" :limit="5" size="42px" boder-color="#00a0dc" />
        </div>
      </q-card-section>
    </BaseCard>

    <div class="row">
      <div class="col-12 col-md-6">
        <BaseCard title="User list">
          <UserItem
            name="John Doe"
            description="Software engineer"
            :avatar="{
              src: 'https://cdn.quasar.dev/img/avatar1.jpg',
              badge: { color: 'positive', rounded: true },
            }"
          />
          <UserItem
            name="John Doe"
            description="Clickable"
            clickable
            :avatar="{
              src: 'https://cdn.quasar.dev/img/avatar2.jpg',
              badge: { color: 'negative', rounded: true },
            }"
          >
            <template #end>
              <BaseButton flat :icon="biArrowUpRight" label="Slot end" light />
            </template>
          </UserItem>
        </BaseCard>
      </div>
    </div>
  </BasePage>
</template>
