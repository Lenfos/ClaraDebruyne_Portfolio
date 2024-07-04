
class HomeViews{

    private photosDiv : HTMLDivElement;
    private listNumber : Array<Array<number>>;
    private current : number;
    private car1 : HTMLImageElement;
    private car2 : HTMLImageElement;
    private car3 : HTMLImageElement;
    private interval : number;
    private divBigImg : HTMLDivElement;
    private bigImg : HTMLImageElement;



    private get LENGTH() : number{
        return 38;
    }

    constructor() {
        this.listNumber = [];
        this.photosDiv = document.getElementById("photos") as HTMLDivElement;
        this.current = 0;

        this.car1 = document.getElementById("car1") as HTMLImageElement;
        this.car2 = document.getElementById("car2") as HTMLImageElement;
        this.car3 = document.getElementById("car3") as HTMLImageElement;

        this.divBigImg = document.getElementById("showImg") as HTMLDivElement;
        this.bigImg = document.getElementById("bigImg") as HTMLImageElement;

        this.initPhoto();
        this.initList();
        this.displayCarroussel();
        this.startTimer();

        document.getElementById("prev").addEventListener('click', this.prevCarroussel.bind(this));
        document.getElementById("next").addEventListener('click', this.nextCarroussel.bind(this));
        document.getElementById("close").addEventListener('click', this.closeBigImg.bind(this));
        Array.from(document.getElementsByClassName("clickable")).forEach((i : HTMLImageElement) =>  {
            i.addEventListener('click', () => {
                this.showBigImg(i)
            });
        });

        document.getElementById("showImgNext").addEventListener('click', this.nextImage.bind(this));
        document.getElementById("showImgPrev").addEventListener('click', this.prevImage.bind(this));


    }

    private initPhoto(){
        for (let i = 1; i <= this.LENGTH; i++){
            let img = document.createElement("img");
            img.src = "assets/img/photos/"+i+".jpg";
            img.alt = `${i}`;
            img.loading = "lazy";
            img.className = "clickable";
            this.photosDiv.appendChild(img);
        }
    }

    private initList(){
        let intList : Array<number> = [];
        for (let i = 1; i <= this.LENGTH; i++){
            intList.push(i);
        }
        this.randomizeNumber(intList);

        for (let i = 0; i < intList.length; i += 3) {
            const chunk = intList.slice(i, i + 3);
            this.listNumber.push(chunk);
        }
    }

    private randomizeNumber(list : Array<number>){
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
    }

    private displayCarroussel(){
        let current = this.listNumber[this.current];
        if (current.length == 3){

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

    private nextCarroussel(){

        if (this.current+1 > 4){
            this.current = 0;
        }
        else {
            this.current += 1;
        }
        this.displayCarroussel()
    }

    private prevCarroussel(){

        if (this.current-1 < 0){
            this.current = 4;
        }
        else {
            this.current -= 1;
        }
        this.displayCarroussel()
    }

    private startTimer() {
        this.interval = setInterval(() => {
            this.nextCarroussel();
        }, 5000);
    }

    private stopTimer() {
        clearInterval(this.interval)
    }

    private showBigImg(img : HTMLImageElement){
        let id = parseInt(img.alt);
        this.stopTimer();

        document.getElementById("showImgPrev").style.visibility = img.id != null ? img.id != "" ? "hidden" : "visible" : "visible";
        document.getElementById("showImgNext").style.visibility = img.id != null ? img.id != "" ? "hidden" : "visible" : "visible";

        this.showBigImgByNumber(id)
        this.divBigImg.style.display = "flex"
        document.getElementById("body").style.overflow = "hidden";
    }




    private showBigImgByNumber(id: number) {
        this.bigImg.src = `assets/img/photos/${id}.jpg`;
        this.bigImg.alt = id.toString();
    }

    private closeBigImg() {
        this.startTimer();
        this.divBigImg.style.display = "none"
        document.getElementById("body").style.overflow = "visible";
    }

    private nextImage(){
        let id = parseInt(this.bigImg.alt);
        if (id != this.LENGTH){
            this.showBigImgByNumber(id+1);
        }
        else {
            this.showBigImgByNumber(1);
        }
    }

    private prevImage() {
        let id = parseInt(this.bigImg.alt);
        if (id != 1)
            this.showBigImgByNumber(id-1);
        else this.showBigImgByNumber(this.LENGTH);
    }
}