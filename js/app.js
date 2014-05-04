define([
    "biomorph",
    "genes",
    "handlers"], 
    
function(Biomorph, Genes, handlers){

    var hash = location.hash.substr(1) || Genes.array_to_string([80,7,5,60,60,4,65,1,8]);
    var genes = new Genes.genes(Genes.string_to_array(hash));
    var canvases = document.querySelectorAll("canvas");
    var button = document.querySelector("button");

    function create_biomorph(cnv){
        var biomorph, mutated_genes;

        if (cnv === canvases[0]) {
            biomorph = new Biomorph(cnv, genes);
            cnv.dataset.genes = Genes.array_to_string(genes.genes_array);
        } else {
            mutated_genes = new Genes.genes(genes.mutatedArray());
            biomorph = new Biomorph(cnv, mutated_genes);
            cnv.dataset.genes = Genes.array_to_string(mutated_genes.genes_array);
        }

        return biomorph;  
    }

    return {
        init: function(){
            button.addEventListener("click", handlers.onButtonClick);
            window.addEventListener("hashchange", handlers.onHashChange);
            [].forEach.call(canvases, function(cnv){
                cnv.addEventListener("click", handlers.onCanvasClick);
            });
        },

        run: function(){
            /* console.log("Running "+ hash); */
            [].forEach.call(canvases, function(cnv){
                create_biomorph(cnv).draw();
            });    
        }
    }
});