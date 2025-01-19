import React from 'react';
import { View, Text, StyleSheet, Image  , ScrollView} from 'react-native';


const Details = ({ route }) => {
  const { newsData } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: newsData.image }} style={styles.image} />
      <Text style={styles.title}>{newsData.title}</Text>
      <Text style={styles.date}>{newsData.date}</Text>
      <Text style={styles.description}>{newsData.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c',
    padding: 16,
   
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    color: '#cbd5e0',
    fontSize: 14,
    marginBottom: 16,
  },
  description: {
    color: '#e2e8f0',
    fontSize: 16,
    lineHeight: 24, // Improves readability
    textAlign: 'justify', // Justifies the text
    marginBottom: 16, // Adds spacing after the description
  },
  
});

export default Details;
