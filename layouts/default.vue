<!-- eslint-disable vue/html-self-closing -->
<script setup lang="ts">
import { defaultWindow } from '@vueuse/core'
import Lenis from '@studio-freight/lenis'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

let lenis: Lenis

if (defaultWindow) {
  lenis = new Lenis()
  function raf(time: number) {
    lenis.raf(time)
    defaultWindow?.requestAnimationFrame(raf)
  }
  defaultWindow.requestAnimationFrame(raf)
}

interface Folder {
  title: string
  isActive: boolean
  route: string
}

const folders = ref<Folder[]>([
  { title: 'the artist', isActive: false, route: 'theartist' },
  { title: 'the art', isActive: false, route: 'theart' },
  { title: 'test', isActive: false, route: 'test' },
])

const folderRefs = ref<HTMLElement[]>([])

const scrollableSpace = ref<HTMLElement>()

const router = useRouter()
const { height: windowHeight } = useWindowSize()
const folderHeight = computed(() => folderRefs.value[0]?.clientHeight || 0)
const windowMinusFolders = computed(() => windowHeight.value - folderHeight.value * folders.value.length)

const { y } = useScroll(defaultWindow)

function getPromiseWhenYReaches(target: number) {
  return new Promise<void>((resolve) => {
    const unsuscribe = watch(y, () => {
      if (y.value === target) {
        unsuscribe()
        resolve()
      }
    })
  })
}

router.beforeEach(async (to, from, next) => {
  lenis.scrollTo(0, { lock: true })
  if (y.value > 0)
    await getPromiseWhenYReaches(0)
  next()
})

router.afterEach((to) => {
  const activeFolder = getActiveFolderByRoute(to)
  activeFolder && requestFolderAnimation(activeFolder)
})

function requestFolderAnimation(activeFolder: Folder, options: { immediate?: boolean } = {}) {
  const { immediate = false } = options
  activeFolder.isActive = true
  closeOtherFolders(activeFolder)
  nextTick(() => {
    resetScrollableHeight()
  })
  setTimeout(() => {
    lenis.scrollTo(windowMinusFolders.value, { lock: true, immediate })
  }, 270)
}

onMounted(() => {
  const activeFolder = getActiveFolderByRoute(useRoute())
  activeFolder && requestFolderAnimation(activeFolder, { immediate: true })
})

function resetScrollableHeight(height = getTopFolderContentHeight()) {
  if (scrollableSpace.value)
    scrollableSpace.value.style.height = `${height + windowHeight.value}px`
}

function getTopFolderContentHeight() {
  return folderRefs.value[0]?.querySelector('.content')?.clientHeight || 0
}

function openFolder(folder: Folder) {
  router.push({ name: folder.route })
}

function closeOtherFolders(folder: Folder) {
  folders.value.forEach((f) => {
    if (f !== folder)
      f.isActive = false
  })
}

function isActiveOrHasActiveFoldersBelow(folder: Folder) {
  const index = folders.value.findIndex(f => f === folder)
  return folders.value.slice(index).some(f => f.isActive)
}

function getActiveFolderByRoute(route: RouteLocationNormalizedLoaded): Folder | undefined {
  return folders.value.find(f => f.route === route.name)
}
</script>

<template>
  <div class="layout-wrapper">
    <div ref="scrollableSpace" />
    <div class="folder-wrapper">
      <div
        v-for="(folder, index) in folders"
        :key="index"
        ref="folderRefs"
        class="sizer"
        :class="{
          'is-active': folder.isActive,
          [`sizer-${folders.length - index - 1}`]: true,
        }"
        :style="isActiveOrHasActiveFoldersBelow(folder) && { transform: `translateY(-${y}px)` } "
      >
        <div class="folder">
          <div class="header" @click="openFolder(folder)">
            <h1 class="title">
              {{ folder.title }}
            </h1>
          </div>
          <div class="content">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$maxNumberOfFolders: 10;

.layout-wrapper {
  @apply flex min-h-0 inset-0;
  @apply transition-all duration-700 ease-in-out;

  .folder-wrapper {
    @apply flex-1 fixed inset-x-0;

    .sizer {
      @apply w-full h-16 fixed bottom-0;

      @for $i from 1 through $maxNumberOfFolders {
        &-#{$i} {
          bottom: 4rem * $i;
        }
      }
    }
    .folder {
      @apply w-full min-h-dvh bg-white relative;
      box-shadow: 10px 1px 20px 1px rgb(0 0 0 / 13%);

      .header {
        @apply h-16 flex items-center px-6;
      }
      .title {
        @apply font-medium;
      }
    }
  }
}
</style>
