"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();

  //How to triger input button
  const imageInput = useRef();

  const handlePickClick = () => {
    imageInput.current.click();
  };

  //How to make image preview
  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    //Need to make dataURL in order to do so
    const fileReader = new FileReader();

    fileReader.onload = () => {
      //result method를 이용함으로써 URL 만들 수 있음
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  //It's the way to include image by cliking image picker
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user"
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required //An invalid form control with name='image' is not focusable 이라는 오류가 발생함, 만약 아무것도 넣지 않으면
        />
      </div>
      {/* type을 button을 하지 않으면 submit을 해버린다 */}
      <button
        className={classes.button}
        type="button"
        onClick={handlePickClick}
      >
        Pick an Image
      </button>
    </div>
  );
}
