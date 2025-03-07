import { NavData } from '@/app/types'

function processNavData(data: NavData) {
  // Filter out nav sections with no items
  // Duplicate nav items for desktop to fill navigation scroll menu
  return {
    // MOBILE NAV DATA

    mobileNavData: [
      {
        label: 'shows_',
        items: data.shows.map((show) => ({
          label: `${formatLabel(show.title)} [${show.year}]`,
          href: `/shows/${show.slug.current}`,
        })),
        defaultHref: '/',
      },
      {
        label: 'projects_',
        items: data.projects.map((project) => ({
          label: formatLabel(project.title),
          href: `/projects/${project.slug.current}`,
        })),
        defaultHref: '/',
      },
      {
        label: 'team_',
        items: data.teamMembers.map((member) => ({
          label: formatLabel(member.name),
          href: `/team/${member._id}`,
        })),
        defaultHref: '/',
      },
      {
        label: 'links_',
        items: data.links.map((link) => ({
          label: formatLabel(link.title),
          href: link.url,
        })),
        defaultHref: '/',
      },
      {
        label: 'community_',
        items: data.communityPosts.map((post) => ({
          label: formatLabel(post.title),
          href: `/community/${post.slug.current}`,
        })),
        defaultHref: '/',
      },
    ].filter((section) => section.items.length > 0),

    // DESKTOP NAV DATA

    // Desktop data will have duplicate 'nav items' if there is only 1 or 2 items
    // This is a styling choice, so there is no empty space when scrolling

    desktopNavData: [
      {
        label: 'shows_',
        items: duplicateItems(
          data.shows.map((show) => ({
            label: formatLabel(show.title) + '[' + show.year + ']',
            href: `/shows/${show.slug.current}`,
          }))
        ),
        defaultHref: '/',
      },
      {
        label: 'projects_',
        items: duplicateItems(
          data.projects.map((project) => ({
            label: formatLabel(project.title),
            href: `/projects/${project.slug.current}`,
          }))
        ),
        defaultHref: '/',
      },
      {
        label: 'team_',
        items: duplicateItems(
          data.teamMembers.map((member) => ({
            label: formatLabel(member.name),
            href: `/team/${member._id}`,
          }))
        ),
        defaultHref: '/',
      },
      {
        label: 'links_',
        items: duplicateItems(
          data.links.map((link) => ({
            label: formatLabel(link.title).toLowerCase(),
            href: link.url,
          }))
        ),
        defaultHref: '/',
      },
      {
        label: 'community_',
        items: duplicateItems(
          data.communityPosts.map((post) => ({
            label: formatLabel(post.title).toLowerCase(),
            href: `/community/${post.slug.current}`,
          }))
        ),
        defaultHref: '/',
      },
    ].filter((section) => section.items.length > 0),
  }
}

function duplicateItems(items: Array<{ label: string; href: string }>) {
  if (items.length === 0) return items
  let duplicatedItems = items
  for (let i = 0; duplicatedItems.length < 8; i++) {
    duplicatedItems = [...duplicatedItems, ...items]
  }
  return duplicatedItems
}

function formatLabel(label: string) {
  return `${label.toLowerCase()}`
}

export { processNavData, formatLabel }
