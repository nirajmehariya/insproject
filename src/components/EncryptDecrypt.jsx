import React, { useState } from "react";
import JSEncrypt from "jsencrypt";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const EncryptDecrypt = () => {
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");

  const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;

  const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY;

  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);

  const decryptor = new JSEncrypt();
  decryptor.setPrivateKey(privateKey);

  const handleEncrypt = () => {
    if (message) {
      const encrypted = encryptor.encrypt(message);
      if (encrypted) {
        setEncryptedMessage(encrypted);
      } else {
        alert("Encryption failed. Please check your RSA keys.");
      }
    } else {
      alert("Please enter a message to encrypt.");
    }
  };

  const handleDecrypt = () => {
    if (encryptedMessage) {
      const decrypted = decryptor.decrypt(encryptedMessage);
      if (decrypted) {
        setDecryptedMessage(decrypted);
      } else {
        alert("Decryption failed. Please check your RSA keys.");
      }
    } else {
      alert("No encrypted message found.");
    }
  };

  return (
    <div className="full-page-container">
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          RSA Encryption/Decryption
        </Typography>
        <Box mb={2}>
          <TextField
            label="Enter your message"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            InputProps={{
              sx: {
                backgroundColor: "white",
                color: "black",
              },
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
          onClick={handleEncrypt}
        >
          Encrypt
        </Button>
        {encryptedMessage && (
          <>
            <Box mb={2}>
              <TextField
                label="Encrypted Message"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={encryptedMessage}
                InputProps={{
                  sx: {
                    backgroundColor: "white",
                    color: "black",
                  },
                  readOnly: true,
                }}
              />
            </Box>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={handleDecrypt}
            >
              Decrypt
            </Button>
            {decryptedMessage && (
              <Box mb={2}>
                <TextField
                  label="Decrypted Message"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  value={decryptedMessage}
                  InputProps={{
                    sx: {
                      backgroundColor: "white",
                      color: "black",
                    },
                    readOnly: true,
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default EncryptDecrypt;
