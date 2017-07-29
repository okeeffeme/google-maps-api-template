function openNav() {
    document.getElementById("sidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

function toggle() {
	if (document.getElementById("sidenav").style.width === "250px") {
		document.getElementById("sidenav").style.width = "0";
	} else {
		document.getElementById("sidenav").style.width = "250px";
	}
}
