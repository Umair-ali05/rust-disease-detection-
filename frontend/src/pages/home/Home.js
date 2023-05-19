import "./home.css";
import { useState, useEffect } from "react";
// import * as tf from '@tensorflow/tfjs';
import utils from "../../utils/utils";
import axios from "axios";

export const Home = () => {
  const [model, setModel] = useState();
  const [image, setImage] = useState(null);

  const uploadImage = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:303/api/process-image",
        data
      );
      if (res.data.post.success) {
        utils.successToastMessage(res.data.post.message);
      } else {
        utils.errorToastMessage(res.data.post.message);
      }

      // window.location.replace('/post/' + res.data._id);
    } catch (error) {
      if (error.response.data)
        utils.errorToastMessage(error.response.data.err.message);
      else {
        utils.errorToastMessage(error.message);
      }
    }
  };
  // const loadModel = async (file) => {
  //   const absolutePath = path.resolve(file);
  //   console.log(absolutePath);
  //   const model = await tf.loadLayersModel(file);
  //   return model;
  // };

  // useEffect(() => {
  //   const loadModel = async () => {
  //     console.log('here');
  //     const model = await tf.loadLayersModel('/public/tfjs/model.json');

  //     // const inputTensor = tf.tensor2d([[1, 2, 3, 4]], [1, 4]);
  //     // const prediction = model.predict(inputTensor);
  //     setTfModel(model);
  //   };

  //   loadModel();
  // }, []);

  // const readImage = (image) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = () => reject(reader.error);
  //     reader.readAsDataURL(image);
  //   });
  // };

  const handleClick = () => {
    document.getElementById("image-upload").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", image);
    data.append("model", model);
    uploadImage(data);
  };
  return (
    <>
      <div className="page-body">
        <h1 className="heading"> Wheat Rust Disease Detection</h1>
        <div className="page-flex-container">
          <form onSubmit={handleSubmit}>
            <div className="inputfile flexCenter">
              <div className="inputfile flexCenter">
                <div
                  className="image-div"
                  style={{
                    width: "300px",
                    height: "300px",
                    backgroundColor: "#f5d0d0",
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                >
                  {image ? (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      src={URL.createObjectURL(image)}
                      alt="uploaded image"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <p
                      className="para"
                      style={{ textAlign: "center", lineHeight: "300px" }}
                    >
                      Click to upload image
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
              </div>
              <div className="select">
                <select
                  className="select-heading"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option>Please Select a Model</option>

                  <option key={1234} value={"disease"}>
                    Disease
                  </option>
                </select>
              </div>
              <button className="post-button">Start process</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
