document.querySelector('#get-device-info')
    .addEventListener('click', function () {
        getDeviceInfo();
    });

document.querySelector('#get-heart-rate')
    .addEventListener('click', function () {
        getHeartRate();
    });

document.querySelector('#set-heart-rate')
    .addEventListener('click', function () {
        setHeartRate();
    });

function getDeviceInfo() {
    let filters = [];

    let filterService = document
        .querySelector('#service')
        .value;
    if (filterService.startsWith('0x')) {
        filterService = parseInt(filterService);
    }
    if (filterService) {
        filters.push({
            services: [filterService]
        });
    }

    let filterName = document
        .querySelector('#name')
        .value;
    if (filterName) {
        filters.push({
            name: filterName
        });
    }

    let filterNamePrefix = document
        .querySelector('#namePrefix')
        .value;
    if (filterNamePrefix) {
        filters.push({
            namePrefix: filterNamePrefix
        });
    }

    let options = {};
    if (document.querySelector('#allDevices').checked) {
        options.acceptAllDevices = true;
    } else {
        options.filters = filters;
    }

    console.log('Requesting Bluetooth Device...');
    console.log('with ' + JSON.stringify(options));
    navigator
        .bluetooth
        .requestDevice(options)
        .then(device => {
            console.log('> Name:             ' + device.name);
            console.log('> Id:               ' + device.id);
            console.log('> Initially, connected?        ' + device.gatt.connected);
            return device.gatt.connect();
            console.log('> Now, connected?        ' + device.gatt.connected);
        })
        .catch(error => {
            console.log('Argh! ' + error);
        });
}

function getHeartRate() {
    console.log('Requesting Bluetooth Device to get heart rate data...');
    navigator.bluetooth.requestDevice({
            filters: [{
                services: ['heart_rate']
            }]
        }).then(device => {
            console.log('Got device: ', device.name);
            console.log('id: ', device.id);
            return device.gatt.connect();
        })
        .then(server => {
            console.log('Getting Heart Rate Service…');
            return server.getPrimaryService('heart_rate');
        })
        .then(service => {
            console.log('Getting Heart Rate Control Point Characteristic…');
            return service.getCharacteristic('heart_rate_control_point');
        })
        .then(characteristic => {
            console.log('Reading Heart Rate Control Point…');
            return characteristic.readValue();
        })
        .then(value => {
            value = value.buffer ? value : new DataView(value);
            console.log('Heart Rate Control Point: ', value.getUint16());
        })
        .catch(exception => {
            console.log(exception);
        });
}

function setHeartRate() {
    console.log('Requesting Bluetooth Device to set heart rate data...');
    navigator.bluetooth.requestDevice({
            filters: [{
                services: ['heart_rate']
            }]
        }).then(device => {
            console.log('Got device: ', device.name);
            console.log('id: ', device.id);
            return device.gatt.connect();
        })
        .then(server => server.getPrimaryService('heart_rate'))
        .then(service => service.getCharacteristic('heart_rate_control_point'))
        .then(characteristic => {
            const setHeatRateValue = new Uint16Array([document.querySelector('#set-heart-rate-value').value]);
            return characteristic.writeValue(setHeatRateValue);
        })
        .then(value => {
            console.log('Heart Rate Value is set to: ' + document.querySelector('#set-heart-rate-value').value);
        })
        .catch(exception => {
            console.log(exception);
        });
}