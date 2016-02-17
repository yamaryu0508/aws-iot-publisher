# AWS IoT Publisher

This Electron app allows one to publish message to AWS IoT easily.

**(NOTICE)** This application has not yet been fully tested for bugs.  

![image](https://qiita-image-store.s3.amazonaws.com/0/43383/0506f0d9-5487-ca1f-ddc6-5147da0a04ec.png)

## License

MIT

## Version

0.0.1

## Packaged app.

* MacOS X ([darwin 64bit](https://github.com/yamaryu0508/aws-iot-publisher/tree/master/AWS%20IoT%20Publisher-darwin-x64))
* Windows ([64bit](https://github.com/yamaryu0508/aws-iot-publisher/tree/master/AWS%20IoT%20Publisher-win32-x64)/[32bit](https://github.com/yamaryu0508/aws-iot-publisher/tree/master/AWS%20IoT%20Publisher-win32-ia32))
* Linux ([64bit](https://github.com/yamaryu0508/aws-iot-publisher/tree/master/AWS%20IoT%20Publisher-linux-x64)/[32bit](https://github.com/yamaryu0508/aws-iot-publisher/tree/master/AWS%20IoT%20Publisher-linux-ia32))

## Fundamental usage

You can set required parameters as follows, and push the button "Publish to AWS IoT".

* AWS IoT Region
* MQTT Topic
* Client ID (not required to publish)
* CA File
* Client Certificate File
* Client Key File
* Key & Values for MQTT Publish

### Message format

The key-value pairs are converted to the simple JSON format, and published with time property like this.
```json
{
  "time": "2016-02-12T09:12:55+09:00",
  "temperature": "16",
  "humidity": "80"
}
```
