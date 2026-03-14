'use client';

import { useState, useEffect } from 'react';
import { ROLES, Role } from '@/lib/roles';

// This is a placeholder. In a real app, you'd fetch this from an API.
const mockUsers = [
  {
    uid: '1',
    fullName: 'Admin User',
    email: 'admin@example.com',
    role: ROLES.ADMIN,
    lastLoginAt: new Date().toISOString(),
  },
  {
    uid: '2',
    fullName: 'Analyst User',
    email: 'analyst@example.com',
    role: ROLES.ANALYST,
    lastLoginAt: new Date().toISOString(),
  },
  {
    uid: '3',
    fullName: 'Pending User',
    email: 'new@example.com',
    role: ROLES.PENDING,
    lastLoginAt: new Date().toISOString(),
  },
];

export function UserManagementTable() {
  const [users, setUsers] = useState(mockUsers);

  const handleRoleChange = (uid: string, newRole: Role) => {
    // In a real app, you'd call an API to update the user's role.
    console.log(`Changing user ${uid} to role ${newRole}`);
    const updatedUsers = users.map((user) =>
      user.uid === uid ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary/50">
          <tr className="text-left text-muted-foreground">
            <th className="p-4 font-medium">User</th>
            <th className="p-4 font-medium">Role</th>
            <th className="p-4 font-medium">Last Login</th>
            <th className="p-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.map((user) => (
            <tr key={user.uid} className="hover:bg-secondary/40">
              <td className="p-4">
                <div className="font-medium text-foreground">{user.fullName}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </td>
              <td className="p-4">{user.role}</td>
              <td className="p-4 text-muted-foreground">
                {new Date(user.lastLoginAt).toLocaleString()}
              </td>
              <td className="p-4">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.uid, e.target.value as Role)}
                  className="rounded border border-border bg-input px-2 py-1 text-xs"
                >
                  {Object.values(ROLES).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
