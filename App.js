import { AppBar } from "@react-native-material/core";
import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
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
  <View>
    <Text style={{
      backgroundColor: '#eee',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
    }}>{title} - {checked ? "Yes" : "No"}</Text>
  </View>
);

export default function App() {
  const renderItem = ({ item }) => (
    <Item title={item.title} checked={item.checked} />
  );

  const [isLoading, setLoading] = React.useState(true);
  const [apodUrl, setApodUrl] = React.useState("");

  const getApodUrl = async () => {
    try {
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=cPOgJsE4oOCSvkpYW3SOjlOSCR27rJDaoK5cY4Et');
      const json = await response.json();
      setApodUrl(json.hdurl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getApodUrl();
  }, []);

  return (
    <PaperProvider>
      <AppBar title="Tanulós app" style={{ marginTop: 40 }} />
      <RNPickerSelect
        placeholder={({ label: "Válassz tanulót!", value: 0 })}
        onValueChange={(value) => console.log(value)}
        items={USER.map(user => ({ label: user.name, value: user.id }))}
      />
      {isLoading ? <ActivityIndicator /> : <Image style={{ width: 250, height: 250, }} source={{ uri: apodUrl }} />}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </PaperProvider>
  );
}

