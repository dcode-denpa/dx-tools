//        Termux-api library for NodeJS 
//            Copyright (c) 2022 rn0x
//  https://github.com/rn0x/termux-api-library

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const execut = require('./child_process.js');
const fetch = require('node-fetch');
const fs = require('fs-extra');

class Api {

    constructor() {

        /**
         * Check if the device is Android (termux) 
         * 
         * @example 
         * 
         * const isTermux = api.isTermux; // return is true or false
         
         * if (isTermux) {

         *    await api.termux_wifi_connectioninfo((e) => {
         *         console.log(e);
         *     });
         * 
         * }
         * 
        */

        this.isTermux = process.platform === 'android' ? true : false

        /**
         * Play specified file using Media Player API.   
         * 
         * @example 
         * await api.termux_media_player.info()
         * await api.termux_media_player.play()
         * await api.termux_media_player.playFile(path)
         * await api.termux_media_player.pause()
         * await api.termux_media_player.stop()
         * 
        */

        this.termux_media_player = {

            /**
             * Displays current playback information
             * 
             * @example 
             *
             * const info = await api.termux_media_player.info();
             * console.log(info);
             * 
             * @return {Promise<string>} Output .  
            */

            info: async () => {
                let Output = await execut('termux-media-player info');
                return Output
            },
            /**
             * Resumes playback if paused
             * 
             * @example 
             *
             * const play = await api.termux_media_player.play();
             * console.log(play);
             * 
             * 
             * @return {Promise<string>} Output .  
            */
            play: async () => {
                let Output = await execut('termux-media-player play');
                return Output
            },
            /**
             * Plays specified media file
             * 
             * @example 
             *
             * const playFile = await api.termux_media_player.playFile(path);
             * console.log(playFile);
             * 
             * @param {string} path media file path
             * @return {Promise<string>} Output .  
            */
            playFile: async (path) => {
                let Output = await execut(`termux-media-player play ${path}`);
                return Output
            },
            /**
             * Pauses playback
             * 
             * @example 
             *
             * const pause = await api.termux_media_player.pause();
             * console.log(pause);
             * 
             * 
             * @return {Promise<string>} Output .  
            */
            pause: async () => {
                let Output = await execut('termux-media-player pause');
                return Output
            },
            /**
             * Quits playback
             * 
             * @example 
             *
             * const stop = await api.termux_media_player.stop();
             * console.log(stop);
             * 
             * 
             * @return {Promise<string>} Output .  
            */
            stop: async () => {
                let Output = await execut('termux-media-player stop');
                return Output
            },
        }

        /**
         * Record using microphone on your device.  
         * 
         * @example 
         * await api.termux_microphone_record.start(path, limit)
         * await api.termux_microphone_record.info()
         * await api.termux_microphone_record.stop()
         * 
        */

        this.termux_microphone_record = {
            /**
             * Start recording to specific file and specified limit
             * 
             * @example 
             *
             * const path = '/data/data/com.termux/files/home/filename.mp3'
             * const limit = 0
             * const start = await api.termux_microphone_record.start(path, limit);
             * console.log(start);
             * 
             * @param {string} path The path of the recorded file
             * @param {(number|string)} limit  The exact time of the audio recording in seconds (default: 0)
             * @return {Promise<string>} Output .  
            */
            start: async (path, limit = 0) => {
                let Output = await execut(`termux-microphone-record -f ${path} -l ${limit}`);
                return Output
            },
            /**
             * Quits recording
             * 
             * @example 
             *
             * const stop = await api.termux_microphone_record.stop();
             * console.log(stop);
             * 
             * @return {Promise<string>} Output .  
            */
            stop: async () => {
                let Output = await execut('termux-microphone-record -q');
                return Output
            },
            /**
             * Get info about current recording
             * 
             * @example 
             *
             * const info = await api.termux_microphone_record.info();
             * console.log(info);
             * 
             * @return {Promise<object>} Output json
            */
            info: async () => {
                let Output = await execut('termux-microphone-record -i');
                return JSON?.parse(Output);
            }
        }

        /**
         * Call a telephony number.   
         * 
         * @example 
         * await api.termux_telephony_call.connect(number);
         * await api.termux_telephony_call.close();
         * 
        */

        this.termux_telephony_call = {

            /**
             * Call a telephony number. 
             * 
             * @example 
             *
             * const number = "05592xxxxx"
             * await api.termux_telephony_call.connect(number);
             * 
             * @param {(string | number)} number Requires a telephony number specified in appropriate format. 
             * @return {Promise<void>} 
            */

            connect: async (number) => {
                await execut(`termux-telephony-call ${number}`);
                return `Connect ${number}`
            },

            /**
             * Close the call . 
             * 
             * @example 
             *
             * await api.termux_telephony_call.close(); 
             * @return {Promise<void>} 
            */

            close: async () => {
                await execut('termux-telephony-call 1');
                return 'Close the call'
            },
        }
    }

