"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./DonorLogin.module.css";

// Reusable form field component
const FormField = ({ label, type, value, onChange, description }) => {
  return (
    <div className={styles.formField}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${type === "tel" ? styles.builderB9a4be3f78fa4822a6de17fa7abe0706 : styles.builderCca50e4d20f84267b82e1a2cb6345adb}`}
        type={type}
        value={value}
        onInput={onChange}
      />
      {description && <p className={styles.fieldDescription}>{description}</p>}
    </div>
  );
};

// Webcam section component
const WebcamSection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
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
  }, [cameraActive]);

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
    }
  };

  const resetCamera = () => {
    setCapturedImage(null);
    setCameraActive(true);
  };

  return (
    <section className={styles.webcamSection}>
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
      </div>

      <button
        className={`${styles.verifyButton} ${styles.builder5038d9ff474a431b99296e18237da7b4}`}
        onClick={capturedImage ? resetCamera : captureImage}
      >
        {capturedImage ? "Retake Image" : "Click Image to Verify"}
      </button>
    </section>
  );
};

// Login form component
const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");

  const updatePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const updateName = (event) => {
    setName(event.target.value);
  };

  return (
    <section className={styles.div3}>
      <div className={styles.div4}>
        <h2 className={styles.h2}>Blood Donor Login</h2>
        <p className={styles.formIntro}>
          Please enter your details to access your blood donor account. Link
          your ABHA ID for seamless health record integration.
        </p>

        <FormField
          label="Phone Number"
          type="tel"
          value={phoneNumber}
          onChange={updatePhoneNumber}
          description="Enter the mobile number registered with your donor account"
        />

        <button
          className={`${styles.abhaButton} ${styles.builder5038d9ff474a431b99296e18237da7b4}`}
        >
          Link ABHA ID
        </button>

        <FormField
          label="Name"
          type="text"
          value={name}
          onChange={updateName}
          description="Enter your full name as registered"
        />

        <button
          className={`${styles.button2} ${styles.builder27ffde5e04e944bb83007770e582d134}`}
        >
          Login
        </button>

        <p className={styles.privacyNote}>
          Your information is secure and will only be used for verification
          purposes.
        </p>
      </div>
    </section>
  );
};

function DonorLogin() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.div}>
        <WebcamSection />
        <LoginForm />
      </div>
    </main>
  );
}

export default DonorLogin;
