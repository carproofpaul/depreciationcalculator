/**
 * Gets VIN from license plate number using QuickVIN
 * @param {authentication token} token  
 * @param {license plate number for look up} number  
 * @param {province abbreviation} province  
 * @param {callback for async result, first param is the VIN number, second is the full json object} onSuccess  
 * @param {callback for async failure, passes the error as a param} onFailure  
 */
export const getVinFromLicensePlateNumber = (token, number, province, onSuccess, onFailure) => {

    if(token === '' || token === null){
        onFailure('ERROR: Authentication token is invalid')
        return
    }


    if(number === '' || number === null){
        onFailure('ERROR: License plate number is invalid')
        return
    }

    if(province === '' || province === null){
        onFailure('ERROR: Province is invalid')
        return
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://carfaxapi.carproof.com/api/QuickVIN?licensePlate=" + number + "&province=" + province, true);
    xmlhttp.setRequestHeader("User-Agent", "request");
    xmlhttp.setRequestHeader("webServiceToken", token);
    xmlhttp.send();

    xmlhttp.onreadystatechange = (function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var json = JSON.parse(xmlhttp.responseText)

            if(json.ErrorMessages.Errors.length > 0 && json.ErrorMessages.Errors !== null){
                onFailure(json.ErrorMessages.Errors[0].Message.toString() + " ("  + json.ErrorMessages.Errors[0].Code.toString() + ")")
                return
            }

            if(json.QuickVINPlus === null){
                onFailure("Invalid Search")
            } else {
                onSuccess(json.QuickVINPlus.VINInfo.VIN[0], json)
            }

        } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
            onFailure(xmlhttp)
        }
    }).bind(this)

}

/**
 * Gets the vehicle history report from it's VIN
 * @param {authentication token} token 
 * @param {Vehicle Identification number} vin 
 * @param {callback for async result} onSuccess 
 * @param {callback for async failure} onFailure 
 */
export const getVehicleHistoryReportFromVin = (token, vin, onSuccess, onFailure) => {

    if(vin === '' || vin === null){
        onFailure('ERROR: VIN is invalid')
        return
    }

    if(token === '' || token === null){
        onFailure('ERROR: Authentication token is invalid')
        return
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://carfaxapi.carproof.com/Vhr/Get?vin=" + vin, true);
    xmlhttp.setRequestHeader("User-Agent", "request");
    xmlhttp.setRequestHeader("webServiceToken", token);
    xmlhttp.send();

    xmlhttp.onreadystatechange = (function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var json = JSON.parse(xmlhttp.responseText)
        onSuccess(json)
      } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
        onFailure(xmlhttp)
      }
    }).bind(this)
}

/**
 * Gets the recalls history of a vehicle using it's vin
 * @param {authentication token} token 
 * @param {Vehicle Identification Number} vin 
 * @param {callback for async result} onSuccess 
 * @param {callback for async failure} onFailure 
 */
export const getRecallsFromVin = (token, vin, onSuccess, onFailure) => {

    if(vin === '' || vin === null){
        onFailure('ERROR: VIN is invalid')
        return
    }

    if(token === '' || token === null){
        onFailure('ERROR: Authentication token is invalid')
        return
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://carfaxapi.carproof.com/Recall/Get?vin=" + vin, true);
    xmlhttp.setRequestHeader("User-Agent", "request");
    xmlhttp.setRequestHeader("webServiceToken", token);
    xmlhttp.send();

    xmlhttp.onreadystatechange = (function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            json = JSON.parse(xmlhttp.responseText)
            onSuccess(json)
        } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
            onFailure(xmlhttp)
        }
    }).bind(this)

}


/**
 * 
 * @param {authentication token} token 
 * @param {Vehicle Identification Number} vin 
 * @param {callback for async result} onSuccess 
 * @param {callback for async failure} onFailure 
 */
export const getValuationFromVin = (token, vin, onSuccess, onFailure) => {

    if(vin === '' || vin === null){
        onFailure('ERROR: VIN is invalid')
        return
    }

    if(token === '' || token === null){
        onFailure('ERROR: Authentication token is invalid')
        return
    }

    var xmlhttp = new XMLHttpRequest();    
    xmlhttp.open("GET", "http://apivaluationwebservice.carproof.com/ValuationRange/GetRetailValuationRange?vin="+vin, true);
    xmlhttp.setRequestHeader("webServiceToken", token);
    xmlhttp.send();

    xmlhttp.onreadystatechange = (function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            json = JSON.parse(xmlhttp.responseText)
          
            if(json.MinValuation === null || json.MaxValuation === null){
                onFailure("No Valuation was found")
            } else {
                onSuccess(json.MinValuation, json.MaxValuation)
            }
  
        } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
            onFailure(xmlhttp)
        }
      }).bind(this)

}

