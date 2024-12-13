<script setup lang="ts">
import {
    biAirplane,
    biGear,
    biLightbulb,
    biNewspaper,
    biPerson,
    biPhone,
    biQuestionCircle,
    biShop
} from '@quasar/extras/bootstrap-icons';
import { ref } from 'vue';
const { t } = useLang();
const progress = ref(false);
useHead({
    title: 'Button'
})
</script>
<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Button </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>

                <base-ripple-item style="width: 150px;padding: 10px;">
                    This is Ripple Item 
                </base-ripple-item>

                <div class="q-pa-md q-gutter-sm">
                    <QuasarButton label="Primary" color="primary"/>
                    <QuasarButton label="Unelevated" unelevated color="primary"/>
                    <QuasarButton label="Outline" outline/>
                    <QuasarButton color="white" :unelevated="false" text-color="black" label="Standard"/>
                    <QuasarButton color="secondary" label="Secondary"/>
                    <QuasarButton color="amber" glossy label="Amber"/>
                    <QuasarButton color="brown-5" label="Brown 5"/>
                    <QuasarButton color="black" label="Black"/>
                    <QuasarButton label="Flat" flat/>
                    <QuasarButton label="Icon Left" color="negative" :icon="biGear"/>
                    <QuasarButton label="Icon Right" color="warning" :icon-right="biNewspaper"/>
                    <QuasarButton label="Icon Both" :icon="biPerson" :icon-right="biQuestionCircle"/>
                    <QuasarButton :icon="biPhone" label="Stacked" stack color="purple" />

                    <QuasarButton round color="primary" :icon="biShop" />
                    <QuasarButton push color="primary" label="Push Btn" />
                    <QuasarButton color="amber" square label="Square"/>
                    <QuasarButton flat rounded color="primary" label="Flat Rounded" />
                    <QuasarButton rounded color="teal" label="Rounded" />
                    <QuasarButton round>
                        <q-avatar size="42px">
                            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                        </q-avatar>
                    </QuasarButton>
                    <QuasarButton no-caps>
                        Multiline<br>Button
                    </QuasarButton>
                    <QuasarButton style="width: 200px">
                        <div class="ellipsis">
                            This is some very long text that is expected to be truncated
                        </div>
                    </QuasarButton>


                    <QuasarButton align="left" class="btn-fixed-width" color="primary" label="Align to left" />
                    <QuasarButton align="right" class="btn-fixed-width" color="secondary" label="Align to right" />
                    <QuasarButton
align="between" class="btn-fixed-width" color="accent" label="Align between"
                        :icon="biAirplane" />
                    <QuasarButton
align="around" class="btn-fixed-width" color="brown-5" label="Align around"
                        :icon="biLightbulb" />

                    <QuasarButton label="Size xs" size="xs"/>
                    <QuasarButton label="Size sm" size="sm"/>
                    <QuasarButton label="Size md" size="md"/>
                    <QuasarButton label="Size lg" size="lg"/>
                    <QuasarButton label="Size xl" size="xl"/>
                    <QuasarButton label="Size PX" size="50px"/>
                    <QuasarButton label="Click for Loading" :loading="progress" @click="progress = true"/>
                    <QuasarButton label="Stop loading" color="negative" @click="progress = false"/>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>
<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>