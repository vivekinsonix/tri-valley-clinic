class SpinnerService {
  private static callback: ((loading: boolean) => void) | null = null;

  static register(callback: (loading: boolean) => void) {
    SpinnerService.callback = callback;
  }

  static showSpinner() {
    if (SpinnerService.callback) {
      SpinnerService.callback(true);
    } else {
      console.warn('SpinnerService: No callback registered.');
    }
  }

  static hideSpinner() {
    if (SpinnerService.callback) {
      SpinnerService.callback(false);
    } else {
      console.warn('SpinnerService: No callback registered.');
    }
  }
}

export default SpinnerService;