/**
 * Returns a list of valid years
 * @param {authentication token} token 
 * @param {callback for async result} onSuccess 
 * @param {callback for async failure} onFailure 
 */
export const getValidYears = (token, onSuccess, onFailure) => {

    if(token === '' || token === null){
        onFailure('ERROR: Authentication token is invalid')
        return
    }

    var xmlhttp = new XMLHttpRequest();    
    xmlhttp.open("GET", "http://apivaluationwebservice.carproof.com/vehicledecode/getvalidyears", true);
    xmlhttp.setRequestHeader("webServiceToken", token);
    xmlhttp.send();

    xmlhttp.onreadystatechange = (function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            json = JSON.parse(xmlhttp.responseText)
            onSuccess(json)
        } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
            onFailure(xmlhttp)
        }
      }).bind(this)

}

/**
 * Returns a list of valid makes
 * @param {authentication token} token 
 * @param {year of the vehicle} year 
 * @param {callback for async result} onSuccess 
 * @param {callback for async failure} onFailure 
 */
export const getValidMakes = (token, year, onSuccess, onFailure) => {

    if(token === '' || token === null){
        onFailure('ERROR: Authentication token is invalid')
        return
    }

    var xmlhttp = new XMLHttpRequest();    
    xmlhttp.open("GET", "http://apivaluationwebservice.carproof.com/vehicledecode/getvalidmakes?year=" + year, true);
    xmlhttp.setRequestHeader("webServiceToken", token);
    xmlhttp.send();

    xmlhttp.onreadystatechange = (function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            json = JSON.parse(xmlhttp.responseText)
            onSuccess(json)
        } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
            onFailure(xmlhttp)
        }
      }).bind(this)
}

/**
 * Returns a list of valid model
 * @param {authentication token} token 
 * @param {year of the vehicle} year 
 * @param {make of the vehicle} make 
 * @param {callback for async result} onSuccess 
 * @param {callback for async failure} onFailure 
 */
export const getValidModels = (token, year, make, onSuccess, onFailure) => {

    if(token === '' || token === null){
        onFailure('ERROR: Authentication token is invalid')
        return
    }

    var xmlhttp = new XMLHttpRequest();    
    xmlhttp.open("GET", "http://apivaluationwebservice.carproof.com/vehicledecode/getvalidmodels?year=" + year + "&make=" + make, true);
    xmlhttp.setRequestHeader("webServiceToken", token);
    xmlhttp.send();

    xmlhttp.onreadystatechange = (function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            json = JSON.parse(xmlhttp.responseText)
            onSuccess(json)
        } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
            onFailure(xmlhttp)
        }
      }).bind(this)
}

/**
 * Returns vehicle decode object
 * @param {authentication token} token 
 * @param {year of the vehicle} year 
 * @param {make of the vehicle} make 
 * @param {model of the vehicle} model 
 * @param {callback for async result} onSuccess 
 * @param {callback for async failure} onFailure 
 */
export const getGenericMarketValue = (token, year, make, model, trim ,onSuccess, onFailure) => {

    if(token === '' || token === null){
        onFailure('ERROR: Authentication token is invalid')
        return
    }

    var url = "http://apivaluationwebservice.carproof.com/vehicledecode/getgenericmarketvalue?request.vehicleYear="
        + year +
        "&request.vehicleMake="
        + make +
        "&request.vehicleModel="
        + model
        
    if(trim !== null){
        url = "http://apivaluationwebservice.carproof.com/vehicledecode/getgenericmarketvalue?request.vehicleYear="
        + year +
        "&request.vehicleMake="
        + make +
        "&request.vehicleModel="
        + model +
        "&request.vehicleTrim="
        + trim.replace(/ /g, '%')
    }

    var xmlhttp = new XMLHttpRequest();    
    xmlhttp.open("GET", 
    url,
     true);
    xmlhttp.setRequestHeader("webServiceToken", token);
    xmlhttp.send();

    xmlhttp.onreadystatechange = (function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            json = JSON.parse(xmlhttp.responseText)
            onSuccess({year: json.VehicleYear, price: json.RetailGenericMarketValue})
        } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
            onFailure(xmlhttp)
        }
    }).bind(this)
}

export const getValidVehicleDecodes = (token, year, make, model, onSuccess, onFailure) => {

    if(token === '' || token === null){
        onFailure('ERROR: Authentication token is invalid')
        return
    }

    var xmlhttp = new XMLHttpRequest();    
    xmlhttp.open("GET", 
    "http://apivaluationwebservice.carproof.com/vehicledecode/getvalidvehicledecodes?year="+ year +"&make=" + make + "&model=" + model, true);
    xmlhttp.setRequestHeader("webServiceToken", token);
    xmlhttp.send();

    xmlhttp.onreadystatechange = (function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            json = JSON.parse(xmlhttp.responseText)
            onSuccess(json)
        } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
            onFailure(xmlhttp)
        }
    }).bind(this)
}

