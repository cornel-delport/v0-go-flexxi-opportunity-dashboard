"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Eye,
  Edit,
  Trash2,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Key,
  Activity,
  Building2,
  UserCog,
  Lock,
  Unlock,
  Send,
  History,
  FileText,
  Download,
  RefreshCw,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

// Mock Users Data
const mockUsers = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@goflexxi.com",
    avatar: "",
    status: "active" as const,
    role: "super-admin" as const,
    lastLogin: "2024-01-15T10:30:00Z",
    createdAt: "2023-06-01T00:00:00Z",
    authProvider: "google" as const,
    team: "Executive",
    permissions: ["all"],
    recentActivity: [
      { action: "Approved opportunity #1234", time: "2 hours ago" },
      { action: "Updated scoring thresholds", time: "1 day ago" },
      { action: "Added new team member", time: "3 days ago" },
    ],
    assignedOpportunities: 12,
    reviewsCompleted: 156,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus.j@goflexxi.com",
    avatar: "",
    status: "active" as const,
    role: "admin" as const,
    lastLogin: "2024-01-15T09:15:00Z",
    createdAt: "2023-07-15T00:00:00Z",
    authProvider: "google" as const,
    team: "Operations",
    permissions: ["manage_users", "manage_sources", "approve_opportunities"],
    recentActivity: [
      { action: "Rejected opportunity #5678", time: "4 hours ago" },
      { action: "Configured Reddit source", time: "2 days ago" },
    ],
    assignedOpportunities: 8,
    reviewsCompleted: 89,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@goflexxi.com",
    avatar: "",
    status: "active" as const,
    role: "reviewer" as const,
    lastLogin: "2024-01-14T16:45:00Z",
    createdAt: "2023-09-20T00:00:00Z",
    authProvider: "google" as const,
    team: "Review Team",
    permissions: ["review_opportunities", "view_dashboard"],
    recentActivity: [
      { action: "Reviewed 5 opportunities", time: "1 hour ago" },
      { action: "Added comment to #9012", time: "5 hours ago" },
    ],
    assignedOpportunities: 24,
    reviewsCompleted: 234,
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@goflexxi.com",
    avatar: "",
    status: "active" as const,
    role: "analyst" as const,
    lastLogin: "2024-01-15T08:00:00Z",
    createdAt: "2023-10-05T00:00:00Z",
    authProvider: "email" as const,
    team: "Analytics",
    permissions: ["view_dashboard", "view_opportunities", "export_data"],
    recentActivity: [
      { action: "Exported monthly report", time: "3 hours ago" },
      { action: "Viewed opportunity trends", time: "1 day ago" },
    ],
    assignedOpportunities: 0,
    reviewsCompleted: 0,
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.t@goflexxi.com",
    avatar: "",
    status: "active" as const,
    role: "compliance-officer" as const,
    lastLogin: "2024-01-15T11:00:00Z",
    createdAt: "2023-08-10T00:00:00Z",
    authProvider: "google" as const,
    team: "Compliance",
    permissions: ["view_audit_logs", "manage_compliance", "review_opportunities"],
    recentActivity: [
      { action: "Flagged opportunity #3456", time: "30 minutes ago" },
      { action: "Reviewed compliance report", time: "1 day ago" },
    ],
    assignedOpportunities: 6,
    reviewsCompleted: 78,
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james.w@partner.com",
    avatar: "",
    status: "pending" as const,
    role: "read-only" as const,
    lastLogin: "",
    createdAt: "2024-01-10T00:00:00Z",
    authProvider: "email" as const,
    team: "Partners",
    permissions: ["view_dashboard"],
    recentActivity: [],
    assignedOpportunities: 0,
    reviewsCompleted: 0,
  },
  {
    id: "7",
    name: "Anna Martinez",
    email: "anna.m@goflexxi.com",
    avatar: "",
    status: "suspended" as const,
    role: "reviewer" as const,
    lastLogin: "2023-12-20T14:30:00Z",
    createdAt: "2023-05-15T00:00:00Z",
    authProvider: "google" as const,
    team: "Review Team",
    permissions: [],
    recentActivity: [
      { action: "Account suspended", time: "25 days ago" },
    ],
    assignedOpportunities: 0,
    reviewsCompleted: 145,
  },
  {
    id: "8",
    name: "Robert Chang",
    email: "robert.c@goflexxi.com",
    avatar: "",
    status: "active" as const,
    role: "reviewer" as const,
    lastLogin: "2024-01-15T07:30:00Z",
    createdAt: "2023-11-01T00:00:00Z",
    authProvider: "google" as const,
    team: "Review Team",
    permissions: ["review_opportunities", "view_dashboard"],
    recentActivity: [
      { action: "Completed daily review queue", time: "2 hours ago" },
    ],
    assignedOpportunities: 18,
    reviewsCompleted: 67,
  },
];

