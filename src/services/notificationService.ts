import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const initNotifications = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('booking-reminders', {
      name: 'Booking Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

export const scheduleCheckInReminder = async (
  roomName: string,
  dateStr: string,
  startHour: number,
  startMinute: number
): Promise<string | undefined> => {
  try {
    const triggerDate = new Date(`${dateStr}T00:00:00`);
    triggerDate.setHours(startHour, startMinute - 15, 0, 0); // Nhắc trước 15 phút

    if (triggerDate.getTime() <= Date.now()) {
      return undefined;
    }

    return await Notifications.scheduleNotificationAsync({
      content: {
        title: '🔔 Nhắc nhở ca học VKU',
        body: `Bạn có ca đặt phòng tại ${roomName} sau 15 phút nữa. Mở app để quét mã QR!`,
        data: { screen: 'MyBookings' },
      },
      trigger: triggerDate,
    });
  } catch {
    return undefined;
  }
};

export const cancelReminder = async (notificationId?: string) => {
  if (notificationId) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }
};