import { Room, TimeSlot } from '../types';

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'slot-1', label: '07:30 - 09:30', startHour: 7, startMinute: 30 },
  { id: 'slot-2', label: '09:30 - 11:30', startHour: 9, startMinute: 30 },
  { id: 'slot-3', label: '13:00 - 15:00', startHour: 13, startMinute: 0 },
  { id: 'slot-4', label: '15:00 - 17:00', startHour: 15, startMinute: 0 },
];

export const MOCK_ROOMS: Room[] = [
  {
    id: 'room-1',
    name: 'Phòng Lab AI & Data - A302',
    building: 'Tòa A',
    floor: 3,
    capacity: 20,
    amenities: ['Máy tính cấu hình cao', 'Máy chiếu', 'Điều hòa'],
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600',
  },
  {
    id: 'room-2',
    name: 'Không gian sáng tạo Kỹ năng mềm - V201',
    building: 'Tòa V',
    floor: 2,
    capacity: 10,
    amenities: ['Bảng trắng', 'Điều hòa'],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600',
  },
  {
    id: 'room-3',
    name: 'Phòng Hội thảo Nhóm - B105',
    building: 'Tòa B',
    floor: 1,
    capacity: 15,
    amenities: ['Máy chiếu', 'Bảng trắng', 'Điều hòa'],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
  },
  {
    id: 'room-4',
    name: 'Phòng Tự học Chuyên đề - C403',
    building: 'Tòa C',
    floor: 4,
    capacity: 6,
    amenities: ['Điều hòa', 'Bảng trắng'],
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600',
  },
];