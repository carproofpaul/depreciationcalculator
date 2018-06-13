import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollVIew } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';

import {Icon, ListItem} from 'react-native-elements';
 

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

    return (
      <ScrollVIew style={styles.container}>
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
        <View>
        {
            this.props.data.map((l, i) => (
                <ListItem
                    key={i}
                    title={l.year}
                    subtitle={l.price}
                />
            ))
        }
        </View>

      </ScrollVIew>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
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
