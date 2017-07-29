function toggle() {
	if (document.getElementById("sidenav").style.width === "250px") {
		document.getElementById("sidenav").style.width = "0";
		document.getElementById("navigation").style.transitionDuration = "0.4s";
		document.getElementById("navigation").style.opacity = "0";
	} else {
		document.getElementById("sidenav").style.width = "250px";
		document.getElementById("navigation").style.transitionDuration = "1.2s";
		document.getElementById("navigation").style.opacity = "1";
	}
}
