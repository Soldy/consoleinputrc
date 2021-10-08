'use strict';
require('theuniverse');
const $universe = global.theUn1v3rse.controls.interface();
const $stdio = $universe.req('sdio','consolestdiorc', 'base');
const $watch = $universe.req('watch', 'consolewatchrc', 'base');
const $box = new (require('consoleboxrc')).base();


const $setup = new (require('setuprc')).base({
    'x' : {
        'type'    : 'integer',
        'min'     : 40,
        'default' : 40
    },
    'y' : {
        'type'    : 'integer',
        'min'     : 40,
        'default' : 40
    },
    'insert' : {
        'type'    : 'boolean',
        'default' : false
    },
    'render' : {
        'type'    : 'boolean',
        'default' : false
    },
    'history' : {
        'type'    : 'boolean',
        'default' : false
    },

});

const inputBase = function(setup_){
    this.setup = function(setup){
        $setup.setup(setup);
        return $box.setup(setup);
    }
    this.set = function(name, value){
        $setup.set(name,value);
        $box.set(name,value);
    }
    this.move = function(){
        $box.clear();
        $box.move();
        $box.print();
    }
    let _insert = true;
    let _buffer = '';
    let _position = 1;
    const _render = function(){
         console.log(_buffer);
         $box.clear();
         $box.add(_buffer);
    }
    const _event = function(character){
        if(0 > _position)
            _position = 0;
        if(_position > _buffer.length)
            _position = _buffer.length;
        if(_position === _buffer.length){
            _buffer = (_buffer+character);
           _position++;
            return _render();
        }
        let arr = _buffer.split('');
        if(_insert)
            arr.splice(_position, 0, character);
        else
            arr.splice(_position, 1, character);
        _position++;

        _buffer = arr.join('');
        return _render();
    }
    
    $watch.add(
        [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'u', 'r', 's', 't', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'U', 'R', 'S', 'T', 'X', 'Y', 'Z',
            ' ', '`', '¬', '!', '"', '£', '$', '%', '^', '&', '*', '(',
            ')', '_', '=', '<', '>', ':', ':', '@', '~', '#', '?', "'"
        ],
        _event
    );
    $watch.watch();
}


exports.base = inputBase;
