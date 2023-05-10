function Promise(executor) {
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    this.callbacks = [];
    const self = this;
    // 执行器函数是同步执行的

    function resolve(data) {
        // 如果状态被改过，不再执行
        if (self.PromiseState !== 'pending') return;
        // 修改状态，设置对象结果值
        self.PromiseState = 'fulfilled';
        // 设置对象结果值
        self.PromiseResult = data;
        // 指定调用成功的回调函数
        self.callbacks.forEach(item => {
            item.onResolved(data);
        })



    }
    function reject(data) {
        if (self.PromiseState !== 'pending') return;
        self.PromiseState = 'rejected';
        self.PromiseResult = data;
        // 指定调用失败的回调函数
        self.callbacks.forEach(item => {
            item.onRejected(data);
        })

    }
    try {
        executor(resolve, reject);
    } catch (e) {
        // 修改promise状态为失败
        reject(e);
    }

}

// Promise then 方法
Promise.prototype.then = function (onResolved, onRejected) {
    const self = this;
    return new Promise((resolve, reject) => {
        if (this.PromiseState === 'fulfilled') {
            try {
                let result = onResolved(this.PromiseResult);
                if (result instanceof Promise) {
                    result.then(v => {
                        resolve(v);
                    }, r => {
                        reject(r);
                    })
                } else {
                    resolve(result);
                }
            }
            catch (e) {
                reject(e);
            }
        }
        if (this.PromiseState === 'rejected') {
            onRejected(this.PromiseResult);
        }
        // 判断pending状态
        if (this.PromiseState === 'pending') {
            // 保存所有回调函数，所以放到数组里，有可能指定了多个回调
            this.callbacks.push({
                onResolved: function () {
                    // 执行成功回调函数
                    let result = onResolved(self.PromiseResult);
                    if (result instanceof Promise) {
                        result.then(v => { resolve(v) }, r => { reject(r) })
                    } else {
                        resolve(result);
                    }
                },
                onRejected: function () {
                    // 执行失败回调函数
                   let result= onRejected(self.PromiseResult);
                   if(result instanceof Promise){
                      
                   }
                }
            })
        }

    });


}