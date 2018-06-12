import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const YearsToBuy = (carValues) => {


    function findMinSlope(arr) {
        min=arr[0]
        minIndex=0
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

        for(i=carValues.length-1;i>1;i--) {
            {
                    slopes.push((carValues[i-2].price - carValues[i].price)/2)
            }
        }

        for(l=0;l<slopes.length;l++) {
            console.log(slopes[l])
        }

        console.log("Min slope: " + findMinSlope(slopes.reverse()))
        bestValues.first.year=carValues[findMinSlope(slopes)].year
        bestValues.first.price=carValues[findMinSlope(slopes)].price

        slopes.splice(findMinSlope, 1)

        bestValues.second.year=carValues[findMinSlope(slopes)].year
        bestValues.second.price=carValues[findMinSlope(slopes)].price

        
    }

    return (
        bestValues
    )
}



