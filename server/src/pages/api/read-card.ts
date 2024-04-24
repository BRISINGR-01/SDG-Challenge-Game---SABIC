import { createClient } from "@/src/utils/supabase/client";
import { CARD_READER_CHANNEL, Tables } from "@/src/utils/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const val = req.query.val;

	console.log(val);
	if (!val) {
		res.status(400).send("No value was provided!");
		return res.end();
	}
	console.log(val);

	let m = "err: ";
	const supabase = createClient();
	await supabase
		.from(Tables.CardRead)
		.insert({ card_id: val })
		.then((res) => (m += res.error));

	const channel = supabase.channel(CARD_READER_CHANNEL);
	await channel.send({ type: "broadcast", event: CARD_READER_CHANNEL, payload: { cardId: val } }).then((res) => {
		m += " " + res;
	});

	res.status(200).send(m);
	res.end();
};
