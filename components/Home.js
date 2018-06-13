import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import {Token} from '../resources/Token';
import ModalSelector from 'react-native-modal-selector'
import {getValidYears, getValidMakes, getValidModels, getGenericMarketValue} from 'carproof-data-apis';
import Loader from './Loader';
import {YearsToBuy} from '../math/Calculations';
import PureChart from 'react-native-pure-chart';

const WIDTH = 300

export default class Home extends React.Component {

  constructor(props){
    super(props);

    this.newestYear = 0
    this.oldestYear = 0
    this.make = ""
    this.model = ""

    this.data = []

    this.state = {
      years: [],
      oldYears: [],
      models: [],
      makes: [],
      graph: [],

      loading: false,
    }
  }

  componentWillMount(){
    getValidYears(Token._webServiceToken, (years) => {
      this.setState({years: years})
    })
  }

  getData(i){
    this.setState({loading: true})
    if(i >= 0 || this.newestYear-i < 2000){
      getGenericMarketValue(Token._webServiceToken, 
                            this.newestYear-i, 
                            this.make,
                            this.model,
                            (data) => {
                              this.data.unshift(data)
                              this.getData(--i)
                            },
                            (err) => console.log(err)
                          )
    } else {
      this.setState({loading: false})
      console.log(this.data)
      //console.log(YearsToBuy(this.data))
      //this.makeGraphData()
      this.data = [] //clear incase they do it again
    }
  }

  intersect(a, b) {
    var setA = new Set(a);
    var setB = new Set(b);
    var intersection = new Set([...setA].filter(x => setB.has(x)));
    return Array.from(intersection);
  }

  error(err){
    this.setState({loading: false})
    Alert.alert(
      'Error',
      err,
      [
        {text: 'Okay', onPress: () => null},
      ],
      { cancelable: true }
    )
  }

  makeGraphData(){
    var arr = this.data.reverse().map(x => ({x: x.year, y: x.price}))
    this.setState({graph: arr})
  }

  getValidMakesForRange(newest, oldest){
    this.setState({loading: true})
    getValidMakes(Token._webServiceToken, newest, (newMakes) => {
      getValidMakes(Token._webServiceToken, oldest, (oldMakes) => {
        this.setState({
          loading: false,
          makes: this.intersect(newMakes, oldMakes)
        })
      }, (err) => this.error(err))
    }, (err) => this.error(err))
  }

  getValidModelsForRange(newest, oldest){
    this.setState({loading: true})
    getValidModels(Token._webServiceToken, newest, this.make, (newModels) => {
      getValidModels(Token._webServiceToken, oldest, this.make, (oldModels) => {
        this.setState({
          loading: false,
          models: this.intersect(newModels, oldModels)
        })
      }, (err) => this.error(err))
    }, (err) => this.error(err))
  }

  render() {

    return (
      <View style={styles.container}>
        {/*<PureChart width={'100%'} height={200} data={this.state.graph} type='line' />*/}
        <Loader loading={this.state.loading}/>
        <ModalSelector
          disabled={this.state.years.length == 0 ? true : false}
          style={styles.selector}
          selectStyle={{borderWidth: 0}}
          data={this.state.years}
          initValue="Newest Year"
          keyExtractor= {item => item}
          labelExtractor= {item => item}
          onChange={(label) => {
            this.newestYear = label
            arr = []
            for(var i = 0; i < this.state.years.length; i++){
              if(this.state.years[i] <= this.newestYear) arr.push(this.state.years[i])
            }
            this.setState({oldYears: arr})
          }}
        />
        <ModalSelector
          disabled={this.state.oldYears.length == 0 ? true : false}
          style={styles.selector}
          selectStyle={{borderWidth: 0}}
          data={this.state.oldYears}
          initValue="Oldest Year"
          keyExtractor= {item => item}
          labelExtractor= {item => item}
          onChange={(label) => {
            this.oldestYear = label
            this.getValidMakesForRange(this.newestYear, this.oldestYear >= 2002 ? this.oldestYear - 2 : 2000)
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
            this.getValidModelsForRange(this.newestYear, this.oldestYear >= 2002 ? this.oldestYear - 2 : 2000)
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
        <TouchableOpacity onPress={() => this.getData(this.newestYear - (this.oldestYear >= 2002 ? this.oldestYear - 2 : 2000))} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selector : {
    width: WIDTH,
    borderRadius: 15,
    borderStyle: 'solid',
    borderColor:'rgba(0, 0, 0, 0)',
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'center'
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