// Mock Roles Data
const mockRoles = [
  {
    id: "super-admin",
    name: "Super Admin",
    description: "Full system access with all administrative privileges",
    permissions: ["all"],
    userCount: 1,
    color: "bg-destructive/20 text-destructive",
  },
  {
    id: "admin",
    name: "Admin",
    description: "Manage users, sources, and approve opportunities",
    permissions: ["manage_users", "manage_sources", "approve_opportunities", "manage_campaigns", "edit_settings"],
    userCount: 2,
    color: "bg-primary/20 text-primary",
  },
  {
    id: "reviewer",
    name: "Reviewer",
    description: "Review and process opportunities in the queue",
    permissions: ["review_opportunities", "view_dashboard", "view_opportunities"],
    userCount: 4,
    color: "bg-success/20 text-success",
  },
  {
    id: "analyst",
    name: "Analyst",
    description: "View data, generate reports, and analyze trends",
    permissions: ["view_dashboard", "view_opportunities", "export_data", "view_audit_logs"],
    userCount: 2,
    color: "bg-warning/20 text-warning",
  },
  {
    id: "compliance-officer",
    name: "Compliance Officer",
    description: "Monitor compliance and review flagged items",
    permissions: ["view_audit_logs", "manage_compliance", "review_opportunities", "view_dashboard"],
    userCount: 1,
    color: "bg-chart-5/20 text-chart-5",
  },
  {
    id: "read-only",
    name: "Read Only",
    description: "View-only access to dashboard and opportunities",
    permissions: ["view_dashboard"],
    userCount: 1,
    color: "bg-muted text-muted-foreground",
  },
];

// Mock Teams Data
const mockTeams = [
  { id: "1", name: "Executive", userCount: 2, defaultRole: "admin", status: "active" },
  { id: "2", name: "Operations", userCount: 3, defaultRole: "admin", status: "active" },
  { id: "3", name: "Review Team", userCount: 5, defaultRole: "reviewer", status: "active" },
  { id: "4", name: "Analytics", userCount: 2, defaultRole: "analyst", status: "active" },
  { id: "5", name: "Compliance", userCount: 1, defaultRole: "compliance-officer", status: "active" },
  { id: "6", name: "Partners", userCount: 3, defaultRole: "read-only", status: "active" },
];

// Mock Audit Log
const mockAuditLog = [
  { id: "1", action: "Role assigned", user: "Sarah Chen", target: "Marcus Johnson", details: "Assigned Admin role", timestamp: "2024-01-15T10:30:00Z", type: "role" },
  { id: "2", action: "User suspended", user: "Sarah Chen", target: "Anna Martinez", details: "Account suspended due to inactivity", timestamp: "2023-12-20T14:30:00Z", type: "suspension" },
  { id: "3", action: "Permission changed", user: "Marcus Johnson", target: "Review Team", details: "Added export_data permission", timestamp: "2024-01-14T09:15:00Z", type: "permission" },
  { id: "4", action: "Failed sign-in", user: "Unknown", target: "admin@goflexxi.com", details: "3 failed attempts from IP 192.168.1.100", timestamp: "2024-01-13T22:45:00Z", type: "security" },
  { id: "5", action: "User invited", user: "Sarah Chen", target: "james.w@partner.com", details: "Invited as Read Only to Partners team", timestamp: "2024-01-10T11:00:00Z", type: "invitation" },
  { id: "6", action: "Settings updated", user: "Sarah Chen", target: "System", details: "Updated scoring thresholds", timestamp: "2024-01-09T15:30:00Z", type: "settings" },
];

