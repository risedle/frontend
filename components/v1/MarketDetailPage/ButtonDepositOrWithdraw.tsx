import type { FunctionComponent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { Metadata } from "../MarketMetadata";
import { useWalletContext } from "../Wallet";
import Redeem from "./Redeem";
import Deposit from "./Deposit";

/**
 * ButtonDepositOrWithdrawProps is a React Component properties that passed to React Component ButtonDepositOrWithdraw
 */
type ButtonDepositOrWithdrawProps = {
    address: string;
};

/**
 * ButtonDepositOrWithdraw is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonDepositOrWithdraw: FunctionComponent<ButtonDepositOrWithdrawProps> = ({ address }) => {
    const { chain } = useWalletContext();
    const metadata = Metadata[chain.id][address];

    return (
        <Dialog.Root>
            <Dialog.Trigger className="bg-blue-light-10 dark:bg-blue-dark-10 border border-blue-light-11 dark:border-blue-dark-11 rounded-full w-full text-sm leading-4 tracking-[-0.02em] text-gray-light-1 dark:text-blue-light-1 font-semibold py-[11px] w-full">Deposit or Withdraw</Dialog.Trigger>
            <Dialog.Overlay className="fixed inset-0 bg-gray-dark-1/60 dark:bg-black/60 backdrop-blur z-30" />
            <Dialog.Content className="fixed left-0 bottom-0 z-30 w-screen sm:-translate-y-1/3 sm:min-h-[477px]">
                {/* Mint or Redeem container */}
                <div className="mx-4 mb-4 sm:max-w-[376px] sm:m-auto flex flex-col bg-gray-light-1 dark:bg-gray-dark-1 border border-gray-light-3 dark:border-gray-dark-3 rounded-[24px] mx-auto p-4">
                    <Dialog.Title className="flex flex-row justify-between items-center mb-4">
                        <div className="flex flex-row items-center space-x-4">
                            <div>
                                <img src={metadata.vaultLogo} alt={metadata.vaultTitle} />
                            </div>
                            <div>
                                <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{metadata.subtitle}</p>
                                <h1 className="m-0 text-base tracking-[-0.02em] font-bold text-gray-light-12 dark:text-gray-dark-12">{metadata.vaultTitle}</h1>
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <button className="button basic p-0 h-[32px]">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-gray-light-12 dark:fill-gray-dark-12 w-[11px] h-[11px] m-[9.5px]">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                                    />
                                </svg>
                            </button>
                        </Dialog.Close>
                    </Dialog.Title>

                    <Tabs.Root defaultValue="deposit" className="outline-0">
                        <Tabs.List aria-label="depositOrWithdraw" className="bg-gray-light-3 dark:bg-gray-dark-2 rounded-[12px] flex flex-row p-1 mx-auto mb-6 mt-2">
                            <Tabs.Trigger value="deposit" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 state-active:text-gray-light-12 state-active:dark:text-gray-dark-12 state-active:font-bold state-active:py-[12px] state-active:dark:bg-gray-dark-4 state-active:bg-gray-light-1">
                                Deposit
                            </Tabs.Trigger>
                            <Tabs.Trigger value="withdraw" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 state-active:text-gray-light-12 state-active:dark:text-gray-dark-12 state-active:font-bold state-active:py-[12px] state-active:dark:bg-gray-dark-4 state-active:bg-gray-light-1">
                                Withdraw
                            </Tabs.Trigger>
                        </Tabs.List>

                        <Tabs.Content value="deposit" className="outline-0 flex flex-col mx-auto sm:max-w-[540px] space-y-6">
                            <Deposit address={address} />
                        </Tabs.Content>
                        <Tabs.Content value="withdraw" className="outline-0 flex flex-col mx-auto sm:max-w-[540px] space-y-6">
                            <Redeem address={address} />
                        </Tabs.Content>
                    </Tabs.Root>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default ButtonDepositOrWithdraw;
