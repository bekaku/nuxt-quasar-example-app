<script setup lang="ts">
import { biPencil, biTrash } from '@quasar/extras/bootstrap-icons'
const { t } = useLang()

useHead({
  title: 'Dialog'
})
const { appConfirm } = useBase()

const dialog = ref<boolean>(false)
const dialog2 = ref<boolean>(false)

const dialogSmall = ref<boolean>(false)
const dialogMedium = ref<boolean>(false)
const dialogFullWidth = ref<boolean>(false)
const dialogFullHeight = ref<boolean>(false)
const dialogFullWidthHeight = ref<boolean>(false)
const dialogMaximize = ref<boolean>(false)
const dialogConfirmToClose = ref<boolean>(false)
const text = ref()

const onPopConfirmChange = (status: boolean) => {
  console.log('onPopConfirmChange', status)
}

const onConfirmToClose = async () => {
  const conf = await appConfirm(t('app.monogram'), 'Are you sure to close this dialog?')
  if (conf) {
    dialogConfirmToClose.value = false
  }
}
</script>
<template>
  <BasePage>
    <BaseCard>
      <q-card-section class="q-gutter-md">
        <BaseTextHeader title="Dialog" />

        <BaseButton outline label="Dialog" @click="dialog = true" />
        <BaseButton outline label="Dialog persistent" @click="dialog2 = true" />
        <BaseButton outline label="Dialog Confirm to close" @click="dialogConfirmToClose = true" />

        <BaseTextHeader title="Dialog Size" />
        <BaseButton outline label="Small" @click="dialogSmall = true" />
        <BaseButton outline label="Medium" @click="dialogMedium = true" />
        <BaseButton outline label="Full Width" @click="dialogFullWidth = true" />
        <BaseButton outline label="Full Height" @click="dialogFullHeight = true" />
        <BaseButton outline label="Full Width and Height" @click="dialogFullWidthHeight = true" />
        <BaseButton outline label="Maximize" @click="dialogMaximize = true" />
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <BaseTextHeader title="Popover confirm" />
        <button v-rbac="{ permissions: ['user_managsse'] }">Test RBAC</button>
        <BaseButton
          v-rbac="{ permissions: ['user_manage'] }"
          label="Delete item"
          color="negative"
          :icon="biTrash"
        >
          <BasePopConfirm
            :title="t('base.deleteConfirm')"
            confirm-color="negative"
            @on-change="onPopConfirmChange"
          />
        </BaseButton>

        <BaseButton label="Custom label">
          <base-pop-confirm
            title="Custom label"
            confirm-color="teal"
            label-confirm="Custom confirm"
            cancel-color="grey"
            label-cancel="Blaa"
            @on-change="onPopConfirmChange"
          />
        </BaseButton>
        <BaseButton label="More custom">
          <base-pop-confirm title="Addon label" width="350px" @on-change="onPopConfirmChange">
            <q-input v-model="text" outlined label="This input overide title prop" />
            <template #bottom> bottom slot </template>
          </base-pop-confirm>
        </BaseButton>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <BaseTextHeader title="Popover" />
        <BaseButton label="Show popover">
          <BasePopover width="250px">
            <q-banner>
              <template #avatar>
                <q-icon :name="biPencil" color="primary" />
              </template>
              You have lost connection to the internet. This app is offline.
            </q-banner>
          </BasePopover>
        </BaseButton>
        <BaseButton label="Handles right-click" color="red-4">
          <BasePopover width="450px" context-menu>
            <q-banner>
              <template #avatar>
                <q-icon :name="biPencil" color="primary" />
              </template>
              You have lost connection to the internet. This app is offline.
            </q-banner>
          </BasePopover>
        </BaseButton>
      </q-card-section>
    </BaseCard>

    <base-dialog
      v-if="dialog"
      v-model="dialog"
      title="Dialog title"
      :icon="{ name: 'lucide:pencil', iconSet: 'nuxt' }"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>

    <base-dialog v-if="dialog2" v-model="dialog2" title="Dialog persistent" :persistent="true">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
      <q-card-actions align="right">
        <BaseButton flat label="Cancel" color="primary" @click="dialog2 = false" />
        <BaseButton flat label="Turn on Wifi" color="negative" @click="dialog2 = false" />
      </q-card-actions>
    </base-dialog>

    <base-dialog
      v-if="dialogSmall"
      v-model="dialogSmall"
      title="Dialog Small"
      :dialog-style="{
        width: '300px'
      }"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>
    <base-dialog
      v-if="dialogMedium"
      v-model="dialogMedium"
      title="Dialog Medium"
      :dialog-style="{
        width: '700px',
        maxWidth: '80vw'
      }"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>
    <base-dialog
      v-if="dialogFullWidth"
      v-model="dialogFullWidth"
      title="Dialog fullWidth"
      full-width
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>
    <base-dialog
      v-if="dialogFullHeight"
      v-model="dialogFullHeight"
      title="Dialog fullHeight"
      full-height
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>
    <base-dialog
      v-if="dialogFullWidthHeight"
      v-model="dialogFullWidthHeight"
      title="Dialog Full Width Height"
      full-height
      full-width
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>
    <base-dialog
      v-if="dialogMaximize"
      v-model="dialogMaximize"
      title="Dialog Maximize"
      maximized
      can-maximized
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>

    <base-dialog
      v-if="dialogConfirmToClose"
      v-model="dialogConfirmToClose"
      title="Confirm to close title"
      :icon="{ name: 'lucide:pencil-line' }"
      :auto-close="false"
      persistent
      @on-close="onConfirmToClose"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>
  </BasePage>
</template>