// Permissions Matrix
const permissionsMatrix = [
  { permission: "View Dashboard", key: "view_dashboard", superAdmin: true, admin: true, reviewer: true, analyst: true, compliance: true, readOnly: true },
  { permission: "View Opportunities", key: "view_opportunities", superAdmin: true, admin: true, reviewer: true, analyst: true, compliance: true, readOnly: false },
  { permission: "Review Opportunities", key: "review_opportunities", superAdmin: true, admin: true, reviewer: true, analyst: false, compliance: true, readOnly: false },
  { permission: "Approve/Reject", key: "approve_opportunities", superAdmin: true, admin: true, reviewer: false, analyst: false, compliance: false, readOnly: false },
  { permission: "Manage Sources", key: "manage_sources", superAdmin: true, admin: true, reviewer: false, analyst: false, compliance: false, readOnly: false },
  { permission: "Manage Campaigns", key: "manage_campaigns", superAdmin: true, admin: true, reviewer: false, analyst: false, compliance: false, readOnly: false },
  { permission: "Manage Users", key: "manage_users", superAdmin: true, admin: true, reviewer: false, analyst: false, compliance: false, readOnly: false },
  { permission: "Edit Settings", key: "edit_settings", superAdmin: true, admin: true, reviewer: false, analyst: false, compliance: false, readOnly: false },
  { permission: "View Audit Logs", key: "view_audit_logs", superAdmin: true, admin: true, reviewer: false, analyst: true, compliance: true, readOnly: false },
  { permission: "Export Data", key: "export_data", superAdmin: true, admin: true, reviewer: false, analyst: true, compliance: false, readOnly: false },
  { permission: "Manage Compliance", key: "manage_compliance", superAdmin: true, admin: false, reviewer: false, analyst: false, compliance: true, readOnly: false },
];

type UserStatus = "active" | "pending" | "suspended";
type UserRole = "super-admin" | "admin" | "reviewer" | "analyst" | "compliance-officer" | "read-only";
type AuthProvider = "google" | "email";

