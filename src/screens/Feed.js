import * as React from 'react';
import { Image, StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

const divider = () => {
  return (
    <View
      style={{
        height: 10,
        width: "100%",
        backgroundColor: 'white',
      }}
    />
  );
}

const styleSheet = StyleSheet.create
(
  {
  MainContainer: {
    flex: 1,
  },
  listItem: {
    paddingLeft: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemText: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Cochin',
  },
  activityIndicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
  }
);

function Feed() 
{
  const [data, setData] = React.useState([])
  React.useEffect(() => 
  {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((response) => 
      {
        setData(response)
      })
      .catch((error) => 
      {
        console.log(error)
      })
  }, [])

  const renderItem = ({ item }) => 
  {
    console.log(item)
    return (
      <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
        <Image style={{ height: 300, width: '100%'}} source={{ uri: item.url }} />
    <Text style={{ fontSize: 18, color: 'black' }}>{item.title}</Text> 
      </View>
    )
  }

  return (
    <SafeAreaView style={styleSheet.MainContainer}>
          <FlatList 
            data={data} renderItem={renderItem}
            ItemSeparatorComponent={divider}
            />
    </SafeAreaView>
  )
}
  
  export default Feed
