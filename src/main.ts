import { io } from "socket.io-client";

const serverUrl = "http://192.168.1.109:3001";
console.log("Connecting to server at", serverUrl);

const socket = io(serverUrl);
const clipboardElement = document.getElementById(
	"clipboard"
) as HTMLTextAreaElement;

clipboardElement.addEventListener("input", () => {
	socket.emit("text-update", clipboardElement.value);
});

socket.on("text-update", (data: string) => {
	clipboardElement.value = data;
});
