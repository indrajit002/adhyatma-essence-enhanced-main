/**
 * Global API call debouncing utility
 * Prevents duplicate API calls across the application
 */

class ApiDebounceManager {
  private static pendingRequests = new Map<string, Promise<unknown>>();
  private static requestTimeouts = new Map<string, NodeJS.Timeout>();

  /**
   * Debounce an API call to prevent duplicates
   */
  static async debounce<T>(
    key: string,
    apiCall: () => Promise<T>,
    delay: number = 300
  ): Promise<T> {
    // Clear any existing timeout for this key
    if (this.requestTimeouts.has(key)) {
      clearTimeout(this.requestTimeouts.get(key)!);
      this.requestTimeouts.delete(key);
    }

    // If there's already a pending request, return it
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)! as Promise<T>;
    }

    // Create a new promise for this request
    const requestPromise = new Promise<T>((resolve, reject) => {
      const timeoutId = setTimeout(async () => {
        try {
          const result = await apiCall();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          // Clean up
          this.pendingRequests.delete(key);
          this.requestTimeouts.delete(key);
        }
      }, delay);

      this.requestTimeouts.set(key, timeoutId);
    });

    this.pendingRequests.set(key, requestPromise);
    return requestPromise;
  }

  /**
   * Cancel a pending request
   */
  static cancel(key: string): void {
    if (this.requestTimeouts.has(key)) {
      clearTimeout(this.requestTimeouts.get(key)!);
      this.requestTimeouts.delete(key);
    }
    this.pendingRequests.delete(key);
  }

  /**
   * Clear all pending requests
   */
  static clearAll(): void {
    this.requestTimeouts.forEach(timeout => clearTimeout(timeout));
    this.requestTimeouts.clear();
    this.pendingRequests.clear();
  }

  /**
   * Get the number of pending requests
   */
  static getPendingCount(): number {
    return this.pendingRequests.size;
  }
}

export default ApiDebounceManager;
