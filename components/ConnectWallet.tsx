import type { FunctionComponent } from "react";
import { Fragment } from "react";
import Link from "next/link";

// React useDapp
import { shortenAddress } from "@usedapp/core";

// Import button
import ButtonOutline from "./ButtonOutline";
import ButtonBlueSecondary from "./ButtonBlueSecondary";

/**
 * ConnectMetamaskProps is a React Component properties that passed to React
 * Component Button
 */
type ConnectWalletProps = {
    account: string | null | undefined;
    deactivate: () => void;
};

/**
 * ConnectMetamask is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ConnectWallet: FunctionComponent<ConnectWalletProps> = ({
    account,
    deactivate,
}) => {
    let isAccountConnected = false;
    let shortAccountAddress = "NOT_CONNECTED";
    if (account) {
        isAccountConnected = true;
        shortAccountAddress = shortenAddress(account);
    }

    if (isAccountConnected) {
        return (
            <div className="flex flex-row gap gap-x-2">
                <div>
                    <ButtonBlueSecondary>
                        {shortAccountAddress}
                    </ButtonBlueSecondary>
                </div>
                <div>
                    <ButtonOutline onClick={deactivate}>
                        Disconnect
                    </ButtonOutline>
                </div>
            </div>
        );
    } else {
        return (
            <Fragment>
                <Link href="/connect">
                    <a>
                        <ButtonOutline>
                            Connect wallet
                        </ButtonOutline>
                    </a>
                </Link>
            </Fragment>
        );
    }
};

export default ConnectWallet;
