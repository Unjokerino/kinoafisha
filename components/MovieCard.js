import React from 'react';
import { Text, Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Title, List,Caption } from 'react-native-paper';

export default function MovieCard(props) {
    return (
        <TouchableOpacity style={{margin:5, marginBottom: 20,}}>
            <View style={{ flexDirection: 'row', }}>
                <Image
                    style={{ width: 120, height: 200, zIndex: 0, borderRadius: 5 }}
                    source={{ uri: props.poster !== '' ? props.poster : "https://lh3.googleusercontent.com/proxy/PMHyypID38zj0zC4JBbN2mCcRyFHrrT2P6gLE3lBj6UYFDpkxfR7NhN4v1pXM3Hz_DPl6x5wh62imdz8E9zjKDWez2BQriPqGdn0DvE5Y4C3ebCOwjOuKiDuQ6w" }}
                />
                <View style={{ width: 200, marginLeft: 20}}>
                    <Title style={{ fontFamily: 'Roboto' }}>{props.name}</Title>
                    <Caption>{props.year} | {props.country[0]}</Caption>
                </View>
            </View>

        </TouchableOpacity>
    );
}
