import takiDeck from "../engine/Deck.js";
import playZone from "../engine/PlayZone.js";
import eventFactory from "../engine/EventFactory.js";
import handFactory from "../engine/HandFactory.js";
import playerFactory from "../engine/PlayerFactory.js";
import cardFactory from "../engine/CardFactory.js";
import stats from "../engine/Stats.js";

const manager = (function() {
  return {
    deck: takiDeck,
    players: [],
    playerTurn: 0,
    playZone: playZone,
    onPlayerChanged: eventFactory.createEvent(),
    onGameEnded: eventFactory.createEvent(),
    onTakiCard: eventFactory.createEvent(), // event represents "Taki" card on playZone
    onChangeColor: eventFactory.createEvent(), // event represents "ChangeColor" card on playZone
    onColorChanged: eventFactory.createEvent(), // event represents that color of "ChangeColor" was changed
    onDeckRefill: eventFactory.createEvent(),
    updateUI: {},

    initBoardComponents:function() {
      manager.updateUI(
        this.players[0].hand,
        this.players[1].hand,
        this.stats,
        this.playZone,
        this.deck
      );
    },

    drawCard: function() {
      // if the deck is empty, take the cards from playZone
      if (manager.deck.isLastCard()) {
        if (manager.playZone.isEmpty()) {
          console.error("empty playzone in drawcard");
          return;
        }

        const newDeck = manager.playZone.getUsedCards(); // copy the original deck except for the first card
        manager.deck.insertCards(newDeck); // insert it shuffled to deck
        manager.onDeckRefill.notify();
      }

      return manager.deck.draw();
    },

    createPlayers: function() {
      manager.players.push(playerFactory.createPlayer("user"));
      manager.players.push(playerFactory.createPlayer("pc"));
    },

    isCardLegal: function(card) {
      const topPlayZone = manager.playZone.getTop();
      const activePlayer = manager.getActivePlayer();

      if (activePlayer.inTakiMode.status) {
        return topPlayZone.compareColor(card);
      } else if (
        manager.getActivePlayer().mustTake > 0 &&
        manager.playZone.getTop().type === "take2"
      ) {
        return card.type === "take2";
      }

      // not in taki mode
      return (
        topPlayZone.compareColor(card) ||
        (topPlayZone.isValueCard() &&
          card.isValueCard() &&
          topPlayZone.compareValue(card)) ||
        (topPlayZone.isSpecialCard() &&
          card.isSpecialCard() &&
          topPlayZone.compareType(card)) ||
        card.isSuperCard()
      );
    },

    isGameEnd: function() {
      return manager.getActivePlayer().hand.cards.length === 0;
    },

    swapPlayer: function() {
      let activePlayer = manager.getActivePlayer();
      if (manager.isGameEnd()) {
        stats.gamesAmount++;
        manager.onGameEnded.notify({ activePlayer: activePlayer });
        return;
      }

      // this will swap player (round robin)
      manager.setNextPlayerAsActive();
      activePlayer = manager.getActivePlayer();
      activePlayer.startTurn();
    },

    getActivePlayer: function() {
      return manager.players[manager.playerTurn];
    },

    getNextPlayer: function() {
      return (manager.playerTurn + 1) % manager.players.length;
    },

    setNextPlayerAsActive: function() {
      manager.playerTurn = manager.getNextPlayer();
    },

    create: function() {
      manager.setCardsFunctions();
      manager.createPlayers();
    },

    init: function() {
      stats.gameWatch.start();
      manager.deck.createDeck();

      // draw the first card to playZone
      let card = manager.drawCard();
      while (card.isSuperCard()) {
        manager.deck.insertCard(card);
        card = manager.drawCard();
      }
      manager.playZone.putOnTop(card);

      // deal the first cards to players
      for (let i = 0; i < manager.players.length; i++) {
        manager.players[i].init();
        manager.players[i].dealInitialCardsToHand();
      }

      manager.playerTurn = 0;
      manager.players[manager.playerTurn].startTurn();
    },

    setCardsFunctions: function() {
      cardFactory.funcOpenTaki = function() {
        const activePlayer = manager.getActivePlayer();
        activePlayer.inTakiMode.status = true;
        activePlayer.inTakiMode.takiId = manager.playZone.getTop().cardId;
        activePlayer.fillLegalCards();
        if (activePlayer.playerType === "pc") {
          activePlayer.doTurn();
        } else {
          manager.onTakiCard.notify();
        }
      };
      cardFactory.funcChangeColor = function() {
        const activePlayer = manager.getActivePlayer();
        if (activePlayer.playerType === "pc") {
          activePlayer.selectColor(manager.colorDecision());
        } else {
          manager.onChangeColor.notify();
        }
      };
      cardFactory.funcStop = function() {
        manager.players[manager.getNextPlayer()].isStopped = true;
        manager.getActivePlayer().endTurn();
        manager.swapPlayer();
      };
      cardFactory.funcPlus = function() {
        const activePlayer = manager.getActivePlayer();
        activePlayer.endTurn();
        activePlayer.startTurn();
      };
      cardFactory.funcTake2 = function() {
        let activePlayer = manager.getActivePlayer();
        let nextPlayer = manager.players[manager.getNextPlayer()];

        nextPlayer.mustTake = activePlayer.mustTake + 2;
        activePlayer.mustTake = 0;
        activePlayer.endTurn();
        manager.swapPlayer();
      };
      cardFactory.funcSuperTaki = function() {
        let activePlayer = manager.getActivePlayer();
        activePlayer.inTakiMode.status = true;
        if (activePlayer.playerType === "pc") {
          activePlayer.selectColor(manager.colorDecision());
        } else {
          cardFactory.funcChangeColor();
        }
      };
    },

    colorDecision: function() {
      let i;
      const activePlayer = manager.getActivePlayer();
      const cards = activePlayer.hand.cards;
      const colorsCount = [];
      let colorSelected;
      let max = 0;

      for (i = 0; i < cardFactory.colors.length; i++) {
        colorsCount[cardFactory.colors[i]] = 0;
      }

      for (i = 0; i < cards.length; i++) {
        if (cards[i].color !== "colorful") {
          colorsCount[cards[i].color]++;
          if (colorsCount[cards[i].color] > max) {
            max = colorsCount[cards[i].color];
            colorSelected = cards[i].color;
          }
        }
      }

      if (max === 0) {
        colorSelected =
          cardFactory.colors[
            Math.floor(Math.random() * cardFactory.colors.length)
          ];
      }

      return colorSelected;
    }
  };
})();

export default manager;
