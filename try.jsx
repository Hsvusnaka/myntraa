import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
// import Webcam from 'react-webcam';

const calculateBrightness = (r, g, b) => {
    // Using a particular formula
    return (0.299 * r + 0.7152 * g + 0.0722 * b);
};


const css = `
.bg {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.container {
    width: 100%;
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.hidden {
    display: none;
}

h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

p {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
}

.video-container {
    position: relative;
    width: 100%;
    max-width: 320px; /* Adjust as needed */
    margin: 0 auto;
}

.video-container video {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.capture-button, .browse-button {
    background-color: #ff3f6c;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}

.capture-button:hover, .browse-button:hover {
    background-color: #cc0066;
}

.file-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.file-input {
    display: none;
}

.custom-file-upload {
    background-color: #ff007f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.custom-file-upload:hover {
    background-color: #cc0066;
}

.colors-container {
    display: flex;
    flex-wrap:wrap;
    margin-bottom: 20px;
}

.color-box {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    margin: 0 5px;
}

.navigation {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.previous, .next {
    background-color: #4646c9;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.previous:hover, .next:hover {
    background-color: #1e1e7a;
}

#canvas {
    border: 1px solid black;
    margin-bottom: 10px;
    width: 100%;
    max-width: 500px;
    max-height: 500px;
}

#canvas:hover {
    cursor: url('assets/dropper.cur'), auto;
}

#complementaryColors {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#complementaryColors .color-row {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

#clothingItems {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    background: white;
    padding: 20px;
}

#clothingItems img{
margin:10px;
}

#comp-color1{
background-color:#ddf1ff;
}

#comp-color2{
background-color:#82CAFF;
}

#comp-color3{
background-color:#6495ED;
}
#comp-color4{
background-color:#007fa3;
}
#comp-color5{
background-color:#0000FF;
}
#comp-color6{
background-color:#0085d6;
}
#comp-color7{
background-color:#007fa3;
}
#comp-color8{
background-color:#006280;
}
#comp-color9{
background-color:#0059ba;
}
#comp-color10{
background-color:#004c89;
}
#comp-color11{
background-color:#86339d;
}
#comp-color12{
background-color:#973cbe;
}
#comp-color13{
background-color:#c824b2;
}
#comp-color14{
background-color:#db1885;
}
#comp-color15{
background-color:#e4006f;
}
#comp-color16{
background-color:#d00039;
}
#comp-color17{
background-color:#ab0062;
}
#comp-color18{
background-color:#c824b2;
}
#comp-color19{
background-color:#db1885;
}
#comp-color21{
background-color:#6a4a3a;
}
#comp-color22{
background-color:#a08679;
}
#comp-color23{
background-color:#722F37;
}
#comp-color24{
background-color:#F5DEB3;
}
#comp-color20{
background-color:#e4006f;
}
#comp-color25{
background-color:#868686;
}
#comp-darkColor1 {
    background-color: #e4006f; /* Hot Pink */
}

#comp-darkColor2 {
    background-color: #f2994a; /* Bright Orange */
}

#comp-darkColor3 {
    background-color: #006400; /* Dark Green */
}

#comp-darkColor4 {
    background-color: #ff6347; /* Tomato Red */
}

#comp-darkColor5 {
    background-color: #eccd82; 
}

#comp-darkColor6 {
    background-color: #483d8b; /* Dark Slate Blue */
}

#comp-darkColor7 {
    background-color: #c6adaf; /* Orange Red */
}

#comp-darkColor8 {
    background-color: #4682b4; /* Steel Blue */
}

#comp-darkColor9 {
    background-color: #ff69b4; /* Hot Pink Light */
}

#comp-darkColor10 {
    background-color: #6a5acd; /* Slate Blue */
}

#comp-darkColor11 {
    background-color: #008b8b; /* Dark Cyan */
}

#comp-darkColor12 {
    background-color: #ffa07a; /* Light Salmon */
}

#comp-darkColor13 {
    background-color:#eff0f5; /* Burly Wood */
}

#comp-darkColor14 {
    background-color: #2e8b57; /* Sea Green */
}

#comp-darkColor15 {
    background-color: #4b6a72; /* Deep Pink */
}

#comp-darkColor16 {
    background-color: #daa520; /* Goldenrod */
}

#comp-darkColor17 {
    background-color: #0f3367; /* Blue Violet */
}

#comp-darkColor18 {
    background-color: #cd5c5c; /* Indian Red */
}

#comp-darkColor19 {
    background-color: #aedd34; /* Lime Green */
}

#comp-darkColor20 {
    background-color: #c6d9ed; /* Dark Orange */
}


.video-container {
    width: 100%;
    max-width: 320px; /* Adjust as needed */
    margin: 0 auto;
}

.video-container video {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #000; /* Optional: Add a background color for video container */
}

.capture-button {
    background-color: #ff007f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}

.capture-button:hover {
    background-color: #cc0066;
}

.getStarted {
    background-color: #4646c9;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 28px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;
}

.getStarted:hover {
    background-color: #1e1e7a;
}

.file-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px; /* Adjust spacing as needed */
}

.capture-button, .custom-file-upload {
    background-color: #ff3f6c;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 10px; /* Adjust spacing between buttons */
}

.capture-button:hover, .custom-file-upload:hover {
    background-color: #c63c5c;
}

.custom-file-upload {
    background-color: #ff3f6c;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px; /* Adjust the margin-top as needed */
}

.hover-effect:hover {
    transform: scale(1.05); 
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); 
}


.custom-file-upload:hover {
    background-color: #c63c5c;
}
#canvas {
    border: 1px solid black;
    margin-bottom: 10px;
    width: 100%;
    max-width: 500px;
    max-height: 500px;
    margin-left:200px;
}

#canvas:hover {
    cursor: crosshair;
}

#canvas:focus {
    outline: none;
}

.step-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.canvas-and-colors {
    display: flex;
    justify-content: space-between;
    gap:150px;
    align-items: flex-start;
    margin-top: 20px; /* Adjust margin as needed */
    margin-bottom: 20px; /* Adjust margin as needed */
}

#canvas {
    border: 1px solid black;
    width: 100%;
    max-width: 500px;
    max-height: 500px;
    margit-right:300px;
}

.colors-container {
    display: flex;
    gap:40px;
    flex-direction: column;
    align-items: flex-start;
}

.color-box {
    width: 60px; /* Adjust width as per your design */
    height: 60px; /* Adjust height as per your design */
    border: 1px solid #ccc; /* Example border styling */
    margin-bottom: 10px;
    border-radius:20px /* Adjust margin-bottom between boxes */
    box-sizing: border-box; /* Include border in width/height calculations */
    padding: 5px; /* Add padding inside the box */
    text-align: center; /* Center text horizontally */
    position: relative;
}

.color-label {
    position: absolute;
    top: 60px; /* Position label above the box */
    left: 50%; /* Center the label horizontally */
    transform: translateX(-50%);
    background-color: #fff; /* Example background color for contrast */
    padding: 5px; /* Adjust padding as needed */
     /* Example border styling */
    width: fit-content; /* Adjust width based on content */
}

.navigation {
    display: flex;
    justify-content: center; /* Center buttons horizontally */
    margin-top: 20px; /* Adjust margin as needed */
}

.previous, .next {
    margin: 0 10px; /* Adjust margin between buttons */
}


#step3 {
    text-align: center;
    padding: 20px;
}

#step3 h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

#step3 p {
    font-size: 16px;
    margin-bottom: 20px;
    color: #666;
}

#step3 h3 {
    font-size: 24px;
    margin-bottom: 10px;
    text-align:center;
}

.colors-containers {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 columns with equal width */
    grid-auto-rows: 50px; /* Height of each row */
    grid-gap: 0; /* No gap between grid items */
    justify-items: center; /* Center items horizontally */
    align-items: center; /* Center items vertically */
    width:500px;
    margin-left:500px;
}

.color-boxes {
    width: 100%; /* Each box takes up 100% width of its grid cell */
    height: 100%; /* Each box takes up 100% height of its grid cell */
    background-color: #ccc; /* Placeholder color */
    border-top: 1px solid #ccc; /* Border on the top */
    border-right: 1px solid #ccc; /* Border on the right */
}



.navigation {
    margin-top: 20px;
}

.navigation button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.navigation button:hover {
    background-color: #0056b3;
}

.previous {
    margin-right: 10px;
}
.colors-containers {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 columns with equal width */
    grid-auto-rows: 50px; /* Height of each row */
    grid-gap: 0; /* No gap between grid items */
    justify-items: center; /* Center items horizontally */
    align-items: center; /* Center items vertically */
    width: 450px; /* Adjust width as needed */
    margin-left: 500px; /* Adjust left margin as needed */
}

.color-boxes {
    width: 95%; 
    height: 90%; /* Each box takes up 100% height of its grid cell */
    background-color: #ccc; /* Placeholder color */
    border: 1px solid transparent; /* Initial 1px transparent border */
    border-top: 1px solid #ccc; /* Initial 1px solid #ccc on top */
    border-right: 1px solid #ccc; /* Initial 1px solid #ccc on right */
    transition: border-color 0.3s, transform 0.3s; /* Transition for border color and transform */
    cursor: pointer; /* Change cursor to pointer on hover */
    box-sizing: border-box; /* Include border in width/height calculations */
}

.color-boxes.selected {
    border: 3px solid #000;
    border-radius:5px; /* Black border of 3px when selected on all sides */
    transform: scale(1.05); /* Slightly larger size on click */
}

@keyframes dropdownFadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px); /* Start slightly above */
    }
    to {
        opacity: 1;
        transform: translateY(0); /* Move to original position */
    }
}



`;

