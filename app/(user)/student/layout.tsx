import "../../styles/admin.modules.css"
import RoleGate from "@/components/auth/role-gate";
import Content from "@/components/admin/content";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
     <section className="h-full">
      <Content>
        {children}
      </Content>

     </section>
   
  );
}
