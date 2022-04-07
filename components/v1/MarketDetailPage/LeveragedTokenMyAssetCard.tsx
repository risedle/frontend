import { ethers } from "ethers";
import type { FunctionComponent } from "react";
import { addTokenToMetamask, tokenType } from "../../../utils/addTokenToMetamask";
import { tokenBalanceFormatter } from "../../../utils/formatters";
import ButtonTertiary from "../Buttons/ButtonTertiary";
import { Metadata } from "../MarketMetadata";
import { useLeveragedTokenNAV } from "../swr/useLeveragedTokenNAV";
import { useTokenBalance } from "../swr/useTokenBalance";
import { useVaultExchangeRate } from "../swr/useVaultExchangeRate";
import { DEFAULT_CHAIN, useWalletContext } from "../Wallet";
import { AssetsItem } from "./AssetsItem";

/**
 * MyAssetCardProps is a React Component properties that passed to React Component MyAssetCard
 */
type MyAssetCardProps = {
    address: string;
    isVault?: boolean;
};

// }

/**
 * MyAssetCard is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const MyAssetCard: FunctionComponent<MyAssetCardProps> = ({ address, isVault = false }) => {
    const { account, chain, provider } = useWalletContext();
    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;
    const metadata = Metadata[chainID][address];
    // Read on-chain data
    const navResponse = useLeveragedTokenNAV({ token: address, vault: metadata.vaultAddress, provider: provider });
    const latestVaultExchangeRateResponse = useVaultExchangeRate({ vault: metadata.vaultAddress, provider: provider });
    const balanceResponse = useTokenBalance({ account: account, token: isVault ? metadata.vaultAddress : address, provider: provider });

    // Data
    const nav = parseFloat(ethers.utils.formatUnits(navResponse.data ? navResponse.data : 0, metadata.debtDecimals));
    const latestVaultExchangeRate = parseFloat(ethers.utils.formatUnits(latestVaultExchangeRateResponse.data ? latestVaultExchangeRateResponse.data : 0, metadata.collateralDecimals));
    const balance = parseFloat(ethers.utils.formatUnits(balanceResponse.data ? balanceResponse.data : 0, isVault ? metadata.debtDecimals : metadata.collateralDecimals));
    const value = (isVault ? latestVaultExchangeRate : nav) * balance;

    // UI states
    const showLoading = navResponse.isLoading || balanceResponse.isLoading ? true : false;
    const showError = navResponse.error || balanceResponse.error ? true : false;
    const showData = !showLoading && !showError && navResponse.data && balanceResponse.data ? true : false;
    if (balance > 0) {
        return (
            <div className="flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2">
                <div className="pt-4">
                    <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">My Asset</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <AssetsItem title="Token Balance" image="/markets/tokenBalanceIcon.svg" value={`${tokenBalanceFormatter.format(balance)}`} showData={showData} showLoading={showLoading || showError} />
                    <AssetsItem title="Value (USDC)" image="/markets/valueIcon.svg" value={`${tokenBalanceFormatter.format(value)}`} showData={showData} showLoading={showLoading || showError} />
                    <AssetsItem title="Return" image="/markets/returnIcon.svg" value={`-`} showData={showData} showLoading={showLoading || showError} />
                    <AssetsItem title="Return (USDC)" image="/markets/returnDollarIcon.svg" value={`-`} showData={showData} showLoading={showLoading || showError} />
                </div>
                <ButtonTertiary full onClick={async () => await addTokenToMetamask({ token: tokenType.ETHRISE, chainID: chain.chain.id, isVaultToken: isVault })}>
                    Add {isVault ? metadata.vaultTitle : metadata.title} to Wallet
                </ButtonTertiary>
            </div>
        );
    }
    return null;
};

export default MyAssetCard;
