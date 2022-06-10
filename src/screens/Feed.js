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
      <View style={styles.container}>
        <Image style={styles.Image} source={{ uri: item.url }} />
        <Text>{item.title}</Text>
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

export default Feed
