import Profile from '../../assets/images/svg/topbar/profile.svg'
import Api from '../../assets/images/svg/topbar/api.svg'
import Public_link from '../../assets/images/svg/topbar/share.svg'
import Expand_Sidebar from '../../assets/images/svg/topbar/expand-sidebar.svg'
import Shrink_Sidebar from '../../assets/images/svg/topbar/shrink-sidebar.svg'
import Sidebar from '../../assets/images/svg/topbar/sidebar.svg'

function Header(props: any) {

    const items = [Api, Public_link, Profile]

    return (
        <header className="topbar">
            <div className="content flex justify-between items-center px-5">
                <div className={`larger-device-el ${props.isOpen ? 'expanded-left' : 'collapsed-left'}`}>
                    <img className='cursor-pointer transition' src={props.isOpen ? Shrink_Sidebar : Expand_Sidebar} width={30} onClick={props.onClick} />
                </div>
                <div className='smaller-device-el'>
                    <img className='cursor-pointer' src={Sidebar} width={26} onClick={props.onClick} />
                </div>
                <div className='flex items-center'>
                    {items.map((icon) => {
                        return <div className='ml-3 '>
                            <img className='cursor-pointer' src={icon} />
                        </div>
                    })}
                </div>
            </div>
        </header>
    );
}

export default Header;
