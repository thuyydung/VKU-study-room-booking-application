import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Booking } from '../types';
import { scheduleCheckInReminder, cancelReminder } from '../services/notificationService';

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'bookedAt' | 'notificationId'>, startHour: number, startMinute: number) => Promise<boolean>;
  cancelBooking: (id: string) => Promise<void>;
  isSlotBooked: (roomId: string, date: string, slotId: string) => boolean;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],

      isSlotBooked: (roomId, date, slotId) => {
        return get().bookings.some(
          (b) => b.roomId === roomId && b.date === date && b.slotId === slotId
        );
      },

      addBooking: async (payload, startHour, startMinute) => {
        const alreadyBooked = get().isSlotBooked(payload.roomId, payload.date, payload.slotId);
        if (alreadyBooked) return false;

        const notifId = await scheduleCheckInReminder(
          payload.roomName,
          payload.date,
          startHour,
          startMinute
        );

        const newBooking: Booking = {
          ...payload,
          id: `BK-${Date.now().toString().slice(-6)}`,
          bookedAt: new Date().toISOString(),
          notificationId: notifId,
        };

        set((state) => ({ bookings: [newBooking, ...state.bookings] }));
        return true;
      },

      cancelBooking: async (id) => {
        const target = get().bookings.find((b) => b.id === id);
        if (target?.notificationId) {
          await cancelReminder(target.notificationId);
        }
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        }));
      },
    }),
    {
      name: 'vku-booking-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);