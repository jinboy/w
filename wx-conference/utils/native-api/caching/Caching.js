/**
 * Created by Tabjin 2019-12-10
 * @description 微信 数据缓存
 * @author Tabjin
 * @date 2019/12/10 14:31
 */


class Caching {
    /**
     * wx.setStorage 的同步版本
     * @param key {string} 本地缓存中指定的 key
     * @param data {*} 需要存储的内容。只支持原生类型、Date、及能够通过JSON.stringify序列化的对象
     */
    static setStorageSync(key, data) {
        try {
            wx.setStorageSync({
                key: key,
                data: data,
            });
        } catch (e) {
            console.log('setStorageSync', e);
            // Do something when catch error
        }

    }

    /**
     * 将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
     * @param key {string} 本地缓存中指定的 key
     * @param data {*} 需要存储的内容。只支持原生类型、Date、及能够通过JSON.stringify序列化的对象
     */
    static setStorage(key, data) {
        try {
            wx.setStorage({
                key: key,
                data: data,
            });
        } catch (e) {
            console.log('setStorage', e);
            // Do something when catch error
        }

    }

    /**
     * wx.removeStorage 的同步版本
     * @param key {string} 本地缓存中指定的 key
     */
    static removeStorageSync(key) {
        try {
            wx.removeStorageSync({
                key: key,
            });
        } catch (e) {
            console.log('removeStorageSync', e);
            // Do something when catch error
        }
    }

    /**
     * 从本地缓存中移除指定 key
     * @param key {string} 本地缓存中指定的 key
     */
    static removeStorage(key) {
        try {
            wx.removeStorage({
                key: key,
            });
        } catch (e) {
            console.log('removeStorage', e);
            // Do something when catch error
        }
    }

    /**
     * wx.getStorage 的同步版本
     * @param key {string} 本地缓存中指定的 key
     */
    static getStorageSync(key) {
        try {
            wx.getStorageSync({
                key: key,
            });
        } catch (e) {
            console.log('getStorageSync', e);
            // Do something when catch error
        }
    }

    /**
     * wx.getStorageInfo 的同步版本
     */
    static getStorageInfoSync() {
        try {
            wx.getStorageInfoSync();
        } catch (e) {
            console.log('getStorageInfoSync', e);
            // Do something when catch error
        }
    }

    /**
     * 异步获取当前storage的相关信息
     */
    static getStorageInfo() {
        try {
            wx.getStorageInfo();
        } catch (e) {
            console.log('getStorageInfo', e);
            // Do something when catch error
        }
    }

    /**
     * 从本地缓存中异步获取指定 key 的内容
     * @param key {string} 本地缓存中指定的 key
     */
    static getStorage(key) {
        try {
            wx.getStorageInfo({
                key: key,
            });
        } catch (e) {
            console.log('getStorage', e);
            // Do something when catch error
        }
    }

    /**
     * wx.clearStorage 的同步版本
     * @param key
     */
    static clearStorageSync(key) {
        try {
            wx.clearStorageSync({
                key: key,
            });
        } catch (e) {
            console.log('clearStorageSync', e);
            // Do something when catch error
        }
    }

    /**
     * 清理本地数据缓存
     */
    static clearStorage() {
        try {
            wx.clearStorage();
        } catch (e) {
            console.log('clearStorage', e);
            // Do something when catch error
        }
    }
}

export {
    Caching
}