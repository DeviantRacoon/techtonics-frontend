interface FilterOption {
  label: string
  value: string
}

export interface IFilterProps {
  label: string
  key: string
  options: FilterOption[]
}
