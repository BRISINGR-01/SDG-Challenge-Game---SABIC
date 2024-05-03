import { QRCode } from "react-qrcode-logo";
import Container from "./Container";
import SignUp from "./SignUp";
import Spacer from "./Spacer";

export default function SignUpDisplay(props: { cardID: string; goBack: () => void }) {
	return (
		<Container goBack={props.goBack} className="flex flex-row gap-	44">
			<div className="flex flex-col gap-3">
				<span style={{ fontSize: "2em" }}>SCAN</span>
				<QRCode
					value={window.location.origin + "/sign-up/" + props.cardID}
					logoImage="http://localhost:3000/sabic.png"
					quietZone={10}
					bgColor="#FFFFFF"
					fgColor="#009FE3"
					logoWidth={40}
					qrStyle="squares"
				></QRCode>
			</div>
			<div className="flex flex-col">
				<span style={{ fontSize: "1.5em", color: "#009FE3" }}>OR</span>
				<Spacer></Spacer>
			</div>
			<div className="flex flex-col">
				<SignUp cardID={props.cardID} />
			</div>
		</Container>
	);
}
