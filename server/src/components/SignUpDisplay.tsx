import { QRCode } from "react-qrcode-logo";
import SignUp from "./SignUp";
import Spacer from "./Spacer";

export default function SignUpDisplay(props: { cardID: string }) {
	return (
		<div className="flex flex-row" style={{ padding: "3em" }}>
			<div className="flex flex-col gap-3">
				<span style={{ fontSize: "1.5em" }}>SCAN</span>
				<QRCode
					value={window.location.origin + "/sign-up/" + props.cardID}
					logoImage="http://localhost:3000/sabic.png"
					quietZone={10}
					bgColor="#FFFFFF"
					fgColor="#009FE3"
					logoHeight={15}
					logoWidth={30}
					size={160}
					logoPadding={4}
					eyeRadius={1}
					qrStyle="squares"
				></QRCode>
			</div>
			<div className="flex flex-col">
				<span style={{ fontSize: "1em", color: "#009FE3" }}>OR</span>
				<Spacer></Spacer>
			</div>
			<div className="flex flex-col">
				<span style={{ fontSize: "1.5em" }}>TYPE</span>

				<SignUp cardID={props.cardID} />
			</div>
		</div>
	);
}
