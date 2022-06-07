import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Modal, SafeAreaView} from 'react-native';

import SearchBox from '../../src/screenComponents/SearchBox';

function ShowGrid() 
{
  //Hook do pokazania / schowania modal view
const [getModal, setModal] = React.useState(false)
  //Hook do get / set adresu zdjecia
const [getImageUrl, setImageUrl] = React.useState('')
  //Hook do get / set tytulu zdjecia
const [getImageTitle, setImageTitle] = React.useState('')
  //Funkcja, ktora robi get / set tytulu, adresu oraz modal view
const toggleModal = (tytul, url) => {
    setImageUrl(url);
    setImageTitle(tytul);
    setModal(!getModal);
}
  //Hook do get / set pobranych danych (zdjec)
const [data, setData] = React.useState([])

  //Pobieranie zdjec
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

return (
    //Widok grid zdjec oraz modal z widokiem konkretnego zdjecia
    <View style={styles.MainContainer}>     
    <SearchBox /> 
    <FlatList
        data={data}
        renderItem={({item}) => 
            <View style={styles.GridViewBlockStyle}>
            <TouchableOpacity onPress={() => {toggleModal(item.title, item.url)}}>
                <Image style={{ height: 100, width: 190 }} source={{ uri: item.url}} ></Image>
            </TouchableOpacity> 
            </View>
        }
        
    numColumns={2}       
    />
    
    <Modal visible={getModal}>
        <SafeAreaView>
        <TouchableOpacity onPress={toggleModal}>
            <Image style={{ height: 300, width: 420 }} source={{uri: getImageUrl}}/>
            <Text style={{fontSize: 20, marginLeft: 10, marginRight: 10, top: 400}}>{getImageTitle}</Text>
        </TouchableOpacity>
        </SafeAreaView>
    </Modal>
    </View>
)
}

const styles = StyleSheet.create({

MainContainer :{
justifyContent: 'center',
flex:1,
margin: 10,
},

ActivityIndicator_Style:{
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
},

GridViewBlockStyle: {
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    height: 100,
    margin: 5,
    backgroundColor: 'white',
},

GridViewInsideTextItemStyle: {
    color: '#fff',
    padding: 10,
    fontSize: 18,
    justifyContent: 'center',
},
});

export default ShowGrid


