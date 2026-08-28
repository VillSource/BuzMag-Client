import { useEffect } from 'react'
import { 
  useSessionStorage, 
  useEventListener, 
  useDebounceCallback 
} from 'usehooks-ts'

export function useScrollRestoration(pageKey: string, isReady: boolean) {
  const [savedScroll, setSavedScroll] = useSessionStorage(`scroll-${pageKey}`, 0)

  const handleScroll = useDebounceCallback(() => {
    setSavedScroll(window.scrollY)
  }, 150)

  useEventListener('scroll', handleScroll)

  useEffect(() => {
    if (isReady && savedScroll > 0) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: savedScroll, behavior: 'instant' })
      }, 10)
      
      return () => clearTimeout(timer)
    }
  }, [isReady]) 
}