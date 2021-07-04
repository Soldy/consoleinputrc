require('theuniverse');
const $universe = global.theUn1v3rse.controls.interface();
const $stdio = $universe.req('sdio','consolestdiorc', 'base');
const $watch = $universe.req('watch', 'consolewatchrc', 'base');
const $box = new (require('consoleboxrc')).base();


const inputBase = function(){
    this.setup = function(){
        return $box.setup();
    }
    this.set = function(name, value){
        $box.set(name,value);
    }
    this.move = function(){
        $box.clean();
        $box.move();
        $box.print();
    }
    let _x = 0;
    let _y = 0;
    let _insert = false;
    let _buffer = '';
    let _position = 0;
    const _render = function(){
         $box.clear();
         $box.add(_buffer);
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
    $box.rc.set();
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


exports.base = confrcBase;
