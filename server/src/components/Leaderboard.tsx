import { Avatar, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@nextui-org/react";
import { getBadge, type User as UserType } from "../utils/utils";

export default function Leaderboard({ data }: { data: UserType[] }) {
	const users = [];
	for (const user of data) {
		users.push({
			...user,
			badge: getBadge(user),
		});
	}

	users.sort((a, b) => b.dob.age - a.dob.age);

	return (
		<Table aria-labelledby="table" bgcolor="black">
			<TableHeader>
				<TableColumn>Name</TableColumn>
				<TableColumn>Points</TableColumn>
				<TableColumn>Badge</TableColumn>
			</TableHeader>
			<TableBody items={users}>
				{(user) => {
					const color = user.id.value === "387.445.644-81" ? "white" : "#2e2d2d";
					return (
						<TableRow key={user.email} className={user.id.value === "387.445.644-81" ? "bg-primary" : ""}>
							<TableCell style={{ color }}>
								<User
									name={`${user.name.title} ${user.name.last} ${user.name.first}`}
									description={user.email}
									avatarProps={{
										src: `/${user.name.first}.jpg`,
									}}
								/>
							</TableCell>
							<TableCell style={{ color }}>{user.dob.age}</TableCell>
							<TableCell style={{ color }} className="flex items-center gap-3">
								<Avatar src={user.badge[1]} />
								{user.badge[0]}
							</TableCell>
						</TableRow>
					);
				}}
			</TableBody>
		</Table>
	);
}
