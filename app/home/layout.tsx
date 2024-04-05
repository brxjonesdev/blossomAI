import UserInfo from '@/components/user-info';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex grow flex-col gap-4 md:flex-row'>
      {children}
    </div>
  );
}