    /**
     * List call log history.
     * 
     * @example  
     * await api.termux_call_log(10 , (e) => {
     *    console.log(e);
     * })
     *
     * @param {(number|string)} limit - offset in call log list
     * @param {function} callback return Output displayed in json format. 
    **/

    async termux_call_log(limit, callback) {

        await execut(`termux-call-log -l ${limit}`, (e) => {
            callback(JSON?.parse(e));
        });
    }

    /**
     * Get the status of the device battery. 
     * 
     * @example  
     * await api.termux_battery_status((e) => {
     *    console.log(e);
     * })
     *
     * @param {function} callback return Output is returned in json format. 
     */

    async termux_battery_status(callback) {

        await execut('termux-battery-status', (e) => {
            callback(JSON?.parse(e))
        });
    }


    /**
     * Get information about device camera(s). 
     * 
     * @example  
     * await api.termux_camera_info((e) => {
     *    console.log(e);
     * })
     *
     * @param {function} callback This program does not take any arguments.
     * Output is returned in json format. . 
     */

    async termux_camera_info(callback) {

        await execut('termux-camera-info', (e) => {
            callback(JSON?.parse(e))
        });
    }


    /**
     * Set the screen brightness between 0 and 255.
     * 
     * @example  
     * await api.termux_brightness(brightness)
     *
     * @param {(number|string)} brightness  Brightness value should be between 0 and 255 or auto.
     */

    async termux_brightness(brightness) {

        await execut(`termux-brightness ${brightness}`);
    }

    /**
     * Take a photo and save it to a file in JPEG format.
     * 
     * @example  
     * await api.termux_camera_photo(0, './test.jpeg')
     *
     * @param {(number|string)} camera_id ID of the camera to use , default: 0
     * @param {string} path Photo is saved at specified file path
     */

    async termux_camera_photo(camera_id = 0, path) {

        await execut(`termux-camera-photo -c ${camera_id} ${path}`);
    }

    /**
     * Get the system clipboard text.  
     * 
     * @example  
     * await api.termux_clipboard_get((e) => {
     *    console.log(e);
     * })
     *
     * @param {function} callback This program does not take any arguments.
     * Output is returned in plain text. 
     */

    async termux_clipboard_get(callback) {

        await execut('termux-clipboard-get', (e) => {
            callback(e)
        });
    }

    /**
     * Set the system clipboard text. The text to set is either supplied as arguments or read from stdin if no arguments are given.   
     * 
     * @example  
     * await api.termux_clipboard_set("hello world")
     *
     * @param {string} text Text is read either from standard input or from command line arguments. 
     *  
     */

    async termux_clipboard_set(text) {

        await execut(`termux-clipboard-set "${text}"`);
    }

    /** 
     * List all contacts. 
     * 
     * @example  
     * await api.termux_contact_list((e) => {
     *    console.log(e);
     * })
     *
     * @param {function} callback This program does not take any arguments. 
     * Output is returned in json format. 
     */

    async termux_contact_list(callback) {

        await execut('termux-contact-list', (e) => {
            callback(JSON?.parse(e))
        });
    }

    /**
     * Show dialog widget for user input. 
     * 
     * @example  
     * const hint = 'Put your password here'
     * const title = 'input password'
     * 
     * await api.termux_dialog(hint, title, false, true, true, (e) => {
     *    console.log(e);
     * })
     *
     * @param {string} hint text hint 
     * @param {string} title set title of dialog
     * @param {boolean} multiple_lines multiple lines instead of single : true or false
     * @param {boolean} inputNumbers enter input as numbers : true or false
     * @param {boolean} inputPassword enter input as password : true or false
     * @param {function} callback This program does not take any arguments. 
     * Output is returned in json format. 
     */

