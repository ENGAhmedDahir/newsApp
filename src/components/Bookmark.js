import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TopNews from './TopNews';
import { useBookmarks } from '../BookmarkContext';
import { useNavigation } from '@react-navigation/native'; // Ensure correct import for navigation

const Bookmark = () => {
  const { bookmarks } = useBookmarks();
  const navigation = useNavigation(); 

  const handlePress = (news) => {
    console.log('Navigating to Details with:', news); // Debugging log
    navigation.navigate('Details', { newsData: news });
  };

  return (
    <View style={styles.container}>
      {bookmarks.length === 0 ? (
        <Text style={styles.noBookmarksText}>No bookmarks available.</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id} // Ensure unique `id` is provided
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <TopNews data={item} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c',
    padding: 16,
  },
  noBookmarksText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Bookmark;