export default function Try() {

    const [isDarkSkin, setIsDarkSkin] = useState(false);
    const [picked, setPicked] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedColors, setSelectedColors] = useState([]);
    const [step, setStep] = useState(1);
    const [hoveredItem, setHoveredItem] = useState(null);
    // const [webcamActive, setWebcamActive] = useState(true);
    const complementaryColorsRef = useRef(null);
    const videoRef = useRef(null);
    const [videoStream, setVideoStream] = useState(null);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setUploadedImage(event.target.result);
            stopWebcam();
        };

        reader.readAsDataURL(file);
    };


    const startWebcam = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                setVideoStream(stream);
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch(err => {
                console.error("Error accessing webcam: ", err);
            });
    };


    const stopWebcam = () => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            setVideoStream(null);
        }
    };


    const captureImage = () => {
        const canvas = document.createElement('canvas');
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setUploadedImage(dataUrl);
        stopWebcam();
    };


    useEffect(() => {
        if (uploadedImage && step === 2) {
            const img = new Image();
            img.onload = () => {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                const maxWidth = 400;
                const maxHeight = 400;
                let scale = 1;
                if (img.width > maxWidth || img.height > maxHeight) {
                    scale = Math.min(maxWidth / img.width, maxHeight / img.height);
                }
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = uploadedImage;
        }
    }, [uploadedImage, step]);


    useEffect(() => {
        if (step === 1) {
            startWebcam();
        }
        return () => {
            stopWebcam();
        };
    }, [step]);


    const renderPaletteForDarkSkin = () => {
        return (

            <div id="step3">
                <h2>Your personal palette for dark undertone</h2>
                <div ref={complementaryColorsRef} id="complementaryColors"></div>
                <p>The <b>Autumn Palette</b> contains earthy and warm colors.</p>
                <p><b>Please select up to three colors you prefer to proceed with your color choices</b></p>
                <h3>Best Colors</h3>
                <div className="colors-containers">
                    {[...Array(20).keys()].map(index => (
                        <div
                            key={`comp-darkColor${index + 1}`}
                            id={`comp-darkColor${index + 1}`}
                            className="color-boxes"
                            onClick={(e) => {
                                e.currentTarget.classList.toggle('selected');
                            }}
                        ></div>
                    ))}
                </div>

                <h3>Colors to avoid</h3>
                <div className="colors-containers">
                    <div id="comp-color21" className="color-boxes"></div>
                    <div id="comp-color22" className="color-boxes"></div>
                    <div id="comp-color23" className="color-boxes"></div>
                    <div id="comp-color25" className="color-boxes"></div>
                </div>


                <div className="navigation">
                    <button id="toStep2" className="previous" onClick={() => setStep(2)}>Previous</button>
                    <button id="toStep4" className="next" onClick={() => setStep(5)}>Next</button>
                </div>
            </div>
        );
    };


    const renderPaletteForLightSkin = () => {
        return (
            <div id="step3">
                <h2>Your personal palette for light undertone</h2>
                <div ref={complementaryColorsRef} id="complementaryColors"></div>
                <p>The <b>Deep Winter palette</b> contains dark and vivid colors. Black will be a staple of your wardrobe, as will navy and charcoal—traditional “corporate” shades make it easy to build a great core wardrobe. Dress looks up with a shot of hot pink or Chinese blue.</p>
                <p><b>Please select up to three colors you prefer to proceed with your color choices</b></p>
                <h3>Best Colors</h3>
                <div className="colors-containers">
                    {[...Array(20).keys()].map(index => (
                        <div
                            key={`comp-color${index + 1}`}
                            id={`comp-color${index + 1}`}
                            className="color-boxes"
                            onClick={(e) => {
                                e.currentTarget.classList.toggle('selected');
                            }}
                        ></div>
                    ))}
                </div>

                <h3>Colors to avoid</h3>
                <div className="colors-containers">
                    <div id="comp-color21" className="color-boxes"></div>
                    <div id="comp-color22" className="color-boxes"></div>
                    <div id="comp-color23" className="color-boxes"></div>
                    <div id="comp-color24" className="color-boxes"></div>
                </div>


                <div className="navigation">
                    <button id="toStep2" className="previous" onClick={() => setStep(2)}>Previous</button>
                    <button id="toStep4" className="next" onClick={() => setStep(4)}>Next</button>
                </div>
            </div>

        );
    };


    const renderStep3 = () => {
        return (
            <div>
                <h2>Select Colors</h2>
                {isDarkSkin ? renderPaletteForDarkSkin() : renderPaletteForLightSkin()}
            </div>
        );
    };


    const handleCanvasClick = (e) => {

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        const pixel = ctx.getImageData(x, y, 5, 5).data;

        // Get RGB values
        const r = pixel[0];
        const g = pixel[1];
        const b = pixel[2];
        const hexColor = rgbToHex(r, g, b);

        setSelectedColors([...selectedColors, hexColor]);
        console.log('Selected color:', hexColor);
        console.log('Color count:', selectedColors.length + 1);

        if (selectedColors.length === 0) {

            console.log('First pick action');
            document.getElementById('skinColor').style.backgroundColor = `rgb(${r}, ${g}, ${b})`; //sets bg color of skin box
            const skinBrightness = calculateBrightness(r, g, b); //using a particular formula

            // if skin color is dark or light merely based on brightness, which is not recommended
            if (skinBrightness < 128) {
                setIsDarkSkin(true);
            } 
            else {
                setIsDarkSkin(false);
            }
        }
        else if (selectedColors.length === 1) {
            document.getElementById('hairColor').style.backgroundColor = `rgb(${r}, ${g}, ${b})`; //sets bg color of hair box
        } 
        else if (selectedColors.length === 2) {
            document.getElementById('eyeColor').style.backgroundColor = `rgb(${r}, ${g}, ${b})`; //sets bg color of eye box
            document.getElementById('toStep3').disabled = false;
        }
        else {
            alert("You have already selected three colors.");
        }
    };

    const rgbToHex = (r, g, b) => {
        return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
    };

    const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    
    const handleNavigation = (nextStep) => {
        setStep(nextStep);
    };


    return (
        <div className='bg'>
            <div className="container">
                <style>{css}</style>
                <div id="step-container">
                    {step === 1 && (
                        <>
                            <h2>Get Started with Color Analysis</h2>
                            <p>Capture or upload a photo to start analyzing colors.</p>
                            <div className="video-container">
                                {uploadedImage ? (
                                    <img src={uploadedImage} alt="Uploaded" />
                                ) : (
                                    <video ref={videoRef}></video>
                                )}
                                <div className="file-input-container">
                                    <button className="capture-button" onClick={captureImage}>
                                        Capture Photo
                                    </button>
                                    <label className="custom-file-upload">
                                        <input
                                            type="file"
                                            className="file-input"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        Browse
                                    </label>
                                </div>
                            </div>
                            <button className="getStarted" onClick={() => { handleNavigation(2); stopWebcam() }}>
                                Get Started
                            </button>
                        </>
                    )}
                    {step === 2 &&
                        (
                            <div id="step2" className="step-container">
                                <h2>Select your natural colors</h2>
                                <p>Select your hair, skin, and eye color using the color picker tool. Choose the most prominent tones for your hair and skin. For the eyes, choose the color in the middle of the iris.</p>
                                <div className="canvas-and-colors">
                                    <canvas id="canvas" onClick={handleCanvasClick}></canvas>
                                    <div className="colors-container">
                                        <div className="color-box" id="skinColor">
                                            <span className="color-label">Skin</span>
                                        </div>
                                        <div className="color-box" id="hairColor">
                                            <span className="color-label" >Hair</span>
                                        </div>
                                        <div className="color-box" id="eyeColor">
                                            <span className="color-label" >Eye</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="navigation">
                                    <button id="toStep1" className="previous" onClick={() => setStep(1)}>Previous</button>
                                    <button id="toStep3" className="next" disabled={selectedColors.length < 3} onClick={() => setStep(3)}>Next</button>
                                </div>
                            </div>
                        )
                    }

                    {step === 3 && renderStep3()}


                    {step === 4 && (
                        <div id="step4">
                            <h2 style={{ marginBottom: '-30px' }}>A wardrobe that suits your natural color palette</h2>
                            <div id="clothingItems" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridColumnGap: '15px', gridRowGap: '15px' }}>
                                {[
                                    {
                                        id: 1, src: "https://assets.myntassets.com/w_270,q_60,dpr_2,fl_progressive/assets/images/14954338/2021/11/16/d7444b7b-daef-4ab9-bb87-6add0032adfa1637046244433-Roadster-Women-Jeans-3581637046244134-1.jpg",
                                        relatedSrc1: "https://m.media-amazon.com/images/I/71I2QrobMRS._AC_UY1000_.jpg",
                                        relatedSrc2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwhoyEvegM9F-eAR2878nsawva5ADVuZImeA&s",
                                        relatedSrc3: "https://styleunion.in/cdn/shop/products/LTO00109ORANGE_1.jpg?v=1693569278"
                                    },
                                    {
                                        id: 2, src: "https://assets.myntassets.com/dpr_1.5,q_60,w_270,c_limit,fl_progressive/assets/images/25792610/2023/11/23/3fd59ed1-b310-4760-96ea-0eafd69579f71700760808608AntheaaPinkPrintBellSleeveChiffonFitFlareDress1.jpg",
                                        relatedSrc1: "https://assets.ajio.com/medias/sys_master/root/20231025/uCr5/6538ecc8afa4cf41f55efe9e/-473Wx593H-466745334-brown-MODEL.jpg",
                                        relatedSrc2: "https://rukminim2.flixcart.com/image/850/1000/xif0q/sandal/v/0/z/-original-imaghvb9sk7yzdhd.jpeg?q=90&crop=false",
                                        relatedSrc3: "https://www.instyle.com/thmb/fLr1xvbcYs51RIiczv485_o6CqM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/060222-meringue-leather-crossbody-bag-embed-8b97696d33cf4fe7a79d544ed07973b9.jpg"
                                    },
                                    {
                                        id: 3, src: "https://assets.myntassets.com/w_270,q_60,dpr_2,fl_progressive/assets/images/22302916/2023/9/20/36f97b8b-3c64-452a-9094-91ec0f9af56b1695211618012MANGOWomenBeltedA-LineMidiDress1.jpg",
                                        relatedSrc1: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/25286588/2023/11/16/7052ec82-cfc8-4a0c-8f7c-5f4de8964ea01700125931989VoyageWomenSquareSunglassesWithUVProtectedLens-8926WMG27781.jpg",
                                        relatedSrc2: "https://rukminim2.flixcart.com/image/850/1000/xif0q/sandal/g/r/n/4-101-37-turmook-black-original-imaggv3hzpkwyhrg.jpeg?q=90&crop=false",
                                        relatedSrc3: "https://images-cdn.ubuy.co.in/653e69e2a1011b04cf0ed5af-denim-handbags-for-women-jean-purse-with.jpg"
                                    },
                                    {
                                        id: 4, src: "https://assets.myntassets.com/w_270,q_60,dpr_2,fl_progressive/assets/images/24212924/2023/7/26/b217c7af-1bc7-4cae-a016-03782721be631690376443137AthenaLightblueDenimjacket1.jpg",
                                        relatedSrc1: "https://rukminim2.flixcart.com/image/850/1000/l3vxbbk0/sunglass/v/c/i/fit-all-rectanglular-sunglasses-for-women-retro-driving-original-imagewnf4zhvk2yz.jpeg?q=20&crop=false",
                                        relatedSrc2: "https://images.cltstatic.com/media/product/350/AE00259-SS0000-rihanna-f-mini-hoops-in--silver-prd-1-model.jpg",
                                        relatedSrc3: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/a/6/u/3-ld1050-3-layasa-white-original-imaggkmwastngq76.jpeg?q=90&crop=false"
                                    },
                                    {
                                        id: 5, src: "https://assets.myntassets.com/w_270,q_60,dpr_2,fl_progressive/assets/images/24155188/2024/5/8/5b31e490-797a-4861-a509-89803b41ef451715159683198TokyoTalkiesPinkShoulderStrapSmockingDetailedCropFittedTop1.jpg",
                                        relatedSrc1: "https://www.shutterstock.com/image-photo/closeup-portrait-attractive-young-woman-260nw-1495594070.jpg",
                                        relatedSrc2: "https://www.truesilver.co.in/cdn/shop/files/AFHP3636D20MSL-1copy_600x.jpg?v=1696395518",
                                        relatedSrc3: "https://www.aldoshoes.in/on/demandware.static/-/Sites-aldo_master_catalog/default/dw2d7af2d4/large/abqx0rda0g6350z_AAC_y8eyGDHnlsIASoVT5gNAa_mesmerize_pink670051_1.jpg.jpg"
                                    },
                                    {
                                        id: 6, src: "https://assets.myntassets.com/w_270,q_60,dpr_2,fl_progressive/assets/images/27234096/2024/1/30/45928840-4422-44a3-87b7-49eb922cc3341706609506508AthenaDenimMidiDress1.jpg",
                                        relatedSrc1: "https://www.campusshoes.com/cdn/shop/products/RAISE_WHT_f1a5a2ec-8a23-4795-a796-0da7455dc57a.jpg?v=1705476016",
                                        relatedSrc2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOrqO1j1hdeRqRYzJxPwXGjFmpQgTBmgkcWA&s",
                                        relatedSrc3: "https://assets.ajio.com/medias/sys_master/root/20230921/BfgQ/650c2c2bafa4cf41f5f88c70/-473Wx593H-466054387-black-MODEL.jpg"
                                    },
                                ].map(item => (
                                    <div
                                        key={item.id}
                                        style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
                                    >
                                        <img
                                            src={item.src}
                                            style={{ height: '250px', objectFit: 'contain', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                                            alt={`img${item.id}`}
                                            onMouseEnter={() => setHoveredItem(item.id)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            className="hover-effect"
                                        />

                                        {hoveredItem === item.id && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '10%',
                                                right: (item.id % 3 === 0) ? '70%' : '',
                                                left: (item.id % 3 !== 0) ? '70%' : '',
                                                backgroundColor: 'white',
                                                width: '130%',
                                                height: '90%',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                zIndex: '10',
                                                padding: '10px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                animation: 'dropdownFadeIn 0.5s ease',
                                                transition: 'opacity 0.5s ease, transform 0.5s ease',
                                                opacity: 1,
                                                transform: 'translateY(0)',
                                            }}
                                                onMouseEnter={() => setHoveredItem(item.id)}
                                                onMouseLeave={() => setHoveredItem(null)}
                                            >
                                                <h3 style={{ marginBottom: '8px' }}>Items that'll go well with it</h3>

                                                <div style={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    justifyContent: 'space-evenly',
                                                    height: '100%',
                                                }}>
                                                    <img
                                                        src={item.relatedSrc1}
                                                        style={{
                                                            height: '80%',
                                                            width: '135px',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                                        }}
                                                        alt={`related1_${item.id}`}
                                                        className="hover-effect"
                                                    />
                                                    <img
                                                        src={item.relatedSrc2}
                                                        style={{
                                                            height: '80%',
                                                            width: '135px',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                                        }}
                                                        alt={`related2_${item.id}`}
                                                        className="hover-effect"
                                                    />
                                                    <img
                                                        src={item.relatedSrc3}
                                                        style={{
                                                            height: '80%',
                                                            width: '135px',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                                        }}
                                                        alt={`related3_${item.id}`}
                                                        className="hover-effect"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="navigation">
                                <button id="toStep3Back" className="previous" onClick={() => setStep(3)}>Previous</button>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div id="step4">
                            <h2 style={{ marginBottom: '-30px' }}>A wardrobe that suits your dark color palette</h2>
                            <div id="clothingItems" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridColumnGap: '15px', gridRowGap: '15px' }}>
                                {[
                                    {
                                        id: 1, src: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/22230496/2023/3/4/5ada409e-e1cf-427f-8d4c-46edea988ca11677937944804DODOMOAGreenGeorgetteMaxiDress1.jpg",
                                        relatedSrc1: "https://www.jcrew.com/s7-img-facade/G0397_WT0002?hei=2000&crop=0,0,1600,0",
                                        relatedSrc2: "https://assets.ajio.com/medias/sys_master/root/20230410/YCEC/64342149711cf97ba718cf82/-473Wx593H-469476970-white-MODEL2.jpg",
                                        relatedSrc3: "https://i.pinimg.com/736x/d5/10/34/d51034ae9c0443659498b5d29e020913.jpg"
                                    },
                                    {
                                        id: 2, src: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/23723666/2023/6/22/aaba5068-a0ca-42a4-86f2-234161752c5e1687432540674VeroModaPeach-ColouredShirtMidiDress5.jpg",
                                        relatedSrc1: "https://images.squarespace-cdn.com/content/v1/539dffebe4b080549e5a5df5/1532559234843-6VD2VH07FRCPSKBGIEMF/turquoise-leather-crossbody-organizer-handbag-museum-outlets.jpg?format=1000w",
                                        relatedSrc2: "https://stylestryproductionwls47sou4z.cdn.e2enetworks.net/images/products/medium/2e4f2339bb8b056553dbefe2f64bf2345eddcec0.webp",
                                        relatedSrc3: "https://starkle.in/cdn/shop/files/Artboard5_ada9cf6c-3e38-4da1-8da4-d6fb57cf5610.png?v=1709908233&width=1000"
                                    },
                                    {
                                        id: 3, src: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/20476336/2024/7/18/563e220d-f8df-4118-af73-76f3a2f543631721300333456FlyingMachineWomenNavyBlueWideLegHigh-RiseLightFadeStretchab1.jpg",
                                        relatedSrc1: "https://www.campusshoes.com/cdn/shop/products/RAISE_WHT_f1a5a2ec-8a23-4795-a796-0da7455dc57a.jpg?v=1705476016",
                                        relatedSrc2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCAj0ka2EuOIzk6r-l2EzacmzHP_PSNZl_3Q&s",
                                        relatedSrc3: "https://assets.ajio.com/medias/sys_master/root/20240728/vR9O/66a5ecb51d763220fa450c8d/-473Wx593H-465670237-white-MODEL2.jpg"
                                    },
                                    {
                                        id: 4, src: "https://assets.myntassets.com/w_270,q_60,dpr_2,fl_progressive/assets/images/24212924/2023/7/26/b217c7af-1bc7-4cae-a016-03782721be631690376443137AthenaLightblueDenimjacket1.jpghttps://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/22424774/2023/3/20/ea53be36-0e57-4e9c-bfab-3de258506f581679289462537Skirts1.jpg",
                                        relatedSrc1: "https://images.meesho.com/images/products/368517173/j6x6s_512.jpg",
                                        relatedSrc2: "https://images.cltstatic.com/media/product/350/AE00259-SS0000-rihanna-f-mini-hoops-in--silver-prd-1-model.jpg",
                                        relatedSrc3: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/a/6/u/3-ld1050-3-layasa-white-original-imaggkmwastngq76.jpeg?q=90&crop=false"
                                    },
                                    {
                                        id: 5, src: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/26511378/2023/12/19/74a3e0b0-bf2b-49f5-8ccd-4226253998d71702972463333MABISHbySonalJainPurpleSatinDress1.jpg",
                                        relatedSrc1: "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/265/1661190684_0429d9ea23405e6d0325.jpg",
                                        relatedSrc2: "https://accessorizelondon.in/cdn/shop/products/MA-58144681001_1.jpg?v=1675312308",
                                        relatedSrc3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdeLIUy5nTV3oUqYnDXjfclVX4_kx0pScykQ&s"
                                    },
                                    {
                                        id: 6, src: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/29608624/2024/5/29/1044fba7-2f2e-4a36-b5e9-caa39378a56b1716956954143-Roadster-Women-Dresses-9321716956953677-1.jpg",
                                        relatedSrc1: "https://www.lulus.com/images/product/xlarge/8042801_841582.jpg?w=375&hdpi=1",
                                        relatedSrc2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb9fQF_BwMAqNrVB4Ip8yNSfQp3Nsz4VUVpw&s",
                                        relatedSrc3: "https://assets.ajio.com/medias/sys_master/root/20230921/BfgQ/650c2c2bafa4cf41f5f88c70/-473Wx593H-466054387-black-MODEL.jpg"
                                    },
                                ].map(item => (
                                    <div
                                        key={item.id}
                                        style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
                                    >
                                        <img
                                            src={item.src}
                                            style={{ height: '250px', objectFit: 'contain', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                                            alt={`img${item.id}`}
                                            onMouseEnter={() => setHoveredItem(item.id)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            className="hover-effect"
                                        />

                                        {hoveredItem === item.id && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '10%',
                                                right: (item.id % 3 === 0) ? '70%' : '',
                                                left: (item.id % 3 !== 0) ? '70%' : '',
                                                backgroundColor: 'white',
                                                width: '130%',
                                                height: '90%',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                zIndex: '10',
                                                padding: '10px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                animation: 'dropdownFadeIn 0.5s ease',
                                                transition: 'opacity 0.5s ease, transform 0.5s ease',
                                                opacity: 1,
                                                transform: 'translateY(0)',
                                            }}
                                                onMouseEnter={() => setHoveredItem(item.id)}
                                                onMouseLeave={() => setHoveredItem(null)}
                                            >
                                                <h3 style={{ marginBottom: '8px' }}>Items that'll go well with it</h3>

                                                <div style={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    justifyContent: 'space-evenly',
                                                    height: '100%',
                                                }}>
                                                    <img
                                                        src={item.relatedSrc1}
                                                        style={{
                                                            height: '80%',
                                                            width: '135px',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                                        }}
                                                        alt={`related1_${item.id}`}
                                                        className="hover-effect"
                                                    />
                                                    <img
                                                        src={item.relatedSrc2}
                                                        style={{
                                                            height: '80%',
                                                            width: '135px',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                                        }}
                                                        alt={`related2_${item.id}`}
                                                        className="hover-effect"
                                                    />
                                                    <img
                                                        src={item.relatedSrc3}
                                                        style={{
                                                            height: '80%',
                                                            width: '135px',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                                        }}
                                                        alt={`related3_${item.id}`}
                                                        className="hover-effect"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="navigation">
                                <button id="toStep3Back" className="previous" onClick={() => setStep(3)}>Previous</button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
