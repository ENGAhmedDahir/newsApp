import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState({});

  // Load bookmarks from AsyncStorage
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem("bookmarks");
        if (storedBookmarks) {
          setBookmarks(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error("Failed to load bookmarks:", error);
      }
    };

    loadBookmarks();
  }, []);

  // Save bookmarks to AsyncStorage
  const saveBookmarksToStorage = async (updatedBookmarks) => {
    try {
      await AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error("Failed to save bookmarks:", error);
    }
  };
  // Toggle a bookmark (add/remove)
  const toggleBookmark = async (news, source) => {
    setBookmarks((prev) => {
      const sourceBookmarks = prev[source] || [];
      const updatedSourceBookmarks = sourceBookmarks.some(
        (item) => item.id === news.id
      )
        ? sourceBookmarks.filter((item) => item.id !== news.id)
        : [...sourceBookmarks, news]; 

      const updatedBookmarks = {
        ...prev,
        [source]: updatedSourceBookmarks,
      };

      saveBookmarksToStorage(updatedBookmarks);
      return updatedBookmarks;
    });
  };

 
  const isBookmarked = (newsId, source) => {
    return bookmarks[source]?.some((item) => item.id === newsId) || false;
  };

 
  const clearAllBookmarks = async () => {
    try {
      setBookmarks({});
      await AsyncStorage.removeItem("bookmarks");
      
    } catch (error) {
      console.error("Error clearing bookmarks:", error);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked, clearAllBookmarks }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};


export const useBookmarks = () => useContext(BookmarkContext);
