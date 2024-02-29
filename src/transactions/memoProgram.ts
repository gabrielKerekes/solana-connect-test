import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { BLOCKHASH, LAST_VALID_BLOCK_HEIGHT, allFullPubKey } from "./contants";

export const memo = () => {
  const tx = new Transaction({
    blockhash: BLOCKHASH,
    lastValidBlockHeight: LAST_VALID_BLOCK_HEIGHT,
    feePayer: allFullPubKey,
  }).add(
    new TransactionInstruction({
      keys: [
        {
          pubkey: allFullPubKey,
          isSigner: true,
          isWritable: true,
        },
      ],
      data: Buffer.from("Hello World", "utf-8"),
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
    })
  );

  return tx.serializeMessage().toString("hex");
};
