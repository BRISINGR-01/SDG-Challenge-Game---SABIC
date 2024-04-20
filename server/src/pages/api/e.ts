import type { NextApiRequest, NextApiResponse } from "next";

let notifier = (data: string) => {
	console.log("n: " + data);
};

console.log(3412);
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const val = new URLSearchParams(req.url?.split("?")[1]).get("val");
	if (val) {
		notifier(val);
		return;
	}

	let responseStream = new TransformStream();
	const writer = responseStream.writable.getWriter();
	const encoder = new TextEncoder();
	let closed = false;

	notifier = (a) => {
		console.log(a);
		writer.write(encoder.encode("data: " + a + "\n\n"));
		writer.write(encoder.encode("message: " + a + "\n\n"));
	};

	setTimeout(() => {
		if (!closed) {
			// writer.close();
			// closed = true;
		}
	}, 10000);

	return new Response(responseStream.readable, {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "text/event-stream; charset=utf-8",
			Connection: "keep-alive",
			"Cache-Control": "no-cache, no-transform",
			"X-Accel-Buffering": "no",
			"Content-Encoding": "none",
		},
	});
};

export const config = {
	runtime: "edge",
};
