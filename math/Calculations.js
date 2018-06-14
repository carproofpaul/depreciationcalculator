import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const YearsToBuy = (carValues, length) => {
    
    if(carValues !== null){
        //create percentages array and return object
        percentages = []
        bestValues = []
        
        //Loop through given array and add years, prices, and calculated percentages to new array
        for(i=0;i<carValues.length-length;i++) {
            sum = parseInt(i)+parseInt(length)
            //if current car price or car 2 years olders is 0 don't include
            if(sum < carValues.length) {
                // console.log("Sum less than length:" + sum)
                if(carValues[i].price>0 && carValues[sum].price>0) {
                    percent = 100-(carValues[sum].price/carValues[i].price)*100
                    percentages[i] = {
                    year : carValues[i].year,
                    price : carValues[i].price,
                    percentage: 100-(carValues[sum].price/carValues[i].price)*100,
                    }
                }

            }
            else if(carValues[i].year==2001 && carValues[i].price>0) {
                console.log("Year 2009 found")
                percentages[i] = {
                    year : carValues[i].year,
                    price : carValues[i].price,
                    percentage: 100-(carValues[i+1].price/carValues[i].price)*100,
                }
            }
        }
        //sort array by percentage & filter out undefined values
        percentages = percentages.sort(function(a, b){return a.percentage - b.percentage})
        percentages= percentages.filter(function( element ) {
            return element !== undefined;
         });


    return (
        percentages
    )
}
}



