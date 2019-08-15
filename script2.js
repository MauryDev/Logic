var click_ = false;
function And(start, callback) {
    var obj = {};
    var obj_private = {};
    var methods = {
        create: function (name, condition) {
            obj_private[name] = {
                on: false,
                condition: condition,
                update: function () {
                    if (this.condition.length < 1) {
                        obj_private[name].on = false;
                        return;
                    }
                    for (let i in condition) {
                        if (!Boolean(this.condition[i])) {
                            obj_private[name].on = false;
                            return;
                        }
                    }
                    obj_private[name].on = true;
                    return;
                }
            }
            obj[name] = {
                get on() {
                    return obj_private[name].on;
                },
            }
        },
        condition: (obj, index, value) => {
            obj_private[obj].condition[index] = Boolean(value);
        },
    };
    var update = function () {
        for (let i in obj) {
            obj_private[i].update();
        }
        callback(obj, methods);
    }
    start(methods);
    setInterval(update, 1000);
}
And(function (methods) {
    methods.create('m', [true, false]);
    methods.condition("m", 1, true);
}, function (obj, methods) {
    if (click_) {
        methods.condition(document.getElementById('obj').value, document.getElementById('id').value, document.getElementById('on').checked);
        click = false;
    }
    console.log(obj['m'].on)
})