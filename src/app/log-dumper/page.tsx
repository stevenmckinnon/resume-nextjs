"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";
import { LogDevTools, LogDumper, useLogger } from "@stevenmckinnon/log-dumper";
import {
  AlertTriangle,
  Bug,
  CheckCircle2,
  Download,
  ExternalLinkIcon,
  FileCode,
  Logs,
  Minus,
  Plus,
  Shield,
  Trash2,
  XCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

// Example typed context for type-safe logging
interface AppLogContext {
  count?: number;
  component?: string;
  action?: string;
  userId?: string;
}

// Component that deliberately throws an error (to test error boundary)
const BuggyComponent = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("This is a deliberate error to test the Error Boundary!");
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => setShouldThrow(true)}
    >
      <Bug className="h-4 w-4" />
      Trigger Crash (Error Boundary)
    </Button>
  );
};

// Demo component using named logger
const AuthSection = () => {
  const { logInfo, logWarn, logError } = useLogger<AppLogContext>("auth", {
    forwardToConsole: true,
  });

  return (
    <Card className="border-purple-200 bg-purple-50/50 dark:border-purple-900 dark:bg-purple-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
          <Shield className="h-5 w-5" />
          Auth Section (Named Logger)
        </CardTitle>
        <CardDescription>
          Demonstrates scoped logging with named loggers for different modules.
          These logs are visible in the browser's console.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              logInfo("User logged in", { userId: "user_123", action: "login" })
            }
          >
            Log In
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              logWarn("Session expiring soon", { userId: "user_123" })
            }
          >
            <AlertTriangle className="h-4 w-4" />
            Session Warning
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              logError(new Error("Auth token expired"), { userId: "user_123" })
            }
          >
            <XCircle className="h-4 w-4" />
            Auth Error
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const FeatureBadge = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
    <Icon className="h-3.5 w-3.5" />
    {label}
  </Badge>
);

const DemoContent = () => {
  const [count, setCount] = useState(0);

  // Using typed context with the default logger
  const { logAction, logDebug, logInfo, logWarn, logError } =
    useLogger<AppLogContext>();

  const handleIncrement = () => {
    logDebug("Increment button hover detected", { component: "Counter" });
    logAction("Increment button clicked", { count, component: "Counter" });
    setCount((c) => c + 1);
  };

  const handleDecrement = () => {
    logInfo("Decrement action", { count, component: "Counter" });
    setCount((c) => c - 1);
  };

  const handleWarn = () => {
    logWarn("This is a warning message", { count, action: "warn-test" });
  };

  const handleError = () => {
    try {
      throw new Error("Demo error for testing!");
    } catch (e) {
      logError(e as Error, { count, action: "error-test" });
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
      {/* Hero Section */}
      <BlurFade delay={0.1}>
        <div className="mb-16 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center justify-center"
          >
            <div className="bg-primary/10 rounded-full p-4">
              <Logs className="text-primary h-12 w-12" />
            </div>
          </motion.div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Log Dumper
          </h1>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-lg md:text-xl">
            A powerful, type-safe logging library for React applications with
            error boundaries, DevTools integration, and comprehensive log
            management.
          </p>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <FeatureBadge icon={FileCode} label="TypeScript" />
            <FeatureBadge icon={Shield} label="Error Boundaries" />
            <FeatureBadge icon={Zap} label="Real-time DevTools" />
            <FeatureBadge icon={CheckCircle2} label="Type-safe Context" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link
                href="https://www.npmjs.com/package/@stevenmckinnon/log-dumper"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on npm
                <ExternalLinkIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </BlurFade>

      <Separator className="mb-16" />

      {/* Demo Sections */}
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Counter Section */}
        <BlurFade delay={0.2}>
          <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <Zap className="h-5 w-5" />
                Interactive Counter Demo
              </CardTitle>
              <CardDescription>
                Demonstrates default logger with multiple log levels (debug,
                info, action, warn, error) and typed context
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleDecrement}
                  className="h-14 w-14 rounded-full"
                >
                  <Minus className="h-5 w-5" />
                  <span className="sr-only">Decrement</span>
                </Button>
                <motion.span
                  key={count}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="min-w-[80px] text-center text-5xl font-bold text-green-700 dark:text-green-300"
                >
                  {count}
                </motion.span>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleIncrement}
                  className="h-14 w-14 rounded-full"
                >
                  <Plus className="h-5 w-5" />
                  <span className="sr-only">Increment</span>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWarn}
                  className="border-yellow-500 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-700 dark:border-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-950/20 dark:hover:text-yellow-400"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Log Warning
                </Button>
                <Button variant="destructive" size="sm" onClick={handleError}>
                  <XCircle className="h-4 w-4" />
                  Log Error
                </Button>
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* Named Logger Section */}
        <BlurFade delay={0.3}>
          <AuthSection />
        </BlurFade>

        {/* Error Boundary Test */}
        <BlurFade delay={0.4}>
          <Card className="border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                <Shield className="h-5 w-5" />
                Error Boundary Integration
              </CardTitle>
              <CardDescription className="text-red-600 dark:text-red-400">
                Automatically catches and logs React errors with graceful
                fallback UI. Click the button below to trigger a crash and see
                the error boundary in action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BuggyComponent />
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Actions Footer */}
      <BlurFade delay={0.5}>
        <div className="mt-16 space-y-6">
          <Separator />
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-muted-foreground max-w-md text-sm">
              💡 Open the DevTools panel (bottom-right corner) to view logs in
              real-time with filtering, search, and export capabilities!
              <span className="mt-2 flex items-center justify-center gap-2">
                <span>Press</span>
                <kbd className="bg-muted border-border rounded border px-1.5 py-0.5 font-mono text-xs">
                  ⌘/Ctrl + Shift + D
                </kbd>
                <span>to toggle the DevTool's panel.</span>
              </span>
            </p>
          </div>
        </div>
      </BlurFade>
    </div>
  );
};

const App = () => {
  const { theme } = useTheme();
  return (
    <LogDumper
      maxLogs={200}
      forwardToConsole
      captureErrors
      errorFallback={(error, reset) => (
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <Card className="border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                <Shield className="h-5 w-5" />
                Application Error
              </CardTitle>
              <CardDescription className="text-red-600 dark:text-red-400">
                {error.message}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 text-sm">
                This error was automatically caught and logged by the Error
                Boundary. You can view the full error details in the DevTools
                panel.
              </p>
              <Button variant="destructive" onClick={reset}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    >
      <DemoContent />
      <LogDevTools
        position="bottom-right"
        defaultVisible
        defaultCollapsed
        theme={theme as "dark" | "light"}
        maxHeight={400}
      />
    </LogDumper>
  );
};

export default App;
