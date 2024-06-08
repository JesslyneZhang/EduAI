// const header = document.querySelector("[data-header]");

// window.addEventListener("scroll", function () {
//   if (window.scrollY >= 100) {
//     header.classList.add("active");
//     header.classList.add("header-anim");
//   } else {
//     header.classList.remove("active");
//     header.classList.remove("header-anim");
//   }
// });


// page loader
window.addEventListener("load", () => {
	document.querySelector(".js-page-loader").classList.add("fade-out");
	setTimeout(() => {
		document.querySelector(".js-page-loader").style.display = "none";
	}, 900);
})

// Testimonial Slider
function testimonialSlider(){
	const carouselOne = document.getElementById('carouselOne')
	if (carouselOne) { /* kondisi yang mengecek elemen dengan ID "carouselOne" ada di halaman web atau tidak ada.Jika elemen tersebut ada, maka jalankan kondisinya. */
		carouselOne.addEventListener('slid.bs.carousel', function () {
  			const activeItem = this.querySelector(".active");
  			document.querySelector(".js-testimonial-img").src =
  			activeItem.getAttribute("data-js-testimonial-img");
		})
	}
}
testimonialSlider(); /* untuk menginisialisasi dan menjalankan logika yang didefinisikan di dalamnya. */

// Course Preview Video
function coursePreviewVideo() {
	const coursePreviewModal = document.querySelector(".js-course-preview-modal");
	if (coursePreviewModal) { /* kondisi yang mengecek class dengan selector "js-course-preview-modal" ada di halaman web atau tidak ada.Jika elemen tersebut ada, maka jalankan kondisinya. */
		coursePreviewModal.addEventListener("shown.bs.modal", function () {
			this.querySelector(".js-course-preview-video").play();
			this.querySelector(".js-course-preview-video").currentTime = 0;
		});

		coursePreviewModal.addEventListener("hide.bs.modal", function () {
			this.querySelector(".js-course-preview-video").pause();
		});
	}
}
coursePreviewVideo(); /* untuk menjalankan logika yang didefinisikan di dalamnya. */

// Header Menu
function headerMenu()  {
	const menu = document.querySelector(".js-header-menu");
	const backdrop = document.querySelector(".js-header-backdrop");
	menuCollapseBreakpoint = 991; /* menyimpan nilai batas lebar layar di mana menu akan di-collapse (disembunyikan) secara otomatis. */

	function toggleMenu() {
		menu.classList.toggle("open");
		backdrop.classList.toggle("active");
		document.body.classList.toggle("overflow-hidden");
	} /* fungisnya jika muncul menu header akan langsung active menu header akan lngsng responsive */

	document.querySelectorAll(".js-header-menu-toggler").forEach((item) => {
		item.addEventListener("click", toggleMenu);
	}); /* fungsinya untuk membukan menu icon burger ketika responsive agar muncul menu2 header */

	// agar berfungsi pada tombol silang agar bisa di klik
	backdrop.addEventListener("click", toggleMenu);

	function collapse() {
		menu.querySelector(".active .js-sub-menu").removeAttribute("style");
		menu.querySelector(".active").classList.remove("active");
	}


	// fungsinya agar menu pada saat klik akun muncul menu slanjutnya termasuk pada icon berpindah penujuk arah
	menu.addEventListener("click", (event) => {
		const {target} = event;

		if (target.classList.contains("js-toggle-sub-menu") && 
		window.innerWidth <= menuCollapseBreakpoint) {
		
		event.preventDefault();

		
		if (target.parentElement.classList.contains("active")) {
			collapse();
			return;
		}

		if (menu.querySelector(".active")) {
			collapse();
		}

		// menampilkan sub menu agar berfungsi diklik
		target.parentElement.classList.add("active");
		target.nextElementSibling.style.maxHeight = 
		target.nextElementSibling.scrollHeight + "px";
		}
	});

	// when resizing window
	window.addEventListener("resize",function(){
		if(this.innerWidth > menuCollapseBreakpoint && menu.classList.contains("open")){
			toggleMenu();
		}
		if (this.innerWidth > menuCollapseBreakpoint && menu.querySelector(".active")) {
			collapse();
		}
	});
}
headerMenu();

// untuk style merubah warna
function styleSwitcherToggle() {
	const styleSwitcher = document.querySelector(".js-style-switcher"),
	styleSwitcherToggler = document.querySelector(".js-style-switcher-toggler");

	styleSwitcherToggler.addEventListener("click", function() {
		styleSwitcher.classList.toggle("open");
		this.querySelector("i").classList.toggle("fa-times");
		this.querySelector("i").classList.toggle("fa-cog");
	});
}
styleSwitcherToggle();

// mengganti warna tema warna yang disesuai pada bagian style css
function themeColors() {
	const colorStyle = document.querySelector(".js-color-style"),
	themeColorsContainer = document.querySelector(".js-theme-colors");

	themeColorsContainer.addEventListener("click", ({target}) => {
		if (target.classList.contains("js-theme-color-item")) {
			localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
			setColor();
		}
	});

	function setColor() {
		let path = colorStyle.getAttribute("href").split("/");
		path = path.slice(0, path.length-1);
		colorStyle.setAttribute("href", path.join("/") + "/" + localStorage.getItem("color") + ".css");

		if (document.querySelector(".js-theme-color-item.active")) {
			document.querySelector(".js-theme-color-item.active").classList.remove("active");
		}
		document.querySelector("[data-js-theme-color=" + localStorage.getItem("color") + "]").classList.add("active"); /* memeriksa apakah preferensi warna tema tersimpan pada localStorage jika tersimpan pada saat klik akan merubah warna sesuai warna yang tersimpan. */
	}

	if (localStorage.getItem("color") !== null) {
		setColor();
	}
	else {
		const defaultColor = colorStyle.getAttribute("href").split("/").pop().split(".").shift();
		document.querySelector("[data-js-theme-color=" + defaultColor + "]").classList.add("active");
	}
}
themeColors();

// Theme Light & Dark Mode
function themeLightDark() {
	const darkModeCheckbox = document.querySelector(".js-dark-mode");

	darkModeCheckbox.addEventListener("click", function () {
		if (this.checked) {
			localStorage.setItem("theme-dark", "true");
		}
		else {
			localStorage.setItem("theme-dark", "false");
		}
		themeMode();
	})

	function themeMode() {
		if (localStorage.getItem("theme-dark") === "false") {
			document.body.classList.remove("t-dark");
		}
		else {
			document.body.classList.add("t-dark");
		}
	}

	if (localStorage.getItem("theme-dark") !== null) {
		themeMode();
	}
	if (document.body.classList.contains("t-dark")) {
		darkModeCheckbox.checked = true;
	}
}
themeLightDark();

// Theme Glass Effect
function themeGlassEffect() {
	const glassEffectCheckedbox = document.querySelector(".js-glass-effect"),
	glassStyle = document.querySelector(".js-glass-style");

	glassEffectCheckedbox.addEventListener("click", function() {
		if (this.checked) {
			localStorage.setItem("glass-effect", "true");
		}
		else {
			localStorage.setItem("glass-effect", "false");
		}
		glass();
	});

	function glass() {
		if (localStorage.getItem("glass-effect") === "true") {
			glassStyle.removeAttribute("disabled");
		}
		else {
			glassStyle.disabled = true
		}
	}
	if (localStorage.getItem("glass-effect") !== null) {
		glass();
	}

	if (!glassStyle.hasAttribute("disabled")) {
		glassEffectCheckedbox.checked =  true;
	}
}
themeGlassEffect();