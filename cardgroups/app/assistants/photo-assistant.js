function PhotoAssistant(src) {
    this.src = src;
}

PhotoAssistant.prototype.setup = function(){
    this.controller.sceneElement.querySelector(".photo").src = this.src;
};
