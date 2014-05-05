define([], function(){

    var maximum_values = [
        90, // length
        8,  // levels
        5,  // branches
        70, // reduction
        90, // divergence
        40, // linewidth
        90, // angle
        9,  // color
        9,  // color
    ];

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function Genes(genes_array){
        if ( !(genes_array instanceof Array) 
            || genes_array.length < maximum_values.length){
            throw new Error("Genes are not valid!");
        }

        this.genes_array = genes_array;

        this.len        = genes_array[0];
        this.levels     = genes_array[1];
        this.branches   = genes_array[2];
        this.reduction  = genes_array[3] / 100;
        this.divergence = genes_array[4];
        this.linewidth  = genes_array[5];
        this.angle      = genes_array[6];
        this.color1     = genes_array[7];
        this.color2     = genes_array[8];
    }

    Genes.prototype.mutatedArray = function(){
        var random_gene;
        var new_genes = this.genes_array;

        random_gene = random(1,maximum_values.length);
        random_value = random(1,maximum_values[random_gene]);
        while (this.genes_array[random_gene] === random_value){
            /* Make sure we get new value */
            random_value = random(1, maximum_values[random_gene]);
        }

        new_genes[random_gene] = random_value;
        return new_genes;
    }

    return {
        genes: Genes,
        array_to_string: function (arr){
            return arr.map(function(gene){
                /* Valid ASCII range 31 - 127 */
                return String.fromCharCode(gene + 32);
            }).join("");
        },
        string_to_array: function(str){
            return str.split("").map(function(gene){
                /* Valid ASCII range 31 - 127 */
                return gene.charCodeAt() - 32;
            })
        }
    };
});