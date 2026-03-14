"use client";

import { Bell, Search, User, Calendar, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface TopbarProps {
  title: string;
  description?: string;
}

export function Topbar({ title, description }: TopbarProps) {
  const [timeRange, setTimeRange] = useState("this-week");

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-card/95 px-6 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {/* Time Range Filter */}
        <div className="hidden lg:block">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-9 w-[140px] border-border bg-secondary/50 text-sm">
              <Calendar className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Enhanced Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search opportunities, sources, reviews..."
            className="h-10 w-80 rounded-lg border-border bg-secondary/50 pl-10 pr-4 text-sm placeholder:text-muted-foreground/70 focus:bg-secondary focus:ring-2 focus:ring-primary/20 lg:w-96"
          />
          <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground lg:inline-block">
            ⌘K
          </kbd>
        </div>

        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-lg hover:bg-secondary"
        >
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-10 items-center gap-2 rounded-lg px-2 hover:bg-secondary"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary">
                <span className="text-xs font-semibold text-primary-foreground">
                  AD
                </span>
              </div>
              <div className="hidden flex-col items-start md:flex">
                <span className="text-sm font-medium text-foreground">
                  Admin User
                </span>
                <span className="text-[10px] text-muted-foreground">
                  admin@goflexxi.com
                </span>
              </div>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">
                  admin@goflexxi.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Notification Preferences</DropdownMenuItem>
            <DropdownMenuItem>Team Management</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
