
class HomeViews{

    private photosDiv : HTMLDivElement;

    constructor() {
        this.photosDiv = document.getElementById("photos") as HTMLDivElement;
        this.initPhoto();
    }

    private initPhoto(){
        for (let i = 1; i <= 38; i++){
            let img = document.createElement("img");
            img.src = "assets/img/photos/"+i+".jpg";
            img.alt = "photo"+i;
            img.loading = "lazy";
            this.photosDiv.appendChild(img);
        }
    }
}