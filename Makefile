all: example.wasm

example.wasm: example.c
	wasicc example.c -o example.wasm

run: example.wasm
	wasirun example.wasm

.PHONY : clean
clean:
	rm -rf *.wasm


