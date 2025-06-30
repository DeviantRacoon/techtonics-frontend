import BaseService from '@/common/libs/base-services';

export default class DashboardService extends BaseService {
  constructor() {
    super('dashboard');
  }

  async fetchStats() {
    return await this.get('/stats');
  }
}
