'use client'

import React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'

interface SidebarLogoProps {
  expanded: boolean
}

export default function SidebarLogo({ expanded }: SidebarLogoProps) {
  return (
    <Box sx={{ px: 2, pt: 2, pb: 1, zIndex: 10 }}>
      {expanded ? (
        <Image
          src="/assets/img/logotipo.webp"
          alt="Logotipo"
          width={140}
          height={40}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      ) : (
        <Image
          src="/assets/img/logotipo-icon.webp"
          alt="Ícono"
          width={32}
          height={32}
          style={{ display: 'block', margin: '0 auto' }}
        />
      )}
    </Box>
  )
}
