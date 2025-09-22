<script setup lang="ts">
/*
        const contentUniqeId = useId();
        <content-item
          :wrap-text="false"
          :content="sanitize2"
          :content-id="contentUniqeId"
          :open-post-view="false"
          :show-copy-text="false"
          :show-more="false"
          :showBackground="false"
        >
        </content-item>
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { escapeHtml, isEmpty, openUrlInNewTab, roundDecimal } from '@/utils/appUtil'
const {
  contentId = 'content-id',
  wrapText = true,
  openPage = true,
  showCopyText = true,
  showMore = true,
  showBackground = false,
  canUrlify = true,
  limit = 4,
  fitContent = false,
  linkStyle = 'app-text-link',
  textStyle = 'q-text-black',
  to,
  isEscapeHtml = false,
  hashtagUrlify = false
} = defineProps<{
  contentId?: string
  content?: string
  wrapText?: boolean
  to?: string
  openPage?: boolean
  showCopyText?: boolean
  showMore?: boolean
  showBackground?: boolean
  canUrlify?: boolean
  hashtagUrlify?: boolean
  limit?: number
  fitContent?: boolean
  linkStyle?: string
  textStyle?: string
  isEscapeHtml?: boolean
  highLightText?: string
}>()

const { appNavigateTo } = useBase()
const { t } = useLang()
const lineHeight = ref(0)
const showMoreBtn = ref(false)
const showMoreText = ref(false)
const contentTimeOut = ref()
const canShow = ref(false)
onMounted(() => {
  setLimitText()
})
const setLimitText = () => {
  contentTimeOut.value = setTimeout(() => {
    setDescHeight()
    if (canUrlify) {
      setEvenListener()
    }
    // const el = document.getElementById(contentId.value);
    // if (el) {
    //   el.addEventListener('click', onHtmlClick);
    // }
    canShow.value = true
  }, 50)
}
const setEvenListener = () => {
  const links = document.querySelectorAll(`.content-href-${contentId}`)
  links.forEach(l => {
    l.addEventListener('click', onHtmlClick)
  })
  if (hashtagUrlify) {
    const hashtags = document.querySelectorAll(`.hashtag-href-${contentId}`)
    hashtags.forEach(h => {
      h.addEventListener('click', onHashtagClick)
    })
  }
}
const removeEvenListener = () => {
  const links = document.querySelectorAll(`.content-href-${contentId}`)
  links.forEach(l => {
    l.removeEventListener('click', onHtmlClick)
  })
  const tagsLinks = document.querySelectorAll(`.hashtag-href-${contentId}`)
  tagsLinks.forEach(l => {
    l.removeEventListener('click', onHashtagClick)
  })
}
onBeforeUnmount(() => {
  if (contentTimeOut.value) {
    clearTimeout(contentTimeOut.value)
    contentTimeOut.value = null
  }
  removeEvenListener()
  showMoreText.value = false
})
const onHtmlClick = (event: any) => {
  if (!event.target.classList.contains(`content-href-${contentId}`)) return
  if (event.srcElement && event.srcElement.href) {
    const link = event.srcElement.href
    openUrlInNewTab(link, event)
  }
  event.stopPropagation()
  event.preventDefault()
}
const onHashtagClick = (event: any) => {
  if (!event.target.classList.contains(`hashtag-href-${contentId}`)) return
  if (event.srcElement && event.srcElement.innerText) {
    const hashtag = event.srcElement.innerText
    if (hashtag) {
      appNavigateTo(`/hashtag/${hashtag.replace('#', '')}`)
    }
  }

  event.stopPropagation()
  event.preventDefault()
}
const setDescHeight = () => {
  if (wrapText) {
    const el = document.getElementById(contentId)
    if (el) {
      const divHeight = el.offsetHeight
      const lh = divHeight / 20
      lineHeight.value = roundDecimal(lh, 0)
      if (lineHeight.value > limit) {
        showMoreBtn.value = true
      }
    }
  }
}
const urlify = (rawText: string, linkColor: string | undefined = undefined) => {
  const inputText = isEscapeHtml ? escapeHtml(rawText) : rawText
  if (canUrlify) {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const textLink = inputText.replace(urlRegex, url => {
      return `<a class="content-href-${contentId} ${linkStyle} ${
        linkColor ? linkColor : ''
      }" href="${url}">${url}</a>`
    })
    /*
    en only /#(\w+)/g
    /#([\p{L}\p{N}]+)/gu
     */
    if (!hashtagUrlify) {
      return textLink
    }

    return textLink.replace(
      /#([a-zA-Z\p{L}\p{N}_\u0E00-\u0E7F]+)/gu,
      `<a class="hashtag-href-${contentId} ${linkStyle} ${linkColor ? linkColor : ''}">#$1</a>`
    )
  }
  return inputText
}
const onOpenPage = (event: any) => {
  if (to) {
    appNavigateTo(to)
  }

  event.stopImmediatePropagation()
}
const onShowMoreText = async () => {
  showMoreText.value = true
  // if (!postId) {
  //   return;
  // }
  // await updateReadCount(postId);
}
</script>
<template>
  <div
    v-if="content"
    style="overflow: hidden"
    :class="{
      'text-holder-fitcontent': !isEmpty(content) && fitContent
    }"
  >
    <slot name="top" />
    <div
      :id="contentId"
      v-ripple
      :class="{
        'word-limit': showMoreBtn && !showMoreText,
        'cursor-pointer': to
      }"
      class="app-auto-newline dont-break-out text-holder"
    >
      <BaseContentHtml
        :content="urlify(content, 'text-primary')"
        :high-light-text="highLightText"
        @on-press="onOpenPage($event)"
      />
    </div>
    <template v-if="showMore && showMoreBtn && !showMoreText"> 
      <BaseButton dense flat :label="t('base.seeMore')" @click="onShowMoreText"/>  
    </template>
    <!-- <BaseLink
      v-if="showMoreBtn && !showMoreText"
      :label="t('base.seeMore')"
      color="primary"
      @click="onShowMoreText"
    /> -->
    <slot name="bottom" />
  </div>
</template>
<style scoped lang="scss">
.word-limit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: v-bind(limit);
  line-clamp: v-bind(limit);
  -webkit-box-orient: vertical;
}

.text-holder-fitcontent {
  width: fit-content;
  background-color: var(--color-zinc-100);
  padding: 10px;
  border-radius: 8px;
  margin-top: 5px;
}

body.body--dark {
  .text-holder-fitcontent {
    background-color: var(--color-dark-900);
    color: #fafafa;
  }
}
</style>
