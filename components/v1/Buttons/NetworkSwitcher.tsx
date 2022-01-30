import type { FunctionComponent } from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

import { chain as Chains, Chain, useNetwork } from "wagmi";

import { useWalletContext, supportedChains } from "../Wallet";

import RisedleLinks from "../../../utils/links";
import ButtonClose from "./Close";

/**
 * ButtonNetworkSwitcherProps is a React Component properties that passed to React Component ButtonNetworkSwitcher
 */
type ButtonNetworkSwitcherProps = {};

/**
 * ButtonNetworkSwitcher is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonNetworkSwitcher: FunctionComponent<ButtonNetworkSwitcherProps> = ({}) => {
    const { chain, switchChain, account } = useWalletContext();
    const [networkData, switchNetwork] = useNetwork();
    let [isOpen, setIsOpen] = useState(false);

    // console.debug("ButtonNetworkSwitcher chain", chain);

    const getChainIconPath = (c: Chain): string => {
        switch (c.id) {
            case Chains.arbitrumOne.id:
                return "/networks/Arbitrum.svg";
            case Chains.kovan.id:
                return "/networks/Kovan.svg";
        }
        return "";
    };

    const switchToNetwork = (c: Chain) => {
        // If user is connected then use switch network feature
        if (account && switchNetwork) {
            switchNetwork(c.id);
        }

        // Otherwise change manually
        switchChain(c.id);
        setIsOpen(false);
        return;
    };

    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-20 overflow-y-auto">
                <div className="flex min-h-screen items-center justify-center">
                    <Dialog.Overlay className="fixed inset-0 bg-gray-dark-1/60 backdrop-blur dark:bg-black/60" />

                    <div className="relative mx-auto flex w-[342px] flex-col rounded-[24px] border border-gray-light-3 bg-gray-light-1 dark:border-gray-dark-3 dark:bg-gray-dark-1">
                        <Dialog.Title className="m-0 flex flex-row items-center justify-between border-b border-dashed border-gray-light-3 px-4 py-4 dark:border-gray-dark-3">
                            <span className="grow pl-[40px] text-center text-base font-bold leading-none text-gray-light-12 dark:text-gray-dark-12">Switch a Network</span>
                            <ButtonClose
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            />
                        </Dialog.Title>

                        <div className="flex max-w-[342px] flex-col space-y-2 p-4">
                            {supportedChains.map((c) => {
                                return (
                                    <button
                                        className="m-0 flex w-full flex-row items-center space-x-4 rounded-[12px] border border-gray-light-5 bg-gray-light-2 py-[11px] px-[11px] text-left dark:border-gray-dark-5 dark:bg-gray-dark-2"
                                        onClick={() => {
                                            switchToNetwork(c);
                                        }}
                                        key={c.id}
                                    >
                                        <img src={getChainIconPath(c)} alt={c.name} className="h-[32px] w-[32px]" />
                                        <span className="text-sm font-semibold leading-4 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12">{c.name}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="m-0 border-t border-dashed border-gray-light-3 p-4 text-center dark:border-gray-dark-3">
                            <p className="leading-1 text-xs text-gray-light-11 dark:text-gray-dark-11">
                                Don&apos;t see you network? Chat us on{" "}
                                <a className="text-gray-light-12 underline dark:text-gray-dark-12" target="_blank" rel="noreferrer" href={RisedleLinks.discord}>
                                    discord
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </Dialog>

            <button className="button basic p-0" onClick={() => setIsOpen(true)}>
                <img src={getChainIconPath(chain)} alt={chain.name} className="m-[11px] h-[16px] w-[16px]" />
            </button>
        </>
    );
};

export default ButtonNetworkSwitcher;
