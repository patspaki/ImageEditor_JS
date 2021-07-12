
// uses image original 1
function edge_normal () {
    ///////////////////////////////////////////

   //prep canvas and ctx (idk why its needed)
   let canvas = document.getElementById('cv2'); 
   let ctx = canvas.getContext('2d');
   //image = new Image();
   //ctx.drawImage(image, 0, 0);

   let counter = 0;
   let counter1 = 0;
   let counter2 = 0;

   image_redolist = [];
   //1.0 store to undolist
   image_undolist.push(imageData);
   logprint();
   
   //"initialize" imageData
   //ctx.getImageData(starting left, starting top, capture w, capture h)
   imageData = ctx.getImageData(0, 0, image.width, image.height);
   let data = imageData.data;
   imageData_original2_data_1d = ctx.getImageData(0, 0, image.width, image.height).data;

   ///////////////////////////////////////////

   let height = image.height -1;
   let width = image.width -1;

   let array_gx = [];
   array_gx.push([-1,0,1]);
   array_gx.push([-2,0,2]);
   array_gx.push([-1,0,1]);
   let array_gy = [];
   array_gy.push([-1,-2,-1]);
   array_gy.push([0,0,0]);
   array_gy.push([1,2,1]);

   let val_Alpha = 0;
   let val_Blue = 0;
   let val_Green = 0;
   let val_Red = 0;
   
   let Gx_sum_Red = 0;
   let Gx_sum_Green = 0;
   let Gx_sum_Blue = 0;
   let Gy_sum_Red = 0;
   let Gy_sum_Green = 0;
   let Gy_sum_Blue = 0;
   let Gxy_sum_final_Red = 0;
   let Gxy_sum_final_Green = 0;
   let Gxy_sum_final_Blue = 0;
 
   //edit
   for (let y = 0; y < image.height; y ++)
   {
       for (let x = 0; x < image.width; x ++) 
       {
           let formula = (y*image.width*4)+x*4;

           Gx_sum_Red = 0;
           Gx_sum_Green = 0;
           Gx_sum_Blue = 0;
           Gy_sum_Red = 0;
           Gy_sum_Green = 0;
           Gy_sum_Blue = 0;
           Gxy_sum_final_Red = 0;
           Gxy_sum_final_Green = 0;
           Gxy_sum_final_Blue = 0;

           //logic
           for (let r = 0; r < 3; r++)
           {
               for (let c = 0; c < 3; c++)
               {
                   if (((y + (r - 1) >= 0) && (x + (c - 1) >= 0)) && ((y + (r - 1) <= height) && (x + (c - 1) <= width)))
                   {
                       //attempt 6 (success - edge detection)
                       // formula + row + col + 0/1/2
                       val_Red = imageData_original1_data_1d[formula + ((r-1)*image.width*4) + ((c-1)*4) +0];
                       val_Green = imageData_original1_data_1d[formula + ((r-1)*image.width*4) + ((c-1)*4) +1];
                       val_Blue = imageData_original1_data_1d[formula + ((r-1)*image.width*4) + ((c-1)*4) +2];                      
                   }

                   // if outside the border (row)
                   if ((y + (r - 1) < 0) || (y + (r - 1) > (height)))
                   {
                       val_Red = 0;
                       val_Green = 0;
                       val_Blue = 0;
                   }

                   // if outside the border (column)
                   else if ((x + (c - 1) < 0) || (x + (c - 1) > (width)))
                   {
                       val_Red = 0;
                       val_Green = 0;
                       val_Blue = 0;
                   }

                   Gx_sum_Blue += val_Blue * array_gx[r][c];
                   Gx_sum_Green += val_Green * array_gx[r][c];
                   Gx_sum_Red += val_Red * array_gx[r][c];
                   Gy_sum_Blue += val_Blue * array_gy[r][c];
                   Gy_sum_Green += val_Green * array_gy[r][c];
                   Gy_sum_Red += val_Red * array_gy[r][c];
               }
           
           val_Alpha = imageData_original2_data_1d[formula+3];
       
           // example: Gxy_sum_final_Red = (Gx_sum_Red^2 + Gy_sum_Red^2)^1/2
           Gxy_sum_final_Red = Math.pow(
               (Math.pow(Gx_sum_Red, 2) + Math.pow(Gy_sum_Red, 2)), 0.5
               );
           Gxy_sum_final_Green = Math.pow(
               (Math.pow(Gx_sum_Green, 2) + Math.pow(Gy_sum_Green, 2)), 0.5
               );
           Gxy_sum_final_Blue = Math.pow(
               (Math.pow(Gx_sum_Blue, 2) + Math.pow(Gy_sum_Blue, 2)), 0.5
               );

           let max = 255; let min = 0;
           if (Gxy_sum_final_Blue > max) { Gxy_sum_final_Blue = 255; }
           if (Gxy_sum_final_Green > max) { Gxy_sum_final_Green = 255; }
           if (Gxy_sum_final_Red > max) { Gxy_sum_final_Red = 255; }
           if (Gxy_sum_final_Blue < min) { Gxy_sum_final_Blue = 0; }
           if (Gxy_sum_final_Green < min) { Gxy_sum_final_Green = 0; }
           if (Gxy_sum_final_Red < min) { Gxy_sum_final_Red = 0; }



           ////grayscale - line 1 (optional)__
           let bwcolor1 = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3;
           Gxy_sum_final_Red = bwcolor1;
           Gxy_sum_final_Green = bwcolor1;
           Gxy_sum_final_Blue = bwcolor1;
           Gxy_sum_final_Red = 255-Gxy_sum_final_Red;
           Gxy_sum_final_Green = 255-Gxy_sum_final_Green;
           Gxy_sum_final_Blue = 255-Gxy_sum_final_Blue;



           data[formula]     = Gxy_sum_final_Red;    // red
           data[formula + 1] = Gxy_sum_final_Green;  // green
           data[formula + 2] = Gxy_sum_final_Blue;   // blue
           data[formula + 3] = val_Alpha;            // alpha
           }

       }
   }

   console.log("counter1: " + counter1);
   ctx.putImageData(imageData, 0, 0);
}