    async termux_dialog(hint, title, multiple_lines, inputNumbers, inputPassword, callback) {

        let m = multiple_lines ? '-m' : '';
        let n = inputNumbers ? '-n' : '';
        let p = inputPassword ? '-p' : '';

        if (multiple_lines !== inputNumbers) {

            await execut(`termux-dialog -i "${hint}" -t "${title}" ${m} ${n} ${p}`, (e) => {
                callback(JSON?.parse(e))
            });

        }

        else {
            callback('Erorr : It is not possible to add multiple lines to my numbers')
        }
    }

    /**
     * Download Files . 
     * 
     * @example  
     * const url = 'https://example.com/image.jpeg'
     * const filename = 'photo_2022'
     * const savePath = '/data/data/com.termux/files/home'
     * 
     * await api.termux_download(url, filename, savePath)
     * 
     * @param {string} url The link of the file you want to download 
     * @param {string} filename file name
     * @param {string} savePath path to save the downloaded file
     * @return {array} Return the path of the downloaded file
     *
     */

    async termux_download(url, filename, savePath) {

        let response = await fetch(url, { method: 'GET' }).catch(e => { return { message: 'Error : Get url info not found !' } })

        if (response === 'Error : Get url info not found !') {

            console.log(response);

        }

        else {
            let format = response?.headers?.raw()['content-type'][0]?.split('/')[1];
            let buffer = await response?.arrayBuffer();
            let PATH = savePath?.slice(-1) === '/' ? savePath?.slice(0, -1) : savePath
            fs.writeFileSync(`${PATH}/${filename?.split('.')[0]}.${format}`, Buffer.from(buffer))

            return {
                message: `Save files ${PATH}/${filename?.split('.')[0]}.${format}`,
                path: `${PATH}/${filename?.split('.')[0]}.${format}`
            }
        }

    }

    /** 
     * Use fingerprint sensor on device to check for authentication. 
     * 
     * This API is available only for devices running Android 6 (Marshmallow) or higher.  
     * 
     * @example 
     * 
     * await api.termux_fingerprint((e) => {
     *    console.log(e);
     * })
     *
     * @param {function} callback This program does not take any arguments. 
     * Output is returned in json format. 
     */

    async termux_fingerprint(callback) {

        await execut('termux-fingerprint', (e) => {
            callback(JSON?.parse(e))
        });
    }

    /** 
     * Get the device location. 
     * 
     * 1- GPS likely will not work in buildings as device must be exposed to satellite signal.
     
     * 2- GPS also requires that your device clock is set correctly. For the answer to question why, learn how GPS works.
    
     * 3- Do not expect immediate location result. Even network location request may take some time. 
     * 
     * @example  
     * 
     * await api.termux_location("gps", "once", (e) => {
     *    console.log(e);
     * })
     * 
     * or
     * 
     * const data = await api.termux_location('gps', 'once')
     * console.log(data);
     *
     * @param {"gps" | "network" | "passive"} provider location provider (default: gps)
     * @param {"once" | "last" | "updates"} request kind of request to make (default: once)
     * @param {function} callback Output displayed in json format. 
     * @return {object} Output displayed in json format.  
     */

    async termux_location(provider = 'gps', request = 'once', callback) {

        let Output = await execut(`termux-location -p ${provider} -r ${request}`);

        if (callback) {

            callback(JSON?.parse(Output));

        }

        return JSON?.parse(Output);
    }

    /** 
     * Display a system notification
     * 
     * @example 
     * 
     * await api.termux_notification(title, text, id);
     *
     * @param {string} title notification title to show .
     * @param {string} text content to show in the notification.
     * @param {(string | number)} id notification id (will overwrite any previous notification with the same id)
     */

    async termux_notification(title, text, id) {

        await execut(`termux-notification -t "${title}" -c "${text}" -i ${id}`);

    }

