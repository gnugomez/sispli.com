import Lenis from '@studio-freight/lenis'
import { defaultWindow } from '@vueuse/core'

type LenisOptions = NonNullable<Parameters<Lenis['scrollTo']>[1]>
type OnScrollOptions = Omit<LenisOptions, 'onComplete'>

export function useEnhancedScroll() {
  let lenis: Lenis | undefined

  if (defaultWindow) {
    lenis = new Lenis()
    function raf(time: number) {
      lenis?.raf(time)
      defaultWindow?.requestAnimationFrame(raf)
    }
    defaultWindow.requestAnimationFrame(raf)
  }

  return {
    scrollTo: async (target: number, options?: OnScrollOptions): Promise<void> => {
      return new Promise((resolve) => {
        lenis?.scrollTo(target, { ...options, onComplete: () => resolve() })
      })
    },
  }
}
