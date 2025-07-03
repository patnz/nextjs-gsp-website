import { NavData, ProcessedNavData } from '@/app/types'

function processNavData(data: NavData): ProcessedNavData {
  // Filter out nav sections with no items
  // Duplicate nav items for desktop to fill navigation scroll menu
  return {
    // MOBILE NAV DATA

    mobileNavData: [
      {
        label: 'gigs_',
        items: data.gigs.map((gig) => ({
          label: `${formatLabel(gig.title)} [${gig.year}]`,
          href: `/gigs/${gig.slug.current}`,
        })),
        defaultHref: '/',
      },
      // {
      //   label: 'projects_',
      //   items: data.projects.map((project) => ({
      //     label: formatLabel(project.title),
      //     href: `/projects/${project.slug.current}`,
      //   })),
      //   defaultHref: '/',
      // },
      // {
      //   label: 'team_',
      //   items: data.teamMembers.map((member) => ({
      //     label: formatLabel(member.name),
      //     href: `/team/${member._id}`,
      //   })),
      //   defaultHref: '/',
      // },
      // {
      //   label: 'links_',
      //   items: data.links.map((link) => ({
      //     label: formatLabel(link.title),
      //     href: link.url,
      //   })),
      //   defaultHref: '/',
      // },
      // {
      //   label: 'community_',
      //   items: data.communityPosts.map((post) => ({
      //     label: formatLabel(post.title),
      //     href: `/community/${post.slug.current}`,
      //   })),
      //   defaultHref: '/',
      // },
    ].filter((section) => section.items.length > 0),

    // DESKTOP NAV DATA

    // Desktop data will have duplicate 'nav items' if there is only 1 or 2 items
    // This is a styling choice, so there is no empty space when scrolling

    desktopNavData: [
      {
        label: 'gigs_',
        items: data.gigs.map((gig) => ({
          label: formatLabel(gig.title) + '[' + gig.year + ']',
          href: `/gigs/${gig.slug.current}`,
        })),
        defaultHref: '/',
      },
    ].filter((section) => section.items.length > 0),
  }
}

function formatLabel(label: string) {
  return `${label.toLowerCase()}`
}

export { processNavData, formatLabel }
