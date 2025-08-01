import { NavData, ProcessedNavData } from '@/app/types'

function processNavData(data: NavData): ProcessedNavData {
  // Filter out nav sections with no items
  // Duplicate nav items for desktop to fill navigation scroll menu
  return {
    // MOBILE NAV DATA

    data: [
      {
        label: 'shows',
        items: data.shows.map((show) => ({
          label: `${formatLabel(show.title)} [${show.year}]`,
          href: `/shows/${show.slug.current}`,
        })),
        defaultHref: '/',
      },
      {
        label: 'projects',
        items: data.projects.map((project) => ({
          label: formatLabel(project.title),
          href: `/projects/${project.slug.current}`,
        })),
        defaultHref: '/',
      },
      {
        label: 'team',
        items: data.teamMembers.map((member) => ({
          label: formatLabel(member.name),
          href: `/team/${member._id}`,
        })),
        defaultHref: '/',
      },
      {
        label: 'links',
        items: data.links.map((link) => ({
          label: formatLabel(link.title),
          href: link.url,
        })),
        defaultHref: '/',
      },
      {
        label: 'community',
        items: data.communityPosts.map((post) => ({
          label: formatLabel(post.title),
          href: `/community/${post.slug.current}`,
        })),
        defaultHref: '/',
      },
    ].filter((section) => section.items.length > 0),
  }
}

// function duplicateItems(items: Array<{ label: string; href: string }>) {
//   if (items.length === 0) return items
//   let duplicatedItems = items
//   for (let i = 0; duplicatedItems.length < 10; i++) {
//     duplicatedItems = [...duplicatedItems, ...items]
//   }
//   return duplicatedItems
// }

function formatLabel(label: string) {
  return `${label.toLowerCase()}`
}

export { processNavData, formatLabel }
