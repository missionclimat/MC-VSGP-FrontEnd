/// BASIC
import React from "react";
import { Route, Switch } from "react-router-dom";

/// PAGES
import Home from "views/Home";
import Simulator from "views/Simulator";
import Results from "views/Results";
import NotFound from "views/NotFound";

/// STYLES
import "styles/app.css";
import "styles/reset.css";

/// GOOGLE ANALYTICS
import ReactGA from "react-ga";

if (window.location.hostname !== "localhost") {
  ReactGA.initialize("UA-165257322-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactGA.event({
  category: "Screens",
  action: window.screen.width + ":" + window.screen.height,
});

function App() {
  const width = window.innerWidth;

  // function deleteSheet(e) {
  //   e.preventDefault();
  //   console.log(localStorage.getItem("idSheet"));
  //   if (localStorage.getItem("idSheet")) {
  //     var idSheet = localStorage.getItem("idSheet");
  //     localStorage.removeItem("idSheet");
  //     api
  //       .delete("/sheet/delete", idSheet)
  //       .then((res) => {
  //         console.log("SHEET DELETED!", res);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   return null;
  // }

  // // useBeforeunload((e) => deleteSheet(e))
  // window.addEventListener("beforeunload", (e) => deleteSheet(e));

  const Mobile = () => {
    return (
      <div id="mobile-message">
        <div>
          <p>
            La version mobile n'est pas encore disponible. Nous vous recommandons de toutes façons
            l'utilisation d'une tablette ou d'un ordinateur pour profiter pleinement des
            fonctionnalités du site. A bientôt !
          </p>
        </div>
      </div>
    );
  };

  const Desktop = () => {
    return (
      <main id="content-main">
        <Switch>
          {/* BASIC */}
          <Route exact path="/" component={Simulator} />
          {/* SIMULATOR */}
          <Route path="/simulator" component={Simulator} />
          <Route path="/results" component={Results} />
          {/* NOT FOUND */}
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    );
  };

  return width > 0 ? <Desktop /> : <Mobile />;
}

export default App;
