import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import {Token} from '../resources/Token';
import ModalSelector from 'react-native-modal-selector'
import {getValidYears, getValidMakes, getValidModels, getGenericMarketValue} from 'carproof-data-apis';
import {YearsToBuy} from '../math/Calculations';
import PureChart from 'react-native-pure-chart';

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
      makes: [],
      graph: []
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
      //console.log(YearsToBuy(this.data))
      this.makeGraphData()
    }
  }

  makeGraphData(){
    var arr = this.data.reverse().map(x => ({x: x.year, y: x.price}))
    this.setState({graph: arr})
  }

  render() {

    return (
      <View style={styles.container}>
        <PureChart width={'100%'} height={200} data={this.state.graph} type='line' />
        <ModalSelector
          disabled={this.state.years.length == 0 ? true : false}
          style={styles.selector}
          selectStyle={{borderWidth: 0}}
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
          disabled={this.state.makes.length == 0 ? true : false}
          style={styles.selector}
          selectStyle={{borderWidth: 0}}
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
          disabled={this.state.years.models == 0 ? true : false}
          style={styles.selector}
          selectStyle={{borderWidth: 0}}
          data={this.state.models}
          initValue="Select a model"
          keyExtractor= {item => item}
          labelExtractor= {item => item}
          onChange={(label) => {
            this.model = label
          }}
        />
        <Button
          style={{margin: 20}}
          title='GO'
          onPress={() => this.getData(10)}
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
  selector : {
    borderRadius: 15,
    borderStyle: 'solid',
    borderColor:'rgba(0, 0, 0, 0)',
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 20,
    justifyContent: 'center'
  }
});
