export interface IMenuItem {
  label: string
  icon: React.ReactElement
  description?: string
  /**
   * Palabras clave para mejorar las búsquedas semánticas
   */
  keywords?: string[]
  link?: string
  permission?: string
  submenu?: {
    label: string
    link: string
    description?: string
    permission?: string
    /** Palabras clave asociadas al submódulo */
    keywords?: string[]
  }[]
}
