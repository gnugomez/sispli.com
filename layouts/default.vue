<script setup lang="ts">
import { defaultWindow } from '@vueuse/core'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

interface Folder {
  title: string
  route: string
  colors: {
    background: string
    border: string
    shadow: string
  }
}

const folders = ref<Folder[]>([
  {
    title: 'the artist',
    route: 'theartist',
    colors: {
      background: '#FFF2E6',
      border: '#f1dbc6',
      shadow: '#e4cbb4b8',
    },
  },
  {
    title: 'the art',
    route: 'theart',
    colors: {
      background: '#FFEBEE',
      border: '#ffdde1',
      shadow: '#FFEBEEb8',
    },
  },
  {
    title: 'contact',
    route: 'contact',
    colors: {
      background: '#EBF8FF',
      border: '#d5eefd',
      shadow: '#EBF8FFb8',
    },
  },
])

function getFolderColorVariables(folder: Folder): Record<string, string> {
  return Object.entries(folder.colors)
    .reduce<Record<string, string>>((acc, [key, value]) => {
      acc[`--folder-color-${key}`] = value
      return acc
    }, {})
}

const router = useRouter()
const { height: windowHeight } = useWindowSize()
const { scrollTo } = useEnhancedScroll()
const { y } = useScroll(defaultWindow)

const activeFolder = ref<Folder>()
const folderRefs = ref<HTMLElement[]>([])
const scrollableSpace = ref(0)
const headerHeight = 140

const activeFolderRef = computed(() => activeFolder.value && folderRefs.value[folders.value.indexOf(activeFolder.value)])
const folderHeight = computed(() => folderRefs.value[0]?.clientHeight || 0)
const windowMinusFolders = computed(() => windowHeight.value - folderHeight.value * folders.value.length - headerHeight)

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
        v-for="(folder, index) in folders" :key="index" ref="folderRefs" class="sizer" :class="{
          'is-active': folder === activeFolder,
          [`sizer-${folders.length - index - 1}`]: true,
        }" :style="isActiveOrHasActiveFoldersBelow(folder) && { transform: `translateY(-${y}px)` }"
      >
        <div class="folder" :style="getFolderColorVariables(folder)">
          <div class="folder-shadow-wrapper">
            <div class="header" @click="toggleFolder(folder)">
              <div class="left">
                <h1 class="title">
                  {{ folder.title }}
                </h1>
              </div>
              <FolderIndent class="indent" />
              <div class="right" />
            </div>
            <div class="content">
              <slot />
            </div>
            <div class="separator" />
          </div>
        </div>
      </div>
    </div>
    <Header />
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
      @apply w-full h-[75px] fixed bottom-0;

      @for $i from 1 through $maxNumberOfFolders {
        &-#{$i} {
          bottom: 75px * $i;
        }
      }
    }

    .folder {
      @apply w-full min-h-dvh relative;
      /* filter: drop-shadow(1px 0px 0px var(--folder-color-border)) drop-shadow(-1px 0px 0px var(--folder-color-border)) drop-shadow(0px 1px 0px var(--folder-color-border)) drop-shadow(0px -1px 0px var(--folder-color-border)); */

      .content {
        @apply bg-[var(--folder-color-background)] min-h-[75px];
      }

      .separator {
        @apply w-full h-[75px] bg-[var(--folder-color-background)];
      }

      .header {
        @apply flex flex-row justify-between relative;

        .indent {
          @apply text-[var(--folder-color-background)] justify-self-center md:block hidden;
        }

        .left {
          @apply h-[75px] flex items-center px-8;
        }

        .left,
        .right {
          @apply flex-1 bg-[var(--folder-color-background)];
        }
      }

      .title {
        @apply font-medium font-inconsolata text-xl text-primary;
      }
    }
  }
}
</style>
