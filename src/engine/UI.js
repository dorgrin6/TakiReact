const UI = (function() {
  const cardsDir = "textures/cards/";
  const imageFormat = ".png";
  // cache DOM elements
  const timeElapsedGameText = document.getElementById("time_elapsed_game");
  const playerText = document.getElementById("turn_indicator");
  const turnAmountText = document.getElementById("turn_amount");
  const playZone = document.getElementById("playZone");
  const deck = document.getElementById("card-deck");
  const pcHand = document.getElementById("pc");
  const userHand = document.getElementById("user");
  const userCards = userHand.children;
  const colorsMenu = document.getElementById("color-menu");
  const colorOptions = document.getElementsByClassName("color-option");
  const endGameMenu = document.getElementById("end-game-menu");
  const quitButton = document.getElementById("quit-button");
  const headlineTr = document.getElementById("statsTable-headline");
  const averageTimeTr = document.getElementById("statsTable-averageTime");
  const averageTimeAllTr = document.getElementById("statsTable-averageTimeAll");
  const lastCardTr = document.getElementById("statsTable-lastCard");

  function initStats() {
    if (UI.elapsedTimeInterval) {
      clearInterval(UI.elapsedTimeInterval);
    }
    UI.elapsedTimeInterval = window.setInterval(function() {
      timeElapsedGameText.innerText =
        "Time: " + stats.gameWatch.getElapsedTime();
    }, 1000);

    stats.turnAmount = 1;
    UI.updateTurnText(1, manager.getActivePlayer());

    quitButton.onclick = function() {
      UI.onPlayerQuit.notify();
    };
  }

  function createColorMenu() {
    for (let i = 0; i < colorOptions.length; i++) {
      const color = colorOptions[i].id.split("-")[0];
      colorOptions[i].setAttribute("data-color", color);

      colorOptions[i].addEventListener("click", function(event) {
        colorsMenu.style.display = "none";
        UI.onColorClick.notify({ color: this.getAttribute("data-color") });
      });
    }
  }

  function createEndGameMenu() {
    document
      .getElementById("play-again-button")
      .addEventListener("click", function() {
        UI.onPlayAgain.notify();
      });
  }

  function notifyDeck() {
    deck.removeEventListener("click", notifyDeck);
    UI.onDeckClick.notify();
  }

  return {
    onCardClick: eventFactory.createEvent(),
    onDeckClick: eventFactory.createEvent(),
    onColorClick: eventFactory.createEvent(),
    onTakiCloseClick: eventFactory.createEvent(),
    onPlayerQuit: eventFactory.createEvent(),
    onPlayAgain: eventFactory.createEvent(),

    elapsedTimeInterval: {},

    create: function() {
      initStats();
      createColorMenu();
      createEndGameMenu();
    },

    init: function() {
      initStats();
      UI.putCardInPlayZone(manager.playZone.getTop());
    },

    clear: function() {
      colorsMenu.style.display = "none";
      endGameMenu.style.display = "none";
      playZone.innerHTML = "";
      pcHand.innerHTML = "";
      userHand.innerHTML = "";

      for (let i = 1; i <= 2; i++) {
        headlineTr.deleteCell(1);
        averageTimeTr.deleteCell(1);
        averageTimeAllTr.deleteCell(1);
        lastCardTr.deleteCell(1);
      }
    },

    createCardDOM: function(card) {
      const cardDOM = document.createElement("IMG");
      cardDOM.setAttribute("class", "card");
      cardDOM.setAttribute("data-cardId", card.cardId);
      return cardDOM;
    },

    putCardInPlayZone: function(card) {
      const cardDOM = UI.createCardDOM(card);
      const sign = Math.random() > 0.5 ? 1 : -1;
      const angleAbs = Math.random() * 20;
      const angle = angleAbs * sign + "deg";
      cardDOM.setAttribute("class", "card-playZone");
      cardDOM.setAttribute("src", cardsDir + card.frontImg + imageFormat);
      cardDOM.setAttribute("style", "transform: rotate(" + angle + ");");
      playZone.appendChild(cardDOM);
    },

    drawCardToPlayerHand: function(player, card) {
      const cardDOM = UI.createCardDOM(card);
      const playerHand = document.getElementById(player.playerType);
      const imageSrc =
        player.playerType === "pc" ? card.backImg : card.frontImg;

      cardDOM.setAttribute("src", cardsDir + imageSrc + imageFormat);
      cardDOM.setAttribute("class", "card");
      playerHand.appendChild(cardDOM);
    },

    removeCardFromBoard: function(cardId) {
      const card = document.querySelector("[data-cardId='" + cardId + "']");
      const hand = card.parentNode;
      hand.removeChild(card);
    },

    setHoverOnUserCards: function() {
      const legalCards = manager.players[manager.playerTurn].hand.legalCards;
      let isLegal = false;

      for (let i = 0; i < userCards.length; i++) {
        for (let j = 0; j < legalCards.length && !isLegal; j++) {
          if (
            parseInt(userCards[i].getAttribute("data-cardId")) ===
            legalCards[j].cardId
          ) {
            userCards[i].setAttribute("class", "legal-card");
            isLegal = true;
          }
        }
        if (!isLegal) {
          userCards[i].setAttribute("class", "illegal-card");
        }

        userCards[i].addEventListener("click", function(event) {
          UI.onCardClick.notify({ cardDOM: this });
        });
        isLegal = false;
      }
    },

    setHoverOnDeck: function() {
      if (manager.getActivePlayer().hasLegalCard()) {
        deck.setAttribute("class", "card-deck illegal-card");
        deck.removeEventListener("click", notifyDeck);
      } else {
        deck.setAttribute("class", "card-deck legal-card");
        deck.addEventListener("click", notifyDeck);
      }
    },

    clearHoverOnUserCards: function() {
      for (let i = 0; i < userCards.length; i++) {
        userCards[i].setAttribute("class", "card");
        userCards[i].removeEventListener("click", function() {});
      }
    },

    clearHoverOnDeck: function() {
      deck.setAttribute("class", "card-deck");
      deck.removeEventListener("click", function() {});
    },

    showChangeColorMenu: function() {
      colorsMenu.style.display = "block";
    },

    showEndGameMenu: function(winnerPlayer) {
      endGameMenu.style.display = "block";
      document.getElementById("winner-player-text").innerText =
        winnerPlayer.playerType === "user" ? "You win!" : "PC wins!";
      document.getElementById("elapsed-time-text").innerText =
        "Game " + timeElapsedGameText.innerText;

      for (let i = 0; i < manager.players.length; i++) {
        const headline = document.createElement("TH");
        const avg = document.createElement("TD");
        const avgAll = document.createElement("TD");
        const last = document.createElement("TD");

        headline.innerText = manager.players[i].playerType;
        avg.innerText = manager.players[i].getAvgTurnTime();
        avgAll.innerText = manager.players[i].getAvgTurnTimeAllGames();
        last.innerText = manager.players[i].getLastCardCounter();

        headlineTr.appendChild(headline);
        averageTimeTr.appendChild(avg);
        averageTimeAllTr.appendChild(avgAll);
        lastCardTr.appendChild(last);
      }
    },

    replaceColorfulWithColor: function(color) {
      const top = playZone.lastChild;
      const newSrc = top.getAttribute("src").replace("colorful", color);
      top.setAttribute("src", newSrc);
    },

    showCloseTakiButton: function() {
      const btnCloseTaki = document.createElement("button");
      const btnText = document.createTextNode("Close Taki");

      btnCloseTaki.appendChild(btnText);
      btnCloseTaki.setAttribute("class", "close-taki button-UI");
      playZone.appendChild(btnCloseTaki);

      btnCloseTaki.addEventListener("click", function(event) {
        UI.onTakiCloseClick.notify();
        playZone.removeChild(btnCloseTaki);
      });
    },

    updateTurnText: function(turnAmount, activePlayer) {
      turnAmountText.innerText = "Turn amount: " + turnAmount;
      playerText.innerText =
        activePlayer.playerType === "user" ? "Your turn" : "PC turn";
    },

    deckRefill: function() {
      deck.setAttribute("style", "display: none");
      const cards = playZone.children;
      let timeOffset = 0;
      for (let i = 0; i < cards.length - 1; i++) {
        shiftNflip(cards[i]);
      }
      setTimeout(function() {
        deck.setAttribute("style", "display: block");
        while (playZone.children.length > 1) {
          playZone.removeChild(playZone.firstChild);
        }
      }, timeOffset);

      function shiftNflip(card) {
        setTimeout(function() {
          card.setAttribute("style", "margin-left: 50px;");
          card.setAttribute("src", deck.src);
        }, timeOffset);
        timeOffset = timeOffset + 100;
      }
    }
  };
})();
