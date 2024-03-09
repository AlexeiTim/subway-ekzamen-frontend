export interface Notification {
  error(message: string): void

  warning(message: string): void

  success(message: string): void
}
