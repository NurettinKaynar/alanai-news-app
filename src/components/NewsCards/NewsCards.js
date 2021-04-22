import React from "react";
import { Grid, Grow, Typography } from "@material-ui/core";

import NewsCard from "./NewsCard/NewsCard";
import useStyles from "./styles.js";

const infoCards = [
  {
    color: "#00838f",
    title: "En Son Haberler",
    text: "Give me the latest news ",
    tr: "(En Son Haberleri Göster)",
  },
  {
    color: "#1565c0",
    title: "Haberler için Kategori",
    info:
      "Business, Entertainment, General, Health, Science, Sports, Technology",
    text: "Give me the latest Technology news",
    tr: "(Teknoloji haberlerini göster)",
  },
  {
    color: "#4527a0",
    title: "Haberler için arama",
    info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
    text: "What's up with PlayStation 5 ",
    tr: "(PlayStation 5'in son durumu ne?)",
  },
  // {
  //   color: "#283593",
  //   title: "News by Sources",
  //   info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
  //   text: "Give me the news from CNN",
  // },
];

const NewsCards = ({ articles, activeArticle }) => {
  const classes = useStyles();

  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {infoCards.map((infoCard) => (
            <Grid
              key={infoCard.title}
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              className={classes.infoCard}
            >
              <div
                className={classes.card}
                style={{ backgroundColor: infoCard.color }}
              >
                <Typography variant="h5" component="h5">
                  {infoCard.title}
                </Typography>
                {infoCard.info ? (
                  <Typography variant="h6" component="h6">
                    <strong>{infoCard.title.split(" ")[2]}</strong>: <br />
                    {infoCard.info}
                  </Typography>
                ) : null}
                <Typography variant="h6" component="h6">
                  Şunu Söylemeye Çalış: <br /> <i>{infoCard.text}</i> <br />{" "}
                  <i>{infoCard.tr}</i>
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {articles.map((article, i) => (
          <Grid
            key={i}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{ display: "flex" }}
          >
            <NewsCard activeArticle={activeArticle} i={i} article={article} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
