'use client';

import withAuthorization from "@/lib/roles/withAuthorization";
import { RESOURCES, ACTIONS } from "@/lib/roles";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { UserManagementTable } from "@/components/admin/user-management-table";

function UserManagementPage() {
  return (
    <DashboardLayout>
      <Topbar
        title="User Management"
        description="Manage user roles and permissions across the platform."
      />
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl">
          <UserManagementTable />
        </div>
      </div>
    </DashboardLayout>
  );
}

// Protect the page, only allowing users with READ permission on the USERS resource
export default withAuthorization(UserManagementPage, RESOURCES.USERS, ACTIONS.READ);
