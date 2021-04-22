import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@material-ui/core";
import wordsToNumbers from "words-to-numbers";
import alanBtn from "@alan-ai/alan-sdk-web";

import { NewsCards, Modal } from "./components";
import useStyles from "./styles";

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key:
        "64370f4c903e66c5b517887fefa45c1b2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "instructions") {
          setIsOpen(true);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText("Please try that again...");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          } else {
            alanBtn().playText("Please try that again...");
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant="h6" component="h5">
                Şunu Söylemeye Çalış <br />
                Open Article Number [4] / Numaralı makaleyi aç
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Şunu Söylemeye Çalış: <br />
                <br />
                Go Back / Geri Dön
              </Typography>
            </div>
          </div>
        ) : null}
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="h3" gutterBottom>
            Sesli Komut Asistanı
          </Typography>
          <img
            src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg"
            className={classes.alanLogo}
            alt="logo"
            style={{ borderRadius: "20%" }}
          />
        </Grid>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://narxtech.com">
              {" "}
              Nurettin KAYNAR
            </a>
          </Typography>
        </div>
      ) : null}
    </div>
  );
};

export default App;
