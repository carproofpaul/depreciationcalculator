import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem } from 'react-native-elements';

const WIDTH = 300

export default class Display extends React.Component {

  constructor(props){
    super(props);

    this.state = {

    }
  }

  componentWillMount(){

  }

  info(){

  }

  render() {
    var end = this.props.analysedData.length-1
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
              To minimize the impact of depreciation, we recommend buying a {this.props.analysedData[0].year} or a {this.props.analysedData[1].year} {this.props.info.make} {this.props.info.model}
          </Text>
          <Text style={{fontSize: 20, margin: 10, textAlign: 'center', fontWeight: 'bold'}}>
              Avoid the {this.props.analysedData[end].year} and the {this.props.analysedData[end-1].year} {this.props.info.make} {this.props.info.model}, they will depreciate the most in the next two years.
          </Text>
        </View>
        <View>
          {
            this.props.analysedData.map((l, i) => (
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
