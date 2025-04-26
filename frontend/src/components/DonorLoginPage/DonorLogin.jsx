"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./DonorLogin.module.css";
import { useNavigate } from "react-router-dom";

// Webcam section component
const WebcamSection = ({
  capturedImage,
  setCapturedImage,
  uploadStatus,
  uploadMessage,
  setUploadStatus,
  setUploadMessage,
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(true);

  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 400, height: 400 },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setUploadMessage("Could not access camera. Please check permissions.");
        setUploadStatus("error");
      }
    };

    if (cameraActive) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraActive, setUploadMessage, setUploadStatus]);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame to the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to data URL
      const imageDataUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageDataUrl);
      setCameraActive(false);
      setUploadStatus("idle");
      setUploadMessage("");
    }
  };

  const resetCamera = () => {
    setCapturedImage(null);
    setCameraActive(true);
    setUploadStatus("idle");
    setUploadMessage("");
  };

  const uploadImageToBackend = async () => {
    if (!capturedImage) {
      setUploadMessage("No image captured. Please take a photo first.");
      setUploadStatus("error");
      return;
    }

    try {
      setUploadStatus("loading");
      setUploadMessage("Uploading image for verification...");

      // Replace with your actual API endpoint
      const apiUrl = "http://127.0.0.1:8000/api/image";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: capturedImage,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();

      setUploadStatus("success");
      setUploadMessage(
        "Image uploaded successfully! Verification in progress.",
      );

      // You can handle the response data here if needed
      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("error");
      setUploadMessage("Failed to upload image. Please try again.");
    }
  };

  return (
    <section className={styles.div2}>
      <h3 className={styles.sectionTitle}>Identity Verification</h3>
      <p className={styles.sectionDescription}>
        Please look directly at the camera for identity verification. Your photo
        will be used to verify your identity as a blood donor.
      </p>

      <div className={styles.webcamContainer}>
        {cameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={styles.webcamVideo}
          />
        ) : (
          capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              className={styles.capturedImage}
            />
          )
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {uploadStatus === "loading" && (
          <div className={styles.uploadOverlay}>
            <div className={styles.spinner}></div>
          </div>
        )}
      </div>

      {uploadStatus !== "idle" && (
        <div className={`${styles.uploadMessage} ${styles[uploadStatus]}`}>
          {uploadMessage}
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button
          className={styles.verifyButton}
          onClick={capturedImage ? resetCamera : captureImage}
          disabled={uploadStatus === "loading"}
        >
          {capturedImage ? "Retake Image" : "Click Image to Verify"}
        </button>

        {capturedImage && (
          <button
            className={`${styles.uploadButton} ${styles.builder5038d9ff474a431b99296e18237da7b4} ${uploadStatus === "loading" ? styles.loading : ""}`}
            onClick={uploadImageToBackend}
            disabled={uploadStatus === "loading"}
          >
            {uploadStatus === "loading"
              ? "Uploading..."
              : "Upload for Verification"}
          </button>
        )}
      </div>
    </section>
  );
};

// Blood group and type data
const bloodGroups = ["A", "B", "AB", "O"];
const bloodTypes = ["Positive", "Negative"];

// Dropdown component for reusability
const Dropdown = ({
  label,
  options,
  value,
  onChange,
  description,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.customDropdown}>
        <div
          className={styles.dropdownSelected}
          onClick={() => setIsOpen(!isOpen)}
        >
          {value || placeholder}
          <span
            className={`${styles.dropdownArrow} ${isOpen ? styles.open : ""}`}
          ></span>
        </div>
        {isOpen && (
          <ul className={styles.dropdownOptions}>
            {options.map((option) => (
              <li
                key={option}
                className={styles.dropdownOption}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      {description && <p className={styles.fieldDescription}>{description}</p>}
    </div>
  );
};

function DonorLogin() {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState(() => "");
  const [name, setName] = useState(() => "");
  const [age, setAge] = useState(() => 25);
  const [bloodGroup, setBloodGroup] = useState(() => "");
  const [bloodType, setBloodType] = useState(() => "");
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, loading, success, error
  const [uploadMessage, setUploadMessage] = useState("");
  const [loginStatus, setLoginStatus] = useState("idle"); // idle, loading, success, error
  const [loginMessage, setLoginMessage] = useState("");

  function updatePhoneNumber(event) {
    setPhoneNumber(event.target.value);
  }

  function updateName(event) {
    setName(event.target.value);
  }

  function updateAge(event) {
    setAge(event.target.value);
  }

  function updateBloodGroup(value) {
    setBloodGroup(value);
  }

  function updateBloodType(value) {
    setBloodType(value);
  }

  async function handleLogin() {
    // Reset previous messages
    setLoginStatus("idle");
    setLoginMessage("");

    // Validate form fields
    if (!phoneNumber.trim()) {
      setLoginStatus("error");
      setLoginMessage("Please enter your phone number");
      return;
    }

    if (!name.trim()) {
      setLoginStatus("error");
      setLoginMessage("Please enter your name");
      return;
    }

    if (!bloodGroup) {
      setLoginStatus("error");
      setLoginMessage("Please select your blood group");
      return;
    }

    if (!bloodType) {
      setLoginStatus("error");
      setLoginMessage("Please select your blood type");
      return;
    }

    // Check if image has been captured
    if (!capturedImage) {
      setLoginStatus("error");
      setLoginMessage("Please capture your image for verification");
      return;
    }

    try {
      setLoginStatus("loading");
      setLoginMessage("Logging in...");

      // Prepare the complete donor data
      const donorData = {
        phoneNumber,
        name,
        age,
        bloodGroup,
        bloodType,
        image: capturedImage,
        timestamp: new Date().toISOString(),
      };

      console.log("Sending donor data to backend:", donorData);

      // Replace with your actual login API endpoint
      const loginApiUrl = "http://127.0.0.1:8000/api/login/cred";

      const response = await fetch(loginApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donorData),
      });

      if (response == "object") {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      if (data.prediction == "human"){
        setLoginStatus("success");
        setLoginMessage("Login successful! Redirecting...");
        navigate("/main")
      }
      // You can handle the response data here if needed
      console.log("Login successful:", data);

      // Simulate redirect after successful login

    } catch (error) {
      console.error("Error during login:", error);
      setLoginStatus("error");
      setLoginMessage("Login failed. Please check your details and try again.");
    }
  }

  return (
    <main className={styles.mainContainer}>
      <div className={styles.div}>
        <WebcamSection
          capturedImage={capturedImage}
          setCapturedImage={setCapturedImage}
          uploadStatus={uploadStatus}
          uploadMessage={uploadMessage}
          setUploadStatus={setUploadStatus}
          setUploadMessage={setUploadMessage}
        />

        <section className={styles.div3}>
          <div className={styles.div4}>
            <h2 className={styles.h2}>Blood Donor Login</h2>
            <p className={styles.formIntro}>
              Please enter your details to access your blood donor account. Link
              your ABHA ID for seamless health record integration.
            </p>

            <div className={styles.div5}>
              <label className={styles.label}>Phone Number</label>
              <div className={styles.div6}>
                <input
                  className={`${styles.input} ${styles.builderB9a4be3f78fa4822a6de17fa7abe0706}`}
                  type="tel"
                  value={phoneNumber}
                  onInput={updatePhoneNumber}
                />
                <button
                  className={`${styles.button} ${styles.builder5038d9ff474a431b99296e18237da7b4}`}
                >
                  Link ABHA
                </button>
              </div>
              <p className={styles.fieldDescription}>
                Enter the mobile number registered with your donor account
              </p>
            </div>

            <div className={styles.div7}>
              <label className={styles.label}>Name</label>
              <input
                className={`${styles.input} ${styles.builderCca50e4d20f84267b82e1a2cb6345adb}`}
                type="text"
                value={name}
                onInput={updateName}
              />
              <p className={styles.fieldDescription}>
                Enter your full name as registered
              </p>
            </div>

            <div className={styles.ageSliderContainer}>
              <label className={styles.label}>
                Age: <span className={styles.ageValue}>{age}</span>
              </label>
              <div className={styles.sliderContainer}>
                <span className={styles.sliderMinValue}>18</span>
                <input
                  type="range"
                  min="18"
                  max="100"
                  value={age}
                  onChange={updateAge}
                  className={styles.ageSlider}
                />
                <span className={styles.sliderMaxValue}>100</span>
              </div>
              <p className={styles.fieldDescription}>
                Drag the slider to select your age
              </p>
            </div>

            <div className={styles.bloodFieldsContainer}>
              <Dropdown
                label="Blood Group"
                options={bloodGroups}
                value={bloodGroup}
                onChange={updateBloodGroup}
                description="Select your blood group (A, B, AB, O)"
                placeholder="Select Blood Group"
              />

              <Dropdown
                label="Blood Type"
                options={bloodTypes}
                value={bloodType}
                onChange={updateBloodType}
                description="Select your blood type (+ or -)"
                placeholder="Select Blood Type"
              />
            </div>

            {!capturedImage && (
              <div className={styles.verificationReminder}>
                <p>
                  Please capture your image for identity verification before
                  logging in.
                </p>
              </div>
            )}

            {loginStatus !== "idle" && (
              <div className={`${styles.loginMessage} ${styles[loginStatus]}`}>
                {loginMessage}
              </div>
            )}

            <button
              className={`${styles.button2} ${styles.builder27ffde5e04e944bb83007770e582d134} ${loginStatus === "loading" ? styles.loading : ""}`}
              onClick={handleLogin}
              disabled={loginStatus === "loading"}
            >
              {loginStatus === "loading" ? "Logging in..." : "Login"}
            </button>

            <p className={styles.privacyNote}>
              Your information is secure and will only be used for verification
              purposes. All details including age, phone number, name, blood
              group and type will be sent to our secure database.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DonorLogin;
