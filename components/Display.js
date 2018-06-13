import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem } from 'react-native-elements';
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
  }

  componentWillMount(){

  }

  info(){

  }

  render() {
    var end = this.list.length-1
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Icon
                onPress={() => this.props.onClose()}
                size={30}
                color='black'
                name='close' />
            <Icon
                onPress={() => this.info()}
                size={30}
                color='black'
                name='info' />
        </View>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 20, margin: 10, textAlign: 'center', fontWeight: 'bold'}}>
              To minimize the impact of depreciation, we recommend buying a {this.list[0].year} or a {this.list[1].year} {this.props.info.make} {this.props.info.model}
          </Text>
          <Text style={{fontSize: 20, margin: 10, textAlign: 'center', fontWeight: 'bold'}}>
              Avoid the {this.list[end].year} and the {this.list[end-1].year} {this.props.info.make} {this.props.info.model}, they will depreciate the most in the next two years.
          </Text>
        </View>
        <View>
          {
            this.list.map((l, i) => (
              <ListItem
                key={i}
                title={l.year.toString()}
                subtitle={"Market Price: $" + l.price.toFixed(2)}
                rightTitle={"2-year lost: -" + l.percentage.toFixed(2) + "%"}
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
});
