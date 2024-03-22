import UserInfo from '@/components/user-info';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='my-4 flex grow flex-col gap-4 md:flex-row'>
     <UserInfo />
      {children}
    </div>
  );
}
