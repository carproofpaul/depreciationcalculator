import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const YearsToBuy = (carValues) => {
    
    if(carValues !== null){
        //create slopes array and return object
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

        console.log(carValues)

        //Loop through given array and add years, prices, and calculated slopes to new array
        for(i=0;i<carValues.length-2;i++) {
            //if current car price or car 2 years olders is 0 don't include
            if(carValues[i].price!=0 && carValues[i+2].price!=0) {
            slopes[i] = {
                year : carValues[i].year,
                price : carValues[i].price,
                slope: (carValues[i].price - carValues[i+2].price)/2
            }
        }
        }

        //sort array by slope and set return object to years with the lowest slopes
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



