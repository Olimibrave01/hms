import { Redirect } from 'expo-router';
import { useAuth } from '../hooks/useAuth';

export default function Index() {
  const { session } = useAuth();

  // Redirect based on user role
  if (!session) {
    return <Redirect href="/login" />;
  }

  return <Redirect href={session.user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} />;
} 