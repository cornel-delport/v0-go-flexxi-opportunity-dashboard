'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center">
      <div className="rounded-full bg-destructive/10 p-4">
        <Lock className="h-12 w-12 text-destructive" />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Access Denied
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        You do not have the required permissions to access this page.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        If you believe this is an error, please contact your system administrator.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Button asChild>
          <Link href="/">Return to Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/help">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
