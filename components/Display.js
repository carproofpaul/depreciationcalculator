import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Card, Header } from 'react-native-elements';
import PureChart from 'react-native-pure-chart';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'

const WIDTH = 300

export default class Display extends React.Component {

  constructor(props){
    super(props);
    this.list = this.props.analysedData.filter(function(n){ return n != undefined });
    this.first = [];
    
  }
  

  componentWillMount(){

  }

  info(){
    Alert.alert(
      'Info',
      'blah blah big data blah',
      [
        {text: 'OK', onPress: () => null},
      ],
      { cancelable: true }
    )
  }

  render() {
    
    
    for(i=0;i<2;i++) {
      this.first[i] = this.list.shift()
    }
    var end = this.list.length-1
console.log(this.list)
console.log(this.first)
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Icon
                onPress={() => this.props.onClose()}
                size={30}
                color='black'
                name='close' />
        </View>

        <View>
        {
            this.first.map((l, i) => (
              i==0 ?
              <ListItem
                key={i}
                title={
                  <View>
                    <Text style={{fontSize: 35, color:'#3993EE', textAlign:'center'}}>{l.year.toString()}</Text>
                    <Text style={{fontSize: 20, color:'black', textAlign:'center'}}>{this.props.info.make} {this.props.info.model}</Text>
                    </View>}
                subtitle={
                  <View>
                    <Text>We recommend buying this model: it's value depreciates the least over {this.props.duration} years.{"\n"}{"\n"}</Text>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize: 18}}><Icon name="arrow-down" size={20}/> {l.percentage.toFixed(1)}%</Text>
                    <Text style={{fontSize:18}}><Icon name="shopping-cart" size={20}/> ${l.price}</Text>
                    </View>
                    </View>}
                  bottomDivider={true}
              /> :
              <ListItem
                key={i}
                title={<Text>{l.year.toString()} {this.props.info.make} {this.props.info.model}</Text>}
                subtitle={<View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={{fontSize: 12}}><Icon name="arrow-down" size={14}/> {l.percentage.toFixed(1)}%</Text>
                <Text style={{fontSize:12}}><Icon name="shopping-cart" size={14}/> ${l.price}</Text>
                </View>}
              />
            ))
          }
          {
            this.list.map((l, i) => (
              <ListItem
                key={i}
                title={<Text>{l.year.toString()} {this.props.info.make} {this.props.info.model}</Text>}
                subtitle={<View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={{fontSize: 12}}><Icon name="arrow-down" size={14}/> {l.percentage.toFixed(1)}%</Text>
                <Text style={{fontSize:12}}><Icon name="shopping-cart" size={14}/> ${l.price}</Text>
                </View>}
              />
            ))
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttonContainer : {
    width: WIDTH,
    borderRadius: 15,
    borderStyle: 'solid',
    borderColor:'rgba(0, 0, 0, 0)',
    backgroundColor: '#cc0000',
    paddingVertical: 15,
  },
  buttonText : {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  cards : {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardHeader : {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3993EE'
  }
});
