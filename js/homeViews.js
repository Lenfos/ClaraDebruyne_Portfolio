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
        this.initPhoto();
        this.initList();
        this.displayCarroussel();
        this.startTimer();
        document.getElementById("prev").addEventListener('click', this.prevCarroussel.bind(this));
        document.getElementById("next").addEventListener('click', this.nextCarroussel.bind(this));
        this.car1.addEventListener('transitionend', () => this.onTransitionEnd.bind(this));
        this.car2.addEventListener('transitionend', () => this.onTransitionEnd.bind(this));
        this.car3.addEventListener('transitionend', () => this.onTransitionEnd.bind(this));
    }
    initPhoto() {
        for (let i = 1; i <= this.LENGTH; i++) {
            let img = document.createElement("img");
            img.src = "assets/img/photos/" + i + ".jpg";
            img.alt = "photo" + i;
            img.loading = "lazy";
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
            this.car1.classList.add("fadeIn");
            this.car2.classList.add("fadeIn");
            this.car3.classList.add("fadeIn");
            setTimeout(() => {
                this.car1.classList.add("fadeOut");
                this.car2.classList.add("fadeOut");
                this.car3.classList.add("fadeOut");
            }, 200);
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
        const interval = setInterval(() => {
            this.car1.classList.remove("fadeIn", "fadeOut");
            this.car2.classList.remove("fadeIn", "fadeOut");
            this.car3.classList.remove("fadeIn", "fadeOut");
            this.nextCarroussel();
        }, 5000);
    }
    onTransitionEnd() {
        this.car1.classList.remove("fadeIn", "fadeOut");
        this.car2.classList.remove("fadeIn", "fadeOut");
        this.car3.classList.remove("fadeIn", "fadeOut");
    }
}
//# sourceMappingURL=homeViews.js.map