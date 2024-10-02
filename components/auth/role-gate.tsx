"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { Role } from "@prisma/client";

interface Props {
  children: React.ReactNode;
  allowedRole: Role;
}
const RoleGate: React.FC<Props> = ({ children, allowedRole }) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return null;
  }
  return <>{children}</>;
};

export default RoleGate;
