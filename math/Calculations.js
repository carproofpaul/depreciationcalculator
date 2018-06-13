import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const YearsToBuy = (carValues) => {
    
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
            slopes[i] = {
                year : carValues[i].year,
                price : carValues[i].price,
                slope: (carValues[i].price - carValues[i+2].price)/2
            }
        }

        slopes = slopes.sort(function(a, b){return a.slope - b.slope})
        bestValues.first.year = slopes[0].year
        bestValues.first.price = slopes[0].price
        bestValues.second.year = slopes[1].year
        bestValues.second.price = slopes[1].price
    }

    return (
        bestValues
    )
}



