import { NavData } from '@/app/types/documentTypes'

function processNavData(data: NavData) {
  // Filter out nav sections with no items
  return [
    {
      label: 'Shows',
      items: data.shows.map((show) => ({
        label: show.title.replaceAll(' ', '_').toLowerCase() + '_' + show.year,
        href: `/shows/${show.slug.current}`,
      })),
      defaultHref: '/',
    },
    {
      label: 'Projects',
      items: data.projects.map((project) => ({
        label: project.title.replaceAll(' ', '_').toLowerCase(),
        href: `/projects/${project.slug.current}`,
      })),
      defaultHref: '/',
    },
    {
      label: 'Team',
      items: data.teamMembers.map((member) => ({
        label: member.name.replaceAll(' ', '_').toLowerCase(),
        href: `/team/${member._id}`,
      })),
      defaultHref: '/',
    },
    {
      label: 'Links',
      items: data.links.map((link) => ({
        label: link.title.replaceAll(' ', '_').toLowerCase(),
        href: link.url,
      })),
      defaultHref: '/',
    },
    {
      label: 'Community',
      items: data.communityPosts.map((post) => ({
        label: post.title.replaceAll(' ', '_').toLowerCase(),
        href: `/community/${post.slug.current}`,
      })),
      defaultHref: '/',
    },
  ].filter((section) => section.items.length > 0)
}

function duplicateItemsForScroll(
  items: Array<{ label: string; href: string }>,
  repetitions = 6
) {
  const duplicated = []
  for (let i = 0; i < repetitions; i++) {
    duplicated.push(...items)
  }
  return duplicated
}

function formatLabel(label: string, suffix = '_') {
  return `${label.toLowerCase()}${suffix}`
}

export { processNavData, duplicateItemsForScroll, formatLabel }
