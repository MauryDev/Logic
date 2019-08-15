var debug = (value) => {
    document.getElementById("debug").innerHTML = value;
}
var _click = false;
function AND(start,update) {
    var obj = {};
    var obj_private = {};
    var methods = {
        create: (name,condition) => {
            obj_private[name] = {
                on: false,
                condition_: (Array.isArray(condition)) ? function() {
                    let ii = []
                    for(let i in condition) {
                        ii.push(condition[i]);
                    }
                    return ii;
                }() : [],
                condition: (Array.isArray(condition)) ? condition : [],
                update: function() {
                    if (this.condition.length < 1) {
                        this.on = false;
                        return;
                    }
                    for (let i in this.condition) {
                        if (!Boolean(this.condition[i])) {
                            this.on = false;
                            return;
                        }
                    }
                    this.on = true;
                    return;
                }
            }
            obj[name] = {
                get on() {
                    return obj_private[name].on;
                }
            }
        },
        condition: (obj_,index,value) => {
            obj_private[obj_].condition[index] = value;
        },
        delete : function(obj_) {
            delete obj[obj_];
            delete obj_private[obj_];
        },
        copy: function(name,obj_) {
          obj[name] = obj[obj_];
          obj_private[name] = obj_private[obj_];  
        },
        reset: function(name) {
            console.log(obj_private[name].condition_);
            obj_private[name].condition = obj_private[name].condition_;
        }
    }
    var _update = () => {
        for (let i in obj_private) {
            obj_private[i].update();
        }
        if (typeof update == 'function') {
            update(obj,methods);
        }
    }
    setInterval(_update,100);
    start(methods);
}
let obj_ = document.getElementById('obj');
let id = document.getElementById('id');
let on = document.getElementById('on');
AND(
    function(methods) {
        methods.create('m',[true,true]);
        methods.copy('c',"m");
        methods.condition('c',1,false);
        methods.reset('c');
    },
    function(obj,methods) {
        debug(obj.c.on);
        if (_click) {
            methods.condition(obj_.value, id.value,on.checked);
            _click = false;
        }
    }
)