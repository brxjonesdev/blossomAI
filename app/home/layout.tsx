export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='flex flex-col'>
        <nav className='flex items-center justify-between gap-2 p-4 border-blsm_accent border-2'>
            <p className='text-lg font-bold text-blsm_primary'>Blossom</p>
            <div className='md:'>
            <h2>Dashboard</h2>
            </div>
        </nav>  
      <main className='flex-1 p-4 overflow-y-auto border-blsm_accent border-2'>{children}</main>
    </div>
  );
}