import { Camera, CameraResultType } from "@capacitor/camera";
import { useState } from "react";

export function CameraComponent() {
    const [imgSrc, setImgSrc] = useState<string | undefined>('');

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 100,
            allowEditing: true,
            resultType: CameraResultType.Uri
        });
        const imageUrl = image.webPath;
        setImgSrc(imageUrl);
    };

    return (
        <div>
            <p>ImageURL: {imgSrc}</p>
            <button onClick={takePicture} className="bg-black text-white p-2! rounded-md!">Button camera</button>
            <hr />
            <div>
                <h1>Image preview</h1>
                {imgSrc && <img src={imgSrc} alt="Image is empty" />}
            </div>
        </div>
    );
};