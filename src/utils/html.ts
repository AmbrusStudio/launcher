import createDOMPurify from 'dompurify'

export function cleanupHTML(dirty: string): string {
  if (typeof window === 'undefined') return dirty
  const DOMPurify = createDOMPurify(window)
  const clean = DOMPurify.sanitize(dirty)
  return clean
}
