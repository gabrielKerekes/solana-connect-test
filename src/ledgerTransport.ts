import type Transport from "@ledgerhq/hw-transport";
import TransportWebHid from "@ledgerhq/hw-transport-webhid";
import TransportWebUsb from "@ledgerhq/hw-transport-webusb";
import platform from "platform";

export enum LedgerTransportErrors {
  NotInitialized = "Ledger not initialized",
  UnexpectedReplyPayload = "Received unexpected reply payload",
  InvalidDerivationPath = "Invalid derivation path",
  Unsupported = "Unsupported",
  AlreadyInCall = "Already in Call",
}

export async function createTransport(): Promise<Transport> {
  // (inspired by adalite)
  // https://github.com/vacuumlabs/adalite/blob/develop/app/frontend/wallet/shelley/shelley-ledger-crypto-provider.ts
  const isWebHidSupported = async (): Promise<boolean> => {
    if (!platform.os) return false;
    const isSupported = await TransportWebHid.isSupported();
    return isSupported && platform.name !== "Opera";
  };

  const isWebUsbSupported = async (): Promise<boolean> =>
    await TransportWebUsb.isSupported();

  if (await isWebHidSupported()) {
    return await TransportWebHid.create();
  } else if (await isWebUsbSupported()) {
    return (await TransportWebUsb.create()) as Transport;
  } else {
    throw new Error(LedgerTransportErrors.Unsupported);
  }
}

let transport: Transport | null = null;

export async function getLedgerTransport(
  onDisconnect: () => unknown
): Promise<Transport> {
  if (transport) {
    try {
      await transport.close();
    } finally {
      transport = null;
    }
  }
  transport = await createTransport();
  transport.on("disconnect", onDisconnect);
  return transport;
}
