import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TopNews from './TopNews';
import axios from 'axios';

const Home = () => {
  const [TpNews, setTpNews] = useState([]);
  const [loading , setLoading] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {

      try {
        setLoading(true)
        const response = await axios.get('https://arabic-news-api.p.rapidapi.com/aljazeera', {
          headers: {
            'x-rapidapi-host': 'arabic-news-api.p.rapidapi.com',
            'x-rapidapi-key': '1aa3fec721msh8a1a6bab027dddbp1c6771jsnc1a23fd6862c', // Replace with your actual key
          },
        });
        
        setLoading(false)
        // Map the API response data to the format needed
        const newsData = response.data.results.map((item, index) => ({
          id: index.toString(), // Ensure unique IDs for FlatList
          title: item.headline|| 'No title available',
          image: item.image,
          date: item.date,
          description: item.content || 'No description available',
        }));

        setTpNews(newsData); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const renderTopNews = ({ item }) => <TopNews data={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {/* Header */}
      <View style={styles.header}>
        <Bars3CenterLeftIcon size={28} color="#fff" />
        <Text style={styles.heading}>News</Text> 
         

        <TouchableOpacity>
          <MagnifyingGlassIcon size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>{
            loading ? "Loading...." : (<FlatList
                data={TpNews}
                renderItem={renderTopNews}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Text style={styles.subHeading}>News</Text>}
              />)
            }
        </Text>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c', // Dark background for modern UI
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2d3748', // Darker shade for the header
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
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
});

export default Home;
