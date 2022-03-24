import LogoWithName from './aspire-logo.svg';
import EyeOff from './eye-off.svg';
import EyeOn from './eye-on.svg';
import Logo from './logo.svg';
import SpeedOMeter from './speed-o-meter-icon.svg';
import ToggleOff from './toggle-off.svg';
import ToggleOn from './toggle-on.svg';
import VisaLogo from './visa-logo.svg';

// Note: should grouped these SVG into better domain, but lacks of information to do so
const ComponentSVGs = {
	EyeOff,
	EyeOn,
	Logo,
	LogoWithName,
	SpeedOMeter,
	ToggleOff,
	ToggleOn,
	VisaLogo,
} as const;

export default ComponentSVGs;
