import { Component, ReactNode, ErrorInfo } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary - Production-grade error handling for A.R.I.S.E. application
 * Catches JavaScript errors anywhere in the child component tree and displays
 * a fallback UI instead of crashing the entire application.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to monitoring service in production
    this.logError(error, errorInfo);
  }

  private logError(_error: Error, _errorInfo: ErrorInfo): void {
    // In production, this would send to an error tracking service
    // like Sentry, LogRocket, or custom logging endpoint
    if (import.meta.env.PROD) {
      // Example: sentry.captureException(error, { extra: errorInfo });
      // Example: fetch('/api/log-error', { method: 'POST', body: JSON.stringify({ error, errorInfo }) });
    }
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  private handleGoHome = (): void => {
    window.location.href = "/";
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-md w-full">
            <div className="glass-panel p-8 text-center">
              <div className="p-4 rounded-2xl bg-risk-high/10 w-fit mx-auto mb-6">
                <AlertTriangle className="h-10 w-10 text-risk-high" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Something went wrong
              </h1>
              
              <p className="text-muted-foreground mb-6">
                We apologize for the inconvenience. The A.R.I.S.E. system encountered an unexpected error.
              </p>

              {import.meta.env.DEV && this.state.error && (
                <div className="text-left mb-6 p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-auto max-h-40">
                  <p className="text-risk-high font-semibold mb-2">Error: {this.state.error.message}</p>
                  {this.state.errorInfo && (
                    <pre className="text-muted-foreground whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="hero" onClick={this.handleReload}>
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Reload Page
                </Button>
                <Button variant="hero-outline" onClick={this.handleGoHome}>
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-6">
                If this issue persists, please contact support at{" "}
                <a href="mailto:support@arise-platform.edu" className="text-primary hover:underline">
                  support@arise-platform.edu
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