function formatDate(dateString: string): string {
  if (!dateString) return "Never";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(dateString: string): string {
  if (!dateString) return "Never";
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getStatusBadge(status: UserStatus) {
  switch (status) {
    case "active":
      return <Badge className="bg-success/20 text-success border-0">Active</Badge>;
    case "pending":
      return <Badge className="bg-warning/20 text-warning border-0">Pending</Badge>;
    case "suspended":
      return <Badge className="bg-destructive/20 text-destructive border-0">Suspended</Badge>;
  }
}

function getRoleBadge(role: UserRole) {
  const roleConfig = mockRoles.find(r => r.id === role);
  const displayName = roleConfig?.name || role;
  const colorClass = roleConfig?.color || "bg-muted text-muted-foreground";
  return <Badge className={`${colorClass} border-0`}>{displayName}</Badge>;
}

function getAuthProviderIcon(provider: AuthProvider) {
  if (provider === "google") {
    return (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span>Google</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Mail className="h-3.5 w-3.5" />
      <span>Email</span>
    </div>
  );
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [teamFilter, setTeamFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  // Filter users
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesTeam = teamFilter === "all" || user.team === teamFilter;
    return matchesSearch && matchesRole && matchesStatus && matchesTeam;
  });

  // Stats
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.status === "active").length;
  const pendingUsers = mockUsers.filter(u => u.status === "pending").length;
  const suspendedUsers = mockUsers.filter(u => u.status === "suspended").length;
  const adminCount = mockUsers.filter(u => u.role === "super-admin" || u.role === "admin").length;

  return (
    <DashboardLayout>
      <Topbar
        title="Users & Access"
        description="Manage users, roles, permissions, and team access"
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Access Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Users</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">{totalUsers}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Active</p>
                    <p className="mt-1 text-2xl font-bold text-success">{activeUsers}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pending</p>
                    <p className="mt-1 text-2xl font-bold text-warning">{pendingUsers}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                    <Clock className="h-5 w-5 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Suspended</p>
                    <p className="mt-1 text-2xl font-bold text-destructive">{suspendedUsers}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                    <XCircle className="h-5 w-5 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Admins</p>
                    <p className="mt-1 text-2xl font-bold text-primary">{adminCount}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-secondary/50 p-1">
              <TabsTrigger value="users" className="gap-2 data-[state=active]:bg-background">
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="roles" className="gap-2 data-[state=active]:bg-background">
                <Shield className="h-4 w-4" />
                Roles & Permissions
              </TabsTrigger>
              <TabsTrigger value="teams" className="gap-2 data-[state=active]:bg-background">
                <Building2 className="h-4 w-4" />
                Teams
              </TabsTrigger>
              <TabsTrigger value="audit" className="gap-2 data-[state=active]:bg-background">
                <History className="h-4 w-4" />
                Audit & Security
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-4">
              {/* Filters and Actions */}
              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search users by name or email..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="h-9 bg-secondary/50 pl-9 text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                          <SelectTrigger className="h-9 w-[130px] border-border bg-secondary/50 text-sm">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            {mockRoles.map(role => (
                              <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="h-9 w-[120px] border-border bg-secondary/50 text-sm">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={teamFilter} onValueChange={setTeamFilter}>
                          <SelectTrigger className="h-9 w-[130px] border-border bg-secondary/50 text-sm">
                            <SelectValue placeholder="Team" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Teams</SelectItem>
                            {mockTeams.map(team => (
                              <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="gap-1.5">
                            <UserPlus className="h-4 w-4" />
                            Invite User
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Invite New User</DialogTitle>
                            <DialogDescription>
                              Send an invitation to join GoFlexxi. Users can sign in with Google or email.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Email Address</Label>
                              <Input placeholder="user@company.com" type="email" />
                            </div>
                            <div className="space-y-2">
                              <Label>Full Name</Label>
                              <Input placeholder="John Smith" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Role</Label>
                                <Select defaultValue="reviewer">
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockRoles.map(role => (
                                      <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Team</Label>
                                <Select defaultValue="Review Team">
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockTeams.map(team => (
                                      <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Sign-in Method</Label>
                              <div className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4">
                                <div className="flex items-center gap-2">
                                  <Checkbox id="google-signin" defaultChecked />
                                  <label htmlFor="google-signin" className="flex items-center gap-2 text-sm">
                                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Google Sign-In
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Personal Message (Optional)</Label>
                              <Textarea placeholder="Add a welcome message to the invitation..." className="resize-none" rows={3} />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                            <Button className="gap-1.5" onClick={() => setIsCreateDialogOpen(false)}>
                              <Send className="h-4 w-4" />
                              Send Invitation
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Users Table */}
              <Card className="overflow-hidden border-border bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                        <th className="px-4 py-3 font-semibold">User</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Role</th>
                        <th className="px-4 py-3 font-semibold">Team</th>
                        <th className="px-4 py-3 font-semibold">Auth</th>
                        <th className="px-4 py-3 font-semibold">Last Login</th>
                        <th className="px-4 py-3 font-semibold">Created</th>
                        <th className="px-4 py-3 font-semibold"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="group cursor-pointer text-sm transition-colors duration-150 hover:bg-primary/5"
                          onClick={() => setSelectedUser(user)}
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9 border-2 border-border">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="bg-secondary text-xs font-medium">
                                  {user.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">{getStatusBadge(user.status)}</td>
                          <td className="px-4 py-4">{getRoleBadge(user.role)}</td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-muted-foreground">{user.team}</span>
                          </td>
                          <td className="px-4 py-4">{getAuthProviderIcon(user.authProvider)}</td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-muted-foreground">{formatDateTime(user.lastLogin)}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</span>
                          </td>
                          <td className="px-4 py-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setIsEditDialogOpen(true); }}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  <Key className="mr-2 h-4 w-4" />
                                  Reset Password
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {user.status === "active" ? (
                                  <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-warning">
                                    <Lock className="mr-2 h-4 w-4" />
                                    Suspend User
                                  </DropdownMenuItem>
                                ) : user.status === "suspended" ? (
                                  <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-success">
                                    <Unlock className="mr-2 h-4 w-4" />
                                    Reactivate User
                                  </DropdownMenuItem>
                                ) : null}
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Registration & Access Model */}
              <div className="grid gap-4 lg:grid-cols-2">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Key className="h-4 w-4 text-primary" />
                      Authentication Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                      <div className="flex items-center gap-3">
                        <svg className="h-6 w-6" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <div>
                          <p className="font-medium text-foreground">Google Sign-In</p>
                          <p className="text-xs text-muted-foreground">SSO with Google Workspace</p>
                        </div>
                      </div>
                      <Badge className="bg-success/20 text-success border-0">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Email Invitation</p>
                          <p className="text-xs text-muted-foreground">Invite users via email link</p>
                        </div>
                      </div>
                      <Badge className="bg-success/20 text-success border-0">Enabled</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Send className="h-4 w-4 text-primary" />
                      Pending Invitations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg border border-dashed border-border p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/20">
                            <Clock className="h-4 w-4 text-warning" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">james.w@partner.com</p>
                            <p className="text-xs text-muted-foreground">Invited 5 days ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">Resend</Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive">Revoke</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Roles & Permissions Tab */}
            <TabsContent value="roles" className="space-y-6">
              {/* System Roles */}
              <div className="grid gap-4 lg:grid-cols-3">
                {mockRoles.map((role) => (
                  <Card key={role.id} className="border-border bg-card transition-all hover:border-primary/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${role.color.split(" ")[0]}`}>
                            <Shield className={`h-4 w-4 ${role.color.split(" ")[1]}`} />
                          </div>
                          <div>
                            <CardTitle className="text-sm font-semibold">{role.name}</CardTitle>
                            <p className="text-xs text-muted-foreground">{role.userCount} users</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="mb-3 text-xs text-muted-foreground">{role.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((perm) => (
                          <Badge key={perm} variant="outline" className="text-[10px]">{perm.replace(/_/g, " ")}</Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-[10px]">+{role.permissions.length - 3} more</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Permissions Matrix */}
              <Card className="overflow-hidden border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Permissions Matrix
                  </CardTitle>
                  <CardDescription>Overview of permissions by role</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-secondary/30 text-xs uppercase tracking-wider text-muted-foreground">
                          <th className="px-4 py-3 text-left font-semibold">Permission</th>
                          <th className="px-4 py-3 text-center font-semibold">Super Admin</th>
                          <th className="px-4 py-3 text-center font-semibold">Admin</th>
                          <th className="px-4 py-3 text-center font-semibold">Reviewer</th>
                          <th className="px-4 py-3 text-center font-semibold">Analyst</th>
                          <th className="px-4 py-3 text-center font-semibold">Compliance</th>
                          <th className="px-4 py-3 text-center font-semibold">Read Only</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {permissionsMatrix.map((row) => (
                          <tr key={row.key} className="text-sm transition-colors hover:bg-primary/5">
                            <td className="px-4 py-3 font-medium text-foreground">{row.permission}</td>
                            <td className="px-4 py-3 text-center">
                              {row.superAdmin ? <Check className="mx-auto h-4 w-4 text-success" /> : <X className="mx-auto h-4 w-4 text-muted-foreground/30" />}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {row.admin ? <Check className="mx-auto h-4 w-4 text-success" /> : <X className="mx-auto h-4 w-4 text-muted-foreground/30" />}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {row.reviewer ? <Check className="mx-auto h-4 w-4 text-success" /> : <X className="mx-auto h-4 w-4 text-muted-foreground/30" />}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {row.analyst ? <Check className="mx-auto h-4 w-4 text-success" /> : <X className="mx-auto h-4 w-4 text-muted-foreground/30" />}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {row.compliance ? <Check className="mx-auto h-4 w-4 text-success" /> : <X className="mx-auto h-4 w-4 text-muted-foreground/30" />}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {row.readOnly ? <Check className="mx-auto h-4 w-4 text-success" /> : <X className="mx-auto h-4 w-4 text-muted-foreground/30" />}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Teams Tab */}
            <TabsContent value="teams" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Teams & Organizations</h3>
                  <p className="text-sm text-muted-foreground">Manage team structures and default roles</p>
                </div>
                <Button size="sm" className="gap-1.5">
                  <Building2 className="h-4 w-4" />
                  Create Team
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mockTeams.map((team) => (
                  <Card key={team.id} className="border-border bg-card transition-all hover:border-primary/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{team.name}</p>
                            <p className="text-xs text-muted-foreground">{team.userCount} members</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit Team</DropdownMenuItem>
                            <DropdownMenuItem><Users className="mr-2 h-4 w-4" />Manage Members</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete Team</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          Default Role: <span className="font-medium text-foreground">{mockRoles.find(r => r.id === team.defaultRole)?.name}</span>
                        </div>
                        <Badge className="bg-success/20 text-success border-0 text-xs">{team.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Audit & Security Tab */}
            <TabsContent value="audit" className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-4">
                <Card className="border-border bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Events</p>
                        <p className="text-xl font-bold text-foreground">1,247</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                        <CheckCircle className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Successful Logins</p>
                        <p className="text-xl font-bold text-foreground">892</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Failed Attempts</p>
                        <p className="text-xl font-bold text-foreground">23</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                        <ShieldAlert className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Security Alerts</p>
                        <p className="text-xl font-bold text-foreground">3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="overflow-hidden border-border bg-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <History className="h-4 w-4 text-primary" />
                      Audit Log
                    </CardTitle>
                    <CardDescription>Recent system and user activity</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border/50">
                    {mockAuditLog.map((log) => (
                      <div key={log.id} className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-primary/5">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          log.type === "security" ? "bg-destructive/10" :
                          log.type === "role" ? "bg-primary/10" :
                          log.type === "permission" ? "bg-warning/10" :
                          log.type === "suspension" ? "bg-destructive/10" :
                          "bg-secondary"
                        }`}>
                          {log.type === "security" && <ShieldAlert className="h-4 w-4 text-destructive" />}
                          {log.type === "role" && <UserCog className="h-4 w-4 text-primary" />}
                          {log.type === "permission" && <Key className="h-4 w-4 text-warning" />}
                          {log.type === "suspension" && <Lock className="h-4 w-4 text-destructive" />}
                          {log.type === "invitation" && <Send className="h-4 w-4 text-muted-foreground" />}
                          {log.type === "settings" && <Settings className="h-4 w-4 text-muted-foreground" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{log.action}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {log.user} {log.target && <span>• {log.target}</span>} • {log.details}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDateTime(log.timestamp)}
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* User Detail Sheet */}
      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedUser && (
            <>
              <SheetHeader className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-border">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback className="bg-secondary text-lg font-medium">
                      {selectedUser.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle className="text-lg">{selectedUser.name}</SheetTitle>
                    <SheetDescription>{selectedUser.email}</SheetDescription>
                    <div className="mt-2 flex items-center gap-2">
                      {getStatusBadge(selectedUser.status)}
                      {getRoleBadge(selectedUser.role)}
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border bg-secondary/30 p-3">
                    <p className="text-xs text-muted-foreground">Reviews Completed</p>
                    <p className="mt-1 text-xl font-bold text-foreground">{selectedUser.reviewsCompleted}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/30 p-3">
                    <p className="text-xs text-muted-foreground">Assigned</p>
                    <p className="mt-1 text-xl font-bold text-foreground">{selectedUser.assignedOpportunities}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Team</span>
                      <span className="text-sm font-medium text-foreground">{selectedUser.team}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Auth Provider</span>
                      {getAuthProviderIcon(selectedUser.authProvider)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Login</span>
                      <span className="text-sm font-medium text-foreground">{formatDateTime(selectedUser.lastLogin)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Created</span>
                      <span className="text-sm font-medium text-foreground">{formatDate(selectedUser.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent Activity</h4>
                  {selectedUser.recentActivity.length > 0 ? (
                    <div className="space-y-2">
                      {selectedUser.recentActivity.map((activity, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                          <Activity className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground truncate">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No recent activity</p>
                  )}
                </div>

                {/* Permissions */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Permissions</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedUser.permissions.map((perm) => (
                      <Badge key={perm} variant="outline" className="text-xs">{perm.replace(/_/g, " ")}</Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="outline" className="flex-1 gap-1.5" onClick={() => setIsEditDialogOpen(true)}>
                    <Edit className="h-4 w-4" />
                    Edit User
                  </Button>
                  {selectedUser.status === "active" ? (
                    <Button variant="outline" className="gap-1.5 text-warning hover:text-warning">
                      <Lock className="h-4 w-4" />
                      Suspend
                    </Button>
                  ) : selectedUser.status === "suspended" ? (
                    <Button variant="outline" className="gap-1.5 text-success hover:text-success">
                      <Unlock className="h-4 w-4" />
                      Reactivate
                    </Button>
                  ) : null}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and permissions</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue={selectedUser?.name} />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input defaultValue={selectedUser?.email} type="email" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Role</Label>
                <Select defaultValue={selectedUser?.role}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRoles.map(role => (
                      <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Team</Label>
                <Select defaultValue={selectedUser?.team}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTeams.map(team => (
                      <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue={selectedUser?.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
