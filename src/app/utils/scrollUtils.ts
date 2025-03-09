// src/utils/scrollUtils.ts

/**
 * Calculates the dimensions needed for smooth scrolling animation
 * @param scrollElement The scrolling DOM element
 * @returns Object containing content width, container width, and optimal animation duration
 */
export const calculateScrollDimensions = (
  scrollElement: HTMLElement | null
): {
  contentWidth: number
  containerWidth: number
  animationDuration: number
} => {
  if (!scrollElement) {
    return { contentWidth: 0, containerWidth: 0, animationDuration: 20 }
  }

  // Get the width of the scrollable content
  const contentWidth = scrollElement.scrollWidth

  // Get the width of the container element
  const containerWidth = scrollElement.parentElement?.clientWidth || 0

  // Calculate optimal animation duration based on content width
  // Minimum of 20 seconds, scales up for longer content
  const animationDuration = Math.max(contentWidth / 50, 20)

  return {
    contentWidth,
    containerWidth,
    animationDuration,
  }
}

/**
 * Determines if scrolling animation should be applied
 * @param contentWidth The width of the scrollable content
 * @param containerWidth The width of the container element
 * @returns Boolean indicating if animation should be applied
 */
export const shouldAnimate = (
  contentWidth: number,
  containerWidth: number
): boolean => {
  // Only animate if content is wider than container
  return contentWidth > containerWidth
}
