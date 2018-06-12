import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Token} from '../resources/Token';
import ModalSelector from 'react-native-modal-selector'
import {getValidYears, getValidMakes, getValidModels, getGenericMarketValue} from 'carproof-data-apis';

export default class Home extends React.Component {

  constructor(props){
    super(props);

    this.year = 0
    this.make = ""
    this.model = ""

    this.data = []

    this.state = {
      years: [],
      models: [],
      makes: []
    }
  }

  componentWillMount(){
    getValidYears(Token._webServiceToken, (years) => {
      this.setState({years: years})
    })
  }

  getData(i){
    if(i >= 0){
      getGenericMarketValue(Token._webServiceToken, 
                            this.year--, 
                            this.make,
                            this.model,
                            (data) => {
                              this.data.push(data)
                              this.getData(--i)
                            },
                            (err) => console.log(err)
                          )
    } else {
      console.log(this.data)
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <ModalSelector
          data={this.state.years}
          initValue="Select an year"
          keyExtractor= {item => item}
          labelExtractor= {item => item}
          onChange={(label) => {
            this.year = label
            getValidMakes(Token._webServiceToken, this.year, (makes) => this.setState({makes: makes}), (err) => console.log(err))
          }}
        />
        <ModalSelector
          data={this.state.makes}
          initValue="Select a make"
          keyExtractor= {item => item}
          labelExtractor= {item => item}
          onChange={(label) => {
            this.make = label
            getValidModels(Token._webServiceToken, this.year, this.make, (models) => this.setState({models: models}), (err) => console.log(err))
          }}
        />
        <ModalSelector
          data={this.state.models}
          initValue="Select a model"
          keyExtractor= {item => item}
          labelExtractor= {item => item}
          onChange={(label) => {
            this.model = label
            this.getData(10)
          }}
        />
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
