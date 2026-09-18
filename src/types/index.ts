export type Building = 'Tòa A' | 'Tòa B' | 'Tòa C' | 'Tòa V';

export interface Room {
  id: string;
  name: string;
  building: Building;
  floor: number;
  capacity: number;
  amenities: string[];
  imageUrl: string;
}

export interface TimeSlot {
  id: string;
  label: string; // "07:30 - 09:30"
  startHour: number;
  startMinute: number;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  building: Building;
  date: string; // YYYY-MM-DD
  slotId: string;
  slotLabel: string;
  bookedAt: string;
  userName: string;
  notificationId?: string;
}