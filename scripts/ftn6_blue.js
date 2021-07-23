function Blue(input_value) {
    for (let i = 0; i < imageData.data.length; i+=4) {
        imageData.data[i+2] += input_value;
    }
}

//onchange slider
function Onchange_Slider_Blue()
{
    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    imageData = ctx.getImageData(0,0,image.width,image.height);
    
    ClearRedo();                   //0.8
	is_FilterIncremental = true;   //0.9
	SaveAttributesToUndoLists();   //1-1.4
    logprint();
    
    ////2
    let input_value = parseInt(document.getElementById('slider_Blue').value);
    document.getElementById('text_Blue').value = input_value;

    DictV["IncV"] = 1;
	DictV["BlueV"] = input_value;

    ////3 edit image
    ApplyBaseImageAndIncrementalFiltersToCurrentImage();
    
    ctx.putImageData(imageData, 0, 0);
}

function Onchange_Text_Blue() 
{
    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    imageData = ctx.getImageData(0,0,image.width,image.height);

    ClearRedo();                   //0.8
	is_FilterIncremental = true;   //0.9
	SaveAttributesToUndoLists();   //1-1.4
    logprint();

    ////2
    let input_value = parseInt(document.getElementById('text_Blue').value);
    if (input_value > 255) {
        input_value = 255;
        document.getElementById('text_Blue').value = input_value;
    }
    if (input_value < -255) {
        input_value = -255;
        document.getElementById('text_Blue').value = input_value; 
    }
    document.getElementById('slider_Blue').value = input_value;

    DictV["IncV"] = 1;
	DictV["BlueV"] = input_value;


    ////3 edit image
    ApplyBaseImageAndIncrementalFiltersToCurrentImage();

    ctx.putImageData(imageData, 0, 0);
}