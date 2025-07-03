# GSP Website

This is a work in progress project to replace Golden Scissor Puppets' current Squarespace website.

## Tech

NextJS / React / Sanity / TypeScript / Tailwind / Framer-Motion

## Progress So Far 

- **Setup:** Next.js + Sanity deployed successfully.  
- **Navigation:** Integrated navigation with document data fetched from Sanity.  
- **Dropdown Menu:** Implemented for each nav item using Sanity documents.
- **Layout:** Flickering video backdrop on each page.
- **Test data:** Test data for all document types.
- **Live updates:** Webhook created when documents are created/updated/deleted.

## To-Do List 🛠️

### Styling
- Explore dropdown styling options for:  
  - **Mobile:** Consider an accordion-style menu.  
  - **Desktop:** Find a suitable dropdown style.  
- Choose fonts.  
- Select a better color scheme.

### Design
- Work on landing page: 
  - Design paper cutouts of each puppet.  
  - Implement float animations.  
  - Research golden scissors animation.
- Add testimonials page/schema.

### Functionality
- Test image ratios, add comments to Sanity Studio for upload guides.
- Migrate existing data from current website.


## Wanting to set up this project for yourself?

Feel free to clone the repo, but as this project is set up with Sanity CMS, you will need to [create your own Sanity project](https://www.sanity.io/docs/getting-started-with-sanity).

Make sure you create an `.env.local` file in the root of your project with your own project details:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=123456
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Eventually, I would like this repo to be cleaned up so that it can be repurposed more easily, with a single schema to build from. Let me know if you need any help.

x