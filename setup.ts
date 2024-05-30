// setup.ts
import { readFileSync, writeFileSync } from "fs";
import os from "os";

function getServerIpAddress() {
	const interfaces = os.networkInterfaces();
	for (const [key, addresses] of Object.entries(interfaces)) {
		for (const address of addresses!) {
			if (address.family === "IPv4" && !address.internal) {
				return address.address;
			}
		}
	}
	return "localhost";
}

function updateMainFile() {
	const ipAddress = getServerIpAddress();
	const serverUrl = `http://${ipAddress}:3001`;
	const mainFilePath = "src/main.ts";
	const mainFileContent = readFileSync(mainFilePath, "utf-8");
	const updatedMainFileContent = mainFileContent.replace(
		/const serverUrl = '.*';/,
		`const serverUrl = '${serverUrl}';`
	);
	writeFileSync(mainFilePath, updatedMainFileContent);
	console.log("src/main.ts file updated successfully.");
}

updateMainFile();
