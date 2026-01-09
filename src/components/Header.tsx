
import { Menu, User, Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import DarkModeSwitcher from "./DarkModeSwitcher";

const Header = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (arg: boolean) => void }) => {
    return (
        <header className="sticky top-0 z-40 flex w-full bg-white drop-shadow-sm dark:bg-slate-900 dark:drop-shadow-none border-b border-slate-200 dark:border-slate-800">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-sm md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    {/* Hamburger Toggle BTN */}
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSidebarOpen(!sidebarOpen);
                        }}
                        className="z-50 block rounded-sm border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:hidden"
                    >
                        <Menu className="h-6 w-6 text-slate-600 dark:text-gray-300" />
                    </button>

                    <Link className="block flex-shrink-0 lg:hidden" to="/">
                        <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold">A</div>
                    </Link>
                </div>

                <div className="hidden sm:block">
                    <form action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative">
                            <button className="absolute left-0 top-1/2 -translate-y-1/2">
                                <Search className="h-4 w-4 text-slate-400" />
                            </button>
                            <input
                                type="text"
                                placeholder="Type to search..."
                                className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125 placeholder:text-slate-400"
                            />
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <li>
                            <DarkModeSwitcher />
                        </li>
                        {/* Notification Menu Area */}
                        <li className="relative">
                            <Link
                                to="#"
                                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            >
                                <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-red-500">
                                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                                </span>
                                <Bell className="h-5 w-5 text-slate-500 hover:text-blue-600" />
                            </Link>
                        </li>
                    </ul>

                    {/* User Area */}
                    <div className="relative">
                        <Link className="flex items-center gap-4" to="#">
                            <span className="hidden text-right lg:block">
                                <span className="block text-sm font-medium text-black dark:text-white">Admin User</span>
                                <span className="block text-xs text-slate-500">Administrator</span>
                            </span>

                            <span className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                                <User className="h-6 w-6 text-slate-500" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
