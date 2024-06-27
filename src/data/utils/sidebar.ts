import { Sidebar } from "../interfaces/sidebar"
import AlphaFinder from "../../assets/images/svg/sidebar/alpha-finder.svg"
import USA from "../../assets/images/svg/sidebar/usa.svg"
import Canada from "../../assets/images/svg/sidebar/canada.svg"
import LocationExplorer from "../../assets/images/svg/sidebar/location-explorer.svg"
import PortfolioAnalytics from "../../assets/images/svg/sidebar/portfolio-analytics.svg"
import DataManager from "../../assets/images/svg/sidebar/data-manager.svg"

export const MENU_ITEMS: Sidebar[] = [
    {
        path: "/alpha-finder/dashboard",
        title: "Alpha Finder",
        class: "",
        icon: AlphaFinder,
        submenu: [
            {
                path: "/alpha-finder/dashboard/us",
                title: "USA",
                icon: USA,
                class: "",
                submenu: [],
            },
            {
                path: "/alpha-finder/dashboard/ca",
                title: "Canada",
                icon: Canada,
                class: "",
                submenu: [],
            },
        ],
    },
    {
        path: "/location-explorer",
        title: "Location Explorer",
        icon: LocationExplorer,
        class: "",
        submenu: [],
    },
    {
        path: "/portfolio-analytics/multiple-assets",
        title: "Portfolio Analytics",
        icon: PortfolioAnalytics,
        class: "",
        submenu: [],
    },
    {
        path: "data-manager/summary",
        title: "Data Manager",
        icon: DataManager,
        class: "",
        submenu: [],
    }
]

export const Customer_Support: Sidebar = {
    path: "https://support.alphageo.ai/knowledge",
    title: "Customer Support Hub",
    icon: "../../../assets/img/svg/Customer Support.svg",
    class: "",
    submenu: [],
}
