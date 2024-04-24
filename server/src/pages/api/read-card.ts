import { createClient } from "@/src/utils/supabase/client";
import { CARD_READER_CHANNEL, Tables } from "@/src/utils/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
	const val = req.query.val;

	console.log(val);
	if (!val) {
		res.status(400).send("No value was provided!");
		return res.end();
	}
	console.log(val);

	res.status(200).send("hi");
	res.end();

	const supabase = createClient();
	supabase.from(Tables.CardRead).insert({ card_id: val });

	const channel = supabase.channel(CARD_READER_CHANNEL);
	channel.send({ type: "broadcast", event: CARD_READER_CHANNEL, payload: { cardId: val } });
};
