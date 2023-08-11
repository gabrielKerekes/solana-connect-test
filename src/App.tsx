import React, { useEffect, useState } from "react";
import "./App.css";
import TrezorConnect from "@trezor/connect-web";
import Solana from "@ledgerhq/hw-app-solana";
import {
  Transaction,
  SystemProgram,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
  AddressLookupTableAccount,
} from "@solana/web3.js";
import { getLedgerTransport } from "./ledgerTransport";

let ledger: Solana | null = null;

const initLedger = async () => {
  if (ledger) return ledger;

  const transport = await getLedgerTransport(() => {
    ledger = null;
  });
  ledger = new Solana(transport);
  return ledger;
};

function App() {
  const [path, setPath] = useState("m/44'/501'/0'/0'");
  const [display, setDisplay] = useState(false);
  const [result, setResult] = useState<any>();
  // const [ledger, setLedger] = useState<Solana | null>();
  const [hwWallet, setHwWallet] = useState<"trezor" | "ledger">("trezor");

  const getPublicKey = async () => {
    if (hwWallet === "trezor") {
      const response = await TrezorConnect.solanaGetPublicKey({
        path,
      });
      console.log({ publicKey: response });

      setResult(response.payload);
    } else {
      setResult("get public key fn not implemented for ledger");
    }
  };

  const getAddress = async () => {
    if (hwWallet === "trezor") {
      const response = await TrezorConnect.solanaGetAddress({
        path,
        showOnTrezor: display,
      });
      console.log({ address: response });

      setResult(response.payload);
    } else {
      const response = await (
        await initLedger()
      ).getAddress(path.replace("m/", ""), display);
      console.log({ address: response?.address.toString("hex") });
      setResult(response?.address.toString("hex"));
    }
  };

  const signTx = async (path: string, serializedTx: string) => {
    if (hwWallet === "trezor") {
      const response = await TrezorConnect.solanaSignTransaction({
        signerPath: path,
        serializedTx,
      });

      console.log({ signature: response });

      return response.payload;
    } else {
      const txBUFFER = Buffer.from(serializedTx, "hex");
      console.log({ txBUFFER });
      const response = await (
        await initLedger()
      ).signTransaction(path.replace("m/", ""), txBUFFER);
      console.log({ signature: response?.signature.toString("hex") });

      return { signature: response?.signature.toString("hex") };
    }
  };

  const signTransferTransaction = async () => {
    const response = signTx(
      path,
      "0100010300d1699dcb1811b50bb0055f13044463128242e37a463b52f6c97a1f6eef88ad8f41927b2e58cbc31ed3aa5163a7b8ca4eb5590e8dc1dc682426cd2895aa9c0a00000000000000000000000000000000000000000000000000000000000000001aea57c9906a7cad656ff61b3893abda63f4b6b210c939855e7ab6e54049213d01020200010c02000000002d310100000000"
    );

    setResult(response);
  };

  const signCreateStakeAccountTransaction = async () => {
    const response = await signTx(
      path,
      "0100030500d1699dcb1811b50bb0055f13044463128242e37a463b52f6c97a1f6eef88adf8359ad2e63b4c9969d63b72c8caa50de8a5bce88c32b5d59c062b491dda86af000000000000000000000000000000000000000000000000000000000000000006a1d8179137542a983437bdfe2a7ab2557f535c8a78722b68a49dc00000000006a7d517192c5c51218cc94c3d4af17f58daee089ba1fd44e3dbd98a00000000c431a67912025e732b884206953b0a61c715c06930ace072ef71588529106ad10202020001630300000000d1699dcb1811b50bb0055f13044463128242e37a463b52f6c97a1f6eef88ad07000000000000007374616b653a308096980000000000c80000000000000006a1d8179137542a983437bdfe2a7ab2557f535c8a78722b68a49dc00000000003020104740000000000d1699dcb1811b50bb0055f13044463128242e37a463b52f6c97a1f6eef88ad00d1699dcb1811b50bb0055f13044463128242e37a463b52f6c97a1f6eef88ad0000000000000000000000000000000000d1699dcb1811b50bb0055f13044463128242e37a463b52f6c97a1f6eef88ad"
    );

    setResult(response);
  };

  const signLegacyTransaction = async () => {
    const walletKey = new PublicKey(
      hwWallet === "trezor"
        ? "ETxHeBBcuw9Yu4dGuP3oXrD12V5RECvmi8ogQ9PkjyVF"
        : "D2PPQSYFe83nDzk96FqGumVU8JA7J8vj2Rhjc2oXzEi5"
    );
    const tx = new Transaction({
      blockhash: "2p4rYZAaFfV5Uk5ugdG5KPNty9Uda9B3b4gWB8qnNqak",
      lastValidBlockHeight: 50,
      feePayer: walletKey,
    }).add(
      SystemProgram.transfer({
        fromPubkey: walletKey,
        toPubkey: new PublicKey("AeDJ1BqA7ruBbd6mEcS1QNxFbT8FQbiBVuN9NqK94Taq"),
        lamports: 20000000,
      })
    );

    const serializedTx = tx.serializeMessage().toString("hex");

    console.log({ serializedTx });

    const response = await signTx(path, serializedTx);
    console.log({ signature: response });

    setResult(response);
  };

  const signV0Transaction = async () => {
    const phantomWalletPubKey = new PublicKey(
      hwWallet === "trezor"
        ? "ETxHeBBcuw9Yu4dGuP3oXrD12V5RECvmi8ogQ9PkjyVF"
        : "D2PPQSYFe83nDzk96FqGumVU8JA7J8vj2Rhjc2oXzEi5"
    );

    const instructions = [
      SystemProgram.transfer({
        fromPubkey: phantomWalletPubKey,
        toPubkey: new PublicKey("D2PPQSYFe83nDzk96FqGumVU8JA7J8vj2Rhjc2oXzEi5"),
        lamports: 20000000,
      }),
      SystemProgram.transfer({
        fromPubkey: phantomWalletPubKey,
        toPubkey: new PublicKey("9wFA8FYZwvBbhE22uvYBZniTXi1KJiN8iNQsegkTWZqS"),
        lamports: 30000000,
      }),
      SystemProgram.transfer({
        fromPubkey: phantomWalletPubKey,
        toPubkey: new PublicKey("GDDMwNyyx8uB6zrqwBFHjLLG3TBYk2F8Az4yrQC5RzMp"),
        lamports: 40000000,
      }),
    ];

    const lookupTableAccount = new AddressLookupTableAccount({
      key: new PublicKey("D2PPQSYFe83nDzk96FqGumVU8JA7J8vj2Rhjc2oXzEi5"),
      state: {
        deactivationSlot: BigInt(0),
        lastExtendedSlot: 0,
        lastExtendedSlotStartIndex: 0,
        addresses: [
          new PublicKey("D2PPQSYFe83nDzk96FqGumVU8JA7J8vj2Rhjc2oXzEi5"),
          new PublicKey("9wFA8FYZwvBbhE22uvYBZniTXi1KJiN8iNQsegkTWZqS"),
        ],
      },
    });

    const anotherLookupTableAccount = new AddressLookupTableAccount({
      key: new PublicKey("H8JEG2wjU2LnjXJUVkivEokcK1pmtHXTyoGeDaBtazCy"),
      state: {
        deactivationSlot: BigInt(10),
        lastExtendedSlot: 10,
        lastExtendedSlotStartIndex: 10,
        addresses: [
          new PublicKey("GDDMwNyyx8uB6zrqwBFHjLLG3TBYk2F8Az4yrQC5RzMp"),
        ],
      },
    });

    const v0Message = new TransactionMessage({
      recentBlockhash: "2p4rYZAaFfV5Uk5ugdG5KPNty9Uda9B3b4gWB8qnNqak",
      payerKey: phantomWalletPubKey,
      instructions,
    }).compileToV0Message([lookupTableAccount, anotherLookupTableAccount]);

    const v0tx = new VersionedTransaction(v0Message);

    const serializedTx = Buffer.from(v0tx.message.serialize()).toString("hex");
    console.log({ serializedTx });

    const response = await signTx(path, serializedTx);
    setResult(response);
  };

  return (
    <div className="App">
      <header className="App-header">
        <select
          value={hwWallet}
          onChange={(e) => setHwWallet(e.target.value as "ledger" | "trezor")}
        >
          <option value="trezor">Trezor</option>
          <option value="ledger">Ledger</option>
        </select>
        <div className="path-input">
          <p>Path:</p>
          <input value={path} onChange={(e) => setPath(e.target.value)} />
          <label>
            <input
              type="checkbox"
              checked={display}
              onChange={() => setDisplay(!display)}
            />
            Display on {hwWallet === "trezor" ? "Trezor" : "Ledger"}
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
        <button onClick={signLegacyTransaction}>Sign built transaction</button>
        <button onClick={signV0Transaction}>Sign V0 transaction</button>

        <div className="result">
          <p>Result:</p>
          <pre>{JSON.stringify(result, null, "\t")}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
