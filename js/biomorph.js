define([], function(){
    var colors = [
    /* Predefined pallete */
        "#2A044A",
        "#2A044A",
        "#0B2E59",
        "#0D6759",
        "#7AB317",
        "#A0C55F",
        "#FAD089",
        "#FF9C5B",
        "#F5634A",
        "#ED303C"
    ];

    function get_endpoint(px,py,angle,length){
        return {
            x: px + length * Math.cos(angle*Math.PI/180), 
            y: py + length * Math.sin(angle*Math.PI/180)
        };
    }

    function Biomorph(canvas, genes){
        if (! (canvas instanceof HTMLCanvasElement)){
            throw new Error("Not a valid canvas element.")
        }

        this._level = 0;
        this.height = canvas.height;
        this.width = canvas.width;
        this.context = canvas.getContext("2d");

        this.genes = genes;
        this.points = [];

        /* Tree root */
        this.points.push({
            x: canvas.width/2, 
            y: genes.len, 
            angle: genes.angle
        });
    }

    Biomorph.prototype.init = function(){
        this._level = 1;
        this.clear();

        this.context.beginPath();
        this.context.moveTo(this.points[0].x, this.height - 25);
        this.context.lineTo(this.points[0].x, this.height - this.points[0].y);
        this.context.strokeStyle = colors[this.genes.color1];
        this.context.lineWidth = this.genes.linewidth;
        this.context.stroke();    
    }

    Biomorph.prototype.clear = function(){
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.height, this.width);    
    }

    Biomorph.prototype.grow = function(){
        var i, point, endpoint, ep;
        var new_points = [];
        this._level++;
        this.genes.len *= this.genes.reduction;
        this.genes.linewidth *= this.genes.reduction;
        this.context.lineWidth = this.genes.linewidth;

        this.context.beginPath();
        for (i=0; i<this.points.length; i++){
            point = this.points[i];
  
            for (endpoint=0; endpoint<this.genes.branches; endpoint++){
                ep = get_endpoint(point.x, point.y, point.angle + ((endpoint % 2 == 0 ) ? this.genes.divergence * endpoint/2 : this.genes.divergence * endpoint*2), this.genes.len);
                this.context.moveTo(point.x, this.height - point.y);
                this.context.lineTo(ep.x, this.height - ep.y);
                ep.angle = point.angle + this.genes.divergence / 2;
                new_points.push(ep);
            }
        }

        this.context.strokeStyle = (this._level < this.genes.levels - 2)
            ? colors[this.genes.color1]
            : colors[this.genes.color2];

        this.context.stroke();
        this.points = new_points;

        if (this._level < this.genes.levels) setTimeout(this.grow.bind(this), 1);
    }

    Biomorph.prototype.draw = function(){
        this.init();
        this.grow();
    }

    return Biomorph;
});