import Notifications from "@/components/notifications"
import MobileMenu from "@/components/mobile-menu"
import ProjectSelect from "@/components/project-select"
import Projects from "@/components/projects"
import CreateContent from "@/components/create-content-btn"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return(
    <div className="grow gap-4 my-4 md:flex">
    <section className='border-2 flex flex-col gap-10'>
    <Notifications/>
    <CreateContent/>
    <ProjectSelect/>
    </section>
     <MobileMenu/>
      {children}
</div>
    )
  }