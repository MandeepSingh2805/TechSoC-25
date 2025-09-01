const englishLetterFrequency = {
  a: 8.2,
  b: 1.3,
  c: 2.8,
  d: 4.4,
  e: 12.3,
  f: 2.2,
  g: 2,
  h: 6.2,
  i: 7,
  j: 0.15,
  k: 0.77,
  l: 4.6,
  m: 2.4,
  n: 6.7,
  o: 7.8,
  p: 1.9,
  q: 0.095,
  r: 6,
  s: 6.3,
  t: 9.1,
  u: 2.8,
  v: 0.98,
  w: 2.4,
  x: 0.1,
  y: 2,
  z: 0.074,
};

function encode(msg, shift) {
  let encodedMsg = "";
  for (let letter of msg) {
    let asciiCode = letter.charCodeAt(0);
    let newCode = asciiCode;
    if (asciiCode >= 65 && asciiCode <= 90) {
      let back = asciiCode - 65;
      newCode = ((back + (shift % 26)) % 26) + 65;
    }
    if (asciiCode >= 97 && asciiCode <= 122) {
      let back = asciiCode - 97;
      newCode = ((back + (shift % 26)) % 26) + 97;
    }
    encodedMsg += String.fromCharCode(newCode);
  }
  return encodedMsg;
}

function decodeWithoutShift(msg) {
  let minScore = Number.MAX_SAFE_INTEGER;
  let expectedShift;
  for (let i = 1; i < 26; i++) {
    let letterFrequency = {};
    let shiftedBack = encode(msg, 26 - i);
    for (let letter of shiftedBack) {
      if (!letterFrequency[letter]) letterFrequency[letter] = 0;
      letterFrequency[letter] += 1 * (100 / shiftedBack.length);
    }
    let score = 0;
    for (let letter in englishLetterFrequency) {
      score += Math.abs(
        englishLetterFrequency[letter] - (letterFrequency[letter] || 0)
      );
    }

    if (score < minScore) {
      minScore = score;
      expectedShift = 26 - i;
    }
  }
  return encode(msg, expectedShift);
}
let msg =
  "Longer sentences should produce more accurate results as compared to shorter sentences";
let encoded = encode(msg, 3);
console.log("Encoded: ", encoded);
console.log("Program's attempt at decoding: ", decodeWithoutShift(encoded));
