<script>

  export default {
    name: 'Summary',

    data() {
      return {
        posts: [],
        errors: []
      }
    },
    mounted() {
      let c = document.getElementById("level-1-summary");
      let ctx = c.getContext("2d");

      // y-axis collective - individual
      this.drawLineWithArrows(ctx,100,30,100,450,5,5,true,false)

      // x-axis interior - exterior
      this.drawLineWithArrows(ctx,100,450,550,450,5,5,false,true)

      // y-axis dashed line
      this.drawLine(ctx,325,450,325,30,4)

      // x-axis dashed line
      this.drawLine(ctx,100,240,550,240,4)

      // label interior - Interior
      ctx.font = "20px Arial";
      ctx.fillText("Interior", 100, 475);

      // label collective - Exterior
      ctx.font = "20px Arial";
      ctx.fillText("Exterior", 475, 475);

      // label collective - Individual
      ctx.font = "20px Arial";
      ctx.fillText("Individual", 7, 50);

      // label collective - Collective
      ctx.font = "20px Arial";
      ctx.fillText("Collective", 7, 440);

      this.drawSquare(ctx,115,255,195,180);

      this.drawSquare(ctx,115,45,195,180);

      this.drawSquare(ctx,340,45,195,180);

      this.drawSquare(ctx,340,255,195,180);

      ctx.beginPath();
      ctx.fillStyle = " #FF0000"
      ctx.arc(212.5, 135, 3, 0, 2 * Math.PI, true);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(437.5, 345, 3, 0, 2 * Math.PI, true);
      ctx.stroke();
      ctx.fill();

      this.drawLine(ctx, 212.5,135,437.5,345)

    },

    methods:{
      drawLineWithArrows : function (ctx,x0,y0,x1,y1,aWidth,aLength,arrowStart,arrowEnd){
      var dx=x1-x0;
      var dy=y1-y0;
      var angle=Math.atan2(dy,dx);
      var length=Math.sqrt(dx*dx+dy*dy);

      ctx.translate(x0,y0);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(length,0);
      if(arrowStart){
        ctx.moveTo(aLength,-aWidth);
        ctx.lineTo(0,0);
        ctx.lineTo(aLength,aWidth);
      }
      if(arrowEnd){
        ctx.moveTo(length-aLength,-aWidth);
        ctx.lineTo(length,0);
        ctx.lineTo(length-aLength,aWidth);
      }
      //
      ctx.stroke();
      ctx.setTransform(1,0,0,1,0,0);
      },

      drawLine : function (ctx, x0, y0, x1, y1, dashed = null){
        ctx.beginPath();
        if (dashed !== null) {
          ctx.setLineDash([dashed])
        }
        ctx.moveTo(x0,y0);
        ctx.lineTo(x1,y1);
        ctx.stroke();
        ctx.setLineDash([]);
      },

      drawSquare : function (ctx, x0, y0, width, height){
        ctx.beginPath();
        ctx.rect(x0, y0, width, height);
        ctx.stroke();
      }
    }
  }



</script>

<template>
  <div class="column">
    <div class="q-pa-lg" style="background-color: #00cdcd ; width: 40%">
      <span class="text-h2">
        Company name here
      </span>
    </div>
    <div class="q-pa-lg">
      <canvas id="level-1-summary" width="600px" height="500px">
      </canvas>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
