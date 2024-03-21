import Notifications from '@/components/notifications';
import MobileMenu from '@/components/mobile-menu';
import ProjectSelect from '@/components/project-select';
import Projects from '@/components/projects';
import CreateContent from '@/components/create-content-btn';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='my-4 flex grow flex-col gap-4 md:flex-row'>
      <section className='flex flex-col gap-10'>
        <Notifications />
        <ProjectSelect />
      </section>
      <MobileMenu />
      {children}
    </div>
  );
}
