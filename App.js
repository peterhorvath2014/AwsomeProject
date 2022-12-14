import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AppBar, IconButton, ListItem } from "@react-native-material/core";
import React from 'react';
import { ActivityIndicator, FlatList, Image } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import RNPickerSelect from 'react-native-picker-select';

const BASEURL = 'http://192.168.0.124:5163'
const USER = 'user'

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
  <ListItem
    title={title}
    secondaryText="Ide írhatunk egy kis részletet is"
    trailing={<IconButton icon={props => <Icon name="book" {...props} />} color={checked ? "primary" : "grey"} />}>
  </ListItem>
);

export default function App() {
  const renderItem = ({ item }) => (
    <Item title={item.title} checked={item.checked} />
  );

  const [isLoading, setLoading] = React.useState(true);
  const [apodUrl, setApodUrl] = React.useState("");
  const [users, setUsers] = React.useState([]);

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

  const getUsers = async () => {
    try {
      const response = await fetch(new URL(USER, BASEURL));
      const json = await response.json();
      setUsers(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <PaperProvider>
      <AppBar title="Tanulós app" style={{ marginTop: 40 }} />
      <RNPickerSelect
        placeholder={({ label: "Válassz tanulót!", value: 0 })}
        onValueChange={(value) => console.log(value)}
        items={users.map(user => ({ label: user.name, value: user.id }))}
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

