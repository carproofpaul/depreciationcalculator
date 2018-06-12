import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const YearsToBuy = ({carValues}) => {


    function findMinSlope(arr) {
        min=arr[0]
        for(k=0;k<arr.length;k++) {
            if(arr[k]<min) {
                min = arr[k]
                minIndex = k
            }
        }
        return minIndex
    }
    
    if(carValues !== null){
        slopes = []
        bestValues = {
            first:{
                "year": 0,
                "value" : 0,
            },
            second: {
                "year": 0,
                "value" : 0,
            },
        };

        for(i=0;i<carValues.length-2;i++) {
            slopes[i] = (carValues[i+2].value-carValues[i].value)/2
        }

        bestValues.first.year=carValues[findMinSlope].year
        bestValues.first.value=carValues[findMinSlope].value

        slopes.splice(findMinSlope, 1)

        bestValues.second.year=carValues[findMinSlope].year
        bestValues.second.value=carValues[findMinSlope].value

        
    }

    return (
        bestValues
    )
}

const styles = StyleSheet.create({
    rows: {
        flexDirection: 'row', 
        margin: 10,
    },
    text: {
        color: 'black',
        fontSize: 18,
        margin: 10,
        flexWrap: 'wrap'
    },
});

export default ServiceDisplay;

