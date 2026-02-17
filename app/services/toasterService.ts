class ToastService {
  private static callback: ((message: string, type: 'success' | 'error' | 'warning' | 'info') => void) | null = null;

  static register(callback: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void) {
    ToastService.callback = callback;
  }

  static showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    if (ToastService.callback) {
      ToastService.callback(message, type);
    } else {
      console.warn('ToastService: No callback registered.');
    }
  }
}

export default ToastService;
