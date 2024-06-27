import { MENU_ITEMS } from "../../data/utils/sidebar";
import Logo from "../../assets/images/svg/sidebar/alphaGeo-logo.svg"

function SideBar(props: any) {
    return (
        <div className={`sidebar ${props.isOpen ? 'expanded-sidebar' : 'collapsed-sidebar'}`}>
            <div className={`flex items-center pt-5 sm-hr-center ${props.isOpen ? 'px-3' : 'justify-center'}`}>
                <img src={Logo} width={49} />
                <div className={props.isOpen ? 'block pl-3 text-base font-semibold tracking-alphageo' : 'hidden'}>AlphaGeo</div>
            </div>
            <div className="mt-5">
                {MENU_ITEMS.map((m) => {
                    return <div className={`flex items-center sm-hr-center py-3 ${props.isOpen ? 'px-3' : 'justify-center'}`}>
                        <div className="flex items-center">
                            <img src={m.icon} />
                            <div className={`transition ${props.isOpen ? 'block pl-3 text-sm tracking-sidebar text-sidebar' : 'hidden'}`}>{m.title}</div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}

export default SideBar;
