require('theuniverse');
const $universe = global.theUn1v3rse.controls.interface();
const $stdio = $universe.req('sdio','consolestdiorc', 'base');
const $watch = $universe.req('watch', 'consolewatchrc', 'base');
const $box = $universe.req('watch', 'consoleboxrc', 'base');


const inputBase = function(){

    let _x = 0;
    let _y = 0;
    let _insert = false;
    let _buffer = '';
    let _position = 0;
    const _render = function(){

    }
    const _event = function(character){
        if(_position > _buffer.length)
            _position = 0;
        if(_position > _buffer.length)
            _position = _buffer.length;
        if(_position === _buffer.length){
            _buffer = (_buffer+character);
            return render();
        }
        let arr = _buffer.split('');
        if(_insert)
            arr.splice(_position, 0, character);
        else
            arr.splice(_position, 1, character);
        _buffer = arr.join('');
        return render();
    }
}


exports.base = confrcBase;
