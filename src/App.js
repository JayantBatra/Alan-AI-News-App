import React, { useState, useEffect, useRef } from "react";
import { Typography } from "@material-ui/core";
import wordsToNumbers from "words-to-numbers";
import alanBtn from "@alan-ai/alan-sdk-web";

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles";

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();
  const alanBtnRef = useRef({}).current;
  useEffect(() => {
    alanBtnRef.btnInstance = alanBtn({
      key: "c6e6a9ff976996a254b669ef79e71a8a2e956eca572e1d8b807a3e2338fdd0dc/stage",
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
            alanBtnRef.btnInstance.playText("Please try that again...");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtnRef.btnInstance.playText("Opening...");
          } else {
            alanBtnRef.btnInstance.playText("Please try that again...");
          }
        }
      },
    });
  }, [alanBtnRef]);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </div>
          </div>
        ) : null}
        <img
          src="https://i0.wp.com/synqqblog.wpcomstaging.com/wp-content/uploads/2020/09/Futuristic-image-1-Copy.png?fit=3184%2C1878&ssl=1"
          className={classes.alanLogo}
          alt="logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a
              className={classes.link}
              href="https://www.linkedin.com/in/jayant-batra-933104219/"
            >
              {" "}
              Jayant Batra
            </a>{" "}
            -
          </Typography>
          <img
            className={classes.image}
            src="https://www.nicepng.com/png/full/57-578342_made-with-love-floral-wreath-stamp-handmade-with.png"
            height="50px"
            alt="Nothing"
          />
        </div>
      ) : null}
    </div>
  );
};

export default App;
// import React, { useState, useEffect } from "react";
// import alanBtn from "@alan-ai/alan-sdk-web";
// import wordsToNumbers from "words-to-numbers";

// import NewsCards from "./components/NewsCards/NewsCards";
// import useStyles from "./styles";

// const alanKey =
//   "c6e6a9ff976996a254b669ef79e71a8a2e956eca572e1d8b807a3e2338fdd0dc/stage";

// const App = () => {
//   const [newsArticles, setNewsArticles] = useState([]);
//   const [activeArticle, setActiveArticle] = useState(-1);
//   const classes = useStyles();
//   useEffect(() => {
//     alanBtn({
//       key: alanKey,
//       onCommand: ({ command, articles, number }) => {
//         if (command === "newHeadlines") {
//           setNewsArticles(articles);
//           setActiveArticle(-1);
//         } else if (command === "highlight") {
//           setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
//         } else if (command === "open") {
//           const parsedNumber =
//             number.length > 2
//               ? wordsToNumbers(number, { fuzzy: true })
//               : number;
//           const article = articles[parsedNumber - 1];

//           if (parsedNumber > articles.length) {
//             alanBtn().playText("Please try that again...");
//           } else if (article) {
//             window.open(article.url, "_blank");
//             alanBtn().playText("Opening...");
//           } else {
//             alanBtn().playText("Please try that again...");
//           }
//         }
//       },
//     });
//   }, []);

//   return (
//     <div>
//       <div className={classes.logoContainer}>
//         <img
//           src="https://i0.wp.com/synqqblog.wpcomstaging.com/wp-content/uploads/2020/09/Futuristic-image-1-Copy.png?fit=3184%2C1878&ssl=1"
//           className={classes.alanLogo}
//           alt="logo"
//         />
//       </div>
//       <NewsCards articles={newsArticles} activeArticle={activeArticle} />
//     </div>
//   );
// };

// export default App;
