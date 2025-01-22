import React from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import TopNews from "./TopNews";
import { useBookmarks } from "../BookmarkContext";
import { useNavigation } from "@react-navigation/native";

const Bookmark = () => {
  const { bookmarks, clearAllBookmarks } = useBookmarks();
  const navigation = useNavigation();
 
  const renderNewsItem = ({ item }) => {
    if (!item) return null;
    return (
      <TouchableOpacity
        style={styles.newsItem}
        onPress={() => navigation.navigate("Details", { newsData: item })}
      >
        <TopNews data={item} />
      </TouchableOpacity>
    );
  };

  const renderSourceSection = ({ item }) => {
    if (!item || item.length !== 2) return null;
    const [source, sourceBookmarks] = item;
 

    if (!sourceBookmarks || sourceBookmarks.length === 0) return null;

    return (
      <View style={styles.sourceSection}>
      
        <FlatList
          data={sourceBookmarks}
          keyExtractor={(newsItem) =>
            newsItem?.id?.toString() || String(Math.random())
          }
          renderItem={renderNewsItem}
          scrollEnabled={false}
        />
      </View>
    );
  };

  if (!bookmarks || Object.keys(bookmarks).length === 0) {
   
    return (
      <View style={styles.container}>
        <Text style={styles.noBookmarksText}>No bookmarks available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
     <View style={styles.btn}>
      <Button title="Clear All Bookmarks" onPress={clearAllBookmarks}  color="#e53e3e" />
     </View>
      <FlatList
        data={Object.entries(bookmarks)} 
        keyExtractor={([source]) => source || String(Math.random())}
        renderItem={renderSourceSection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a202c",
    padding: 16,
  },
  btn:{
    width: '30%',
    margin: 10,
    position: 'relative',
    right: -350,
    
  },
  noBookmarksText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  sourceSection: {
    marginBottom: 24,
  },
  sourceTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2d3748",
  },
  newsItem: {
    marginBottom: 12,
  },
});

export default Bookmark;
