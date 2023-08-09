import React, { useState } from "react";
import "./App.css";
import TrezorConnect from "@trezor/connect-web";

function App() {
  const [path, setPath] = useState("m/44'/501'/0'/0'");
  const [display, setDisplay] = useState(false);
  const [result, setResult] = useState<any>();

  const getPublicKey = async () => {
    const response = await TrezorConnect.solanaGetPublicKey({
      path,
    });
    console.log({ publicKey: response });

    setResult(response.payload);
  };

  const getAddress = async () => {
    const response = await TrezorConnect.solanaGetAddress({
      path,
      showOnTrezor: display,
    });
    console.log({ address: response });

    setResult(response.payload);
  };

  const signTransferTransaction = async () => {
    const response = await TrezorConnect.solanaSignTransaction({
      signerPath: path,
      serializedTx:
        "0100010300d1699dcb1811b50bb0055f13044463128242e37a463b52f6c97a1f6eef88ad8f41927b2e58cbc31ed3aa5163a7b8ca4eb5590e8dc1dc682426cd2895aa9c0a00000000000000000000000000000000000000000000000000000000000000001aea57c9906a7cad656ff61b3893abda63f4b6b210c939855e7ab6e54049213d01020200010c02000000002d310100000000",
    });
    console.log({ signature: response });

    setResult(response.payload);
  };

  const signCreateStakeAccountTransaction = async () => {
    const response = await TrezorConnect.solanaSignTransaction({
      signerPath: path,
      serializedTx:
        "0100030500d1699dcb1811b50bb0055f13044463128242e37a463b52f6c97a1f6eef88adf8359ad2e63b4c9969d63b72c8caa50de8a5bce88c32b5d59c062b491dda86af000000000000000000000000000000000000000000000000000000000000000006a1d8179137542a983437bdfe2a7ab2557f535c8a78722b68a49dc00000000006a7d517192c5c51218cc94c3d4af17f58daee089ba1fd44e3dbd98a00000000c431a67912025e732b884206953b0a61c715c06930ace072ef71588529106ad10202020001630300000000d1699dcb1811b50bb0055f13044463128242e37a463b52f6c97a1f6eef88ad07000000000000007374616b653a308096980000000000c80000000000000006a1d8179137542a983437bdfe2a7ab2557f535c8a78722b68a49dc00000000003020104740000000000d1699dcb1811b50bb0055f13044463128242e37a463b52f6c97a1f6eef88ad00d1699dcb1811b50bb0055f13044463128242e37a463b52f6c97a1f6eef88ad0000000000000000000000000000000000d1699dcb1811b50bb0055f13044463128242e37a463b52f6c97a1f6eef88ad",
    });
    console.log({ signature: response });

    setResult(response.payload);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="path-input">
          <p>Path:</p>
          <input value={path} onChange={(e) => setPath(e.target.value)} />
          <label>
            <input
              type="checkbox"
              checked={display}
              onChange={() => setDisplay(!display)}
            />
            Display on Trezor
          </label>
        </div>

        <button onClick={getPublicKey}>Get public key</button>
        <button onClick={getAddress}>Get address</button>
        <button onClick={signTransferTransaction}>
          Sign transfer transaction
        </button>
        <button onClick={signCreateStakeAccountTransaction}>
          Sign create stake account transaction
        </button>

        <div className="result">
          <p>Result:</p>
          <pre>{JSON.stringify(result, null, "\t")}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
