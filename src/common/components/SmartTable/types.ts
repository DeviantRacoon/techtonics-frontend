import { ReactNode } from 'react';

export type Align = 'left' | 'center' | 'right';
export type ColumnSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type FilterType = 'select' | 'checkbox' | 'date' | 'daterange' | 'text';

export interface Column {
  id: string
  label: string
  type?: 'text' | 'number' | 'date' | 'datetime' | 'status' | 'money' | 'percentage' | 'image'
  align?: 'left' | 'center' | 'right'
  size?: ColumnSize
  tooltip?: boolean
  render?: (value: any, row: Row) => React.ReactNode
  headerRender?: () => React.ReactNode
  collapsible?: boolean 
  defaultVisible?: boolean
}

export type Row = Record<string, any> & { id: string | number };

export interface Action {
  label: string;
  icon?: ReactNode;
  onClick: (row: Row) => void;
  hidden?: boolean | ((row: Row) => boolean);
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterDefinition {
  id: string;
  label: string;
  type?: FilterType;
  options?: FilterOption[];
}

export interface ISmartTableProps {
  columns: Column[];
  rows: Row[];
  filters?: FilterDefinition[];
  onClick?: (row: Row) => void;
  actions?: Action[];
  loading?: boolean;
}
