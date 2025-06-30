import BaseService from '@/common/libs/base-services';

export default class AuthService extends BaseService {
  constructor() {
    super('auth');
  }

  login(email: string, password: string) {
    return this.post('/login', { email, password });
  }

  forgotPassword(mail: string) {
    return this.api.post('users', { mail });
  }
}
