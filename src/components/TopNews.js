import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BookmarkIcon, BookmarkSlashIcon } from 'react-native-heroicons/outline';
import { useBookmarks } from '../BookmarkContext';

const TopNews = ({ data, source }) => {
  const navigation = useNavigation();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const bookmarked = isBookmarked(data.id, source);

  const handlePress = () => {
    navigation.navigate('Details', { newsData: data });
  };

  const handleBookmark = () => {
    toggleBookmark(data, source);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.date}>{data.date}</Text>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handleBookmark}
      >
        {bookmarked ? (
          <BookmarkSlashIcon size={30} color="red" />
        ) : (
          <BookmarkIcon size={30} color="yellow" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2d3748',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    color: '#cbd5e0',
    fontSize: 14,
  },
  iconContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
});

export default TopNews;