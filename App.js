import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, StatusBar, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const USER = [
  {
    id: 'gd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Peter',
  },
  {
    id: 'gd7acg4a-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Henrik',
  },
  {
    id: 'ece47cb3-1744-41ef-86ac-f0268b984bbf',
    name: 'Akos',
  }
]
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Java',
    checked: true
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'C#',
    checked: false
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Python',
    checked: false
  },
  {
    id: 'a351ab3d-f52f-4ddd-b0eb-3b24477db6d0',
    title: 'DevOps',
    checked: true
  }
];

const Item = ({ title, checked }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title} - {checked ? "Yes" : "No"}</Text>
  </View>
);

export default function App() {
  const renderItem = ({ item }) => (
    <Item title={item.title} checked={item.checked}/>
  );

  return (
    <SafeAreaView style={styles.container}>
      <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={USER.map(user => ({label: user.name, value: user.id}))}
        />
        <Image style={styles.space} source={{uri: 'https://www.nasa.gov/sites/default/files/thumbnails/image/main_image_star-forming_region_carina_nircam_final-5mb.jpg'}} />
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  space: {
    width: 250,
    height: 250,
  }
});
