const {WASI} = require('@wasmer/wasi');
const {WasmFs} = require("@wasmer/wasmfs");
const nodeFs = require("fs");

const wasmFs = new WasmFs();
let wasi = new WASI({
    preopenDirectories: {},
    env: {},
    args: [],
    bindings: {
        //fs: wasmFs,
        fs: nodeFs,
        ...WASI.defaultBindings
    }
});

// Convert node Buffer to Uint8Array
function toUint8Array(buf) {
    let u = new Uint8Array(buf.length);
    for (let i = 0; i < buf.length; ++i) {
        u[i] = buf[i]
    }
    return u
}


const startWasiTask = async () => {
    // Fetch our Wasm File
    const wasm_bytes = toUint8Array(nodeFs.readFileSync("./example.wasm"));
    // Instantiate the WebAssembly file
    let {instance} = await WebAssembly.instantiate(wasm_bytes, {
        wasi_unstable: wasi.wasiImport
    });
    // Start the WebAssembly WASI instance!
    wasi.start(instance);
    // Output what's inside of /dev/stdout!
    const stdout = await wasmFs.getStdOut();
    console.log(stdout);
};

startWasiTask().finally(() => {
    //console.log("Exit")
});
