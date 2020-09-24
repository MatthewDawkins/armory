import Alert from "react-bootstrap/Alert";
import React from "react";
import "./banner.css";

type BannerProps = {
  heading: string;
  message: string;
};

export const Banner: React.FC<BannerProps> = ({ heading, message }) => {
  const [show, setShow] = React.useState(true);

  return (
    <>
      {show && (
        <Alert variant="dark" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{heading}</Alert.Heading>
          <p>{message}</p>
        </Alert>
      )}
    </>
  );
};