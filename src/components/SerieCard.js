import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const SerieCard = ({ serie, isFirstColumn, onNavigate }) => (
    <TouchableOpacity
        onPress={onNavigate}
        style={[
            styles.container,
            isFirstColumn ? styles.firstColumn : styles.lastColumn
        ]}>
        <View style={styles.card}>
            <Image
                source={{
                    uri: serie.img
                }}
                aspectRatio={1}
                resizeMode="cover"
            />
            <View style={styles.cardTitleWrapper}>
                <Text style={styles.cardTitle}>{serie.title}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        padding: 5,
        width: '50%',
        height: Dimensions.get('window').width / 2
    },
    card: {
        flex: 1,
        borderWidth: 1
    },
    cardTitleWrapper: {
        backgroundColor: 'black',
        height: 50,
        position: 'absolute',
        bottom: 0,
        opacity: .8,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 3,
        paddingRight: 3,
        alignItems: 'center'
    },
    cardTitle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15
    },
    firstColumn: {
        paddingLeft: 10
    },
    lastColumn: {
        paddingRight: 10
    }
});

export default SerieCard;