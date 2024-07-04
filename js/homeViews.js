class HomeViews {
    get LENGTH() {
        return 38;
    }
    constructor() {
        this.listNumber = [];
        this.photosDiv = document.getElementById("photos");
        this.current = 0;
        this.car1 = document.getElementById("car1");
        this.car2 = document.getElementById("car2");
        this.car3 = document.getElementById("car3");
        this.divBigImg = document.getElementById("showImg");
        this.bigImg = document.getElementById("bigImg");
        this.initPhoto();
        this.initList();
        this.displayCarroussel();
        this.startTimer();
        document.getElementById("prev").addEventListener('click', this.prevCarroussel.bind(this));
        document.getElementById("next").addEventListener('click', this.nextCarroussel.bind(this));
        document.getElementById("close").addEventListener('click', this.closeBigImg.bind(this));
        Array.from(document.getElementsByClassName("clickable")).forEach((i) => {
            i.addEventListener('click', () => {
                this.showBigImg(i);
            });
        });
        document.getElementById("showImgNext").addEventListener('click', this.nextImage.bind(this));
        document.getElementById("showImgPrev").addEventListener('click', this.prevImage.bind(this));
    }
    initPhoto() {
        for (let i = 1; i <= this.LENGTH; i++) {
            let img = document.createElement("img");
            img.src = "assets/img/photos/" + i + ".jpg";
            img.alt = `${i}`;
            img.loading = "lazy";
            img.className = "clickable";
            this.photosDiv.appendChild(img);
        }
    }
    initList() {
        let intList = [];
        for (let i = 1; i <= this.LENGTH; i++) {
            intList.push(i);
        }
        this.randomizeNumber(intList);
        for (let i = 0; i < intList.length; i += 3) {
            const chunk = intList.slice(i, i + 3);
            this.listNumber.push(chunk);
        }
    }
    randomizeNumber(list) {
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
    }
    displayCarroussel() {
        let current = this.listNumber[this.current];
        if (current.length == 3) {
            this.car1.src = `assets/img/photos/${current[0]}.jpg`;
            this.car2.src = `assets/img/photos/${current[1]}.jpg`;
            this.car3.src = `assets/img/photos/${current[2]}.jpg`;
            this.car1.alt = current[0].toString();
            this.car2.alt = current[1].toString();
            this.car3.alt = current[2].toString();
        }
        else {
            this.nextCarroussel();
        }
    }
    nextCarroussel() {
        if (this.current + 1 > 4) {
            this.current = 0;
        }
        else {
            this.current += 1;
        }
        this.displayCarroussel();
    }
    prevCarroussel() {
        if (this.current - 1 < 0) {
            this.current = 4;
        }
        else {
            this.current -= 1;
        }
        this.displayCarroussel();
    }
    startTimer() {
        this.interval = setInterval(() => {
            this.nextCarroussel();
        }, 5000);
    }
    stopTimer() {
        clearInterval(this.interval);
    }
    showBigImg(img) {
        let id = parseInt(img.alt);
        this.stopTimer();
        document.getElementById("showImgPrev").style.visibility = img.id != null ? img.id != "" ? "hidden" : "visible" : "visible";
        document.getElementById("showImgNext").style.visibility = img.id != null ? img.id != "" ? "hidden" : "visible" : "visible";
        this.showBigImgByNumber(id);
        this.divBigImg.style.display = "flex";
        document.getElementById("body").style.overflow = "hidden";
    }
    showBigImgByNumber(id) {
        this.bigImg.src = `assets/img/photos/${id}.jpg`;
        this.bigImg.alt = id.toString();
    }
    closeBigImg() {
        this.startTimer();
        this.divBigImg.style.display = "none";
        document.getElementById("body").style.overflow = "visible";
    }
    nextImage() {
        let id = parseInt(this.bigImg.alt);
        if (id != this.LENGTH) {
            this.showBigImgByNumber(id + 1);
        }
        else {
            this.showBigImgByNumber(1);
        }
    }
    prevImage() {
        let id = parseInt(this.bigImg.alt);
        if (id != 1)
            this.showBigImgByNumber(id - 1);
        else
            this.showBigImgByNumber(this.LENGTH);
    }
}
//# sourceMappingURL=homeViews.js.map