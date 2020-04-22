'use strict';
const fs = require('fs');
const {WASI} = require('wasi');
const wasi = new WASI({
    args: process.argv,
    env: process.env,
    preopens: {
        '/sandbox': '/Users/linux_china/data/sandbox'
    }
});
const importObject = {wasi_unstable: wasi.wasiImport, wasi_snapshot_preview1: wasi.wasiImport};

(async () => {
    const wasm = await WebAssembly.compile(fs.readFileSync('./example.wasm'));
    const instance = await WebAssembly.instantiate(wasm, importObject);

    wasi.start(instance);
})();
