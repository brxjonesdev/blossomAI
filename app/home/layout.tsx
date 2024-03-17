export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='flex flex-col'>
      <main className='flex-1 p-4 overflow-y-aut'>{children}</main>
    </div>
  );
}