cargo build --release --target wasm32-unknown-unknown --package votingsystem_backend


candid-extractor target/wasm32-unknown-unknown/release/votingsystem_backend.wasm >src/votingsystem_backend/votingsystem_backend.did


dfx deploy
