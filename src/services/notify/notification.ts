import type { Notification } from '@/types/notify'
import { ElNotification } from 'element-plus'

export class NotificationService implements Notification {
  duration: number = 2000

  error(message: string): void {
    ElNotification({
      type: 'error',
      message,
      duration: this.duration
    })
  }

  warning(message: string): void {
    ElNotification({
      type: 'warning',
      message,
      duration: this.duration
    })
  }

  success(message: string): void {
    ElNotification({
      type: 'success',
      message,
      duration: this.duration
    })
  }
}
