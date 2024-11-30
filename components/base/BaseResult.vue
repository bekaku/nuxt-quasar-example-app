<template>
    <div class="row items-center q-pa-md">
      <div class="col">
        <div class="column items-center">
          <div class="col text-center">
            <!-- <img v-if="status == 'empty'" src="/icons/empty-box.png" :style="`width: ${iconSize} ; height: auto`" /> -->
            <!-- <img v-else-if="status == 'error'" :style="`width: ${iconSize} ; height: auto`" src="/icons/sad-man.png" /> -->
            <!-- <img
              v-else-if="status == 'warning'"
              src="/icons/warning.png"
              :style="`width: ${iconSize} ; height: auto`"
            /> -->
            <q-avatar square v-if="status == '404'" style="width: 100%; height: auto">
              <img src="/icons/404.png" />
            </q-avatar>
            <q-avatar v-else-if="showIcon" :size="iconSize" :color="!hideBg ? getBgColor() : undefined"
              :icon="icon ? icon : getIcon()" :class="getIconColor()" />
          </div>
          <div class="col q-mt-md text-center">
            <slot name="text">
              <div v-if="title" class="text-h5 text-weight-bold q-mb-sm" :class="status == 'empty' ? 'text-grey-6' : ''"
                v-html="title"></div>
              <div v-if="description" class="text-muted text-subtitle1">
                {{ description }}
              </div>
  
            </slot>
          </div>
          <div class="col q-mt-sm">
            <slot name="extra"> </slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  /*
            <app-result
              text-color="text-muted"
              :description="t('commentNotFoundThisPost')"
              :show-icon="false"
            >
              <template #extra>
                <q-icon :icon="mdiAlert" :size="45" color="grey"></q-icon>
              </template>
            </app-result>
  const AppResult = defineAsyncComponent(
    () => import('@/components/base/AppResult.vue')
  );
  */
  import type{ IResult } from '~/types/common';
  import {
    mdiAlert,
    mdiAlertBoxOutline,
    mdiAllergy,
    mdiCheckBold,
    mdiInboxRemoveOutline,
    mdiInformationVariant,
    mdiPackageVariant,
    mdiPaperclip,
    mdiRobotConfused,
  } from '@quasar/extras/mdi-v6';
  import { useQuasar } from 'quasar';
  
  const props = withDefaults(
  defineProps<{
    status?: IResult;
    title?: string;
    description?: string;
    icon?: string;
    iconSize?: string;
    hideBg?: boolean;
    showIcon?: boolean;
  }>(),
  {
    status: 'info',
    iconSize: '120px',
    hideBg: false,
    showIcon: true,
  }
);
  const {dark}=useQuasar();
  const getIcon = (): string => {
    let icon: string | undefined = undefined;
  
    //404, 403, 500, 418, info, success, error, warning
    switch (props.status) {
      case '404':
        icon = mdiInboxRemoveOutline;
        break;
      case '403':
        icon = mdiAllergy;
        break;
      case '500':
        icon = mdiRobotConfused;
        break;
      case '418':
        icon = mdiPaperclip;
        break;
      case 'success':
        icon = mdiCheckBold;
        break;
      case 'warning':
        icon = mdiAlertBoxOutline;
        break;
      case 'error':
        icon = mdiAlert;
        break;
      case 'empty':
        icon = mdiPackageVariant;
        break;
      default:
        icon = mdiInformationVariant;
        break;
    }
  
    return icon;
  };
  const getIconColor = () => {
    let color = '';
    switch (props.status) {
      case '404':
      case '403':
      case '500':
      case '418':
        color = 'text-amber';
        break;
      case 'success':
        color = 'text-green';
        break;
      case 'warning':
        color = 'text-orange';
        break;
      case 'error':
        color = 'text-red';
        break;
      case 'empty':
        color = 'text-grey-5';
        break;
      default:
        color = 'text-blue';
        break;
    }
    return color;
  };
  const getBgColor = () => {
    let color = '';
    switch (props.status) {
      case '404':
      case '403':
      case '500':
      case '418':
        color = !dark.isActive ?  'amber-1' : 'amber-2';
        break;
      case 'success':
        color = !dark.isActive ?  'green-1' : 'green-2';
        break;
      case 'warning':
        color = !dark.isActive ?  'orange-1' : 'orange-2';
        break;
      case 'error':
        color = !dark.isActive ?  'red-1' : 'red-2';
        break;
      case 'empty':
        color = !dark.isActive ?  'grey-1' : 'grey-8';
        break;
      default:
        color = !dark.isActive ?  'blue-1' : 'blue-2';
        break;
    }
    return color;
  };
  </script>
  