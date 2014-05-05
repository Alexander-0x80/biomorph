define([
    "biomorph",
    "genes",
    "handlers"], 
    
function(Biomorph, Genes, handlers){

    var genes;
    var default_genes = [80,2,2,60,35,4,60,1,8];
    var canvases = document.querySelectorAll("canvas");
    var button = document.querySelector("button");

    function from_hash(){
        if (location.hash.substr(1)) return Genes.string_to_array(location.hash.substr(1));
        else return default_genes;
    }

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

    function bind_events(){
        button.addEventListener("click", handlers.onButtonClick);
        window.addEventListener("hashchange", handlers.onHashChange);
        [].forEach.call(canvases, function(cnv){
            cnv.addEventListener("click", handlers.onCanvasClick);
        });
    }

    return {
        init: function(){
            try {
                genes = new Genes.genes(from_hash());
                bind_events();
            }
            catch (error){
                document.querySelector("#main").innerHTML = "<h2>" + error + "</h2>";
            }
        },

        run: function(){
            [].forEach.call(canvases, function(cnv){
                create_biomorph(cnv).draw();
            });    
        }
    }
});