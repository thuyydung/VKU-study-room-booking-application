import React, { memo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onPressBook: (room: Room) => void;
  isAvailableNow: boolean;
}

export const RoomCard = memo(({ room, onPressBook, isAvailableNow }: RoomCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: room.imageUrl }} style={styles.image} />
      
      <View style={[styles.statusBadge, isAvailableNow ? styles.bgAvailable : styles.bgOccupied]}>
        <Text style={styles.statusText}>{isAvailableNow ? '● Sẵn sàng' : '● Đang bận'}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.roomName}>{room.name}</Text>
          <View style={styles.badgeBuilding}>
            <Text style={styles.buildingText}>{room.building}</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="people-outline" size={16} color="#64748B" />
          <Text style={styles.metaText}>Sức chứa: {room.capacity} người (Tầng {room.floor})</Text>
        </View>

        <View style={styles.tagsContainer}>
          {room.amenities.map((item, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.bookButton} activeOpacity={0.8} onPress={() => onPressBook(room)}>
          <Text style={styles.bookButtonText}>Đặt lịch ngay</Text>
          <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
  },
  image: { width: '100%', height: 140 },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  bgAvailable: { backgroundColor: '#10B981' },
  bgOccupied: { backgroundColor: '#EF4444' },
  statusText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  content: { padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  roomName: { fontSize: 16, fontWeight: '700', color: '#1E293B', flex: 1 },
  badgeBuilding: { backgroundColor: '#EEF2FF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  buildingText: { color: '#4F46E5', fontWeight: '700', fontSize: 12 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 6 },
  metaText: { fontSize: 13, color: '#64748B' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginVertical: 12 },
  tag: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tagText: { color: '#475569', fontSize: 11, fontWeight: '500' },
  bookButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  bookButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
});