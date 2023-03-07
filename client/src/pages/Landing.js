import main from '../assets/images/main-alternative.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<Wrapper>
			<Logo />
			<div className="container page">
				<div className="info">
					<h1>
						Job <span>Tracking</span> App
					</h1>
					<p>
						I'm baby synth vegan glossier, pop-up unicorn gluten-free cliche hexagon post-ironic beard VHS tumeric cred
						lumbersexual bushwick. Chicharrones chartreuse blue bottle swag palo santo keytar JOMO cornhole. Salvia meh
						roof party af. Mukbang stumptown jianbing asymmetrical shaman chia.
					</p>
					<Link to="/register" className="btn btn-hero">
						Login / Register
					</Link>
				</div>
				<img src={main} alt="job hunt" className="img main-img" />
			</div>
		</Wrapper>
	);
};

export default Landing;
