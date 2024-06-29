import SideNavigation from '../_components/SideNavigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}
