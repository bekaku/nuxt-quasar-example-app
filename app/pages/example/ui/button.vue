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
} from '@quasar/extras/bootstrap-icons';
import { ref } from 'vue';
const progress = ref(false);
useHead({
    title: 'Button'
})
</script>
<template>
    <BasePage>
        <BaseCard>
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Button </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>



                <BaseRippleItem style="width: 150px;padding: 10px;">
                    This is Ripple Item
                </BaseRippleItem>

                <div class="q-pa-md q-gutter-sm">
                    
                    <BaseButton round flat :icon="biWrench"/>
                    <BaseButton label="Standard" />
                    <BaseButton label="Elevated" :unelevated="false" />
                    <BaseButton color="white" text-color="black" label="Standard color" />
                    <BaseButton color="deep-purple" label="Standard" />
                    <BaseButton label="Primary" color="primary" />
                    <BaseButton label="Unelevated" color="primary" />
                    <BaseButton label="Outline" outline />
                    <BaseButton label="Outline icon" outline :icon="biChatLeft" :icon-right="biRadar"/>
                    <BaseButton label="Outline color" outline outline-color="teal" />
                    <BaseButton color="secondary" label="Secondary" />
                    <BaseButton color="amber" glossy label="Amber" />
                    <BaseButton color="brown-5" label="Brown 5" />
                    <BaseButton color="black" label="Black" />
                    <BaseButton label="Flat" flat color="primary" />
                    <BaseButton label="Icon Left" color="negative" :icon="biGear" />
                    <BaseButton label="Icon Right" color="warning" :icon-right="biNewspaper" />
                    <BaseButton label="Icon Both" :unelevated="false" :icon="biPerson" :icon-right="biQuestionCircle" />
                    <BaseButton :icon="biPhone" label="Stacked" stack color="purple" />

                    <BaseButton round color="primary" :icon="biShop" />
                    <BaseButton push color="primary" label="Push Btn" />
                    <BaseButton color="amber" square label="Square" />
                    <BaseButton flat rounded color="primary" label="Flat Rounded" />
                    <BaseButton rounded color="teal" label="Rounded" />
                    <BaseButton round>
                        <q-avatar size="42px">
                            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                        </q-avatar>
                    </BaseButton>
                    <BaseButton no-caps :unelevated="false">
                        Multiline<br>Button
                    </BaseButton>
                    <BaseButton style="width: 200px" :unelevated="false">
                        <div class="ellipsis">
                            This is some very long text that is expected to be truncated
                        </div>
                    </BaseButton>


                    <BaseButton align="left" class="btn-fixed-width" color="primary" label="Align to left" />
                    <BaseButton align="right" class="btn-fixed-width" color="secondary" label="Align to right" />
                    <BaseButton align="between" class="btn-fixed-width" color="accent" label="Align between"
                        :icon="biAirplane" />
                    <BaseButton align="around" class="btn-fixed-width" color="brown-5" label="Align around"
                        :icon="biLightbulb" />

                    <BaseButton label="Size xs" size="xs" :unelevated="false" />
                    <BaseButton label="Size sm" size="sm" :unelevated="false" />
                    <BaseButton label="Size md" size="md" :unelevated="false" />
                    <BaseButton label="Size lg" size="lg" :unelevated="false" />
                    <BaseButton label="Size xl" size="xl" :unelevated="false"/>
                    <BaseButton label="Size PX" size="50px" :unelevated="false"/>
                    <BaseButton label="Click for Loading" :loading="progress" :unelevated="false" @click="progress = true" />
                    <BaseButton label="Stop loading" color="negative" @click="progress = false" />

                    <BaseButton label="Full" full />
                </div>
            </q-card-section>
        </BaseCard>
    </BasePage>
</template>
<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>