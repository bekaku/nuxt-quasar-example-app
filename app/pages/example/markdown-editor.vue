<script setup lang="ts">
import { biPencil, biEye, biQuestion } from '@quasar/extras/bootstrap-icons';
// import md from 'src/assets/data.md';
const { t } = useLang();
useHead({
    title: 'Markdown'
})
const contentId = useId();
const contentPreviewId = useId();

const content = ref<string>(`
## 😲 md-editor-v3

Markdown Editor for Vue3, developed in jsx and typescript, support different themes、beautify content by prettier.

### 🤖 Base

**bold**, <u>underline</u>, _italic_, ~~line-through~~, superscript^26^, subscript~1~, \`inline code\`, [link](https://github.com/imzbf)
> quote: I Have a Dream

1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.

- [ ] Friday
- [ ] Saturday
- [x] Sunday
![Picture](https://imzbf.github.io/md-editor-rt/imgs/mark_emoji.gif)

## 🤗 Code
\`\`\`vue
<template>
  <MdEditor v-model="text" />
</template>
<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
<\/script>
\`\`\`

## 🖨 Text

The Old Man and the Sea served to reinvigorate Hemingway's literary reputation and prompted a reexamination of his entire body of work.

## 📈 Table
| THead1          |      THead2       |           THead3 |
| :-------------- | :---------------: | ---------------: |
| text-align:left | text-align:center | text-align:right |

## 📏 Formula

Inline: $x+y^{2x}$

$$
\sqrt[3]{x}
$$

## 🧬 Diagram

\`\`\`mermaid
flowchart TD
  Start --> Stop
\`\`\`

## 🪄 Alert

!!! note Supported Types

note、abstract、info、tip、success、question、warning、failure、danger、bug、example、quote、hint、caution、error、attention

!!!

## ☘️ em...
`);
</script>
<template>
    <BasePage class="content-limit">
        <!-- <BaseCard flat :bordered="false" class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Markdown </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section class="q-gutter-y-lg"> -->
        <BaseTextHeader label="Markdown" />
        <BaseCard flat class="q-my-lg q-pa-md">
            <div class="text-h5 q-mb-md">
                <q-icon :name="biPencil" /> Editor
                <q-btn flat :icon="biQuestion" class="text-capitalize text-muted" dense
                    :label="`(${t('base.canUseMarkdown')})`">
                    <q-tooltip>
                        {{ t('base.canUseMarkdownHelp') }}
                    </q-tooltip>
                    <q-menu style="width: 450px">
                        <base-markdown-help />
                    </q-menu>
                </q-btn>
            </div>
            <base-markdown-editor v-model="content" :editor-id="contentId" />
        </BaseCard>

        <BaseCard flat class="q-my-lg q-pa-md">
            <div class="text-h5 q-mb-md">
                <q-icon :name="biEye" /> Preview
            </div>
            <base-markdown-preview :content="content" :editor-id="contentPreviewId" />
        </BaseCard>
        <!-- </q-card-section>
        </BaseCard> -->
    </BasePage>
</template>