define([], function(){
    return {
        onCanvasClick: function(){
            if (location.hash.substr(1) === this.dataset.genes) location.reload()
            else location.hash = this.dataset.genes;
        },
        onHashChange: function(){
            location.reload();  
        },
        onButtonClick: function(){
            var url_field = document.querySelector("input");
            url_field.value = unescape(window.location);
            url_field.style.display = "block";
        }
    }
});