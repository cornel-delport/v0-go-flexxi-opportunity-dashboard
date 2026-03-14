"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  User,
  Bell,
  Shield,
  Database,
  Webhook,
  Mail,
  Key,
  Globe,
  Sliders,
  Tag,
  Radio,
  Users,
  Plus,
  Pencil,
  Trash2,
  Save,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

// Scoring threshold settings
interface ScoringThresholds {
  confidenceMinimum: number;
  monetizationMinimum: number;
  urgencyMinimum: number;
  autoApproveThreshold: number;
  highPriorityThreshold: number;
}

// Category definition
interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  enabled: boolean;
}

// Source platform definition
interface SourcePlatform {
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
  apiConnected: boolean;
  lastSync: string | null;
}

// Team member definition
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "reviewer" | "analyst";
  avatar: string;
  status: "active" | "invited" | "inactive";
}

const defaultThresholds: ScoringThresholds = {
  confidenceMinimum: 60,
  monetizationMinimum: 50,
  urgencyMinimum: 40,
  autoApproveThreshold: 95,
  highPriorityThreshold: 85,
};

const defaultCategories: Category[] = [
  { id: "1", name: "Fan Travel", slug: "fan-travel", color: "bg-blue-500", enabled: true },
  { id: "2", name: "Concert Demand", slug: "concert-demand", color: "bg-purple-500", enabled: true },
  { id: "3", name: "Supporter Trip", slug: "supporter-trip", color: "bg-green-500", enabled: true },
  { id: "4", name: "Group Surf Trip", slug: "group-surf-trip", color: "bg-cyan-500", enabled: true },
  { id: "5", name: "Expat Travel", slug: "expat-travel", color: "bg-amber-500", enabled: true },
  { id: "6", name: "Charter", slug: "charter", color: "bg-rose-500", enabled: true },
];

const defaultPlatforms: SourcePlatform[] = [
  { id: "1", name: "Reddit", slug: "reddit", enabled: true, apiConnected: true, lastSync: "2024-01-15T10:30:00Z" },
  { id: "2", name: "X (Twitter)", slug: "twitter", enabled: true, apiConnected: true, lastSync: "2024-01-15T10:25:00Z" },
  { id: "3", name: "Facebook Groups", slug: "facebook", enabled: true, apiConnected: true, lastSync: "2024-01-15T09:45:00Z" },
  { id: "4", name: "Telegram", slug: "telegram", enabled: true, apiConnected: false, lastSync: null },
  { id: "5", name: "Discord", slug: "discord", enabled: false, apiConnected: false, lastSync: null },
  { id: "6", name: "Web Scraping", slug: "web", enabled: true, apiConnected: true, lastSync: "2024-01-15T08:00:00Z" },
];

const defaultTeamMembers: TeamMember[] = [
  { id: "1", name: "Sarah Chen", email: "sarah@goflexxi.com", role: "admin", avatar: "SC", status: "active" },
  { id: "2", name: "Marcus Johnson", email: "marcus@goflexxi.com", role: "reviewer", avatar: "MJ", status: "active" },
  { id: "3", name: "Emily Rodriguez", email: "emily@goflexxi.com", role: "reviewer", avatar: "ER", status: "active" },
  { id: "4", name: "David Kim", email: "david@goflexxi.com", role: "analyst", avatar: "DK", status: "active" },
  { id: "5", name: "Alex Thompson", email: "alex@goflexxi.com", role: "analyst", avatar: "AT", status: "invited" },
];

