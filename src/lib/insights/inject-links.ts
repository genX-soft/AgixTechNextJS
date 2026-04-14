import type { ServiceLink } from './service-mapping'

export function injectInlineServiceLinks(
  content: string,
  services: ServiceLink[],
  maxLinks = 2
): string {
  if (!content || !services.length) return content

  const firstParaEnd = content.indexOf('</p>')
  if (firstParaEnd === -1) return content

  const topServices = services.slice(0, maxLinks)

  const linkItems = topServices
    .map(
      (s) =>
        `<a href="${s.href}" style="color:var(--primary,#6366f1);text-decoration:underline;font-weight:500;">${s.title}</a>`
    )
    .join(' &amp; ')

  const inlineNote = `<p class="blog-inline-note" style="margin:1.25rem 0;padding:0.875rem 1rem;border-left:3px solid var(--primary,#6366f1);background:rgba(99,102,241,0.05);font-size:0.9rem;"><strong>Related reading:</strong> ${linkItems}</p>`

  return (
    content.slice(0, firstParaEnd + 4) +
    inlineNote +
    content.slice(firstParaEnd + 4)
  )
}
