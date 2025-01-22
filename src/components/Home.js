import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TopNews from './TopNews';
import axios from 'axios';

const Home = () => {
  const [TpNews, setTpNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeSource, setActiveSource] = useState('aljazeera');

  const apiUrls = {
    aljazeera: 'https://arabic-news-api.p.rapidapi.com/aljazeera',
    bbc: 'https://arabic-news-api.p.rapidapi.com/bbcarabic',
    cnn: 'https://arabic-news-api.p.rapidapi.com/cnnarabic',
    skynews: 'https://arabic-news-api.p.rapidapi.com/skynewsarabic',
    rt: 'https://arabic-news-api.p.rapidapi.com/rtarabic',
  };

  const fetchNews = async (source) => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrls[source], {
        headers: {
          'x-rapidapi-host': 'arabic-news-api.p.rapidapi.com',
          'x-rapidapi-key': '1aa3fec721msh8a1a6bab027dddbp1c6771jsnc1a23fd6862c',
        },
      });
  
      setLoading(false);
      const newsData = Array.isArray(response?.data?.results)
        ? response.data.results.map((item, index) => ({
            id: `${source}-${index}`,
            title: item.headline || item.title || 'No title available',
            image: item.image,
            date: item.date,
            description: item.content || 'No description available',
          }))
        : Array.isArray(response?.data)
        ? response.data.map((item, index) => ({
            id: `${source}-${index}`, 
            title: item.headline || item.title || 'No title available',
            image: item.image,
            date: item.date,
            description: item.content || 'No description available',
          }))
        : [];
  
      setTpNews(newsData);
      setFilteredNews(newsData);
     
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchNews(activeSource);
  }, [activeSource]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredNews(TpNews);
    } else {
      const filtered = TpNews.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };

  const handleDateFilter = (date) => {
    setSelectedDate(date);

    const selectedFormattedDate = new Date(date).toISOString().split('T')[0];

    const filtered = TpNews.filter((item) => {
      if (!item.date) return false;

      let itemFormattedDate;
      if (item.date.includes('/')) {
        const [day, month, year] = item.date.split('/');
        itemFormattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      } else {
        itemFormattedDate = new Date(item.date).toISOString().split('T')[0];
      }

      return itemFormattedDate === selectedFormattedDate;
    });

    setFilteredNews(filtered);
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    if (showSearch) {
      setSearchQuery('');
      setFilteredNews(TpNews);
    }
  };

  const renderTopNews = ({ item }) => <TopNews data={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Bars3CenterLeftIcon size={28} color="#fff" />
        <Text style={styles.heading}>News</Text>
        <TouchableOpacity onPress={toggleSearch}>
          <MagnifyingGlassIcon size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {showSearch && (
        <TextInput
          style={styles.searchInput}
          placeholder="...أخبار البحث"
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      )}

      <View style={styles.buttonContainer}>
        {Object.keys(apiUrls).map((source) => (
          <TouchableOpacity
            key={source}
            style={[
              styles.sourceButton,
              activeSource === source && styles.activeSourceButton,
            ]}
            onPress={() => setActiveSource(source)}
          >
            <Text
              style={[
                styles.sourceButtonText,
                activeSource === source && styles.activeSourceButtonText,
              ]}
            >
              {source.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.dateFilterButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateFilterText}>Filter by dates</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="calendar"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) handleDateFilter(date);
          }}
        />
      )}

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={filteredNews}
          renderItem={renderTopNews}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <Text style={styles.subHeading}>News</Text>
            </>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2d3748',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    backgroundColor: '#2d3748',
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 16,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  sourceButton: {
    padding: 10,
    backgroundColor: '#2d3748',
    borderRadius: 8,
  },
  activeSourceButton: {
    backgroundColor: '#4a5568',
  },
  sourceButtonText: {
    color: '#ccc',
    fontSize: 14,
  },
  activeSourceButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dateFilterButton: {
    backgroundColor: '#2d3748',
    padding: 10,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 8,
  },
  dateFilterText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Home;