import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_ROOMS } from '../data/mockRooms';
import { Room } from '../types';
import { RoomCard } from '../components/RoomCard';

const BUILDINGS = ['Tất cả', 'Tòa A', 'Tòa B', 'Tòa C', 'Tòa V'];
const AMENITIES = ['Tất cả', 'Máy chiếu', 'Bảng trắng', 'Máy tính cấu hình cao', 'Điều hòa'];

export const HomeScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('Tất cả');
  const [selectedAmenity, setSelectedAmenity] = useState('Tất cả');

  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter((room) => {
      const matchSearch = room.name.toLowerCase().includes(search.toLowerCase());
      const matchBuilding = selectedBuilding === 'Tất cả' || room.building === selectedBuilding;
      const matchAmenity = selectedAmenity === 'Tất cả' || room.amenities.includes(selectedAmenity);
      return matchSearch && matchBuilding && matchAmenity;
    });
  }, [search, selectedBuilding, selectedAmenity]);

  const handleOpenBooking = useCallback((room: Room) => {
    navigation.navigate('BookingModal', { room });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>VKU Study Space 🎓</Text>
        <Text style={styles.subtitle}>Đặt trước phòng học & phòng máy tức thì</Text>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#94A3B8" />
          <TextInput
            placeholder="Tìm theo tên phòng học..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {BUILDINGS.map((b) => (
            <TouchableOpacity
              key={b}
              style={[styles.chip, selectedBuilding === b && styles.activeChip]}
              onPress={() => setSelectedBuilding(b)}
            >
              <Text style={[styles.chipText, selectedBuilding === b && styles.activeChipText]}>{b}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <RoomCard
            room={item}
            onPressBook={handleOpenBooking}
            isAvailableNow={index % 2 === 0}
          />
        )}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 16, backgroundColor: '#FFF' },
  title: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  subtitle: { fontSize: 13, color: '#64748B', marginBottom: 12 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    gap: 8,
  },
  input: { flex: 1, fontSize: 14 },
  filterScroll: { marginTop: 12, flexDirection: 'row' },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  activeChip: { backgroundColor: '#3B82F6' },
  chipText: { fontSize: 12, color: '#475569', fontWeight: '600' },
  activeChipText: { color: '#FFF' },
});