function formatDate(dateString: string | null): string {
  if (!dateString) return "Never";
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getRoleBadgeColor(role: string) {
  switch (role) {
    case "admin":
      return "bg-primary/20 text-primary border-primary/30";
    case "reviewer":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "analyst":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    default:
      return "bg-secondary text-muted-foreground";
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline\" className="border-success/30 bg-success/20 text-success">
          Active
        </Badge>
      );
    case "invited":
      return (
        <Badge variant="outline" className="border-amber-500/30 bg-amber-500/20 text-amber-400">
          Invited
        </Badge>
      );
    case "inactive":
      return (
        <Badge variant="outline" className="border-muted-foreground/30 bg-muted text-muted-foreground">
          Inactive
        </Badge>
      );
    default:
      return null;
  }
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("scoring");
  const [thresholds, setThresholds] = useState<ScoringThresholds>(defaultThresholds);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [platforms, setPlatforms] = useState<SourcePlatform[]>(defaultPlatforms);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultTeamMembers);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(true);

  // New member dialog
  const [newMemberOpen, setNewMemberOpen] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<"admin" | "reviewer" | "analyst">("reviewer");

  // New category dialog
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const updateThreshold = (key: keyof ScoringThresholds, value: number) => {
    setThresholds((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const toggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, enabled: !cat.enabled } : cat))
    );
    setHasChanges(true);
  };

  const togglePlatform = (id: string) => {
    setPlatforms((prev) =>
      prev.map((plat) => (plat.id === id ? { ...plat, enabled: !plat.enabled } : plat))
    );
    setHasChanges(true);
  };

  const updateMemberRole = (id: string, role: "admin" | "reviewer" | "analyst") => {
    setTeamMembers((prev) =>
      prev.map((member) => (member.id === id ? { ...member, role } : member))
    );
    setHasChanges(true);
  };

  const removeMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
    setHasChanges(true);
  };

  const addMember = () => {
    if (!newMemberEmail) return;
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: newMemberEmail.split("@")[0],
      email: newMemberEmail,
      role: newMemberRole,
      avatar: newMemberEmail.substring(0, 2).toUpperCase(),
      status: "invited",
    };
    setTeamMembers((prev) => [...prev, newMember]);
    setNewMemberEmail("");
    setNewMemberRole("reviewer");
    setNewMemberOpen(false);
    setHasChanges(true);
  };

  const addCategory = () => {
    if (!newCategoryName) return;
    const slug = newCategoryName.toLowerCase().replace(/\s+/g, "-");
    const colors = ["bg-indigo-500", "bg-pink-500", "bg-teal-500", "bg-orange-500"];
    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      slug,
      color: colors[Math.floor(Math.random() * colors.length)],
      enabled: true,
    };
    setCategories((prev) => [...prev, newCategory]);
    setNewCategoryName("");
    setNewCategoryOpen(false);
    setHasChanges(true);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setHasChanges(false);
  };

  const handleReset = () => {
    setThresholds(defaultThresholds);
    setCategories(defaultCategories);
    setPlatforms(defaultPlatforms);
    setTeamMembers(defaultTeamMembers);
    setHasChanges(false);
  };

  return (
    <DashboardLayout>
      <Topbar title="Settings" description="Configure platform settings and preferences" />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl">
          {/* Save Bar */}
          {hasChanges && (
            <div className="mb-6 flex items-center justify-between rounded-lg border border-warning/30 bg-warning/10 p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <p className="text-sm font-medium text-foreground">
                  You have unsaved changes
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleReset} className="border-border">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button size="sm" onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-secondary">
              <TabsTrigger value="scoring" className="gap-2">
                <Sliders className="h-4 w-4" />
                <span className="hidden sm:inline">Scoring</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="gap-2">
                <Tag className="h-4 w-4" />
                <span className="hidden sm:inline">Categories</span>
              </TabsTrigger>
              <TabsTrigger value="sources" className="gap-2">
                <Radio className="h-4 w-4" />
                <span className="hidden sm:inline">Sources</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Team</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="gap-2">
                <Key className="h-4 w-4" />
                <span className="hidden sm:inline">API</span>
              </TabsTrigger>
            </TabsList>

            {/* Scoring Thresholds Tab */}
            <TabsContent value="scoring" className="space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Opportunity Scoring Thresholds</CardTitle>
                  </div>
                  <CardDescription>
                    Set minimum scores for opportunities to appear in the pipeline
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Confidence Minimum */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Confidence Score Minimum</p>
                        <p className="text-sm text-muted-foreground">
                          Minimum AI confidence required for an opportunity to be considered
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Input
                          type="number"
                          value={thresholds.confidenceMinimum}
                          onChange={(e) => updateThreshold("confidenceMinimum", Number(e.target.value))}
                          min="0"
                          max="100"
                          className="w-20 bg-secondary text-center"
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-destructive via-warning to-success transition-all"
                        style={{ width: `${thresholds.confidenceMinimum}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low (0%)</span>
                      <span>Medium (50%)</span>
                      <span>High (100%)</span>
                    </div>
                  </div>

                  {/* Monetization Minimum */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Monetization Score Minimum</p>
                        <p className="text-sm text-muted-foreground">
                          Minimum revenue potential score for opportunities
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Input
                          type="number"
                          value={thresholds.monetizationMinimum}
                          onChange={(e) => updateThreshold("monetizationMinimum", Number(e.target.value))}
                          min="0"
                          max="100"
                          className="w-20 bg-secondary text-center"
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-muted-foreground via-primary to-primary transition-all"
                        style={{ width: `${thresholds.monetizationMinimum}%` }}
                      />
                    </div>
                  </div>

                  {/* Urgency Minimum */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Urgency Score Minimum</p>
                        <p className="text-sm text-muted-foreground">
                          Minimum urgency level based on event proximity
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Input
                          type="number"
                          value={thresholds.urgencyMinimum}
                          onChange={(e) => updateThreshold("urgencyMinimum", Number(e.target.value))}
                          min="0"
                          max="100"
                          className="w-20 bg-secondary text-center"
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-muted-foreground via-amber-500 to-destructive transition-all"
                        style={{ width: `${thresholds.urgencyMinimum}%` }}
                      />
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Automation Thresholds
                    </h4>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="rounded-lg border border-border bg-secondary/30 p-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <p className="font-medium text-foreground">Auto-Approve Threshold</p>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Opportunities above this confidence score are auto-approved
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <Input
                            type="number"
                            value={thresholds.autoApproveThreshold}
                            onChange={(e) => updateThreshold("autoApproveThreshold", Number(e.target.value))}
                            min="0"
                            max="100"
                            className="w-20 bg-secondary text-center"
                          />
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </div>

                      <div className="rounded-lg border border-border bg-secondary/30 p-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-warning" />
                          <p className="font-medium text-foreground">High Priority Threshold</p>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Mark opportunities as high priority above this score
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <Input
                            type="number"
                            value={thresholds.highPriorityThreshold}
                            onChange={(e) => updateThreshold("highPriorityThreshold", Number(e.target.value))}
                            min="0"
                            max="100"
                            className="w-20 bg-secondary text-center"
                          />
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Category Management</CardTitle>
                    </div>
                    <Dialog open={newCategoryOpen} onOpenChange={setNewCategoryOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Category
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="border-border bg-card">
                        <DialogHeader>
                          <DialogTitle>Add New Category</DialogTitle>
                          <DialogDescription>
                            Create a new opportunity category for classification
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                              Category Name
                            </label>
                            <Input
                              placeholder="e.g., Festival Travel"
                              value={newCategoryName}
                              onChange={(e) => setNewCategoryName(e.target.value)}
                              className="bg-secondary"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setNewCategoryOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={addCategory} disabled={!newCategoryName}>
                            Add Category
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <CardDescription>
                    Configure opportunity categories for classification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Category</TableHead>
                        <TableHead className="text-muted-foreground">Slug</TableHead>
                        <TableHead className="text-center text-muted-foreground">Status</TableHead>
                        <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id} className="border-border">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`h-3 w-3 rounded-full ${category.color}`} />
                              <span className="font-medium text-foreground">{category.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <code className="rounded bg-secondary px-2 py-1 text-xs text-muted-foreground">
                              {category.slug}
                            </code>
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={category.enabled}
                              onCheckedChange={() => toggleCategory(category.id)}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil className="h-4 w-4 text-muted-foreground" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => deleteCategory(category.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sources Tab */}
            <TabsContent value="sources" className="space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Radio className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Source Platform Management</CardTitle>
                  </div>
                  <CardDescription>
                    Enable or disable data sources for opportunity discovery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Platform</TableHead>
                        <TableHead className="text-muted-foreground">API Status</TableHead>
                        <TableHead className="text-muted-foreground">Last Sync</TableHead>
                        <TableHead className="text-center text-muted-foreground">Enabled</TableHead>
                        <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {platforms.map((platform) => (
                        <TableRow key={platform.id} className="border-border">
                          <TableCell>
                            <span className="font-medium text-foreground">{platform.name}</span>
                          </TableCell>
                          <TableCell>
                            {platform.apiConnected ? (
                              <Badge variant="outline" className="border-success/30 bg-success/20 text-success">
                                Connected
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-muted-foreground/30 bg-muted text-muted-foreground">
                                Not Connected
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(platform.lastSync)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={platform.enabled}
                              onCheckedChange={() => togglePlatform(platform.id)}
                              disabled={!platform.apiConnected}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="border-border">
                              {platform.apiConnected ? "Reconnect" : "Connect"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Team & Reviewer Roles</CardTitle>
                    </div>
                    <Dialog open={newMemberOpen} onOpenChange={setNewMemberOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Invite Member
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="border-border bg-card">
                        <DialogHeader>
                          <DialogTitle>Invite Team Member</DialogTitle>
                          <DialogDescription>
                            Send an invitation to join the team
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                              Email Address
                            </label>
                            <Input
                              type="email"
                              placeholder="colleague@company.com"
                              value={newMemberEmail}
                              onChange={(e) => setNewMemberEmail(e.target.value)}
                              className="bg-secondary"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Role</label>
                            <Select value={newMemberRole} onValueChange={(v) => setNewMemberRole(v as typeof newMemberRole)}>
                              <SelectTrigger className="bg-secondary">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin - Full access</SelectItem>
                                <SelectItem value="reviewer">Reviewer - Can approve/reject</SelectItem>
                                <SelectItem value="analyst">Analyst - Read-only access</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setNewMemberOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={addMember} disabled={!newMemberEmail}>
                            Send Invitation
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <CardDescription>
                    Manage team members and their access levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border border-primary/30 bg-primary/10 p-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-foreground">Admin</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Full system access, settings management, team administration
                      </p>
                    </div>
                    <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-400" />
                        <span className="font-semibold text-foreground">Reviewer</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Review opportunities, approve/reject, add comments
                      </p>
                    </div>
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                      <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-amber-400" />
                        <span className="font-semibold text-foreground">Analyst</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        View dashboard, analyze data, export reports
                      </p>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Member</TableHead>
                        <TableHead className="text-muted-foreground">Role</TableHead>
                        <TableHead className="text-muted-foreground">Status</TableHead>
                        <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamMembers.map((member) => (
                        <TableRow key={member.id} className="border-border">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
                                {member.avatar}
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={member.role}
                              onValueChange={(v) => updateMemberRole(member.id, v as typeof member.role)}
                            >
                              <SelectTrigger className={`h-8 w-28 border ${getRoleBadgeColor(member.role)}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="reviewer">Reviewer</SelectItem>
                                <SelectItem value="analyst">Analyst</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>{getStatusBadge(member.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => removeMember(member.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Notification Settings</CardTitle>
                  </div>
                  <CardDescription>Configure how you receive updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive daily digest and important alerts
                        </p>
                      </div>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                    <div className="flex items-center gap-3">
                      <Webhook className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Slack Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Get real-time updates in Slack
                        </p>
                      </div>
                    </div>
                    <Switch checked={slackNotifications} onCheckedChange={setSlackNotifications} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Tab */}
            <TabsContent value="api" className="space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">API Access</CardTitle>
                  </div>
                  <CardDescription>Manage API keys and webhooks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">API Key</label>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        defaultValue="sk_live_xxxxxxxxxxxxxxxxxxxx"
                        disabled
                        className="bg-secondary font-mono text-sm"
                      />
                      <Button variant="outline" className="border-border">
                        Regenerate
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Webhook URL</label>
                    <Input placeholder="https://your-app.com/webhook" className="bg-secondary" />
                  </div>
                  <Button>Save API Settings</Button>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Data Management</CardTitle>
                  </div>
                  <CardDescription>Export data and manage storage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <div>
                      <p className="font-medium text-foreground">Export All Data</p>
                      <p className="text-sm text-muted-foreground">
                        Download all opportunities and reviews as CSV
                      </p>
                    </div>
                    <Button variant="outline" className="border-border">
                      <Globe className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-destructive/10 p-4">
                    <div>
                      <p className="font-medium text-foreground">Delete All Data</p>
                      <p className="text-sm text-muted-foreground">
                        Permanently remove all opportunities and reviews
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}
