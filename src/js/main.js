// UI
const btnStart = document.getElementById('btn-start');
const btnStop = document.getElementById('btn-stop');
const btnSave = document.getElementById('btn-save');
const btnInc = document.getElementById('btn-inc');
const btnDec = document.getElementById('btn-dec');
const lblTrial = document.getElementById('lbl-trial');
const lblTime = document.getElementById('lbl-time');
const tblBody = document.getElementById('tbl-body')
const objData = [];
var record = false;
var trialNo = 1;
var rowNum = 0;

btnSave.onclick = function() {
    if (trialNo > 0) {
        console.log([convertToCSV(objData)])
        var m = new Date();
        var dateString =
            m.getFullYear() + "-" +
            ("0" + (m.getMonth()+1)).slice(-2) + "-" +
            ("0" + m.getDate()).slice(-2) + "_" +
            ("0" + m.getHours()).slice(-2) + "-" +
            ("0" + m.getMinutes()).slice(-2) + "-" +
            ("0" + m.getSeconds()).slice(-2);
        var blob = new Blob([convertToCSV(objData)], {type: "text/plain;charset=utf-8"});
        var fileName = "synctime_" + dateString + ".csv";
        saveAs(blob, fileName);
    }
}

btnStart.onclick = function() {
    let timetype;
    timetype = "start";
    // update record state
    record = !record;

    // get timestamps
    let ts = Date.now() // seconds
    let unix = new Date(ts);

    // update labels
    lblTime.innerHTML = unix;

    // update data
    objData.push(
        {trial: trialNo, type: timetype, time: unix, valid: true}
    );
    console.log(objData)

    updateTable(trialNo, timetype, unix)
}

btnStop.onclick = function() {
    let timetype;
    timetype = "stop";
    // update record state
    record = !record;

    // get timestamps
    let ts = Date.now() // seconds
    let unix = new Date(ts);

    // update labels
    lblTime.innerHTML = unix;

    // update data
    objData.push(
        {trial: trialNo, type: timetype, time: unix, valid: true}
    );
    console.log(objData)

    updateTable(trialNo, timetype, unix)
}

btnInc.onclick = function() {
    trialNo++;
    lblTrial.innerHTML = "Trial: " + trialNo;
}

btnDec.onclick = function() {
    if (trialNo > 1) {
        trialNo--;
        lblTrial.innerHTML = "Trial: " + trialNo;
    }
}

// HELPERS
function addRow() {
    // TODO : Implement
}

function updateTable(trialNo, timetype, unix) {
    // update table
    rowNum++;
    var newRow = tblBody.insertRow();
    var cellTrial = newRow.insertCell();
    var cellEvent = newRow.insertCell();
    var cellTime = newRow.insertCell();
    var cellMark = newRow.insertCell();
    var checkbox = document.createElement("INPUT");
    checkbox.type = "checkbox";
    checkbox.id = rowNum;
    checkbox.checked = true;
    checkbox.onclick = function() {
        objData[this.id-1].valid = !objData[this.id-1].valid;
    }
    cellTrial.appendChild(document.createTextNode(trialNo))
    cellEvent.appendChild(document.createTextNode(timetype))
    cellTime.appendChild(document.createTextNode(unix))
    cellMark.appendChild(checkbox)
}

function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr)
  
    return array.map(it => {
      return Object.values(it).toString()
    }).join('\n')
  }