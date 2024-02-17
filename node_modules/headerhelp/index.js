const figlet = require('figlet')
const gradient = require('gradient-string')
const calculator = require('./utils/calculator.js')
const error = require('./utils/errorHandler.js')

class Header {
    /**
     * Configuration of all Header.
     * @param {Object} options - All banner settings
     * @param {string} [options.bannerTitle=HeaderMaker] - The name of the title (Default: HeaderMaker).
     * @param {string} [options.bannerStyle=Doom] - The style of title (Default: Doom).
     * @param {string[]} [options.bannerColor=#ffffff] - The color of title (Default: White).
     * @param {boolean} [options.littleTitle=false] - Add little BannerTitle on TOP
     * @param {boolean} [options.clear=false] - Clear console when launch
     * @param {Object} args - Assign args for print after banner.
     * @param {string} [args.separator=-] - The serapator (Default: -).
     * @param {string} args.name - The style of title.
     * @param {string[]} args.info - The color of title.
     */
    constructor(options, ...args) {

        this.constructor.OptionsVerifications(options, ...args)

        this.options = options
        this.title = options.bTitle || options.bannerTitle || `HeaderMaker`;
        this.style = options.bStyle || options.bannerStyle || `Doom`;
        this.color = options.bColor || options.bannerColor || null;
        this.littleTitle = options.lTitle || options.littleTitle || false;
        this.clear = options.clear || false;
        this.args  = args || null;
        
        /** @type {number} */
        this.columns = process.stdout.columns;
    }

    /**
     * Assign args for print after banner.
     * @param {Object} args
     * @param {string} [args.separator=-] - The serapator (Default: -).
     * @param {string} args.name - The style of title.
     * @param {string[]} args.info - The color of title.
     */
    setArgs(...args){
        this.constructor.OptionsVerifications(this.options, ...args)
        this.args = args
    }

    print(){

        if(this.clear) console.clear();

        // Variable declaration
        /** @var {string} */
        var bannerLogo = (this.style != null) ? figlet.textSync(this.title, { font: this.style }) : this.title;
        /** @var {string[]} */
        var splitLogo  = bannerLogo.split(/\r?\n/);
        /** @var {string} */
        var output = ``;
        var countGlobal;
        
        //
        /** @var {number} */
        var maxLength = calculator.maximumLength(splitLogo);

        countGlobal = Number((this.columns / 2) - (maxLength / 2));
        var textFinal = ``
        var littleBannerTitle;
        if (this.littleTitle){
            var spaceNumber = (maxLength / this.title.length) - 2
            littleBannerTitle = calculator.addSpace(this.title, spaceNumber).toUpperCase()

            var littleTitleLength = Number(littleBannerTitle.length).toFixed()
            littleTitleLength = Number(countGlobal + ((maxLength / 2) - (littleTitleLength / 2))).toFixed();
            
            textFinal = ``
            for (let j = 0; j < littleTitleLength; j++){
                textFinal += ` `
            }
            textFinal += littleBannerTitle + '\n';
        }

        
        for (let i = 0; i < splitLogo.length; i++){
            for (let j = 0; j < countGlobal; j++){
                output += ` `
            }
            output += splitLogo[i] + "\n"
        }

        if (this.args){
            var argsText = ``;
            var sepLength = 0
            for (let i = 0; i < this.args.length; i++){
                if(i == 0) sepLength = countGlobal
                var sep = this.args[i].separator
                let lengthTemp = maxLength;
                lengthTemp -= this.args[i].name.length;
                lengthTemp /= 2;
                for (let j = 0; j < countGlobal; j++){
                    argsText += ` `
                }
                for (let j = 0; j < lengthTemp; j++){
                    argsText += sep;
                }
                argsText += this.args[i].name;
                if(this.args[i].name.length+lengthTemp*2 != maxLength) lengthTemp -= 1;
                for (let j = 0; j < lengthTemp; j++){
                    argsText = argsText + sep;
                }
                argsText += '\n';
                lengthTemp = maxLength;
                lengthTemp -= this.args[i].info[0].length;
                lengthTemp /= 2;
                for (let j = 0; j < this.args[i].info.length; j++){
                    for (let k = 0; k < lengthTemp + countGlobal; k++){
                        argsText += ' '
                    }
                    argsText += this.args[i].info[j] + '\n';
                }
                if(this.args.length < 1 /*|| this.args.length == i+1*/){
                    for (let k = 0; k < countGlobal; k++){
                        argsText += ` `
                    }
                    for (let j = 0; j < maxLength; j++){
                        argsText = argsText + sep;
                    }
                }
            }
        }

        /**ARGS */
        var separatorText = ``;
        for(let i = 0; i < this.columns; i++){
            separatorText += `—`
        }

        if(this.color == null)
        this.color = gradient(['#ffffff', '#ffffff'])
        else
        this.color = gradient(this.color)
        console.log(textFinal + (this.color)(output) + argsText + '\n' + separatorText)
    }
    
    static OptionsVerifications(options, ...args){
        if(typeof options != "object") throw new TypeError("Parameter options are not an object");
        if(args)
        {
            for(let i = 0; i < args.length; i++){
                if(args[i].name === undefined) throw new error.ArgsNotFound('name', i, args[i]);
                if(args[i].info === undefined) throw new error.ArgsNotFound('information', i, args[i]);
            }
        }
    }

}

module.exports = Header