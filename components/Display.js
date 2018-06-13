import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <View style={styles.container}>
        <View style={styles.header}>
            <Icon
                onPress={() => this.props.onClose()}
                size={30}
                color='#cc0000'
                name='close' />
            <Icon
                onPress={() => this.info()}
                size={30}
                color='#cc0000'
                name='info' />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
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
