import { createClient } from "@/src/utils/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	let val = req.query.val;

	if (Array.isArray(val)) val = val[0];

	if (!val) {
		res.status(400).send("No value was provided!");
		return res.end();
	}

	const supabase = createClient();
	await supabase.from("card_read").insert({ card_id: val });

	res.status(200);
	res.end();
};
