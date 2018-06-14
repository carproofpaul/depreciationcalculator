import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal } from 'react-native';
import {Token} from '../resources/Token';
import ModalSelector from 'react-native-modal-selector'
import {getValidYears, getValidMakes, getValidModels, getGenericMarketValue, getValidVehicleDecodes} from 'carproof-data-apis';
import Loader from './Loader';
import {YearsToBuy} from '../math/Calculations';
import PureChart from 'react-native-pure-chart';
import Display from './Display';
import {Icon, ListItem} from 'react-native-elements';

const WIDTH = 300

const duration = [
  '1 year',
  '2 years',
  '3 years',
  '4 years',
  '5 years',
  '6 years',
  '7 years',
  '8 years',
  '9 years',
  '10 years'
]

export default class Home extends React.Component {

  constructor(props){
    super(props);

    this.newestYear = 0
    this.oldestYear = 0
    this.duration = 0
    this.make = ""
    this.model = ""
    this.trim = null

    this.data = []

    this.state = {
      years: [],
      oldYears: [],
      models: [],
      makes: [],
      trims: [],
      graph: [],

      modelText: 'Select a model',
      trimText: 'Select a trim',
      loading: false,
      visible: false
    }
  }

  componentWillMount(){

  }

  getData(i){
    this.setState({loading: true})
    if(i >= 0 || this.newestYear-i < 2000){
      getGenericMarketValue(Token._webServiceToken, 
                            this.newestYear-i, 
                            this.make,
                            this.model,
                            this.trim,
                            (data) => {
                              this.data.unshift(data)
                              this.getData(--i)
                            },
                            (err) => console.log(err)
                          )
    } else {
      console.log(this.data)
      this.analysedData = YearsToBuy(this.data, this.duration)
      console.log(this.analysedData)
      this.setState({loading: false, visible: true})
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
    var arr = this.analysedData.map(x => ({x: x.year, y: x.price}))
    //this.setState({graph: arr})
    return arr
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
        var models = this.intersect(newModels, oldModels)
        if(models.length == 0) this.setState({modelText: 'No available models'})
        else this.setState({modelText: 'Select a model'})
        this.setState({
          loading: false,
          models: models
        })
      }, (err) => this.error(err))
    }, (err) => this.error(err))
  }

  getValidVehicleDecodesForRange(newest, oldest){
    this.setState({loading: true})
    getValidVehicleDecodes(Token._webServiceToken, newest, this.make, this.model, (newDecodes) => {
      var newTrims = []
      for(var i = 0; i < newDecodes.length; i++){
        if(newDecodes[i].VehicleTrim !== null) newTrims.push(newDecodes[i].VehicleTrim)
      }
      console.log(newTrims)
      getValidVehicleDecodes(Token._webServiceToken, oldest, this.make, this.model, (oldDecodes) => {
        var oldTrims = []
        for(var i = 0; i < oldDecodes.length; i++){
          if(oldDecodes[i].VehicleTrim !== null) oldTrims.push(oldDecodes[i].VehicleTrim)
        }
        console.log(oldTrims)
        var trims = this.intersect(newTrims, oldTrims)
        if(trims.length == 0) this.setState({trimText: 'No trims available'})
        else this.setState({trimText: 'Select a Trim'})
        console.log(trims)
        this.setState({
          loading: false,
          trims: trims
        })        
      }, (err) => this.error(err))
    }, (err) => this.error(err))
  }

  render() {

    if(this.state.visible){
      return(
        <Modal
          transparent={false}
          visible={true}
          onRequestClose={() => this.setState({visible: false})}>
            <Display 
              onClose={() => this.setState({visible: false})}
              info={{make: this.make, model: this.model}}
              data={this.data} 
              analysedData={this.analysedData}
              graph={this.makeGraphData()}
              duration={this.duration}
            />
        </Modal>
      )
    }

    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading}/>
        <View style={{margin: 30}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: 'white'}}>
            DEPRECIATION PREDICTOR
          </Text>
          <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>
            Figure out which vehicle year you should buy to avoid the most depreciation
          </Text>
        </View>
        <ModalSelector
          style={styles.selector}
          selectStyle={{borderWidth: 0}}
          data={duration}
          initValue="How long will you keep this car for?"
          keyExtractor= {item => item}
          labelExtractor= {item => item}
          onChange={(label) => {
            this.duration = label.split(' ')[0]
            getValidYears(Token._webServiceToken, (years) => {
              years.splice(years.length-this.duration, this.duration)
              this.setState({years: years})
            })
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <ModalSelector
            disabled={this.state.years.length == 0 ? true : false}
            style={[styles.selector2, {marginRight: 6}]}
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
            style={[styles.selector2, {marginLeft: 6}]}
            selectStyle={{borderWidth: 0}}
            data={this.state.oldYears}
            initValue="Oldest Year"
            keyExtractor= {item => item}
            labelExtractor= {item => item}
            onChange={(label) => {
              this.oldestYear = label
              this.getValidMakesForRange(this.newestYear, this.oldestYear - this.duration)
            }}
          />
        </View>
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
            this.getValidModelsForRange(this.newestYear, this.oldestYear - this.duration)
          }}
        />
        <ModalSelector
          disabled={this.state.models.length == 0 ? true : false}
          style={styles.selector}
          selectStyle={{borderWidth: 0}}
          data={this.state.models}
          initValue={this.state.modelText}
          keyExtractor= {item => item}
          labelExtractor= {item => item}
          onChange={(label) => {
            this.model = label
            this.getValidVehicleDecodesForRange(this.newestYear, this.oldestYear - this.duration)
          }}
        />
        <ModalSelector
          disabled={this.state.trims.length == 0 ? true : false}
          style={styles.selector}
          selectStyle={{borderWidth: 0}}
          data={this.state.trims}
          initValue={this.state.trimText}
          keyExtractor= {item => item}
          labelExtractor= {item => item}
          onChange={(label) => {
            this.trim = label
          }}
        />
        <TouchableOpacity onPress={() => this.getData(this.newestYear - (this.oldestYear - this.duration))} style={styles.buttonContainer}>
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
  selector2 : {
    width: (WIDTH/2)-6,
    borderRadius: 15,
    borderStyle: 'solid',
    borderColor:'rgba(0, 0, 0, 0)',
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'center'
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
