"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Link as LinkIcon,
  FileText,
  MapPin,
  Users,
  Tag,
  MessageSquare,
  CheckCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import type { OpportunityType, SourceType } from "@/lib/types";

const sourceOptions: { value: SourceType; label: string }[] = [
  { value: "reddit", label: "Reddit" },
  { value: "twitter", label: "X (Twitter)" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "discord", label: "Discord" },
  { value: "telegram", label: "Telegram" },
  { value: "forum", label: "Other Forum" },
];

const categoryOptions: { value: OpportunityType; label: string }[] = [
  { value: "fan-travel", label: "Fan Travel" },
  { value: "concert-demand", label: "Concert Demand" },
  { value: "supporter-trip", label: "Supporter Trip" },
  { value: "surf-trip", label: "Surf Trip" },
  { value: "expat-travel", label: "Expat Travel" },
  { value: "charter", label: "Charter" },
];

interface FormData {
  sourcePlatform: SourceType | "";
  sourceUrl: string;
  sourceContent: string;
  category: OpportunityType | "";
  targetCity: string;
  estimatedGroupSize: string;
  notes: string;
}

interface FormErrors {
  sourcePlatform?: string;
  sourceUrl?: string;
  sourceContent?: string;
  category?: string;
  targetCity?: string;
  estimatedGroupSize?: string;
}

export default function SubmitOpportunityPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    sourcePlatform: "",
    sourceUrl: "",
    sourceContent: "",
    category: "",
    targetCity: "",
    estimatedGroupSize: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.sourcePlatform) {
      newErrors.sourcePlatform = "Please select a source platform";
    }

    if (!formData.sourceUrl) {
      newErrors.sourceUrl = "Please enter the source URL";
    } else if (!formData.sourceUrl.match(/^https?:\/\/.+/)) {
      newErrors.sourceUrl = "Please enter a valid URL starting with http:// or https://";
    }

    if (!formData.sourceContent) {
      newErrors.sourceContent = "Please enter the source content";
    } else if (formData.sourceContent.length < 20) {
      newErrors.sourceContent = "Please enter at least 20 characters";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.targetCity) {
      newErrors.targetCity = "Please enter the target city";
    }

    if (!formData.estimatedGroupSize) {
      newErrors.estimatedGroupSize = "Please enter an estimated group size";
    } else if (isNaN(parseInt(formData.estimatedGroupSize)) || parseInt(formData.estimatedGroupSize) < 1) {
      newErrors.estimatedGroupSize = "Please enter a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Redirect to reviews page after 2 seconds
    setTimeout(() => {
      router.push("/reviews");
    }, 2000);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <DashboardLayout>
        <div className="flex flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-2xl">
              <Card className="border-primary/30 bg-card">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-foreground">
                    Opportunity Submitted
                  </h2>
                  <p className="mb-6 text-center text-muted-foreground">
                    Your opportunity has been added to the review queue. <br />
                    Redirecting to the Reviews page...
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" asChild>
                      <Link href="/submit">Submit Another</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/reviews">View Review Queue</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-2xl space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild className="shrink-0">
                <Link href="/opportunities">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Submit Opportunity
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manually add a new opportunity to the review queue
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Card className="border-border bg-card">
                <CardHeader className="border-b border-border bg-secondary/20">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PlusCircle className="h-5 w-5 text-primary" />
                    Opportunity Details
                  </CardTitle>
                  <CardDescription>
                    Fill in the details of the opportunity you discovered
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Source Platform */}
                  <div className="space-y-2">
                    <Label htmlFor="sourcePlatform" className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      Source Platform <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.sourcePlatform}
                      onValueChange={(value) => updateField("sourcePlatform", value)}
                    >
                      <SelectTrigger
                        id="sourcePlatform"
                        className={errors.sourcePlatform ? "border-destructive" : ""}
                      >
                        <SelectValue placeholder="Select the platform where you found this" />
                      </SelectTrigger>
                      <SelectContent>
                        {sourceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.sourcePlatform && (
                      <p className="text-xs text-destructive">{errors.sourcePlatform}</p>
                    )}
                  </div>

                  {/* Source URL */}
                  <div className="space-y-2">
                    <Label htmlFor="sourceUrl" className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      Source URL <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="sourceUrl"
                      type="url"
                      placeholder="https://reddit.com/r/..."
                      value={formData.sourceUrl}
                      onChange={(e) => updateField("sourceUrl", e.target.value)}
                      className={errors.sourceUrl ? "border-destructive" : ""}
                    />
                    {errors.sourceUrl && (
                      <p className="text-xs text-destructive">{errors.sourceUrl}</p>
                    )}
                  </div>

                  {/* Source Content */}
                  <div className="space-y-2">
                    <Label htmlFor="sourceContent" className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      Source Text Content <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="sourceContent"
                      placeholder="Paste the relevant text content from the source..."
                      value={formData.sourceContent}
                      onChange={(e) => updateField("sourceContent", e.target.value)}
                      rows={5}
                      className={errors.sourceContent ? "border-destructive" : ""}
                    />
                    {errors.sourceContent && (
                      <p className="text-xs text-destructive">{errors.sourceContent}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {formData.sourceContent.length} characters
                    </p>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      Category <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => updateField("category", value)}
                    >
                      <SelectTrigger
                        id="category"
                        className={errors.category ? "border-destructive" : ""}
                      >
                        <SelectValue placeholder="Select the opportunity category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-xs text-destructive">{errors.category}</p>
                    )}
                  </div>

                  {/* Target City & Group Size */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="targetCity" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        Target City <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="targetCity"
                        placeholder="e.g., Manchester, UK"
                        value={formData.targetCity}
                        onChange={(e) => updateField("targetCity", e.target.value)}
                        className={errors.targetCity ? "border-destructive" : ""}
                      />
                      {errors.targetCity && (
                        <p className="text-xs text-destructive">{errors.targetCity}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimatedGroupSize" className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        Estimated Group Size <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="estimatedGroupSize"
                        type="number"
                        min="1"
                        placeholder="e.g., 150"
                        value={formData.estimatedGroupSize}
                        onChange={(e) => updateField("estimatedGroupSize", e.target.value)}
                        className={errors.estimatedGroupSize ? "border-destructive" : ""}
                      />
                      {errors.estimatedGroupSize && (
                        <p className="text-xs text-destructive">{errors.estimatedGroupSize}</p>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      Notes <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any additional context or observations..."
                      value={formData.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-3 border-t border-border pt-6">
                    <Button type="button" variant="outline" asChild>
                      <Link href="/opportunities">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Submit to Review Queue
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>

            {/* Tips Card */}
            <Card className="border-border/50 bg-secondary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Tips for Quality Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    Include the full URL to the original post or thread
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    Copy the most relevant text that shows group demand signals
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    Be specific about the target city and estimated group size
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    Add notes about timing, urgency, or any red flags
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
