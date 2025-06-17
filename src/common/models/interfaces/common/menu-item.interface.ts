export interface IMenuItem {
  label: string
  icon: React.ReactElement
  description?: string
  link?: string
  permission?: string
  submenu?: { label: string; link: string, description?: string, permission?: string }[]
}
