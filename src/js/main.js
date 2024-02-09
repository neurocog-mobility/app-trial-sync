// UI
const btnStart = document.getElementById('btn-start');
const btnSave = document.getElementById('btn-save');
const lblTrial = document.getElementById('lbl-trial');
const lblTime = document.getElementById('lbl-time');
const objData = [];
var record = false;
var trialNo = 0;

btnSave.onclick = function() {
    if (trialNo > 0) {
        console.log([convertToCSV(objData)])
        var blob = new Blob([convertToCSV(objData)], {type: "text/plain;charset=utf-8"});
        var fileName = "synctime_" + Date.now() + ".csv";
        saveAs(blob, fileName);
    }
}

btnStart.onclick = function() {
    let timetype;
    if (record) {
        btnStart.innerHTML = "Start";
        btnStart.classList.remove("btn-danger");   
        btnStart.classList.add("btn-success");
        timetype = "stop";
    } else {
        btnStart.innerHTML = "Stop";
        btnStart.classList.remove("btn-success");   
        btnStart.classList.add("btn-danger");
        trialNo++;
        timetype = "start";
    }
    // update record state
    record = !record;

    // get timestamps
    let ts = Date.now() // seconds
    let unix = new Date(ts);

    // update labels
    lblTime.innerHTML = unix;
    lblTrial.innerHTML = "Trial: " + trialNo;

    // update data
    objData.push(
        {trial: trialNo, type: timetype, time: unix}
    );
    console.log(objData)
}

// HELPERS

function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr)
  
    return array.map(it => {
      return Object.values(it).toString()
    }).join('\n')
  }