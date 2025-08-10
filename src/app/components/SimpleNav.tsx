// 'use client'

// import React from 'react'
// // import Image from 'next/image'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'

// export default function SimpleNavigation() {
//   const pathname = usePathname()
//   const isHomePage = pathname === '/'

//   // Get the parent path
//   const getParentPath = (path: string): string => {
//     const segments = path.split('/').filter(Boolean)
//     segments.pop() // remove the last segment
//     return '/' + segments.join('/')
//   }

//   const parentPath = getParentPath(pathname)

//   // Don't show navigation on homepage (grid nav will be there instead)
//   if (isHomePage) {
//     return null
//   }
//   console.log(pathname)

//   return (
//     <div className="fixed top-0 left-0 z-40 flex justify-end items-end w-full">
//       <div className="w-full h-16 flex justify-end p-4 md:p-8 md:px-12">
//         <Link
//           className="text-2xl md:text-4xl font-extrabold p-2 bg-gsp-black  text-gsp-white/60 hover:text-gsp-white -skew-x-12 h-9 w-10 md:h-14 md:w-16 flex items-center justify-center scale-105 hover:scale-110 active:scale-x-150 hover:border-gsp-gold duration-300 hover:no-underline border-x-4 md:border-x-8 border-y-4 border-gsp-green/70 shadow-xl rounded-full absolute hover:animate-none"
//           href={parentPath}
//         >
//           <span>back</span>
//         </Link>
//       </div>
//     </div>
//   )
// }