    /** 
     * Remove a notification previously shown with "termux-notification --id". 
     * 
     * @example 
     * 
     * await api.termux_notification_remove(id);
     *
     * @param {(string | number)} id Notification id is a value previously used to show notification with command "termux-notification --id". 
     */

    async termux_notification_remove(id) {

        await execut(`termux-notification-remove ${id}`);

    }

    /** 
     * Share a specified file from standard input. 
     * 
     * @example 
     * 
     * const filepath = "../image.jpeg"
     * await api.termux_share('send', filepath);
     *
     * @param {"edit" | "send" | "view"} action which action to performed on the shared content: edit/send/view (default:view).
     * @param {string} filepath file path.
     */

    async termux_share(action = "view", filepath) {

        await execut(`termux-share -a ${action} ${filepath}`);

    }

    /** 
     * Get information about types of sensors
     * 
     * @example 
     * 
     * await api.termux_sensor((e) => {
     *   console.log(e);
     * });
     * 
     * or 
     * 
     * const sensor = await api.termux_sensor();
     * console.log(sensor);
     *
     * @param {function} callback Output displayed in json format. 
     * @return {object} Output displayed in json format.
     */

    async termux_sensor(callback) {

        let Output = await execut(`termux-sensor -l`);

        if (callback) {

            callback(JSON?.parse(Output));

        }

        return JSON?.parse(Output);

    }

    /** 
     * List SMS messages. 
     * 
     * @example 
     * 
     * const type = "inbox"
     * const limit = 10
     * const sender = undefined || "all" // the number for locate message : To display all senders, type the "all" or don't assign a value to the variable
     * 
     * await api.termux_sms_list(type, limit, sender, (e) => {
     *   console.log(e);
     * });
     * 
     * or 
     * 
     * const list = await api.termux_sms_list(type, limit, sender);
     * console.log(list);
     *
     * @param {"all" | "inbox" | "sent" | "draft" | "outbox"} type the type of messages to list (default: inbox): all|inbox|sent|draft|outbox
     * @param {(number | string)} limit offset in sms list (default: 10)
     * @param {(number | string)} sender the number for locate message | (default: "all")
     * @param {function} callback Output displayed in json format. 
     * @return {object} Output displayed in json format.
     */

    async termux_sms_list(type, limit = 10, sender = "all", callback) {

        let Output = await execut(`termux-sms-list -t ${type} -l ${limit} ${sender === "all" || sender === undefined ? '' : `-f ${sender}`}`);

        if (callback) {

            callback(JSON?.parse(Output));

        }

        return JSON?.parse(Output);

    }

    /** 
     * Send a SMS message to the specified recipient number(s). 
     * 
     * @example 
     * 
     * const number = "05592xxxxx"
     * const slot = "0"
     * const text = "hello world"
     * await api.termux_sms_send(number, slot, text);
     *
     * @param {number | string} number number(s)  recipient number(s) - separate multiple numbers by commas
     * @param {"0" | "1"} slot slot sim slot to use - silently fails if slot number is invalid or if missing READ_PHONE_STATE permission (default: 0)
     * @param {string} text text message.
     */

    async termux_sms_send(number, slot = "0", text) {

        await execut(`termux-sms-send -n ${number} -s ${slot} ${text}`);

    }

    /** 
     * Get information about all observed cell information from all radios on the device including the primary and neighboring cells. 
     * 
     * @example 
     * 
     * 
     * const info = await api.termux_telephony_cellinfo();
     * console.log(info)
     *
     * @param {function} callback Output displayed in json format. 
     * @return {object} Output displayed in json format.
     */

    async termux_telephony_cellinfo(callback) {

        let Output = await execut('termux-telephony-cellinfo');

        if (callback) {

            callback(JSON?.parse(Output));

        }

        return JSON?.parse(Output);
    }

    /** 
     * Get information about the telephony device.
     * 
     * @example 
     * 
     * 
     * const deviceinfo = await api.termux_telephony_deviceinfo();
     * console.log(deviceinfo)
     *
     * @param {function} callback Output displayed in json format. 
     * @return {object} Output displayed in json format.
     */

    async termux_telephony_deviceinfo(callback) {

        let Output = await execut('termux-telephony-deviceinfo');

        if (callback) {

            callback(JSON?.parse(Output));

        }

        return JSON?.parse(Output);
    }

