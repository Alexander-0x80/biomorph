define(["genes", "biomorph"], function(Genes, Biomorph){

    describe("Tests", function(){
        var default_genes_arr = [80,2,2,60,35,4,60,1,8];
        var default_genes_str = 'p""\\C$\\!(';
        var genes = new Genes.genes(default_genes_arr);

        describe("Genes", function(){

            it("Should create instance", function(){
                genes.genes_array.should.deep.equal(default_genes_arr);
            });

            it("Should detect invalid genes", function(){
                (function(){
                    new Genes.genes([1,2,3]);
                }).should.throw(Error);

                (function(){
                    new Genes.genes("abc");
                }).should.throw(Error);
            });

            it("Should mutate with new genes", function(){
                genes.mutatedArray.should.not.deep.equal(default_genes_arr);
            });

            it("Should convert a string", function(){
                Genes.array_to_string(genes.genes_array)
                    .should.deep.equal(default_genes_str);
            });

            it("Should convert an array", function(){
                Genes.string_to_array(default_genes_str)
                    .should.deep.equal(genes.genes_array);
            });
        });

        describe("Biomorph", function(){
            var canvas = document.createElement("canvas");
            var biomorph = new Biomorph(canvas, genes);

            it("Should create instance", function(){
                biomorph.init();
                biomorph.genes.should.equal(genes);
            });

            it("Should draw on canvas", function(){
                var old = canvas.toDataURL();
                biomorph.grow();
                canvas.toDataURL.should.not.equal(old);
            });

            it("Should detect invalid canvas element", function(){
                (function(){
                    new Biomorph("abc", genes);
                }).should.throw(Error);
            });
        });
    });
});