//Bus 004 Device 002: ID 0bc7:0002 X10 Wireless Technology, Inc. Firecracker Interface (ACPI-compliant)


var usb_driver = require("node-usb"),
	assert = require('assert'),
	http = require('http'),
	qs = require('querystring');

var usb = usb_driver.create();

var firecrackerDevices = usb.find_by_vid_and_pid(0x0bc7, 0x0002);
assert.ok((firecrackerDevices.length >= 1));
console.log("Total firecracker devices found: " + firecrackerDevices.length);

var firecracker = firecrackerDevices[0];

// get interfaces of firecracker
var firecrackerInterfaces = firecracker.getInterfaces();
assert.ok((firecrackerInterfaces.length >= 1));
console.log("Firecracker contains interfaces: " + firecrackerInterfaces.length);
 
// claim first interface
var firecrackerInterface = firecrackerInterfaces[0];
console.log("Claiming firecracker interface for further actions");
firecrackerInterface.claim();

var endpoints = firecrackerInterface.getEndpoints();

console.log("Interface contains endpoints: " + endpoints.length);

var out = endpoints[1];
console.log("Endpoint Type " + out.__endpointType + " - " +  usb.LIBUSB_ENDPOINT_OUT);

var util = require('util');

out.interruptTransfer(new Array(0x20, 0x60, 0x9f, 0x20, 0xdf), function(_data) {
						console.log(util.inspect(_data));
					});



/*.controlTransfer(mixed read|write, int _bmRequestType, int _bRequest, int _wValue, int _wIndex, function afterTransfer(data) [, int _timeout])
		[async] delegates to libusb_control_transfer. First parameter can be either
		  * int, then controlTransfer works in read mode (read data FROM USB device)
		  * Array of ints, then controlTransfer works in write mode (write data TO USB device)
		_timeout parameter is optional
*/

/*motor.controlTransfer(new Array("0"), 0x40, 0x06, lightId, 0x0, function(data) {
						console.log(" + LED toggled");
					});
*/

/*
.interruptTransfer(mixed read|write, function after(data) [, int _timeout]) : undefined
		[async] bulkTransfer and interruptTransfer are more or less equal. If an endpoint works in bulk mode, you use bulkTransfer(), if endpoint work in interrupt mode, you use interruptTransfer(). If you use the wrong method, the function call will fail.
		First parameter can be either
		* int, then the function will work in read mode (read _int_ bytes FROM USB device)
		* Array, the function will work in write mode (write byte array TO USB device)
		The _timeout parameter is optional; if not used, an unlimited timeout is used.
		Both functions are working in asynchronous mode, the second parameter is the callback handler after the function has been executed / data arrived.
*/

//A1Off 0x20, 0x60, 0x9f, 0x20, 0xdf

//A2OFF	0x20  0x60  0x9f  0x30  0xcf

//firecracker.interruptTransfer

//firecracker.controlTransfer(new Array("test"), 0x60, 0x9f, 0x30, 0xcf, function(data) {
//						console.log(util.inspect(data));/
//					});


