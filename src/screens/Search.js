import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, SafeAreaView, StyleSheet, useWindowDimensions} from 'react-native';

import SearchBox from '../../src/screenComponents/SearchBox';




function ShowGrid() {
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
    const window = useWindowDimensions()
    
    
    //Pobieranie zdjec
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

    return (
        
        //Widok grid zdjec oraz modal z widokiem konkretnego zdjecia
        <SafeAreaView style={styles.MainContainer}>
            <SearchBox />
            <FlatList style={{width: window.width}}
                data={data}
                renderItem={({ item }) =>
                    <View style={styles.GridViewBlockStyle}>
                        <TouchableOpacity onPress={() => { toggleModal(item.title, item.url) }}>
                            <Image style={styles.ImageFlatList} source={{ uri: item.url }} ></Image>
                        </TouchableOpacity>
                    </View>
                }

                numColumns={2}
            />

            <Modal visible={getModal}>
                <SafeAreaView >
                    <TouchableOpacity onPress={toggleModal}>
                        <Image style={{height: window.height*0.5, width: window.width}} source={{ uri: getImageUrl }} />
                        <Text style={styles.TextModal}>{getImageTitle}</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    TextModal: {
        fontSize: 20,
        marginLeft: 10, 
        marginRight: 10, 
        top: 10
    },

    ImageFlatList: {
        height: 100, 
        width: 190,
    },

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 0,
    },

    ActivityIndicator_Style: {
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
        flex: 1,
        alignItems: 'center',
        height: 100,
        margin: 1,
        backgroundColor: 'white',
    },

    GridViewInsideTextItemStyle: {
        color: '#fff',
        padding: 1,
        fontSize: 18,
        justifyContent: 'center',
    },
});

export default ShowGrid


