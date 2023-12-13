function solve(inputs) {
  const numPiecesInputs = Number(inputs.shift());
  const piecesInputs = inputs.splice(0, numPiecesInputs);

  const library = piecesInputs.reduce(
    (acc, curr) => {
      const [piece, composer, key] = curr.split("|");
      acc.pieces[piece] = { composer, key };

      return acc;
    },
    {
      pieces: {},
      Add: addPiece,
      Remove: removePiece,
      ChangeKey: changePieceKey,
    }
  );

  while (inputs.length > 0) {
    const line = inputs.shift();
    if (line === "Stop") {
      return printPieces();
    }

    const [command, ...params] = line.split("|");
    library[command](...params);
  }

  function addPiece(piece, composer, key) {
    if (this.pieces[piece]) {
      console.log(`${piece} is already in the collection!`);
      return;
    }
    this.pieces[piece] = { composer, key };
    console.log(`${piece} by ${composer} in ${key} added to the collection!`);
  }

  function removePiece(piece) {
    if (!this.pieces[piece]) {
      console.log(
        `Invalid operation! ${piece} does not exist in the collection.`
      );
      return;
    }

    delete this.pieces[piece];
    console.log(`Successfully removed ${piece}!`);
  }

  function changePieceKey(piece, newKey) {
    if (!this.pieces[piece]) {
      console.log(
        `Invalid operation! ${piece} does not exist in the collection.`
      );
      return;
    }
    this.pieces[piece].key = newKey;
    console.log(`Changed the key of ${piece} to ${newKey}!`);
  }

  function printPieces() {
    Object.entries(library.pieces).forEach(([piece, info]) => {
      console.log(`${piece} -> Composer: ${info.composer}, Key: ${info.key}`);
    });
  }
}

solve([
  "3",
  "Fur Elise|Beethoven|A Minor",
  "Moonlight Sonata|Beethoven|C# Minor",
  "Clair de Lune|Debussy|C# Minor",
  "Add|Sonata No.2|Chopin|B Minor",
  "Add|Hungarian Rhapsody No.2|Liszt|C# Minor",
  "Add|Fur Elise|Beethoven|C# Minor",
  "Remove|Clair de Lune",
  "ChangeKey|Moonlight Sonata|C# Major",
  "Stop",
]);
