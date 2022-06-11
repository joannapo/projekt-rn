import * as React from 'react';
import { Image, Text, View, FlatList, SafeAreaView, StyleSheet } from 'react-native';


const divider = () => {

  return (
    <View
      style={styles.divider}
    />
  );
}

function Feed() {
  // Hook dla danych(zdjec) - zmienna ktora przechowuje zdj
  const [data, setData] = React.useState([])
  
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((response) => {
        setData(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View >
        <Image style={styles.Image} source={{ uri: item.url }} />
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.MainContainer}>
      <FlatList
        data={data} renderItem={renderItem}
        ItemSeparatorComponent={divider}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create
  (
    {
      divider :{
        height: 10,
        width: "100%",
        backgroundColor: 'white',
      },
      Image: {
        height: 300,
        width: '100%',
      },
      MainContainer: {
        flex: 1,
      },
      itemText: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Arial',
        margin: 5,
      },
    }
  );

export default Feed
