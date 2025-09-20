import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">
                  Application Error
                </h3>
              </div>
            </div>
            
            <div className="mt-2">
              <p className="text-sm text-red-700 mb-4">
                Something went wrong while loading the application. This is usually due to a configuration issue.
              </p>
              
              <div className="bg-red-100 border border-red-200 rounded-md p-3 mb-4">
                <h4 className="text-sm font-medium text-red-800 mb-2">Error Details:</h4>
                <p className="text-xs text-red-700 font-mono break-all">
                  {this.state.error?.message || 'Unknown error'}
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">Common Solutions:</h4>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• Check if your .env file exists and has correct Supabase credentials</li>
                  <li>• Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set</li>
                  <li>• Restart the development server after adding .env file</li>
                  <li>• Check the browser console for more details</li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Reload Page
                </button>
                <button
                  onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
