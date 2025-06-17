import React from 'react'
import { useTheme } from '@mui/material'

interface ThemedIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

export default function ThemedIcon({ src, alt, style, ...rest }: ThemedIconProps) {
  const theme = useTheme()
  const filter = theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
  return <img src={src} alt={alt} style={{ filter, ...style }} {...rest} />
}