    /** 
     * Show a transient popup notification. 
     * 
     * @example 
     * 
     * const position = "middle"
     * const background = "gray"
     * const text_color = "white"
     * const text = "hello world"
     * await api.termux_toast(position, background, text_color, text);
     *
     * @param {"middle" | "top" | "bottom"} position set position of toast: [top, middle, or bottom] (default: middle)
     * @param {"black" | "silver" | "gray" | "white" | "red" | "fuchsia" | "green" | "yellow" | "blue"} background set background color (default: gray)
     * @param {"black" | "silver" | "gray" | "white" | "red" | "fuchsia" | "green" | "yellow" | "blue"} text_color set text color (default: white)
     * @param {string} text text message.
     */

    async termux_toast(position = "middle", background = "gray", text_color = "white", text) {

        await execut(`termux-toast -g ${position} -b ${background} -c ${text_color} "${text}"`);

    }

    /** 
     * Toggle LED Torch on device. 
     * 
     * Program accepts a one of these values:
     * 
     *   on - enable torch.
     * 
     *   off - disable torch.
     * 
     * @example 
     * 
     * const values = "on" // on - enable torch. | off - disable torch.
     * await api.termux_torch(values);
     *
     * @param {"on" | "off"} values on - enable torch. | off - disable torch.
     */

    async termux_torch(values) {

        await execut(`termux-torch ${values}`);

    }

    /** 
     * Get information about the current wifi connection.
      
     * Print information about current Wi-Fi connection. This information include: SSID (AP name), BSSID (AP mac address), device IP and other. 
     * 
     * @example 
     * 
     * await api.termux_wifi_connectioninfo((e) => {
     *     console.log(e);
     * });
     * 
     * or 
     * 
     * const wifi = await api.termux_wifi_connectioninfo();
     * console.log(wifi);
     *
     * @param {function} callback Output displayed in json format. 
     * @return {object} Output displayed in json format.
     */

    async termux_wifi_connectioninfo(callback) {

        let Output = await execut(`termux-wifi-connectioninfo`);

        if (callback) {

            callback(JSON?.parse(Output));

        }

        return JSON?.parse(Output);

    }

    /** 
     * Toggles Wi-Fi on/off. 
     * 
     * Program accepts a one of these values:
     * 
     *   true - enable Wi-Fi
     * 
     *   false - disable Wi-Fi
     * 
     * @example 
     * 
     * const values = true // true - enable Wi-Fi | false - disable Wi-Fi
     * await api.termux_wifi_enable(values);
     *
     * @param {true | false} values true - enable Wi-Fi | false - disable Wi-Fi
     */

    async termux_wifi_enable(values) {

        await execut(`termux-wifi-enable ${values}`);

    }

    /** 
     *  Get information about the last wifi scan.
     * 
     * @example 
     * 
     * await api.termux_wifi_scaninfo((e) => {
     *     console.log(e);
     * });
     * 
     * or 
     * 
     * const scaninfo = await api.termux_wifi_scaninfo();
     * console.log(scaninfo);
     *
     * @param {function} callback Output displayed in json format. 
     * @return {Array} Output displayed in json format.
     */

    async termux_wifi_scaninfo(callback) {

        let Output = await execut(`termux-wifi-scaninfo`);

        if (callback) {

            callback(JSON?.parse(Output));

        }

        return JSON?.parse(Output);

    }

    /** 
     * check if termux-api is installed on your Android
     * 
     * @example 
     * 
     * await api.isTermuxApi((e) => {
     *    console.log(e);
     * });
     * 
     * or 
     * 
     * const isTermuxApi = await api.isTermuxApi();
     * console.log(isTermuxApi)
     *
     * @param {function} callback Output displayed in json format. 
     * @return {boolean} Output displayed in json format.
     */

    async isTermuxApi(callback) {

        let Output = await execut('termux-battery-status');

        if (isJSON(Output)) {

            if (callback) {

                callback(true)

            }
            return true

        }

        else {

            if (callback) {

                callback(false);

            }
            return false;
        }
    }
}

/** 
* check if a string is a valid JSON string
* @param {string}  str
* @return {boolean} return is true or false
*/

function isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

module.exports = new Api
