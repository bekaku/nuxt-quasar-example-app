<script setup lang="ts">
import {
  biAirplane,
  biChatLeft,
  biGear,
  biLightbulb,
  biNewspaper,
  biPerson,
  biPhone,
  biQuestionCircle,
  biRadar,
  biShop,
  biWrench
} from '@quasar/extras/bootstrap-icons'
import { ref } from 'vue'
const progress = ref(false)
useHead({
  title: 'Button'
})
</script>
<template>
  <BasePage>
    <BaseCard title="Color">
      <q-card-section>
        <div class="q-pa-md q-gutter-sm">
          <BaseButton label="red" color="red" />
          <BaseButton label="pink" color="pink" />
          <BaseButton label="purple" color="purple" />
          <BaseButton label="deep-purple" color="deep-purple" />
          <BaseButton label="indigo" color="indigo" />
          <BaseButton label="blue" color="blue" />
          <BaseButton label="light-blue" color="light-blue" />
          <BaseButton label="cyan" color="cyan" />
          <BaseButton label="teal" color="teal" />
          <BaseButton label="green" color="green" />
          <BaseButton label="light-green" color="light-green" />
          <BaseButton label="lime" color="lime" />
          <BaseButton label="yellow" color="yellow" />
          <BaseButton label="amber" color="amber" />
          <BaseButton label="orange" color="orange" />
          <BaseButton label="brown" color="brown" />
          <BaseButton label="grey" color="grey" />
          <BaseButton label="blue-grey" color="blue-grey" />
          <BaseButton label="positive" color="positive" />
          <BaseButton label="negative" color="negative" />
          <BaseButton label="warning" color="warning" />
        </div>
      </q-card-section>
    </BaseCard>
    <BaseCard title="Button">
      <q-card-section>
        <BaseRippleItem style="width: 150px; padding: 10px"> This is Ripple Item </BaseRippleItem>

        <div class="q-pa-md q-gutter-sm">
          <BaseButton label="Light" light />
          <BaseButton>
            <BaseIcon name="lucide:accessibility" icon-set="nuxt" /> Custom nuxt icon
          </BaseButton>
          <BaseButton label="Dark" dark />
          <BaseButton round flat :icon="biWrench" />
          <BaseButton label="Standard" />
          <BaseButton label="Elevated" :unelevated="false" />
          <BaseButton color="white" text-color="black" label="Standard color" />
          <BaseButton color="deep-purple" label="Standard" />
          <BaseButton label="Primary" color="primary" />
          <BaseButton label="Unelevated" color="primary" />
          <BaseButton label="Outline" outline />
          <BaseButton label="Outline icon" outline :icon="biChatLeft" :icon-right="biRadar" />
          <BaseButton label="Outline color" outline outline-color="teal" />
          <BaseButton color="secondary" label="Secondary" />
          <BaseButton color="amber" glossy label="Amber" />
          <BaseButton color="brown-5" label="Brown 5" />
          <BaseButton color="black" label="Black" />
          <BaseButton label="Flat" flat color="primary" />
          <BaseButton label="Icon Left" color="negative" :icon="biGear" />
          <BaseButton label="Icon Right" color="warning" :icon-right="biNewspaper" />
          <BaseButton label="Icon Both" :icon="biPerson" :icon-right="biQuestionCircle" />
          <BaseButton :icon="biPhone" label="Stacked" stack color="purple" />

          <BaseButton round color="primary" :icon="biShop" />
          <BaseButton push color="primary" label="Push Btn" />
          <BaseButton color="amber" square label="Square" />
          <BaseButton flat rounded color="primary" label="Flat Rounded" />
          <BaseButton rounded color="teal" label="Rounded" />
          <BaseButton round>
            <q-avatar size="42px">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
            </q-avatar>
          </BaseButton>
          <BaseButton> Multiline<br />Button </BaseButton>
          <BaseButton style="width: 200px">
            <div class="ellipsis">This is some very long text that is expected to be truncated</div>
          </BaseButton>

          <BaseButton align="left" class="btn-fixed-width" color="primary" label="Align to left" />
          <BaseButton
            align="right"
            class="btn-fixed-width"
            color="secondary"
            label="Align to right"
          />
          <BaseButton
            align="between"
            class="btn-fixed-width"
            color="accent"
            label="Align between"
            :icon="biAirplane"
          />
          <BaseButton
            align="around"
            class="btn-fixed-width"
            color="brown-5"
            label="Align around"
            :icon="biLightbulb"
          />

          <BaseButton label="Size xs" size="xs" />
          <BaseButton label="Size sm" size="sm" />
          <BaseButton label="Size md" size="md" />
          <BaseButton label="Size lg" size="lg" />
          <BaseButton label="Size xl" size="xl" />
          <BaseButton label="Size PX" size="50px" />
          <BaseButton label="Click for Loading" :loading="progress" @click="progress = true" />
          <BaseButton label="Stop loading" color="negative" @click="progress = false" />

          <BaseButton label="Full" full />
        </div>
      </q-card-section>
    </BaseCard>

    <BaseCard title="RBAC" subtitle="Role based access control">
      <q-card-section>
        <div class="q-gutter-md">
          <BaseButton
            label="Single permission"
            :rbac="{
              permissions: ['user_manage']
            }"
          />
          <BaseButton
            label="Any of multiple permissions"
            :rbac="{
              permissions: ['user_manage_not_exist', 'file_manager_list'],
              condition: 'any'
            }"
          />
          <BaseButton
            label="All permissions required"
            :rbac="{
              permissions: ['user_list', 'user_view', 'user_delete'],
              condition: 'all'
            }"
          />
          <BaseButton
            label="Negation (not)"
            :rbac="{
              permissions: ['user_manage_not_exist'],
              condition: 'not'
            }"
          />
          <BaseButton
            label="This is Not eligible"
            :rbac="{
              permissions: ['user_manage_not_exist']
            }"
          />
        </div>
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
<style lang="scss" scoped>
.btn-fixed-width {
  width: 200px;
}
</style>
