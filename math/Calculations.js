import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const YearsToBuy = (carValues) => {


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

    console.log(carValues);
    
    
    if(carValues !== null){
        slopes = []
        bestValues = {
            first:{
                "year": 0,
                "price" : 0,
            },
            second: {
                "year": 0,
                "price" : 0,
            },
        };

        for(i=0;i<carValues.length-2;i++) {
            slopes[i] = (carValues[i+2].price-carValues[i].price)/2
        }

        bestValues.first.year=carValues[findMinSlope].year
        bestValues.first.price=carValues[findMinSlope].price

        slopes.splice(findMinSlope, 1)

        bestValues.second.year=carValues[findMinSlope].year
        bestValues.second.price=carValues[findMinSlope].price

        
    }

    return (
        bestValues
    )
}



