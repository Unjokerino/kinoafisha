import React from 'react'
import { View, Text, Dimensions, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import moment from 'moment'
import localization from 'moment/locale/ru'

const wWidth = Dimensions.get('window').width;

const HorizontalItemCard = (props) => {
    
    return (
        
        <TouchableOpacity onPress={()=>{
            props.navigation.navigation.push(props.target,{...props})
        }} style={styles.card}> 
            
                <ImageBackground style={styles.cardBackground} source={{uri:props.poster ? props.poster : props.img_sobitiya}}>
                    <View style={styles.overlay}>
                        {props.seanses &&
                        <Text style={styles.date}>
                        {moment(props.seanses[0].date).locale("ru", localization).format("D MMMM")}
                        </Text>}
                        <Text style={styles.title}>{props.name}</Text>
                    </View>
                </ImageBackground >
         
        </TouchableOpacity>
   
     
    )
}

export default HorizontalItemCard


const styles = StyleSheet.create({
    card:{
        overflow:'hidden',
        marginHorizontal:12,
        borderRadius: 14,
        width: wWidth/2.2,
        height: wWidth/2.2
    },
    cardBackground:{
        borderRadius: 14,
        width:'100%',
        height:'100%'
    },
    overlay:{
        width:'100%',
        height:'100%',
        backgroundColor:'#0c0d0e57'
    },
    date:{

        position:'absolute',
        top:0,
        color:'#fff',
        right:0,
        paddingTop:15,
        paddingRight:5,
        fontSize:11,
    },
    title:{
        padding:10,
        textAlign:'left',
        width:'100%',
        position:'absolute',
        bottom:0,
        
        color:'#fff',

    },
})