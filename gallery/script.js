const images = new Map(); //Storing image with index (int) as the key and url as the value
load();
//Update image when form field is updated
function updateImage(e) {
	var image = document.getElementById("image" + e.name);
	image.src = e.value;
	images.set(parseInt(e.name), e.value);
}

//Update images and form fields when number of images is updated
function updateImageForm(e) {
	images.forEach((value, key) => {
		if (key > e.value) images.delete(key);
	});
	var inputs = document.getElementById("image-inputs");
	var navigation = document.getElementById("carousel__navigation-list");
	var carousel = document.getElementById("carousel__viewport");

	inputs.innerHTML = "";
	navigation.innerHTML = "";
	carousel.innerHTML = "";

	for (var i = 1; i <= e.value; i++) {
		inputs.innerHTML += `
            <li class="image-input"><input type="text" placeholder="Image ${i} src" onchange="updateImage(this)" name="${i}" ${images.has(i) ? `value="${images.get(i)}"` : ""} /></li>
        `;
		carousel.innerHTML += `
            <li id="carousel__slide${i}" tabindex="0" class="carousel__slide">
                <img src="${images.has(i) ? images.get(i) : ""}"
                    id="image${i}"
                    alt="" class="carousel__image">
                <div class="carousel__snapper">
                    <a href="#carousel__slide${i === 1 ? e.value : i - 1}" class="carousel__prev">Go to last slide</a>
                    <a href="#carousel__slide${i === parseInt(e.value) ? 1 : i + 1}" class="carousel__next">Go to next slide</a>
                </div>
            </li>
        `;
		navigation.innerHTML += `
        <li class="carousel__navigation-item">
        <a href="#carousel__slide${i}" class="carousel__navigation-button">Go to slide 1</a>
    </li>
        `;
	}
}

//Save form data to local storage
function save(form) {
	obj = {
		count: form.elements["count"].value,
		images: []
	};
	images.forEach((value, key) => {
		if (key <= obj.count) obj.images.push([key, value]);
	});
	localStorage.setItem("gallery", JSON.stringify(obj));
	document.getElementById("edit").style.display = "unset";
	document.getElementById("configuration").style.display = "none";
}

function load() {
	var obj = JSON.parse(localStorage.getItem("gallery"));
	if (obj) {
		obj.images.forEach(([key, value]) => {
			images.set(key, value);
		});
		updateImageForm({ value: obj.count });
		document.getElementById("count").value = obj.count;
		document.getElementById("configuration").style.display = "none";
		document.getElementById("edit").style.display = "unset";
	} else {
		document.getElementById("edit").style.display = "none";
	}
}

function edit() {
	document.getElementById("configuration").style.display = "unset";
	document.getElementById("edit").style.display = "none";
}

function resetForm() {
	localStorage.removeItem("gallery");
	images.clear();
	updateImageForm({ value: 1 });
	console.log("reset");
}
