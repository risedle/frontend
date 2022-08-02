import Link from "next/link";
import type { FunctionComponent } from "react";
import { useState } from "react";

// Import components

// Import utils
import RisedleLinks from "../../utils/links";

// Import radix ui
import * as HoverCard from "@radix-ui/react-hover-card";
import Logo from "./Logo";
import ButtonLaunchBasic from "../../components/v1/Buttons/LaunchBasic";
import ButtonThemeSwitcher from "../../components/v1/Buttons/ThemeSwitcher";
import { BannerBSC } from "../Banner/BannerNewNetwork";

/**
 * NavigationProps is a React Component properties that passed to React Component Navigation
 */
type NavigationProps = {};

/**
 * Navigation is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Navigation: FunctionComponent<NavigationProps> = ({}) => {
    // Set dropdown menu state
    const [communitiesOpened, setCommunitiesOpened] = useState(false);
    const [resourcesOpened, setResourcesOpened] = useState(false);

    return (
        <div className="sticky top-0 z-40">
            <BannerBSC />
            <div className=" flex flex-row items-center justify-between bg-gray-light-1/90 p-4 backdrop-blur-lg dark:bg-gray-dark-1/90">
                <div className="flex-none md:w-[162.8px]">
                    <Link href="/">
                        <a className="flex items-center">
                            <Logo />
                            <span className="traking-tight leading-0 self-center pl-2 font-inter text-base font-bold text-gray-light-12 dark:text-gray-light-1">Risedle</span>
                        </a>
                    </Link>
                </div>
                <div className="hidden flex-none flex-row gap-8 text-center sm:flex">
                    <Link href={RisedleLinks.docs}>
                        <a className="text-sm text-gray-light-12 dark:text-gray-dark-12 sm:self-center">Docs &#8599;</a>
                    </Link>
                    <Link href={RisedleLinks.blog}>
                        <a className="text-sm text-gray-light-12 dark:text-gray-dark-12 sm:self-center">Blog &#8599;</a>
                    </Link>

                    <HoverCard.Root
                        openDelay={300}
                        open={communitiesOpened}
                        onOpenChange={(open) => {
                            setCommunitiesOpened(open);
                        }}
                    >
                        <HoverCard.Trigger onClick={() => setCommunitiesOpened((v) => !v)} className={`flex cursor-pointer items-center text-sm ${communitiesOpened ? "text-gray-light-10 dark:text-gray-dark-10" : "text-gray-light-12 dark:text-gray-dark-12"} transition sm:self-center`}>
                            Communities
                            <svg className={`${communitiesOpened ? "stroke-gray-light-10 dark:stroke-gray-dark-10" : "stroke-gray-light-12 dark:stroke-gray-dark-12"}`} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </HoverCard.Trigger>
                        <HoverCard.Content sideOffset={16} className="transition duration-300 ease-out">
                            <div className="flex min-w-[161px] flex-col rounded-[8px] border border-gray-light-4 bg-gray-light-2 p-[8px] dark:border-gray-dark-4 dark:bg-gray-dark-2">
                                <a href={RisedleLinks.twitter} className="flex items-center rounded-[8px] p-[8px] text-sm text-gray-light-11 transition hover:bg-gray-light-3 hover:text-gray-light-12 dark:text-gray-dark-11 hover:dark:bg-gray-dark-3 hover:dark:text-gray-dark-12">
                                    <span className="grow text-left">
                                        Twitter <span className="text-gray-light-10 dark:text-gray-dark-10">&#8599;</span>
                                        <span className={`ml-2   h-[8px] w-[8px] rounded-full bg-sky-light-10 shadow-[0px_0px_12px] shadow-sky-light-10 dark:bg-sky-dark-10 dark:shadow-sky-dark-10`}></span>
                                    </span>
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block fill-gray-light-12 dark:fill-gray-dark-12">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.23251 4.69633C7.23251 2.96887 8.6325 1.5686 10.3591 1.5686C11.3727 1.5686 12.1821 2.04807 12.7245 2.74388C13.3071 2.6247 13.8548 2.40916 14.3504 2.11511C14.155 2.72601 13.7416 3.23963 13.2025 3.56466C13.2029 3.56571 13.2034 3.56677 13.2038 3.56782C13.7325 3.50364 14.2356 3.36305 14.704 3.15549L14.7028 3.15718C14.3659 3.66186 13.9422 4.10739 13.4553 4.47037C13.4814 4.64675 13.4947 4.8243 13.4947 5.00083C13.4947 8.68713 10.6864 12.9746 5.52037 12.9746C3.93821 12.9746 2.46458 12.5111 1.22419 11.7152C0.991778 11.5661 0.924253 11.2568 1.07337 11.0244C1.08655 11.0038 1.10097 10.9846 1.11648 10.9667C1.20497 10.8202 1.37353 10.731 1.55454 10.7523C2.46981 10.8601 3.38483 10.7486 4.19134 10.3963C3.39141 10.0434 2.77044 9.35978 2.50118 8.51977C2.45273 8.36863 2.48749 8.20314 2.59266 8.08425C2.5963 8.08014 2.60001 8.07609 2.60379 8.07213C1.96306 7.50822 1.55888 6.68211 1.55888 5.76146V5.72762C1.55888 5.56817 1.64326 5.42062 1.78069 5.33977C1.82585 5.3132 1.87452 5.29514 1.92446 5.28561C1.70463 4.86158 1.5803 4.37988 1.5803 3.86961C1.5803 3.40168 1.58298 2.81195 1.91247 2.28084C1.98633 2.16178 2.10672 2.08918 2.23554 2.07198C2.42503 2.0124 2.64002 2.06972 2.7732 2.23305C3.86451 3.57129 5.4398 4.49586 7.2328 4.73964L7.23251 4.69633ZM5.52037 11.9746C4.73301 11.9746 3.97696 11.8436 3.27162 11.6024C4.12926 11.4538 4.95222 11.116 5.66133 10.5602C5.81125 10.4427 5.87096 10.2436 5.8104 10.063C5.74985 9.88237 5.58214 9.75946 5.3917 9.7561C4.68883 9.74369 4.06626 9.39719 3.67707 8.86848C3.86743 8.85309 4.05343 8.82042 4.23359 8.7717C4.43517 8.71719 4.57277 8.53117 4.56588 8.32246C4.559 8.11375 4.40944 7.93721 4.2047 7.89611C3.42609 7.7398 2.79797 7.16767 2.56083 6.42178C2.76169 6.47028 2.97016 6.49914 3.18396 6.50613C3.38477 6.5127 3.56561 6.38536 3.62709 6.19408C3.68858 6.0028 3.61581 5.79394 3.44878 5.68227C2.86438 5.29158 2.4803 4.62467 2.4803 3.86961C2.4803 3.70216 2.48266 3.55272 2.4927 3.41722C3.8503 4.79916 5.70787 5.68934 7.77503 5.79342C7.9314 5.80129 8.08242 5.73546 8.1831 5.61556C8.28377 5.49565 8.32247 5.33551 8.28765 5.18287C8.2517 5.0252 8.23251 4.86287 8.23251 4.69633C8.23251 3.52088 9.18506 2.5686 10.3591 2.5686C11.5934 2.5686 12.4947 3.71212 12.4947 5.00083C12.4947 8.25712 10.0194 11.9746 5.52037 11.9746Z"
                                        />
                                    </svg>
                                </a>
                                <a href={RisedleLinks.discord} className="flex items-center rounded-[8px] p-[8px] text-sm text-gray-light-11 transition hover:bg-gray-light-3 hover:text-gray-light-12 dark:text-gray-dark-11 hover:dark:bg-gray-dark-3 hover:dark:text-gray-dark-12">
                                    <span className="grow text-left">
                                        Discord <span className="text-gray-light-10 dark:text-gray-dark-10">&#8599;</span>
                                        <span className={`ml-2  h-[8px] w-[8px] rounded-full bg-sky-light-10 shadow-[0px_0px_12px] shadow-sky-light-10 dark:bg-sky-dark-10 dark:shadow-sky-dark-10`}></span>
                                    </span>
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block fill-gray-light-12 dark:fill-gray-dark-12">
                                        <g clipPath="url(#clip0_481_19437)">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.07822 1.80611C5.03464 1.79926 4.99034 1.79821 4.94647 1.80299C4.10208 1.89496 2.81948 2.34982 2.06223 2.76053C2.01005 2.78883 1.96333 2.8262 1.92425 2.87088C1.60818 3.23226 1.3226 3.82072 1.09913 4.37441C0.869176 4.94414 0.678732 5.54458 0.570145 5.97872C0.216998 7.39064 0.0231337 9.08579 -0.00189248 10.6923C-0.00319648 10.776 0.0165382 10.8587 0.0555016 10.9328C0.359172 11.5102 1.00949 12.0436 1.65842 12.4324C2.31496 12.8258 3.08188 13.1378 3.70254 13.1977C3.85826 13.2128 4.01205 13.154 4.11813 13.039C4.27391 12.8702 4.53704 12.478 4.7348 12.1753C4.84011 12.0141 4.93753 11.8616 5.00853 11.7495C5.01338 11.7419 5.0181 11.7344 5.0227 11.7271C5.69509 11.8888 6.51587 12.0002 7.50063 12.0002C8.48434 12.0002 9.30442 11.889 9.97641 11.7277C9.9809 11.7348 9.98552 11.7421 9.99025 11.7495C10.0613 11.8616 10.1587 12.0141 10.264 12.1753C10.4617 12.478 10.7249 12.8702 10.8806 13.039C10.9867 13.154 11.1405 13.2128 11.2962 13.1977C11.9169 13.1378 12.6838 12.8258 13.3404 12.4324C13.9893 12.0436 14.6396 11.5102 14.9433 10.9328C14.9822 10.8587 15.002 10.776 15.0007 10.6923C14.9756 9.08579 14.7818 7.39064 14.4286 5.97872C14.32 5.54458 14.1296 4.94414 13.8997 4.37441C13.6762 3.82072 13.3906 3.23226 13.0745 2.87088C13.0355 2.8262 12.9887 2.78883 12.9366 2.76053C12.1793 2.34982 10.8967 1.89496 10.0523 1.80299C10.0084 1.79821 9.96414 1.79926 9.92056 1.80611C9.70958 1.83926 9.52881 1.94778 9.39664 2.04762C9.25687 2.15321 9.12735 2.28296 9.01579 2.41388C8.85252 2.60549 8.69418 2.83969 8.59316 3.0617C8.25248 3.02279 7.88775 3.00003 7.50061 3.00003C7.1126 3.00003 6.74708 3.02289 6.40574 3.06197C6.30472 2.83988 6.14632 2.60556 5.98299 2.41388C5.87143 2.28296 5.74191 2.15321 5.60214 2.04762C5.46997 1.94778 5.2892 1.83926 5.07822 1.80611ZM10.9667 11.4207C11.0088 11.4863 11.0542 11.5565 11.1011 11.6283C11.2312 11.8274 11.3595 12.0178 11.4599 12.1584C11.8518 12.0683 12.3485 11.8609 12.8264 11.5746C13.3661 11.2512 13.7916 10.881 13.9982 10.5682C13.9653 9.06494 13.7796 7.50509 13.4585 6.22136C13.3615 5.8334 13.1855 5.2769 12.9723 4.74869C12.7723 4.25319 12.5602 3.83541 12.3755 3.59495C11.7287 3.2605 10.7137 2.90752 10.0501 2.81071C10.037 2.81866 10.0201 2.82988 9.99941 2.84554C9.93276 2.89589 9.85535 2.97044 9.77694 3.06246C9.72497 3.12345 9.67876 3.18464 9.63904 3.24253C10.0066 3.32851 10.3311 3.4291 10.609 3.53013C10.9755 3.66342 11.2613 3.79763 11.4585 3.90049C11.5571 3.95194 11.6336 3.99562 11.6872 4.02751C11.714 4.04346 11.735 4.05648 11.7502 4.06606L11.7685 4.07779L11.7743 4.08161L11.7764 4.08299L11.7773 4.08354L11.7776 4.08379C11.7778 4.0839 11.778 4.084 11.5153 4.47799L11.778 4.08401C12.0077 4.23718 12.0698 4.54762 11.9166 4.77738C11.7638 5.00671 11.4542 5.06899 11.2246 4.91693L11.2242 4.91671L11.2238 4.91643L11.2236 4.91627L11.2236 4.91625C11.2234 4.91615 11.2233 4.91605 11.5006 4.50003L11.2233 4.91605L11.2162 4.91154C11.2081 4.90647 11.1945 4.898 11.1754 4.88661C11.1371 4.86382 11.077 4.82937 10.9959 4.78707C10.8337 4.70244 10.5882 4.58664 10.2672 4.46993C9.62537 4.23652 8.68334 4.00003 7.50061 4.00003C6.31788 4.00003 5.37586 4.23652 4.73398 4.46993C4.41301 4.58664 4.16755 4.70244 4.00533 4.78707C3.92426 4.82937 3.86411 4.86382 3.82585 4.88661C3.80673 4.898 3.79309 4.90647 3.78506 4.91154L3.77725 4.91653L3.7774 4.91643C3.77749 4.91637 3.77758 4.91631 3.77767 4.91625L3.7774 4.91643L3.7774 4.91643C3.54769 5.06913 3.23764 5.00696 3.08459 4.77738C2.93141 4.54762 2.99349 4.23718 3.22326 4.08401L3.50061 4.50003C3.22326 4.08401 3.22342 4.0839 3.22359 4.08379L3.22395 4.08354L3.22479 4.08299L3.22688 4.08161L3.23273 4.07779L3.25107 4.06606C3.26624 4.05648 3.28727 4.04346 3.31404 4.02751C3.36758 3.99562 3.44415 3.95194 3.54276 3.90049C3.73992 3.79763 4.02571 3.66342 4.39223 3.53013C4.66955 3.42929 4.99335 3.32889 5.36008 3.24302C5.32028 3.18499 5.27396 3.12362 5.22184 3.06246C5.14343 2.97044 5.06602 2.89589 4.99937 2.84554C4.97864 2.82988 4.96173 2.81866 4.94864 2.81071C4.2851 2.90752 3.27013 3.2605 2.62328 3.59495C2.43856 3.83541 2.22643 4.25319 2.02644 4.74869C1.81325 5.2769 1.6373 5.8334 1.54026 6.22136C1.21918 7.50509 1.03345 9.06494 1.0006 10.5682C1.20715 10.881 1.63266 11.2512 2.17237 11.5746C2.65026 11.8609 3.14703 12.0683 3.53889 12.1584C3.63927 12.0178 3.76758 11.8274 3.89766 11.6283C3.94479 11.5562 3.99037 11.4857 4.03262 11.42C3.93744 11.383 3.8471 11.3454 3.7615 11.3077C3.36109 11.1312 3.06684 10.9522 2.86785 10.8124C2.76841 10.7425 2.69289 10.6825 2.63989 10.6376C2.61339 10.6152 2.59252 10.5966 2.57712 10.5824C2.56941 10.5752 2.56307 10.5693 2.55807 10.5645L2.55158 10.5582L2.54908 10.5557L2.54802 10.5546L2.54753 10.5542C2.5473 10.5539 2.54708 10.5537 2.90063 10.2002L2.54708 10.5537C2.35182 10.3584 2.35182 10.0419 2.54708 9.8466C2.74132 9.65237 3.05559 9.65134 3.25109 9.84353L3.25496 9.84715C3.26021 9.85199 3.2705 9.86127 3.28599 9.87439C3.31697 9.90062 3.3688 9.94218 3.44279 9.99418C3.59068 10.0981 3.82767 10.2441 4.16476 10.3926C4.8372 10.6889 5.91837 11.0002 7.50063 11.0002C9.0829 11.0002 10.1641 10.6889 10.8365 10.3926C11.1736 10.2441 11.4106 10.0981 11.5585 9.99418C11.6325 9.94218 11.6843 9.90061 11.7153 9.87439C11.7308 9.86127 11.7411 9.85199 11.7463 9.84715L11.7502 9.84354C11.9457 9.65134 12.26 9.65236 12.4542 9.8466C12.6495 10.0419 12.6495 10.3584 12.4542 10.5537L12.1056 10.2051C12.4542 10.5537 12.454 10.5539 12.4537 10.5542L12.4533 10.5546L12.4522 10.5557L12.4497 10.5582L12.4432 10.5645C12.4382 10.5693 12.4319 10.5752 12.4242 10.5824C12.4087 10.5966 12.3879 10.6152 12.3614 10.6376C12.3084 10.6825 12.2329 10.7425 12.1334 10.8124C11.9344 10.9522 11.6402 11.1312 11.2398 11.3077C11.1536 11.3457 11.0626 11.3835 10.9667 11.4207ZM4.0811 7.01225C4.32473 6.74987 4.65537 6.60165 5.00068 6.60001C5.34599 6.60165 5.67664 6.74987 5.92027 7.01225C6.1639 7.27462 6.30068 7.62978 6.30068 8.00001C6.30068 8.37024 6.1639 8.72539 5.92027 8.98777C5.67664 9.25014 5.34599 9.39836 5.00068 9.40001C4.65537 9.39836 4.32473 9.25014 4.0811 8.98777C3.83746 8.72539 3.70068 8.37024 3.70068 8.00001C3.70068 7.62978 3.83746 7.27462 4.0811 7.01225ZM9.99946 6.60001C9.65415 6.60165 9.32351 6.74987 9.07987 7.01225C8.83624 7.27462 8.69946 7.62978 8.69946 8.00001C8.69946 8.37024 8.83624 8.72539 9.07987 8.98777C9.32351 9.25014 9.65415 9.39836 9.99946 9.40001C10.3448 9.39836 10.6754 9.25014 10.9191 8.98777C11.1627 8.72539 11.2995 8.37024 11.2995 8.00001C11.2995 7.62978 11.1627 7.27462 10.9191 7.01225C10.6754 6.74987 10.3448 6.60165 9.99946 6.60001Z"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_481_19437">
                                                <rect width="15" height="15" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                            </div>
                        </HoverCard.Content>
                    </HoverCard.Root>
                    <HoverCard.Root openDelay={300} open={resourcesOpened} onOpenChange={(open) => setResourcesOpened(open)}>
                        <HoverCard.Trigger onClick={() => setResourcesOpened((v) => !v)} className={`flex cursor-pointer items-center text-sm ${resourcesOpened ? "text-gray-light-10 dark:text-gray-dark-10" : "text-gray-light-12 dark:text-gray-dark-12"} transition sm:self-center`}>
                            Resources
                            <svg className={`${resourcesOpened ? "stroke-gray-light-10 dark:stroke-gray-dark-10" : "stroke-gray-light-12 dark:stroke-gray-dark-12"}`} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </HoverCard.Trigger>
                        <HoverCard.Content side={"bottom"} align={"end"} sideOffset={16} className="transition duration-300 ease-out">
                            <div className="flex min-w-[161px] flex-col rounded-[8px] border border-gray-light-4 bg-gray-light-2 p-[8px] dark:border-gray-dark-4 dark:bg-gray-dark-2">
                                <a href={RisedleLinks.github} className="flex items-center rounded-[8px] p-[8px] text-sm text-gray-light-11 transition hover:bg-gray-light-3 hover:text-gray-light-12 dark:text-gray-dark-11 hover:dark:bg-gray-dark-3 hover:dark:text-gray-dark-12">
                                    <span className="grow text-left">
                                        Github <span className="text-gray-light-10 dark:text-gray-dark-10">&#8599;</span>
                                        <span className={`ml-2  h-[8px] w-[8px] rounded-full bg-sky-light-10 shadow-[0px_0px_12px] shadow-sky-light-10 dark:bg-sky-dark-10 dark:shadow-sky-dark-10`}></span>
                                    </span>
                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block fill-gray-light-12 dark:fill-gray-dark-12">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.499 1.3501C3.8273 1.3501 0.849609 4.3274 0.849609 8.00032C0.849609 10.938 2.75486 13.4307 5.39739 14.3105C5.7301 14.3713 5.85135 14.1659 5.85135 13.9896C5.85135 13.8316 5.84563 13.4135 5.84237 12.8588C3.99264 13.2605 3.60236 11.9672 3.60236 11.9672C3.29986 11.1989 2.86386 10.9943 2.86386 10.9943C2.26008 10.582 2.90958 10.5902 2.90958 10.5902C3.57705 10.6371 3.92814 11.2756 3.92814 11.2756C4.52131 12.2917 5.48475 11.9982 5.8636 11.828C5.92402 11.3985 6.09588 11.1054 6.28571 10.9392C4.80911 10.771 3.25659 10.2007 3.25659 7.6525C3.25659 6.92624 3.51582 6.33307 3.9412 5.86809C3.87262 5.69989 3.64441 5.02384 4.00652 4.10816C4.00652 4.10816 4.56458 3.92935 5.83502 4.78951C6.36532 4.64213 6.9344 4.56865 7.49981 4.56579C8.06482 4.56865 8.63349 4.64213 9.16461 4.78951C10.4342 3.92935 10.9915 4.10816 10.9915 4.10816C11.3544 5.02384 11.1262 5.69989 11.058 5.86809C11.4842 6.33307 11.7414 6.92624 11.7414 7.6525C11.7414 10.2073 10.1864 10.7694 8.70534 10.9339C8.94375 11.1393 9.15645 11.545 9.15645 12.1656C9.15645 13.0543 9.14828 13.7716 9.14828 13.9896C9.14828 14.1676 9.26831 14.3745 9.60551 14.3096C12.246 13.4282 14.1496 10.9376 14.1496 8.00032C14.1496 4.3274 11.1719 1.3501 7.499 1.3501Z"
                                        />
                                    </svg>
                                </a>
                                <a href="#" className="flex items-center rounded-[8px] p-[8px] text-sm text-gray-light-11 transition hover:bg-gray-light-3 hover:text-gray-light-12 dark:text-gray-dark-11 hover:dark:bg-gray-dark-3 hover:dark:text-gray-dark-12">
                                    <span className="grow text-left">
                                        CoinGecko <span className="text-gray-light-10 dark:text-gray-dark-10">&#8599;</span>
                                        <span className={`ml-2  h-[8px] w-[8px] rounded-full bg-sky-light-10 shadow-[0px_0px_12px] shadow-sky-light-10 dark:bg-sky-dark-10 dark:shadow-sky-dark-10`}></span>
                                    </span>
                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block fill-gray-light-12 dark:fill-gray-dark-12">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.50039 2.2999C4.35237 2.2999 1.80039 4.85188 1.80039 7.9999C1.80039 11.1479 4.35237 13.6999 7.50039 13.6999C10.6484 13.6999 13.2004 11.1479 13.2004 7.9999C13.2004 4.85188 10.6484 2.2999 7.50039 2.2999ZM0.900391 7.9999C0.900391 4.35482 3.85531 1.3999 7.50039 1.3999C11.1455 1.3999 14.1004 4.35482 14.1004 7.9999C14.1004 11.645 11.1455 14.5999 7.50039 14.5999C3.85531 14.5999 0.900391 11.645 0.900391 7.9999Z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.5004 8.39985H1.50037V7.59985H13.5004V8.39985Z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.10034 13.9999V1.99988H7.90034V13.9999H7.10034Z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.3754 7.99986C10.3754 5.82712 9.59407 3.67766 8.06226 2.25644L8.53836 1.74329C10.24 3.32206 11.0754 5.67261 11.0754 7.99986C11.0754 10.3271 10.24 12.6777 8.53836 14.2564L8.06226 13.7433C9.59407 12.3221 10.3754 10.1726 10.3754 7.99986Z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.00012 7.99988C4.00012 5.67599 4.80829 3.32666 6.45811 1.74707L6.9422 2.25269C5.45863 3.6731 4.70012 5.82377 4.70012 7.99988C4.70013 10.176 5.45865 12.3267 6.94222 13.7471L6.45812 14.2527C4.80831 12.6731 4.00013 10.3238 4.00012 7.99988Z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.50038 4.45789C9.66971 4.45789 11.8757 4.85903 13.3711 5.69436C13.5398 5.78863 13.6002 6.00185 13.5059 6.1706C13.4117 6.33936 13.1985 6.39974 13.0297 6.30548C11.6798 5.55143 9.60842 5.15789 7.50038 5.15789C5.39234 5.15789 3.32095 5.55143 1.97107 6.30548C1.80231 6.39974 1.58909 6.33936 1.49482 6.1706C1.40055 6.00185 1.46094 5.78863 1.62969 5.69436C3.12509 4.85903 5.33106 4.45789 7.50038 4.45789Z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.50038 11.3499C9.66971 11.3499 11.8757 10.9487 13.3711 10.1134C13.5398 10.0191 13.6002 9.80589 13.5059 9.63714C13.4117 9.46838 13.1985 9.408 13.0297 9.50226C11.6798 10.2563 9.60842 10.6499 7.50038 10.6499C5.39234 10.6499 3.32095 10.2563 1.97107 9.50226C1.80231 9.408 1.58909 9.46838 1.49482 9.63714C1.40055 9.80589 1.46094 10.0191 1.62969 10.1134C3.12509 10.9487 5.33106 11.3499 7.50038 11.3499Z" />
                                    </svg>
                                </a>
                            </div>
                        </HoverCard.Content>
                    </HoverCard.Root>
                </div>
                <div className="flex flex-none flex-row space-x-2 text-right">
                    <div>
                        <ButtonLaunchBasic />
                    </div>
                    <div>
                        <ButtonThemeSwitcher />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
