# Electron with Chrome WebBluetooth API
This is a basic integration of Electron and Chrome Web-Bluetooth API, Specifically, implementing 1) [device info sample provided by the api](https://googlechrome.github.io/samples/web-bluetooth/device-info.html), 2) getting values from a bluetooth device, and 3) setting a value to a bluetooth device. 

## installation
```bash
# Go into the repository
cd electron-web-bluetooth
# Install dependencies
npm install
# Run the app
npm start
```

To get heart rate data, I've used a Bluetooth Prephiral Simulator app called LightBlue downloaded from the App Store. There, create a virtual prephiral service for heart rate. Go to the 'Heart Rate Control Point' characterisitc, add read and write capabilities. You can also set a default Hex value. You need this to be able to get a result from 'Get Heart Rate' button.


## resources
* (https://github.com/electron/electron/issues/7367)
* (https://dev.opera.com/articles/web-bluetooth-intro/)
* (https://googlechrome.github.io/samples/web-bluetooth/index.html)
* (https://github.com/GoogleChrome/samples/tree/gh-pages/web-bluetooth)