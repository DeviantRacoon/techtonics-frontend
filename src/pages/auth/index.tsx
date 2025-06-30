import AuthLayout from './_layout';
import { AuthView } from '@/modules/auth';

export default function Login() {
  return (
    <AuthLayout>
      <AuthView />
    </AuthLayout>
  );
}
