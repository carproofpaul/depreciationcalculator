import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {

  corrola = [
    {x:2007,y:3337},
    {x:2008,y:3881},
    {x:2009,y:4476},
    {x:2010,y:5935},
    {x:2011,y:6956},
    {x:2012,y:8164},
    {x:2013,y:8579},
    {x:2014,y:10032},
    {x:2015,y:11989},
    {x:2016,y:13063},
    {x:2017,y:15750}
  ]





  render() {
    slopes=[]
    console.log("Year: Value")
    for(i=0;i<this.corrola.length;i++) {
        console.log(this.corrola[i].x +": " + this.corrola[i].y)
        // slopes[i]=this.corrola[i+1].y
        // console.log(slopes[i])
    }

    console.log("Slopes:")

    return (
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
