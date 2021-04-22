import React from "react";
import {
  Typography,
  Divider,
  Chip,
  TextField,
  Button,
} from "@material-ui/core";
import SimpleModal from "@material-ui/core/Modal";
import emailjs from "emailjs-com";

import useStyles from "./styles";

const Modal = ({ isOpen, setIsOpen, showFeedback }) => {
  const classes = useStyles();
  let body;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("gmail", "alan_ai", e.target, "user_dhVImkgxaL27bxQ8pLPQ5")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  if (isOpen && showFeedback) {
    body = (
      <div className={classes.paper}>
        <Typography variant="h3">
          Birşey Yanlış mı gitti Geri dönüt ver
        </Typography>
        <br />
        <form className={classes.form} onSubmit={sendEmail}>
          <TextField name="name" label="Adınız" variant="outlined" />
          <br />
          <TextField
            name="email"
            type="email"
            label="E posta adresiniz"
            variant="outlined"
          />
          <br />
          <TextField
            name="feedback"
            multiline
            rows={5}
            helperText="Problemi açıklayınız"
            label="Feedback"
            variant="outlined"
          />
          <br />
          <Button type="submit" variant="outlined" color="primary">
            Gönder
          </Button>
        </form>
      </div>
    );
  } else {
    body = (
      <div className={classes.paper}>
        <Typography variant="h3">Kullanım Kılavuzu</Typography>
        <Divider />
        <div className={classes.infoContainer}>
          <Typography variant="h5">Haberler için Kategori</Typography>
          <div className={classes.chipContainer}>
            {[
              "Business",
              "Entertainment",
              "General",
              "Health",
              "Science",
              "Sports",
              "Technology",
            ].map((category) => (
              <Chip
                key={category}
                label={category}
                color="primary"
                className={classes.chip}
              />
            ))}
          </div>
        </div>
        <Typography variant="body1" className={classes.trySaying}>
          Şunu söylemeyi dene: &quot;Give me the latest{" "}
          <strong>
            <em>Business</em>
          </strong>{" "}
          news&quot;
        </Typography>
        <Divider />
        <div className={classes.infoContainer}>
          <Typography variant="h5">Haberler için Aramalar</Typography>
          <div className={classes.chipContainer}>
            {["Donald Trump", "Bitcoin", "PlayStation 5", "Smartphones"].map(
              (term) => (
                <Chip
                  key={term}
                  label={term}
                  color="primary"
                  className={classes.chip}
                />
              )
            )}
            <Chip label="...ve daha fazla" className={classes.chip} />
          </div>
        </div>
        <Typography variant="body1" className={classes.trySaying}>
          Şunu söylemeyi dene: &quot;What&apos;s up with{" "}
          <strong>
            <em>PlayStation 5</em>
          </strong>
          &quot;
        </Typography>
        <Divider />
      </div>
    );
  }

  return (
    <SimpleModal open={isOpen} onClose={() => setIsOpen(false)}>
      {body}
    </SimpleModal>
  );
};

export default Modal;
