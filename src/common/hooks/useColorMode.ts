import { useContext } from 'react'
import { ColorModeContext } from '@/common/components/ColorModeProvider'

export const useColorMode = () => useContext(ColorModeContext)
