import { NavData, ProcessedNavData } from '@/app/types'

function processNavData(data: NavData): ProcessedNavData {
  // Filter out nav sections with no items
  return {
    data: [
      {
        label: 'live on stage',
        items: data.liveOnStage.map((item) => ({
          label: item.title,
          href: `/shows/`,
        })),
        defaultHref: '/shows',
      },
      {
        label: 'on the street',
        items: data.onTheStreet.map((item) => ({
          label: item.title,
          href: `/projects/`,
        })),
        defaultHref: '/projects',
      },
      {
        label: 'in da club',
        items: data.inDaClub.map((item) => ({
          label: item.title,
          href: `/collabs/`,
        })),
        defaultHref: '/collabs',
      },
      {
        label: 'at the fest',
        items: data.atTheFest.map((item) => ({
          label: item.title,
          href: `/freaks/`,
        })),
        defaultHref: '/freaks',
      },
      {
        label: 'freaks',
        items: data.freaks.map((freak) => ({
          label: freak.name,
          href: `/freaks/${freak.slug.current}`,
        })),
        defaultHref: '/freaks',
      },
      {
        label: 'links',
        items: data.links.map((link) => ({
          label: link.title,
          href: link.url,
        })),
        defaultHref: '/links',
      },
    ].filter((section) => section.items.length > 0),
  }
}

function formatLabel(label: string) {
  return `${label.toLowerCase()}`
}

export { processNavData, formatLabel }
