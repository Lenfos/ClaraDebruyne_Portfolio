class HomeViews {
    constructor() {
        this.photosDiv = document.getElementById("photos");
        this.initPhoto();
    }
    initPhoto() {
        for (let i = 1; i <= 38; i++) {
            let img = document.createElement("img");
            img.src = "assets/img/photos/" + i + ".jpg";
            img.alt = "photo" + i;
            img.loading = "lazy";
            this.photosDiv.appendChild(img);
        }
    }
}
//# sourceMappingURL=homeViews.js.map