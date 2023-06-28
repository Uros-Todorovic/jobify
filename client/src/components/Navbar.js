import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaAlignRight, FaUserCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import { useState } from 'react';

const Navbar = () => {
	const [showLogout, setShowLogout] = useState(false);
	const { toggleSidebar, logout, user, showSidebar } = useAppContext();

	return (
		<Wrapper>
			<div className="nav-center">
				<button type="button" className="toggle-btn" onClick={toggleSidebar}>
					{showSidebar ? <FaAlignLeft /> : <FaAlignRight />}
				</button>

				<div>
					<Logo />
					<h3 className="logo-text">dashboard</h3>
				</div>

				<div className="btn-container">
					<button type="button" className="btn" onClick={() => setShowLogout((currentValue) => !currentValue)}>
						<FaUserCircle />
						{user?.name}
						{showLogout ? <FaCaretUp /> : <FaCaretDown />}
					</button>
					<div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
						<button type="button" className="dropdown-btn" onClick={logout}>
							logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Navbar;
