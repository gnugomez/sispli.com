import Lenis from '@studio-freight/lenis'
import { defaultWindow } from '@vueuse/core'

type LenisOptions = Parameters<Lenis['scrollTo']>[1]

export function useEnhancedScroll() {
  const scroll = useScroll(defaultWindow)
  const { y } = scroll

  // Create a new instance of Lenis
  let lenis: Lenis

  if (defaultWindow) {
    lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      defaultWindow?.requestAnimationFrame(raf)
    }
    defaultWindow.requestAnimationFrame(raf)
  }

  const whenYReaches = (target: number) => new Promise<void>((resolve) => {
    if (y.value === target) {
      resolve()
      return
    }
    const unsuscribe = watch(y, () => {
      if (y.value === target) {
        unsuscribe()
        resolve()
      }
    })
  })

  return {
    ...scroll,
    scrollTo: async (target: number, options: LenisOptions): Promise<void> => {
      lenis.scrollTo(target, options)
      await whenYReaches(target)
    },
  }
}
