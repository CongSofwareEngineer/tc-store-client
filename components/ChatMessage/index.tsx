import React, { useEffect, useLayoutEffect, useRef } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
type ChatMessageProps = {
  children?: React.ReactNode
  className?: string
  loadMore?: () => any
  isLoadMore?: boolean
  isReverse?: boolean
  loading?: boolean
  dependence?: any
}
const ChatMessage = ({
  children = null,
  isLoadMore = false,
  loading = false,
  loadMore = () => {},
  className = '',
  isReverse = true,
  dependence = null,
}: ChatMessageProps) => {
  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading: loading,
    hasNextPage: isLoadMore,
    onLoadMore: loadMore,
  })

  const scrollableRootRef = useRef<React.ComponentRef<'div'> | null>(null)
  const lastScrollDistanceToBottomRef = useRef<number>(0)

  useEffect(() => {
    const scrollableRoot = scrollableRootRef.current

    const lastScrollDistanceToBottom = lastScrollDistanceToBottomRef.current ?? 0

    if (scrollableRoot && isReverse) {
      console.log({
        isReverse,
        lastScrollDistanceToBottom,
        scrollableRoot: scrollableRoot.scrollHeight,
      })

      scrollableRoot.scrollTop = scrollableRoot.scrollHeight - lastScrollDistanceToBottom
    }
  }, [children, isReverse, rootRef, dependence])

  const rootRefSetter = (node: HTMLDivElement) => {
    rootRef(node)
    scrollableRootRef.current = node
  }

  const handleRootScroll = () => {
    const rootNode = scrollableRootRef.current
    if (rootNode) {
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom
    }
  }

  return (
    <div
      ref={rootRefSetter}
      onScroll={handleRootScroll}
      className={`flex flex-col flex-1 min-h-full h-full max-h-full overflow-y-auto ${className}`}
    >
      {isLoadMore && (
        <div ref={infiniteRef} className='flex w-full '>
          Loading....
        </div>
      )}
      {children}
    </div>
  )
}

export default ChatMessage
