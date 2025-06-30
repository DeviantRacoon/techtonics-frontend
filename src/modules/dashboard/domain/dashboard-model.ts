import { ReactElement } from 'react';

export interface IDashboardStat {
  title: string;
  value: string;
  icon: ReactElement;
}

export interface IDashboardFeature {
  title: string;
  description: string;
  icon: ReactElement;
  href: string;
}
