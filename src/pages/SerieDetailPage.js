import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';

import Line from '../components/Line';
import LongText from '../components/LongText';

class SerieDetailPage extends React.Component {
    render() {
        const { serie } = this.props.navigation.state.params;

        return (
            <ScrollView>
                <Image 
                    style={styles.image}
                    source={{
                        uri: serie.img
                    }} 
                />
                <Line label="Título" content={serie.title}/>
                <Line label="Gênero" content={serie.gender}/>
                <Line label="Nota" content={serie.rate}/>
                <LongText label="Descrição" content={serie.description}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        alignItems: 'center',
    },
    image: {
        aspectRatio: 1,
        borderRadius: 10,
        width: '60%',
        alignSelf: 'center'
    }
});

export default SerieDetailPage;