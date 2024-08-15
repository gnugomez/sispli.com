<script setup lang="ts">
import { defaultWindow } from '@vueuse/core'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

interface Folder {
  title: string
  route: string
}

const folders = ref<Folder[]>([
  { title: 'the artist', route: 'theartist' },
  { title: 'the art', route: 'theart' },
  { title: 'test', route: 'test' },
])

const router = useRouter()
const { height: windowHeight } = useWindowSize()
const { scrollTo } = useEnhancedScroll()
const { y } = useScroll(defaultWindow)

const activeFolder = ref<Folder>()
const folderRefs = ref<HTMLElement[]>([])
const scrollableSpace = ref(0)

const activeFolderRef = computed(() => activeFolder.value && folderRefs.value[folders.value.indexOf(activeFolder.value)])
const folderHeight = computed(() => folderRefs.value[0]?.clientHeight || 0)
const windowMinusFolders = computed(() => windowHeight.value - folderHeight.value * folders.value.length)

router.beforeEach(async (_to, _from, next) => scrollTo(0, { lock: true }).then(next))

router.afterEach((to) => {
  const folder = getActiveFolderByRoute(to)
  if (folder)
    doOpenFolder(folder)
})

function getActiveContentHeight() {
  return activeFolderRef.value?.querySelector('.content')?.clientHeight || 0
}

function resetScrollableHeight(height = getActiveContentHeight()) {
  scrollableSpace.value = height
}

function doOpenFolder(folder: Folder, options: { immediate?: boolean } = {}) {
  const { immediate = false } = options
  activeFolder.value = folder
  nextTick(() => {
    resetScrollableHeight()
    setTimeout(() =>
      scrollTo(windowMinusFolders.value, { lock: true, immediate }), 300)
  })
}

function getActiveFolderByRoute(route: RouteLocationNormalizedLoaded): Folder | undefined {
  return folders.value.find(f => f.route === route.name)
}

onMounted(() => {
  const activeFolder = getActiveFolderByRoute(useRoute())
  if (activeFolder)
    doOpenFolder(activeFolder)
})

async function closeAllFolders() {
  await scrollTo(0, { lock: true })
  activeFolder.value = undefined
  resetScrollableHeight(0)
  router.push({ name: 'index' })
}

function toggleFolder(folder: Folder) {
  if (activeFolder.value === folder) {
    closeAllFolders()
    return
  }
  router.push({ name: folder.route })
}

function isActiveOrHasActiveFoldersBelow(folder: Folder) {
  if (!activeFolder.value)
    return false
  const curentIndex = folders.value.indexOf(folder)
  return folders.value.includes(activeFolder.value, curentIndex)
}
</script>

<template>
  <div class="layout-wrapper">
    <div class="page-content">
      <Home />
    </div>
    <ClientOnly>
      <div :style="{ height: `${scrollableSpace + windowHeight}px` }" />
    </ClientOnly>
    <div class="folder-wrapper">
      <div
        v-for="(folder, index) in folders"
        :key="index"
        ref="folderRefs"
        class="sizer"
        :class="{
          'is-active': folder === activeFolder,
          [`sizer-${folders.length - index - 1}`]: true,
        }"
        :style="isActiveOrHasActiveFoldersBelow(folder) && { transform: `translateY(-${y}px)` } "
      >
        <div class="folder">
          <div class="header" @click="toggleFolder(folder)">
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

  .page-content {
    @apply fixed inset-0 overflow-hidden;
  }

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
