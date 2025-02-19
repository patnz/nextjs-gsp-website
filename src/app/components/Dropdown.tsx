'use client'

import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react'
import { useRouter } from 'next/navigation'
import type { Show } from '../sanity/types'

interface ShowsDropdownProps {
  shows: Show[]
}

export function ShowsDropdown({ shows }: ShowsDropdownProps) {
  const router = useRouter()

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="ghost">Shows</Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Shows navigation"
        onAction={(key) => router.push(`/shows/${key}`)}
      >
        {shows.map((show) => (
          <DropdownItem key={show.slug.current}>
            {show.title} ({show.year})
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
