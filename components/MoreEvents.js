
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
} from "react-native";
import moment from 'moment'
import HorizontalItemCard from "./HorizontalItemCard"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function MoreEvents(props){
    const [moreEvents,setMoreEvents] = useState([])
    useEffect(()=>{
        getData().then((data) => setMoreEvents(data))
    },[])

    async function checkCity(event){
        if(props.skipCityCheck){
            return true
        } 
        
        let city = await AsyncStorage.getItem('city')
        
        let result = false
        
        event.seanses.forEach(element => {
            element.city === city ? result = true :  result = false
            console.log(event.name, " | ", result, element.city)
            
        });
        

        return result
    }

    async function checkDate(event){
        if(props.skipDateCheck){
            return true
        }
        let today = new Date()
        let dates = []
       
        let result = false
        event.seanses.forEach(element => {
            let elemDate = moment(element.date).format("MMDD")
            for(let i = 0;i<7;i++){
                let date = new Date(today)
                date.setDate(date.getDate() + i)
                date = moment(date).format("MMDD")
                elemDate === date ? result = true : ''
            }
            
            
        });

        return result
    }

    async function getData() {
        let result = await fetch(props.url, {
            headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/json",
                Pragma: "no-cache"
            }
        })
        let json = await result.json()
        let sliceEvents = []
        let ind = 0
        await json.map((event, index) => {
            let isValidEvent = formatEvents(event)
            
            if(isValidEvent !== false){
                if (event.name !== props.name) {
                    sliceEvents.push(event)
                }
            }

        })
    
        return sliceEvents.slice(0,6)
    }

    async function formatEvents(event){
       
            let checkCityResult = await checkCity(event)
            let checkDateResult = await checkDate(event)
            if(checkCityResult && checkDateResult){
                return event
            }
            
        
        return false
    }


    return(
        <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={moreEvents}
            style={styles.otherEvents}
            renderItem={({ item }) => <HorizontalItemCard url={props.url} target={props.target} navigation={props.navigation} {...item} />}
            keyExtractor={item => item.name}
        />
    )
}

const styles = StyleSheet.create({
    otherEvents:{
        marginVertical:10
    }
})

